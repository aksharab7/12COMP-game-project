/*******************************************************/
// Project: Create a Game
// Jumping-Jack
// Written by Akshara
/*******************************************************/

/*******************************************************/
// Constants and Variables
/*******************************************************/
const JACKWIDTH = 10;
const JACKHEIGHT = 70;
const TIMELIMIT = 30;

var lastY;
var jack, platformGroup, wallBot;

let P_TIME_OBJ;
let seconds = TIMELIMIT;
let timer;
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
  createCanvas(windowWidth, windowHeight - 5);
  world.gravity.y = 10;

  createJack();             
  createPlatforms();   

  wallBot = new Sprite(0, height, 2 * width, 20, 'k'); // Create bottom wall
  wallBot.color = 'green';

  lastY = jack.y;

  timer = setInterval(timerFunc, 1000); // Start countdown timer
  P_TIME_OBJ = document.getElementById("p_time");
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
  camera.y = jack.y; // Camera follows Jack vertically

}

/*******************************************************/
// createJack() 
// Create Jack sprite 
// Called by setup ()
/*******************************************************/
function createJack() {
  console.log("createJack()");
  jack = createSprite(width / 2, height - JACKHEIGHT, JACKWIDTH, JACKHEIGHT, 'd');
  jack.img = jackRightImg;
  jackRightImg.resize(100, 120);
  jack.rotationLock = true;
}

/*******************************************************/
// moveJack()
// Jack's movement and jumping
// Called by draw()
/*******************************************************/
function moveJack() {
  console.log("moveJack()");

  if (kb.pressing("left")) {
    jack.x -= 5;
    jack.img = jackLeftImg;
    jackLeftImg.resize(100, 120);
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
  console.log("createPlatforms()");
  platformGroup = new Group();

  for (let i = 0; i < 50; i++) {
    let platformWidth = random(50, 120);
    let posX = random(100, width - 100);
    let posY = jack.y - i * 80;

    let platform = new Sprite(posX, posY, platformWidth, 20, "s");
    platform.img = platformImg;
    platformImg.resize(120, 40);
    platformGroup.add(platform);
  }
}

/*******************************************************/
// updateScore() 
// Score changes with height
// Called by draw()
/*******************************************************/
function updateScore() {
  if (jack.y < lastY) {
    score++; // Going up
  } else if (jack.y > lastY) {
    score = max(0, score - 1); // Falling down
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
    gameOver(); // Stop game when time is up
  }
}

/*******************************************************/
// drawScore() 
// Show score and time on screen
// called by draw()
/*******************************************************/
function drawScore() {
  console.log("drawScore()");
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
// called by timerFunc()
/*******************************************************/
function gameOver() {
  console.log("gameOver()");
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
