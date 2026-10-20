export default function Toast({ message }) {
  return (
    <div className={`toast${message ? " is-visible" : ""}`} role="status" aria-live="polite">
      <span className="toast-dot" aria-hidden="true" />
      {message || ""}
    </div>
  );
}
