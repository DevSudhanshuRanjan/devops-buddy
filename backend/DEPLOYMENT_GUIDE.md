# DevOps Buddy — Backend Deployment Guide

> **Complete step-by-step guide** to deploy the DevOps Buddy backend API from zero to production. This document covers every procedure — from setting up cloud services to configuring environment variables, deploying to Vercel, and verifying that everything works.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [MongoDB Atlas Setup](#2-mongodb-atlas-setup)
3. [Google OAuth 2.0 Credentials Setup](#3-google-oauth-20-credentials-setup)
4. [Local Development Setup](#4-local-development-setup)
5. [Deploying to Vercel](#5-deploying-to-vercel)
6. [Setting Environment Variables on Vercel](#6-setting-environment-variables-on-vercel)
7. [Post-Deployment Configuration](#7-post-deployment-configuration)
8. [Production Smoke Test](#8-production-smoke-test)
9. [Troubleshooting](#9-troubleshooting)
10. [Environment Variables Reference](#10-environment-variables-reference)
11. [API Endpoints Reference](#11-api-endpoints-reference)

---

## 1. Prerequisites

Before you begin, make sure you have the following:

| Requirement | Description |
|---|---|
| **Node.js** | Version 18 or higher installed on your machine. Download from [nodejs.org](https://nodejs.org/) |
| **npm** | Comes bundled with Node.js. Verify with `npm --version` |
| **Git** | Version control. Verify with `git --version` |
| **GitHub Account** | Repository is hosted at `github.com/DevSudhanshuRanjan/devops-buddy` |
| **MongoDB Atlas Account** | Free tier available at [mongodb.com/atlas](https://www.mongodb.com/atlas) |
| **Google Cloud Account** | Free at [console.cloud.google.com](https://console.cloud.google.com) |
| **Vercel Account** | Free tier available at [vercel.com](https://vercel.com). Sign up with your GitHub account for easy integration |

---

## 2. MongoDB Atlas Setup

MongoDB Atlas is the cloud-hosted database that stores all user data, progress, and quiz results.

### Step 2.1 — Create an Atlas Account

1. Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Click **"Try Free"** and sign up (you can use Google sign-in)
3. Choose the **FREE Shared Cluster** (M0 tier — completely free, no credit card required)

### Step 2.2 — Create a New Project

1. In the Atlas dashboard, click **"New Project"**
2. Name it: **`DevOps Buddy`**
3. Click **"Create Project"**

### Step 2.3 — Create a Database Cluster

1. Click **"Build a Database"**
2. Select **"M0 FREE"** tier
3. Choose a cloud provider and region closest to you:
   - Recommended: **AWS → Mumbai (ap-south-1)** or **US East (us-east-1)**
4. Cluster name: **`Cluster0`** (default is fine)
5. Click **"Create Cluster"** — this takes 1-3 minutes

### Step 2.4 — Create a Database User

1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `devopsbuddy_admin` (or any username you prefer)
5. Password: Click **"Auto Generate Secure Password"** → **COPY THIS PASSWORD AND SAVE IT SOMEWHERE SAFE**
6. Database User Privileges: Select **"Read and write to any database"**
7. Click **"Add User"**

### Step 2.5 — Configure Network Access (IP Whitelist)

1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** → this sets the IP to `0.0.0.0/0`
   - **Why?** Vercel uses dynamic IPs for serverless functions, so we must allow all IPs
   - For extra security in production, you can use [Vercel's IP ranges](https://vercel.com/docs/security/secure-backend-access) instead
4. Click **"Confirm"**

### Step 2.6 — Get the Connection String

1. Go to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Select **"Connect your application"** (or "Drivers")
4. Driver: **Node.js** | Version: **6.0 or later**
5. Copy the connection string. It will look like:
   ```
   mongodb+srv://devopsbuddy_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Replace `<password>`** with the password you saved in Step 2.4
7. **Add the database name** after the host. Your final URI should look like:
   ```
   mongodb+srv://devopsbuddy_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/devopsbuddy?retryWrites=true&w=majority
   ```

> **⚠️ IMPORTANT:** Never commit this URI to your code. It goes only in environment variables.

---

## 3. Google OAuth 2.0 Credentials Setup

Google OAuth allows users to log in with their Google account.

### Step 3.1 — Create a Google Cloud Project

1. Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. Click the project dropdown at the top → **"New Project"**
3. Project name: **`DevOps Buddy`**
4. Click **"Create"**
5. Make sure the new project is selected in the dropdown

### Step 3.2 — Configure OAuth Consent Screen

1. In the left sidebar, go to **"APIs & Services"** → **"OAuth consent screen"**
2. User Type: Select **"External"** → Click **"Create"**
3. Fill in the form:
   - **App name:** `DevOps Buddy`
   - **User support email:** Your email address
   - **Developer contact information:** Your email address
4. Click **"Save and Continue"**
5. **Scopes page:** Click **"Add or Remove Scopes"**
   - Select: `../auth/userinfo.email` and `../auth/userinfo.profile`
   - Click **"Update"** → **"Save and Continue"**
6. **Test users page:** Add your email address as a test user
7. Click **"Save and Continue"** → **"Back to Dashboard"**

### Step 3.3 — Create OAuth 2.0 Client ID

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth 2.0 Client ID"**
3. Application type: **"Web application"**
4. Name: `DevOps Buddy Web Client`
5. **Authorized JavaScript origins:**
   - For development: `http://localhost:3000`
   - For production: `https://your-frontend.vercel.app` (add after deploying frontend)
6. **Authorized redirect URIs:**
   - For development: `http://localhost:5000/auth/google/callback`
   - For production: `https://your-backend.vercel.app/auth/google/callback` (add after deploying backend)
7. Click **"Create"**
8. A popup will show your **Client ID** and **Client Secret** → **COPY BOTH AND SAVE THEM**

> **⚠️ IMPORTANT:** The Client Secret is shown only once in this popup. If you lose it, you'll need to create a new secret.

### Step 3.4 — Generating a JWT Secret

Run this command in your terminal to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

This will output a 128-character hex string. **Copy and save it** — you'll need it for the `JWT_SECRET` environment variable.

---

## 4. Local Development Setup

### Step 4.1 — Clone and Navigate

```bash
git clone https://github.com/DevSudhanshuRanjan/devops-buddy.git
cd devops-buddy/backend
```

### Step 4.2 — Install Dependencies

```bash
npm install
```

### Step 4.3 — Create Your Local `.env` File

```bash
cp .env.example .env
```

Now open `.env` in your editor and fill in all values:

```env
# ─── Server ───────────────────────────────────────────
PORT=5000
NODE_ENV=development

# ─── MongoDB Atlas ────────────────────────────────────
MONGODB_URI=mongodb+srv://devopsbuddy_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/devopsbuddy?retryWrites=true&w=majority

# ─── Google OAuth 2.0 ─────────────────────────────────
GOOGLE_CLIENT_ID=123456789-xxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxx

# ─── JWT ──────────────────────────────────────────────
JWT_SECRET=paste-your-128-character-hex-string-here
JWT_EXPIRES_IN=7d

# ─── URLs ─────────────────────────────────────────────
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
```

### Step 4.4 — Start the Development Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0-shard-00-xx.xxxxx.mongodb.net
🚀 DevOps Buddy API running on port 5000 [development]
```

### Step 4.5 — Verify Health Endpoints

Open your browser or use curl:

```bash
# Server health
curl http://localhost:5000/health

# Database health
curl http://localhost:5000/health/db

# Swagger API docs
# Open in browser: http://localhost:5000/api-docs
```

---

## 5. Deploying to Vercel

Vercel deploys the backend as serverless functions.

### Step 5.1 — Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 5.2 — Deploy via Vercel Dashboard (Recommended)

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. **Import Git Repository:** Select your GitHub repo `DevSudhanshuRanjan/devops-buddy`
4. **Configure Project:**
   - **Framework Preset:** Select **"Other"**
   - **Root Directory:** Click **"Edit"** and set it to **`backend`**
     - This is critical! The backend is in a subdirectory, not the root
   - **Build Command:** Leave empty (or set to `npm install`)
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`
5. **DO NOT deploy yet** — first set up environment variables (Section 6)

### Step 5.3 — Deploy via CLI (Alternative)

If you prefer the command line:

```bash
cd backend
vercel login
vercel --prod
```

When prompted:
- Set up and deploy: **Y**
- Which scope: Select your account
- Link to existing project: **N**
- Project name: `devops-buddy-api`
- Directory with code: **`./`**
- Override settings: **N**

---

## 6. Setting Environment Variables on Vercel

This is the most critical step. Every environment variable must be set correctly.

### Step 6.1 — Navigate to Project Settings

1. Go to your Vercel Dashboard
2. Click on the **`devops-buddy-api`** project (or whatever you named it)
3. Click **"Settings"** tab at the top
4. Click **"Environment Variables"** in the left sidebar

### Step 6.2 — Add Each Variable

Add each of the following variables. For each one:
- Type the **Key** (name) in the Key field
- Paste the **Value** in the Value field
- **Environment:** Check all three: ✅ Production, ✅ Preview, ✅ Development
- Click **"Save"**

| # | Key | Value | Notes |
|---|-----|-------|-------|
| 1 | `NODE_ENV` | `production` | Always `production` on Vercel |
| 2 | `MONGODB_URI` | `mongodb+srv://devopsbuddy_admin:PASSWORD@cluster0.xxxxx.mongodb.net/devopsbuddy?retryWrites=true&w=majority` | From Section 2.6 — use your actual password |
| 3 | `GOOGLE_CLIENT_ID` | `123456789-xxxxxxxx.apps.googleusercontent.com` | From Section 3.3 |
| 4 | `GOOGLE_CLIENT_SECRET` | `GOCSPX-xxxxxxxxxxxxxxxxx` | From Section 3.3 |
| 5 | `JWT_SECRET` | `(your 128-char hex string)` | Generated in Section 3.4 — **must be at least 64 characters** |
| 6 | `JWT_EXPIRES_IN` | `7d` | Token valid for 7 days |
| 7 | `CLIENT_URL` | `https://your-frontend.vercel.app` | Your frontend's deployed URL (update after frontend deploy) |
| 8 | `SERVER_URL` | `https://your-backend.vercel.app` | Your backend's deployed URL (you get this after first deploy) |
| 9 | `GOOGLE_CALLBACK_URL` | `https://your-backend.vercel.app/auth/google/callback` | Must match EXACTLY what you set in Google Console |

### Step 6.3 — Verify Variables are Set

After adding all 9 variables, your Environment Variables page should show 9 entries. Double-check:
- No trailing spaces in values
- No quotes around values (Vercel adds them automatically)
- `MONGODB_URI` has the real password (not `<password>`)
- `GOOGLE_CALLBACK_URL` matches what's in Google Console

### Step 6.4 — Redeploy After Adding Variables

1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click the **three dots menu (⋮)** → **"Redeploy"**
4. Check **"Redeploy with existing Build Cache"** → Click **"Redeploy"**

---

## 7. Post-Deployment Configuration

### Step 7.1 — Note Your Backend URL

After deployment, Vercel gives you a URL like:
```
https://devops-buddy-api-xxxx.vercel.app
```

Or a custom production URL:
```
https://devops-buddy-api.vercel.app
```

**Copy this URL** — you'll need it for the next steps.

### Step 7.2 — Update Google OAuth Redirect URIs

1. Go back to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **"APIs & Services"** → **"Credentials"**
3. Click on your OAuth 2.0 Client ID (`DevOps Buddy Web Client`)
4. Under **"Authorized JavaScript origins"**, add:
   ```
   https://your-frontend.vercel.app
   ```
5. Under **"Authorized redirect URIs"**, add:
   ```
   https://your-backend.vercel.app/auth/google/callback
   ```
6. Click **"Save"**

> **⚠️ IMPORTANT:** The redirect URI in Google Console must match **EXACTLY** with your `GOOGLE_CALLBACK_URL` environment variable on Vercel. Even a trailing slash difference will cause OAuth to fail.

### Step 7.3 — Update Vercel Environment Variables (If Needed)

After you know the exact production URLs, update these on Vercel:
- `SERVER_URL` → your actual backend URL
- `CLIENT_URL` → your actual frontend URL
- `GOOGLE_CALLBACK_URL` → `https://your-actual-backend-url/auth/google/callback`

Then **redeploy** again (see Step 6.4).

### Step 7.4 — Publish Google OAuth App (Optional)

If you want users other than test users to log in:
1. Google Cloud Console → **"APIs & Services"** → **"OAuth consent screen"**
2. Click **"Publish App"**
3. This moves the app from "Testing" to "In Production"
4. Note: Google may require a verification process for production apps

---

## 8. Production Smoke Test

After deployment, verify every endpoint works. Replace `YOUR_BACKEND_URL` with your actual Vercel URL.

### 8.1 — Health Checks

```bash
# Server health
curl https://YOUR_BACKEND_URL/health
# Expected: {"status":"ok","environment":"production","timestamp":"..."}

# Database health
curl https://YOUR_BACKEND_URL/health/db
# Expected: {"status":"ok","db":"connected"}
```

### 8.2 — Auth Flow

```bash
# Should redirect to Google login page
curl -I https://YOUR_BACKEND_URL/auth/google
# Expected: HTTP 302 redirect to accounts.google.com

# Auth me without token (should be protected)
curl https://YOUR_BACKEND_URL/auth/me
# Expected: {"error":"Not authenticated. Please log in."}
```

### 8.3 — Swagger Documentation

Open in browser:
```
https://YOUR_BACKEND_URL/api-docs
```
You should see the Swagger UI with all endpoints documented.

### 8.4 — Full Test Checklist

| # | Test | Expected Result | Status |
|---|------|-----------------|--------|
| 1 | `GET /health` | `{"status":"ok"}` | ☐ |
| 2 | `GET /health/db` | `{"status":"ok","db":"connected"}` | ☐ |
| 3 | `GET /auth/google` | Redirects to Google login | ☐ |
| 4 | `GET /auth/me` (no token) | 401 Unauthorized | ☐ |
| 5 | `POST /auth/logout` (no token) | 401 Unauthorized | ☐ |
| 6 | `GET /api/users/fakeid` (no token) | 401 Unauthorized | ☐ |
| 7 | `GET /api/progress/fakeid` (no token) | 401 Unauthorized | ☐ |
| 8 | `POST /api/quiz/fakeid/submit` (no token) | 401 Unauthorized | ☐ |
| 9 | `GET /api-docs` | Swagger UI loads | ☐ |
| 10 | Complete Google login flow | JWT issued, redirect to frontend | ☐ |

---

## 9. Troubleshooting

### "OAuth2Strategy requires a clientID"
- **Cause:** `GOOGLE_CLIENT_ID` environment variable is not set
- **Fix:** Add it in your `.env` file (local) or Vercel Environment Variables (production)

### "MongoDB connection error" / App crashes on startup
- **Cause:** `MONGODB_URI` is missing or incorrect
- **Fix:** Check your connection string has the correct password and database name
- **Fix:** Ensure your IP is whitelisted in MongoDB Atlas Network Access

### Google OAuth gives "redirect_uri_mismatch"
- **Cause:** The callback URL in Google Console doesn't match your `GOOGLE_CALLBACK_URL`
- **Fix:** They must be **exactly** identical, including protocol (`https://`), domain, and path
- **Common mistake:** Adding or missing a trailing slash

### "Cannot GET /auth/google"
- **Cause:** Passport Google strategy didn't initialize (missing credentials)
- **Fix:** Ensure both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set

### Vercel returns 500 Internal Server Error
- **Cause:** Check Vercel Function Logs
- **Steps:**
  1. Go to Vercel Dashboard → Your Project → **"Deployments"**
  2. Click the latest deployment → **"Functions"** tab
  3. Click on the function → **"Logs"** tab
  4. Look for error messages

### CORS Errors in Browser
- **Cause:** `CLIENT_URL` environment variable doesn't match your frontend's URL
- **Fix:** Update `CLIENT_URL` on Vercel to match exactly (including `https://`)

### Database shows "disconnected" on `/health/db`
- **Cause:** MongoDB Atlas connection failed
- **Checks:**
  1. Is the `MONGODB_URI` correct?
  2. Is the database user password correct?
  3. Is `0.0.0.0/0` in the Network Access whitelist?
  4. Is the cluster running (not paused due to inactivity)?

> **Note:** Free M0 clusters pause after 60 days of inactivity. Resume them from the Atlas dashboard.

---

## 10. Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `5000` | Port the server listens on (ignored on Vercel) |
| `NODE_ENV` | Yes | — | `development` locally, `production` on Vercel |
| `MONGODB_URI` | Yes | — | MongoDB Atlas connection string |
| `GOOGLE_CLIENT_ID` | Yes | — | Google OAuth 2.0 Client ID |
| `GOOGLE_CLIENT_SECRET` | Yes | — | Google OAuth 2.0 Client Secret |
| `JWT_SECRET` | Yes | — | Secret key for signing JWT tokens (min 64 chars) |
| `JWT_EXPIRES_IN` | No | `7d` | Token expiration duration |
| `CLIENT_URL` | Yes | — | Frontend URL (for CORS and OAuth redirect) |
| `SERVER_URL` | Yes | — | Backend URL |
| `GOOGLE_CALLBACK_URL` | Yes | — | OAuth callback URL (must match Google Console) |

---

## 11. API Endpoints Reference

### Public Endpoints (No Authentication Required)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/health` | Server health check |
| GET | `/health/db` | Database connection status |
| GET | `/auth/google` | Initiate Google OAuth login flow |
| GET | `/auth/google/callback` | Google OAuth callback (handled by Passport) |
| GET | `/api-docs` | Swagger API documentation UI |

### Protected Endpoints (JWT Required)

Send the JWT token as:
- **Header:** `Authorization: Bearer <token>`
- **Cookie:** `devopsbuddy_token=<token>` (set automatically after login)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/auth/me` | Get current authenticated user |
| POST | `/auth/logout` | Clear auth token and log out |
| GET | `/api/users/:id` | Get user profile by ID |
| PATCH | `/api/users/:id` | Update display name or avatar |
| DELETE | `/api/users/:id` | Delete account (cascades to progress & quiz data) |
| GET | `/api/progress/:userId` | Get full progress document |
| POST | `/api/progress/:userId/complete` | Mark a lesson as complete |
| DELETE | `/api/progress/:userId/lesson/:lessonId` | Unmark a completed lesson |
| GET | `/api/progress/:userId/stats` | Get computed stats (streak, %, time) |
| POST | `/api/quiz/:userId/submit` | Submit quiz and get scored result |
| GET | `/api/quiz/:userId/results` | Get all past quiz attempts |
| GET | `/api/quiz/:userId/best` | Get best quiz attempt score |

---

## Summary of Deployment Steps

```
1. Create MongoDB Atlas cluster + user + whitelist
         ↓
2. Create Google OAuth credentials
         ↓
3. Generate JWT secret
         ↓
4. Test locally with .env file
         ↓
5. Deploy to Vercel (set root directory to "backend")
         ↓
6. Set all 9 environment variables on Vercel
         ↓
7. Update Google Console with production callback URL
         ↓
8. Redeploy on Vercel
         ↓
9. Run smoke tests
         ↓
    ✅ DONE — Backend is live!
```

---

*Document created for DevOps Buddy Backend — Last updated: April 2026*
