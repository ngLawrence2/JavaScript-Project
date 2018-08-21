const Grid = require('./lib/grid.js');
const Unit = require('./lib/unit.js');
const TowerMenu= require('./lib/towerSideBar.js');
const Game=require('./lib/game.js');
const GameView=require('./lib/gameview.js');

window.unit=Unit;
window.grid=Grid;
window.game=Game;

const unitImage1=new Image();
unitImage1.src="./images/monster2Sprite.png";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  const grid = new Grid(1100,500);
  //grid.draw(ctx);


  const towerMenu=new TowerMenu();
  //towerMenu.draw(ctx);

  //
  // const u = new Unit({image:unitImage1, context: ctx});
  // unitImage1.onload = () => {
  //   u.draw(ctx);
  // }

 const game = new Game(grid,towerMenu,ctx);
  //  game.start(ctx);
  const gameview = new GameView(game,ctx);
 //gameview.start();




  //gets the position at the grid that was picked
  canvas.addEventListener('click', function(event) {
   var x = event.offsetX;
   var y = event.offsetY;
   console.log("x coords: " + x + ", y coords: " + y);
   grid.gridAreaClicked(x,y);

   const xEst =  Math.floor(x/100)*100;
   const yEst = Math.floor(y/100)*100
   alert("x coord:" +xEst+ " y coord:" +  yEst);

}, false);


});
