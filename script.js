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
  
function generateEye(){
    //div.eye
        //div.ball
            //div.iris
                //div.pupil
    const canvas = document.querySelector(".canvas");


    const eye = document.createElement("div");
    const ball = document.createElement("div");
    const iris = document.createElement("div");
    const pupil = document.createElement("div");

    eye.className = "eye";
    ball.className = "ball";
    iris.className = "iris";
    pupil.className = "pupil";

    canvas.appendChild(eye);
    eye.appendChild(ball);
    ball.appendChild(iris);
    iris.appendChild(pupil);
    
    document.addEventListener('mousemove', (e) => {
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        let ballBoundRect = ball.getBoundingClientRect();
        let ballCenterX = ballBoundRect.left + ballBoundRect.width / 2;
        let ballCenterY = ballBoundRect.top + ballBoundRect.height / 2;
    
        const angleDeg = angle(mouseX, mouseY, ballCenterX, ballCenterY);
        iris.style.
    })

    
}

function angle(cx, cy, ex, ey){
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);

    const deg = rad * 180 / Math.PI; // rads to degrees, range (-180 - 180) for css
    return deg
}