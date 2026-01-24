import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Pricing from '../components/Pricing';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <Pricing />
      <Process />
      <FAQ />
      <CTA />
    </>
  );
};

export default Home;