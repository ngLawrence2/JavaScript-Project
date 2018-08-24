const Grid=require('./grid.js');
const TowerMenu=require('./towerSideBar.js');
const Unit=require('./unit.js');
const Tower=require('./tower.js');
const Bullet=require('./bullet.js');
const Money=require('./money.js');

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
    this.drawDeathAnimationMonster=[];
    this.money = 275;
    this.moneyBags = [] ;


    setInterval(() => {
      this.createRandomCash();
    },5000);
  }

  createRandomCash() {

    let randomLoc = Math.floor(Math.random()*45);

    while(this.grid.numSquares[randomLoc].hasMoney === true) {
      randomLoc = Math.floor(Math.random()*45);
    }
    let moneyXLoc = this.grid.numSquares[randomLoc].x;
    let moneyYLoc= this.grid.numSquares[randomLoc].y;
    console.log(randomLoc);
    this.grid.numSquares[randomLoc].hasMoney=true;
    if(this.gameOver===false && this.shouldStart===true) {
      this.moneyBags.push(new Money(randomLoc,moneyXLoc,moneyYLoc));
    }
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
         x:90,
         y:100
       };
       if(that.money <100) {
         selectedTower=null;
       }
     }

     if(selectedTower===1) {
       size = {
         x:500,
         y:600
       };
       if(that.money<75) {
         selectedTower=null;

       }
     }

  //   console.log(that.grid.numSquares[gridPos].hasMoney);
     if(that.grid.numSquares[gridPos]) {
       if(that.grid.numSquares[gridPos].hasMoney) {
         that.money+=50;
         for(let i = 0 ; i < that.moneyBags.length ; i++) {
           let currentMoneyBag = that.moneyBags[i];
           if(currentMoneyBag.loc === gridPos) {
             that.moneyBags.splice(i,1);
             that.grid.numSquares[gridPos].hasMoney=false;
           }
         }
         return;
       }
     }
     if(selectedTower===0 || selectedTower===1) {
       let currentTower = towerMenu.towers[selectedTower];
     }
     if(gridPos>=0 && grid.numSquares[gridPos].hasTower===false && (selectedTower===0 || selectedTower===1)) {

       grid.numSquares[gridPos].hasTower=true;
       if(selectedTower===0) {
         that.money-=100;
       } else {
         that.money-=75;

       }

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
    if(this.listOfMonsters.length===0) {
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

        if(this.calculateDistance(bullet,currentMonster) <30) {
          currentMonster.health-=50;
          currentMonster.attacked=true;
          this.listOfBullets.splice(i,1);
          if(currentMonster.health<=0) {
            this.money+=40;
            currentMonster.currentAnimation = 15;
            // currentMonster.deathAnimation(ctx,0);
            currentMonster.death = true;
            this.drawDeathAnimationMonster.push(currentMonster);
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


  createInstructions() {
    this.ctx.fillStyle="#FFFFFF";
    this.ctx.fillRect(400,100,600,400);
    this.ctx.font = '48px serif';
    this.ctx.strokeText("Instructions", 400,150);
    this.ctx.font = '25px serif';
    this.ctx.strokeText("Defend the house from the monsters", 410, 250);
    this.ctx.strokeText("Hire people on the left to help you", 410, 280);
    this.ctx.strokeText("Click anywhere to begin!", 420, 350);
    let that = this;
    this.canvas.addEventListener('click',function(event) {
      that.shouldStart=true;
    });
  }

  step(delta) {
    if(this.shouldStart===true) {
      this.moveObjects(delta);
      this.isOver();
    }
  }

  start(ctx,shouldStart) {

    if(!this.shouldStart) {
      this.createInstructions();
      return;
    }

  

    ctx.clearRect(0,0,1200,800);
    this.grid.draw(ctx);
    this.towerMenu.draw(ctx);
    ctx.font = '48px serif';
    ctx.strokeText("$"+this.money, 100, 760);

    ctx.strokeText("Monsters Left: " + this.listOfMonsters.length, 700, 760);

    for(let i = 0 ; i < this.numMonsters;i++) {
       let currentMonster = this.listOfMonsters[i];
       if(currentMonster) {
         currentMonster.draw(ctx);
       }
    }

    for(let i = 0 ; i < this.moneyBags.length;i++) {
      let currentMoneyBag = this.moneyBags[i];
      if(currentMoneyBag) {
        currentMoneyBag.draw(ctx);
      }
    }


    for(let i = 0 ; i < this.drawDeathAnimationMonster.length ; i++) {
      let currentDeathMonster = this.drawDeathAnimationMonster[i];
      currentDeathMonster.draw(ctx);

      if(currentDeathMonster.currentAnimation >= currentDeathMonster.maxAnimation) {

        this.drawDeathAnimationMonster.splice(i,1);
      }
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
    let numBullets = this.listOfBullets.length;
    for(let i = 0 ; i < numBullets ; i++) {
      let currentBullet = this.listOfBullets[i];
      currentBullet.draw(ctx);
    }
  }
}

module.exports=Game;
