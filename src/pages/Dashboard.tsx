
import React from 'react';
import HeroSection from '../components/HeroSection';
import ModelGallery from '../components/ModelGallery';
import InferenceSection from '../components/InferenceSection';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ModelGallery />
      <InferenceSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Dashboard;

