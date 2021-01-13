var tower, towerImg;
var door, doorImg, doorG;
var climber, climberImg, climberG;
var ghost, ghostImg;
var bottom, bottomG;
var play = 1;
var over = 0;
var gameState = "play";
var sound;


function preload(){

  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  sound = loadSound("spooky.wav");

}



function setup(){

  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.35
  ghost.setCollider("rectangle", 0, 0, 200, 200);

  doorG = new Group();
  climberG = new Group();
  bottomG = new Group();

}

function draw(){

  background("black");
       
  if(gameState === "play"){
  
//  sound.play();
  
  if(tower.y >400){
  tower.y = 300;
}

  if(keyDown("left")){
    ghost.x = ghost.x -3;
  }else if(keyDown("right")){
    ghost.x = ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -10;
  } 

  ghost.velocityY = ghost.velocityY + 0.8;

  if(climberG.isTouching(ghost)){
  
  ghost.velocityY = 0;
  
  }
  
  if(bottomG.isTouching(ghost)||ghost.y>600){
  gameState = "end";
  }


    doorSpawn();



  
  drawSprites();
  } else if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
  }
}

  function doorSpawn(){
  
  if(frameCount%240 === 0){
  
    door = createSprite(Math.round(random(120, 400), -50));
      door.addImage("door", doorImg);
      door.velocityY = 1;
      door.lifetime = 750;
      doorG.add(door);
      door.depth = ghost.depth;
      ghost.depth = ghost.depth+1;
      
    climber = createSprite(door.x, door.y+65);
      climber.addImage("climber", climberImg)
      climber.velocityY = 1;
      climber.lifetime = 750;
      climberG.add(climber);
      
      bottom = createSprite(door.x, climber.y+5, climber.width, 2);
      bottom.velocityY = 1;
      bottom.debug = true;
      bottomG.add(bottom);
  
  
  }
   
 

   
  }