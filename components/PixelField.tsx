"use client";
// Adapted from https://github.com/danielroe/forges, MIT.
import { useEffect, useRef } from "react";
export function PixelField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    interface Pixel {
      x: number;
      y: number;
      born: number;
      life: number;
      alpha: number;
      color: number;
    }

    const CELL = 8;
    const MAX_PIXELS = 900;

    let ctx: CanvasRenderingContext2D | null = null;
    let cols = 0;
    let rows = 0;
    let pixels: Pixel[] = [];
    let colors: string[] = [];
    let frame = 0;
    let lastMove = 0;
    let observer: ResizeObserver | undefined;

    function resize() {
      const el = canvas.current;
      if (!el) {
        return;
      }
      const { width, height } = el.getBoundingClientRect();
      cols = Math.max(1, Math.ceil(width / CELL));
      rows = Math.max(1, Math.ceil(height / CELL));
      el.width = cols;
      el.height = rows;
    }

    function readColors() {
      colors =
        getComputedStyle(document.documentElement).colorScheme === "dark"
          ? ["#fb923c", "#fb923c", "#fb7185"]
          : ["#c2410c", "#c2410c", "#f43f5e"];
    }

    function cellAt(clientX: number, clientY: number) {
      const rect = canvas.current?.getBoundingClientRect();
      if (
        !rect ||
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return undefined;
      }
      return {
        x: Math.floor(((clientX - rect.left) / rect.width) * cols),
        y: Math.floor(((clientY - rect.top) / rect.height) * rows),
      };
    }

    function survives(y: number) {
      const t = Math.min(1, Math.max(0, (y / rows - 0.45) / 0.55));
      return Math.random() >= t * t * (3 - 2 * t);
    }

    function add(added: Pixel[]) {
      pixels = [...pixels, ...added.filter((pixel) => survives(pixel.y))].slice(-MAX_PIXELS);
      if (!frame) {
        frame = requestAnimationFrame(draw);
      }
    }

    function trail(x: number, y: number) {
      const now = performance.now();
      const added: Pixel[] = [];
      for (let dy = -3; dy <= 3; dy++) {
        for (let dx = -3; dx <= 3; dx++) {
          const reach = 1 - Math.hypot(dx, dy) / 3.6;
          if (reach > 0 && Math.random() < reach * 0.16) {
            added.push({
              x: x + dx,
              y: y + dy,
              born: now,
              life: 500 + Math.random() * 600,
              alpha: 0.12 + Math.random() * 0.14,
              color: 0,
            });
          }
        }
      }
      add(added);
    }

    function burst(x: number, y: number) {
      const now = performance.now();
      const radius = 20;
      const added: Pixel[] = [];
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const distance = Math.hypot(dx, dy) / radius;
          if (distance > 1 || Math.random() > 0.3 * (1 - distance) ** 0.8) {
            continue;
          }
          added.push({
            x: x + dx,
            y: y + dy,
            born: now + distance * 650 + Math.random() * 160,
            life: 450 + Math.random() * 700,
            alpha: 0.3 + Math.random() * 0.3,
            color: 1 + Math.floor(Math.random() * 2),
          });
        }
      }
      add(added);
    }

    function draw(now: number) {
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, cols, rows);
      pixels = pixels.filter((pixel) => now < pixel.born + pixel.life);

      for (const pixel of pixels) {
        if (now < pixel.born) {
          continue;
        }
        const alpha = (Math.round((1 - (now - pixel.born) / pixel.life) * 4) / 4) * pixel.alpha;
        if (alpha > 0) {
          ctx.globalAlpha = alpha;
          ctx.fillStyle = colors[pixel.color] ?? "#f97316";
          ctx.fillRect(pixel.x, pixel.y, 1, 1);
        }
      }

      ctx.globalAlpha = 1;
      frame = pixels.length ? requestAnimationFrame(draw) : 0;
    }

    function onMove(event: PointerEvent) {
      const now = performance.now();
      const cell = cellAt(event.clientX, event.clientY);
      if (cell && now - lastMove > 32) {
        lastMove = now;
        readColors();
        trail(cell.x, cell.y);
      }
    }

    function onDown(event: PointerEvent) {
      const cell = cellAt(event.clientX, event.clientY);
      if (cell) {
        readColors();
        burst(cell.x, cell.y);
      }
    }

    const el = canvas.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    ctx = el.getContext("2d");
    resize();
    readColors();
    observer = new ResizeObserver(resize);
    observer.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  return <canvas ref={canvas} className="pixel-field" aria-hidden="true" />;
}
