import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setError("That doesn't look like a valid email address.");
      return;
    }

    setError("");
    setDone(true);
    setEmail("");
  };

  return (
    <section className="section newsletter" id="newsletter">
      <div className="container newsletter-inner" data-reveal>
        <div className="newsletter-copy">
          <p className="eyebrow eyebrow-light">
            <span className="eyebrow-line" aria-hidden="true" />
            The night feed dispatch
          </p>
          <h2 className="section-title">One useful email a month. No bump photos.</h2>
          <p>
            Restock alerts, honest postpartum reading, and the occasional recipe.
            Unsubscribe in one click — we know you're busy.
          </p>
        </div>

        <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="newsletter-email" className="visually-hidden">
            Email address
          </label>
          <div className="newsletter-row">
            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError("");
                if (done) setDone(false);
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "newsletter-error" : undefined}
              autoComplete="email"
            />
            <button className="btn btn-light" type="submit">
              Subscribe
            </button>
          </div>

          {error && (
            <p className="newsletter-error" id="newsletter-error" role="alert">
              {error}
            </p>
          )}
          {done && !error && (
            <p className="newsletter-success" role="status">
              You're on the list. Check your inbox for a small hello.
            </p>
          )}
          <p className="newsletter-fine">
            Demo form — nothing is submitted or stored anywhere.
          </p>
        </form>
      </div>
    </section>
  );
}
