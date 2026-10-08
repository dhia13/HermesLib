# HermesLib

Book library app: a Next.js frontend and an Express + MongoDB API for books,
authors, users and reviews.

```
HermesLib/
├── client/   # Next.js frontend (Tailwind, Material Tailwind)
├── server/   # Express + MongoDB API used by the client (current version)
└── api-v1/   # Earlier standalone API (formerly the HermesLibApi repo), kept for reference
```

## Getting started

### Server

```bash
cd server
cp .env.example .env   # CONNECTION_URL, PORT, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET
npm install
npm run server         # nodemon
```

### Client

```bash
cd client
npm install
npm run client         # next dev, http://localhost:3000
```

To run both at once: `cd client && npm run dev`.

### api-v1 (old API)

```bash
cd api-v1
cp .env.example .env
npm install
npm start
```

It has author and review controllers that the current `server/` doesn't have.
