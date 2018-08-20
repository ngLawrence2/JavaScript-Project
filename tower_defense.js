const Grid = require('./lib/grid.js');
const Unit = require('./lib/unit.js');

window.unit=Unit;
window.grid=Grid;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");


  canvas.addEventListener('click', function(event) {

   var x = event.offsetX;
   var y = event.offsetY;
   console.log("x coords: " + x + ", y coords: " + y);
   const xEst =  Math.floor(x/100)*100;
   const yEst = Math.floor(y/100)*100
   alert("x coord:" +xEst+ " y coord:" +  yEst);

}, false);


});
