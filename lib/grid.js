class Grid  {
  constructor(sizeWidth,sizeHeight) {
    this.sizeWidth=sizeWidth;
    this.sizeHeight=sizeHeight;
  }

  draw(ctx,image) {
    for(let width=300; width<=this.sizeWidth;width+=100) {
      for(let height=100; height<=this.sizeHeight;height+=100) {
        ctx.beginPath();
        ctx.strokeStyle="#0f3d0f";
        ctx.strokeRect(width,height,100,100);
      }
    }
  }
}

module.exports = Grid;
