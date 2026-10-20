import { useState } from "react";

const INITIAL_FORM = {
  name: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  country: "United States",
};

export default function CheckoutModal({ cart, subtotal, shipping, total, onClose, onPlaceOrder }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber] = useState(() => `MM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);

  const handleSubmit = (event) => {
    event.preventDefault();
    onPlaceOrder({ name: form.name.trim(), email: form.email.trim(), orderNumber });
    setOrderPlaced(true);
  };

  return (
    <div className="modal-backdrop checkout-backdrop" onClick={onClose}>
      <div
        className="modal-panel checkout-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={orderPlaced ? "Demo order confirmation" : "Demo checkout"}
      >
        <button type="button" className="modal-close" aria-label="Close checkout" onClick={onClose}>
          ×
        </button>

        {orderPlaced ? (
          <div className="checkout-success">
            <span className="checkout-success-icon" aria-hidden="true">✓</span>
            <p className="eyebrow">Demo order placed</p>
            <h2>Thank you, {form.name.trim().split(/\s+/)[0]}.</h2>
            <p>
              Your demo order <strong>{orderNumber}</strong> is confirmed. No payment was collected
              and no real order was submitted.
            </p>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="checkout-heading">
              <p className="eyebrow">Secure your little ritual</p>
              <h2>Demo checkout</h2>
              <p>This is a prototype checkout. Enter sample details; no payment will be taken.</p>
            </div>

            <div className="checkout-layout">
              <form className="checkout-form" onSubmit={handleSubmit}>
                <h3>Contact & delivery</h3>
                <label>
                  Full name
                  <input
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    required
                  />
                </label>
                <label>
                  Street address
                  <input
                    autoComplete="street-address"
                    value={form.address}
                    onChange={(event) => setForm({ ...form, address: event.target.value })}
                    required
                  />
                </label>
                <div className="checkout-form-row">
                  <label>
                    City
                    <input
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={(event) => setForm({ ...form, city: event.target.value })}
                      required
                    />
                  </label>
                  <label>
                    ZIP / postal code
                    <input
                      autoComplete="postal-code"
                      value={form.postalCode}
                      onChange={(event) => setForm({ ...form, postalCode: event.target.value })}
                      required
                    />
                  </label>
                </div>
                <label>
                  Country
                  <select
                    autoComplete="country-name"
                    value={form.country}
                    onChange={(event) => setForm({ ...form, country: event.target.value })}
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                </label>
                <button type="submit" className="btn btn-primary btn-block">
                  Place demo order · ${total.toFixed(2)}
                </button>
              </form>

              <aside className="checkout-summary" aria-label="Order summary">
                <h3>Your order</h3>
                <div className="checkout-items">
                  {cart.map((item) => (
                    <div className="checkout-item" key={item.id}>
                      <span className="checkout-item-icon" aria-hidden="true">{item.icon}</span>
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.flavour} · Qty {item.qty}</span>
                      </div>
                      <strong>${(item.price * item.qty).toFixed(2)}</strong>
                    </div>
                  ))}
                </div>
                <div className="checkout-totals">
                  <p><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></p>
                  <p><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></p>
                  <p className="checkout-grand-total"><strong>Total</strong><strong>${total.toFixed(2)}</strong></p>
                </div>
                <p className="checkout-demo-note">Demo only · No payment details are requested or stored.</p>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
