// Contact and demo request. The address never shows on the page and is not
// in any link; it is put together only when someone clicks, which also keeps
// it away from address-harvesting bots.

const openMail = (user, domain, subject) => {
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  window.location.href = `mailto:${user}@${domain}${q}`;
};

export default function Contact({ email, linkedin }) {
  const [user, domain] = (email || '').split('@');
  const ready = Boolean(user && domain);

  return (
    <section id="contact" className="contact relative z-10 w-full">
      <div className="contact__card">
        <h2 data-dots-clear className="section-title text-amatus-red text-center">Book a demo</h2>
        <p className="contact__line">Want to see Amatus up close? Write to us.</p>

        <div className="hero-actions">
          <button
            type="button"
            className="pill pill--solid"
            disabled={!ready}
            onClick={() => openMail(user, domain, 'Demo request')}
          >
            Book a demo
          </button>
          <button
            type="button"
            className="pill pill--outline"
            disabled={!ready}
            onClick={() => openMail(user, domain)}
          >
            Contact us
          </button>
        </div>

        {linkedin && (
          <a className="contact__link" href={linkedin} target="_blank" rel="noreferrer">
            Amatus on LinkedIn
          </a>
        )}
      </div>
    </section>
  );
}
