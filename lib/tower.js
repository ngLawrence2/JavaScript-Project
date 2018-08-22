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
      },3000);
    }

  }

  shouldAttack() {

      for(let i = 0 ; i < this.enemyUnits.length ; i++) {
        let currentUnit = this.enemyUnits[i];
        if(currentUnit.y === this.gridArea.y) {
            this.attack=true;
            this.attackMonster();
          return true;
        }
      }
      this.attack = false;

      return false;
  }

  attackMonster() {
    console.log(this.listOfbullets.length);
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
    // if(this.health<0) {
    //   alert("tower is gone");
    //   console.log("DSADSA");
    //   ctx.clearRect(this.x,this.y,100,100);
    // }else {
    //    ctx.drawImage(this.img,0,0,sizeX,sizeY,posX,posY,100,100);
    // }

     ctx.drawImage(this.img,0,0,sizeX,sizeY,posX,posY,100,100);
  }


}

module.exports=Tower;
