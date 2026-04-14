/**
 * Creative Coding 2026 - Week 6: Randomness and Noise
 * made with the help of Karen ann Donnachie
 * 
 * This sketch demonstrates a simple random star field, 
 * where circles of varying sizes and colors are drawn at random positions 
 * on the canvas. The background is faded slightly in each frame 
 * to create a sense of motion and depth, as if the stars are twinkling 
 * or moving through space.
 * 
 * You can experiment with different parameters, 
 * such as the range of randomness, stroke weight, 
 * and background fade to create different visual effects.
 * How would you make specific constellations or patterns of stars?
 * How about adding a shooting star effect?
 * How would you add interactivity, like making the stars respond 
 * to mouse movement or clicks?
 */

function setup() {
    createCanvas(windowWidth, windowHeight);
    background("black");
}

function draw() {
    // Add multiple particles per frame
    for (let i = 0; i < 5; i++) {
        let x = random(width); // Random x position across the canvas
        let y = random(height); // Random y position across the canvas
        let r = random(0.2, 6); // Random radius for the star, smaller values for more distant stars
        let hue = random(360); // Random hue for color variation
        
        fill(hue, 80, 90); // Set fill color with random hue and some saturation and brightness
        noStroke(); // No outline for the stars
        circle(x, y, r); // Draw the star as a circle at the random position with the random radius
    }
    
    // Fade background faster for trails
    background(0, 0, 0, 0.5); // Black background with low opacity to create a fading effect
}
