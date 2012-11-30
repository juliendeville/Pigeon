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

    //déclaration des contrôles
    initControls.bind( this )();

    //création de la map
    this.tiledMap = this.createElement();
    var tiled = canvas.Tiled.new();
    //chargement de la map
    tiled.load(this, this.tiledMap, "map.json");
    tiled.ready(function() {
      //initialisation de la map
      var tile_w = this.getTileWidth(),
        tile_h = this.getTileHeight(),
        layer_object = this.getLayerObject();
      
    });

    this.scrolling = canvas.Scrolling.new(this, 77, 97);

    //ajout du scroll sur la map
    self.scrolling.addScroll({
      element: self.tiledMap, 
      speed: 5,
      block: true,
      width: 4850,
      height: 231
    });

    self.joueur = self.createElement();
    self.joueur.drawImage("player");
    self.joueur.x = 150;
    self.scrolling.setMainElement(self.joueur);

    //image cri  !!!
    self.cri = self.createElement();
    self.cri.drawImage("cri");
    self.cri.opacity = 0;

    this.timelineCri= canvas.Timeline.new(this.cri);

    stage.append(self.tiledMap);

    stage.append(self.cri);
    stage.append(self.joueur);
  },
  //Method called at each render (60 FPS)
  render: function(stage) {
    this.move();
    if( this.scrolling.scroll_el[0].speed !== 0 )
      this.scrolling.update();
    if( this.state.cri && this.cri.opacity == 0 ) {
      this.cri.opacity = 1.0;
    /*this.timelineCri.wait( 500000)
                  .to({opacity: 1}, 100, Ease.linear)
                  .to({opacity: 0}, 500, Ease.linear).call();
                  */
      //this.timelineCri.call();

    }
    stage.refresh();
  },
  //gestion du mouvement
  move: function() {
    var hori = 0
    var verti = 0
    if( this.state.up && this.state.down ) {
      verti = 0;
    } else if( this.state.up ) {
      verti = -3;
    } else if( this.state.down ) {
      verti = 3;
    }
    var result = this.joueur.y + verti;
    if( result > 231 - this.joueur.img.height )
      result = 231 - this.joueur.img.height;
    if( result < 0 )
      result = 0;
    this.joueur.y = result;

    //positionnement cri
    this.cri.y = result-55;
    this.cri.x = this.joueur.x + 100;

    if( this.state.right && this.state.left ) {
      hori = 0;
    } else if( this.state.right ) {
      hori = -5;
    } else if( this.state.left ) {
      hori = 5;
    }
    this.scrolling.scroll_el[0].speed = hori;
  },
  //Method called when this scene is quitted (or another scene is called)
  exit: function(stage) {

  }
});