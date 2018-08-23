const Grid=require('./grid.js');
const TowerMenu=require('./towerSideBar.js');
const Unit=require('./unit.js');
const Tower=require('./tower.js');
const Bullet=require('./bullet.js');

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
    this.listOfBullets = [];
    const bulletImage = new Image();
    bulletImage.src = "./images/fireballImage.png";
    this.bulletImage=bulletImage;
    this.counter = 0 ;
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
         loc: gridPos,
         listOfMonsters: that.listOfMonsters
       };
       console.log(towerObjectAndPos.gridArea);
       let newTower = new Tower(towerObjectAndPos);
       console.log(newTower);
       that.listOfTowers.push(newTower);
    //   that.listOfTowers.push(towerObjectAndPos);
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
      if(currentMonster) {
        if(currentMonster.x<300) {
          this.gameOver= true;
        }
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


    for(let i = 0 ; i < this.listOfBullets.length ; i++) {
      let bullet = this.listOfBullets[i];
      // console.log("all bullets"+this.listOfBullets.length);
      bullet.move(delta);

      for(let j = 0 ; j < this.listOfMonsters.length ; j++) {
        let currentMonster = this.listOfMonsters[j];

        if(this.calculateDistance(bullet,currentMonster) <100) {
          currentMonster.health-=50;
          this.listOfBullets.splice(i,1);
          if(currentMonster.health<=0) {
            this.listOfMonsters.splice(j,1);
            this.counter++;
            console.log(this.counter);
          }
        }
      }
      //stop drawing bullets if bullets are past the canvas
      if(bullet.x > 1300) {
        this.listOfBullets.splice(i,1);
      }
    }
  }


  decreaseTowerHp(locationOfTower) {
      for(let i = 0 ; i < this.listOfTowers.length; i++) {
        let currentTower=this.listOfTowers[i];
        if(currentTower.loc === locationOfTower) {
          currentTower.health-=1;
          if(currentTower.health===0) {
          //  console.log(this.grid.numSquares[currentTower.loc].hasTower);
            this.grid.numSquares[currentTower.loc].hasTower=false;
            this.listOfTowers.splice(i,1);
          }
          // console.log(currentTower.health);
        }
      }
  }

  calculateDistance(obj1, obj2) {
    const xValues = Math.pow((obj2.x - obj1.x),2);
    const yValues = Math.pow((obj2.y-obj1.y),2);

    return Math.pow(xValues+yValues,0.5);
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
       if(currentMonster) {
         currentMonster.draw(ctx);
       }
    }


    let numBullets = this.listOfBullets.length;
    for(let i = 0 ; i < numBullets ; i++) {
      let currentBullet = this.listOfBullets[i];
      currentBullet.draw(ctx);
    }

    let numTowers = this.listOfTowers.length;
    for(let i = 0 ; i < numTowers ; i++) {

        let currentTower = this.listOfTowers[i];

        let tower = currentTower.tower;
        let currentGridArea = currentTower.gridArea;
        let currentSize = currentTower.size;
        tower.draw(ctx,currentGridArea.x, currentGridArea.y,currentSize.x, currentSize.y);

        //only the dinosaur can attack
        if(currentSize.x < 500) {

          for(let x = 0 ; x < currentTower.listOfbullets.length ; x++) {
            let currentBullet = currentTower.listOfbullets[x];
            this.listOfBullets = this.listOfBullets.concat(currentBullet);
            currentTower.listOfbullets=[];
          }

        }
    }
  }
}

module.exports=Game;
