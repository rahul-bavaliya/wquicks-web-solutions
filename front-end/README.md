# WQuicks Frontend Deployment

This is the frontend for WQuicks, built with React and Vite, and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## Environment Deployment

Deployment is handled using `wrangler`. Each environment points to its respective backend API URL.

### 1. Dev (Development)
Deploys to `dev-wquicks-frontend` pointing to `https://api.dev.wquicks.com`.
```bash
# Using the pre-set command
npm run deploy:dev

# Or manually with the API URL
VITE_API_URL=https://api.dev.wquicks.com npm run deploy:dev
```

### 2. UAT (User Acceptance Testing)
Deploys to `uat-wquicks-frontend` pointing to `https://api.uat.wquicks.com`.
```bash
npm run deploy:uat
```

### 3. Prod (Production)
Deploys to `wquicks-frontend` pointing to `https://api.wquicks.com`.
```bash
npm run deploy:prod
```

## Important Configuration
After the first deployment to any environment, ensure you set the `VITE_API_URL` environment variable in the **Cloudflare Pages Dashboard** for that project:
1.  Go to **Workers & Pages** > [Your Project].
2.  Navigate to **Settings** > **Environment variables**.
3.  Add `VITE_API_URL` with the correct backend domain (e.g., `https://api.dev.wquicks.com`).

## Local Development
Run the development server locally:
```bash
npm run dev
```
By default, it will look for the backend at `http://localhost:8787`.