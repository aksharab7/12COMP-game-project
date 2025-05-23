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
const JACKWIDTH = 70;
const JACKHEIGHT = 70;
const PLATFORMMIN = -9;
const PLATFORMMAX= 10;

var wallGroup, platformGroup, wallLH, wallRH, wallBot;
             
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
  moveJack();    // update Jack's position and controls
  }

/*******************************************************/
// createJack()
// Create the main sprite
// Called by setup()
/*******************************************************/
function createJack(){
 console.log("createJack()");
 jack = createSprite(width/2, height - JACKHEIGHT, JACKWIDTH, JACKHEIGHT, 'k');
 jack.img = (jackRightImg);
 jackRightImg.resize(100, 120);
}

/*******************************************************/
// moveJack()
// Move the main sprite
// Called by draw()
/*******************************************************/
function moveJack(){
if (kb.pressing("left")) {
   jack.x -= 5;
   jack.img = jackLeftImg;
   jackLeftImg.resize(100, 120);
 } else if (kb.pressing("right")) {
   jack.x += 5;
     jack.img = jackRightImg;
   }
 }

/*******************************************************/
// createPlatfroms()
// Create moving platforms
// Called by setup()
/*******************************************************/
function createPlatfroms() {
  platformGroup = new Group ();
  platformGroup.collides(wallGroup, platformHitWall);  // bounce off walls

 for ( i = 0; i < 10; i++) {
   var xPos = random(width - PLATFORMWIDTH);  // random horizontal position
   var yPos = height - i * 70;                // vertical position
   platform = new Sprite(xPos, yPos, PLATFORMWIDTH, PLATFORMHEIGHT, 'd');
   platform.img =  (platformImg);
   platformImg.resize(120, 40);
   platform.vel.x = random(PLATFORMMIN, PLATFORMMAX);  // velocity for each sprite
   platform.vel.y = 0;
   platformGroup.add(platform);
   platform.rotation.vel = 0;
   platform.rotation = 0;
   platform.add;
}

}

/*******************************************************/
// createWalls()
// Creates invisible walls on left, right, and bottom
// Called by setup()
/*******************************************************/
 function createWalls(){
    wallGroup = new Group ();
    // Left Wall
    wallLH  = new Sprite(0, height/2, 8, height, 'k');
    wallLH.color = 'blue';
    wallGroup.add(wallLH);
    // Right Wall
    wallRH  = new Sprite(width, height/2, 8, height, 'k');
    wallRH.color = 'blue';
    wallGroup.add(wallRH);
    // Bottom Wall
    wallBot = new Sprite(width ,height , 2 * width, 8, 'k');
    wallBot.color = 'green';
}

/*******************************************************/
// platformHitWall()
// Repositions platform when it hits left/right wall
// Called by createPlatfroms()
/*******************************************************/
function platformHitWall(platform, wallRH) {
  platform.x = random(PLATFORMWIDTH/2, width-PLATFORMWIDTH/2);
  platform.y = random(PLATFORMHEIGHT/2, 2 * PLATFORMHEIGHT);
  platform.vel.x = random(PLATFORMMIN, PLATFORMMAX);
  platform.vel.y = 0;
}
