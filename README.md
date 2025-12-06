# stead. Website

A modern website built with [Astro](https://astro.build), designed for deployment with Docker and Dokploy.

## Prerequisites

- Node.js 20+
- pnpm
- Docker (for containerized builds)

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

## Docker Development

### Development with Docker

```bash
docker-compose up dev
```

Access at `http://localhost:4321`

### Production build with Docker

```bash
docker-compose up prod
```

Access at `http://localhost:8080`

Or build and run manually:

```bash
docker build -t stead-website .
docker run -p 8080:80 stead-website
```

## Deployment with Dokploy

The `Dockerfile` is configured for deployment with Dokploy:

1. **Development/Preview**: Deploys use the dev Dockerfile for faster iterations
2. **Production**: Uses multi-stage build with nginx for optimal performance

### Build stages:
- **Builder**: Compiles SCSS, installs dependencies, and builds the Astro site
- **Production**: Serves static files with nginx

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
├── Dockerfile         # Production Docker image
├── Dockerfile.dev     # Development Docker image
├── docker-compose.yml # Docker Compose configuration
└── nginx.conf         # Nginx configuration for production
```

## Configuration

### Astro Configuration
Edit `astro.config.mjs` to modify Astro settings.

### Nginx Configuration
Edit `nginx.conf` to customize the production web server settings (caching, gzip, security headers, etc.).

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
- **Gzip compression**: All text assets are gzipped (configured in nginx.conf)
- **Browser caching**: Static assets have long cache times
- **CDN-ready**: Static build output works with any CDN

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production with all optimizations
- `pnpm compile:css` - Manually compile SCSS to CSS
- `pnpm preview` - Preview production build locally
- `pnpm astro` - Run Astro CLI commands

## License

ISC
