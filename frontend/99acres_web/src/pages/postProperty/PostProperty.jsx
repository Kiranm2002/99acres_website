import React, { useState } from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Container,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Radio,
  RadioGroup,
  FormControlLabel,TextField,Link
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AppDrawer from "../../components/common/AppDrawer";
import AuthModal from "../../components/auth/AuthModal";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import HouseIcon from '@mui/icons-material/House';
import Footer from "../../components/home/Footer";
import { useNavigate } from "react-router-dom";
  import PostNavbar from "./PostNavbar";


const PostProperty = ({user,setUser,onOpenLogin}) => {
  // console.log(user)
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lookingFor, setLookingFor] = useState("Sell");
  const [propertyCategory, setPropertyCategory] = useState("Residential");
  const [propertyType, setPropertyType] = useState("Farmhouse");
  const [openAuth, setOpenAuth] = useState(false);
  const [authRedirect, setAuthRedirect] = useState(null);
  const navigate = useNavigate();

  const steps = [
    {
        title: "Add details of your property",
        description: "Begin by telling us the few basic details about your property like your property type, location, No. of rooms etc",
        icon: <DescriptionIcon sx={{ fontSize: 40, color: "#1976d2" }} />
    },
    {
        title: "Upload Photos & Videos",
        description: "Upload photos and videos of your property either via your desktop device or from your mobile phone",
        icon: <PhotoLibraryIcon sx={{ fontSize: 40, color: "#1976d2" }} />
    },
    {
        title: "Add Pricing & Ownership",
        description: "Just update your property’s ownership details and your expected price and your property is ready for posting",
        icon: <HouseIcon sx={{ fontSize: 40, color: "#1976d2" }} />
    }
    ];

    const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (<>
    <Box sx={{position:"relative",pb:2}}>
    <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "80vh", borderRadius:6}}>
      
      {/* ================= NAVBAR ================= */}
      <PostNavbar onLoginClick={() => setOpenAuth(true)} user={user} setUser={setUser}/>
      

      {/* ================= MAIN SECTION ================= */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", gap: 6, alignItems:"flex-start" }}>

          {/* ========== LEFT SIDE ========== */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ fontSize: 36, fontWeight: 700, mb: 0.5 }}
            >
              Sell or Rent Property
            </Typography>

            <Typography
              sx={{ fontSize: 36, fontWeight: 700, color: "#1976d2", mb: 1.5, }}
            >
              online faster with 99acres.com
            </Typography>

            <Box sx={{ mb: 2 }}>
              {[
                "Advertise for FREE",
                "Get unlimited enquiries",
                "Get shortlisted buyers and tenants",
                "Assistance in co-ordinating site visits"
              ].map((item, index) => (
                <Box key={index}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb:"1px"
                    }}
                >
                    <CheckIcon sx={{color:"success.main",fontSize:20,mr:1, mb:2}}/>
                    <Typography key={index} sx={{ mb: 1.5, fontSize: 18, fontWeight:600 }}>
                   {item}
                   {(item === "Get shortlisted buyers and tenants" ||
                        item === "Assistance in co-ordinating site visits") && (
                        <Box
                            component="span"
                            sx={{
                            color: "#1976d2",
                            ml: 0.5,
                            fontWeight: 700
                            }}
                        >
                            *
                        </Box>
                        )}
                    </Typography>
                </Box>
                
              ))}
            </Box>
              <Box sx={{ flex: 1, display: "flex", alignItems: "flex-start" }}>
                <img
                src="https://static.99acres.com/universalapp/img/Desktop_Animation_compress.gif"
                alt="property animation"
                style={{ width: "100%", maxWidth: 900, mb:4 }}
                />
             </Box>
          </Box>

          {/* ========== RIGHT SIDE FORM ========== */}
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              p: 4,
              borderRadius: "4px",
              backgroundColor: "#fff",maxWidth:"450px"
            }}
          >
            <Typography sx={{ fontSize: 22, fontWeight: 500, mb: 2 }}>
              Start posting your property, it’s free
            </Typography>

            <Typography sx={{ fontSize: 14, mb: 3 }}>
              Add Basic Details
            </Typography>

            {/* Looking For */}
            <Typography sx={{ mb: 1, color:"#000",fontWeight:600 }}>
              You're looking to ...
            </Typography>

            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
            >
              {["Sell", "Rent / Lease", "PG"].map((type,index) => (
                    <Button
                    key={index}
                    variant="outlined"
                    onClick={() => setPropertyType(type)}
                    // value={item}
                    sx={{
                        borderRadius: 5,
                        textTransform: "none",
                        fontSize: 13,
                        borderColor: "#d0d5dd",
                        color: "#555",
                        backgroundColor: propertyType === type ? "#e3f2fd" : "#f8f9fb",
                        "&:hover": {
                            backgroundColor: "#e3f2fd"
                        }
                    }}
                    >
                    {type}
                    </Button>
                ))}
            </Box>

            {/* Property Category */}
            <Typography sx={{ mb: 1,mt:2, color:"#000", fontWeight:600 }}>
              And it's a ...
            </Typography>

            <RadioGroup
              row
              value={propertyCategory}
              onChange={(e) => setPropertyCategory(e.target.value)}
              sx={{ mb: 2 }}
            >
              <FormControlLabel
                value="Residential"
                control={<Radio />}
                label="Residential"
              />
              <FormControlLabel
                value="Commercial"
                control={<Radio />}
                label="Commercial"
              />
            </RadioGroup>

            {/* Property Types */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {[
                "Flat/Apartment",
                "Independent House / Villa",
                "Builder Floor",
                "Plot / Land",
                "1 RK/ Studio Apartment",
                "Serviced Apartment",
                "Farmhouse",
                "Other"
              ].map((type, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => setPropertyType(type)}
                  sx={{
                    borderRadius: 5,
                    textTransform: "none",
                    fontSize: 13,
                    borderColor: "#d0d5dd",
                    color: "#555",
                    backgroundColor: propertyType === type ? "#e3f2fd" : "#f8f9fb",
                    "&:hover": {
                        backgroundColor: "#e3f2fd"
                    }
                  }}
                >
                  {type}
                </Button>
              ))}
            </Box>
            <Typography
            sx={{
                mt: 4,
                mb: 2,
                fontWeight: 600,
                fontSize: 17,
                color: "#1f2937"
            }}
            >
            Your contact details for the buyer to reach you
            </Typography>

            <TextField
            fullWidth
            placeholder="Phone Number"
            variant="outlined"
            size="small" InputProps={{style:{borderRadius:"4px"}}}
            />
            <Typography
            sx={{ fontSize: 13, mt: 1, color: "#666" }}
            >
            Are you a registered user?{" "}
            <Box
                component="span"
                sx={{ color: "#1976d2", cursor: "pointer", fontWeight: 500 }}
                onClick={() => setOpenAuth(true)}   
            >
                Login
            </Box>
            </Typography>

            {/* Continue Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={()=>{
                const accessToken = localStorage.getItem("accessToken")
                if(accessToken){
                  navigate("/post-property/primary-details")
                }else{
                  setAuthRedirect("/post-property/primary-details");
                  setOpenAuth(true)
                }
                }}
              sx={{
                mt: 4,
                py: 1.5,
                backgroundColor: "#1976d2",
                textTransform: "none",
                fontSize: 16,
                fontWeight:600,
                borderRadius:"4px"
              }}
            >
              Start Now
            </Button>
          </Paper>
        </Box>
      </Container>
      <AuthModal
              open={openAuth}
              handleClose={() => setOpenAuth(false)}
              setUser={setUser}
              redirectPath={authRedirect}
            />
    </Box>
    <Button
    variant="outlined"
    sx={{
      position: "absolute",
      bottom: -6,  // half outside (adjust px as needed)
      left: "50%",
      transform: "translateX(-50%)",
      borderRadius: "9999px",  // pill shape
      px: 3,
      py: 1,
      textTransform: "none",
      boxShadow: "none",
      backgroundColor: "#fff",
      color: "#1976d2",
      borderColor: "#1976d2",
      "&:hover": {
        backgroundColor: "#e3f2fd",
        borderColor: "#1976d2",
      }
    }}
  >
    Know More <KeyboardArrowDownIcon />
  </Button>

  
 </Box> 
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 8, px: 2, textAlign: "center" }}>
  <Typography
    variant="subtitle2"
    sx={{
      fontWeight: 600,
      color: "#6b7280", 
      mb: 1,
      
      letterSpacing: 2,
      textTransform: "uppercase",
      fontSize: 14
    }}
  >
    HOW TO POST
  </Typography>

  <Typography variant="h4" component="h2"
    sx={{ fontWeight: 800, color: "#0b1349", mb: 2, lineHeight: 1 }}
  >
    Post Your Property in 
  </Typography>
  <Typography variant="h4" component="h2"
    sx={{ fontWeight: 800, color: "#0b1349", mb: 3, lineHeight: 1 }}
  >
    3 Simple Steps 
  </Typography>
</Box>
    <Box
        sx={{
            maxWidth: 1100,
            mx: "auto", // center horizontally
            mt: 8,
            px: 2,
            display: "flex",
            justifyContent: "space-between",
            gap: 3,
            flexWrap: "wrap" 
        }}
        >
            {steps.map((step, i) => (
                <Box
                key={i}
                sx={{
                    flex: "1 1 30%",
                    minWidth: 260,
                    textAlign: "left",       // Align everything left
                    px: 2,
                    mb: 4
                }}
                >
                {/* 1. Icon top-left */}
                <Box sx={{ mb:1 }}>{step.icon}</Box>

                {/* 2. Number in blue + heading in black on same line */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
                    <Typography
                    sx={{ color: "#1976d2", fontWeight: 600, fontSize: 18, minWidth: 30 }}
                    >
                    {`0${i + 1}.`}
                    </Typography>
                    <Typography sx={{ color: "#000", fontWeight: 600, fontSize: 18 }}>
                    {step.title}
                    </Typography>
                </Box>

                {/* 3. Description below, gray color, max 3 lines with ellipsis */}
                <Typography
                    sx={{
                    color: "#555",
                    fontSize: 14,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                    }}
                >
                    {step.description}
                </Typography>
                </Box>
            ))}
        
        </Box>
            <Box sx={{ textAlign: "center", mt: 4 }}>
  <Button
    variant="contained"
    sx={{
      backgroundColor: "#1976d2",
      textTransform: "none",
      fontWeight: 700,
      px: 2,
      py: 1,
      fontSize: 16, borderRadius:"4px"
    }}
    onClick={scrollToTop}
  >
    Begin to Post Your Property
  </Button>
</Box>
 
    <Box
      sx={{
        mt: 6,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        justifyContent: 'flex-start',
        maxWidth: 1100,
        mx: 'auto',
        px: 2,
        mb:4
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Quick Links
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Link
          component="button"
        //   underline="hover"
          sx={{ cursor: 'pointer', fontWeight: 500, color:"#333", textDecoration:"none",
            "&:hover":{
                color:"#1976d2"
            }
           }}
          onClick={() => window.open("/post-property", "_blank")}
        >
          Sell Property
        </Link>
        <Link
          component="button"
        //   underline="hover"
          sx={{ cursor: 'pointer', fontWeight: 500,color:"#333", textDecoration:"none",
            "&:hover":{
                color:"#1976d2"
            }
           }}
          onClick={() =>window.open("/post-property", "_blank")}
        >
          Post Property for Rent
        </Link>
      </Box>
    </Box>
    <Footer/>
 </>);
};

export default PostProperty;