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

    this.scrolling = canvas.Scrolling.new(this, 32, 32);

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
    self.scrolling.setMainElement(self.joueur);

    stage.append(self.tiledMap);

    stage.append(self.joueur);
  },
  //Method called at each render (60 FPS)
  render: function(stage) {
    this.move();
    this.scrolling.update();
    stage.refresh();
  },
  //gestion du mouvement
  move: function() {
    var hori = 0
    var verti = 0
    if( this.state.right && this.state.left ) {
      hori = 0;
    } else if( this.state.right ) {
      hori = -5;
    } else if( this.state.left ) {
      hori = 5;
    }
    this.scrolling.scroll_el[0].speed = hori;
    if( this.state.up && this.state.down ) {
      verti = 0;
    } else if( this.state.up ) {
      verti = -3;
    } else if( this.state.down ) {
      verti = 3;
    }
    result = this.joueur.y + verti;
    if( result > 231 - this.joueur.img.height )
      result = 231 - this.joueur.img.height;
    if( result < 0 )
      result = 0;
    this.joueur.y = result;
  },
  //Method called when this scene is quitted (or another scene is called)
  exit: function(stage) {

  }
});