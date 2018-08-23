class GameView {
  constructor(game,ctx) {
    this.ctx=ctx;
    this.game=game;
  }


  start() {
    this.lastTime=0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    if(!this.game.gameOver) {
      const timeDelta=time-this.lastTime;
      this.game.step(timeDelta);
      this.game.start(this.ctx);
      this.lastTime = time;
      setTimeout(()=>requestAnimationFrame(this.animate.bind(this)), 100);
    }
  }

}
module.exports = GameView;
