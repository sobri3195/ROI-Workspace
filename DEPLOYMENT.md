# Deployment Guide for ROI-Workspace

This guide covers deploying ROI-Workspace to various static hosting platforms.

## Prerequisites

Before deploying, ensure:
- All dependencies are installed: `npm install`
- The project builds successfully: `npm run build`
- The build outputs to the `dist` directory

## Deploy to Netlify

### Option 1: Netlify CLI

1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy from the project directory:
```bash
npm run build
netlify deploy --prod
```

4. Follow the prompts:
   - Publish directory: `dist`
   - Site name: choose a unique name

### Option 2: Netlify Web UI

1. Build the project:
```bash
npm run build
```

2. Go to [Netlify](https://app.netlify.com/)
3. Drag and drop the `dist` folder to deploy
4. Your site will be live instantly!

### Option 3: Continuous Deployment from Git

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect your Git provider and select the repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Branch: `feat-roi-workspace-admin-vite-react-localstorage` (or `main`)
6. Click "Deploy site"

**Note:** The `netlify.toml` file is already configured for proper routing.

## Deploy to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy from the project directory:
```bash
vercel
```

3. Follow the prompts and your site will be deployed!

### Option 2: Vercel Web UI

1. Go to [Vercel](https://vercel.com/)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will automatically detect Vite settings
5. Click "Deploy"

## Deploy to GitHub Pages

1. Install `gh-pages` package:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json` scripts:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js` to set the base path:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/roi-workspace/', // Replace with your repo name
})
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages in repository settings:
   - Settings → Pages
   - Source: `gh-pages` branch
   - Root directory: `/`

## Deploy to Cloudflare Pages

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click "Create a project"
3. Connect your Git repository
4. Configure build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Click "Save and Deploy"

## Environment Configuration

### Base URL
If deploying to a subdirectory, update `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-subdirectory/',
})
```

### Router Configuration
React Router is configured with `BrowserRouter`. The `netlify.toml` and deployment platforms handle client-side routing correctly.

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Navigation works between all routes
- [ ] localStorage persists data correctly
- [ ] All forms submit and save data
- [ ] Calculator functions work properly
- [ ] Responsive design works on mobile
- [ ] Console has no errors

## Custom Domain

### Netlify
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions

### Vercel
1. Go to Project settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## Troubleshooting

### 404 Errors on Refresh
- Ensure the hosting platform redirects all routes to `index.html`
- For Netlify: The `netlify.toml` file handles this
- For Vercel: This is automatic
- For other platforms: Add a redirect rule or `_redirects` file

### Build Fails
- Check Node.js version (v16+ required)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`

### White Screen After Deploy
- Check browser console for errors
- Verify `base` path in `vite.config.js` matches deployment URL
- Ensure all imports use correct paths

## Performance Optimization

The application is already optimized for production:
- Vite bundles and minifies all assets
- CSS is extracted and optimized
- Tree-shaking removes unused code
- Code splitting for optimal loading

## Security Notes

- All data is stored in browser localStorage
- No backend or API calls
- No sensitive data should be entered
- Demo/educational use only

## Support

For issues or questions about deployment, refer to:
- [Vite Deployment Documentation](https://vitejs.dev/guide/static-deploy.html)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)

---

**Happy Deploying!** 🚀
