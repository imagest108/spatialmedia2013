PFont font;

ArrayList wordsArray;

String typing = "";
boolean entered = false;
boolean keyWasReleased = true;

Bubbles[] bubbles = new Bubbles[20];

void setup() {

  size(300, 600, P3D);

  wordsArray = new ArrayList();
  font = loadFont("LucidaBright-Italic-48.vlw");
  
  textFont(font);

  smooth();
}


void draw() {

  background(255);
  
  userInput();  
  displayWord();

}

void createWord(String input) {
  wordsArray.add(new Word(input));

}

void displayWord() {
  for (int i=0; i<wordsArray.size(); i++) {
    Word myWords = (Word) wordsArray.get(i);

    pushMatrix();
    float a = random(0, 0.2);
    translate( myWords.updatePositionX(), myWords.updatePositionY());
    rotate(a);
    for (int j=0; j<20; j++) {
      bubbles[j] = new Bubbles(0,0);
      bubbles[j].display();
      bubbles[j].goingUp();
    }
    text(myWords.content, 0, 0);
    popMatrix();
  }
}

void userInput() {

  fill(0);
  text(typing, width/2-50, 50);

  if (keyPressed) {

    if (key == '\n' || key == ' ') {
      entered = true;
      createWord(typing);
      typing="";
    }

    else if (key == '\b' && typing.length() > 0) {
      typing = typing.substring(0, typing.length()-1);
      delay(20);
    }

    else {
      typing = typing + key;
      delay(200);
    }
  }
}

class Bubbles {
  
  float x;
  float y;
  float d;
  float speed;
  
  Bubbles(float bx, float by){
    x = bx;
    y = by;
    d = random(1,12);
    speed =3;
  }
  
  void display(){
    stroke(0,80);
    strokeWeight(2);
    noFill();
    ellipse(x+random(0,100),y-random(0,50),d,d);
    
  }
  
  
  void goingUp(){
    y = y-speed;
       
  }
}
  
  class Word {

  float positionX, positionY = 0; 
  String content = "";
  int speedY = 2;
  int y= 50;
  float x= 0;
  float gravity = 0.0;
  float inc = 0.01;

  float d;
  float s = random(2,7);

  Word(String input) {
    content = input;
    positionX = updatePositionX();
    positionY = updatePositionY();
  }

 

   int updatePositionY() {
    y= y+speedY;
    positionX= y;
    y+=sin(radians(d))*s;
    
    return y;
  }

  float updatePositionX() {
    for (float i=0; i<width ; i++) {
      frameRate(4);
      gravity= gravity+inc;
      
      float n=noise(gravity)*20.0;
      x= n+100;


      x+=cos(radians(d))*s;
      
    }
    return x;
  }
  
}


