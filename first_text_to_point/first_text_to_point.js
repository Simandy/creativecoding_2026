/**
 * Creative Coding 2026 - Week 3: Intro to Typography
 * Sketch: first_text_to_point
 * 
 * This sketch introduces p5.Font's textToPoints() function, which converts 
 * a string of text into an array of coordinate points tracing the letters' outlines.
 */

// We use 'let' instead of 'var' to declare our variables.
let myFont;
let points;
let sampleF;

// preload() runs before setup() to ensure our font is downloaded/loaded first.
function preload() {
  myFont = loadFont("data/AdobeClean-It.otf");
}

// setup() runs exactly once when the program starts
function setup() {
  createCanvas(windowWidth, windowHeight);

  // This value controls how many points are generated on the text outline.
  // 💡 TRY THIS: Change sampleF to 0.1 (more points) or 0.01 (fewer points)
  sampleF = 0.05;

  // Extract our array of outline points!
  // textToPoints(string, x, y, fontSize, options)
  points = myFont.textToPoints('diamonds', (width / 4) - 200, height / 2, 300, {
    sampleFactor: sampleF,
    simplifyThreshold: 0
  });

  // Since our points are totally static and don't move around, we don't 
  // need draw() to constantly run 60 times a second and drain the computer's battery!
  // noLoop() tells p5.js to only run the draw() function exactly one time.
  noLoop();
}

// draw() normally runs continuously, but we stopped it using noLoop() in setup()
function draw() {
  background(240); // Light gray background

  // --- DRAWING GUIDE LINES ---
  stroke(200, 0, 0);       // Red lines
  strokeWeight(2);         // 2 pixels thick
  line(width / 2, 0, width / 2, height);  // Vertical center line
  line(0, height / 2, width, height / 2); // Horizontal center line
  // ---------------------------


  // --- DRAWING THE TEXT POINTS ---
  fill(255);       // White fill for our circles
  stroke(0);       // Black outline
  strokeWeight(1); // Thin outline

  // A 'for' loop lets us iterate over every single point inside our 'points' array
  for (let i = 0; i < points.length; i++) {
    // Extract the exact X and Y coordinates for the current point
    let p = points[i];

    // Draw a small circle exactly at those specific mathematical coordinates
    ellipse(p.x, p.y, 10, 10);
  }
}

// Ensure the canvas fully resizes if the browser window changes size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // When the window resizes, we should recalculate the text points 
  // so they are positioned correctly based on the new width and height!
  points = myFont.textToPoints('diamonds', (width / 4) - 200, height / 2, 300, {
    sampleFactor: sampleF,
    simplifyThreshold: 0
  });

  // Since we called noLoop() earlier, draw() isn't running automatically. 
  // We must manually trigger a redraw using this command!
  redraw();
}
