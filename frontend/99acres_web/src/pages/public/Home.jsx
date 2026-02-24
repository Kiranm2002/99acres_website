import { useEffect, useRef, useState } from "react";
import HeroSection from "../../components/home/HeroSection";
import SecondaryNavbar from "../../components/navbar/SecondaryNavbar";
import RecommendedProperties from "../../components/home/RecommendedProperties";
import RecommendedProjects from "../../components/home/RecommendedProjects";
import ProjectsHighDemand from "../../components/home/ProjectsHighDemand"
import ExclusiveProjects from "../../components/home/ExclusiveProjects"
import Footer from "../../components/home/Footer"
import Navbar from "../../components/navbar/Navbar";
import GuestUserCard from "../../components/home/GuestUserCard";
import PromoCard from "../../components/home/PromoCard";
import { Box } from "@mui/material";

const Home = ({user,setUser}) => {
  // const [user,setUser] = useState(null)
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
      <SecondaryNavbar show={showSecondaryNav} user={user} setUser={setUser} />

      <Navbar isHomePage={true} user={user} setUser={setUser} />
      {/* Hero Section */}
      <HeroSection
        searchRef={searchRef}
        hideSearch={showSecondaryNav}
      />
      <Box
        sx={{display:"flex",
          gap:4, px:6, mt:14, alignItems:"flex-start"
        }}
      >
        <Box sx={{flex:3, minWidth:0}}>
          
        <RecommendedProperties />
        <RecommendedProjects/>
        <ProjectsHighDemand/>
        <ExclusiveProjects/>
        
      
        </Box>
        <Box
          sx={{flex:1,position:"sticky",top:80,alignSelf:"flex-start",height:"fit-content"}}
        >
          <Box sx={{flex:1, display:"flex", flexDirection:"column",gap:3}}>
            <GuestUserCard user={user} setUser={setUser} show={showSecondaryNav}/>
            <PromoCard/>
            </Box>
          </Box>
        </Box>
        
      
      
      {/* <div
        style={{
          marginTop: showSecondaryNav ? "40px" : "120px",
          transition: "0.3s ease",
        }}
      >
        <RecommendedProperties />
      </div> */}
      {/* <RecommendedProjects/>
      <ProjectsHighDemand/>
      <ExclusiveProjects/> */}
      <Footer/>
    </>
  );
};

export default Home;