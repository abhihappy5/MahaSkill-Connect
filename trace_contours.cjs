const fs = require('fs');
const zlib = require('zlib');

function parsePNG(filePath) {
  const buf = fs.readFileSync(filePath);
  let pos = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0;
  const idatChunks = [];

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    pos += 12 + len;

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') {
      break;
    }
  }

  const uncompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const bytesPerPixel = (colorType === 6) ? 4 : 3;
  const scanlineLen = 1 + width * bytesPerPixel;
  const rgba = Buffer.alloc(width * height * 4);
  let prevScanline = Buffer.alloc(width * bytesPerPixel);

  for (let y = 0; y < height; y++) {
    const scanlineOffset = y * scanlineLen;
    const filterType = uncompressed[scanlineOffset];
    const currentScanline = Buffer.alloc(width * bytesPerPixel);

    for (let x = 0; x < width * bytesPerPixel; x++) {
      const raw = uncompressed[scanlineOffset + 1 + x];
      let left = (x >= bytesPerPixel) ? currentScanline[x - bytesPerPixel] : 0;
      let above = prevScanline[x];
      let upperLeft = (x >= bytesPerPixel) ? prevScanline[x - bytesPerPixel] : 0;
      let val = raw;

      if (filterType === 1) val = (raw + left) & 0xff;
      else if (filterType === 2) val = (raw + above) & 0xff;
      else if (filterType === 3) val = (raw + Math.floor((left + above) / 2)) & 0xff;
      else if (filterType === 4) {
        const p = left + above - upperLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - above);
        const pc = Math.abs(p - upperLeft);
        let pr = upperLeft;
        if (pa <= pb && pa <= pc) pr = left;
        else if (pb <= pc) pr = above;
        val = (raw + pr) & 0xff;
      }
      currentScanline[x] = val;
    }
    prevScanline = currentScanline;

    for (let x = 0; x < width; x++) {
      const srcIdx = x * bytesPerPixel;
      const dstIdx = (y * width + x) * 4;
      rgba[dstIdx] = currentScanline[srcIdx];
      rgba[dstIdx + 1] = currentScanline[srcIdx + 1];
      rgba[dstIdx + 2] = currentScanline[srcIdx + 2];
      rgba[dstIdx + 3] = (bytesPerPixel === 4) ? currentScanline[srcIdx + 3] : 255;
    }
  }
  return { width, height, rgba };
}

const { width, height, rgba } = parsePNG('public/maharashtra_map.png');

// Exclude legend area (x > 690 && y > 480)
function getPixelRegion(x, y) {
  if (x > 690 && y > 470) return null; // Legend
  const idx = (y * width + x) * 4;
  const r = rgba[idx], g = rgba[idx + 1], b = rgba[idx + 2];
  
  // Konkan (Slate grey): R:130..180, G:120..170, B:110..160, max diff < 30
  if (Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && r >= 120 && r <= 190 && x < 300) {
    return 'konkan';
  }
  // Pune (Green): G is distinctly higher than R and B
  if (g > r + 20 && g > b + 20 && g > 140 && x < 540 && y > 300) {
    return 'pune';
  }
  // Nashik (Yellow): R and G are both high (>190), B is low (<160)
  if (r > 190 && g > 180 && b < 160 && x < 500 && y < 500) {
    return 'nashik';
  }
  // Aurangabad (Lavender Blue): B is distinctly highest
  if (b > r + 30 && b > g + 20 && b > 180) {
    return 'marathwada';
  }
  // Amravati (Rose Pink): R is distinctly highest (>190), G ~ 120..180, B ~ 120..180
  if (r > 190 && g > 110 && g < 185 && b > 110 && b < 185 && x > 440 && x < 820 && y < 350) {
    return 'amravati';
  }
  // Nagpur (Tan / Ochre): R > 190, G ~ 140..195, B ~ 90..160
  if (r > 180 && g > 130 && g < 190 && b > 80 && b < 155 && x > 580) {
    return 'nagpur';
  }
  return null;
}

// Find convex / boundary polygon per region
const regions = ['konkan', 'pune', 'nashik', 'marathwada', 'amravati', 'nagpur'];
const regionGrids = {};
regions.forEach(r => regionGrids[r] = new Uint8Array(width * height));

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const reg = getPixelRegion(x, y);
    if (reg) {
      regionGrids[reg][y * width + x] = 1;
    }
  }
}

// For each region, find the outer boundary points and simplify
function getSimplifiedOutline(reg) {
  const grid = regionGrids[reg];
  const step = 8;
  const outline = [];

  // Scan top to bottom, left-most and right-most
  const leftEdge = [];
  const rightEdge = [];

  for (let y = 10; y < height - 10; y += step) {
    let minX = -1, maxX = -1;
    for (let x = 0; x < width; x += 2) {
      if (grid[y * width + x]) {
        if (minX === -1) minX = x;
        maxX = x;
      }
    }
    if (minX !== -1) {
      leftEdge.push([minX, y]);
      rightEdge.push([maxX, y]);
    }
  }

  // Combine into clockwise polygon
  rightEdge.reverse();
  const fullPoly = leftEdge.concat(rightEdge);
  
  // Simplify points
  const simplified = [];
  for (let i = 0; i < fullPoly.length; i += 2) {
    simplified.push(fullPoly[i]);
  }
  return simplified;
}

const svgPaths = {};
regions.forEach(r => {
  const pts = getSimplifiedOutline(r);
  if (pts.length > 0) {
    const d = 'M ' + pts.map(p => `${p[0]} ${p[1]}`).join(' L ') + ' Z';
    svgPaths[r] = d;
  }
});

console.log('SVG Paths:');
console.log(JSON.stringify(svgPaths, null, 2));
