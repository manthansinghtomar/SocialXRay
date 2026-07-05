import React from 'react';
import LandingNavbar from '../../components/common/LandingNavbar';
import HeroSection from '../../components/common/HeroSection';
import SupportedPlatforms from '../../components/common/SupportedPlatforms';
import WhySection from '../../components/common/WhySection';
import HowItWorks from '../../components/common/HowItWorks';
import FeaturesGrid from '../../components/common/FeaturesGrid';
import DashboardPreview from '../../components/common/DashboardPreview';
import TechStack from '../../components/common/TechStack';
import CTASection from '../../components/common/CTASection';
import LandingFooter from '../../components/common/LandingFooter';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden relative selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Dynamic Cyber Gradient Glow Background Highlights */}
      <div className="absolute top-0 right-0 -z-20 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-100px] -z-20 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-100px] -z-20 h-[600px] w-[600px] rounded-full bg-indigo-650/5 blur-[130px] pointer-events-none" />

      {/* Landing Navbar */}
      <LandingNavbar />

      {/* Landing Page Content Sections */}
      <HeroSection />
      
      <SupportedPlatforms />
      
      <WhySection />
      
      <HowItWorks />
      
      <FeaturesGrid />
      
      <DashboardPreview />
      
      <TechStack />
      
      <CTASection />

      {/* Landing Page Footer */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
