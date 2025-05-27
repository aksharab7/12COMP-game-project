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

var jack, platformGroup, wallBot;
var lastY;

let seconds = TIMELIMIT;
let timer;
let score = 0;
let gameActive = true;

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
  createCanvas(windowWidth, windowHeight - 5);
  world.gravity.y = 19;

  createJack();             
  createPlatforms();   

  wallBot = new Sprite(0, height, 2 * width, 20, 'k'); // Create bottom wall
  wallBot.color = 'green';

  lastY = jack.y;

  timer = setInterval(timerFunc, 1000); // Start countdown timer
}

/*******************************************************/
// draw() 
// Main game loop
/*******************************************************/
function draw() {
  clear();
   if (gameActive) {
    moveJack();
    updateScore();
  }
  drawScore();
  camera.y = jack.y; // Camera follows Jack vertically

}

/*******************************************************/
// createJack() 
// Create Jack sprite 
// Called by setup ()
/*******************************************************/
function createJack() {
  jack = createSprite(width / 2, height - JACKHEIGHT, JACKWIDTH, JACKHEIGHT, 'd');
  jack.img = jackRightImg;
  jackRightImg.resize(100, 120);
  jack.image.offset.y = -10;
  jack.image.offset.x = 4;
  jack.rotationLock = true;
  jack.debug = true;

}

/*******************************************************/
// moveJack()
// Jack's movement and jumping
// Called by draw()
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
  }

  if (kb.pressing("space")) {
    jack.vel.y -= 0.5;
  }
}

/*******************************************************/
// createPlatforms()
// Create multiple platforms
// Called by setup()
/*******************************************************/
function createPlatforms() {
  platformGroup = new Group();

  for (let i = 0; i < 50; i++) {
    let platformWidth = random(50, 120);
    let posX = random(100, width - 100);
    let posY = jack.y - i * 80;

    let platform = new Sprite(posX, posY, PLATFORMWIDTH, PLATFORMHEIGHT, "s");
    platform.img = platformImg;
    platformImg.resize(120, 40);
    platform.image.offset.y = 3
    platform.image.offset.x = -20;
    platformGroup.add(platform);
  }
   platformGroup.debug = true; 
}

/*******************************************************/
// updateScore() 
// Score changes with height
// Called by draw()
/*******************************************************/
function updateScore() {
 if (jack.y < lastY && jack.colliding(platformGroup)) {
    score++;
  } else if (jack.y > lastY && jack.colliding(platformGroup)) {
    score = max(0, score - 1);
  }
  lastY = jack.y;
}

/*******************************************************/
// timerFunc() 
// Game timer
// Called by setup()
/*******************************************************/
function timerFunc() {
  seconds--;
  P_TIME_OBJ.textContent = seconds;

  if (seconds <= 0) {
   gameActive = false;
   clearInterval(timer);
  }
}

/*******************************************************/
// drawScore() 
// Show score and time on screen
// called by draw()
/*******************************************************/
function drawScore() {
  camera.off();

  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
  text("Time: " + seconds + "s", 20, 50);

   if (gameActive == false) {
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2 - 40);
    text("Final Score: " + score, width / 2, height / 2 + 20);
  }

  camera.on();
}

/*******************************************************/
// gameOver() 
// End the game and show final score
// called by timerFunc()
/*******************************************************/
function gameOver() {
  clearInterval(timer);

  camera.off();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over!", width / 2, height / 2 - 40);
  text("Final Score: " + score, width / 2, height / 2 + 20);
  camera.on();

  noLoop(); // Stop draw() loop
}
