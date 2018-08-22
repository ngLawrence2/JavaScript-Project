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

    //bigger units have more health
    if(this.size) {
      if(this.size.x >=500) {
        this.health=200;
      } else {
        this.health=50;
      }
    }
    console.log(this.gridArea);
  }

  shouldAttack(enemyUnits) {
      for(let i = 0 ; i < enemyUnits.length ; i++) {
        let currentUnit = enemyUnits[i];
        if(currentUnit.y === this.gridArea.y) {
          console.log("im a dinosaur");
            return true;
        }
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
