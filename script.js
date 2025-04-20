document.addEventListener('DOMContentLoaded', () => {
    console.log('YEah hahaha');

    generateGrid(); 
});
  
function generateGrid(rows = 6, cols = 6) {
    const canvas = document.querySelector('.canvas');

    // Clear previous content
    canvas.innerHTML = ''; // ??

    // Set CSS Grid styles
    canvas.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    canvas.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    // Get canvas dimensions
    const { width, height } = canvas.getBoundingClientRect();

    // Compute each cell size
    const cellWidth = Math.floor(width / cols);
    const cellHeight = Math.floor(height / rows);

    // Create grid cells
    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        canvas.appendChild(cell);
    }
}
  

  