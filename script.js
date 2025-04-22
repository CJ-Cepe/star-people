import { Eye } from './eye.js';
import { generateGrid } from './grid.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('YEah hahaha');
    generateGrid();

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        new Eye(cell); // Assuming Eye class handles the eye creation
    });

    // Torch  
    const torch = document.getElementById('torch-overlay');

    document.addEventListener('mousemove', e => {
    const x = `${e.clientX}px`;
    const y = `${e.clientY}px`;
    torch.style.setProperty('--x', x);
    torch.style.setProperty('--y', y);
    });

    document.body.addEventListener('mouseenter', () => {
        torch.classList.remove('mouse-leave'); 
    });

    document.body.addEventListener('mouseleave', () => {
        torch.classList.add('mouse-leave');
    });

    document.addEventListener('mouseenter', () => {
        torch.classList.remove('mouse-leave');
    });
});