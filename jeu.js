var canvas = CE.defines("canvas_id").
extend(Input).
extend(Scrolling).
extend( Animation).
ready(function() {
    canvas.Scene.call("MyScene");
});

Xdepl = 0;
Ydepl = 0;
Xavance = 0;
ValMove = 10;

canvas.Scene.new({
  name: "MyScene", // Obligatory
  materials: {
    images: {
        img1: "ville.png"
        ,img2: "ville2.png"
        ,img3: "ville3.png"
        ,img4: "ville4.png"
        ,player: "pigeon.png"
    }
  },
  preload: function(stage, pourcent) {

  },
  ready: function(stage) {
     canvas.Input.keyDown(Input.Right, function(e) {
        Xdepl += ValMove;
     });
     canvas.Input.keyDown(Input.Left, function(e) {
        Xdepl -= ValMove;
     });
     canvas.Input.keyDown(Input.Up, function(e) {
        Ydepl -= ValMove;
     });
     canvas.Input.keyDown(Input.Bottom, function(e) {
        Ydepl += ValMove;
     });
     
    // this.scrolling = canvas.Scrolling.new(this, 32, 32);
     
	 this.fond = this.createElement();
     this.fond.drawImage("img1");

     stage.append(this.fond);
     
	 this.joueur = this.createElement();
     this.joueur.drawImage("player");
	 
	 //this.scrolling.setMainElement(this.joueur);
     
	 this.fond2 = this.createElement();
     this.fond2.drawImage("img2");
     this.fond2.x += 639;
     stage.append(this.fond2);

     stage.append(this.joueur);
     
  },
  render: function(stage) {
			
  	 //seuil en X mini pour commencer a scroller
  	 var Ynormal = 200;
  	 
  	 
  	 //gestion de l'affichage en partant du bord de gauche
  	 if( Xdepl < 0 )
  	 	Xdepl = 0;
  	 if( Xdepl > Ynormal){ //on se déplace en mode scrolling vers la droite
  	 	Xavance += Xdepl - Ynormal;
		Xdepl = Ynormal;
	 }
	 if( Xdepl < Ynormal){
	 	if( Xavance <= 0){//on est entre le bord gauche et la valeur min de scroll
	 		Xavance = 0;
	 	}else { // mode scrolling vers la gauche
  	 		Xavance += Xdepl - Ynormal;
			Xdepl = Ynormal;
  	 	}
	 }
	 
	 //temps d'animation entre chaque rendre (60/S)
	 var tempsanim = 1;
	 
	 // déplacement visuel avec timeline
  	 var timelinejoueur = canvas.Timeline.new(this.joueur);
	 timelinejoueur.to({x: Xdepl, y: Ydepl}, tempsanim,  Ease.linear).call();
	 
  	 var timelinefond = canvas.Timeline.new(this.fond);
	 timelinefond.to({x: 0-Xavance}, tempsanim,  Ease.linear).call();
	 
  	 var timelinefond2 = canvas.Timeline.new(this.fond2);
	 timelinefond2.to({x: 639-Xavance}, tempsanim,  Ease.linear).call();
	 
	 //déplacement au pixel
	 /*
  	 this.joueur.x = Xdepl;
  	 this.joueur.y = Ydepl;
  	 
	 this.fond.x = 0-Xavance;
	 this.fond2.x = 639-Xavance;
	 */
	 stage.refresh();
  },
  exit: function(stage) {

  }
});