var initControls = function() {
	var self = this;

    //droite
    canvas.Input.keyDown([Input.Right, 68], function(e) {
      self.state.right = true;
    });
    canvas.Input.keyUp(Input.Right, function(e) {
      self.state.right = false;
    });
    canvas.Input.keyUp(68, function(e) {
      self.state.right = false;
    });
    //gauche
    canvas.Input.keyDown([Input.Left, 81], function(e) {
      self.state.left = true;
    });
    canvas.Input.keyUp(Input.Left, function(e) {
      self.state.left = false;
    });
    canvas.Input.keyUp(81, function(e) {
      self.state.left = false;
    });
    //haut
    canvas.Input.keyDown([Input.Up, 90], function(e) {
      self.state.up = true;
    });
    canvas.Input.keyUp(Input.Up, function(e) {
      self.state.up = false;
    });
    canvas.Input.keyUp(90, function(e) {
      self.state.up = false;
    });
    //bas
    canvas.Input.keyDown([Input.Bottom, 83], function(e) {
      self.state.down = true;
    });
    canvas.Input.keyUp(Input.Bottom, function(e) {
      self.state.down = false;
    });
    canvas.Input.keyUp(83, function(e) {
      self.state.down = false;
    });


    //bwaaaa
    canvas.Input.keyDown([Input.Space], function(e) {
      self.state.cri = true;
    });
    canvas.Input.keyUp(Input.Space, function(e) {
      self.state.cri = false;
    });

}