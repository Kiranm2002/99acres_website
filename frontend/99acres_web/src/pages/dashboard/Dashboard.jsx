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
import axiosInstance from "../../utils/axiosInstance";
import {Button} from "@mui/material"

const PropertyCard = ({ property }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };
  const formatPrice = (price) => {
  if (!price) return "";

  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(1)} Cr`;
  } else if (price >= 100000) {
    return `${(price / 100000).toFixed(0)} Lac`;
  } else {
    return `${price}`;
  }
};

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2.5,
        px: 2.5,
        pb: 2.5,
        border: "1px solid #eee",
        borderRadius: 2,
        mb: 2,
        backgroundColor: "#fff",
      }}
    >
      {/* Property Image */}
      <Box
        sx={{
          position: "relative",
          width: "175px",
          height: "118px",
          borderRadius: "8px",
          overflow: "hidden",
          flexShrink: 0,
          backgroundColor: "#f5f5f5",
        }}
      >
        <img
          src="https://imagecdn.99acres.com/microsite/wp-content/blogs.dir/6161/files/2025/01/white-and-brown-concrete-building-stockpack-pexels-320x180.jpg?1737463414000"
          alt="Property"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {!property?.isVerified && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "rgba(0,0,0,0.55)",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 600,
              px: 1,
              py: 0.3,
              borderRadius: "4px",
              fontFamily: "'Segoe UI', sans-serif",
            }}
          >
            Not Verified
          </Box>
        )}
      </Box>

      {/* Property Details */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "17px",
            fontWeight: 700,
            color: "#071c2c",
            mb: 0.4,
          }}
        >
          {property?.lookingFor} {property?.propertyType} {property?.category}
        </Typography>
        <Typography
          sx={{ fontSize: "13px", color: "#777", mb: 2 }}
        >
          in {property?.project?.name} {property?.subLocality?.name} {property?.city?.name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
          <Box>
            <Typography sx={{ fontSize: "12px", color: "#999" }}>Price</Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>₹ {formatPrice(property?.expectedPrice)}</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "12px", color: "#999" }}>Property ID</Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>{property?._id}</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "12px", color: "#999" }}>Duration</Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              Posted on {formatDate(property?.createdAt)}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          size="small"
          sx={{ mt: 2 }}
          onClick={() => window.open(`/post-property/property-dashboard/${property._id}`,"_blank")}
        >
          View
        </Button>
      </Box>
    </Box>
  );
}

const Dashboard = ({user,setUser}) => {
  const [showSecondaryNav, setShowSecondaryNav] = useState(false);
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const listingsRef = useRef(null);
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

// const filteredProperties = properties.filter((property) => {
//   const keyword = searchQuery.toLowerCase();

//   return (
//     property?.city?.name?.toLowerCase().includes(keyword) ||
//     property?.locality?.name?.toLowerCase().includes(keyword) ||
//     property?.subLocality?.name?.toLowerCase().includes(keyword) ||
//     property?.project?.name?.toLowerCase().includes(keyword)
//   );
// });

  //fectching user
  
  const filteredProperties = properties.filter((property) => {
  const keyword = searchQuery.toLowerCase();

  const searchableText = `
    ${property?.city?.name}
    ${property?.locality?.name}
    ${property?.subLocality?.name}
    ${property?.project?.name}
  `.toLowerCase();

  return searchableText.includes(keyword);
});
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get("/me"); 
        setUser(data.user); 
      } catch (err) {
        console.log("No user logged in or token invalid");
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  //fetching properties
   useEffect(() => {
  const fetchProperties = async () => {
    try {
      const { data } = await axiosInstance.get("/property/all-properties"); // endpoint relative to baseURL
      setProperties(data.properties); // assuming API returns { properties: [...] }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  fetchProperties();
}, []);

useEffect(() => {
  if (!searchQuery || filteredProperties.length === 0) return;

  const timer = setTimeout(() => {
    listingsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 1000);

  return () => clearTimeout(timer);
}, [searchQuery]);

  return (<>
    <SecondaryNavbar isHomePage={true} user={user} setUser={setUser} 
    show={showSecondaryNav}
     onSearch={setSearchQuery}
      resultsCount={filteredProperties.length}
      searchQuery={searchQuery}/>
    <Navbar isHomePage={true} user={user} setUser={setUser}  />
      <HeroSection searchRef={searchRef}
        hideSearch={showSecondaryNav} 
        onSearch={setSearchQuery}
        resultsCount={filteredProperties.length}
        searchQuery={searchQuery}/>
      <Box sx={{pt:"80px"}}><ExploreOptions/></Box>

      <Box
        sx={{display:"flex",
          gap:4, px:6, mt:14, alignItems:"flex-start",backgroundColor:"#fff"
        }}
      >
        <Box sx={{flex:3, minWidth:0, }}>
          <Box ref={listingsRef}>
          <Typography
            sx={{ fontSize: "26px", fontWeight: 700, color: "#071c2c", mb: 1, mt:2 }}
          >
            Your Listings
          </Typography>
          </Box>
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => <PropertyCard key={property._id} property={property} />)
          ) : (
            <p>No properties found.</p>
          )}
          
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

      {/* <RecommendedProperties/>
      <RecommendedProjects/>
      <ProjectsHighDemand/>
      <ExclusiveProjects/> */}
      <Footer/>
      
  </>
  )
};

export default Dashboard;