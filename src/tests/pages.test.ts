import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Contact from '../pages/contact.astro';
import Excellence from '../pages/excellence.astro';
import Index from '../pages/index.astro';
import OurStory from '../pages/ourstory.astro';
import Performance from '../pages/performance.astro';
import Privacy from '../pages/privacy.astro';
import Processes from '../pages/processes.astro';
import Stories from '../pages/stories.astro';

describe('Index page', () => {
  it('renders without throwing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Index);
    expect(html.length).toBeGreaterThan(0);
  });

  it('contains stead branding', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Index);
    expect(html).toContain('stead');
  });
});

describe('Contact page', () => {
  it('renders without throwing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Contact);
    expect(html.length).toBeGreaterThan(0);
  });

  it('contains contact heading', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Contact);
    expect(html).toContain('Contact');
  });
});

describe('Our Story page', () => {
  it('renders without throwing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(OurStory);
    expect(html.length).toBeGreaterThan(0);
  });

  it('contains simple excellence tagline', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(OurStory);
    expect(html).toContain('simple');
  });
});

describe('Excellence page', () => {
  it('renders without throwing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Excellence);
    expect(html.length).toBeGreaterThan(0);
  });

  it('contains digital excellence heading', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Excellence);
    expect(html).toContain('digital excellence');
  });
});

describe('Performance page', () => {
  it('renders without throwing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Performance);
    expect(html.length).toBeGreaterThan(0);
  });

  it('contains uptime promise', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Performance);
    expect(html).toContain('99.9%');
  });
});

describe('Processes page', () => {
  it('renders without throwing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Processes);
    expect(html.length).toBeGreaterThan(0);
  });

  it('contains digitise heading', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Processes);
    expect(html).toContain('digitise');
  });
});

describe('Stories page', () => {
  it('renders without throwing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Stories);
    expect(html.length).toBeGreaterThan(0);
  });

  it('contains stories heading', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Stories);
    expect(html).toContain('Stories');
  });
});

describe('Privacy page', () => {
  it('renders without throwing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Privacy);
    expect(html.length).toBeGreaterThan(0);
  });

  it('contains privacy policy heading', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Privacy);
    expect(html).toContain('Privacy policy');
  });
});
