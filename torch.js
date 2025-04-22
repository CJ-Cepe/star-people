export class Torch {
    constructor() {
        this.torch = document.getElementById('torch-overlay');

        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.body.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        document.body.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }

    handleMouseMove(e) {
        const x = `${e.clientX}px`;
        const y = `${e.clientY}px`;
        this.torch.style.setProperty('--x', x);
        this.torch.style.setProperty('--y', y);
    }

    handleMouseEnter() {
        this.torch.classList.remove('mouse-leave');
    }

    handleMouseLeave() {
        this.torch.classList.add('mouse-leave');
    }
}
