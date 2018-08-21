const Grid=require('./grid.js');
const TowerMenu=require('./towerSideBar.js');
const Unit=require('./unit.js');

class Game {
  constructor(grid,towerMenu,ctx) {
    this.numMonsters = 20;
    this.grid=grid;
    this.towerMenu=towerMenu;
    this.listOfMonsters= [];
    this.ctx=ctx;
    this.createMonsterPositions();

  }

  isOver() {
    if(this.numMonsters===0) {
      return true;
    }
    for(let i = 0 ; i < this.numMonsters; i++) {
      let currentMonster = this.listOfMonsters[i];
      if(currentMonster.x<300) {
        return true;
      }
    }
    return false;
  }




  // creates list of 20 monsters
  createMonsterPositions() {
    const monsterImage = new Image();
    monsterImage.src="./images/monster2Sprite.png";
    for(let i = 0 ; i < this.numMonsters; i++) {
      let randX = Math.floor(Math.random()*50) + 1300; //get random number greater than 1300 for X axis of game
      let randY = (Math.floor(Math.random()*5)+1)*100;

      let monsterUnit = new Unit({image:monsterImage, context: this.ctx, x:randX, y:randY});
      this.listOfMonsters.push(monsterUnit);
    }
  }


  start(ctx) {
    this.grid.draw(ctx);
    this.towerMenu.draw(ctx);
    for(let i = 0 ; i < this.numMonsters;i++) {
      //  let currentMonster = this.listOfMonsters[i];
    }
  }
}

module.exports=Game;
