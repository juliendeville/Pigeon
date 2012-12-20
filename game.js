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


    //déclaration de la gestion des ennemis
    initEnnemies.bind(this)();
    initPlayer.bind(this)();

    //déclaration de la gestion des projectiles
    initProjectiles.bind( this )();

    //déclaration des contrôles
    initControls.bind( this )();

    //creation du scrolling
    this.scrolling = canvas.Scrolling.new(this, 77, 1455);//en mettant 15 carrés(97*15) ça passe le check pour avancer(qui ne se déclanche pas si on est pas assez à droite), mais ça affiche cette distance à la fin.

    //création du joueur
    self.joueur = self.Player.addPlayer( 100, 150);

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


    //changement d'arme
    if( self.joueur.state.change ) {
      self.joueur.state.change = false;
      self.arme = ( self.arme + 1 ) % self.armes.length;
    }

    //tir !
    if( self.joueur.state.cri && self.waitedForFire >= self.Projectiles.playerProjectile[ self.armes[self.arme] ][0].cooldown ) {
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