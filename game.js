var canvas = CE.defines("canvas_id").
extend(Input).
extend(Tiled).
extend(Scrolling).
extend(Animation).
ready(function() {
    canvas.Scene.call("MyScene");
});



canvas.Scene.new({
  name: "MyScene", // Obligatory
  materials: {
    images: {
        bulletp: "assets/bulletp.png",
        bullet: "assets/bullet.png",
        rossignol: "assets/rossignol.png",
        pie: "assets/pie.png",
        vautour: "assets/vautour.png",
        cri: "assets/bwaa.png",
        murs: "assets/murs.png",
        player: "assets/pigeon.png"
    }
  },
  //Method called at each resource loaded in the materials property
  preload: function(stage, pourcent) {

  },
  //Method called when resources are loaded
  ready: function(stage) {
    var self = this;

    this.state = { left: false, right: false, up: false, down: false };

    //déclaration de la gestion des ennemis
    initEnnemies.bind( this )();

    //déclaration de la gestion des projectiles
    initProjectiles.bind( this )();

    //déclaration des contrôles
    initControls.bind( this )();

    //creation du scrolling
    this.scrolling = canvas.Scrolling.new(this, 77, 1455);//en mettant 15 carrés(97*15) ça passe le check pour avancer(qui ne se déclanche pas si on est pas assez à droite), mais ça affiche cette distance à la fin.

    //création du joueur
    self.joueur = self.createElement();
    self.joueur.drawImage("player");
    self.joueur.y = 100;
    self.joueur.x = 150;
    self.joueur.move = function() {
      var self = this;

      var hori = 0
      var verti = 0
      if( self.state.up && self.state.down ) {
        verti = 0;
      } else if( self.state.up ) {
        verti = -3;
      } else if( self.state.down ) {
        verti = 3;
      }
      var result = self.joueur.y + verti;
      if( result > 231 - self.joueur.img.height )
        result = 231 - self.joueur.img.height;
      if( result < 0 )
        result = 0;
      self.joueur.y = result;

      if( self.state.right && self.state.left ) {
        hori = 0;
      } else if( self.state.right ) {
        hori = 6;
      } else if( self.state.left ) {
        hori = -3;
      }

      result = self.joueur.x + hori;

      if( result > self.maxvisible - canvas.el_canvas[0].width * 3 / 4 )
        result = self.maxvisible - canvas.el_canvas[0].width * 3 / 4;
      if( result < self.maxvisible - canvas.el_canvas[0].width + 25 )
        result = self.maxvisible - canvas.el_canvas[0].width + 25 ;

      self.joueur.x = result;
    };

    //ajout du joueur au scrolling
    self.scrolling.setMainElement(self.joueur);

    //création de la map
    this.tiledMap = this.createElement();
    self.tiled = canvas.Tiled.new();
    //chargement de la map
    self.tiled.load(this, this.tiledMap, "map.json");
    self.tiled.ready(function() {
      //initialisation de la map
      var tile_w = this.getTileWidth(),
        tile_h = this.getTileHeight(),
        layer_object = this.getLayerObject();
    });
    this.map = this.createElement();
    this.map.append( self.tiledMap);
    this.map.append( self.joueur);

    //ajout du scroll sur la map
    self.scrolling.addScroll({
      element: this.map, 
      speed: 3,
      block: true,
      width: 4850,
      height: 231
    });

    self.armes = [ "fusil", "mitrailleuse", "gatling", "tetechercheuse" ];
    self.arme = 0;
    self.waitedForFire = 0;

    stage.append(this.map);
  },
  //Method called at each render (60 FPS)
  render: function(stage) {
    var self = this;
    self.maxvisible = canvas.el_canvas[0].width - self.map.x;

    //mouvement pigeon
    self.joueur.move.bind( this )();

    //changement d'arme
    if( self.state.change ) {
      self.state.change = false;
      self.arme = ( self.arme + 1 ) % self.armes.length;
    }

    //tir !
    if( self.state.cri && self.waitedForFire >= self.Projectiles.playerProjectile[ self.armes[self.arme] ][0].cooldown ) {
      self.Projectiles.playerFire( self.joueur, self.armes[ self.arme ] );
      self.waitedForFire = 0;
    } else {
      self.waitedForFire++;
    }

    self.scrolling.update();

    //apparition des ennemis sur la map
    self.tiled.layers.forEach( function(espece) 
      { 
        if( espece.type != "objectgroup" )
          return;
        espece.objects.forEach( function(ennemi) 
          {
            if( ennemi.apparu ){
              if( ennemi.objet._visible && ennemi.x + ennemi.objet.img.width < -self.map.x ){
                ennemi.objet.hide();
              }
              return;
            }
            if( ennemi.x > self.maxvisible )
              return;
            ennemi.objet = self.Ennemies.addFoe(ennemi.type, ennemi.x, ennemi.y);
            ennemi.apparu = true;
          } 
        );
      }
    )

    stage.refresh();
  },
  //Method called when this scene is quitted (or another scene is called)
  exit: function(stage) {

  }
});