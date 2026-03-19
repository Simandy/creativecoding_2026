/**
 * Creative Coding 2026 - Week 3: Intro to Typography
 * Sketch: first_text_to_point_lines
 * 
 * This sketch builds on textToPoints by running the draw() loop continuously!
 * It draws interactive lines connecting the static text points to your mouse, 
 * and randomly colors the dots every frame to give a popping, twinkling effect.
 */

let myFont;
let points;
let sampleF;

// preload() runs before setup() to ensure our font is downloaded/loaded first.
function preload() {
  myFont = loadFont("data/AdobeClean-It.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // This value controls how many points are generated on the text outline.
  sampleF = 0.05;

  // Extract our array of outline points!
  points = myFont.textToPoints('diamonds', (width / 4) - 200, height / 2, 300, {
    sampleFactor: sampleF,
    simplifyThreshold: 0
  });

  // Notice we are NOT calling noLoop() here like the last sketch!
  // We want setup() to finish so draw() can run 60 times a second and animate our sketch.
}

function draw() {
  // Clear the background every frame so our moving lines don't smear
  // "blue" works as a built-in web color, or you can use RGB values!
  background("blue");

  // A 'for' loop lets us iterate over every single point inside our 'points' array
  for (let i = 0; i < points.length; i++) {
    // Extract the exact X and Y coordinates for the current point
    let p = points[i];

    // --- 1. DRAW THE CONNECTING LINE ---
    // The line connects the point's coordinates to our current mouse position.
    // We set the stroke (line color) to white, but add a 4th argument (100) for transparency!
    // This looks much cleaner when hundreds of lines overlap.
    stroke(255, 255, 255, 100);
    strokeWeight(1);
    line(p.x, p.y, mouseX, mouseY);

    // --- 2. DRAW THE TWINKLING DOT ---
    // Generate a completely random RGB color every single frame for this specific dot
    let randomDotColor = color(random(255), random(255), random(255));

    // Set the fill to our random color, and give it a solid solid white outline
    fill(randomDotColor);
    stroke("white");
    strokeWeight(1);

    // Draw the dot exactly at the mathematical coordinate
    ellipse(p.x, p.y, 10, 10);
  }
}

// Ensure the canvas fully resizes if the browser window changes size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Recalculate the text points so they are positioned correctly based on the new dimensions
  points = myFont.textToPoints('diamonds', (width / 4) - 200, height / 2, 300, {
    sampleFactor: sampleF,
    simplifyThreshold: 0
  });
}
