class Tower {

  constructor(x,y,img) {
    this.health=100;
    this.x=x;
    this.y=y;
    this.img = img;
  }

  draw(ctx,posX,posY) {
    if(this.health>0) {
      ctx.clearRect(this.x,this.y,100,100);
    }else {
      ctx.drawImage(this.img,0,0);
    }
  }
}

module.exports=Tower;
