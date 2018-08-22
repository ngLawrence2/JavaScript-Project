const Grid=require('./grid.js');
const TowerMenu=require('./towerSideBar.js');
const Unit=require('./unit.js');
const Tower=require('./tower.js');

class Game {
  constructor(grid,towerMenu,canvas,ctx) {
    this.numMonsters = 20;

    this.grid=grid;
    this.grid.draw(ctx);
    this.towerMenu=towerMenu;
    this.listOfMonsters= [];
    this.createMonsterPositions();
    this.gameOver = false;
    this.canvas=canvas;
    this.listOfTowers = [] ;
    this.ctx=ctx;
    this.addTowerToGrid(grid,towerMenu,canvas);
  }


  addTowerToGrid(grid,towerMenu,canvas) {
    let that = this;
    this.canvas.addEventListener('click', function(event) {
     var x = event.offsetX;
     var y = event.offsetY;
     const xEst =  Math.floor(x/100)*100;
     const yEst = Math.floor(y/100)*100

     console.log("x coords: " + x + ", y coords: " + y);
     const gridPos = grid.gridAreaClicked(x,y);
     let selectedTower = towerMenu.towerSelect(x,y);
     let size;
     if(selectedTower ===0 ) {
       size = {
         x:400,
         y:400
       }
     }

     if(selectedTower===1) {
       size = {
         x:500,
         y:600
       };
     }

     if(selectedTower===0 || selectedTower===1) {
       const currentTower = towerMenu.towers[selectedTower];
     }


     if(gridPos>=0 && grid.numSquares[gridPos].hasTower===false && (selectedTower===0 || selectedTower===1)) {
       grid.numSquares[gridPos].hasTower=true;

       console.log("putting selectedTower " + selectedTower + "at " + gridPos );
       let towerObjectAndPos = {
         tower: towerMenu.towers[selectedTower],
         gridArea: grid.numSquares[gridPos],
         size: size,

       };
    //   that.listOfTowers.push(new Tower(towerObjectAndPos));
       that.listOfTowers.push(towerObjectAndPos);
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
      let randX = Math.floor(Math.random()*500) + 1200; //get random number greater than 1300 for X axis of game
      let randY = (Math.floor(Math.random()*5)+1)*100;
      let monsterUnit = new Unit({image:monsterImage, context: this.ctx, x:randX, y:randY, grid:this.grid});
      this.listOfMonsters.push(monsterUnit);
    }
  }

  moveObjects(delta) {
    this.listOfMonsters.forEach(monster => {
      let towerAttacked = monster.attackTower();
      if(!towerAttacked) {
        monster.move(delta);
      } else {
        this.decreaseTowerHp(towerAttacked);
      }

    });
  }


  decreaseTowerHp(locationOfTower) {
    console.log("Dsa");
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

    let numTowers = this.listOfTowers.length;
    for(let i = 0 ; i < numTowers ; i++) {

        let currentObject = this.listOfTowers[i];
      
        let currentTower = currentObject.tower;
        let currentGridArea = currentObject.gridArea;
        let currentSize = currentObject.size;
        currentTower.draw(ctx,currentGridArea.x,currentGridArea.y,currentSize.x,currentSize.y);
    }

  }
}

module.exports=Game;
