// public/js/network-background.js

// Esta es la forma infalible de cargar las partículas en la v2
(async () => {
    // 1. Inicializar el motor de tsparticles
    await tsParticles.load("tsparticles", {
        fpsLimit: 60,
        interactivity: {
            events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "grab" }, // Efecto de red al pasar el mouse
                resize: true,
            },
            modes: {
                grab: { distance: 140, links: { opacity: 0.5 } },
                push: { quantity: 4 },
            },
        },
        particles: {
            color: { value: "#00f2fe" }, // Cian Neón
            links: {
                color: "#4facfe", // Azul Tech
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                outModes: { default: "out" },
            },
            number: {
                density: { enable: true, area: 800 },
                value: 80,
            },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
        background: { color: "#050509" } // Fondo negro profundo
    });
})();