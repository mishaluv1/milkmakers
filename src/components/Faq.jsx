import { useState } from "react";
import { faqs } from "../data/siteData.js";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <div className="faq-intro" data-reveal>
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            Straight answers
          </p>
          <h2 className="section-title">Questions we get every single day.</h2>
          <p className="section-lede">
            Still unsure? Write to{" "}
            <a href="mailto:hello@milkmakers.example">hello@milkmakers.example</a> —
            a real person replies within one working day.
          </p>
        </div>

        <div className="faq-list" data-reveal>
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <div className={`faq-item${isOpen ? " is-open" : ""}`} key={item.q}>
                <h3>
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-trigger-${index}`}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  className="faq-panel"
                  hidden={!isOpen}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
