# EcoTots Admin Bundle (Images + Products)

This bundle adds a **phone-friendly admin panel** that lets you:

1. **Upload product photos** straight into your repository `images/` folder using the GitHub REST **Contents API** (with your Personal Access Token).
2. **Compress photos on-device** before upload (fast on mobile; no server required).
3. **Edit and commit `products.json`** from the browser (with validation).
4. **Generate a ready-to-paste product card** and a **WhatsApp click-to-chat** link.
5. **Browse existing images** in `images/` via the API.

> ⚠️ **Security**: Do not hard-code your PAT into files. The admin page stores the PAT only in your browser's `localStorage`. Use a **fine‑grained PAT** limited to this repository with **Contents: Read & Write**. Revoke it immediately if you suspect exposure.

---

## Files

- `admin.html` — A self-contained admin page (HTML + CSS + JS) you can drop into the repository root.

---

## Quick Setup

1. **Add these files to your repo** (e.g., `EcoTots/` at the root). If you already have an `admin.html`, rename your existing one first.
2. **Commit and push** (or upload via GitHub web UI). After GitHub Pages deploys, open:
   
   ```
   https://<your-username>.github.io/<your-repo>/admin.html
   ```

3. In the **Admin → Sign in** panel, paste your **PAT** and click **Save**.
4. Use **Upload Photo** to capture/choose a file → **Upload to images/**.
5. Use **Products.json** to load, edit, validate, and commit catalog changes.

---

## Configuration inside `admin.html`

At the top of the script you’ll find:

```js
const OWNER  = '<YOUR_GITHUB_USERNAME>';
const REPO   = '<YOUR_REPO_NAME>';   // e.g., 'EcoTots'
const BRANCH = 'main';                // or 'master'
const WHATSAPP_NUMBER = '';           // Optional, international format without + (e.g., '919621146688')
```

- Set these values to match your repo.
- If you set `WHATSAPP_NUMBER`, the prefilled **Order on WhatsApp** links will open a chat to that number; otherwise the user will choose a contact.

---

## Notes & Limits

- **GitHub Contents API** requires file content as **Base64** and a `sha` when updating existing files. (Same endpoint you use for `products.json`.)
- File size: GitHub warns over 50 MB and rejects files ≥ 100 MB; keep images well below that (the admin compresses to JPEG by default).
- **Camera hint**: `<input type="file" accept="image/*" capture="environment">` opens the phone’s rear camera on most mobile browsers; on desktop, a file picker opens.
- **GitHub Pages path** for images is `https://<user>.github.io/<repo>/images/<file>`.

---

## References
- GitHub REST — **Repository Contents** (create/update file): https://docs.github.com/en/rest/repos/contents
- GitHub REST — General docs & best practices: https://docs.github.com/en/rest
- MDN — `capture` attribute for mobile camera input: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/capture
- WhatsApp Click‑to‑Chat `wa.me` format: https://stackoverflow.com/questions/29218378/mobile-website-whatsapp-button-to-send-message-to-a-specific-number

