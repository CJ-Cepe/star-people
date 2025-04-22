import { Eye } from './eye.js';
import { generateGrid } from './grid.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('YEah hahaha');
    generateGrid();

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        new Eye(cell); // Assuming Eye class handles the eye creation
    });
});