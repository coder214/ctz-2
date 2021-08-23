const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var base, rightWall, leftWall;
var bridge;
var jointPoint, jointLink;

var stones = [];

var zombie;
var zombie1, zombie2, zombie3, zombie4;

var bg;

var breakButton;

function preload(){
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");
  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");

  bg = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  //base = new Base(width-1520,height-50,width, height/15);
  
  //rightWall = new Base(1398, 300, 100, 400);
  //leftWall = new Base(2, 300, 100, 400);

  bridge = new Bridge(29, {x:width/40, y:height-450});
  jointPoint = new Base(width-230 ,height-430 , 10, 10);

  Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for(var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-100, 100);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

  zombie = createSprite(width / 2, height - 110);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.scale = 0.1
  zombie.velocityX = 10;
 
  breakButton = createImg("./assets/axe.png");
  breakButton.size(50,50);
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);
}

function draw() {
  background(bg);
  Engine.update(engine);

  //base.display();
  //rightWall.display();
  //leftWall.display();

  bridge.show();

  for(var stone of stones){
    stone.display();
  }

  /*if(zombie.position.x >= width-300 && !collided){
    zombie.velocityX = -10;
    zombie.changeAnimation('rigthtoleft');
  }*/

  /*if(zombie.position.x <= width-300 && !collided){
    zombie.velocityX = 10;
    zombie.changeAnimation('lefttoright');
  }*/
  
  drawSprites();
}

function handleButtonPress(){
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}