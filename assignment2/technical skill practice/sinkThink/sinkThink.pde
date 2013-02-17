import spacebrew.*;

String server="localhost";
String name="sinkThink";
String description ="sink think sketch made by Jess";

Spacebrew spacebrewConnection;

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
  
  spacebrewConnection = new Spacebrew( this );
  
  // add each thing you publish to
  // spacebrewConnection.addPublish( "buttonPress", buttonSend ); 

  // add each thing you subscribe to
  spacebrewConnection.addSubscribe( "text", "string" );
  
  // connect!
  spacebrewConnection.connect("ws://"+server+":9000", name, description );

  
}


void draw() {

  background(255);
  //createWord(typing);
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


void onRangeMessage( String name, int value ){
  println("got int message "+name +" : "+ value);
  //  // check name by using equals
  //  if (name.equals("color") == true) {
  //      currentColor = value;
  //  }
}

void onBooleanMessage( String name, boolean value ){
  println("got bool message "+name +" : "+ value);  
}

void onStringMessage( String name, String value ){
  //println("got string message "+name +" : "+ value); 
  typing = value;
  println(typing);
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


