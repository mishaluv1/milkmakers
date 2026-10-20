import { useMemo, useState } from "react";
import { products } from "../data/siteData.js";
import ProductCard from "./ProductCard.jsx";

const FILTERS = [
  { id: "all", label: "Everything" },
  { id: "cookies", label: "Cookies" },
  { id: "tea", label: "Teas" },
  { id: "hydration", label: "Hydration" },
  { id: "bundle", label: "Bundles" },
];

function matches(product, filter) {
  if (filter === "all") return true;
  if (filter === "cookies") return product.id.startsWith("cookies");
  if (filter === "bundle") return product.id.startsWith("bundle");
  return product.id.startsWith(filter);
}

export default function Products({ onAdd, onQuickView }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesFilter = matches(product, filter);
      if (!matchesFilter) return false;
      if (!normalizedQuery) return true;

      const haystack = `${product.name} ${product.flavour} ${product.blurb}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [filter, search]);

  return (
    <section className="section shop" id="shop">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" aria-hidden="true" />
              The shelf
            </p>
            <h2 className="section-title">Small rituals, real ingredients.</h2>
          </div>
          <p className="section-lede">
            Every recipe is built with an IBCLC and dietitian, then baked in small
            batches. No proprietary blends, no miracle claims — just food that
            supports you.
          </p>
        </div>

        <div className="shop-shell">
          <aside className="shop-filters" aria-label="Product filters">
            <p className="shop-filters-label">Shop</p>
            <h3>Filter your finds</h3>

            <div className="filter-column" role="tablist" aria-label="Filter products">
              {FILTERS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === option.id}
                  className={`filter-chip${filter === option.id ? " is-active" : ""}`}
                  onClick={() => setFilter(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <label className="search-field" htmlFor="product-search">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <circle
                  cx="11"
                  cy="11"
                  r="5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M16 16L21 21"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products"
                aria-label="Search products"
              />
            </label>
          </aside>

          <div className="shop-results">
            <div className="shop-results-head">
              <p className="product-count">Showing {visible.length} of {products.length} products</p>
              <button type="button" className="text-button" onClick={() => {
                setFilter("all");
                setSearch("");
              }}>
                Reset filters
              </button>
            </div>

            <div className="product-grid">
              {visible.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={onAdd}
                  onQuickView={onQuickView}
                />
              ))}
            </div>

            {!visible.length && (
              <p className="empty-state">No products match "{search}" in this collection yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
