import { useState } from "react";
import { useScrolled } from "../hooks/useSiteHooks.js";

const NAV_LINKS = [
  { label: "Shop", href: "#shop" },
  { label: "Our story", href: "#story" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export default function Header({ cartCount, onOpenCart, onOpenLogin, account }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(20);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="announcement">
        <p>
          <span className="announcement-dot" aria-hidden="true" />
          Free shipping over $50 · Baked fresh, shipped frozen
        </p>
      </div>

      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container header-inner">
          <button
            type="button"
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={`menu-icon${menuOpen ? " is-open" : ""}`} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>

          <a className="wordmark" href="#top" onClick={closeMenu}>
            <span className="wordmark-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="26" height="26" focusable="false">
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

          <nav className="desktop-nav" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button type="button" className="header-link" onClick={onOpenLogin}>
              {account ? `Hi, ${account.name}` : "Log in"}
            </button>
            <a className="header-link" href="#newsletter">
              Join the list
            </a>
            <button type="button" className="cart-button" onClick={onOpenCart}>
              <span className="cart-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" focusable="false">
                  <path
                    d="M6 7h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M9.4 7a2.6 2.6 0 0 1 5.2 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="cart-label">Bag</span>
              <span className={`cart-count${cartCount ? " has-items" : ""}`}>
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        <div id="mobile-nav" className={`mobile-nav${menuOpen ? " is-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <button type="button" className="mobile-login" onClick={() => {
            onOpenLogin();
            closeMenu();
          }}>
            {account ? `Hi, ${account.name}` : "Log in"}
          </button>
          <a href="#newsletter" onClick={closeMenu}>
            Join the list
          </a>
        </div>
      </header>
    </>
  );
}
