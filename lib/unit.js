class Unit {
  constructor(options) {
    this.context = options.context;
    this.width=options.width;
    this.height=options.height;
    this.image=options.image;
    this.health = 200;
  //  this.start(this.context);
    this.x = options.x;
    this.y=options.y;
  }

  draw(ctx) {
      ctx.drawImage(this.image,239,54,114,91,this.x,this.y,100,100);
  }

  move(timeDelta) {
    const velocityScale=timeDelta/ (1000/30);
  }

  // start(ctx) {
  //   let animate = () => {
  //     // this.context.clearRect(0, 0, 1200, 800);
  //     this.draw(ctx);
  //     this.x-=1;
  //
  //     setTimeout(animate,1000/30);
  //   }
  //   animate();
  // }

}
module.exports=Unit;
