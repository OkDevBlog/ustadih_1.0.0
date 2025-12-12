# Ustadih Frontend

Minimal React frontend (Vite) for interacting with the Ustadih backend.

Run locally:

```bash
cd frontend
python -m http.server  # optional: static server for simple hosting
# Install deps
npm install
npm run dev
```

The app expects the backend at `http://localhost:8000` by default. To change, set `VITE_API_BASE` in your environment.
