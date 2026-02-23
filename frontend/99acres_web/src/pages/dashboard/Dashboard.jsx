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
      <RecommendedProperties/>
      <RecommendedProjects/>
      <ProjectsHighDemand/>
      <ExclusiveProjects/>
      <Footer/>
      
  </>
  )
};

export default Dashboard;