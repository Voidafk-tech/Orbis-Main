import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <Pricing
        compact
        hidePrice
        subheading="Plans that flex with your business, from monthly bookkeeping to annual compliance. Every quote is custom, with no setup fees and no surprises."
      />
      <Contact />
    </>
  );
};

export default Home;
