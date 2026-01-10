# EcoTots — Static Shop (v2)

Mobile‑friendly catalog with **multiple images per item**, features list, condition, online link, price, pickup address, contact, plus WhatsApp ordering and UPI payment.

- WhatsApp: https://wa.me/919621146688
- UPI ID: 9621146688@upi

## Publish (GitHub Pages)
1. Create a public repo (e.g., `ecotots`).
2. Upload all files from this folder to the repo root.
3. Settings → Pages → Deploy from a branch → main → /(root).
4. Open: https://nikita9352.github.io/ecotots/

## Edit catalog from mobile
- Open `products.json` in the GitHub app → Edit → Commit.
- Or open `admin.html` in your browser → Load current `products.json` → Add/Update → Download → Upload to GitHub.

## products.json schema
```
[
  {
    "id": "eco101",
    "name": "Item Name",
    "images": ["images/img1.jpg", "images/img2.jpg"],
    "features": ["Feature 1", "Feature 2"],
    "condition": "Brand New | Like New | Used",
    "link": "https://example.com/item",
    "price": 699,
    "pickup": "Area, City",
    "contact": "+91 9621146688"
  }
]
```
