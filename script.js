import { Eye } from './eye.js';
import { generateGrid } from './grid.js';
import { Torch } from './torch.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Created by CJ-Cepe | © 2025');
    console.log('YEah 🤘 hahaha');

    generateGrid();

    new Torch();

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        new Eye(cell);
    });
});