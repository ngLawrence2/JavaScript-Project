class Tower {

  // constructor(x,y,img,loc) {
  //   this.health=100;
  //   this.x=x;
  //   this.y=y;
  //   this.loc=loc;
  //   this.img = img;
  // }


  constructor(options) {
    this.health=100;
    this.x=options.x;
    this.y=options.y;
    this.loc=options.loc;
    this.img = options.img;
    this.gridArea = options.gridArea;
    this.size=options.size;
    this.tower=options.tower;

  }


  draw(ctx,posX,posY,sizeX,sizeY) {
    if(this.health<0) {
      alert("tower is gone");
      ctx.clearRect(this.x,this.y,100,100);
    }else {
       ctx.drawImage(this.img,0,0,sizeX,sizeY,posX,posY,100,100);
    }
  }


}

module.exports=Tower;
