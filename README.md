# Ecotots — Kids Thrift Store (Static Site)

This repository hosts a **static catalogue** for Ecotots on **GitHub Pages**. It shows products, your UPI ID + QR code for payments, and a WhatsApp order button. No backend, no databases.

## Live Site
After enabling GitHub Pages, your site will be live at:
`https://nikita9352.github.io/EcoTots`

## Setup (Desktop or Phone)
1. Create a **public** repo named `EcoTots`.
2. Upload these files:
   - `index.html`
   - `qr.png` (your UPI QR image)
   - `logo.png` (optional)
   - `images/` (product photos)
3. Go to **Settings → Pages** → **Build and deployment**:
   - Source: *Deploy from branch*
   - Branch: `main` / `master`
   - Folder: `/ (root)`
4. Wait ~1–2 minutes for deployment, then open your site.

## Update Products (Phone-Friendly)
- Use **Add file → Upload files** on GitHub to add new photos into `images/`.
- Edit `index.html` in the GitHub browser editor and **duplicate a product card** block.
- Commit changes → site updates automatically.

## Configure Your Details
Already pre-filled for you:
- UPI ID: `9621146688@upi`
- WhatsApp: `9621146688`
- Payee name (UPI deep link): `Ecotots`

Replace placeholders:
- `qr.png` with your actual UPI QR image.
- `logo.png` with your logo (optional).

## Notes
- This is a static site; orders are confirmed via WhatsApp.
- UPI deep link (`upi://pay?...`) opens supported UPI apps on mobile.
- For a custom domain, add it under **Settings → Pages** and set a DNS `CNAME` to `nikita9352.github.io`.
