import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import { shouldShowIntro } from './components/introGate';
import SiteHeader from './components/SiteHeader';
import ValuesMark from './components/ValuesMark';
import MagnetDots from './components/MagnetDots';
import TeamCard from './components/TeamCard';
import Contact from './components/Contact';
import Footer from './components/Footer';

const img = (name) => `${import.meta.env.BASE_URL}img/${name}`;

// ---- Content: fill the empty strings and the site picks them up ----
const CONTACT = {
  email: ['ofeksz12', 'gmail.com'].join('@'), // assembled so the plain address is not in the page source
  linkedin: 'https://www.linkedin.com/company/amatus-online/',
};

const values = ['Speed', 'Accuracy', 'Care'];

const teamMembers = [
  { name: 'Ofek Bar', role: 'Founder', photo: img('ofek.jpg') },
  { name: 'Yoel Zajdner', role: 'Founding Designer', photo: img('yoel.jpg') },
];

const headerLinks = [
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];
// --------------------------------------------------------------------

function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 z-0">
        <MagnetDots baseColor="#d9393f" activeColor="#ffffff" dotSize="4px" radius={210} />
      </div>

      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}

      <div
        className={`relative z-10 flex-grow transition-opacity duration-500 ${showIntro ? 'opacity-0' : 'opacity-100'}`}
      >
        <SiteHeader logo={img('logo.png')} links={headerLinks} />

        <main className="flex flex-col items-center w-full">
          <section
            id="top"
            className="container mx-auto px-6 min-h-screen flex flex-col justify-center items-center relative z-10 py-32"
          >
            <div data-dots-clear="40" className="hero-zone">
            <h1 className="hero-title text-amatus-red text-center">Revolutionizing Blood Draws with Autonomous Robotics</h1>

            <ValuesMark values={values} start={!showIntro} />

            <div className="hero-actions">
              <a href="#contact" className="pill pill--solid">
                Book a demo
              </a>
              <a href="#contact" className="pill pill--outline">
                Contact us
              </a>
            </div>
            </div>
          </section>

          <section id="team" className="container mx-auto px-6 py-24 relative z-10">
            <h2 data-dots-clear className="section-title text-amatus-red text-center">Our Team</h2>
            <ul className="team-grid">
              {teamMembers.map((m, i) => (
                <li key={i}>
                  <TeamCard {...m} />
                </li>
              ))}
            </ul>
          </section>

          <Contact email={CONTACT.email} linkedin={CONTACT.linkedin} />
        </main>
      </div>
      <Footer logo={img('logo.png')} linkedin={CONTACT.linkedin} />
    </div>
  );
}

export default App;
