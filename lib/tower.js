class Tower {
  //specifies the upper corner of the rectangle in the sidebar
  constructor(x,y) {
    this.x=x;
    this.y=y;
    this.selected=false;
  }

  draw(ctx) {
    ctx.drawImage(this.image,635,210,100,100,50,50,200,200);
  }

}

module.exports=Tower;
