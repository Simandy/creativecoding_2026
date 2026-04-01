/**
 * Creative Coding 2026 - Week 5: Image Collage and Arrays
 * Sketch: image_collage_arrays.js mostly based 
 * on an example in "Generative Design" by Benedikt Groß, 
 * Hartmust Bohnacker, Julia Laub, and Claudius Lazzeroni.
 * 
 * Instructions:
 * 1. Place images in the 'data' folder.
 * 2. Update the preload() counts to match your number of images.
 */

let layer1Images = [];
let layer2Images = [];
let layer3Images = [];

let layer1Items = [];
let layer2Items = [];
let layer3Items = [];

function preload() {
  // Replace '2' with the actual number of images you have for each laye
  // For example, if you have 2 images for each: layer1_0.png, layer1_1.png.
  for (let i = 0; i < 2; i++) {
    layer1Images.push(loadImage('data/layer1_' + i + '.png'));
    layer2Images.push(loadImage('data/layer2_' + i + '.png'));
    layer3Images.push(loadImage('data/layer3_' + i + '.png'));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  noLoop(); // Stay static unless we click

  // Signature: generateCollageItems(imgArray, count, centerX, centerY, rangeX, rangeY, minScale, maxScale, minRotation, maxRotation)
  layer1Items = generateCollageItems(layer1Images, 1, width / 2, height / 2, width / 3, height / 4, 0.5, 1.5, 0, PI);
  layer2Items = generateCollageItems(layer2Images, 1, width / 2, height / 2, width / 2, height / 3, 0.2, 1.0, -HALF_PI, HALF_PI);
  layer3Items = generateCollageItems(layer3Images, 1, width / 2, height / 2, width / 2, height, 0.4, 0.8, PI, HALF_PI);
}

function draw() {
  background(255);

  // Draw the layers in order
  drawCollageItems(layer1Items);
  drawCollageItems(layer2Items);
  drawCollageItems(layer3Items);
}

// --- HELPER FUNCTIONS ---

/**
 * Creates random CollageItem objects and stores them in an array.
 */
function generateCollageItems(imgArray, count, centerX, centerY, rangeX, rangeY, minScale, maxScale, minRotation, maxRotation) {
  let items = [];

  // Guard: if images skipped, show a warning and return empty
  if (imgArray.length === 0) {
    console.warn("No images loaded for this layer!");
    return items;
  }

  for (let i = 0; i < count; i++) {
    let img = random(imgArray);
    let item = new CollageItem(img);

    // Randomize its properties
    item.x = centerX + random(-rangeX / 2, rangeX / 2);
    item.y = centerY + random(-rangeY / 2, rangeY / 2);
    item.rotation = random(minRotation, maxRotation);
    item.scaling = random(minScale, maxScale);

    items.push(item);
  }
  return items;
}

/**
 * Loops through the items array and draws each one at its specific transformation.
 */
function drawCollageItems(items) {
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    push();
    translate(item.x, item.y);
    rotate(item.rotation);
    scale(item.scaling);
    image(item.image, 0, 0);
    pop();
  }
}

/**
 * Data object to store individual image properties.
 */
function CollageItem(image) {
  this.image = image;
  this.x = 0;
  this.y = 0;
  this.rotation = 0;
  this.scaling = 1;
}

/**
 * Click to regenerate the collage.
 */
function mousePressed() {
  setup();
  redraw();
}

/**
 * Adjust the canvas if the browser window changes size.
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
  redraw();
}

/**
 * Listen for key presses. 
 * 's' or 'S' will save a JPG of the current canvas.
 */
function keyPressed() {
  if (key == 's' || key == 'S') {
    // Generate a unique filename using the current date/time
    let fileName = 'collage_' + year() + month() + day() + "_" + hour() + minute() + second();
    saveCanvas(fileName, 'jpg');
  }
}
