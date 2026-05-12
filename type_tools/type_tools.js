let currentFont = 'serif';
let currentAlignment = 'center';
let currentEffect = 'wave';
let textSize_value = 32;
let demoText = 'WAVE';
let resizeTimer = null;

function isBoringMode() {
    return document.body.classList.contains('boring-mode');
}

function getTypePalette() {
    if (isBoringMode()) {
        return {
            bg: [244, 244, 244],
            guide: [190, 190, 190],
            mainText: [30, 30, 30],
            marker: [220, 80, 80],
            alignText: [45, 45, 45],
            helperText: [110, 110, 110]
        };
    }

    return {
        bg: [21, 12, 48],
        guide: [108, 93, 168],
        mainText: [250, 240, 255],
        marker: [0, 245, 212],
        alignText: [255, 117, 216],
        helperText: [181, 167, 236]
    };
}

function setup() {
    const container = document.getElementById('canvas-container');
    const width = Math.max(320, container.clientWidth - 20);
    const height = 500;
    const canvas = createCanvas(width, height);
    canvas.parent('canvas-container');
}

function draw() {
    const palette = getTypePalette();
    background(palette.bg[0], palette.bg[1], palette.bg[2]);
    
    // Apply font
    applyFont();
    
    // Draw guide lines
    drawGuides();
    
    // Draw main typography demo
    drawTypographyDemo();
}

function applyFont() {
    switch(currentFont) {
        case 'serif':
            textFont('VT323');
            break;
        case 'sans-serif':
            textFont('Space Grotesk');
            break;
        case 'monospace':
            textFont('IBM Plex Mono');
            break;
        case 'cursive':
            textFont('Pacifico');
            break;
    }
}

function drawGuides() {
    const palette = getTypePalette();
    stroke(palette.guide[0], palette.guide[1], palette.guide[2]);
    strokeWeight(1);
    
    // Center line
    line(width / 2, 0, width / 2, height);
    
    // Baseline
    line(0, height / 2, width, height / 2);
}

function drawTypographyDemo() {
    const palette = getTypePalette();
    fill(palette.mainText[0], palette.mainText[1], palette.mainText[2]);
    noStroke();
    
    switch(currentEffect) {
        case 'wave':
            drawWaveEffect();
            break;
        case 'rotate':
            drawRotateEffect();
            break;
        case 'scale':
            drawScaleEffect();
            break;
        case 'rainbow':
            drawRainbowEffect();
            break;
    }
    
    // Draw alignment demo
    drawAlignmentDemo();
}

function drawWaveEffect() {
    textSize(textSize_value);
    textAlign(CENTER, CENTER);
    let str = demoText;
    let baseY = height / 2;
    let charWidth = textWidth('W') * 0.95;
    let startX = width / 2 - ((str.length - 1) * charWidth / 2);
    
    for (let i = 0; i < str.length; i++) {
        let y = sin(frameCount * 0.05 + i * 0.5) * 30;
        text(str[i], startX + i * charWidth, baseY + y);
    }
}

function drawRotateEffect() {
    const palette = getTypePalette();
    push();
    translate(width / 2, height / 2);
    rotate(frameCount * 0.01);
    textSize(textSize_value);
    textAlign(CENTER, CENTER);
    fill(palette.mainText[0], palette.mainText[1], palette.mainText[2]);
    text(demoText, 0, 0);
    pop();
}

function drawScaleEffect() {
    textSize(textSize_value);
    textAlign(CENTER, CENTER);
    let str = demoText;
    let baseY = height / 2;
    let charWidth = textWidth('W') * 0.95;
    let startX = width / 2 - ((str.length - 1) * charWidth / 2);
    
    for (let i = 0; i < str.length; i++) {
        let scaleAmount = 0.5 + sin(frameCount * 0.05 + i * 0.5) * 0.5;
        push();
        translate(startX + i * charWidth, baseY);
        scale(scaleAmount);
        text(str[i], 0, 0);
        pop();
    }
}

function drawRainbowEffect() {
    textSize(textSize_value);
    textAlign(CENTER, CENTER);
    let str = demoText;
    let baseY = height / 2;
    let charWidth = textWidth('W') * 0.95;
    let startX = width / 2 - ((str.length - 1) * charWidth / 2);
    
    for (let i = 0; i < str.length; i++) {
        let hue = (frameCount * 2 + i * 30) % 360;
        let c = color('hsl(' + hue + ', 100%, 50%)');
        fill(c);
        text(str[i], startX + i * charWidth, baseY);
    }
}

function drawAlignmentDemo() {
    const palette = getTypePalette();
    textSize(16);
    fill(palette.helperText[0], palette.helperText[1], palette.helperText[2]);
    
    // Draw alignment reference point
    fill(palette.marker[0], palette.marker[1], palette.marker[2]);
    circle(width / 2, height - 80, 8);
    
    // Draw text with current alignment
    textAlign(currentAlignment, CENTER);
    fill(palette.alignText[0], palette.alignText[1], palette.alignText[2]);
    textSize(24);
    text('Alignment Demo', width / 2, height - 80);
    
    // Label
    fill(palette.helperText[0], palette.helperText[1], palette.helperText[2]);
    textSize(12);
    textAlign(CENTER);
    text('(Red dot shows anchor point)', width / 2, height - 40);
}

function setFont(font, evt) {
    currentFont = font;
    updateButtonStyle('.font-controls .tool-button', evt ? evt.target : null);
}

function setAlignment(align, evt) {
    currentAlignment = align;
    updateButtonStyle('.align-controls .tool-button', evt ? evt.target : null);
}

function setEffect(effect, evt) {
    currentEffect = effect;
    updateButtonStyle('.effect-controls .tool-button', evt ? evt.target : null);
}

function updateSize(value) {
    textSize_value = parseInt(value);
    document.getElementById('sizeValue').textContent = value;
}

function updateDemoText(value) {
    const clean = (value || '').trim();
    demoText = clean.length > 0 ? clean.slice(0, 18) : 'WAVE';
}

function updateButtonStyle(selector, button) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.classList.remove('active');
    });
    if (button) {
        button.classList.add('active');
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const container = document.getElementById('canvas-container');
        if (!container) return;
        const nextWidth = Math.max(320, container.clientWidth - 20);
        resizeCanvas(nextWidth, 500);
    }, 120);
});
