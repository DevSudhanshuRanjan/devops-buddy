# DevOps Buddy — Backend API

REST API for the DevOps Buddy e-learning platform.

## Stack

- **Runtime:** Node.js + Express
- **Database:** MongoDB Atlas + Mongoose
- **Auth:** Google OAuth 2.0 + Passport.js + JWT
- **Deployment:** Vercel Serverless Functions

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Fill in your values in .env

# Run in development mode
npm run dev

# Run tests
npm test
```

## API Documentation

Once running, visit: `http://localhost:5000/api-docs`

## Environment Variables

See `.env.example` for the full list of required environment variables.
