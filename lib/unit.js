class Unit {
  constructor(options) {
    const IMAGE_POSITIONS=[
      [[43,53],[112,92]],
      [[239,54],[114,91]],
      [[428,62],[117,83]],
      [[618,61],[119,84]],
      [[807,55],[117,92]],
      [[45,248],[114,91]],
      [[235,256],[116,83]],
      [[424,255],[119,84]],
      [[614,256],[121,83]],
      [[815,254],[112,85]]
    ];
    this.imagePos=IMAGE_POSITIONS;
    this.currentAnimation = 1;
    this.context = options.context;
    this.width=options.width;
    this.height=options.height;
    this.image=options.image;
    this.health = 50;
    this.x = options.x;
    this.y=options.y;
    this.grid=options.grid;

  }

  attackTower() {
    let posX = this.x ;
    let posY = this.y + 1;
    let currentSquare = this.grid.gridAreaClicked(posX,posY);
    if(currentSquare >=1) {
      if(this.grid.numSquares[currentSquare].hasTower) {

        return currentSquare;
        // return true;
      }
    }
    return false;
  }




  draw(ctx) {
    if(this.currentAnimation > 9) {
      this.currentAnimation=0;
    }
    let size = this.imagePos[this.currentAnimation][1];
    let imageArea = this.imagePos[this.currentAnimation][0];
    ctx.drawImage(this.image,imageArea[0],imageArea[1],size[0],size[1],this.x,this.y,100,100);
      this.updateFrame();
    }

  updateFrame() {
    this.currentAnimation++;
  }




  move(timeDelta) {
    const velocityScale=timeDelta/(1000/30);
    const offsetX = 1*velocityScale;
    this.x = this.x - offsetX;
  }
}
module.exports=Unit;
