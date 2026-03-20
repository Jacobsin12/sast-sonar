// public/js/network-background.js

// Usamos TSParticles para crear el fondo de nodos conectados
loadParticles(async (container) => {
    // Aquí definimos la configuración "chingona" de la red
    await container.load("tsparticles", {
        fpsLimit: 60,
        particles: {
            number: {
                value: 80, // Cantidad de nodos
                density: { enable: true, area: 800 }
            },
            color: { value: "#00f2fe" }, // Color Cian Neón de los nodos
            shape: { type: "circle" },
            opacity: {
                value: 0.3,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
            },
            // --- ESTO HACE LAS LÍNEAS DE CONEXIÓN (TRÁFICO) ---
            links: {
                enable: true,
                distance: 150,
                color: "#4facfe", // Color Púrpura/Azul Tech de las líneas
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1, // Velocidad lenta y elegante
                direction: "none",
                random: false,
                straight: false,
                outModes: { default: "out" },
                attract: { enable: false, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                onHover: {
                    enable: true,
                    mode: "grab" // Al pasar el mouse, los nodos se conectan a él
                },
                onClick: { enable: true, mode: "push" }, // Clic agrega nodos
                resize: true
            },
            modes: {
                grab: { distance: 140, links: { opacity: 0.5 } },
                push: { quantity: 4 }
            }
        },
        detectRetina: true,
        background: { color: "#050509" } // Asegurar fondo negro profundo
    });
});