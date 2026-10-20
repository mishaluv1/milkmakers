export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            Made for the fourth trimester
          </p>

          <h1 className="hero-title">
            Nourishment for the
            <em> blurry, beautiful</em> weeks.
          </h1>

          <p className="hero-lede">
            Cookies, teas and hydration built around the things that actually
            matter after birth: calories, fluids, and something delicious waiting
            in the cupboard at 3am.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#shop">
              Shop the essentials
            </a>
            <a className="btn btn-quiet" href="#story">
              Why we started
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <dl className="hero-stats">
            <div>
              <dt>12,000+</dt>
              <dd>parents nourished</dd>
            </div>
            <div>
              <dt>4.9/5</dt>
              <dd>from 5,300 reviews</dd>
            </div>
            <div>
              <dt>IBCLC</dt>
              <dd>formulated with</dd>
            </div>
          </dl>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-blob blob-a" />
          <div className="hero-blob blob-b" />

          <div className="hero-card hero-card-main">
            <div className="hero-card-top">
              <span className="pill pill-soft">Bestseller</span>
              <span className="hero-card-price">$22</span>
            </div>
            <div className="hero-cookie-art">
              <span className="cookie-chip chip-1" />
              <span className="cookie-chip chip-2" />
              <span className="cookie-chip chip-3" />
              <span className="cookie-chip chip-4" />
              <span className="cookie-chip chip-5" />
            </div>
            <p className="hero-card-name">Oatmeal Chocolate Chip</p>
            <p className="hero-card-meta">Brewer's yeast · flax · oats</p>
            <div className="hero-card-tags">
              <span>Nut-free</span>
              <span>Freezer fresh</span>
            </div>
          </div>

          <div className="hero-float hero-float-review">
            <div className="stars" aria-hidden="true">
              ★★★★★
            </div>
            <p>“The 3am cookie is real.”</p>
            <span>— Mia, verified buyer</span>
          </div>

          <div className="hero-float hero-float-note">
            <span className="note-icon" aria-hidden="true">
              ✦
            </span>
            <div>
              <strong>One-handed</strong>
              <span>snackable by design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
