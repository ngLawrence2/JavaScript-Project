const Bullet = require('./bullet.js');

class Tower {

  // constructor(x,y,img,loc) {
  //   this.health=100;
  //   this.x=x;
  //   this.y=y;
  //   this.loc=loc;
  //   this.img = img;
  // }


  constructor(options) {
    const TOWER_ATTACK_ANIMATION = [
      [[22,397],[60,56]],
      [[276,290],[47,73]], //1 for deathAnimation
      [[343,290],[52,72]],
      [[413, 315], [81,39]],
      [[504,340], [81,23]] //4 end of deathAnimation
    ];
    this.currentAnimation = 0 ;
    this.imagePos=TOWER_ATTACK_ANIMATION;
    this.maxAnimation = 0;
    this.x=options.x;
    this.y=options.y;
    this.loc=options.loc;
    this.img = options.img;
    this.gridArea = options.gridArea;
    this.size=options.size;
    this.tower=options.tower;
    this.attack = false;
    this.listOfbullets = [] ;
    const bulletImage = new Image();
    bulletImage.src = "./images/fireballImage.png";
    this.bulletImage=bulletImage;
    this.enemyUnits=options.listOfMonsters;

    //bigger units have more health
    if(this.size) {
      if(this.size.x >=500) {
        this.health=200;
      } else {
        this.health=50;
      }
    }

    if(this.enemyUnits) {
      setInterval(()=> {
        this.shouldAttack()
      },2500);
    }

  }

  shouldAttack() {
      for(let i = 0 ; i < this.enemyUnits.length ; i++) {
        let currentUnit = this.enemyUnits[i];
        if(currentUnit.y === this.gridArea.y && currentUnit.x < 1200) {
            this.attack=true;
            this.attackMonster();
            return true;
        }
      }
    //  this.maxAnimation=0;

      this.attack = false;

      return false;
  }

  attackMonster() {
    if(this.attack) {
        let attack = {
          x: this.gridArea.x + 90,
          y: this.gridArea.y ,
          img: this.bulletImage
        };

        this.listOfbullets.push(new Bullet(attack));
    }
  }

  draw(ctx,posX,posY,sizeX,sizeY) {

    if(sizeX >=500) {
     ctx.drawImage(this.img,0,0,sizeX,sizeY,posX,posY,100,100);
    } else {
      let size = this.imagePos[this.currentAnimation][1];
      let imageArea = this.imagePos[this.currentAnimation][0];
      ctx.drawImage(this.img,imageArea[0],imageArea[1],size[0],size[1],posX,posY,100,100);
   }
  }


  updateFrame() {
    this.currentAnimation++;

  }
}

module.exports=Tower;
