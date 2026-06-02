const cors = require('cors');

const localOrigins = ['http://localhost:3000', 'http://localhost:3001'];

const configuredOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [...new Set([...localOrigins, ...configuredOrigins])];
const allowAllOrigins = configuredOrigins.includes('*');

const isAllowedOrigin = (origin) => {
  if (allowAllOrigins) return true;
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;

  // Allow Vercel preview/production URLs.
  if (/^https:\/\/.*\.vercel\.app$/.test(origin)) return true;

  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);
