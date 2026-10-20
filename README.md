# Milkmakers — Site Redesign (React + Vite)

A modern UI/UX redesign concept for [milkymakers.com](https://www.milkymakers.com), rebuilt as a
single-page React storefront. Warm editorial art direction, a real add-to-bag flow, and
accessibility baked in from the start.

> Concept work only. Not affiliated with Milkmakers. All copy, prices and reviews are
> placeholder content for demonstration.

## Design direction

The original site is functional but visually dated: dense product grids, generic type, and
no clear hierarchy between "shop" and "learn". This redesign reframes the brand as a warm,
editorial postpartum company rather than a supplement shop.

| Area | Original | Redesign |
| --- | --- | --- |
| Palette | Pink/purple gradients | Cream `#FBF6EF`, ink `#241E1B`, burgundy `#A63C57`, sage, gold |
| Type | Single sans stack | Fraunces (display serif) + Inter (UI) |
| Hierarchy | Everything the same weight | Editorial eyebrow → big serif headline → muted lede |
| Product cards | Flat grid tiles | Layered cards with gradient media, rating, badge, one-click add |
| Navigation | Many top-level links | Four intent-based links + persistent bag |
| Trust | Scattered claims | Marquee strip, review slider, stats row |
| Conversion | Static links | Persistent cart drawer with free-shipping meter and toast feedback |
| Motion | Minimal | Scroll reveals, marquee, slider — all disabled under `prefers-reduced-motion` |

## What's included

- **Sticky header** that condenses on scroll, with mobile drawer nav
- **Hero** with editorial headline, stat bar, and layered product composition
- **Scrolling trust marquee** (duplicated for a seamless loop)
- **Shop section** with client-side collection filters and 6 products
- **Working cart**: add, increment/decrement, remove, subtotal, free-shipping progress
- **Cart drawer** with backdrop click-to-close, Escape to close, focus management
- **Toast** confirmation on add-to-bag
- **Story section** with numbered brand pillars
- **Testimonial slider** with autoplay that pauses on hover/focus, dots and arrows
- **FAQ accordion** using proper `aria-expanded` / `aria-controls` wiring
- **Newsletter form** with validation and inline error/success states
- **Footer** with four link columns and legal disclaimer

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Production build:

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Project structure

```
milkmakers-redesign/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                  # cart state, toast, section composition
    ├── styles.css               # design tokens + all component styles
    ├── data/siteData.js         # products, testimonials, FAQs, marquee copy
    ├── hooks/useSiteHooks.js    # useReveal, useScrollLock, useScrolled
    └── components/
        ├── Header.jsx
        ├── Hero.jsx
        ├── TrustMarquee.jsx
        ├── Products.jsx
        ├── ProductCard.jsx
        ├── Story.jsx
        ├── Testimonials.jsx
        ├── Faq.jsx
        ├── Newsletter.jsx
        ├── Footer.jsx
        ├── CartDrawer.jsx
        └── Toast.jsx
```

## Accessibility notes

- Skip link to main content
- Semantic landmarks (`header`, `nav`, `main`, `footer`, `section` with labels)
- Visible `:focus-visible` rings on every interactive element
- Cart drawer is a labelled `role="dialog"` with `aria-modal`, Escape support and focus on open
- Accordion buttons expose `aria-expanded` and control their panel via `aria-controls`
- Live regions for cart toast and form status
- Full `prefers-reduced-motion` opt-out for marquee, reveals and transitions

## Extending it

- **Real products**: replace `src/data/siteData.js` with a CMS or commerce API response
- **Routing**: add `react-router-dom` and split sections into routes (`/shop`, `/product/:slug`)
- **Checkout**: the drawer's checkout button is intentionally inert — wire it to Stripe/Shopify
- **Images**: swap the CSS-art product media for optimized `avif`/`webp` photography
- **Persistence**: cart currently lives in memory; lift it to `localStorage` or a server cart

# milkmakers
