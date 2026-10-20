# stead. Website

A modern website built with [Astro](https://astro.build), served from Cloudflare Workers.

## Prerequisites

- Node.js 22 (pinned in `.node-version`; sharp has no prebuilt binary for newer releases)
- pnpm

## Local Development

### Install dependencies

```bash
pnpm install
```

### Compile SCSS to CSS (automatically done in build)

```bash
pnpm compile:css
```

### Run development server

```bash
pnpm dev
```

The site will be available at `http://localhost:4321`

### Build for production

```bash
pnpm build
```

This will:
1. Compile SCSS to CSS
2. Run TypeScript checks
3. Build the Astro site
4. Optimize all images to WebP format with automatic compression

### Preview production build

```bash
pnpm preview
```

## Deployment

The site is served from Cloudflare Workers as static assets. `wrangler.jsonc` points the Worker at the
`dist/` build output and binds the `stead.africa` and `www.stead.africa` custom domains.

## Project Structure

```
/
├── src/
│   ├── components/     # Reusable Astro components
│   ├── layouts/        # Page layouts
│   └── pages/          # Page routes
├── public/             # Static assets (copied to build)
│   ├── css/           # Compiled CSS files
│   ├── js/            # JavaScript files
│   ├── img/           # Images
│   ├── fonts/         # Web fonts
│   └── favicon/       # Favicon files
├── assets/            # Source assets
│   ├── scss/          # SCSS source files
│   └── css/           # Source CSS files
└── wrangler.jsonc     # Cloudflare Workers configuration
```

## Configuration

### Astro Configuration
Edit `astro.config.mjs` to modify Astro settings.

### Security Headers
Edit `public/_headers` to change the response headers Cloudflare adds to the site.

## Performance Optimizations

This site includes several performance optimizations:

### Image Optimization
- **Automatic WebP conversion**: All images are automatically converted to WebP format during build
- **Lazy loading**: Images use native browser lazy loading
- **Responsive sizing**: Images are optimized for different screen sizes
- **Compression**: Images are compressed with quality settings optimized for web delivery

Typical savings:
- Small images (portraits): 95-98% size reduction
- Large images (mockups): 95-96% size reduction

### CSS Optimization
- **SCSS compilation**: Source SCSS is compiled and minified
- **Critical CSS inlining**: Above-the-fold CSS is automatically inlined (configured in build)
- **Minification**: All CSS is minified in production builds

### Delivery Optimization
- **Compression**: Cloudflare compresses text assets automatically
- **Browser caching**: HTML is served `no-store` (see `public/_headers`) so updates show up immediately
- **CDN-ready**: Static build output works with any CDN

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production with all optimizations
- `pnpm compile:css` - Manually compile SCSS to CSS
- `pnpm preview` - Preview production build locally
- `pnpm astro` - Run Astro CLI commands

## License

ISC
