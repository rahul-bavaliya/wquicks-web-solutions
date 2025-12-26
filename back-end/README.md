# WQuicks Backend Deployment

This is the backend for WQuicks, built with [Hono](https://hono.dev/) and deployed as a [Cloudflare Worker](https://workers.cloudflare.com/) using [D1](https://developers.cloudflare.com/d1/) for database storage.

## Access Control
The backend is secured using CORS. Access is restricted to specific frontend origins defined in `wrangler.toml` for each environment:
- **Dev**: https://dev.wquicks.com
- **UAT**: https://uat.wquicks.com
- **Prod**: https://wquicks.com
- **Local**: http://localhost:3000

## Prerequisites
1.  **Cloudflare CLI**: Ensure you have `wrangler` installed and are logged in:
    ```bash
    npx wrangler login
    ```

## Environment Deployment

### 1. Dev (Development)
Deploys to `dev-wquicks-backend` using `wquicks-db-dev`.
```bash
npm run deploy:dev
```

### 2. UAT (User Acceptance Testing)
Deploys to `uat-wquicks-backend` using `wquicks-db-uat`.
```bash
npm run deploy:uat
```

### 3. Prod (Production)
Deploys to `prod-wquicks-backend` using `wquicks-db-prod`.
```bash
npm run deploy:prod
```

## Database Schema
If you need to manually apply the schema to a database:
- **Local Dev**: `npm run db:init`
- **Remote Dev**: `npm run db:deploy:dev`
- **Remote UAT**: `npm run db:deploy:uat`
- **Remote Prod**: `npm run db:deploy:prod`

## API Endpoints
- `POST /api/contact`: Receives contact form submissions.
  - Body: `{ name, email, phone, message }`
