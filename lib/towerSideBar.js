class TowerSideBar {
  constructor(towers) {
    this.towers = towers;
    this.selectedTower= null;
  }

  createTowers(ctx) {
    ctx.beginPath();
    // ctx.fillStyle="##33FF4C";
    ctx.fillStyle="#FFFFFF";
    const t1 = this.towers[0];
    const t2 = this.towers[1];
    ctx.fillRect(50,50,200,200);
    // ctx.drawImage(t1.img,0,0,400,400,t1.x+20,t1.y,150,150);
    ctx.drawImage(t1.img,0,0,90,100,t1.x+20,t1.y,150,150);
    ctx.strokeRect(50,50,200,200);
    ctx.fillRect(50,250,200,200);
    ctx.font = '20px serif';
    ctx.strokeText('$100', 190, 240);
    ctx.drawImage(t2.img,0,0,500,625,t2.x,t2.y,150,150);
    ctx.strokeRect(50,250,200,200);
    ctx.strokeText('$75', 190, 425);
  }

  draw(ctx,img) {
    ctx.beginPath();
    ctx.fillStyle="#0f3d0f";
    ctx.strokeStyle=="#0f3d0f";
    ctx.strokeRect(50,50,200,400);
    this.createTowers(ctx);
  }

  towerSelect(mouseX,mouseY) {
    if(mouseX > 50 && mouseY > 50 && mouseX < 250 && mouseY < 250) {
      this.selectedTower = 0;
      return 0;
    }
    if(mouseX > 50 && mouseY > 250 &&  mouseX <250 && mouseY < 450) {
      this.selectedTower=1;
      return 1;
    }
    return this.selectedTower;
  }
}

module.exports = TowerSideBar;
