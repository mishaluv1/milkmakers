const PILLARS = [
  {
    number: "01",
    title: "Formulated, not guessed",
    body: "Every recipe is developed alongside an IBCLC and a registered dietitian. Ingredients are listed in full — including why they're there.",
  },
  {
    number: "02",
    title: "Food first, always",
    body: "Calories, fluids and steady energy do more for a postpartum body than any supplement trend. We start there and stop when it tastes good.",
  },
  {
    number: "03",
    title: "Built for one-handed",
    body: "Resealable packs, freezer-friendly batches, no crumbs-in-the-duvet drama. Designed around the way you actually eat at 3am.",
  },
];

export default function Story() {
  return (
    <section className="section story" id="story">
      <div className="container story-grid">
        <div className="story-visual" data-reveal aria-hidden="true">
          <div className="story-photo">
            <div className="story-photo-grain" />
            <div className="story-photo-inner">
              <span className="story-photo-quote">“Eat something. Drink water. Sleep when you can.”</span>
              <span className="story-photo-caption">— the only postpartum plan that survives contact</span>
            </div>
          </div>
          <div className="story-badge">
            <strong>Since 2011</strong>
            <span>in the fourth trimester</span>
          </div>
        </div>

        <div className="story-copy" data-reveal>
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            Our story
          </p>
          <h2 className="section-title">
            Started by two mums who were very, very hungry.
          </h2>
          <p className="story-lede">
            Milkmakers began in a kitchen in 2011 with a batch of oatmeal cookies
            and a simple frustration: the postpartum aisle was full of promises and
            short on food. Fifteen years later we still bake in small batches, still
            list every ingredient, and still answer every email ourselves.
          </p>

          <ol className="pillar-list">
            {PILLARS.map((pillar) => (
              <li key={pillar.number} className="pillar">
                <span className="pillar-number" aria-hidden="true">
                  {pillar.number}
                </span>
                <div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <a className="btn btn-primary" href="#shop">
            Shop the shelf
          </a>
        </div>
      </div>
    </section>
  );
}
