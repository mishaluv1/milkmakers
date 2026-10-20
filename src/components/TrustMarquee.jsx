import { marqueeItems } from "../data/siteData.js";

export default function TrustMarquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section className="marquee" aria-label="What we promise">
      <div className="marquee-track">
        {items.map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`} aria-hidden={index >= marqueeItems.length}>
            <span className="marquee-star" aria-hidden="true">
              ✦
            </span>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
