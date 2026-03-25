/**
 * Creative Coding 2026 - Week 4: Advanced Typography
 * 
 * Based on Steering Behavior examples by Daniel Shiffman (http://codingtra.in)
 * Application to text-to-points by Karen Ann Donnachie (https://github.com/karenanndonnachie/)
 * 
 * This sketch turns words into a swarm of "Vehicles" that steer 
 * toward their target position but flee from the mouse cursor.
 */

let bodyFont;
let vehicles = [];
let isSplashScreen = true;

// Text-to-points settings: controls the resolution of letters
const textOptions = {
  sampleFactor: 0.2, // Higher number = more dots, but slower performance
  simplifyThreshold: 0
};

function preload() {
  // Make sure this file exists in your data folder!
  bodyFont = loadFont('data/SourceSansPro-Semibold.otf');
}

function setup() {
  // Create a canvas that fills the full browser window
  createCanvas(windowWidth, windowHeight);
  
  // Start with a function to spawn the particles
  generateParticles('run your mouse over the words', width * 0.05, height / 3);
}

function draw() {
  background(51); // Dark grey background

  // Update and show every vehicle in the swarm
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i]; //saves you re-typing vehicles[i] each line
    v.behaviors(); // Calculate steer forces (Arrive + Flee)
    v.update();    // Calculate new velocity and position
    v.show();      // Draw the point
  }
}

/**
 * Helper function to turn a string of text into a list of steerable objects
 */
function generateParticles(message, x, y) { //message and position
  vehicles = []; // Clear the current list
  
  let fontSize = width / 15;
  
  // textToPoints turns letters into a list of (x, y) coordinates
  let points = bodyFont.textToPoints(message, x, y, fontSize, textOptions);
  
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    // Each point becomes a new Vehicle with its own life and logic
    let v = new Vehicle(p.x, p.y);
    vehicles.push(v); //vehicles is an array
  }
}

/**
 * Interaction: Press any key to reveal the hidden word
 */
function keyPressed() {
  if (isSplashScreen) {
    isSplashScreen = false;
    generateParticles('hidden message', width * 0.2, height * 0.6);
  }
}

/**
 * The Vehicle Class
 * Each dot is a "smart" agent that knows its target and its speed.
 */
class Vehicle {
  constructor(targetX, targetY) {
    // Start at a random position on the screen
    this.pos = createVector(random(width), random(height));
    this.target = createVector(targetX, targetY);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    
    // Physical limits of the vehicle
    this.maxSpeed = 5;      // How fast can it move?
    this.maxForce = 0.3;    // How hard can it turn?
    this.dotSize = 4;
  }

  // behaviors() calculates how the vehicle should move at this moment
  behaviors() {
    // 1. ARRIVE: steer towards the target position
    let arriveForce = this.calculateArrive(this.target);
    
    // 2. FLEE: steer away from the mouse cursor
    let mousePos = createVector(mouseX, mouseY);
    let fleeForce = this.calculateFlee(mousePos);

    // We can "weight" the forces (how strong should each be?)
    arriveForce.mult(1);  // Standard pull towards the word
    fleeForce.mult(5);    // Stronger push away from the mouse

    this.applyForce(arriveForce);
    this.applyForce(fleeForce);
  }

  // Standard method to accumulate forces
  applyForce(f) {
    this.acc.add(f);
  }

  // Update position and reset acceleration
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0); // Reset for the next frame
  }

  show() {
    stroke(255); // White dots
    strokeWeight(this.dotSize);
    point(this.pos.x, this.pos.y);
  }

  // --- STEERING AI LOGIC ---

  // calculateArrive ensures the dot slows down as it approaches the target
  calculateArrive(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    let speed = this.maxSpeed;
    
    // If the dot is within 100px of home, slow down proportionally
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  // calculateFlee calculates the force needed to move in the opposite direction
  calculateFlee(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    
    // Only flee if the mouse is within 50px of the dot
    if (d < 50) {
      desired.setMag(this.maxSpeed);
      desired.mult(-1); // Reverse direction to run away!
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      return steer;
    } else {
      // If the mouse is far away, the flee force is zero
      return createVector(0, 0);
    }
  }
}

// Adjust the canvas if the browser window changes size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
