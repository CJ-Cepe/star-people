import { Eye } from './eye.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('YEah hahaha');
    //generateGrid();
    const canvas = document.querySelector(".canvas");
    const eye1 = new Eye(canvas);
    const eye2 = new Eye(canvas);
    const eye3 = new Eye(canvas);
    const eye4 = new Eye(canvas);


    /* generateEye(); */
});
  
function generateGrid() {
    const canvas = document.querySelector(".canvas");
    const size = 4;
    let availableGridCell = size * size;
    let consumedGridCell = 0
    let i = 0;

    while (consumedGridCell < availableGridCell) {
        let rowSpan = 1;
        let colSpan = 1;
    
        if (consumedGridCell < Math.floor(availableGridCell / 1.5)) {
          rowSpan = Math.random() < 0.7 ? 1 : 2;
          colSpan = Math.random() < 0.7 ? 1 : 2;
        }
        
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = i++;
        cell.style.gridColumn = `span ${colSpan}`;
        cell.style.gridRow = `span ${rowSpan}`;

        const randRadius = () => Math.floor(Math.random() * 1) + 10; // 5 to 10

        const tl = randRadius();
        const tr = randRadius();
        const br = randRadius();
        const bl = randRadius();

        cell.style.borderRadius = `${tl}px ${tr}px ${br}px ${bl}px`;

        canvas.appendChild(cell);
    
        consumedGridCell += rowSpan * colSpan;
    }
}


// =============== Eye Functions ===============
// Function to calculate the distance between the mouse and the eye center
function calculatePointerDistance(mouseX, mouseY, eyeCenterX, eyeCenterY) {
    const dx = mouseX * window.innerWidth - eyeCenterX;
    const dy = mouseY * window.innerHeight - eyeCenterY;
    return Math.sqrt(dx * dx + dy * dy);  // returns the distance
}

// Function to move the light based on the mouse position
function moveLight(mouseX, mouseY, eyeCenterX, eyeCenterY, light, eyeRect) {
    const lightOffset = 8; // Small max movement for light
    const lightX = ((mouseX * window.innerWidth - eyeCenterX) / eyeRect.width) * lightOffset;
    const lightY = ((mouseY * window.innerHeight - eyeCenterY) / eyeRect.height) * lightOffset;
    light.style.transform = `translate(${lightX}px, ${lightY}px)`;
    light.style.opacity = "0.2";
}

// Function to update the iris movement
function updateIrisPosition(mouseX, mouseY, eyeRect, pointerNear) {
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const maxOffset = 8;
    let x, y;

    if (pointerNear) {
        x = ((mouseX * window.innerWidth - eyeCenterX) / eyeRect.width) * maxOffset + jitter(1);
        y = ((mouseY * window.innerHeight - eyeCenterY) / eyeRect.height) * maxOffset + jitter(1);
        x = clamp(x, -maxOffset, maxOffset);
        y = clamp(y, -maxOffset, maxOffset);
    } else {
        x = jitter(maxOffset);
        y = jitter(maxOffset);
    }
    return { x, y };
}

function blink(eye) {
    eye.classList.add("blinking");
    setTimeout(() => {
        eye.classList.remove("blinking");
    }, 200); // Blink duration
}

// Jitter utility function
function jitter(range = 5) {
    return (Math.random() - 0.5) * 2 * range;
}

// Clamp utility function
function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

function generateEye() {
    const canvas = document.querySelector(".canvas");
    const eye = document.createElement("div");
    const ball = document.createElement("div");
    const iris = document.createElement("div");
    const light = document.createElement("div");

    eye.className = "eye";
    ball.className = "ball";
    iris.className = "iris";
    light.className = "light";

    canvas.appendChild(eye);
    eye.appendChild(ball);
    ball.appendChild(iris);
    eye.appendChild(light);

    let mouseX = 0.5;
    let mouseY = 0.5;
    let pointerNear = false;
    let currentInterval = null;
    const farDelay = 1000;

    // Blink randomly every 2–5 seconds
    setInterval(() => {
        if (Math.random() < 0.5) {
            blink(eye);
        }
    }, 2000 + Math.random() * 3000);

    function updateIris() {
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const distance = calculatePointerDistance(mouseX, mouseY, eyeCenterX, eyeCenterY);
        pointerNear = distance < 250;

        const { x, y } = updateIrisPosition(mouseX, mouseY, eyeRect, pointerNear);
        iris.style.transform = `translate(${x}px, ${y}px)`;

        if (pointerNear) {
            moveLight(mouseX, mouseY, eyeCenterX, eyeCenterY, light, eyeRect);
        } else {
            light.style.opacity = "0";
        }
    }

    // Handle mouse movement
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;

        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        const distance = calculatePointerDistance(mouseX, mouseY, eyeCenterX, eyeCenterY);

        const wasNear = pointerNear;
        pointerNear = distance < 250;

        if (pointerNear) {
            if (!wasNear && currentInterval) {
                clearInterval(currentInterval);
                currentInterval = null;
            }
            updateIris(); // Immediate update when pointer is near
        } else if (!currentInterval) {
            // Restart slow updates when pointer becomes far
            currentInterval = setInterval(updateIris, farDelay);
        }
    });

    // Initial slow updates since pointer is far
    currentInterval = setInterval(updateIris, farDelay);
}