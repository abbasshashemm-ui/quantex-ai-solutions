#!/usr/bin/env python3
"""
Generates the etched-glyph backgrounds in public/bg/.

A field of Quantex's own words in small monospace type, like text laser-etched
into aluminium. In the hero version the glyphs are brightest along the nested
triangles of the Quantex mark, so the mark emerges from the type.
Run: python3 scripts/make-glyph-bg.py
"""
import math
import random
from PIL import Image, ImageDraw, ImageFont

FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
SIZE = 13
CELL_W, CELL_H = 8, 16
WORDS = [
    "QUANTEX", "AUTOMATE", "SCALE", "DOMINATE", "WEBSITES", "ASSISTANTS", "SEO",
    "BEIRUT", "AI", "WHATSAPP", "OWN", "BUILD", "LAUNCH", "PLAN", "SUPPORT",
    "0", "1", "24H", "10+", "→", "▲", "△", "//", "{ }", "[ ]", "::", "=>", "01", "02", "03", "04",
]
# colour, and how strong the type is on that theme
THEMES = {"light": ((20, 24, 32), 0.55), "dark": ((238, 240, 244), 0.7)}


def text_stream(rng, n):
    out = []
    while sum(len(w) + 1 for w in out) < n:
        out.append(rng.choice(WORDS))
    return " ".join(out)


def triangle_rings(count=17, t=0.078):
    tri = [(math.cos(a), math.sin(a)) for a in (math.pi / 2, -math.pi / 6, -5 * math.pi / 6)]
    rings = []
    for _ in range(count):
        rings.append(tri)
        tri = [
            (v[0] + (tri[(k + 1) % 3][0] - v[0]) * t, v[1] + (tri[(k + 1) % 3][1] - v[1]) * t)
            for k, v in enumerate(tri)
        ]
    return rings


def seg_dist(px, py, ax, ay, bx, by):
    dx, dy = bx - ax, by - ay
    u = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    return math.hypot(px - (ax + u * dx), py - (ay + u * dy))


def render(path, width, height, color, strength, mark, seed):
    rng = random.Random(seed)
    font = ImageFont.truetype(FONT, SIZE)
    cols, rows = width // CELL_W, height // CELL_H
    stream = text_stream(rng, cols * rows)
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    rings = triangle_rings() if mark else []
    cx, cy, radius = width * 0.74, height * 0.50, height * 0.58
    for r in range(rows):
        for c in range(cols):
            ch = stream[(r * cols + c) % len(stream)]
            if ch == " ":
                continue
            x, y = c * CELL_W, r * CELL_H
            alpha = 0.05 + rng.random() * 0.04
            if mark:
                px, py = (x - cx) / radius, -(y - cy) / radius
                d = min(
                    seg_dist(px, py, a[0], a[1], b[0], b[1])
                    for tri in rings
                    for a, b in zip(tri, tri[1:] + tri[:1])
                )
                alpha += 0.50 * math.exp(-((d / 0.022) ** 2))
                # keep the left side calm, behind the headline
                alpha *= min(1.0, max(0.0, (x / width - 0.12) / 0.38))
                # fade out toward the top, bottom and right edges
                edge = min(y / (height * 0.18), (height - y) / (height * 0.18), (width - x) / (width * 0.14), 1.0)
                alpha *= max(0.0, edge)
            if alpha < 0.02:
                continue
            draw.text((x, y), ch, font=font, fill=color + (int(min(alpha * strength, 0.5) * 255),))
    img.save(path, "WEBP", quality=58, method=6)
    print(path, img.size)


if __name__ == "__main__":
    for name, (color, strength) in THEMES.items():
        render(f"public/bg/glyphs-hero-{name}.webp", 1600, 960, color, strength, True, 7)
        render(f"public/bg/glyphs-field-{name}.webp", 960, 640, color, strength, False, 11)
