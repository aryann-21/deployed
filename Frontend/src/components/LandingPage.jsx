import HeroSection from "./HeroSection"
import HowItWorksSection from "./HowItWorksSection"
import Footer from "./Footer"
import AboutUsSection from "./AboutUsSection"

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      {/* <FeaturesSection /> */}
      <HowItWorksSection />
      <AboutUsSection />
      <Footer />
    </div>
  )
}

export default LandingPage

