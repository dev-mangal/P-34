//Create variables here
var dog,dogimg,dogimg2,database,foodstock,food; 

function preload()
{
  //load images here
  dogimg=loadImage("images/dogImg.png");
  dogimg2=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(700, 700);
  database=firebase.database();
  dog=createSprite(350,350);
  dog.addImage(dogimg);
  dog.scale=0.2;
  foodstock=database.ref('food');
  foodstock.on("value",function(data){
    food=data.val();
  });
}


function draw() {  
  background("yellow");
  fill("white");
  textSize(20);
  text("Food Remaining:"+food,280,150);
  text("PRESS UP ARROW TO FEED BRUNO",200,20);
  if(keyDown(UP_ARROW)){
    updatestock(food);
    dog.addImage(dogimg2);
  }
  drawSprites();
  //add styles here
  
}

function updatestock(x){
  if(x<=0){
    x=0;
  }
  else{
    x-=1;
  }
  database.ref('/').update({food:x});
}

