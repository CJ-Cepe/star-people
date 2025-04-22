export class Eye {
    constructor(canvas, x = 0.5, y = 0.5, distanceThreshold = 250) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.distanceThreshold = distanceThreshold;

        this.eye = document.createElement("div");
        this.ball = document.createElement("div");
        this.iris = document.createElement("div");
        this.light = document.createElement("div");

        this.eye.className = "eye";
        this.ball.className = "ball";
        this.iris.className = "iris";
        this.light.className = "light";

        this.canvas.appendChild(this.eye);
        this.eye.appendChild(this.ball);
        this.ball.appendChild(this.iris);
        this.eye.appendChild(this.light);
        
        // Position the eye randomly inside the grid
        this.positionEyeRandomly();

        // Mouse position
        this.mouseX = 0.5;
        this.mouseY = 0.5;
        this.pointerNear = false;

        this.currentInterval = null;
        this.currentDelay = 1000;

        // Setup for intervals and random blink
        this.setupBlink();
        this.setupInterval();

        // Bind events
        this.setupMouseMoveListener();
    }

    // Function to setup blinking
    setupBlink() {
        setInterval(() => {
            if (Math.random() < 0.3) { // % chance to blink
                this.blink();
            }
        }, 2000 + Math.random() * 3000);
    }

    // Blink function
    blink() {
        this.eye.classList.add("blinking");
        setTimeout(() => {
            this.eye.classList.remove("blinking");
        }, 200); // Blink duration
    }

    // Function to calculate the distance between the mouse and the eye center
    calculatePointerDistance(mouseX, mouseY, eyeCenterX, eyeCenterY) {
        const dx = mouseX * window.innerWidth - eyeCenterX;
        const dy = mouseY * window.innerHeight - eyeCenterY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Function to update the iris position
    updateIrisPosition(mouseX, mouseY, eyeRect, pointerNear) {
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const maxOffset = 3;
        let x, y;

        if (pointerNear) {
            x = ((mouseX * window.innerWidth - eyeCenterX) / eyeRect.width) * maxOffset + this.jitter(1);
            y = ((mouseY * window.innerHeight - eyeCenterY) / eyeRect.height) * maxOffset + this.jitter(1);
            x = this.clamp(x, -maxOffset, maxOffset);
            y = this.clamp(y, -maxOffset, maxOffset);
        } else {
            x = this.jitter(maxOffset);
            y = this.jitter(maxOffset);
        }
        return { x, y };
    }

    // Jitter function for small random values
    jitter(range = 5) {
        return (Math.random() - 0.5) * 2 * range;
    }

    // Clamp function to limit values
    clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }

    // Move the light
    moveLight(mouseX, mouseY, eyeCenterX, eyeCenterY) {
        const lightOffset = 8;
        const lightX = ((mouseX * window.innerWidth - eyeCenterX) / this.eye.getBoundingClientRect().width) * lightOffset;
        const lightY = ((mouseY * window.innerHeight - eyeCenterY) / this.eye.getBoundingClientRect().height) * lightOffset;
        this.light.style.transform = `translate(${lightX}px, ${lightY}px)`;
        this.light.style.opacity = "0.2";
    }

    // Function to update iris and light when mouse is moving
    updateIris() {
        const eyeRect = this.eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const distance = this.calculatePointerDistance(this.mouseX, this.mouseY, eyeCenterX, eyeCenterY);
        this.pointerNear = distance < this.distanceThreshold;

        const { x, y } = this.updateIrisPosition(this.mouseX, this.mouseY, eyeRect, this.pointerNear);
        this.iris.style.transform = `translate(${x}px, ${y}px)`;

        if (this.pointerNear) {
            this.moveLight(this.mouseX, this.mouseY, eyeCenterX, eyeCenterY);
        }
    }

    // Function to start or restart the interval for the eye
    setupInterval() {
        this.currentInterval = setInterval(() => this.updateIris(), this.currentDelay);
    }

    // Event listener for mousemove
    setupMouseMoveListener() {
        document.addEventListener("mousemove", (e) => {
            this.mouseX = e.clientX / window.innerWidth;
            this.mouseY = e.clientY / window.innerHeight;

            const eyeRect = this.eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            const distance = this.calculatePointerDistance(this.mouseX, this.mouseY, eyeCenterX, eyeCenterY);

            const wasNear = this.pointerNear;
            this.pointerNear = distance < this.distanceThreshold;

            if (this.pointerNear) {
                this.updateIris();
            }

            // When transitioning from near to far, reset interval
            if (!this.pointerNear && wasNear) {
                clearInterval(this.currentInterval);
                this.currentInterval = setInterval(() => this.updateIris(), this.currentDelay);
            }
        });
    }

    positionEyeRandomly() {
        const cell = this.eye.parentElement;
        const cellRect = cell.getBoundingClientRect();
    
        const eyeWidth = this.eye.offsetWidth || 50;  // fallback 
        const eyeHeight = this.eye.offsetHeight || 50;
    
        const maxX = Math.max(0, cellRect.width - eyeWidth - 10);
        const maxY = Math.max(0, cellRect.height - eyeHeight - 10);
    
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
    
        this.eye.style.position = 'absolute';
        this.eye.style.left = `${randomX}px`;
        this.eye.style.top = `${randomY}px`;
    }
}



