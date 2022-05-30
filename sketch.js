const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit;
var blink
var eat
var sad
var air
var eatingSound
var ropeCut
var crying
var backGroundsound

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
air=loadSound("air.wav")
eatingSound=loadSound("eating_sound.mp3")
ropeCut=loadSound("rope_cut.mp3")
crying=loadSound("sad.wav")
backGroundsound=loadSound("sound1.mp3")
eat.looping=false
sad.looping=false
}

function setup() 
{
  var isMobile=/iPhone|iPad|iPod|Andriod/i.test(navigator.userAgent)
  if (isMobile){
    canW=displayWidth
    canH=displayHeight
  }
  else{
    canW=windowWidth
    canH=windowHeight
  }
  createCanvas(canW,canH);
  frameRate(80);
  backGroundsound.play()
  backGroundsound.setVolume(0.1)
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(950,940,1900,20);

  blink.frameDelay=15
  sad.frameDelay=20
  bunny=createSprite(450,850,80,80)
  bunny.scale=0.25
  bunny.addAnimation("blink",blink)
  bunny.addAnimation("eat",eat)
  bunny.addAnimation("sad",sad)
  bunny.changeAnimation("blink")

  rope = new Rope(7,{x:365,y:40});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  rope1 = new Rope(8,{x:35,y:40});

rope2 = new Rope(4,{x:410,y:200});

  fruit_con = new Link(rope,fruit);
  fruit_con1 = new Link(rope1,fruit);
  fruit_con2 = new Link(rope2,fruit);

  cutButton=createImg("cut_btn.png")
  cutButton.position(340,40)
  cutButton.size(50,50)
  cutButton.mouseClicked(drop)

  button1=createImg("cut_btn.png")
  button1.position(20,40)
  button1.size(50,50)
  button1.mouseClicked(drop1)
  
  button2=createImg("cut_btn.png")
  button2.position(360,200)
  button2.size(50,50)
  button2.mouseClicked(drop2)

  balloonButton=createImg("balloon.png")
  balloonButton.position(30,250)
  balloonButton.size(120,90)
  balloonButton.mouseClicked(rightforce)

  muteButton=createImg("mute.png")
  muteButton.position(1830,20)
  muteButton.size(60,60)
  muteButton.mouseClicked(mute)
  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,canW,canH);
if (fruit!==null){
  image(food,fruit.position.x,fruit.position.y,70,70);
}
if (collide(fruit,bunny)==true){
  bunny.changeAnimation("eat")
  eatingSound.play()
}
if (collide(fruit,ground.body)==true){
  bunny.changeAnimation("sad")
  backGroundsound.stop()
  crying.play()
}
  rope.show();
  rope1.show();
  rope2.show();
  Engine.update(engine);
  ground.show();

 drawSprites();
   
}

function drop(){
  ropeCut.play()
  rope.break()
  fruit_con.unlink()
  fruit_con=null
}

function drop1(){
  ropeCut.play()
  rope1.break()
  fruit_con1.unlink()
  fruit_con1=null
}

function drop2(){
  ropeCut.play()
  rope2.break()
  fruit_con2.unlink()
  fruit_con2=null
}

function collide(body,sprite){
  if(body!==null){
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if (d<100){
      World.remove(world,fruit)
      fruit=null
      return true
    }
    else{return false}



  }
  
}
function rightforce(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.02,y:0})
  air.play()
}
function mute(){
  if(backGroundsound.isPlaying()){
    backGroundsound.stop()
  }
  else{
    backGroundsound.play()
  }
}