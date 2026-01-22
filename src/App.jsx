import React, { useState, useEffect } from 'react';
import IntroScreen from './components/IntroScreen';
import StaggeredMenu from './components/StaggeredMenu';
import PixelCard from './components/PixelCard';
import ReflectiveCard from './components/ReflectiveCard';
import MagnetDots from './components/MagnetDots';
import Footer from './components/Footer';
import './index.css';
import './index.css';
import logoHorizontal from '/assets/logo-horizontal.png?inline';

// Image imports
import ofekImg from '/assets/ofek.png?inline';
import yoelImg from '/assets/yoel.jpg?inline';
import otherImg from '/assets/other.jpg?inline';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'Team', ariaLabel: 'Meet the team', link: '#team' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  // Dummy data for personnel
  const teamMembers = [
    {
      name: "OFEK BAR",
      role: "FOUNDER",
      idNumber: "8901-2345-6789",
      color: "#d9393f",
      imageUrl: ofekImg
    },
    {
      name: "YOEL ZAJDNER",
      role: "LEAD DESIGN",
      idNumber: "7721-9988-1122",
      color: "#ffffff",
      imageUrl: yoelImg
    },
    {
      name: "OTHER GUY",
      role: "OTHER GUY",
      idNumber: "4455-6677-8899",
      color: "#d9393f",
      imageUrl: otherImg
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Interactive Background */}
      <div className="fixed inset-0 z-0">
        <MagnetDots
          containerSize="100vw"
          style={{ height: '100vh' }}
          baseColor="#d9393f"
          activeColor="#ffffff"
          dotSize="4px"
          radius={210}
        />
      </div>

      {showIntro && (
        <IntroScreen onComplete={() => setShowIntro(false)} />
      )}

      {/* Main Content */}
      <div className={`relative z-10 flex-grow transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#d9393f"
          openMenuButtonColor="#d9393f"
          logoUrl={logoHorizontal}
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />


        <main className="flex flex-col items-center justify-center w-full">

          <section className="container mx-auto px-4 min-h-screen flex flex-col justify-center items-center relative z-10">
            <h1 className="text-6xl text-amatus-red mb-12 text-center" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>
              Be Safe With Us
            </h1>

            {/* Pixel Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <PixelCard variant="amatus" className="bg-white shadow-lg">
                <div className="pixel-card-content">
                  <h3 className="text-2xl font-bold text-amatus-red mb-2" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Analysis</h3>
                </div>
              </PixelCard>
              <PixelCard variant="amatus" className="bg-white shadow-lg">
                <div className="pixel-card-content">
                  <h3 className="text-2xl font-bold text-amatus-red mb-2" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Speed</h3>
                </div>
              </PixelCard>
              <PixelCard variant="amatus" className="bg-white shadow-lg">
                <div className="pixel-card-content">
                  <h3 className="text-2xl font-bold text-amatus-red mb-2" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Accuracy</h3>
                </div>
              </PixelCard>
              <PixelCard variant="amatus" className="bg-white shadow-lg">
                <div className="pixel-card-content">
                  <h3 className="text-2xl font-bold text-amatus-red mb-2" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Care</h3>
                </div>
              </PixelCard>
            </div>
          </section>

          {/* Personnel Section */}
          <section id="team" className="container mx-auto px-4 py-20">
            <h2 className="text-5xl text-white mb-16 text-center" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 300 }}>
              Our Team
            </h2>
            <div className="flex flex-wrap justify-center gap-10">
              {teamMembers.map((member, index) => (
                <ReflectiveCard
                  key={index}
                  name={member.name}
                  role={member.role}
                  idNumber={member.idNumber}
                  color={member.color}
                  imageUrl={member.imageUrl}
                  blurStrength={2} // Low blur as requested
                  overlayColor="rgba(217, 57, 63, 0.1)" // Slight red tint
                />
              ))}
            </div>
          </section>

        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
