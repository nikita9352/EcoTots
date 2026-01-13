# EcoTots – Static, Mobile‑First Product Catalog

A zero-backend, JSON‑driven catalog you can manage entirely from your phone. Add/remove products by editing `data/products.json` and uploading images into `/images/…`. Orders go via WhatsApp; payments via UPI deep link.

---

## ✨ Features
- **EcoTots branding** with custom **logo** and **favicon** included (`/assets`).
- **Global pickup info**: Reliaable Acacia, Bangalore + Google Maps link.
- **Per‑product CTAs**: UPI payment + WhatsApp **Order** (auto‑filled).
- **Site‑wide WhatsApp** for general queries (floating button + header).
- **SOLD state**: badge, disables Order/UPI, offers **Ask for similar products**.
- **No item IDs anywhere** (UI/messages/data).
- **GitHub Pages** deployment via Actions. No servers.

---

## 📁 Repo Structure
```
/ (root)
├─ index.html
├─ /src/               # CSS & JS
├─ /data/products.json # Your editable products
├─ /images/<auto-slug-from-title>/
├─ /assets/            # logo.svg, favicon.ico, PWA icons, manifest.json
├─ README.md
└─ .github/workflows/deploy.yml
```

---

## 🚀 1) One‑time setup (on your phone)
1. **Create a new repo** on GitHub (e.g., `ecotots-catalog`).
2. In the **GitHub mobile app** or web:
   - Tap **Add file ▸ Upload files** and upload **everything** from this folder.
   - Commit to the **`main`** branch.
3. Go to **Settings ▸ Pages** → **Build and deployment**: select **GitHub Actions**.
4. Open the **Actions** tab. You should see **“Deploy EcoTots to GitHub Pages”** running. When it completes, the **Pages URL** appears.

> This workflow uses GitHub’s official **Pages** actions (`upload-pages-artifact@v3` and `deploy-pages@v4`). No extra configuration is needed.

---

## 🛠 2) Manage products from your phone
### Add a new product
1. In GitHub, open **`data/products.json` ▸ Edit**.
2. Paste a new object using this schema **(no `id`)**:
```json
{
  "title": "Bamboo Bottle – 500ml",
  "description": "Eco-friendly bamboo exterior with stainless-steel inner.",
  "features": ["Leak-proof", "BPA-free", "Insulated"],
  "condition": "new",
  "online_link": "https://example.com/bamboo-bottle-500ml",
  "price": 599,
  "currency": "INR",
  "status": "available",
  "images": [
    "images/bamboo-bottle-500ml/1.jpg",
    "images/bamboo-bottle-500ml/2.jpg"
  ],
  "tags": ["bottle", "eco", "kids"]
}
```
3. **Upload images**: Tap **Add file ▸ Upload files** and place photos under `/images/<slug>/`.
   - Example: `/images/bamboo-bottle-500ml/1.jpg`
4. Commit. The site redeploys automatically (~30–60s).

### Mark as SOLD
- In `data/products.json`, set `"status": "sold"`. The UI disables UPI/Order and shows **Ask for similar products**.

### Edit or remove
- Edit product fields or delete an object from the JSON. Commit to redeploy.

> Tip: Keep **two images max** for quick mobile data. Larger photos are supported but may load slower.

---

## 🔗 Button behaviors
- **UPI**: `upi://pay?pa=9621146688@upi&pn=Nikita%20Agrawal&cu=INR&am={price}&tn=EcoTots%20–%20{title}`
- **Per‑product WhatsApp Order** (auto‑filled):
```
Hello EcoTots! 👋
I’d like to order: {title}
Condition: {condition}
Price: ₹{price}
Online link: {online_link}
Pickup location: Reliaable Acacia, Bangalore
Maps: https://maps.app.goo.gl/g7dsYFs32bgio1bz7
Key features: {first-2-features}
Please confirm availability and UPI payment details (9621146688@upi).
```
- **Site‑wide WhatsApp (General queries)**: `Hello EcoTots! I have a general question about your products.`
- **SOLD → Ask for similar**: `Hi EcoTots, I’m looking for something similar to: {title}. Any recommendations?`

All WhatsApp links use `https://wa.me/919621146688?text=...` and are **URL‑encoded** automatically.

---

## 🧪 Local preview (optional)
If you have a laptop, you can open `index.html` directly or serve the folder with any static server. For phone‑only workflows, just commit and wait for GitHub Pages.

---

## 📜 License
This template is provided as‑is for your EcoTots catalog. Images in `/images` are placeholder renders.
