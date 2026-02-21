import { useEffect, useRef, useState } from "react";
import HeroSection from "../../components/home/HeroSection";
import SecondaryNavbar from "../../components/navbar/SecondaryNavbar";
import RecommendedProperties from "../../components/home/RecommendedProperties";
import RecommendedProjects from "../../components/home/RecommendedProjects";
import ProjectsHighDemand from "../../components/home/ProjectsHighDemand"
import ExclusiveProjects from "../../components/home/ExclusiveProjects"
import Footer from "../../components/home/Footer"


const Home = () => {
  const [showSecondaryNav, setShowSecondaryNav] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!searchRef.current) return;

      const rect = searchRef.current.getBoundingClientRect();

      if (rect.top <= 0) {
        setShowSecondaryNav(true);
      } else {
        setShowSecondaryNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Secondary Navbar */}
      <SecondaryNavbar show={showSecondaryNav} />

      {/* Hero Section */}
      <HeroSection
        searchRef={searchRef}
        hideSearch={showSecondaryNav}
      />

      <div
        style={{
          marginTop: showSecondaryNav ? "40px" : "120px",
          transition: "0.3s ease",
        }}
      >
        <RecommendedProperties />
      </div>
      <RecommendedProjects/>
      <ProjectsHighDemand/>
      <ExclusiveProjects/>
      <Footer/>
    </>
  );
};

export default Home;