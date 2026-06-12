// Remove baked-in "fake transparency" (checkerboard/light bg) from the CPQ
// mockup: flood-fill light, low-saturation pixels from the image border and
// turn them into real alpha. The dark tablet bezel bounds the fill, so white
// UI inside the screen is never reached.
import sharp from 'sharp';

const SRC = 'C:/Users/emila/Downloads/ChatGPT Image Jun 11, 2026, 09_57_17 PM.png';
const OUT = 'C:/Users/emila/pulasepedagogies-site/public/pipeline/cpq.webp';

const {data, info} = await sharp(SRC).ensureAlpha().raw().toBuffer({resolveWithObject: true});
const {width: W, height: H} = info;

const px = (x, y) => (y * W + x) * 4;
const isBg = (i) => {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  return max - min < 22 && (r + g + b) / 3 > 165; // light + near-gray (checker squares / white)
};

// Log corners + a couple of interior samples for sanity
for (const [x, y, label] of [[2, 2, 'top-left'], [W - 3, 2, 'top-right'], [40, 40, '40,40'], [Math.floor(W / 2), Math.floor(H / 2), 'center']]) {
  const i = px(x, y);
  console.log(`${label}: rgb(${data[i]},${data[i + 1]},${data[i + 2]}) a=${data[i + 3]} bg=${isBg(i)}`);
}

// BFS flood fill from every border pixel
const mask = new Uint8Array(W * H); // 1 = background
const qx = new Int32Array(W * H);
const qy = new Int32Array(W * H);
let head = 0, tail = 0;
const push = (x, y) => {
  const idx = y * W + x;
  if (mask[idx] || !isBg(px(x, y))) return;
  mask[idx] = 1;
  qx[tail] = x; qy[tail] = y; tail++;
};
for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1); }
for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
while (head < tail) {
  const x = qx[head], y = qy[head]; head++;
  if (x > 0) push(x - 1, y);
  if (x < W - 1) push(x + 1, y);
  if (y > 0) push(x, y - 1);
  if (y < H - 1) push(x, y + 1);
}

// Apply: background -> alpha 0; soften the 1px boundary ring
let cleared = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = y * W + x;
    if (mask[idx]) {
      data[px(x, y) + 3] = 0;
      cleared++;
    } else {
      const nearBg =
        (x > 0 && mask[idx - 1]) || (x < W - 1 && mask[idx + 1]) ||
        (y > 0 && mask[idx - W]) || (y < H - 1 && mask[idx + W]);
      if (nearBg) data[px(x, y) + 3] = Math.min(data[px(x, y) + 3], 140);
    }
  }
}
console.log(`cleared ${cleared} of ${W * H} px (${((cleared / (W * H)) * 100).toFixed(1)}%)`);

const out = await sharp(data, {raw: {width: W, height: H, channels: 4}})
  .resize({width: 900, withoutEnlargement: true})
  .webp({quality: 82, alphaQuality: 90})
  .toFile(OUT);
console.log(`cpq.webp  ${(out.size / 1024).toFixed(0)} KB`);
