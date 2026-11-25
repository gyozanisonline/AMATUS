import { useRef, useEffect, useState } from 'react';
import './MagnetDots.css';

// Red dot grid behind the page. Dots near the pointer fade to white.
// Spacing stays square at any screen size; dot centres are measured once
// per resize, not on every pointer move.

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

function gridFor(spacing) {
    if (typeof window === 'undefined') return { cols: 20, rows: 20 };
    return {
        cols: Math.max(6, Math.round(window.innerWidth / spacing)),
        rows: Math.max(6, Math.round(window.innerHeight / spacing)),
    };
}

export default function MagnetDots({
    spacing = 64, // target distance between dots, in px
    baseColor = '#d9393f',
    activeColor = '#ffffff',
    dotSize = '4px',
    radius = 210,
    clearPad = 14, // px of breathing room around cleared content
    className = '',
    style = {},
}) {
    const containerRef = useRef(null);
    const [grid, setGrid] = useState(() => gridFor(spacing));

    useEffect(() => {
        let t;
        const onResize = () => {
            clearTimeout(t);
            t = setTimeout(() => setGrid(gridFor(spacing)), 120);
        };
        window.addEventListener('resize', onResize);
        return () => {
            clearTimeout(t);
            window.removeEventListener('resize', onResize);
        };
    }, [spacing]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const items = [...container.querySelectorAll('span')];
        const base = hexToRgb(baseColor);
        const active = hexToRgb(activeColor);
        let centers = [];
        let raf = 0;
        let pointer = null;

        const measure = () => {
            centers = items.map((el) => {
                const r = el.getBoundingClientRect();
                return [r.x + r.width / 2, r.y + r.height / 2];
            });
        };

        const paint = () => {
            raf = 0;
            if (!pointer) return;
            for (let i = 0; i < items.length; i++) {
                const dx = pointer.x - centers[i][0];
                const dy = pointer.y - centers[i][1];
                const dist = Math.sqrt(dx * dx + dy * dy);
                const k = dist < radius ? 1 - dist / radius : 0;
                const c = base.map((b, j) => Math.round(b + k * (active[j] - b)));
                items[i].style.backgroundColor = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
            }
        };

        const onMove = (e) => {
            pointer = { x: e.clientX, y: e.clientY };
            if (!raf) raf = requestAnimationFrame(paint);
        };

        // Dots step aside: any dot under an element marked data-dots-clear
        // fades out, and returns once that element scrolls past.
        let clearRaf = 0;
        const clear = () => {
            clearRaf = 0;
            // data-dots-clear="40" widens the clear zone to 40px around the element
            const rects = [...document.querySelectorAll('[data-dots-clear]')].map((el) => {
                const r = el.getBoundingClientRect();
                const pad = Number(el.dataset.dotsClear) || clearPad;
                return { left: r.left - pad, right: r.right + pad, top: r.top - pad, bottom: r.bottom + pad };
            });
            for (let i = 0; i < items.length; i++) {
                const [x, y] = centers[i];
                const hidden = rects.some(
                    (r) =>
                        x > r.left && x < r.right && y > r.top && y < r.bottom
                );
                items[i].style.opacity = hidden ? '0' : '1';
            }
        };
        const queueClear = () => {
            if (!clearRaf) clearRaf = requestAnimationFrame(clear);
        };
        const onResize = () => {
            measure();
            queueClear();
        };

        measure();
        clear();
        // content can shift after fonts and images load
        const settle = setTimeout(queueClear, 600);
        const ro = new ResizeObserver(queueClear);
        ro.observe(document.body);
        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('scroll', queueClear, { passive: true });
        window.addEventListener('resize', onResize);
        return () => {
            cancelAnimationFrame(raf);
            cancelAnimationFrame(clearRaf);
            clearTimeout(settle);
            ro.disconnect();
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('scroll', queueClear);
            window.removeEventListener('resize', onResize);
        };
    }, [grid, baseColor, activeColor, radius, clearPad]);

    const total = grid.cols * grid.rows;

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className={`magnet-dots-container ${className}`}
            style={{
                gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
                gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
                ...style,
            }}
        >
            {Array.from({ length: total }, (_, i) => (
                <span
                    key={i}
                    style={{ backgroundColor: baseColor, width: dotSize, height: dotSize }}
                />
            ))}
        </div>
    );
}
