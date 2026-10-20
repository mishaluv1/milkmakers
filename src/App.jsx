import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import TrustMarquee from "./components/TrustMarquee.jsx";
import Products from "./components/Products.jsx";
import Story from "./components/Story.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Faq from "./components/Faq.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";
import Toast from "./components/Toast.jsx";
import { useReveal, useScrollLock } from "./hooks/useSiteHooks.js";

const FREE_SHIPPING_THRESHOLD = 50;

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [account, setAccount] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState(null);

  useReveal();
  useScrollLock(cartOpen || checkoutOpen || !!selectedProduct || loginOpen);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setCartOpen(false);
      setCheckoutOpen(false);
      setSelectedProduct(null);
      setLoginOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const addToCart = useCallback((product) => {
    setCart((current) => {
      const existing = current.find((line) => line.id === product.id);
      if (existing) {
        return current.map((line) =>
          line.id === product.id ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [...current, { ...product, qty: 1 }];
    });
    setToast({ id: Date.now(), message: `${product.flavour} added to your bag` });
  }, []);

  const handleAddFromDetail = useCallback(() => {
    if (!selectedProduct) return;
    addToCart(selectedProduct);
    setSelectedProduct(null);
  }, [addToCart, selectedProduct]);

  const changeQty = useCallback((id, delta) => {
    setCart((current) =>
      current
        .map((line) => (line.id === id ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0)
    );
  }, []);

  const removeLine = useCallback((id) => {
    setCart((current) => current.filter((line) => line.id !== id));
  }, []);

  const handlePlaceDemoOrder = useCallback(({ name }) => {
    setCart([]);
    setToast({ id: Date.now(), message: `Demo order placed. Thank you, ${name}!` });
  }, []);

  const handleLoginSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const email = loginForm.email.trim();
      if (!email) return;

      const candidateName = email.split("@")[0].replace(/[._-]+/g, " ");
      const friendlyName = candidateName
        .split(" ")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ") || "Mama";

      setAccount({ name: friendlyName, email });
      setLoginOpen(false);
      setLoginForm({ email: "", password: "" });
      setToast({ id: Date.now(), message: `Welcome back, ${friendlyName}!` });
    },
    [loginForm.email]
  );

  const count = cart.reduce((total, line) => total + line.qty, 0);
  const subtotal = cart.reduce((total, line) => total + line.price * line.qty, 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5.95;
  const checkoutTotal = subtotal + shipping;

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header
        cartCount={count}
        onOpenCart={() => setCartOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
        account={account}
      />

      <main id="main">
        <Hero />
        <TrustMarquee />
        <Products onAdd={addToCart} onQuickView={setSelectedProduct} />
        <Story />
        <Testimonials />
        <Faq />
        <Newsletter />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        cart={cart}
        subtotal={subtotal}
        remaining={remaining}
        progress={progress}
        onClose={() => setCartOpen(false)}
        onQty={changeQty}
        onRemove={removeLine}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          subtotal={subtotal}
          shipping={shipping}
          total={checkoutTotal}
          onClose={() => setCheckoutOpen(false)}
          onPlaceOrder={handlePlaceDemoOrder}
        />
      )}

      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div
            className="modal-panel product-detail-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProduct.name} product details`}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close product details"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>

            <div
              className="detail-media"
              style={{
                "--tone-a": selectedProduct.palette[0],
                "--tone-b": selectedProduct.palette[1],
              }}
            >
              <span className="detail-art" aria-hidden="true">
                {selectedProduct.icon}
              </span>
            </div>

            <div className="detail-copy">
              <p className="eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                Product details
              </p>
              <h2>{selectedProduct.name}</h2>
              <p className="detail-flavour">{selectedProduct.flavour}</p>

              <div className="detail-rating">
                <span className="stars" aria-hidden="true">
                  ★★★★★
                </span>
                <span>
                  {selectedProduct.rating.toFixed(1)} · {selectedProduct.reviews.toLocaleString()} reviews
                </span>
              </div>

              <p className="detail-blurb">{selectedProduct.blurb}</p>

              <ul className="detail-list">
                <li>Small batch, freezer-safe freshness</li>
                <li>Thoughtful ingredients with zero proprietary blends</li>
                <li>Made for the fourth trimester and everyday rituals</li>
              </ul>

              <div className="detail-meta-row">
                <div>
                  <span className="meta-label">Price</span>
                  <strong>${selectedProduct.price}</strong>
                </div>
                <div>
                  <span className="meta-label">Included</span>
                  <strong>1 bag / 12 servings</strong>
                </div>
              </div>

              <div className="detail-actions">
                <button type="button" className="btn btn-primary" onClick={handleAddFromDetail}>
                  Add to bag
                </button>
                <button
                  type="button"
                  className="btn btn-quiet"
                  onClick={() => setSelectedProduct(null)}
                >
                  Keep browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loginOpen && (
        <div className="modal-backdrop" onClick={() => setLoginOpen(false)}>
          <div
            className="modal-panel auth-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Demo login"
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close login"
              onClick={() => setLoginOpen(false)}
            >
              ×
            </button>

            <div className="auth-copy">
              <p className="eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                Demo account
              </p>
              <h2>Welcome back to your ritual.</h2>
              <p>
                Sign in to save favorites, keep your order history, and get a quicker checkout.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="hello@milkmakers.co"
                  value={loginForm.email}
                  onChange={(event) =>
                    setLoginForm((current) => ({ ...current, email: event.target.value }))
                  }
                  required
                />
              </label>

              <label>
                <span>Password</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(event) =>
                    setLoginForm((current) => ({ ...current, password: event.target.value }))
                  }
                  required
                />
              </label>

              <button type="submit" className="btn btn-primary btn-block">
                Sign in
              </button>

              <button
                type="button"
                className="btn btn-quiet btn-block"
                onClick={() => {
                  setLoginOpen(false);
                  setToast({ id: Date.now(), message: "Demo login skipped — browsing as guest." });
                }}
              >
                Continue as guest
              </button>
            </form>
          </div>
        </div>
      )}

      <Toast message={toast?.message} />
    </div>
  );
}
