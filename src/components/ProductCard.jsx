import { useState } from "react";

export default function ProductCard({ product, onAdd, onQuickView }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="product-card">
      <div
        className="product-media"
        style={{
          "--tone-a": product.palette[0],
          "--tone-b": product.palette[1],
        }}
      >
        <span className="product-art" aria-hidden="true">
          {product.icon}
        </span>
        {product.badge && <span className="pill product-badge">{product.badge}</span>}
        <span className="product-shine" aria-hidden="true" />
      </div>

      <div className="product-body">
        <div className="product-rating">
          <span className="stars" aria-hidden="true">
            ★★★★★
          </span>
          <span>
            {product.rating.toFixed(1)} · {product.reviews.toLocaleString()} reviews
          </span>
        </div>

        <h3 className="product-name">{product.name}</h3>
        <p className="product-flavour">{product.flavour}</p>
        <p className="product-blurb">{product.blurb}</p>

        <div className="product-footer">
          <p className="product-price">
            ${product.price}
            {product.compareAt && <s>${product.compareAt}</s>}
          </p>

          <div className="product-actions">
            <button type="button" className="text-button" onClick={() => onQuickView(product)}>
              Quick view
            </button>
            <button
              type="button"
              className={`btn btn-add${added ? " is-added" : ""}`}
              onClick={handleAdd}
            >
              {added ? "Added ✓" : "Add to bag"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
