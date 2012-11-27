var canvas = CE.defines("canvas_id").
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
    });

    this.scrolling = canvas.Scrolling.new(this, 32, 32);



      

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