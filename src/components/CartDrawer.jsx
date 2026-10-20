import { useRef, useEffect } from "react";

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartDrawer({
  open,
  cart,
  subtotal,
  remaining,
  progress,
  onClose,
  onQty,
  onRemove,
  onCheckout,
}) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
  }, [open]);

  const handleBackdrop = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className={`drawer-backdrop${open ? " is-open" : ""}`}
      onClick={handleBackdrop}
      aria-hidden={!open}
    >
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="drawer-head">
          <div>
            <h2>Your bag</h2>
            <p className="drawer-sub">
              {cart.length ? `${cart.length} line item${cart.length > 1 ? "s" : ""}` : "Nothing here yet"}
            </p>
          </div>
          <button
            type="button"
            className="round-button"
            onClick={onClose}
            aria-label="Close bag"
            ref={closeRef}
          >
            ✕
          </button>
        </div>

        {cart.length > 0 && (
          <div className="ship-meter">
            <p>
              {remaining > 0 ? (
                <>
                  You're <strong>${remaining.toFixed(2)}</strong> away from free shipping.
                </>
              ) : (
                <>Free shipping unlocked ✦</>
              )}
            </p>
            <div className="ship-bar" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="drawer-body">
          {cart.length === 0 && (
            <div className="drawer-empty">
              <span aria-hidden="true">🍪</span>
              <p>Your bag is empty — the cookies are waiting.</p>
              <button type="button" className="btn btn-primary" onClick={onClose}>
                Browse the shelf
              </button>
            </div>
          )}

          {cart.map((line) => (
            <div className="cart-line" key={line.id}>
              <div
                className="cart-thumb"
                style={{ "--tone-a": line.palette[0], "--tone-b": line.palette[1] }}
                aria-hidden="true"
              >
                {line.icon}
              </div>

              <div className="cart-line-body">
                <p className="cart-line-name">{line.name}</p>
                <p className="cart-line-flavour">{line.flavour}</p>

                <div className="cart-line-controls">
                  <div className="qty">
                    <button
                      type="button"
                      onClick={() => onQty(line.id, -1)}
                      aria-label={`Decrease quantity of ${line.flavour}`}
                    >
                      −
                    </button>
                    <span aria-live="polite">{line.qty}</span>
                    <button
                      type="button"
                      onClick={() => onQty(line.id, 1)}
                      aria-label={`Increase quantity of ${line.flavour}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => onRemove(line.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <p className="cart-line-price">${(line.price * line.qty).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="drawer-foot">
          <div className="drawer-total">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <p className="drawer-fine">
            Taxes calculated at checkout. Free shipping over ${FREE_SHIPPING_THRESHOLD}.
          </p>
          <button
            type="button"
            className="btn btn-primary btn-block"
            disabled={!cart.length}
            onClick={(event) => {
              event.currentTarget.blur();
              onCheckout();
            }}
          >
            Checkout
          </button>
          <button type="button" className="text-button text-button-center" onClick={onClose}>
            Keep browsing
          </button>
        </div>
      </aside>
    </div>
  );
}
