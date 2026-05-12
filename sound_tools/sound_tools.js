let fft;
let osc;
let analysisMode = 'amplitude';
let soundLoaded = false;
let oscStarted = false;
let userSound = null;
let userSoundLoaded = false;
let resizeTimer = null;
let currentVolume = 0.5;
let currentPan = 0;
let activeSource = 'idle';

function isBoringMode() {
    return document.body.classList.contains('boring-mode');
}

function getSoundPalette() {
    if (isBoringMode()) {
        return {
            bg: [245, 245, 245],
            statusOn: [76, 175, 80],
            statusOff: [160, 160, 160],
            text: [40, 40, 40],
            bass: [74, 144, 226],
            mid: [80, 200, 120],
            high: [240, 160, 80],
            track: [230, 230, 230],
            label: [90, 90, 90],
            wave: [60, 120, 220],
            hueStart: 190,
            hueEnd: 260
        };
    }

    return {
        bg: [18, 12, 44],
        statusOn: [0, 255, 220],
        statusOff: [143, 126, 186],
        text: [249, 236, 255],
        bass: [255, 76, 201],
        mid: [0, 255, 220],
        high: [143, 126, 255],
        track: [36, 26, 73],
        label: [214, 203, 255],
        wave: [255, 76, 201],
        hueStart: 180,
        hueEnd: 340
    };
}

function setup() {
    const container = document.getElementById('canvas-container');
    const canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('canvas-container');
    
    // Initialise audio objects safely
    if (typeof p5.FFT !== 'undefined') {
        initAudio();
    } else {
        setTimeout(() => {
            if (typeof p5.FFT !== 'undefined') initAudio();
        }, 500);
    }
}

function initAudio() {
    fft = new p5.FFT();
    osc = new p5.Oscillator('sine');
    osc.freq(440);
    osc.amp(0);
    osc.pan(currentPan);
    fft.setInput(osc);
    soundLoaded = true;
}

function draw() {
    const palette = getSoundPalette();
    background(palette.bg[0], palette.bg[1], palette.bg[2]);
    
    // Header Status Bar
    noStroke();
    const statusColor = (oscStarted || isUploadedPlaying()) ? palette.statusOn : palette.statusOff;
    fill(statusColor[0], statusColor[1], statusColor[2]);
    ellipse(25, 25, 12, 12);
    
    fill(palette.text[0], palette.text[1], palette.text[2]);
    textSize(11);
    textStyle(BOLD);
    textAlign(LEFT);
    text((oscStarted || isUploadedPlaying()) ? 'LIVE AUDIO ACTIVE' : 'AUDIO IDLE', 45, 29);

    if (soundLoaded && fft) {
        push();
        translate(0, 20); 
        switch(analysisMode) {
            case 'amplitude': drawAmplitudeAnalysis(); break;
            case 'frequency': drawFrequencyAnalysis(); break;
            case 'waveform': drawWaveformAnalysis(); break;
        }
        pop();
    }
}

// --- ANALYSIS VISUALIZERS ---

function drawAmplitudeAnalysis() {
    const palette = getSoundPalette();
    fft.analyze();
    let bass = fft.getEnergy("bass") / 255;
    let mid = fft.getEnergy("mid") / 255;
    let high = fft.getEnergy("treble") / 255;
    
    let space = width / 4;
    drawVisualBar(space * 1, height/2, bass, 'BASS', color(palette.bass[0], palette.bass[1], palette.bass[2]));
    drawVisualBar(space * 2, height/2, mid, 'MID', color(palette.mid[0], palette.mid[1], palette.mid[2]));
    drawVisualBar(space * 3, height/2, high, 'HIGH', color(palette.high[0], palette.high[1], palette.high[2]));
}

function drawVisualBar(x, y, val, label, col) {
    const palette = getSoundPalette();
    rectMode(CENTER);
    fill(palette.track[0], palette.track[1], palette.track[2]);
    noStroke();
    rect(x, y, 60, 180, 8); // Track background
    
    fill(col);
    let h = val * 180;
    rect(x, y + (90 - h/2), 60, h, 8); // Value bar
    
    fill(palette.label[0], palette.label[1], palette.label[2]);
    textAlign(CENTER);
    textStyle(NORMAL);
    textSize(10);
    text(label, x, y + 115);
}

function drawFrequencyAnalysis() {
    const palette = getSoundPalette();
    let spectrum = fft.analyze();
    noStroke();
    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let h = -height + map(spectrum[i], 0, 255, height, 120);
        colorMode(HSB);
        fill(map(i, 0, spectrum.length, palette.hueStart, palette.hueEnd), 220, 255);
        rect(x, height - 40, width / spectrum.length, h);
    }
    colorMode(RGB);
}

function drawWaveformAnalysis() {
    const palette = getSoundPalette();
    let waveform = fft.waveform();
    noFill();
    stroke(palette.wave[0], palette.wave[1], palette.wave[2]);
    strokeWeight(3);
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, 60, height - 60);
        vertex(x, y);
    }
    endShape();
}

// --- CONTROLS & EVENT HANDLERS ---

function playOscillator(type, evt) {
    let btn = evt && evt.target ? evt.target : null;

    // Toggle: if the same button is clicked twice, stop the audio
    if (oscStarted && btn && btn.classList.contains('playing')) {
        stopSound();
        return;
    }

    userStartAudio().then(() => {
        stopUploadedSound();
        if (oscStarted) osc.stop();
        osc.setType(type);
        fft.setInput(osc);
        osc.start();
        osc.amp(currentVolume, 0.1);
        osc.pan(currentPan, 0.05);
        oscStarted = true;
        setActiveSource('oscillator');
        
        // UI highlighting
        document.querySelectorAll('.wave-buttons .tool-button').forEach(b => b.classList.remove('playing'));
        if (btn) btn.classList.add('playing');
    });
}

function stopSound() {
    if (osc) {
        osc.amp(0, 0.1);
        setTimeout(() => osc.stop(), 150);
    }
    oscStarted = false;
    if (!isUploadedPlaying()) {
        setActiveSource('idle');
    }
    document.querySelectorAll('.wave-buttons .tool-button').forEach(btn => btn.classList.remove('playing'));
}

function stopOscillator() {
    stopSound();
}

function updateVolume(val) {
    currentVolume = parseFloat(val);
    if (osc) osc.amp(currentVolume, 0.05);
    if (userSound && userSound.isLoaded()) userSound.setVolume(currentVolume, 0.05);
    document.getElementById('volumeValue').textContent = val;
}

function updatePan(val) {
    currentPan = parseFloat(val);
    if (osc) osc.pan(currentPan, 0.05);
    if (userSound && userSound.isLoaded()) userSound.pan(currentPan, 0.05);
    document.getElementById('panValue').textContent = val;
}

function setAnalysisMode(mode, evt) {
    analysisMode = mode;
    // UI selection style
    document.querySelectorAll('.analysis-controls .tool-button').forEach(btn => btn.classList.remove('active'));
    if (evt && evt.target) evt.target.classList.add('active');
}

function handleSoundUpload(evt) {
    const file = evt && evt.target && evt.target.files ? evt.target.files[0] : null;
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    loadSound(
        objectUrl,
        (loaded) => {
            if (userSound && userSound.isLoaded()) {
                userSound.stop();
            }
            userSound = loaded;
            userSound.setVolume(currentVolume);
            userSound.pan(currentPan);
            userSoundLoaded = true;
            setActiveSource('uploaded-ready');
            document.getElementById('uploadStatus').textContent = file.name;
        },
        () => {
            userSoundLoaded = false;
            document.getElementById('uploadStatus').textContent = 'Load failed';
        }
    );
}

function playUploadedSound() {
    if (!userSoundLoaded || !userSound) return;

    userStartAudio().then(() => {
        stopSound();
        fft.setInput(userSound);
        if (!userSound.isPlaying()) {
            userSound.play();
        }
        userSound.setVolume(currentVolume, 0.05);
        userSound.pan(currentPan, 0.05);
        setActiveSource('uploaded');
    });
}

function pauseUploadedSound() {
    if (userSound && userSound.isPlaying()) {
        userSound.pause();
        setActiveSource('uploaded-paused');
    }
}

function stopUploadedSound() {
    if (userSound && userSound.isLoaded()) {
        userSound.stop();
        if (!oscStarted) {
            setActiveSource('uploaded-ready');
        }
    }
}

function isUploadedPlaying() {
    return !!(userSound && userSound.isLoaded() && userSound.isPlaying());
}

function setActiveSource(source) {
    activeSource = source;
    const sourceStatus = document.getElementById('sourceStatus');
    if (!sourceStatus) return;

    const map = {
        idle: 'Active Source: Idle',
        oscillator: 'Active Source: Oscillator',
        'uploaded-ready': 'Active Source: Uploaded File (Ready)',
        uploaded: 'Active Source: Uploaded File',
        'uploaded-paused': 'Active Source: Uploaded File (Paused)'
    };

    sourceStatus.textContent = map[activeSource] || 'Active Source: Idle';
}

function resizeSketch() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const nextWidth = Math.max(320, container.clientWidth);
    const nextHeight = Math.max(260, container.clientHeight);
    resizeCanvas(nextWidth, nextHeight);
}

window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeSketch, 120);
});
