import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';

const LandingPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div id="hero"><Hero /></div>
      <div id="features"><Features /></div>
      <div id="how-it-works"><HowItWorks /></div>
      <div id="pricing"><Pricing /></div>
      <div id="faq"><FAQ /></div>
    </motion.div>
  );
};

export default LandingPage;
