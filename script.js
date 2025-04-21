document.addEventListener('DOMContentLoaded', () => {
    console.log('YEah hahaha');
    //generateGrid();

    generateEye();
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

  function generateEye() {
    const canvas = document.querySelector(".canvas");
    const eye = document.createElement("div");
    const ball = document.createElement("div");
    const iris = document.createElement("div");
  
    eye.className = "eye";
    ball.className = "ball";
    iris.className = "iris";
  
    canvas.appendChild(eye);
    eye.appendChild(ball);
    ball.appendChild(iris);
  
    let mouseX = 0.5;
    let mouseY = 0.5;
    let pointerNear = false;
    let currentInterval = null;
    let currentDelay = null;
  
    function jitter(range = 5) {
      return (Math.random() - 0.5) * 2 * range;
    }
  
    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }
  
    function updateIris() {
      const eyeRect = eye.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;
  
      const dx = mouseX * window.innerWidth - eyeCenterX;
      const dy = mouseY * window.innerHeight - eyeCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      pointerNear = distance < 250;
  
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
  
      iris.style.transform = `translate(${x}px, ${y}px)`;
  
      // Restart interval only if delay needs to change
      const newDelay = pointerNear ? 100 : 1000;
      if (newDelay !== currentDelay) {
        clearInterval(currentInterval);
        currentDelay = newDelay;
        currentInterval = setInterval(updateIris, currentDelay);
      }
    }
  
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    });
  
    // Start the first interval
    currentDelay = 1000;
    currentInterval = setInterval(updateIris, currentDelay);
  }
  

function generateEye2() {
    const canvas = document.querySelector(".canvas");
    const eye = document.createElement("div");
    const ball = document.createElement("div");
    const iris = document.createElement("div");
  
    eye.className = "eye";
    ball.className = "ball";
    iris.className = "iris";
  
    canvas.appendChild(eye);
    eye.appendChild(ball);
    ball.appendChild(iris);
  
    let mouseX = 0.5;
    let mouseY = 0.5;
    let pointerNear = false;
  
    document.addEventListener("mousemove", (e) => {
      // continuously tracks the mouse cursor's position within the browser window 
      // and stores its normalized horizontal and vertical coordinates ranging from 0 - 1
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    });
  
    // generates a small, random offset within a specified range, centered around zero
    // jitter() random number between -5 and < 5
    // jitter(2) random number between -2 and < 2
    function jitter(range = 5) {
      return (Math.random() - 0.5) * 2 * range;
    }


    // prevent the iris from going out of the eyeball
    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }
  
    setInterval(() => {
      const eyeRect = eye.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;
  
      const dx = mouseX * window.innerWidth - eyeCenterX;
      const dy = mouseY * window.innerHeight - eyeCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy); // calculate distance of the pointer to the eye
  
      pointerNear = distance < 250; // 👁️ Threshold to activate eye contact
  
      const maxOffset = 8; //offset and jitter
      let x, y;
  
      if (pointerNear) {
        // Focused mode - look at pointer
        x = ((mouseX * window.innerWidth - eyeCenterX) / eyeRect.width) * maxOffset + jitter(1);
        y = ((mouseY * window.innerHeight - eyeCenterY) / eyeRect.height) * maxOffset + jitter(1);    
        x = clamp(x, -maxOffset, maxOffset);
        y = clamp(y, -maxOffset, maxOffset);
      } else {
        // Idle - randomly glance around
        x = jitter(maxOffset);
        y = jitter(maxOffset);
      }
  
      iris.style.transform = `translate(${x}px, ${y}px)`;
    }, 150); // adjust timing for vibe
  }
  