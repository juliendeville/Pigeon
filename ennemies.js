var initEnnemies = function() {
  var self = this;


  self.Ennemies = {
    ennemies : [],
    rossignol : {
      texture: "rossignol", 
      hitbox: {
        x :0, 
        y: 0, 
        h:100, 
        w: 100
      },
      vitesse: 3,
      move : function(){ 
        if (!this._visible) return;
        this.x += 2;
        this.x -= this.donnees.vitesse;
      }
    },
    pie : {
      texture: "pie", 
      hitbox: {
        x :0, 
        y: 0, 
        h: 100, 
        w: 100
      },
      vitesse: 3,
      move : function(){ 
        if (!this._visible) return;
        this.x += 2;
        //définition des constantes
        if( this.originY == undefined )
          this.originY = this.y;
        if( this.count == undefined )
          this.count = 0;

        //si on n'est pas dans une boucle
        if( this.count >= 0 )
          this.count++;

        //mouvement
        if( this.count >= 100 ){ //mouvement de cercle
          if( this.rayon == undefined )
            this.rayon = 0.3 * 231; //@TODO vraie recherche de valeur au lieu de 231
          if( this.etapes == undefined )
            this.etapes = Math.PI * 2 * this.rayon / this.donnees.vitesse / 2; //périmètre (2πR) / vitesse pour calculer les étapes /2 cr on fait un demi cercle
          if( this.current == undefined )
            this.current = 0;
          if( this.xBeforeCircle == undefined )
            this.xBeforeCircle = this.x;
          if( this.yBeforeCircle == undefined )
            this.yBeforeCircle = this.y;

          this.current++;
          if( this.current > this.etapes ){
            this.count = -1;
            this.x -= this.donnees.vitesse;
            this.y = this.originY;
          }

          // ( π/2 + pourcentage * 2π ) % 2π
          // on ajoute π/2 car on commence le mouvement en haut(voir le cercle en radian)
          // le pourcentage d'avancement x π permet définir l'angle en radian d'un demi cercle
          // modulo 2π à la fin pour que la quatrième quart de déplacement ne soit pas supérieur à 2π (je suis pas sur que ça soit utile) 
          var angle = (Math.PI/2+(this.current/this.etapes)*Math.PI )%(2*Math.PI);

          this.x = this.xBeforeCircle + this.rayon * Math.cos( angle );
          this.y = this.yBeforeCircle - this.rayon * Math.sin( angle ) + this.rayon;

        } else if( this.count > 0) { //mouvement par défaut
          this.x -= this.donnees.vitesse;
        } else {
          this.x += this.donnees.vitesse;
        }
      }
    },
    vautour : {
      texture: "vautour", 
      hitbox: {
        x :0, 
        y: 0, 
        h:100, 
        w: 100
      },
      vitesse: 3,
      move : function(){
        if (!this._visible) return;
        
        this.x += 2;

        //définition des constantes
        if( this.originY == undefined )
          this.originY = this.y;
        if( this.count == undefined )
          this.count = 0;

        //si on n'est pas dans une boucle
        if( this.count >= 0 )
          this.count++;

        //mouvement
        if( this.count >= 100 ){ //mouvement de cercle
          if( this.rayon == undefined )
            this.rayon = 0.3 * 231; //@TODO vraie recherche de valeur au lieu de 231
          if( this.etapes == undefined )
            this.etapes = Math.PI * 2 * this.rayon / this.donnees.vitesse; //périmètre (2πR) / vitesse pour calculer les étapes 
          if( this.current == undefined )
            this.current = 0;
          if( this.xBeforeCircle == undefined )
            this.xBeforeCircle = this.x;
          if( this.yBeforeCircle == undefined )
            this.yBeforeCircle = this.y;

          this.current++;
          if( this.current > this.etapes ){
            this.count = -1;
            this.x -= this.donnees.vitesse;
            this.y = this.originY;
          }

          // ( π/2 + pourcentage * 2π ) % 2π
          // on ajoute π/2 car on commence le mouvement en haut(voir le cercle en radian)
          // le pourcentage d'avancement x 2π permet définir l'angle en radian
          // modulo 2π à la fin pour que la quatrième quart de déplacement ne soit pas supérieur à 2π (je suis pas sur que ça soit utile) 
          var angle = (Math.PI/2+(this.current/this.etapes)*2*Math.PI )%(2*Math.PI);

          this.x = this.xBeforeCircle + this.rayon * Math.cos( angle );
          this.y = this.yBeforeCircle + this.rayon * Math.sin( angle ) - this.rayon;
        } else { //mouvement par défaut
          this.x -= this.donnees.vitesse;

        }
      }
    },
    pingouin : {
      texture: "pingouin", 
      hitbox: {
        x :0, 
        y: 0, 
        h:100, 
        w: 100
      },
      vitesse: 2,
      move : function(){ 
        if (!this._visible) return;
        this.x-=1;
      }
    }, //oui je sais !
    addFoe: function(foe, x, y) {
      if( !self.Ennemies[foe] )
        return;
      //création de l'ennemi
      var ennemi = self.createElement();
      ennemi.drawImage(foe);
      ennemi.y = y;
      ennemi.x = x;
      ennemi.donnees = self.Ennemies[foe];
      //donner à l'ennemi son mouvement lors du render()
      ennemi.addLoopListener(self.Ennemies[foe].move.bind( ennemi ));
      self.map.append( ennemi );

      self.Ennemies.ennemies.push( ennemi );

      return ennemi;
    }
  };


};