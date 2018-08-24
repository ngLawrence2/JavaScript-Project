# Tower Defense

### [Live Demo](https://nglawrence2.github.io/JavaScript-Project/)


Tower Defense is a 2D game made with vanilla JavaScript and HTML canvas. The goal
of the game is to prevent units from reaching the left of the canvas by buying towers.

## Animation
![Animation](https://media.giphy.com/media/myMbq2eMz5vE2lmJF5/giphy.gif)

The animation of the squid has been created with multiple images found in a sprite. Each
frame display one part of the sprite. One challenge of displaying the animation is that
the sprite image has too few images. Cycling through all the images every frame will
make the squid appear as if it is flickering. A solution to this was to set a timer and
request a new frame after the timer. With this solution, it reduces the need to require
more images to produce this animation.

## Collision Detection
![Collsion](https://media.giphy.com/media/B0X3pE1HKVgjBT40VM/giphy.gif)

The collision detection between the bullets and the squid has been created
with the distance formula. I used the distance formula by calculating
the x and y coordinate of the bullet and monster. From this result,
I used a comparison to determine whether the distance is smaller than the
width of the bullet.

```
calculateDistance(obj1, obj2) {
  const xValues = Math.pow((obj2.x - obj1.x),2);
  const yValues = Math.pow((obj2.y-obj1.y),2);
  return Math.pow(xValues+yValues,0.5);
}

if(this.calculateDistance(bullet,currentMonster) <30) {
  currentMonster.health-=50;
  currentMonster.attacked=true;
}
```


### Future Ideas
* Create more towers for the user on the sidebar
* Create monsters that have different abilities
* Levels

 
