//Create variables here
var dog_img,dog;
var happydog_img;
var database;
var foodS,foodStock;

function preload(){
  //loading images
  dog_img=loadImage("images/dogImg.png")
  happydog_img=loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(500, 500);
  
  database= firebase.database();

  dog=createSprite(250,300,50,50);
  dog.addImage(dog_img)
  dog.scale=0.1;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  
}

function draw() {  
  background(46,139,87);

 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydog_img);    
  }

  drawSprites();
  //add styles here
  fill("white")
  textSize(25)
  text("food remaining :"+ foodS,160,200)
  textSize(15)
  text("Note: Pree UP_ARROW Key to fEEd drago milk",130,10,300,20)
}

function readStock(data){
  foodS=data.val();

}
// function to write value in DB
function writeStock(x){
  if(x<=0){
  x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}