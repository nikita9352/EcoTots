
# EcoTots — Static Shop (GitHub Pages)

Mobile‑friendly static website that lists products from `products.json`, lets customers order via WhatsApp, and pay via UPI.

- WhatsApp: `https://wa.me/919621146688`
- UPI handle: `nikita9352upi`
- UPI ID: `9621146688@upi`

## Quick start

1. **Create a new repo** on GitHub (e.g., `ecotots`).
2. Upload all files in this folder to the repo root.
3. Go to **Settings → Pages** → Source: *Deploy from a branch*, Branch: `main` (root).
4. Open your site: `https://<your-username>.github.io/<repo>/`.

## Update products from your phone

- Easiest: open `products.json` in GitHub app → Edit → Commit.
- Or use `admin.html` on your phone:
  1. Open `admin.html` in your browser.
  2. Optionally load current `products.json`.
  3. Add/update products with the form.
  4. Tap **Download products.json** and upload it to GitHub.

## File structure

```
/
├── index.html          # Main storefront (reads products.json)
├── products.json       # Your catalog (edit this!)
├── styles.css          # Theme styles
├── admin.html          # Local tool to maintain products.json
└── images/
    ├── logo.svg
    ├── bamboo_brush.svg
    ├── onesie.svg
    ├── teether.svg
    └── snack_pouch.svg
```

## Notes

- **WhatsApp** link uses `wa.me` with a prefilled message.
- **UPI** link uses `upi://pay` deep link; customers can adjust amount in their UPI app if needed.
- Everything is static: no server, no database.

---

© 2026 EcoTots
