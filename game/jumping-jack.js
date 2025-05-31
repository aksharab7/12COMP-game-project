/*******************************************************/
// Project: Create a Game
// Jumping-Jack
// Written by Akshara
/*******************************************************/

/*******************************************************/
// Constants and Variables
/*******************************************************/
const JACKWIDTH = 80;
const JACKHEIGHT = 100;
const PLATFORMWIDTH = 80;
const PLATFORMHEIGHT = 20;
const TIMELIMIT = 30;

let jack, platformGroup, wallBot;
let timer;
let seconds = TIMELIMIT;
let score = 0;

/*******************************************************/
// preload() 
// Load images
/*******************************************************/
function preload() {
  console.log("preload:");

  jackRightImg = loadImage('/images/jumping-jack-right.png');
  jackLeftImg = loadImage('/images/jumping-jack-left.png');
  platformImg = loadImage('/images/platform.png');
}

/*******************************************************/
// setup()
// Called once to set up the game
/*******************************************************/
function setup() {
  console.log("setup:");

  // Set up the canvas and world
  createCanvas(windowWidth, windowHeight - 5);
  world.gravity.y = 20;

  createJack();
  createPlatforms();
  html_listen4Debug();

  //creating the bottom wall
  wallBot = new Sprite(0, height, 2 * width, 20, 'k'); 
  wallBot.color = 'green';

  // Start countdown timer
  timer = setInterval(timerFunc, 1000); 
}

/*******************************************************/
// draw() 
// Main game loop
/*******************************************************/
function draw() {
  clear();
  moveJack();
  updateScore();
  drawScore();

  // Camera follows Jack vertically
  camera.y = jack.y;
}

/*******************************************************/
// createJack() 
// Create Jack sprite 
// Called by setup ()
// Input:  n/a
// Return: n/a
/*******************************************************/
function createJack() {
  console.log("createJack:");

  jack = createSprite(width / 2, height - JACKHEIGHT, JACKWIDTH, JACKHEIGHT, 'd');
  jack.img = jackRightImg;
  jackRightImg.resize(100, 120);
  jack.image.offset.y = -10;
  jack.image.offset.x = 4;
  jack.rotationLock = true;
}

/*******************************************************/
// moveJack()
// Jack's movement and jumping
// Called by draw()
// Input:  n/a
// Return: n/a
/*******************************************************/
function moveJack() {
  if (kb.pressing("left")) {
    jack.x -= 5;
    jack.img = jackLeftImg;
    jackLeftImg.resize(100, 120);
    jack.image.offset.y = -10;
    jack.image.offset.x = -5;
  } else if (kb.pressing("right")) {
    jack.x += 5;
    jack.img = jackRightImg;
    jackRightImg.resize(100, 120);
    jack.image.offset.y = -10;
    jack.image.offset.x = 4;
  }
  
  // Jump if space is pressed
  if (kb.presses("space")) {
    jack.vel.y = -10;
  }
}

/*******************************************************/
// createPlatforms()
// Create multiple platforms
// Called by setup()
// Input:  n/a
// Return: n/a
/*******************************************************/
function createPlatforms() {
  console.log("createPlatforms:");

  // Create a group for platforms scattered across the screen
  platformGroup = new Group();
  for (let i = 0; i < 300; i++) {
    let posX = random(100, width - 100);    //random X position
    let posY = jack.y - i * 80;             //spaced 80px apart vertically

    let platform = new Sprite(posX, posY, PLATFORMWIDTH, PLATFORMHEIGHT, "s");
    platform.img = platformImg;
    platformImg.resize(120, 40);
    platform.image.offset.y = 3;
    platform.image.offset.x = -20;
    platformGroup.add(platform);
  }
}

/*******************************************************/
// updateScore() 
// Score changes with height
// Called by draw()
// Input:  n/a
// Return: n/a
/*******************************************************/
function updateScore() {
  if (jack.vel.y < -1) {
    // Jack is going upward
    score++;
  } else if (jack.vel.y > 1) {
    // Jack is falling
    score = max(0, score - 1);
  }
}

/*******************************************************/
// timerFunc() 
// Game timer
// Called by setup()
// Input:  n/a
// Return: n/a
/*******************************************************/
function timerFunc() {
  console.log("timerFunc:");
  seconds--;

  if (seconds <= 0) {
    gameOver();
    clearInterval(timer);
  }
}

/*******************************************************/
// drawScore() 
// Show score and time on screen
// Called by draw()
// Input:  n/a
// Return: n/a
/*******************************************************/
function drawScore() {
  camera.off();

  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
  text("Time: " + seconds + "s", 20, 50);

  camera.on();
}

/*******************************************************/
// gameOver() 
// End the game and show final score
// Called by timerFunc()
// Input:  n/a
// Return: n/a
/*******************************************************/
function gameOver() {
  // Stop draw() loop
  noLoop();
  clearInterval(timer);

  // Save score and high score in sessionStorage
  sessionStorage.setItem("score", score);
  const highScore = sessionStorage.getItem("highScore") || 0;
  if (score > highScore) {
    sessionStorage.setItem("highScore", score);
  }

  window.location.href = "jj_end.html";
}

/**************************************************************/
// html_listen4Debug()
// Register keyboard keydown event
// To check if user wants sprite debug mode OR not
//  Hit ctrl-z to turn debug mode on
//  Hti ctrl-x to turn debug mode off
// Input:  n/a
// Return: n/a
/**************************************************************/
function html_listen4Debug() {
  console.log('%c html_listen4Debug(): ',
          'color: white; background-color: purple;');

  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'z') {
      console.log('%c html_listen4Debug(): ACTIVE',
          'color: white; background-color: purple;');
      // Place debug code here ***************************
      // EG to set debug mode for all sprites 
      allSprites.debug = true; 
      
      // To slow the frame rate down to 1 frame/sec
      frameRate(1);
      
      // OR to tell P5 to NOT call the draw loop again (freeze the screen)
      //noLoop();
      
    }
    else if (event.ctrlKey && event.key === 'x') {
      console.log('%c html_listen4Debug(): INACTIVE',
          'color: white; background-color: purple;');
      // Place code to turn off debug mode here *********
      // EG to turn off debug mode for all sprites
      allSprites.debug = false; 
      
      // To reset frame rate to 60 frame/sec
      frameRate(60);
      
      // OR if you set noLoop() - to start P5 calling the draw loop again
      //loop();
    }
  });
}
 