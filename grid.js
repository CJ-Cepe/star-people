export function generateGrid() {
    const canvas = document.querySelector(".canvas");
    const cellSize = 100;
    canvas.innerHTML = ""; // ??

    const canvasRect = canvas.getBoundingClientRect();
    const styles = getComputedStyle(canvas);

    const paddingX = parseInt(styles.paddingLeft) + parseInt(styles.paddingRight);
    const paddingY = parseInt(styles.paddingTop) + parseInt(styles.paddingBottom);
    const gap = parseInt(styles.gap) || 0;

    const availableWidth = canvasRect.width - paddingX + gap;
    const availableHeight = canvasRect.height - paddingY + gap;

    const cols = Math.floor(availableWidth / (cellSize + gap));
    const rows = Math.floor(availableHeight / (cellSize + gap));
    const totalCells = cols * rows;
    const extraCells = 15;
    let consumedGridCell = 0;

    // ⭐
    while (consumedGridCell < totalCells + extraCells) {
        let rowSpan = 1;
        let colSpan = 1;
    
        if (consumedGridCell < Math.floor((totalCells + extraCells) / 1.2)) {
          rowSpan = Math.random() < 0.8 ? 1 : 2;
          colSpan = Math.random() < 0.8 ? 1 : 2;
        }
        
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.style.gridColumn = `span ${colSpan}`;
        cell.style.gridRow = `span ${rowSpan}`;
        consumedGridCell += rowSpan * colSpan;

        // random border radius
        const randRadius = () => Math.floor(Math.random() * 1) + 10; // 5 to 10

        const tl = randRadius();
        const tr = randRadius();
        const br = randRadius();
        const bl = randRadius();

        cell.style.borderRadius = `${tl}px ${tr}px ${br}px ${bl}px`;
        canvas.appendChild(cell);
    }
}