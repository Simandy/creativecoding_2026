/**
 * Creative Coding 2026 — Sound intro
 *
 * Introducing sound as a way to transform a sketch!
 *
 * Remember that you MUST include the p5.sound.min.js library to get this to work 
 * (see the index.html tab above to see what I mean)
 * If you are reproducing this sketch (or a version) just add the sound library
 * under Sketch > Import library > p5.sound ...and Processing will do the rest!
 *
 * This sketch was brought to you by Karen ann Donnachie & Andy Simionato
 * Try noodling with the variables, or wire it up to follow different movements
 * or interactions...
 */
 
 
let osc; //oscillator variable
    let playing = false;

    function setup() {
      // Create a canvas to fill the window
      createCanvas(windowWidth, windowHeight);

      // Initialize an oscillator
      osc = new p5.Oscillator('sine'); // can be 'sine', 'triangle', 'sawtooth', 'square'

      // We won't start it immediately because browsers require user interaction
      // before audio playback is allowed.
    }

    function draw() {
      background(30);

      // If playing, adjust sound based on mouse position
      if (playing) {
        // Map mouse X to frequency (pitch)
        // Range from 100Hz to 1000Hz is a good audible range
        let freq = map(mouseX, 0, width, 100, 1000);
        osc.freq(freq);

        // Map mouse Y to amplitude (volume)
        // Y goes from 0 at top to height at bottom
        // We'll map top (0) to max volume (1.0) and bottom (height) to min volume (0.0)
        let amp = map(mouseY, 0, height, 1.0, 0.0);
        osc.amp(amp, 0.1); // 0.1 is the smoothing time to avoid clicks

        // Visualize the sound
        // Draw a circle that changes size based on amplitude and color based on frequency
        let r = map(freq, 100, 1000, 0, 255);
        let b = map(freq, 100, 1000, 255, 0);
        fill(r, 100, b);
        noStroke();

        let size = map(amp, 0, 1, 10, min(width, height) / 2);
        ellipse(mouseX, mouseY, size, size); //(try changing this to a different shape!)
      } else {
        // Draw prompt if not playing
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(16);
        text("Click and drag to make sound", width / 2, height / 2); //stick some instructions in there
      }

      // Display current values if playing
      if (playing) {
        fill(255);
        textAlign(LEFT, TOP);
        textSize(14);
        text(`Freq: ${Math.round(osc.getFreq())} Hz\nAmp: ${osc.getAmp().toFixed(2)}`, 20, 20);
      }
    }

    // Start playing sound when mouse is pressed
    function mousePressed() {
      // Start the audio context if it isn't running yet
      userStartAudio();

      if (!playing) {
        osc.start();
        playing = true;
      }
    }

    // Stop playing sound when mouse is released
    function mouseReleased() {
      if (playing) {
        // Ramp amplitude to 0 over 0.5 seconds to avoid a click
        osc.amp(0, 0.5);
        // Stop oscillator after the ramp
        setTimeout(() => {
          osc.stop();
          playing = false;
        }, 500);
      }
    }

    // Standard code to handle window resizing
    function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
    }
