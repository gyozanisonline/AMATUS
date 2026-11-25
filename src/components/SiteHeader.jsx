// Logo left, two section links right. Three sections need no menu.

export default function SiteHeader({ logo, links }) {
  return (
    <header className="site-header">
      <a href="#top" className="site-header__logo" aria-label="Amatus, back to top" data-dots-clear="12">
        <img src={logo} alt="Amatus" width="1490" height="190" />
      </a>
      <nav className="site-header__nav" aria-label="Sections" data-dots-clear="12">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
