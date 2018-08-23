class Money {
  constructor(randomLoc, x, y) {
    this.loc = randomLoc;
    const moneyImg = new Image();
    this.x=x;
    this.y=y;
    moneyImg.src = "./images/moneySprite.png";
    this.img = moneyImg;
  }

  draw(ctx) {

    ctx.drawImage(this.img, 0,0,600,600,this.x + 15,this.y,200,200);
  }
}

module.exports = Money;
