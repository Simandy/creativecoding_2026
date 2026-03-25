/**
 * Creative Coding 2026 - Week 4: Advanced Typography
 * Original Concept by Andy Simionato & KarenAnn Donnachie
 * 
 * This sketch demonstrates how to layout multiple "blocks" or columns 
 * of text over a background image, using liquid layout principles.
 */

let bgImage;      // Note: we avoid calling this 'texture' so we don't mix it up with p5 functions
let bodyFont;     // Global variable to store our custom typeface
let contentA = "Static, static, static! Be static! Be static! Movement is static! Move- ment is static! Movement is static because it is the only immutable thing—the only certainty, the only unchangeable. The only certainty is that movement, change and metamorphosis exist. That is why move- ment is static. So-called immobile objects exist only in movement. Immobile, certain and permanent things, ideas, works and beliefs change, transform and disintegrate . Immobile objects are snapshots of a movement whose existence we refuse to accept, because we our- selves are only an instant in the great movement. Movement is the only static, final, permanent and certain thing. … Immutability does not exist. All is movement.";
let contentB = "The move from print to digital text precisely models this change. We could, had we been working in a metamorphic display mode rather than a fixed one, have flown into many more radical examples of dynamic text than could be dealt with here. But we have seen enough, perhaps, to suggest that we are not simply voyaging on strange new seas of thought but plowing the old Homeric ones as well and trying to make sense of both as one whole and comprehensible textual world. We cannot exist, after all, only by breathing out abstraction, alphabets which do not think; nor only by breathing in animation, alphabets which do; but only by respiration, the life-giving oscillation of the two. That oscillation is what’s next for text.";

let bodySize;
let isDesktop = true;

function preload() {
  // Make sure these files exist in your sketch's 'data' folder!
  // or change the file names in these next 2 lines to reflect your files...
  bgImage = loadImage("data/texture.jpg");
  bodyFont = loadFont("data/texgyrepagella-regular.otf");
}

function setup() {
  // Create a canvas that fills the full browser window
  createCanvas(windowWidth, windowHeight);

  // Initialize font and size (we calculate size based on width)
  bodySize = int(width / 70);
  textSize(bodySize);
  textFont(bodyFont);

  // Simple check for screen proportions
  if (width < height) {
    isDesktop = false;
  }
}

function draw() {
  // Display background image. 
  // We use the 4th argument 'COVER' to ensure it always fills the frame.
  image(bgImage, 0, 0, width, height, 0, 0, bgImage.width, bgImage.height, COVER);

  // Set the visual style for our text
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);

  // COLUMN LAYOUT: text(string, x, y, maxWidth, maxHeight)
  // We use percentages (0.1 for 10%) so it stays in place on all screens.

  // Column 1 (Left Side)
  text(contentA, width * 0.1, height * 0.1, width * 0.35, height * 0.8);

  // Column 2 (Right Side)
  text(contentB, width * 0.55, height * 0.1, width * 0.35, height * 0.8);

  // small UI element (dot) in the bottom right, 
  // this could become a "next" button?
  fill(0);
  circle(width * 0.9, height * 0.9, 50);
}

// Adjust the canvas and typography if the browser window changes size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Recalculate the liquid typography
  bodySize = int(width / 70);
  textSize(bodySize);
}
