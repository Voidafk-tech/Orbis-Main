import React from 'react';
import Hero from '../components/sections/Hero';
import HeroSequence from '../components/sections/HeroSequence';
import ScrollCue from '../components/ScrollCue';
import TrustStrip from '../components/sections/TrustStrip';
import Pains from '../components/sections/Pains';
import WhyOrbis from '../components/sections/WhyOrbis';
import Services from '../components/sections/Services';
import Steps from '../components/sections/Steps';
import Pricing from '../components/sections/Pricing';
import TaxExplainer from '../components/sections/TaxExplainer';
import Trust from '../components/sections/Trust';
import Faq from '../components/sections/Faq';
import Intake from '../components/sections/Intake';

/**
 * The order is the argument: problem, differentiation, offer, process,
 * plans, education, proof, objections, action.
 */
const Home: React.FC = () => (
  <>
    <Hero />
    <TrustStrip />
    <ScrollCue />
    <HeroSequence />
    <Pains />
    <WhyOrbis />
    <Services />
    <Steps />
    <Pricing />
    <TaxExplainer />
    <Trust />
    <Faq />
    <Intake />
  </>
);

export default Home;
