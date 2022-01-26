var spaceship,spaceshipImg;
var bg,bgImg;
var edges;
var bullet,bulletGroup;
var TIE,TIEImg,TIEGroup;
var SD, SDImg, SDGroup;
var laser,laserImg,laserGroup;
var blast,blastImg;
var Blast, BlastImg;
var Win, WinImg;
var button;
var gameState = 0;
var gameOver,gameOverImg;
var Score=0;

function preload(){
spaceshipImg=loadImage("spaceship.png");
bgImg=loadImage("Space.jpg");
TIEImg=loadImage("TIEFigher.png");
SDImg=loadImage("StarDestroyer.png");
laserImg=loadImage("laser.png");
blastImg=loadImage("Blast.png");
BlastImg=loadImage("Blast.png");
gameOverImg=loadImage("GameOver.png");
WinImg=loadImage("YouWin.png");
}

function setup() {
createCanvas(1300,650);

bg=createSprite(200,200,10,10);
bg.addImage("bg",bgImg);
bg.scale=1.1;
  
spaceship=createSprite(675,550,10,10);
spaceship.addImage("spaceship",spaceshipImg);
spaceship.scale=0.4;
spaceship.visible=false;

button=createButton("Play");
button.style('width','10%');
button.style('height','5%');
button.style('fonSize','x-large');
button.position(550,600);

gameOver=createSprite(600,325);
gameOver.addImage("gameOver",gameOverImg);
gameOver.visible=false;

Win=createSprite(600,325);
Win.addImage("Win",WinImg);
Win.visible=false;

edges=createEdgeSprites();

TIEGroup= new Group();
laserGroup= new Group();
bulletGroup= new Group();
SDGroup = new Group();

spaceship.setCollider("circle",0,0,70);
//spaceship.debug=true;
}

function draw() {
background("bg");

button.mousePressed(function(){
gameState=1;
})

if (gameState === 1){
button.hide();
spaceship.visible=true;
spaceship.bounceOff(edges);
enemy();
bg.velocityY= 8;

if(bg.y>300){
bg.y=50;
}

if(keyDown("RIGHT_ARROW")){
spaceship.x += 6;
}

if(keyDown("LEFT_ARROW")){
spaceship.x -= 6;
}

if(keyDown("space")){
bullet=createSprite(spaceship.x,spaceship.y-30,5,100);
bullet.velocityY= -10;
bullet.shapeColor="green";
bullet.lifeTime=498;
bulletGroup.add(bullet);
}

if(laserGroup.isTouching(spaceship)){
blast=createSprite(spaceship.x,spaceship.y);
blast.addImage("blast",blastImg);
blast.lifetime=5;
TIEGroup.destroyEach();
SDGroup.destroyEach();
bulletGroup.destroyEach();
laserGroup.destroyEach();
gameState=2;
}

if(bulletGroup.isTouching(TIEGroup)){
TIEGroup.destroyEach();
Blast=createSprite(TIE.x,TIE.y);
Blast.addImage("Blast",BlastImg);
Blast.lifetime=5;
laser.destroy();
bulletGroup.destroyEach();
Score+=10;
console.log("abc");
}

if(bulletGroup.isTouching(SDGroup)){
    SDGroup.destroyEach();
    Blast=createSprite(SD.x,SD.y);
    Blast.addImage("Blast",BlastImg);
    Blast.lifetime=5;
    laser.destroy();
    bulletGroup.destroyEach();
    Score+=10;
    console.log("abc");
    }
    if(Score === 10){
        enemy2();
        
        }
}

else if(gameState === 2){
bg.velocityY=0;
spaceship.destroy();
TIEGroup.destroyEach();
bulletGroup.destroyEach();
laserGroup.destroyEach();
SDGroup.destroyEach();
gameOver.visible=true;
}

if(Score === 500){
    bg.velocityY=0;
    spaceship.destroy();
    TIEGroup.destroyEach();
    bulletGroup.destroyEach();
    laserGroup.destroyEach();
    SDGroup.destroyEach();
    Win.visible=true;
}


drawSprites();

if(gameState === 0){
fill("white");
textSize(25);
text("SPACE INVADERS",487,30)
text("Press 'SPACE' to shoot",470,90);
text("Use 'RIGHT & LEFT' arrow keys to move right and left",280,125);
text("From a place far far away from your planet Lothal, there are some evils planning to destroy your sweet home… ",20,170);
text("You being the head of a very big space organisation on Lothal, had noticed that there are ",20,210);
text("some unknown ships found at the end of heliosphere",20,250)
text("After doing some research, your team has found out that they are aliens from an other planet Exegol ",20,290);
text("heading towards Lothal to destroy the living life here and then capture the planet",20,330);
text("You and your team have to destroy them so that you can save your planet",20,370);
text("Are you ready for this ??",20,410);
bg.velocityY=0;
}

fill("white");
textSize(25);
text("Score="+ Score,10,20);
text("Reach the Score 500 to 'Win' the game",10,50);
}

function enemy(){
if(gamstate=1 && frameCount %100 === 0){
TIE=createSprite(random(spaceship.x,1000),random(20,spaceship.y-200));
TIE.addImage("TIE",TIEImg);
TIE.depth=bg.depth+1;
TIE.scale=0.5;
TIE.lifeTime=200;
TIEGroup.add(TIE);
laser=createSprite(TIE.x,TIE.y,10,10);
laser.addImage("laser",laserImg);
laser.velocityX=random(-20,-4);
laser.velocityY=18;
laser.scale=1.5;
laser.lifeTime=200;
laserGroup.add(laser);
}
}

function enemy2(){
    if(score=80 && frameCount %100 === 0){
    SD=createSprite(random(spaceship.x,-10),random(20,spaceship.y-100));
    SD.addImage("SD",SDImg);
    SD.depth=bg.depth+1;
    SD.scale=1;
    SD.lifeTime=200;
    SDGroup.add(SD);
    laser=createSprite(SD.x,SD.y,10,10);
    laser.addImage("laser",laserImg);
    laser.velocityX=random(20,-4);
    laser.velocityY=25;
    laser.scale=1.5;
    laser.lifeTime=300;
    laserGroup.add(laser);
    }
    }
