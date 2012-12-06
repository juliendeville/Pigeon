var initProjectiles = function() 
{
  var self = this;


  self.Projectiles = 
  {
    playerProjectiles : [],
    foesProjectiles : [],
    playerProjectile : 
    { 
      fusil: [
        {
          texture : "bulletp",
          cooldown: 15, 
          force: 1, 
          vitesse: 7, 
          move: function() 
          {
            this.x += this.donnees.vitesse;
          } 
        }
      ],
      mitrailleuse: 
      [
        {
          texture : "bulletp",
          cooldown: 20, 
          force: 1, 
          vitesse: 7, 
          move: function() 
          {
            this.x += this.donnees.vitesse;
            this.y -= 0.05;
          } 
        },
        {
          texture : "bulletp",
          cooldown: 20, 
          force: 1, 
          vitesse: 7, 
          move: function() 
          {
            this.x += this.donnees.vitesse;
            this.y += 0.05;
          } 
        }
      ],
      gatling: 
      [
        {
          texture : "bulletp",
          cooldown: 25, 
          force: 1, 
          vitesse: 7, 
          move: function() 
          {
            this.rotation = -10;
            this.x += this.donnees.vitesse;
            this.y -= this.donnees.vitesse/10;
          } 
        },
        {
          texture : "bulletp",
          force: 1, 
          vitesse: 7, 
          move: function() 
          {
            this.x += this.donnees.vitesse;
          } 
        },
        {
          texture : "bulletp",
          force: 1, 
          vitesse: 7, 
          move: function() 
          {
            this.rotation = 10;
            this.x += this.donnees.vitesse;
            this.y += this.donnees.vitesse/10;
          } 
        }
      ],
      tetechercheuse: 
      [
        {
          texture : "bulletp",
          cooldown: 30, 
          force: 1, 
          vitesse: 7, 
          move: function() 
          {
            if( !this.target )
              this.target = { x: 1200, y: 50 };

            var mouvX = this.target.x - this.x;
            var mouvY = this.target.y - this.y;
            var dist = Math.sqrt( Math.pow( mouvX, 2) + Math.pow( mouvY, 2) );
            var rapport = this.donnees.vitesse / dist;

            this.x += rapport * mouvX;
            this.y += rapport * mouvY;
          } 
        }
      ]
    },
    foeProjectile : 
    { 
      fusil: 
      [
        {
          texture : "bullet",
          force: 1, 
          vitesse: 7, 
          move: function() 
          {
            this.x += this.donnees.vitesse;
          } 
        }
      ],
      tetechercheuse: 
      [
        {
          texture : "bullet",
          force: 1, 
          vitesse: 7, 
          move: function() 
          {
            if( !this.target )
              this.target = { x: 1200, y: 50 };

            var mouvX = this.target.x - this.x;
            var mouvY = this.target.y - this.y;
            var dist = Math.sqrt( Math.pow( mouvX, 2) + Math.pow( mouvY, 2) );
            var rapport = this.donnees.vitesse / dist;

            this.x += rapport * mouvX;
            this.y += rapport * mouvY;
          } 
        }
      ]
    },
    playerFire: function(player, arme) 
    {
      if( !self.Projectiles.playerProjectile[arme] )
        return;
      //calcul du feu à partir de la position du joueur
      var centre = player.img.height / 2;
      var pair = self.Projectiles.playerProjectile[arme].length % 2 == 0;
      var ecart = 10;
      
      //calcul fonction de l'arme en cours
      for( id in self.Projectiles.playerProjectile[arme] )
      {
        var tir = self.Projectiles.playerProjectile[arme][id];
        var proj = self.createElement();
        proj.donnees = tir;
        proj.drawImage(tir.texture);

        var hauteurproj = proj.img.height;
        var ecartproj = hauteurproj + ecart;
        if( pair ) {
          proj.y = player.y + centre - hauteurproj - centre / 2 + id * ecartproj - ( (self.Projectiles.playerProjectile[arme].length - 2 ) / 2 ) * ecartproj;
        } else {
          proj.y = player.y + centre - hauteurproj / 2 + id * ecartproj - Math.floor( self.Projectiles.playerProjectile[arme].length / 2 ) * ecartproj;
        }
        proj.x = player.x + player.img.width;
        //donner à l'ennemi son mouvement lors du render()
        proj.addLoopListener(tir.move.bind( proj ));
        self.map.append( proj );
  
        self.Projectiles.playerProjectiles.push( proj );
      }
      return proj;
    },
    foeFire: function(foe, arme) 
    {
      if( !self.Projectiles.playerProjectile[arme] )
        return;
      //calcul du feu à partir de la position du joueur
      var proj = self.Projectiles.foeProjectile[arme];
      //calcul fonction de l'arme en cours

      self.Projectiles.foesProjectiles.push( proj );

      return proj;
    }
  };


}