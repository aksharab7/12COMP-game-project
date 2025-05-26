

/*******************************************************/
// Project: Create a Game
// Jumping-Jack
/// Written by Akshara
/*******************************************************/


/*******************************************************/
// Variables
/*******************************************************/
const PLATFORMWIDTH = 110;
const PLATFORMHEIGHT = 20;
const JACKWIDTH = 10;
const JACKHEIGHT = 70;
const PLATFORMMIN = -9;
const PLATFORMMAX= 10;


var jack, platformGroup, wallBot;
let isJumping = false;
let jumpForce = -12;
let gravity = 0.5;


             
/*******************************************************/
// preload()
// Loading Images
/*******************************************************/
function preload() {
   console.log("preload:");
   jackRightImg = loadImage('/images/jumping-jack-right.png');
   jackLeftImg = loadImage('/images/jumping-jack-left.png');
   platformImg = loadImage('/images/platform.png');
  }




/*******************************************************/
// setup()
/*******************************************************/
function setup() {
   console.log ("setup:");
   createCanvas(windowWidth, windowHeight-5);
   createJack();         // create jack
   createWalls();        // create walls
   createPlatfroms();    // create platforms
  }
  
/*******************************************************/
// draw ()
// Game loop
/*******************************************************/
function draw() {
  clear();       // clears screen before each frame
  moveJack(); 
  
camera.x = jack.x; // set camera to Jack's x position
wallBot.x = jack.x;
camera.on();
jack.draw(); // draw Jack
camera.off();
  }


/*******************************************************/
// createJack()
// Create the main sprite
// Called by setup()
/*******************************************************/
function createJack(){
 console.log("createJack()");
 jack = createSprite(100, height - JACKHEIGHT, JACKWIDTH, JACKHEIGHT, 'k');
 jack.img = (jackRightImg);
 jackRightImg.resize(100, 120);
 jack.vel.x = 1.5;// update Jack's position and controls
}


/*******************************************************/
// moveJack()
// Move the main sprite
// Called by draw()
/*******************************************************/
function moveJack(){
  console.log("moveJack()");
  // Move left/right
  if (kb.pressing("left")) {
   jack.x -= 5;
   jack.img = jackLeftImg;
   jackLeftImg.resize(100, 120);
  }
  if (kb.pressing("space")) {
    jack.y = -5;
    }
}


/*******************************************************/
// createPlatfroms()
// Create moving platforms
// Called by setup()
/*******************************************************/
function createPlatfroms() {
  console.log("createPlatfroms()");
  platformGroup = new Group ();
  let numPlatforms = 20;
  let verticalSpacing = height / (numPlatforms + 1);


  for (i = 0; i < numPlatforms; i++) {
  let posX = random(PLATFORMWIDTH / 2, width - PLATFORMWIDTH / 2); // Random X within screen bounds
  let posY = height - (i + 1) * verticalSpacing; // Even vertical spacing
  platform = new Sprite(posX, posY, PLATFORMWIDTH, PLATFORMHEIGHT, "s");
  platform.img =  (platformImg);
  platformImg.resize(120, 40);
  platform.vel.x = random(-5,10)  // velocity for each sprite
  platform.vel.y = 0;
  platformGroup.add(platform);
  platform.add;
}


}


/*******************************************************/
// createWalls()
// Creates walls on left, right, and bottom
// Called by setup()
/*******************************************************/
 function createWalls(){
    console.log("createWalls()");
    // Bottom Wall 
    wallBot = new Sprite(width ,height , 2 * width, 8, 'k');
    wallBot.color = 'green';
}


/*******************************************************
// PlatformHitWall()
// Repositions platform when it hits left/right wall
// Called by createPlatfroms()
/*******************************************************/




