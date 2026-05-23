const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

// ── PrismaClient Singleton ──────────────────────────────────────────────────
// Prevents multiple PrismaClient instances during development (hot reload)
// In Node.js we connect to Neon using the standard pooled connection string.
// The @prisma/adapter-neon is only needed for edge/serverless runtimes.
const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL, // Pooled connection string from Neon
      },
    },
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
