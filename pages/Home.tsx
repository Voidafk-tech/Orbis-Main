import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import CTA from '../components/CTA';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <hr className="border-t border-white/5 max-w-6xl mx-auto" />
      <Services />
      <hr className="border-t border-white/5 max-w-6xl mx-auto" />
      <CTA />
    </>
  );
};

export default Home;
