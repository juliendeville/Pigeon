var canvas = CE.defines("canvas_id").
extend(Input).
extend(Tiled).
extend(Scrolling).
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

    var state = { left: false, right: false, up: false, down: false };

    //droite
     canvas.Input.keyDown(Input.Right, function(e) {
        state.right = true;
        Move();
     });
     canvas.Input.keyUp(Input.Right, function(e) {
        state.right = false;
        Move();
     });
     //gauche
     canvas.Input.keyDown(Input.Left, function(e) {
        state.left = true;
        Move();
     });
     canvas.Input.keyUp(Input.Left, function(e) {
        state.left = false;
        Move();
     });
     //haut
     canvas.Input.keyDown(Input.Up, function(e) {
        state.up = true;
        Move();
     });
     canvas.Input.keyUp(Input.Up, function(e) {
        state.up = false;
        Move();
     });
     //bas
     canvas.Input.keyDown(Input.Bottom, function(e) {
        state.down = true;
        Move();
     });
     canvas.Input.keyUp(Input.Bottom, function(e) {
        state.down = false;
        Move();
     });

     var Move = function() {
      var hori = 0
      var verti = 0
      if( state.right && state.left ) {
        hori = 0;
      } else if( state.right ) {
        hori = -5;
      } else if( state.left ) {
        hori = 5;
      }
      self.scrolling.scroll_el[0].speed = hori;
      if( state.up && state.down ) {
        verti = 0;
      } else if( state.up ) {
        verti = -5;
      } else if( state.down ) {
        verti = 5;
      }
      self.joueur.y += verti;
      if( self.joueur.y > 231 - self.joueur.img.height )
        self.joueur.y = 231 - self.joueur.img.height;
      if( self.joueur.y < 0 )
        self.joueur.y = 0;
     };

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
      speed: -5,
      block: true,
      width: 4850,
      height: 154
    });

    self.joueur = self.createElement();
    self.joueur.drawImage("player");
    self.scrolling.setMainElement(self.joueur);

    stage.append(self.tiledMap);

    stage.append(self.joueur);


      

  },
  //Method called at each render (60 FPS)
  render: function(stage) {
    this.scrolling.update();
    stage.refresh();
  },
  //Method called when this scene is quitted (or another scene is called)
  exit: function(stage) {

  }
});