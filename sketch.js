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
var button;
var fruit_i , back_i , rabbit_i;
var bunny;
var button;
var blink,eat,sad;

function preload () {
  fruit_i = loadImage("./assets/melon.png");
  back_i = loadImage("./assets/background.png");
  rabbit_i = loadImage("./assets/rabbit-01.png");
  blink = loadAnimation("./assets/blink_1.png","./assets/blink_2.png","./assets/blink_3.png");
  eat = loadAnimation("./assets/eat_0.png","./assets/eat_1.png","./assets/eat_2.png","./assets/eat_3.png","./assets/eat_4.png");
  sad = loadAnimation("./assets/sad_1.png","./assets/sad_2.png","./assets/sad_3.png");
  
  blink.playing = true;
  sad.playing = true;
  // eat.playing = true;

  eat.looping = false;
  sad.looping = false;

  eat.frameDelay = 20;
  sad.frameDelay = 20;
  blink.frameDelay = 20;
}
function setup()
{
  createCanvas(500,700);
  frameRate(60);

  

  bunny = createSprite(250,630,100,100);
  bunny.addImage(rabbit_i);

  bunny.addAnimation("eating",eat);
  bunny.addAnimation("blinking",blink);
  bunny.addAnimation("not happy",sad);

  bunny.changeAnimation("blinking")

  bunny.scale = 0.2;

  button = createImg("./assets/cut_button.png");
  button.position(245,30);
  button.size(50,50);
  button.mouseClicked(drop);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,700,600,20);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER)
  textSize(50)
  
}

function draw() 
{
  image(back_i,250,350,500,700);
  rope.show();

  if(fruit!==null)
  {  
  image(fruit_i,fruit.position.x,fruit.position.y,60,60);
  
  }
  if(collide(bunny,fruit)){
     bunny.changeAnimation("eating");

  }
  if(collide(fruit,ground.body))
  {
    bunny.changeAnimation("sad");
  }
  // ellipse(fruit.position.x,fruit.position.y,30,30);
  Engine.update(engine);
  ground.show();

 drawSprites()
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function collide(sprite,body)
{
  if(body)
  {
    var dis = dist(sprite.position.x,sprite.position.y,body.position.x,body.position.y);

    if(dis<=80)
    {
      World.remove(engine.world,fruit);
      fruit = null;
     
      return true;
    }

    else{
      return false;
    }
  }
}
