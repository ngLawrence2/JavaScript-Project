class GameView {
  constructor(game,ctx,canvas) {
    this.ctx=ctx;
    this.game=game;
    this.canvas=canvas;
    this.shouldStart=false;

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
    }
  }

}
module.exports = GameView;
