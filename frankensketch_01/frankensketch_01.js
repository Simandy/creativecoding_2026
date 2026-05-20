function setup() {
// Always create your canvas first!
  createCanvas(windowWidth, windowHeight);

  // Draw our background inside setup() so it only draws once.
  // Because it only draws once, our squares will leave a "trail" as we move the mouse!
  background(0, 0, 0); // rgb(0, 255, 0) makes a nice bright green

  // (Optional) Draw shapes from their center rather than their top-left corner.
  // This makes the square perfectly centered right under the tip of the mouse arrow.
  rectMode(CENTER);
  //setup_2()
}


function draw() {
  // 1. SET THE STYLING FIRST
  // The golden rule of p5.js: Always set your colors and line thickness *before* drawing the shape.
  stroke(255, 0, 0);   // Make the outline red (Red, Green, Blue)
  strokeWeight(10);    // Make the outline 10 pixels thick

  // 2. CHECK FOR INTERACTION AND SET THE FILL COLOR
  // We use an 'if/else' statement to check a logical condition
  if (mouseIsPressed) {
    // If the mouse button IS being held down right now...
    fill(255, 255, 0); // Fill the square with yellow
  } else {
    // If the mouse button is NOT being held down...
    fill(0, 0, 255);   // Fill the square with blue
  }

  // 3. DRAW THE SHAPE
  // Draw the square exactly at the mouse's current X and Y coordinates.
  // It will have a width and height of 60 pixels.
  square(mouseX, mouseY, 60);
  draw_2();
}

//function setup_2() {
//    //createCanvas(windowWidth, windowHeight);
//    //background(0,0,0);
//}

function draw_2() {
    // Add multiple particles per frame
    for (let i = 0; i < 5; i++) {
        let x = random(width); // Random x position across the canvas
        let y = random(height); // Random y position across the canvas
        let r = random(0.2, 6); // Random radius for the star, smaller values for more distant stars
        let hue = random(360); // Random hue for color variation (used for our HSB)
        
        fill(hue, 80, 90); // Set fill color with random hue and some saturation and brightness
        noStroke(); // No outline for the stars
        circle(x, y, r); // Draw the star as a circle at the random position with the random radius
    }
    
    // Fade background faster for trails
    background(0, 0, 0, 9.5); // Black background with low opacity to create a fading effect
}
