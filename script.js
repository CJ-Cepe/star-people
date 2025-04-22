import { Eye } from './eye.js';
import { Mouth } from './mouth.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('YEah hahaha');
    generateGrid();

    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        new Eye(cell); // Assuming Eye class handles the eye creation
    });
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