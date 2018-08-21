const gridArea = require('./gridArea.js');

class Grid  {
  constructor(sizeWidth,sizeHeight) {
    this.sizeWidth=sizeWidth;
    this.sizeHeight=sizeHeight;
    this.numSquares = [];
  }

  gridAreaClicked(mouseX,mouseY) {
    for(let i = 0 ; i < this.numSquares.length ;i++) {
      let currentGrid= this.numSquares[i];
      if(currentGrid.checkWithInBounds(mouseX,mouseY)) {
        console.log("grid at position " + i);
        return i;
      }
    }
    return -1;
  }

  showGrid() {
    for(let i = 0 ; i < this.numSquares.length; i++) {
      console.log(this.numSquares[i].showInfo());
    }
  }

  draw(ctx) {
    for(let h=100; h<=this.sizeHeight;h+=100) {
      for(let w=300; w<=this.sizeWidth;w+=100) {
        ctx.beginPath();
        ctx.strokeStyle="#0f3d0f";
        ctx.strokeRect(w,h,100,100);
        this.numSquares.push(new gridArea(w,h));
      }
    }
  }
}

module.exports = Grid;
