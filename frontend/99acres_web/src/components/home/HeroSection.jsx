import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const HeroSection = ({ searchRef, hideSearch }) => {
  const [value, setValue] = React.useState(0);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "CASAGRAND PROMENADE",
      subtitle: "Homes in Yelahanka @ ₹7,599/sft.",
      description: "3 & 4 BHK Apts. | 10 mins from Mall of Asia",
      button: "Explore Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      title: "Luxury Apartments in Bangalore",
      subtitle: "Starting ₹1.95 CR",
      description: "Prime Locations | Limited Units",
      button: "View Details",
    },
  ];

  return (
    <Box>
      {/* HERO SECTION */}
      <Box sx={{ height: hideSearch ? "250px" : "350px",transition: "height 0.3s ease", position: "relative" }}>
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop
          style={{ height: "100%" }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  height: "350px",
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.2), rgba(255, 244, 214, 0.85))",
                  }}
                />

                <Container
                  maxWidth="lg"
                  sx={{
                    position: "relative",
                    zIndex: 2,
                    pt: 14,
                    color: "#fff",
                  }}
                >
                  <Box sx={{ maxWidth: 550 }}>
                    <Typography variant="overline" sx={{ letterSpacing: 1.5 }}>
                      {slide.title}
                    </Typography>

                    <Typography variant="h4" fontWeight={700} sx={{ mt: 2 }}>
                      {slide.subtitle}
                    </Typography>

                    <Box sx={{ maxWidth: 550, display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                    <Typography sx={{  opacity: 0.9, mt:1 }}>
                      {slide.description}
                    </Typography>

                    <Button
                      variant="outlined"
                      sx={{
                        mt: 2,
                        borderColor: "#000",
                        color: "#000",
                        backgroundColor: "#fff",
                        textTransform: "none",
                        px: 4,
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      {slide.button}
                    </Button>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* LEFT NAV */}
        <Box
          className="custom-prev"
          sx={{
            position: "absolute",
            top: "50%",
            left: "20px",
            transform: "translateY(-50%)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 20,
            boxShadow: 3,
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </Box>

        {/* RIGHT NAV */}
        <Box
          className="custom-next"
          sx={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 20,
            boxShadow: 3,
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </Box>

        {/* SEARCH CARD */}
        <Box
          ref={searchRef}
          // maxWidth="lg"
          sx={{
            position: "absolute",
            bottom: "-80px",
            left: 0,
            right: 0,
            zIndex: 25,
            maxWidth:1000,
            mx:"auto",
            transition: "all 0.35s ease",
            opacity: hideSearch ? 0 : 1,
            transform: hideSearch
              ? "translateY(-40px)"
              : "translateY(0px)",
            pointerEvents: hideSearch ? "none" : "auto",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", px: 3, pt: 2 }}>
              <Tabs
                value={value}
                onChange={(e, newValue) => setValue(newValue)}
                textColor="error"
                indicatorColor="error"
              >
                <Tab label="Buy" />
                <Tab label="Rent" />
                <Tab label="New Launch" />
                <Tab label="Commercial" />
                <Tab label="Plots/Land" />
                <Tab label="Projects" />
              </Tabs>

              <Box sx={{ flexGrow: 1 }} />

              <Button
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#000",
                }}
              >
                Post Property
                <Box
                  sx={{
                    bgcolor: "green",
                    color: "#fff",
                    fontSize: "10px",
                    px: 1,
                    ml: 1,
                    borderRadius: "4px",
                  }}
                >
                  FREE
                </Box>
              </Button>
            </Box>

            <Divider />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                gap: 2,
              }}
            >
              <Button
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  textTransform: "none",
                  color: "#555",
                  whiteSpace: "nowrap",
                  borderRight: "1px solid #ddd",
                  pr: 3,
                  ml:3,
                }}
              >
                All Residential
              </Button>

              <TextField
                fullWidth
                variant="standard"
                placeholder='Search "3 BHK for sale in Mumbai"'
                InputProps={{ disableUnderline: true }}
              />

              <IconButton sx={{ backgroundColor: "#f0f8ff", width: 40, height: 40 }}>
                <MyLocationIcon sx={{color:"#1e90ff"}}/>
              </IconButton>

              <IconButton sx={{ backgroundColor: "#f0f8ff", width: 40, height: 40 }}>
                <MicIcon sx={{color:"#1e90ff"}}/>
              </IconButton>

              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{ px: 4, height: 45, borderRadius: "8px" }}
              >
                Search
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>

      
    </Box>
  );
};

export default HeroSection;