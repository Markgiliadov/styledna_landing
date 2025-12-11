# StyleDNA Landing Page

A high-converting landing page for StyleDNA — an AI-powered personal shopping assistant that understands your personality to deliver hyper-personalized product recommendations.

![StyleDNA](https://img.shields.io/badge/StyleDNA-Landing%20Page-8b5cf6)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Dark Mode Design** — Premium aesthetic with Electric Violet accent
- **Fully Responsive** — Mobile-first design that works on all devices
- **Smooth Animations** — Scroll-triggered animations and micro-interactions
- **Email Capture** — Waitlist form with validation and success states
- **Cookie Consent** — GDPR-compliant cookie banner
- **SEO Optimized** — Meta tags, structured data, sitemap, and robots.txt
- **Netlify Ready** — Pre-configured for one-click deployment

## Tech Stack

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Google Fonts (Space Grotesk, Inter)

## Project Structure

```
styledna/
├── index.html           # Main landing page
├── privacy.html         # Privacy policy
├── terms.html           # Terms of service
├── cookies.html         # Cookie policy
├── 404.html             # Custom 404 page
├── sitemap.xml          # SEO sitemap
├── robots.txt           # Search engine directives
├── netlify.toml         # Netlify deployment config
├── css/
│   ├── styles.css       # Main styles & design system
│   ├── animations.css   # Animations & transitions
│   └── responsive.css   # Responsive breakpoints
├── js/
│   └── main.js          # JavaScript functionality
└── assets/
    └── favicon.svg      # Site favicon
```

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Markgiliadov/styledna_landing.git
   cd styledna_landing
   ```

2. Open in browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using PHP
   php -S localhost:8000
   ```

3. Open `http://localhost:8000` in your browser

### Form Setup

To enable email collection, update the form submission in `js/main.js`:

1. Create a free account at [Formspree](https://formspree.io)
2. Create a new form and copy your form ID
3. Replace `YOUR_FORM_ID` in `js/main.js`:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

## Deployment

### Netlify (Recommended)

1. Push to GitHub
2. Connect repository to [Netlify](https://app.netlify.com)
3. Deploy — configuration is automatic via `netlify.toml`

### Vercel

1. Push to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Deploy with default settings

### Manual

Upload all files to any static hosting provider (GitHub Pages, Cloudflare Pages, etc.)

## Customization

### Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
    --accent-primary: #8b5cf6;    /* Main accent color */
    --accent-light: #a78bfa;      /* Hover states */
    --bg-primary: #0a0a0f;        /* Background */
    --text-primary: #ffffff;       /* Headlines */
    --text-secondary: #a0a0b0;     /* Body text */
}
```

### Content

- Update text content in `index.html`
- Replace social links in the footer
- Update legal pages with your company information
- Modify `sitemap.xml` with your domain

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License — feel free to use for personal or commercial projects.

## Credits

Built with Claude Code by Anthropic.
