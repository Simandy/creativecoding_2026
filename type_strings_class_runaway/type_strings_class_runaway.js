/**
 * Creative Coding 2026 - Week 4: Advanced Typography
 * Original Concept by Andy Simionato & KarenAnn Donnachie
 * 
 * This sketch introduces Object-Oriented Programming (OOP) by 
 * turning every word of a text into an independent object
 * that can move and display itself. It adds an extra
 * behavior to the words: they run away from the mouse!
 * 
 * try changing the values in the move() method to see 
 * how it affects the behavior or add even more behaviours 
 * to the words!
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
  let words = para[0].split(' ');

  // For every word in the list, 
  // we create a new object to be used by our 'Manifesto'  class
  for (let i = 0; i < words.length; i++) {
    let x = random(width);
    let y = random(height);

    // Create the object and add it to our 'allWords' array
    let newWord = new Manifesto(words[i], x, y);
    allWords.push(newWord);
  }
}

function draw() {
  // Clear the frame every time so movement looks clean
  background(0);

  // Go through every word object in the list and tell it to move and draw
  for (let i = 0; i < allWords.length; i++) {
    allWords[i].move();
    allWords[i].display();
  }
}

/**
 * The 'Manifesto' Class
 * Think of this as a blueprint for a word that can move and show itself.
 */
class Manifesto {
  // The constructor runs once when we say 'new Manifesto(...)'
  constructor(wordText, x, y) {
    this.text = wordText;
    this.x = x;
    this.y = y;
  }

  // A 'method' to change the word's position (movement behavior)
  move() {
    // 1. Calculate the distance between the mouse and this specific word
    let d = dist(mouseX, mouseY, this.x, this.y);

    // 2. If the mouse is closer than 100 pixels...
    if (d < 100) {
      // 3. Move AWAY from the mouse!
      if (mouseX < this.x) { this.x += 5; } // if mouse is left, move right
      if (mouseX > this.x) { this.x -= 5; } // if mouse is right, move left
      if (mouseY < this.y) { this.y += 5; } // if mouse is above, move down
      if (mouseY > this.y) { this.y -= 5; } // if mouse is below, move up
    } else {
      // 4. Otherwise, just do the standard wiggle
      this.x += random(-1, 1);
      this.y += random(-1, 1);
    }
  }

  // A 'method' to draw the word on the screen
  display() {
    text(this.text, this.x, this.y);
  }
}

// The following is not part of the class, it simply adjusts the canvas 
// if the browser window changes size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
