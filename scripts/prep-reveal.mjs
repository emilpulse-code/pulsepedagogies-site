// One-off: strip fake checkerboard transparency from the reveal artwork and
// emit a 1400px alpha WebP at public/reveal-shatter.webp.
// Usage: node scripts/prep-reveal.mjs "<source image>"
import sharp from 'sharp';

const [src] = process.argv.slice(2);
if (!src) {
  console.error('Usage: node scripts/prep-reveal.mjs "<source image>"');
  process.exit(1);
}
const OUT = 'C:/Users/emila/pulasepedagogies-site/public/reveal-shatter.webp';

const {data, info} = await sharp(src).ensureAlpha().raw().toBuffer({resolveWithObject: true});
const {width: W, height: H} = info;

const px = (x, y) => (y * W + x) * 4;
const isBg = (i) => {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  return max - min < 22 && (r + g + b) / 3 > 165;
};

const mask = new Uint8Array(W * H);
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
  .resize({width: 1400, withoutEnlargement: true})
  .webp({quality: 85, alphaQuality: 92})
  .toFile(OUT);
console.log(`reveal-shatter.webp  ${(out.size / 1024).toFixed(0)} KB  ${W}x${H}`);
