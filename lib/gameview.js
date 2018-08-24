class GameView {
  constructor(game,ctx,canvas) {
    this.ctx=ctx;
    this.game=game;
    this.canvas=canvas;
    this.shouldStart=false;
    const gameOverImage = new Image();
    gameOverImage.src  = "./images/gameOver.jpg";
    this.gameOverImg = gameOverImage;
  }




  start() {
    this.lastTime=0;
      requestAnimationFrame(this.animate.bind(this));

  }

  animate(time) {
    if(!this.game.gameOver) {
      const timeDelta=time-this.lastTime;

      this.game.step(timeDelta);
      this.game.start(this.ctx, this.shouldStart);
      this.lastTime = time;
      setTimeout(()=>requestAnimationFrame(this.animate.bind(this)), 100);

    } else {
        console.log("Dsa");
        this.ctx.drawImage(this.gameOverImg,500,200,400,200);
    }
  }

}
module.exports = GameView;
