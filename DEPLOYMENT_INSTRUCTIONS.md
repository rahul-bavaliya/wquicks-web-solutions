# WQuicks Deployment Guide

This guide provides instructions for deploying both the **Back-End** (Cloudflare Workers + D1) and **Front-End** (Cloudflare Pages) of the Web Quick Solutions project.

## Prerequisites

- **Cloudflare Account**: You must have a Cloudflare account.
- **Wrangler CLI**: The project uses `wrangler` for deployment. You will likely be asked to login via the browser the first time you run a deploy command.

---

## 1. Back-End Deployment

The backend is built on Cloudflare Workers and Hono, and uses a D1 database for storage.

### Steps:

1.  **Navigate to the backend directory:**
    ```bash
    cd back-end
    ```

2.  **Login to Cloudflare (if not already logged in):**
    ```bash
    npx wrangler login
    ```

3.  **Deploy the Worker & Database:**
    We have configured a single command that updates your D1 database schema (if changed) and then deploys your worker code.
    ```bash
    npm run deploy
    ```
    *This runs `npm run db:deploy && wrangler deploy`.*

4.  **Note the Worker URL:**
    After deployment successfully completes, Wrangler will output your Worker's URL (e.g., `https://wquicks-backend.your-subdomain.workers.dev`). **Copy this URL**, you will need it for the frontend configuration.

---

## 2. Front-End Deployment

The frontend is a static React site that will be deployed to Cloudflare Pages.

### Steps:

1.  **Navigate to the frontend directory:**
    ```bash
    cd front-end
    ```

2.  **Configure the Backend URL:**
    When deploying, you need to tell the frontend where to send contact form submissions.
    
    You have two options:
    
    *   **Option A: Cloudflare Dashboard (Recommended)**
        1.  Deploy first without the variable (see step 3).
        2.  Go to the Cloudflare Pages dashboard for your new project.
        3.  Navigate to **Settings** > **Environment variables**.
        4.  Add a variable: `VITE_API_URL` with the value of your Backend Worker URL (from Section 1, Step 4).
        5.  Redeploy (or retry the build).
        
    *   **Option B: Temporary Local Build**
        If you want to quick-deploy with the variable baked in:
        ```bash
        VITE_API_URL=https://your-backend-url.workers.dev npm run deploy
        ```

3.  **Deploy the Site:**
    We have added a script that builds your React app and uploads the `dist` folder to Cloudflare Pages.
    
    ```bash
    npm run deploy
    ```
    
    *   If this is your first time, Wrangler will ask you to create a new Cloudflare Pages project. Give it a name like `wquicks-frontend`.
    *   It will upload the assets and provide you with a live URL (e.g., `https://wquicks-frontend.pages.dev`).

---

## Summary of Commands

**Back-End:**
```bash
cd back-end
npm run deploy
```

**Front-End:**
```bash
cd front-end
npm run deploy
```
