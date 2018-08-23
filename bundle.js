/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./tower_defense.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/bullet.js":
/*!***********************!*\
  !*** ./lib/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Bullet {\n  constructor(options) {\n    this.img = options.img;\n    this.x=options.x;\n    this.y=options.y;\n\n  }\n\n  draw(ctx) {\n\n    ctx.drawImage(this.img,219,23,138,147,this.x,this.y, 50,50);\n  }\n\n  move(timeDelta) {\n    const velocityScale=timeDelta/(1000/30);\n    const offsetX = 1*velocityScale;\n    this.x = this.x + 30;\n\n  }\n}\n\nmodule.exports = Bullet;\n\n\n//# sourceURL=webpack:///./lib/bullet.js?");

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Grid=__webpack_require__(/*! ./grid.js */ \"./lib/grid.js\");\nconst TowerMenu=__webpack_require__(/*! ./towerSideBar.js */ \"./lib/towerSideBar.js\");\nconst Unit=__webpack_require__(/*! ./unit.js */ \"./lib/unit.js\");\nconst Tower=__webpack_require__(/*! ./tower.js */ \"./lib/tower.js\");\nconst Bullet=__webpack_require__(/*! ./bullet.js */ \"./lib/bullet.js\");\nconst Money=__webpack_require__(/*! ./money.js */ \"./lib/money.js\");\n\nclass Game {\n  constructor(grid,towerMenu,canvas,ctx) {\n    this.numMonsters = 20;\n\n    this.grid=grid;\n    this.grid.draw(ctx);\n    this.towerMenu=towerMenu;\n    this.listOfMonsters= [];\n    this.createMonsterPositions();\n    this.gameOver = false;\n    this.canvas=canvas;\n    this.listOfTowers = [] ;\n    this.ctx=ctx;\n    this.addTowerToGrid(grid,towerMenu,canvas);\n    this.listOfBullets = [];\n    const bulletImage = new Image();\n    bulletImage.src = \"./images/fireballImage.png\";\n    this.bulletImage=bulletImage;\n    this.counter = 0 ;\n    this.drawDeathAnimationMonster=[];\n    this.money = 275;\n    this.moneyBags = [] ;\n\n    setInterval(() => {\n      this.createRandomCash();\n    },5000);\n  }\n\n  createRandomCash() {\n    let randomLoc = Math.floor(Math.random()*45);\n\n    while(this.grid.numSquares[randomLoc].hasMoney === true) {\n      randomLoc = Math.floor(Math.random()*45);\n    }\n    let moneyXLoc = this.grid.numSquares[randomLoc].x;\n    let moneyYLoc= this.grid.numSquares[randomLoc].y;\n    console.log(randomLoc);\n    this.grid.numSquares[randomLoc].hasMoney=true;\n    this.moneyBags.push(new Money(randomLoc,moneyXLoc,moneyYLoc));\n  }\n\n\n\n  addTowerToGrid(grid,towerMenu,canvas) {\n    let that = this;\n    this.canvas.addEventListener('click', function(event) {\n\n     var x = event.offsetX;\n     var y = event.offsetY;\n     const xEst =  Math.floor(x/100)*100;\n     const yEst = Math.floor(y/100)*100\n\n     console.log(\"x coords: \" + x + \", y coords: \" + y);\n     const gridPos = grid.gridAreaClicked(x,y);\n     let selectedTower = towerMenu.towerSelect(x,y);\n     let size;\n     if(selectedTower ===0 ) {\n       size = {\n         x:90,\n         y:100\n       };\n       if(that.money <100) {\n         selectedTower=null;\n       }\n     }\n\n     if(selectedTower===1) {\n       size = {\n         x:500,\n         y:600\n       };\n       if(that.money<75) {\n         selectedTower=null;\n\n       }\n     }\n\n  //   console.log(that.grid.numSquares[gridPos].hasMoney);\n     if(that.grid.numSquares[gridPos]) {\n       if(that.grid.numSquares[gridPos].hasMoney) {\n         that.money+=50;\n         for(let i = 0 ; i < that.moneyBags.length ; i++) {\n           let currentMoneyBag = that.moneyBags[i];\n           if(currentMoneyBag.loc === gridPos) {\n             that.moneyBags.splice(i,1);\n             that.grid.numSquares[gridPos].hasMoney=false;\n           }\n         }\n         return;\n       }\n     }\n     if(selectedTower===0 || selectedTower===1) {\n       let currentTower = towerMenu.towers[selectedTower];\n     }\n     if(gridPos>=0 && grid.numSquares[gridPos].hasTower===false && (selectedTower===0 || selectedTower===1)) {\n\n       grid.numSquares[gridPos].hasTower=true;\n       if(selectedTower===0) {\n         that.money-=100;\n       } else {\n         that.money-=75;\n\n       }\n\n       console.log(\"putting selectedTower \" + selectedTower + \"at \" + gridPos );\n\n       let towerObjectAndPos = {\n         tower: towerMenu.towers[selectedTower],\n         gridArea: grid.numSquares[gridPos],\n         size: size,\n         loc: gridPos,\n         listOfMonsters: that.listOfMonsters\n       };\n       console.log(towerObjectAndPos.gridArea);\n       let newTower = new Tower(towerObjectAndPos);\n       console.log(newTower);\n       that.listOfTowers.push(newTower);\n    //   that.listOfTowers.push(towerObjectAndPos);\n       selectedTower=-1;\n     }\n\n\n\n     console.log(towerMenu.selectedTower);\n     //alert(\"x coord:\" +xEst+ \" y coord:\" +  yEst);\n\n    }, false);\n  }\n\n  isOver() {\n    if(this.numMonsters===0) {\n      this.gameOver= true;\n    }\n    for(let i = 0 ; i < this.numMonsters; i++) {\n      let currentMonster = this.listOfMonsters[i];\n      if(currentMonster) {\n        if(currentMonster.x<300) {\n          this.gameOver= true;\n        }\n      }\n    }\n  }\n\n\n\n\n  // creates list of 20 monsters\n  createMonsterPositions() {\n    const monsterImage = new Image();\n    monsterImage.src=\"./images/monster2Sprite.png\";\n    for(let i = 0 ; i < this.numMonsters; i++) {\n      let randX = Math.floor(Math.random()*500) + 1200; //get random number greater than 1300 for X axis of game\n      let randY = (Math.floor(Math.random()*5)+1)*100;\n      let monsterUnit = new Unit({image:monsterImage, context: this.ctx, x:randX, y:randY, grid:this.grid});\n      this.listOfMonsters.push(monsterUnit);\n    }\n  }\n\n  moveObjects(delta) {\n    this.listOfMonsters.forEach(monster => {\n      let towerAttacked = monster.attackTower();\n      if(!towerAttacked) {\n        monster.move(delta);\n      } else {\n        this.decreaseTowerHp(towerAttacked);\n      }\n\n    });\n\n\n    for(let i = 0 ; i < this.listOfBullets.length ; i++) {\n      let bullet = this.listOfBullets[i];\n      // console.log(\"all bullets\"+this.listOfBullets.length);\n      bullet.move(delta);\n\n      for(let j = 0 ; j < this.listOfMonsters.length ; j++) {\n        let currentMonster = this.listOfMonsters[j];\n\n        if(this.calculateDistance(bullet,currentMonster) <30) {\n          currentMonster.health-=50;\n          currentMonster.attacked=true;\n          this.listOfBullets.splice(i,1);\n          if(currentMonster.health<=0) {\n            this.money+=40;\n            currentMonster.currentAnimation = 15;\n            // currentMonster.deathAnimation(ctx,0);\n            currentMonster.death = true;\n            this.drawDeathAnimationMonster.push(currentMonster);\n            this.listOfMonsters.splice(j,1);\n            this.counter++;\n            console.log(this.counter);\n          }\n        }\n      }\n      //stop drawing bullets if bullets are past the canvas\n      if(bullet.x > 1300) {\n        this.listOfBullets.splice(i,1);\n      }\n    }\n  }\n\n\n  decreaseTowerHp(locationOfTower) {\n      for(let i = 0 ; i < this.listOfTowers.length; i++) {\n        let currentTower=this.listOfTowers[i];\n        if(currentTower.loc === locationOfTower) {\n          currentTower.health-=1;\n          if(currentTower.health===0) {\n          //  console.log(this.grid.numSquares[currentTower.loc].hasTower);\n            this.grid.numSquares[currentTower.loc].hasTower=false;\n            this.listOfTowers.splice(i,1);\n          }\n          // console.log(currentTower.health);\n        }\n      }\n  }\n\n  calculateDistance(obj1, obj2) {\n    const xValues = Math.pow((obj2.x - obj1.x),2);\n    const yValues = Math.pow((obj2.y-obj1.y),2);\n\n    return Math.pow(xValues+yValues,0.5);\n  }\n\n\n\n\n  step(delta) {\n    this.moveObjects(delta);\n    this.isOver();\n  }\n\n  start(ctx) {\n\n    ctx.clearRect(0,0,1200,800);\n    this.grid.draw(ctx);\n    this.towerMenu.draw(ctx);\n    ctx.font = '48px serif';\n    ctx.strokeText(\"$\"+this.money, 100, 760);\n\n    ctx.strokeText(\"Monsters Left: \" + this.numMonsters, 700, 760);\n\n    for(let i = 0 ; i < this.numMonsters;i++) {\n       let currentMonster = this.listOfMonsters[i];\n       if(currentMonster) {\n         currentMonster.draw(ctx);\n       }\n    }\n\n    for(let i = 0 ; i < this.moneyBags.length;i++) {\n      let currentMoneyBag = this.moneyBags[i];\n      if(currentMoneyBag) {\n        currentMoneyBag.draw(ctx);\n      }\n    }\n\n\n    for(let i = 0 ; i < this.drawDeathAnimationMonster.length ; i++) {\n      let currentDeathMonster = this.drawDeathAnimationMonster[i];\n      currentDeathMonster.draw(ctx);\n\n      if(currentDeathMonster.currentAnimation >= currentDeathMonster.maxAnimation) {\n\n        this.drawDeathAnimationMonster.splice(i,1);\n      }\n    }\n\n    let numTowers = this.listOfTowers.length;\n    for(let i = 0 ; i < numTowers ; i++) {\n\n        let currentTower = this.listOfTowers[i];\n\n        let tower = currentTower.tower;\n        let currentGridArea = currentTower.gridArea;\n        let currentSize = currentTower.size;\n        tower.draw(ctx,currentGridArea.x, currentGridArea.y,currentSize.x, currentSize.y);\n\n        //only the dinosaur can attack\n        if(currentSize.x < 500) {\n\n          for(let x = 0 ; x < currentTower.listOfbullets.length ; x++) {\n            let currentBullet = currentTower.listOfbullets[x];\n            this.listOfBullets = this.listOfBullets.concat(currentBullet);\n            currentTower.listOfbullets=[];\n          }\n\n        }\n    }\n    let numBullets = this.listOfBullets.length;\n    for(let i = 0 ; i < numBullets ; i++) {\n      let currentBullet = this.listOfBullets[i];\n      currentBullet.draw(ctx);\n    }\n\n  }\n}\n\nmodule.exports=Game;\n\n\n//# sourceURL=webpack:///./lib/game.js?");

/***/ }),

/***/ "./lib/gameview.js":
/*!*************************!*\
  !*** ./lib/gameview.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameView {\n  constructor(game,ctx) {\n    this.ctx=ctx;\n    this.game=game;\n  }\n\n\n  start() {\n    this.lastTime=0;\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  animate(time) {\n    if(!this.game.gameOver) {\n      const timeDelta=time-this.lastTime;\n      this.game.step(timeDelta);\n      this.game.start(this.ctx);\n      this.lastTime = time;\n      setTimeout(()=>requestAnimationFrame(this.animate.bind(this)), 100);\n    }\n  }\n\n}\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./lib/gameview.js?");

/***/ }),

/***/ "./lib/grid.js":
/*!*********************!*\
  !*** ./lib/grid.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const gridArea = __webpack_require__(/*! ./gridArea.js */ \"./lib/gridArea.js\");\n\nclass Grid  {\n  constructor(sizeWidth,sizeHeight) {\n    this.sizeWidth=sizeWidth;\n    this.sizeHeight=sizeHeight;\n    this.numSquares = [];\n    this.createSquares();\n  }\n\n  \n\n  gridAreaClicked(mouseX,mouseY) {\n\n    for(let i = 0 ; i < this.numSquares.length ;i++) {\n      let currentGrid= this.numSquares[i];\n      if(currentGrid.checkWithInBounds(mouseX,mouseY)) {\n\n        return i;\n      }\n    }\n    return -1;\n  }\n\n  showGrid() {\n    for(let i = 0 ; i < this.numSquares.length; i++) {\n      console.log(this.numSquares[i].showInfo());\n    }\n  }\n\n  createSquares() {\n    for(let h=100; h<=this.sizeHeight;h+=100) {\n      for(let w=300; w<=this.sizeWidth;w+=100) {\n        this.numSquares.push(new gridArea(w,h));\n      }\n    }\n  }\n\n\n\n  draw(ctx) {\n    for(let h=100; h<=this.sizeHeight;h+=100) {\n      for(let w=300; w<=this.sizeWidth;w+=100) {\n        ctx.beginPath();\n        ctx.strokeStyle=\"#0f3d0f\";\n        ctx.strokeRect(w,h,100,100);\n      //  this.numSquares.push(new gridArea(w,h));\n      }\n    }\n  }\n}\n\nmodule.exports = Grid;\n\n\n//# sourceURL=webpack:///./lib/grid.js?");

/***/ }),

/***/ "./lib/gridArea.js":
/*!*************************!*\
  !*** ./lib/gridArea.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GridArea {\n  constructor(x,y) {\n    this.x=x;\n    this.y=y;\n    this.hasTower=false;\n    this.hasMoney=false;\n  }\n\n  showInfo() {\n    return {\n      x: this.x,\n      y: this.y,\n      hasTower: this.hasTower\n    }\n  }\n\n\n  checkWithInBounds(mouseX,mouseY) {\n    if(mouseX > this.x && mouseX < this.x + 100 && mouseY > this.y && mouseY < this.y+100) {\n      return true;\n    }\n    return false;\n  }\n\n}\n\nmodule.exports = GridArea;\n//898, 300\n\n\n//# sourceURL=webpack:///./lib/gridArea.js?");

/***/ }),

/***/ "./lib/money.js":
/*!**********************!*\
  !*** ./lib/money.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Money {\n  constructor(randomLoc, x, y) {\n    this.loc = randomLoc;\n    const moneyImg = new Image();\n    this.x=x;\n    this.y=y;\n    moneyImg.src = \"./images/moneySprite.png\";\n    this.img = moneyImg;\n  }\n\n  draw(ctx) {\n\n    ctx.drawImage(this.img, 0,0,600,600,this.x + 15,this.y,200,200);\n  }\n}\n\nmodule.exports = Money;\n\n\n//# sourceURL=webpack:///./lib/money.js?");

/***/ }),

/***/ "./lib/tower.js":
/*!**********************!*\
  !*** ./lib/tower.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Bullet = __webpack_require__(/*! ./bullet.js */ \"./lib/bullet.js\");\n\nclass Tower {\n\n  constructor(options) {\n    const TOWER_ATTACK_ANIMATION = [\n      [[22,397],[60,56]],\n      [[276,290],[47,73]], //1 for deathAnimation\n      [[343,290],[52,72]],\n      [[413, 315], [81,39]],\n      [[504,340], [81,23]] //4 end of deathAnimation\n    ];\n    this.currentAnimation = 0 ;\n    this.imagePos=TOWER_ATTACK_ANIMATION;\n    this.maxAnimation = 0;\n    this.x=options.x;\n    this.y=options.y;\n    this.loc=options.loc;\n    this.img = options.img;\n    this.gridArea = options.gridArea;\n    this.size=options.size;\n    this.tower=options.tower;\n    this.attack = false;\n    this.listOfbullets = [] ;\n    const bulletImage = new Image();\n    bulletImage.src = \"./images/fireballImage.png\";\n    this.bulletImage=bulletImage;\n    this.enemyUnits=options.listOfMonsters;\n\n    //bigger units have more health\n    if(this.size) {\n      if(this.size.x >=500) {\n        this.health=200;\n      } else {\n        this.health=50;\n      }\n    }\n\n    if(this.enemyUnits) {\n      setInterval(()=> {\n        this.shouldAttack()\n      },2500);\n    }\n\n  }\n\n  shouldAttack() {\n      for(let i = 0 ; i < this.enemyUnits.length ; i++) {\n        let currentUnit = this.enemyUnits[i];\n        if(currentUnit.y === this.gridArea.y && currentUnit.x < 1200) {\n            this.attack=true;\n            this.attackMonster();\n            return true;\n        }\n      }\n    //  this.maxAnimation=0;\n\n      this.attack = false;\n\n      return false;\n  }\n\n  attackMonster() {\n    if(this.attack) {\n        let attack = {\n          x: this.gridArea.x + 90,\n          y: this.gridArea.y ,\n          img: this.bulletImage\n        };\n\n        this.listOfbullets.push(new Bullet(attack));\n    }\n  }\n\n  draw(ctx,posX,posY,sizeX,sizeY) {\n\n    if(sizeX >=500) {\n     ctx.drawImage(this.img,0,0,sizeX,sizeY,posX,posY,100,100);\n    } else {\n      let size = this.imagePos[this.currentAnimation][1];\n      let imageArea = this.imagePos[this.currentAnimation][0];\n      ctx.drawImage(this.img,imageArea[0],imageArea[1],size[0],size[1],posX,posY,100,100);\n   }\n  }\n\n\n  updateFrame() {\n    this.currentAnimation++;\n\n  }\n}\n\nmodule.exports=Tower;\n\n\n//# sourceURL=webpack:///./lib/tower.js?");

/***/ }),

/***/ "./lib/towerSideBar.js":
/*!*****************************!*\
  !*** ./lib/towerSideBar.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class TowerSideBar {\n  constructor(towers) {\n    this.towers = towers;\n    this.selectedTower= null;\n  }\n\n  createTowers(ctx) {\n    ctx.beginPath();\n    ctx.fillStyle=\"#FFFFFF\";\n    const t1 = this.towers[0];\n    const t2 = this.towers[1];\n    ctx.fillRect(50,50,200,200);\n    // ctx.drawImage(t1.img,0,0,400,400,t1.x+20,t1.y,150,150);\n    ctx.drawImage(t1.img,0,0,90,100,t1.x+20,t1.y,150,150);\n    ctx.strokeRect(50,50,200,200);\n    ctx.fillRect(50,250,200,200);\n    ctx.font = '20px serif';\n    ctx.strokeText('$100', 190, 240);\n    ctx.drawImage(t2.img,0,0,500,625,t2.x,t2.y,150,150);\n    ctx.strokeRect(50,250,200,200);\n    ctx.strokeText('$75', 190, 425);\n  }\n\n  draw(ctx,img) {\n    ctx.beginPath();\n    ctx.fillStyle=\"#0f3d0f\";\n    ctx.strokeStyle==\"#0f3d0f\";\n    ctx.strokeRect(50,50,200,400);\n    this.createTowers(ctx);\n  }\n\n  towerSelect(mouseX,mouseY) {\n    if(mouseX > 50 && mouseY > 50 && mouseX < 250 && mouseY < 250) {\n      this.selectedTower = 0;\n      return 0;\n    }\n    if(mouseX > 50 && mouseY > 250 &&  mouseX <250 && mouseY < 450) {\n      this.selectedTower=1;\n      return 1;\n    }\n    return this.selectedTower;\n  }\n}\n\nmodule.exports = TowerSideBar;\n\n\n//# sourceURL=webpack:///./lib/towerSideBar.js?");

/***/ }),

/***/ "./lib/unit.js":
/*!*********************!*\
  !*** ./lib/unit.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Unit {\n  constructor(options) {\n    const IMAGE_POSITIONS=[\n      [[43,53],[112,92]],\n      [[239,54],[114,91]],\n      [[428,62],[117,83]],\n      [[618,61],[119,84]],\n      [[807,55],[117,92]],\n      [[45,248],[114,91]],\n      [[235,256],[116,83]],\n      [[424,255],[119,84]],\n      [[614,256],[121,83]],\n      [[815,254],[112,85]],//9 walking\n      [[232,445],[118,93]],//10 attacking\n      [[438,453],[141,85]],\n      [[582,455],[189,83]],\n      [[811,454],[149,84]],//13 attacking end\n      [[22,421],[151,119]],//14 attacked\n      [[73,1002],[109,124]],// 15 death animation\n      [[249,1051],[125,76]],\n      [[423,1053],[143,74]],\n      [[615,1053],[143,74]],\n      [[793,1055],[157,72]] // 19 last death animation\n    ];\n    this.imagePos=IMAGE_POSITIONS;\n    const randomAnimation = Math.floor(Math.random()*10);\n    this.currentAnimation = randomAnimation;\n    this.context = options.context;\n    this.width=options.width;\n    this.height=options.height;\n    this.image=options.image;\n    this.health = 200;\n    this.x = options.x;\n    this.y=options.y;\n    this.grid=options.grid;\n    this.maxAnimation =  9 ; //defaulted for walking\n    this.attacked=false\n    this.attackedFrame=0;\n    this.attacking=false;\n    this.death = false;\n  }\n\n  attackTower() {\n    let posX = this.x ;\n    let posY = this.y + 1;\n    let currentSquare = this.grid.gridAreaClicked(posX,posY);\n    if(currentSquare >=1) {\n      if(this.grid.numSquares[currentSquare].hasTower) {\n        this.attacking = true;\n        this.maxAnimation=13;\n        return currentSquare;\n        // return true;\n      }\n    }\n    this.maxAnimation=9;\n    this.attacking = false;\n    return false;\n  }\n\n\n\n\n  draw(ctx) {\n    // if(this.currentAnimation > 9) {\n    if(this.currentAnimation > this.maxAnimation) {\n      this.currentAnimation=0;\n    }\n    if(this.attacked) {\n      this.currentAnimation=14;\n      this.attackedFrame++;\n    }\n    if(this.attackedFrame ===2) {\n      this.attackedFrame=0;\n      this.attacked=false;\n    }\n    if(this.death) {\n      this.maxAnimation = 19;\n      this.currentAnimation++;\n    }\n\n    let size = this.imagePos[this.currentAnimation][1];\n    let imageArea = this.imagePos[this.currentAnimation][0];\n    ctx.drawImage(this.image,imageArea[0],imageArea[1],size[0],size[1],this.x,this.y,100,100);\n      this.updateFrame();\n    }\n\n  updateFrame() {\n    this.currentAnimation++;\n  }\n\n\n\n\n  move(timeDelta) {\n    const velocityScale=timeDelta/(1000/30);\n    const offsetX = 1*velocityScale;\n    this.x = this.x - offsetX;\n  }\n}\nmodule.exports=Unit;\n\n\n//# sourceURL=webpack:///./lib/unit.js?");

/***/ }),

/***/ "./tower_defense.js":
/*!**************************!*\
  !*** ./tower_defense.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Grid = __webpack_require__(/*! ./lib/grid.js */ \"./lib/grid.js\");\nconst Unit = __webpack_require__(/*! ./lib/unit.js */ \"./lib/unit.js\");\nconst TowerMenu= __webpack_require__(/*! ./lib/towerSideBar.js */ \"./lib/towerSideBar.js\");\nconst Game=__webpack_require__(/*! ./lib/game.js */ \"./lib/game.js\");\nconst GameView=__webpack_require__(/*! ./lib/gameview.js */ \"./lib/gameview.js\");\nconst Tower = __webpack_require__(/*! ./lib/tower.js */ \"./lib/tower.js\");\n\nwindow.unit=Unit;\nwindow.grid=Grid;\nwindow.game=Game;\n\nconst unitImage1=new Image();\nunitImage1.src=\"./images/monster2Sprite.png\";\n\nconst towerImage1 = new Image();\ntowerImage1.src= \"./images/tower1.png\";\n\nconst towerImage2 = new Image();\ntowerImage2.src= \"./images/tower2.png\";\n\n\nconst towerImage3 = new Image();\ntowerImage3.src = \"./images/tower3.png\";\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"game-canvas\");\n  const ctx = canvas.getContext(\"2d\");\n  const grid = new Grid(1100,500);\n\n  let tower1Constructor = {\n    x:50,\n    y:50,\n    img: towerImage1\n  };\n\n  let tower2Constructor = {\n    x:50,\n    y:250,\n    img:towerImage2\n  };\n\n  let tower3Constructor = {\n    x:50,\n    y:50,\n    img: towerImage3\n  }\n\n  // const tower1 = new Tower(50,50,towerImage1);\n  // const tower2 = new Tower(50,250,towerImage2);\n   const tower1 = new Tower(tower1Constructor);\n   const tower2 = new Tower(tower2Constructor);\n   const tower3 = new Tower(tower3Constructor);\n\n\n  const towerMenu=new TowerMenu([tower3,tower2]);\n  const game = new Game(grid,towerMenu,canvas,ctx);\n\n\n\n  const gameview = new GameView(game,ctx);\n  gameview.start();\n\n  //gets the position at the grid that was picked\n//   canvas.addEventListener('click', function(event) {\n//    var x = event.offsetX;\n//    var y = event.offsetY;\n//    console.log(\"x coords: \" + x + \", y coords: \" + y);\n//    grid.gridAreaClicked(x,y);\n//    towerMenu.towerSelect(x,y);\n//    const xEst =  Math.floor(x/100)*100;\n//    const yEst = Math.floor(y/100)*100\n//    console.log(towerMenu.selectedTower);\n//    //alert(\"x coord:\" +xEst+ \" y coord:\" +  yEst);\n//\n// }, false);\n\n\n});\n\n\n//# sourceURL=webpack:///./tower_defense.js?");

/***/ })

/******/ });