# WQuicks Deployment Guide

This guide provides instructions for deploying both the **Back-End** (Cloudflare Workers + D1) and **Front-End** (Cloudflare Pages) for different environments: **Dev**, **UAT**, and **Prod**.

## Prerequisites

- **Cloudflare Account**: You must have a Cloudflare account.
- **Wrangler CLI**: The project uses `wrangler` for deployment. You will likely be asked to login via browser: `npx wrangler login`.
- **Custom Domains**: Ensure `wquicks.com` is managed by Cloudflare or you have permissions to add DNS records.

---

## 1. Back-End Deployment (Workers)

The backend uses environment-specific custom domains and separate D1 databases.

### Custom Domains:
- **Dev**: `https://api.dev.wquicks.com`
- **UAT**: `https://api.uat.wquicks.com`
- **Prod**: `https://api.wquicks.com`

### Steps:

1.  **Navigate to the backend directory:**
    ```bash
    cd back-end
    ```

2.  **Deploy to specific environment:**
    ```bash
    # For Dev
    npm run deploy:dev

    # For UAT
    npm run deploy:uat

    # For Prod
    npm run deploy:prod
    ```
    *These commands automatically run the corresponding database migrations and then deploy the worker code.*

---

## 2. Front-End Deployment (Pages)

The frontend is deployed to Cloudflare Pages as separate projects.

### Static URLs (Examples):
- **Dev**: `https://dev-wquicks-frontend.pages.dev`
- **UAT**: `https://uat-wquicks-frontend.pages.dev`
- **Prod**: `https://prod-wquicks-frontend.pages.dev`

### Steps:

1.  **Navigate to the frontend directory:**
    ```bash
    cd front-end
    ```

2.  **Deploy to specific environment:**
    ```bash
    # For Dev
    VITE_API_URL=https://api.dev.wquicks.com npm run deploy:dev

    # For UAT
    VITE_API_URL=https://api.uat.wquicks.com npm run deploy:uat

    # For Prod
    VITE_API_URL=https://api.wquicks.com npm run deploy:prod
    ```

3.  **Note**: After the first deployment, it is highly recommended to set the `VITE_API_URL` environment variable within the **Cloudflare Pages Dashboard** for each project under **Settings > Environment variables** so you don't have to specify it in the command line every time.

---

## Summary of Environments

| Environment | Backend Project Name | Backend API Domain | Frontend Project Name |
| :--- | :--- | :--- | :--- |
| **Dev** | `dev-wquicks-backend` | `api.dev.wquicks.com` | `dev-wquicks-frontend` |
| **UAT** | `uat-wquicks-backend` | `api.uat.wquicks.com` | `uat-wquicks-frontend` |
| **Prod** | `prod-wquicks-backend` | `api.wquicks.com` | `prod-wquicks-frontend` |

---

## Managing Databases

To execute SQL schema changes manually:
- **Dev**: `npm run db:deploy:dev`
- **UAT**: `npm run db:deploy:uat`
- **Prod**: `npm run db:deploy:prod`
- **Local**: `npm run db:init`

