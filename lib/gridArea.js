class GridArea {
  constructor(x,y) {
    this.x=x;
    this.y=y;
    this.hasTower=false;
  }

  showInfo() {
    return {
      x: this.x,
      y: this.y,
      hasTower: this.hasTower
    }
  }


  checkWithInBounds(mouseX,mouseY) {
    if(mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y && mouseY < this.y+100) {
      return true;
    }
    return false;
  }

}

module.exports = GridArea;
//898, 300
