var mgr;
function setup(){
  createCanvas(700,700);
  mgr = new SceneManager();
  mgr.addScene(homeScreen);
  mgr.addScene(writingGame);
  mgr.addScene(squareGame);
  mgr.addScene(levelGame);
  mgr.showNextScene();
}//end setup

function draw(){
  mgr.draw();
}//end draw

function keyPressed(){
    switch(key){
       case '-':
       mgr.showScene( homeScreen );
       break;
       case '0':
       mgr.showScene( writingGame );
       break;
       case '9':
       mgr.showScene( ballGame );
       break;
       case '8':
       mgr.showScene( squareGame );
       break;
       case '7':
       mgr.showScene( traceGame );
       break; 
       case '=':        
       mgr.showScene( levelGame);
       break;    
    }//end switch
  mgr.handleEvent("keyPressed");
}//end keyPressed
  function homeScreen(){
   this.enter = function(){
    createCanvas(700, 700);
    background(220);
    textAlign(LEFT, TOP)
    textSize(15)
    fill("black")
    text('Home menu', 60, 80);
    text("To play Writing Game, press 0", 20,100);
    text("To play Ball Game, press 9", 20,120);
    text("To play Square Game, press 8", 20,140);
    text("To play Trace Game, press 7", 20,160);
    text("To play the Level Game, press = ", 20,180);
    text("To return to this screen at any time, press -", 20,200);
   }//end enter
  }//end homeScreen

  function writingGame(){ 
      let message = "";
      var me = this;
      this.enter = function() {
      createCanvas(700, 700);
      background(255);
      //header
      fill(184,50,139);
      //Title
      textSize(50);
      fill(0);
      noStroke();
      text("Typing Game", 10, 52);
      message = " ";
    }//end this.enter

  this.draw = function() {
//model text
  textSize(65);
  fill(100);
  stroke(100);
  //First line
  text("a 1", 25,220);
  text("b 2", 140,220);
  text("c 3", 255,220);
  text("d 4", 365, 220);
  text("e 5", 475, 220);
  text("f 6", 600, 220);
  //user input
  fill(0);
  text(message, 25, 380);
  let sWidth = message.length;
  if (sWidth >= 25 && message == " a 1 b 2 c 3 d 4 e 5 f 6 "){
      correct()
    }//end if
  else if (sWidth >= 25 && message != " a 1 b 2 c 3 d 4 e 5 f 6 "){
      wrong()
    }//end else if
  }//end this.draw
  this.keyPressed = function(){
    message += key + " ";
  }//end keyPressed
  function correct(){
      removeElements()
      textSize(15)
      text('You typed correctly! Press 9 to try again, and - to return to the home           screen', 10,250)
  }//end correct
  function wrong(){
    removeElements()
    textSize(15)
    text('You typed incorrectly. Press 9 to try again and - to return to home screen',     10,250)
  }//end wrong
}//end writingGame

function ballGame(){
  var me = this;
  var y = -20;
  var x = 200;
  var s = 2;
  var score = 0;

  this.enter = function(){
    createCanvas(700, 700);
    reset();
  }//end this.enter
  
  this.draw = function() {
    background(220)
    text("Score = " + score, 30,20)
    ellipse(x,y,20,20)
    rectMode(CENTER)
    rect(mouseX,height-10,50,30)
    y+= s;
    
    if(y>height-10 && x>mouseX-20 && x<mouseX+20){
      y=-20
      s+=0.8
      score+= 2
      } else if(y>height){
        endScreen();
      }if(y==-20){
        pickRandom();
      }//end if statements
    }//end this.draw

  function pickRandom(){
    x= random(20,width-20)
  }//end pickRandom

  function reset(){
    score=0;
    s=2;
    y=-20;
  }//end reset
  
  function endScreen(){
    background(150)
    fill(60)
    text('---GAME OVER---', width / 4, height / 4)
    text("YOUR SCORE: " + score, width / 3, height / 3 )
    text('Press - to return to home screen \n Move the mouse across the screen to           continue or\n press 8 to reset and try again', width / 2, height / 2 );
  }//end endScreen
}//end ballGame

function squareGame(){
  var squares = [];
  var counter = 0;
  var squares_colored = 0;
  var finish = false;

  this.enter = function() {
    createCanvas(700, 700);
    background(266);
    textSize(25)
    stroke(0);
    fill('black')
    text("Click on the blue squares so that they become pink." ,10, 60)
    if(squares.length<25)
    for (var i = 0; i < 25; i++) {
      x = random(width);
      y = random(106,500);
      squares.push(new Square(x, y));
    }//end for loop
  }//end this.setup

  mousePressed = function(){
    if (finish) return;
    for (var i = 0; i < squares.length; i++) {
      squares[i].clicked();
    }//end for loop
  }//end mousePressed
  
  this.draw = function(){
    if (finish) return;
    if (counter == 0) {
      textSize(25)
      stroke(0);
      fill('black')
      text("Click on the blue squares so that they become pink." ,10, 60)
    }//end if statement
    counter += 1;
    for (var i = 0; i < squares.length; i++) {
      squares[i].display();
    }//end for loop
    if (!finish && squares_colored >= squares.length) {
      finish = true;
      completed();
    }//end if statement
  }//end this.draw

  class Square {
    constructor (x, y) {
      this.x = x;
      this.y = y;
      this.col = color("blue");
      this.active = true;
    }//end constructor

    display() {
      stroke(255);
      fill(this.col);
      rect(this.x, this.y, 30, 30);
    }//end display

    clicked() {
      var d = dist(mouseX, mouseY, this.x, this.y);   
      if (d < 22 && this.active) {
        this.col = color("pink");
        this.active = false;
        squares_colored += 1;
      }//end if statement
    }//end clicked
  }//end square class

  function completed(){
    textSize(35)
    stroke(0);
    fill('black')
    textAlign(CENTER);
    text("Good job! You made all of the squares pink!", 350,300);
    text('Press - to return to home screen \nPress 7 to reset and try again', width /       2,   height / 2 );
  } //end completed
}//end square game

function traceGame(){
  
  this.enter = function() {
  createCanvas(900, 900);
  background("white");
  textSize(100);
  stroke(0);
  fill("white");
  //textAlign(CENTER);
  text("This is a test",100,100);
  text("of your tracing", 100, 220);
  text("skills.",100,350);
  }//end this.enter

  this.draw = function() {
    stroke("purple");
    strokeWeight(8);
    if (mouseIsPressed === true) {
      line(mouseX, mouseY, pmouseX, pmouseY);
    }//end if statement
  }//end this.draw 
}//end traceGame

function levelGame(){

  var x = 300;
  var y = 300;
  var size = 60;
  var score = 0;

  this.setup = function(){
    createCanvas(600, 600);
    textAlign(CENTER);
    textSize(40);
  }//end this.setup

  this.draw = function(){
    background(220);
    levelOne()
  }//this.draw

  function levelOne(){
    text("Level 1", width/2, 40)
    text(("Score: " + score), width/2, height-20)
    var squareDistance = dist(x, y, mouseX, mouseY);
    if (squareDistance < size/2){
      x = random(width);
      y = random(height);
      score = score+5;
    }//end if statement
    rect(x, y, size, size)
    fill("blue");
    if (score > 25)
      levelTwo()
  }//end if statement

  function levelTwo(){
    background("black");
    fill("maroon");
    text("Level 2", width/2, 40)
    text(("Score: " + score), width/2, height-20)
    var distance = dist(x, y, mouseX, mouseY);
    if (distance < 20){
      x = random(width);
      y = random(height);
      score = score+5;
    }//end if statement
    ellipse(x, y, 25, 25)
    if (score > 50){
      levelThree();
    }//end if statement
  }//end levelTwo

  function levelThree(){
    background("white");
    fill("green");
    text("Level 3", width/2, 40)
    text(("Score: " + score), width/2, height-20)
    var distance = dist(x, y, mouseX, mouseY);
    if (distance < 0.5){
      x = random(width);
      y = random(height);
      score = score+5;
    }//end if statement
    rect(x, y, 15, 15)
    if (score > 75){
      levelFour();
    }//end if statement
  }//end levelThree

  function levelFour(){
    background("black");
    fill("magenta");
    text("Level 4", width/2, 40)
    text(("Score: " + score), width/2, height-20)
    var distance = dist(x, y, mouseX, mouseY);
    if (distance < 0.1){
      x = random(width);
      y = random(height);
      score = score+5;
    }//end if statement
    ellipse(x, y, 5, 5)
    if (score >= 100){
      end();
    }//end if statement
  }//end levelFour

  function end(){
    background(220);
    fill("black");
    textSize(20)
    text("Press = to play again, or - to return to the main menu", width/2, height/2);
    text("You reached 100 points. Congrats!", width/2, height/3);
  }//end end()
}//end levelGame