
/**
 * Import product from GitHub Issue (Issue Forms) into:
 * - images/products/<issue_number>/* (downloaded attachments)
 * - data/products.json (append or update record)
 *
 * Runs in GitHub Actions. No external deps.
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function readJSON(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return fallback; }
}

function sanitizeSlug(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

// Extract "### Field" blocks and attachment URLs from issue body
function parseIssueBody(md) {
  const fields = {};
  // Sections: ### Title\nvalue\n### Next...
  const re = /(?:^|\n)#{3,}\s+([^\n]+)\n+([\s\S]*?)(?=\n#{3,}|\s*$)/g;
  let m;
  while ((m = re.exec(md)) !== null) {
    const key = m[1].trim().toLowerCase();
    const val = m[2].trim();
    fields[key] = val;
  }

  // Collect all URLs that look like attachments
  const urls = [];
  const urlRe = /https?:\/\/(?:user-images\.githubusercontent\.com|github\.com\/user-attachments\/assets)\/[^\s)]+/gi;
  let um;
  while ((um = urlRe.exec(md)) !== null) {
    urls.push(um[0]);
  }

  // Normalize common keys
  const norm = (k) => (k || '').toLowerCase().trim();
  const out = {
    title: fields[norm('title')] || '',
    price: fields[norm('price (₹)')] || fields[norm('price')] || '',
    size: fields[norm('size')] || '',
    condition: fields[norm('condition')] || '',
    description: fields[norm('description')] || '',
    phone: fields[norm('whatsapp number')] || '',
    upi: fields[norm('upi id')] || '',
    published: (() => {
      const v = (fields[norm('publish now?')] || '').toLowerCase();
      if (v.includes('no')) return false;
      if (v.includes('yes')) return true;
      return true; // default
    })(),
    attachmentUrls: urls
  };
  return out;
}

function extFromUrl(u) {
  const q = u.split('?')[0];
  const m = q.match(/\.(jpe?g|png|webp|gif)$/i);
  return m ? '.' + m[1].toLowerCase() : '.jpg';
}

function download(url, dest) {
  // Use curl -L to follow redirects
  const r = spawnSync('curl', ['-L', url, '-o', dest], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error(`Failed to download ${url}`);
}

(function main() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) throw new Error('GITHUB_EVENT_PATH not set');
  const event = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
  const issue = event.issue;
  if (!issue) throw new Error('Not an issue event');

  const body = issue.body || '';
  const parsed = parseIssueBody(body);

  // Derive publish flag from labels (optional Draft label)
  const labels = (issue.labels || []).map(l => (typeof l === 'string' ? l : l.name));
  const isDraft = labels.some(l => String(l).toLowerCase() === 'draft');
  let published = parsed.published && !isDraft;

  // If issue is closed, mark unpublished
  if (event.action === 'closed') {
    published = false;
  }

  const id = String(issue.number);
  const createdAt = issue.created_at || new Date().toISOString();
  const title = parsed.title || (issue.title || '').replace(/^\[Product\]\s*/i, '');
  const slug = sanitizeSlug(title || `product-${id}`);

  // Prepare images folder
  const productDir = path.join('images', 'products', id);
  ensureDir(productDir);

  // Download attachments (Photos)
  const imagePaths = [];
  parsed.attachmentUrls.forEach((u, i) => {
    const ext = extFromUrl(u);
    const filename = `${String(i + 1).padStart(2, '0')}${ext}`;
    const dest = path.join(productDir, filename);
    try {
      download(u, dest);
      imagePaths.push(dest.replace(/\\/g, '/'));
    } catch (e) {
      console.error('Download failed:', u, e.message);
    }
  });

  // Load existing catalog
  ensureDir('data');
  const catalogPath = path.join('data', 'products.json');
  const products = readJSON(catalogPath, []);

  const product = {
    id,
    slug,
    created_at: createdAt,
    title: title || '',
    price: parsed.price || '',
    size: parsed.size || '',
    condition: parsed.condition || '',
    description: parsed.description || '',
    phone: parsed.phone || '9621146688',
    upi: parsed.upi || '9621146688@upi',
    image_urls: imagePaths,
    published
  };

  // Upsert by id
  const idx = products.findIndex(p => p.id === id);
  if (idx >= 0) products[idx] = { ...products[idx], ...product };
  else products.push(product);

  // Sort newest first
  products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  fs.writeFileSync(catalogPath, JSON.stringify(products, null, 2));
  console.log(`Imported product #${id}: ${product.title} (${imagePaths.length} image(s))`);
})();
