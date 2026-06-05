import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import ContactCard from '../components/ContactCard.astro';
import Footer from '../components/Footer.astro';
import Nav from '../components/Nav.astro';

describe('Nav', () => {
  it('renders without throwing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Nav);
    expect(html.length).toBeGreaterThan(0);
  });

  it('contains a link to home', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Nav);
    expect(html).toContain('href="/"');
  });

  it('contains a link to contact', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Nav);
    expect(html).toContain('href="/contact"');
  });
});

describe('Footer', () => {
  it('renders without throwing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer);
    expect(html.length).toBeGreaterThan(0);
  });

  it('contains stead branding', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer);
    expect(html).toContain('stead.');
  });

  it('contains About Us section', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer);
    expect(html).toContain('About Us');
  });
});

describe('ContactCard', () => {
  it('renders without throwing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ContactCard);
    expect(html.length).toBeGreaterThan(0);
  });

  it('contains a submit button', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ContactCard);
    expect(html).toContain('type="submit"');
  });

  it('contains an email input', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ContactCard);
    expect(html).toContain('type="email"');
  });
});
