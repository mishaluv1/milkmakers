import { useEffect, useRef, useState } from "react";
import { testimonials } from "../data/siteData.js";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const total = testimonials.length;
  const go = (next) => setIndex((next + total) % total);

  useEffect(() => {
    if (paused) return;
    timer.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 7000);
    return () => window.clearInterval(timer.current);
  }, [paused, total]);

  const active = testimonials[index];

  return (
    <section
      className="section reviews"
      id="reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container">
        <div className="reviews-head" data-reveal>
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            From the group chat
          </p>
          <h2 className="section-title">5,300 reviews, mostly written one-handed.</h2>
        </div>

        <div className="review-stage" data-reveal aria-live="polite">
          <figure className="review-card" key={active.name}>
            <div className="stars stars-lg" aria-label={`${active.stars} out of 5 stars`}>
              {"★".repeat(active.stars)}
            </div>
            <blockquote>{active.quote}</blockquote>
            <figcaption>
              <span className="review-avatar" aria-hidden="true">
                {active.name.charAt(0)}
              </span>
              <span>
                <strong>{active.name}</strong>
                <em>{active.detail}</em>
              </span>
            </figcaption>
          </figure>

          <div className="review-controls">
            <button
              type="button"
              className="round-button"
              onClick={() => go(index - 1)}
              aria-label="Previous review"
            >
              ←
            </button>

            <div className="review-dots">
              {testimonials.map((testimonial, dotIndex) => (
                <button
                  key={testimonial.name}
                  type="button"
                  className={`dot${dotIndex === index ? " is-active" : ""}`}
                  onClick={() => setIndex(dotIndex)}
                  aria-label={`Show review from ${testimonial.name}`}
                  aria-current={dotIndex === index}
                />
              ))}
            </div>

            <button
              type="button"
              className="round-button"
              onClick={() => go(index + 1)}
              aria-label="Next review"
            >
              →
            </button>
          </div>
        </div>

        <div className="review-strip" data-reveal>
          <div>
            <strong>4.9</strong>
            <span>average rating</span>
          </div>
          <div>
            <strong>96%</strong>
            <span>would buy again</span>
          </div>
          <div>
            <strong>30 days</strong>
            <span>happiness promise</span>
          </div>
          <div>
            <strong>2 days</strong>
            <span>average delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
