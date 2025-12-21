# WQuicks Web Solutions - Production Documentation

Professional landing page and brand site for **WQuicks Web Solutions**, a premier Canadian digital agency specializing in high-performance web and mobile architectures.

---

## 🛠️ Environment: Development (DEV)
For active development and feature implementation.

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Setup Instructions
1. **Clone & Install**:
   ```bash
   git clone <repository-url>
   cd wquicks-website
   npm install
   ```
2. **Launch Dev Server**:
   ```bash
   npm run dev
   ```
3. **Local Access**: Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Environment: User Acceptance Testing (UAT)
Used for stakeholder review and final quality assurance.

### Build Verification
1. **Create Production Build**:
   ```bash
   npm run build
   ```
2. **Preview Production Build**:
   ```bash
   npm run preview
   ```
   *Always verify light/dark mode transitions and scroll animations in the build preview before deployment.*

---

## 🚀 Environment: Production (PROD)
Live environment hosted at **wquicks.com** via Cloudflare Pages.

### Cloudflare Pages Deployment (Step-by-Step)

#### 1. Project Creation
- Go to the **Cloudflare Dashboard** > **Workers & Pages**.
- Select **Create application** > **Pages** > **Connect to Git**.
- Select your repository and the `main` branch.

#### 2. Build Configuration
Ensure the following settings are applied:
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: Set the environment variable `NODE_VERSION` to `18` or `20` in the Pages settings.

#### 3. Domain Setup (wquicks.com)
- In the Pages project dashboard, navigate to the **Custom Domains** tab.
- Click **Set up a custom domain** and enter `wquicks.com`.
- Cloudflare will automatically update your DNS CNAME records if your domain's DNS is managed by Cloudflare.
- Repeat for `www.wquicks.com` if desired, ensuring it redirects to the apex domain.

#### 4. Post-Deployment Optimization
- **SSL/TLS**: Set to "Full (Strict)" in the Cloudflare DNS settings.
- **Minification**: Auto-minify Javascript, CSS, and HTML under the "Speed" > "Optimization" tab.
- **Cache**: Configure "Browser Cache TTL" to 1 month for static assets.

---

## 📂 Project Architecture
- `src/utils/strings.ts`: Global content repository. Edit this for any copy changes.
- `src/utils/theme.ts`: Brand color configuration.
- `src/components/sections`: Landing page blocks.
- `src/components/ui`: Reusable atomic components (animations, toggles).

---

## 📞 Support
For infrastructure support, please contact `devops@wquicks.com`.

*Built with pride in Regina, Saskatchewan, Canada 🍁*