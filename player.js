var initPlayer = function()
{
    var self = this;

    self.Player = {
        move: function() {
            var self = this;

            var horizontal = 0
            var vertical = 0
            if(self.state.up && self.state.down)
            {
                vertical = 0;
            }
            else if(self.state.up)
            {
                vertical = -3;
            }
            else if(self.state.down)
            {
                vertical = 3;
            }
            var result = self.y + vertical;
            if(result > 231 - self.img.height)
            {
                result = 231 - self.img.height;
            }
            if(result < 0)
            {
                result = 0;
            }
            self.y = result;

            if(self.state.right && self.state.left)
            {
                horizontal = 0;
            }
            else if(self.state.right)
            {
                horizontal = 6;
            }
            else if(self.state.left)
            {
                horizontal = -3;
            }

            result = self.x + horizontal;

            if(result > self.maxvisible - canvas.el_canvas[0].width * 3 / 4)
            {
                result = self.maxvisible - canvas.el_canvas[0].width * 3 / 4;
            }
            if(result < self.maxvisible - canvas.el_canvas[0].width + 25)
            {
                result = self.maxvisible - canvas.el_canvas[0].width + 25 ;
            }

            self.x = result;
        },
        addPlayer: function( x, y) {
            //création de l'ennemi
            var player = self.createElement();
            player.drawImage('player');
            player.y = y;
            player.x = x;
            player.donnees = self.Player;
            player.state = { left: false, right: false, up: false, down: false };
            //donner à l'ennemi son mouvement lors du render()
            player.addLoopListener(self.Player.move.bind(player));

            return player;
        }
    };
};