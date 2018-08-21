const Grid=require('./grid.js');
const TowerMenu=require('./towerSideBar.js');
const Unit=require('./unit.js');

class Game {
  constructor(grid,towerMenu,canvas) {
    this.numMonsters = 20;
    this.grid=grid;
    this.towerMenu=towerMenu;
    this.listOfMonsters= [];
    this.createMonsterPositions();
    this.gameOver = false;
    this.canvas=canvas;
    this.addTowerToGrid(grid,towerMenu,canvas);
  }


  addTowerToGrid(grid,towerMenu,canvas) {
    this.canvas.addEventListener('click', function(event) {
     var x = event.offsetX;
     var y = event.offsetY;
     const xEst =  Math.floor(x/100)*100;
     const yEst = Math.floor(y/100)*100

     console.log("x coords: " + x + ", y coords: " + y);
     const gridPos = grid.gridAreaClicked(x,y);
     let selectedTower = towerMenu.towerSelect(x,y);

     if(selectedTower===0 || selectedTower===1) {
       const currentTower = towerMenu.towers[selectedTower];

     }


     if(gridPos>=0 && grid.numSquares[gridPos].hasTower===false && (selectedTower===0 || selectedTower===1)) {
       grid.numSquares[gridPos].hasTower=true;
       console.log("putting selectedTower " + selectedTower + "at " + gridPos );
       towerMenu.towers[selectedTower];
       selectedTower=-1;
     }



     console.log(towerMenu.selectedTower);
     //alert("x coord:" +xEst+ " y coord:" +  yEst);

    }, false);
  }

  isOver() {
    if(this.numMonsters===0) {
      this.gameOver= true;
    }
    for(let i = 0 ; i < this.numMonsters; i++) {
      let currentMonster = this.listOfMonsters[i];
      if(currentMonster.x<300) {
        this.gameOver= true;
      }
    }
  }




  // creates list of 20 monsters
  createMonsterPositions() {
    const monsterImage = new Image();
    monsterImage.src="./images/monster2Sprite.png";
    for(let i = 0 ; i < this.numMonsters; i++) {
      let randX = Math.floor(Math.random()*500) + 800; //get random number greater than 1300 for X axis of game
      let randY = (Math.floor(Math.random()*5)+1)*100;
      let monsterUnit = new Unit({image:monsterImage, context: this.ctx, x:randX, y:randY});
      this.listOfMonsters.push(monsterUnit);
    }
  }

  moveObjects(delta) {
    this.listOfMonsters.forEach(monster => {
      monster.move(delta);
    });
  }

  step(delta) {
    this.moveObjects(delta);
    this.isOver();
  }

  start(ctx) {
    ctx.clearRect(0,0,1200,800);
    this.grid.draw(ctx);
    this.towerMenu.draw(ctx);
    for(let i = 0 ; i < this.numMonsters;i++) {
       let currentMonster = this.listOfMonsters[i];
         currentMonster.draw(ctx);
    }
  }
}

module.exports=Game;
