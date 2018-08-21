class TowerSideBar {
  constructor(towers) {
    this.towers = towers;
  }

  draw(ctx,img) {
    ctx.beginPath();
    ctx.fillStyle="#0f3d0f";
    ctx.strokeStyle=="#0f3d0f";
    ctx.strokeRect(50,50,200,500);
  
  }

}

module.exports = TowerSideBar;
