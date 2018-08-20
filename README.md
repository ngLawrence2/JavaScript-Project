# Tower Defense

## Background and Overview

  Tower defense is a game where users will create towers to defend
  their territory. The game will be made up in a grid. Users put towers
  in a certain grid location and units will spawn on the right side of the
  canvas.
  Users will have to earn money to buy towers and put towers down in
  strategic locations within the grid. When units have walked into the same
  grid as a tower, the unit will attack the tower and the tower will lose health
  over time. To lose the game, the unit will have reached the left of the canvas.
  To win, the user must hold out until all units have been killed.

  ## Functionality & MVP

  In tower defense, users will be able to:
- [ ] Create different towers depending on what they can afford
- [ ] Hear sounds when units die, towers getting hit, and tower attacking
units
- [ ] Restart the game
- [ ] Collect money to create towers
- [ ] See how many units are left

In addition, this project will include:
- [ ] Instructions on the goal

## Wireframes

This app will consist of a single screen with a grid as the background and
a list of towers on the side. Users will be able to select from the list of towers
from the sidebar and place into a grid.
There will also be nav links to my Github, LinkedIn, instructions, and a restart button.


 ![wireframe](https://thumb.ibb.co/howBoK/tower_def.png)

 There will be better images and animation rather than the images shown, this will be the skeleton of how the game works.


 ## Architecture and Technologies 

 This project will be implemented with the following technologies:
* Vanilla JavaScript for the overall structure and game logic. 
* HTML5 canvas for DOM manipulation and rendering. 
* Webpack to bundle scripts 

## Implementation Timeline 

Over the weekend
- [ ] Create grid of the game with a background 
- [ ] Learn about animation and get sprites for animation

Day 1 Start rendering enemy units and create towers 
- [ ] Learn about animation and be able to render enemy units
- [ ] Start on collision between tower attacks and enemy units

Day 2 Learn how to include audio and be able to create towers
- [ ] create audio and background music 
- [ ] Create sidebar menu for towers 

Day 3 Create towers and set on location and have towers attack automatically
- [ ] write logic for tower class with attacking every set interval
- [ ] fix bugs and handle invalid moves

Day 4 Testing and completing unfinished tasks
- [ ] Test the game and see if there are any bugs
- [ ] Create Restart for the game

