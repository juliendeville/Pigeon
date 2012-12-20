var initControls = function() {
	var self = this;

    //droite
    canvas.Input.keyDown([Input.Right, 68], function(e) {
      self.joueur.state.right = true;
    });
    canvas.Input.keyUp(Input.Right, function(e) {
      self.joueur.state.right = false;
    });
    canvas.Input.keyUp(68, function(e) {
      self.joueur.state.right = false;
    });
    //gauche
    canvas.Input.keyDown([Input.Left, 81], function(e) {
      self.joueur.state.left = true;
    });
    canvas.Input.keyUp(Input.Left, function(e) {
      self.joueur.state.left = false;
    });
    canvas.Input.keyUp(81, function(e) {
      self.joueur.state.left = false;
    });
    //haut
    canvas.Input.keyDown([Input.Up, 90], function(e) {
      self.joueur.state.up = true;
    });
    canvas.Input.keyUp(Input.Up, function(e) {
      self.joueur.state.up = false;
    });
    canvas.Input.keyUp(90, function(e) {
      self.joueur.state.up = false;
    });
    //bas
    canvas.Input.keyDown([Input.Bottom, 83], function(e) {
      self.joueur.state.down = true;
    });
    canvas.Input.keyUp(Input.Bottom, function(e) {
      self.joueur.state.down = false;
    });
    canvas.Input.keyUp(83, function(e) {
      self.joueur.state.down = false;
    });


    //bwaaaa
    canvas.Input.keyDown([Input.Space], function(e) {
      self.joueur.state.cri = true;

    });
    canvas.Input.keyUp(Input.Space, function(e) {
      self.joueur.state.cri = false;
    });

    //changement d'arme
    canvas.Input.keyDown( [69], function(e) {
      self.joueur.state.change = true;

    });

}