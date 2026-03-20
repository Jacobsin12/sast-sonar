// public/js/animations.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Animación de entrada para las Glass Cards (escalado y opacidad)
    anime({
        targets: '.animate-card',
        scale: [0.9, 1],
        opacity: [0, 1],
        delay: anime.stagger(150, {start: 300}), // Aparecen una tras otra
        duration: 800,
        easing: 'easeOutElastic(1, .8)'
    });

    // 2. Animación de "pulso" sutil para elementos de acento neón
    anime({
        targets: '.neon-pulse',
        boxShadow: [
            '0 0 10px rgba(233, 69, 96, 0.3)',
            '0 0 20px rgba(233, 69, 96, 0.6)',
            '0 0 10px rgba(233, 69, 96, 0.3)'
        ],
        loop: true,
        duration: 2000,
        easing: 'easeInOutQuad'
    });

    // 3. Animación de entrada para texto (deslizamiento hacia arriba)
    anime({
        targets: '.animate-text',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: 100,
        duration: 600,
        easing: 'easeOutQuad'
    });
});