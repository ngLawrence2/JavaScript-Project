const Grid = require('./lib/grid.js');
const Unit = require('./lib/unit.js');
const TowerMenu= require('./lib/towerSideBar.js');
const Game=require('./lib/game.js');
const GameView=require('./lib/gameview.js');
const Tower = require('./lib/tower.js');

window.unit=Unit;
window.grid=Grid;
window.game=Game;

const unitImage1=new Image();
unitImage1.src="./images/monster2Sprite.png";

const towerImage1 = new Image();
towerImage1.src= "./images/tower1.png";

const towerImage2 = new Image();
towerImage2.src= "./images/tower2.png";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const grid = new Grid(1100,500);

  const tower1 = new Tower(50,50,towerImage1);
  const tower2 = new Tower(50,250,towerImage2);

  const towerMenu=new TowerMenu([tower1,tower2]);
  const game = new Game(grid,towerMenu,canvas);



  const gameview = new GameView(game,ctx);
  gameview.start();

  //gets the position at the grid that was picked
//   canvas.addEventListener('click', function(event) {
//    var x = event.offsetX;
//    var y = event.offsetY;
//    console.log("x coords: " + x + ", y coords: " + y);
//    grid.gridAreaClicked(x,y);
//    towerMenu.towerSelect(x,y);
//    const xEst =  Math.floor(x/100)*100;
//    const yEst = Math.floor(y/100)*100
//    console.log(towerMenu.selectedTower);
//    //alert("x coord:" +xEst+ " y coord:" +  yEst);
//
// }, false);


});
