document.addEventListener('DOMContentLoaded', () => {
    console.log('YEah hahaha');
    generateGrid();
});
  
function generateGrid() {
    const canvas = document.querySelector(".canvas");
    const size = 5;
    let availableGridCell = size * size;
    let consumedGridCell = 0
    let i = 0;

    while (consumedGridCell < availableGridCell) {
        let rowSpan = 1;
        let colSpan = 1;
    
        if (consumedGridCell < Math.floor(availableGridCell / 2)) {
          rowSpan = Math.random() < 0.7 ? 1 : 2;
          colSpan = Math.random() < 0.7 ? 1 : 2;
        }
    
      /*   const cellsNeeded = rowSpan * colSpan;
    
        // Avoid overflowing the grid
        if (consumedGridCell + cellsNeeded > availableGridCell) {
          rowSpan = 1;
          colSpan = 1;
        } */
    
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = i++;
        cell.style.gridColumn = `span ${colSpan}`;
        cell.style.gridRow = `span ${rowSpan}`;
        canvas.appendChild(cell);
    
        consumedGridCell += rowSpan * colSpan;
    }
}
  
