/**
 * The hero sequence's canvas: a pile of receipts that reconciles itself as the
 * Orbis mark's satellite dot travels down it.
 *
 * Deliberately free of React and of the DOM beyond the one canvas it is handed,
 * so the component owns the scroll binding and this owns the picture. Nothing
 * here runs during server rendering — the component only calls it in an effect.
 *
 * The one rule the whole scene rests on: a receipt resolves *because* the dot
 * has passed over it. Nothing is on a timer. Drive `draw` with a progress value
 * and the picture is a pure function of that value, so scrolling back up
 * un-reconciles the pile exactly the way scrolling down reconciled it.
 */

/** Act boundaries in scroll progress. Retiming the story happens here. */
export const ACT = { mess: 0, arrive: 0.26, pass: 0.4, reveal: 0.82 } as const;

/** How far down the canvas the mark stands, as a fraction of height. */
const MARK_Y = 0.13;

const COUNT = 44;
/** How many survive the pass as reconciled ledger rows. */
const KEEP = 7;

const INK_2 = '#10140f';
const GREEN = '#6dc64f';

interface Receipt {
  cx: number;
  cy: number;
  rot: number;
  w: number;
  h: number;
  lines: number;
  drift: number;
  /** Row index once reconciled, or -1 for the ones that clear away. */
  slot: number;
}

export interface Scene {
  resize(): void;
  draw(progress: number): void;
}

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Seeded, so the mess is identical on every load and across resizes. A pile
 * that reshuffles when the window changes size reads as a rendering fault.
 */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function buildReceipts(): Receipt[] {
  const rand = seeded(20260730);
  const survivors: Record<number, boolean> = {};
  for (let k = 0; k < KEEP; k++) survivors[Math.floor(k * (COUNT / KEEP)) + 1] = true;

  const items: Receipt[] = [];
  for (let i = 0; i < COUNT; i++) {
    items.push({
      cx: 0.1 + rand() * 0.82,
      cy: MARK_Y + 0.05 + rand() * 0.74,
      rot: (rand() - 0.5) * 1.25,
      w: 0.1 + rand() * 0.055,
      h: 0.17 + rand() * 0.13,
      lines: 2 + Math.floor(rand() * 4),
      drift: (rand() - 0.5) * 0.5,
      slot: survivors[i] ? 0 : -1,
    });
  }

  // Rows have to stack in the order the dot reaches them, or the ledger
  // assembles out of sequence and the cause-and-effect stops reading.
  items
    .filter((it) => it.slot === 0)
    .sort((a, b) => a.cy - b.cy)
    .forEach((it, n) => {
      it.slot = n;
    });

  return items;
}

export function createScene(canvas: HTMLCanvasElement): Scene | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const items = buildReceipts();
  let w = 0;
  let h = 0;
  let dpr = 1;

  /*
   * The mark is composited from its own canvas. Painting its three circles
   * straight onto the scene under a globalAlpha makes the middle disc
   * translucent, so the crescent never cuts and the logo reads as a green blob.
   */
  const markCanvas = document.createElement('canvas');
  const markCtx = markCanvas.getContext('2d');
  let markSize = 0;

  function renderMark(radius: number) {
    if (!markCtx) return;
    const size = Math.ceil(radius * 2 + 4);
    markSize = size;
    markCanvas.width = Math.round(size * dpr);
    markCanvas.height = Math.round(size * dpr);
    markCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    markCtx.clearRect(0, 0, size, size);

    // Same geometry as components/Logo.tsx, scaled off the 40-unit viewBox.
    const c = size / 2;
    markCtx.beginPath();
    markCtx.arc(c, c, radius, 0, Math.PI * 2);
    markCtx.fillStyle = GREEN;
    markCtx.fill();
    // Cut the crescent instead of filling it with ink, so whatever sits behind
    // shows through exactly as the ink ground would.
    markCtx.globalCompositeOperation = 'destination-out';
    markCtx.beginPath();
    markCtx.arc(c + radius * 0.125, c, radius * 0.744, 0, Math.PI * 2);
    markCtx.fill();
    markCtx.globalCompositeOperation = 'source-over';
    markCtx.beginPath();
    markCtx.arc(c - radius * 0.62, c, radius * 0.228, 0, Math.PI * 2);
    markCtx.fillStyle = '#ffffff';
    markCtx.fill();
  }

  function roundRect(x: number, y: number, rw: number, rh: number, radius: number) {
    const d = Math.min(radius, rw / 2, rh / 2);
    ctx!.beginPath();
    ctx!.moveTo(x + d, y);
    ctx!.lineTo(x + rw - d, y);
    ctx!.quadraticCurveTo(x + rw, y, x + rw, y + d);
    ctx!.lineTo(x + rw, y + rh - d);
    ctx!.quadraticCurveTo(x + rw, y + rh, x + rw - d, y + rh);
    ctx!.lineTo(x + d, y + rh);
    ctx!.quadraticCurveTo(x, y + rh, x, y + rh - d);
    ctx!.lineTo(x, y + d);
    ctx!.quadraticCurveTo(x, y, x + d, y);
    ctx!.closePath();
  }

  function resize() {
    // Capped at 2: past that the extra pixels cost real frames on a phone and
    // buy nothing visible.
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    renderMark(Math.min(w, h) * 0.085);
  }

  function draw(progress: number) {
    if (!w || !h) return;
    ctx!.clearRect(0, 0, w, h);

    const rowH = Math.min(30, h * 0.062);
    const rowGap = rowH * 1.42;
    const rowW = Math.min(w * 0.84, 380);
    const rowX = (w - rowW) / 2;
    const stackTop = (h - (KEEP - 1) * rowGap - rowH) / 2;

    const arrive = clamp((progress - ACT.arrive) / (ACT.pass - ACT.arrive), 0, 1);
    const sweep = clamp((progress - ACT.pass) / (ACT.reveal - ACT.pass), 0, 1);
    /*
     * Sets off from exactly where the mark is standing, and travels at a
     * constant rate. An eased frontier put the dot at the foot of the pile by
     * roughly 45% of this act, so the pass — the part worth watching — was over
     * while a third of its scroll remained. Linear also reads more honestly
     * under a scrub the reader controls: the dot tracks the wheel.
     */
    const frontier = MARK_Y + sweep * 1.32;

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const lp = easeInOut(clamp((frontier - it.cy) / 0.24, 0, 1));
      let x: number;
      let y: number;
      let rw: number;
      let rh: number;
      let rot: number;
      let alpha: number;

      if (it.slot >= 0) {
        const toX = rowX + rowW / 2;
        const toY = stackTop + it.slot * rowGap + rowH / 2;
        x = lerp(it.cx * w, toX, lp);
        y = lerp(it.cy * h, toY, lp);
        rw = lerp(it.w * w, rowW, lp);
        rh = lerp(it.h * h, rowH, lp);
        rot = lerp(it.rot, 0, lp);
        alpha = 1;
      } else {
        x = it.cx * w + it.drift * w * lp * 0.55;
        y = it.cy * h + lp * h * 0.2;
        rw = it.w * w * (1 - lp * 0.35);
        rh = it.h * h * (1 - lp * 0.35);
        rot = it.rot * (1 - lp * 0.4);
        alpha = 1 - lp;
      }
      if (alpha <= 0.01) continue;

      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(rot);
      ctx!.globalAlpha = alpha;

      roundRect(-rw / 2, -rh / 2, rw, rh, 2);
      ctx!.fillStyle = INK_2;
      ctx!.fill();
      // Green marks finished work and nothing else, so the first act is
      // entirely neutral and the colour means something when it arrives.
      ctx!.strokeStyle =
        it.slot >= 0 && lp > 0
          ? `rgba(109,198,79,${0.22 + 0.3 * lp})`
          : 'rgba(243,244,239,.22)';
      ctx!.lineWidth = 1;
      ctx!.stroke();

      const pad = Math.max(6, rw * 0.055);
      if (it.slot >= 0 && lp > 0.55) {
        // Resolved: a description on the left, an amount on the right.
        const f = (lp - 0.55) / 0.45;
        ctx!.globalAlpha = alpha * f;
        ctx!.fillStyle = 'rgba(243,244,239,.62)';
        ctx!.fillRect(-rw / 2 + pad, -1.5, rw * 0.34, 3);
        ctx!.fillStyle = GREEN;
        ctx!.fillRect(rw / 2 - pad - rw * 0.13, -1.5, rw * 0.13, 3);
      } else {
        const step = rh / (it.lines + 1);
        ctx!.fillStyle = 'rgba(243,244,239,.34)';
        for (let j = 0; j < it.lines; j++) {
          ctx!.fillRect(
            -rw / 2 + pad,
            -rh / 2 + step * (j + 1) - 1,
            (rw - pad * 2) * (0.5 + ((i + j) % 4) * 0.13),
            2,
          );
        }
      }
      ctx!.restore();
    }

    // The mark arrives, then hands its dot over to the pass.
    const markAlpha = arrive * (1 - clamp(sweep / 0.12, 0, 1));
    if (markAlpha > 0.01 && markSize) {
      ctx!.save();
      ctx!.globalAlpha = markAlpha;
      ctx!.drawImage(
        markCanvas,
        w / 2 - markSize / 2,
        MARK_Y * h - markSize / 2,
        markSize,
        markSize,
      );
      ctx!.restore();
    }

    // The dot travelling, and the rule it draws across the pile.
    if (sweep > 0 && sweep < 1) {
      const fy = frontier * h;
      const edge = Math.min(sweep / 0.08, (1 - sweep) / 0.08, 1);
      ctx!.save();
      ctx!.globalAlpha = clamp(edge, 0, 1);
      ctx!.strokeStyle = 'rgba(109,198,79,.4)';
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(0, fy);
      ctx!.lineTo(w, fy);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.arc(w / 2, fy, Math.max(4, Math.min(w, h) * 0.0135), 0, Math.PI * 2);
      ctx!.fillStyle = '#ffffff';
      ctx!.fill();
      ctx!.restore();
    }

    // The ledger's baseline, once the pass is essentially done.
    const lineIn = clamp((sweep - 0.82) / 0.18, 0, 1);
    if (lineIn > 0) {
      ctx!.save();
      ctx!.globalAlpha = lineIn * 0.5;
      ctx!.strokeStyle = 'rgba(109,198,79,.35)';
      ctx!.lineWidth = 1;
      const by = stackTop + (KEEP - 1) * rowGap + rowH + rowH * 0.9;
      ctx!.beginPath();
      ctx!.moveTo(rowX, by);
      ctx!.lineTo(rowX + rowW * lineIn, by);
      ctx!.stroke();
      ctx!.restore();
    }

    ctx!.globalAlpha = 1;
  }

  return { resize, draw };
}
