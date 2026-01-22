import { useRef, useEffect } from 'react';
import './MagnetDots.css';

export default function MagnetDots({
    rows = 20,
    columns = 20,
    containerSize = '100%',
    baseColor = '#d9393f', // Amatus Red
    activeColor = '#ffffff', // White
    dotSize = '4px',
    radius = 210, // Interaction radius in pixels
    className = '',
    style = {}
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = container.querySelectorAll('span');

        // Helper to interpolate colors
        const interpolateColor = (color1, color2, factor) => {
            // Simple hex interpolation assumption (can use a library or helper if needed, but simple linear works for robust hexes)
            // Since we know our specific colors (#d9393f and #ffffff), we can optimize or do standard bitwise.
            const r1 = parseInt(color1.slice(1, 3), 16);
            const g1 = parseInt(color1.slice(3, 5), 16);
            const b1 = parseInt(color1.slice(5, 7), 16);

            const r2 = parseInt(color2.slice(1, 3), 16);
            const g2 = parseInt(color2.slice(3, 5), 16);
            const b2 = parseInt(color2.slice(5, 7), 16);

            const r = Math.round(r1 + factor * (r2 - r1));
            const g = Math.round(g1 + factor * (g2 - g1));
            const b = Math.round(b1 + factor * (b2 - b1));

            return `rgb(${r}, ${g}, ${b})`;
        };

        const onPointerMove = pointer => {
            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                const centerX = rect.x + rect.width / 2;
                const centerY = rect.y + rect.height / 2;

                const b = pointer.x - centerX;
                const a = pointer.y - centerY;
                const dist = Math.sqrt(a * a + b * b);

                // Calculate intensity based on distance (0 to 1)
                // If distance < radius, we interpolate towards activeColor
                let intensity = 0;
                if (dist < radius) {
                    intensity = 1 - (dist / radius);
                }

                // CSS variable for color
                const color = interpolateColor(baseColor, activeColor, intensity);
                item.style.backgroundColor = color;
            });
        };

        const handleMove = (e) => {
            onPointerMove({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('pointermove', handleMove);

        // Initial position center check
        if (items.length) {
            const middleIndex = Math.floor(items.length / 2);
            const rect = items[middleIndex].getBoundingClientRect();
            onPointerMove({ x: rect.x, y: rect.y });
        }

        return () => {
            window.removeEventListener('pointermove', handleMove);
        };
    }, [baseColor, activeColor, radius]);

    // Dynamically calculate grid to cover screen roughly 
    // For now, using passed prop or responsive CSS grid, 
    // but generating enough spans is key.
    // We'll generate a grid that fills the viewport.
    // Let's rely on CSS Grid to layout, but React needs to render 'total' items.
    // We'll trust the user/parent to pass appropriate row/col or CSS vars.
    // Actually, to cover "all the background", we need A LOT of dots.
    // Let's assume a standard dense grid.

    const total = rows * columns;
    const spans = Array.from({ length: total }, (_, i) => (
        <span
            key={i}
            style={{
                backgroundColor: baseColor,
                width: dotSize,
                height: dotSize,
                borderRadius: '50%'
            }}
        />
    ));

    return (
        <div
            ref={containerRef}
            className={`magnet-dots-container ${className}`}
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                width: containerSize,
                height: containerSize,
                ...style
            }}
        >
            {spans}
        </div>
    );
}
