let currentShape = 'box';
let currentLighting = 'ambient';
let currentCamera = 'default';
let showOutlines = false;
let resizeTimer = null;

function isBoringMode() {
    return document.body.classList.contains('boring-mode');
}

function getWebglPalette() {
    if (isBoringMode()) {
        return {
            bg: [236, 236, 236],
            shape: [130, 150, 190],
            xAxis: [210, 70, 70],
            yAxis: [70, 165, 90],
            zAxis: [75, 105, 210],
            groundFill: [210, 210, 210, 180],
            groundStroke: [120, 120, 120],
            orbitStroke: [130, 130, 130, 120],
            outline: [35, 35, 35]
        };
    }

    return {
        bg: [15, 10, 38],
        shape: [255, 102, 224],
        xAxis: [0, 245, 212],
        yAxis: [255, 102, 224],
        zAxis: [138, 128, 255],
        groundFill: [43, 32, 84, 120],
        groundStroke: [116, 249, 255],
        orbitStroke: [255, 131, 231, 120],
        outline: [0, 245, 212]
    };
}

function setup() {
    const container = document.getElementById('canvas-container');
    const width = Math.max(320, container.clientWidth - 20);
    const height = 600;
    const canvas = createCanvas(width, height, WEBGL);
    canvas.parent('canvas-container');
}

function draw() {
    const palette = getWebglPalette();
    background(palette.bg[0], palette.bg[1], palette.bg[2]);
    
    // Apply lighting based on selection
    applyLighting();
    
    // Apply camera based on selection
    applyCamera();
    
    // Draw the main shape
    push();
    rotateX(frameCount * 0.005);
    rotateY(frameCount * 0.008);
    fill(palette.shape[0], palette.shape[1], palette.shape[2]);
    specularMaterial(palette.shape[0], palette.shape[1], palette.shape[2]);
    shininess(90);
    if (showOutlines) {
        stroke(palette.outline[0], palette.outline[1], palette.outline[2]);
        strokeWeight(1.3);
    } else {
        noStroke();
    }
    drawShape(currentShape);
    pop();
    
    // Draw coordinate axes (for reference)
    drawAxes();
    
    // Draw some helper objects
    drawHelpers();
}

function drawShape(shape) {
    switch(shape) {
        case 'box':
            box(100, 100, 100);
            break;
        case 'sphere':
            sphere(60);
            break;
        case 'cylinder':
            cylinder(50, 100);
            break;
        case 'cone':
            cone(50, 100);
            break;
        case 'torus':
            torus(50, 20);
            break;
    }
}

function applyLighting() {
    switch(currentLighting) {
        case 'ambient':
            ambientLight(200);
            break;
        case 'directional':
            ambientLight(100);
            directionalLight(255, 255, 255, 0, 1, -1);
            break;
        case 'point':
            ambientLight(100);
            pointLight(255, 100, 100, 200, 200, 200);
            break;
        case 'spot':
            ambientLight(100);
            spotLight(255, 255, 255, 0, -100, 300, 0, 0, -1, PI / 4);
            break;
    }
}

function applyCamera() {
    perspective();
    switch(currentCamera) {
        case 'default':
            camera(0, 0, 400, 0, 0, 0, 0, 1, 0);
            break;
        case 'orbit':
            let angle = frameCount * 0.01;
            let x = cos(angle) * 300;
            let z = sin(angle) * 300;
            camera(x, 100, z, 0, 0, 0, 0, 1, 0);
            break;
        case 'top':
            camera(0, -400, 0, 0, 0, 0, 0, 0, -1);
            break;
        case 'side':
            camera(400, 0, 0, 0, 0, 0, 0, 1, 0);
            break;
    }
}

function drawAxes() {
    const palette = getWebglPalette();
    stroke(palette.xAxis[0], palette.xAxis[1], palette.xAxis[2]);
    strokeWeight(2);
    line(0, 0, 0, 150, 0, 0);
    
    stroke(palette.yAxis[0], palette.yAxis[1], palette.yAxis[2]);
    line(0, 0, 0, 0, 150, 0);
    
    stroke(palette.zAxis[0], palette.zAxis[1], palette.zAxis[2]);
    line(0, 0, 0, 0, 0, 150);
    
}

function drawHelpers() {
    const palette = getWebglPalette();
    // Draw a ground plane
    push();
    translate(0, 150, 0);
    fill(palette.groundFill[0], palette.groundFill[1], palette.groundFill[2], palette.groundFill[3]);
    stroke(palette.groundStroke[0], palette.groundStroke[1], palette.groundStroke[2]);
    strokeWeight(1);
    box(400, 5, 400);
    pop();
    
    // Draw some orbiting spheres
    push();
    noFill();
    stroke(palette.orbitStroke[0], palette.orbitStroke[1], palette.orbitStroke[2], palette.orbitStroke[3]);
    sphere(200);
    pop();
}

function setShape(shape, evt) {
    currentShape = shape;
    setActiveControl('.shape-controls .tool-button', evt);
}

function setLighting(lighting, evt) {
    currentLighting = lighting;
    setActiveControl('.light-controls .tool-button', evt);
}

function setCameraMode(cameraMode, evt) {
    currentCamera = cameraMode;
    setActiveControl('.camera-controls .tool-button', evt);
}

function setOutlineMode(enabled, evt) {
    showOutlines = enabled;
    setActiveControl('.outline-controls .tool-button', evt);
}

function setActiveControl(selector, evt) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.classList.remove('active');
    });

    const target = evt && evt.target ? evt.target : null;
    if (target) {
        target.classList.add('active');
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const container = document.getElementById('canvas-container');
        if (!container) return;
        const nextWidth = Math.max(320, container.clientWidth - 20);
        resizeCanvas(nextWidth, 600);
    }, 120);
});
