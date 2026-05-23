// ── Allowed Origins ───────────────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",       // Vite dev server
  "http://localhost:3000",       // fallback CRA dev
  process.env.CLIENT_URL,        // production frontend URL
].filter(Boolean);

// ── CORS Options ──────────────────────────────────────────────────────────────
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} is not allowed`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Vault-Token"],
};

module.exports = corsOptions;
