const COLUMNS = [
  {
    title: "Shop",
    links: ["Lactation cookies", "Herbal teas", "Hydration mixes", "Gift bundles", "Subscribe & save"],
  },
  {
    title: "Learn",
    links: ["Ingredient library", "Fourth trimester guide", "IBCLC directory", "Reviews", "FAQ"],
  },
  {
    title: "Company",
    links: ["Our story", "Stockists", "Wholesale", "Careers", "Press kit"],
  },
  {
    title: "Support",
    links: ["Shipping & returns", "Track an order", "Contact us", "Accessibility", "Privacy"],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <a className="wordmark wordmark-footer" href="#top">
            <span className="wordmark-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="24" height="24" focusable="false">
                <path
                  d="M16 3c5 6.5 8 10.6 8 14.4A8 8 0 0 1 8 17.4C8 13.6 11 9.5 16 3z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="wordmark-text">
              Milkmakers
              <span className="wordmark-sub">fourth trimester co.</span>
            </span>
          </a>
          <p>
            Small-batch nourishment for the weeks after birth. Baked in Austin,
            shipped frozen across the US.
          </p>
          <div className="social-row">
            {["Instagram", "TikTok", "Pinterest"].map((network) => (
              <a key={network} href="#top" className="social-link">
                {network}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-columns">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#shop">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Milkmakers. Redesign concept — not affiliated.</p>
        <p className="footer-note">
          These statements have not been evaluated by the FDA. Not intended to
          diagnose, treat, cure or prevent any disease.
        </p>
      </div>
    </footer>
  );
}
