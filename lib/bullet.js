
class Bullet {
  constructor(options) {
    this.img = options.img;
    this.x=options.x;
    this.y=options.y;

  }

  draw(ctx) {

    ctx.drawImage(this.img,219,23,138,147,this.x,this.y, 100,100);
  }

  move(timeDelta) {
    const velocityScale=timeDelta/(1000/30);
    const offsetX = 1*velocityScale;
    this.x = this.x + 30;

  }
}

module.exports = Bullet;
