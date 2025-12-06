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

### Compile SCSS to CSS

```bash
pnpm sass assets/scss/now-ui-kit.scss public/css/now-ui-kit.css
cp assets/css/stead.css public/css/stead.css
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

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm astro` - Run Astro CLI commands

## License

ISC
