import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import React from "react";
import HeroSection from "../../components/home/HeroSection";
import ExploreOptions from "./ExploreOptions";
import Footer from "../../components/home/Footer";
import { useState,useEffect,useRef } from "react";
import RecommendedProperties from "../../components/home/RecommendedProperties"
import RecommendedProjects from "../../components/home/RecommendedProjects";
import ProjectsHighDemand from "../../components/home/ProjectsHighDemand";
import ExclusiveProjects from "../../components/home/ExclusiveProjects";
import Navbar from "../../components/navbar/Navbar";
import SecondaryNavbar from "../../components/navbar/SecondaryNavbar";
import GuestUserCard from "../../components/home/GuestUserCard";
import PromoCard from "../../components/home/PromoCard";

const Dashboard = ({user,setUser}) => {
  const [showSecondaryNav, setShowSecondaryNav] = useState(false);
  // const [user, setUser] = useState(null);
    const searchRef = useRef(null);
  // const user = {
  //   firstName: "Kiran",
  //   lastName: "M"
  // };
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

  return (<>
    <SecondaryNavbar isHomePage={true} user={user} setUser={setUser} show={showSecondaryNav}/>
    <Navbar isHomePage={true} user={user} setUser={setUser}  />
      <HeroSection searchRef={searchRef}
        hideSearch={showSecondaryNav} />
      <Box sx={{pt:"80px"}}><ExploreOptions/></Box>

      {/* <Box
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
        </Box> */}

      <RecommendedProperties/>
      <RecommendedProjects/>
      <ProjectsHighDemand/>
      <ExclusiveProjects/>
      <Footer/>
      
  </>
  )
};

export default Dashboard;