import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SchemesPreview from "@/components/SchemesPreview";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <SchemesPreview />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
