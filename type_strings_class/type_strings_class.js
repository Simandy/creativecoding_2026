/**
 * Creative Coding 2026 - Week 4: Advanced Typography
 * Original Concept by Andy Simionato & KarenAnn Donnachie
 * 
 * This sketch introduces Object-Oriented Programming (OOP) by 
 * turning every word of a text into an independent object
 * that can move and display itself.
 */

let allWords = []; // This array will store all our word objects
let para;          // We'll store the loaded text file here

function preload() {
  // loadStrings() reads the text file into an array of lines.
  // Make sure 'data/mcluhan.txt' exists in your data folder!
  para = loadStrings("data/mcluhan.txt");
}

function setup() {
  // Create a canvas that fills the whole browser window
  createCanvas(windowWidth, windowHeight);

  // Set initial styles
  background(0); // black background
  fill(255);     // white text
  textSize(24);
  //textFont("Impact"); // Bolt font for a strong visual statement
  textAlign(CENTER, CENTER);

  // We take the first line of the text [0] and split it into individual words
  //remember javascript counts from 0, not from 1
  let words = para[0].split(' '); //if were a comma ',' separated file, you could use that instead

  // For every word in the list, 
  // we create a new object to be used by our 'Manifesto'  class
  for (let i = 0; i < words.length; i++) {
    let x = random(width);
    let y = random(height);

    // Create the object and add it to our 'allWords' array
    let newWord = new Manifesto(words[i], x, y); //run all the rules from Manifesto to newWord
    allWords.push(newWord); //now store newWord in our array called allWords 
    // (which now behaves like Manifesto)
  }
}

function draw() {
  // Clear the frame every time so movement looks clean
  background(0);

  // Go through every word object in the list and tell it to move and draw
  for (let i = 0; i < allWords.length; i++) {
    //allWords[i].grow();
    allWords[i].move();
    allWords[i].display();
  }
}

/**
 * The 'Manifesto' Class
 * Think of this as a blueprint for a word that can move and show itself.
 * Experiment by changing/adding the 'methods' e.g. change size randomly!
 */
class Manifesto {
  // The constructor runs once when we say 'new Manifesto(...)'
  constructor(wordText, x, y) {
    this.text = wordText;
    this.x = x;
    this.y = y;
    //this.bigness = 24; //adding a new attribute for the textSize method
  }

  // A 'method' to change the word's position slightly (i.e. the wiggle!)
  move() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  //// A 'method' to change the word's size slightly (i.e. the bigness!)
  //grow() {
  //  this.bigness += random(-1, 1);
  //}
  
  // A 'method' to draw the word on the screen
  display() {
    //textSize(this.bigness); //set the text size now
    text(this.text, this.x, this.y);
  }
}

// The following is not part of the class, it simply adjusts the canvas 
// if the browser window changes size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
