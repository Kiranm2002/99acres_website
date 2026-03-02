import React from "react";
import { Box,Typography } from "@mui/material";
import PostNavbar from "./PostNavbar";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import LocationHelp from "./location-help.png"
// import PrimaryDetails from "../../pages/postProperty/steps/PrimaryDetails";
import PhoneIcon from "@mui/icons-material/Phone";
const steps = [
  { label: "Basic Details", path: "primary-details" },
  { label: "Location Details", path: "location" },
  { label: "Property Profile", path: "basic-details" },
  { label: "Photos, Videos & Voice-over", path: "photo-details" },
  { label: "Amenities section", path: "other-details" }
];
const PrimaryDetailsLayout = () => {
    const [selectedPropertyType, setSelectedPropertyType] = useState("");
    const location = useLocation();
    const currentPath = location.pathname.split("/").pop();
    const getActiveStep = () => {
        const current = location.pathname.split("/").pop();
        const index = steps.findIndex((step) => step.path === current);
        return index === -1 ? 0 : index;
    };

    const activeStep = getActiveStep();

    const totalSteps = steps.length;
    const completedSteps = activeStep < 0 ? 0 : activeStep;
    const progressPercent = Math.round(
    (completedSteps / totalSteps) * 100
    );
    
  return (
    <>
      {/* 1️⃣ NAVBAR */}
      <PostNavbar />

      {/* 2️⃣ MAIN GREY CONTAINER */}
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh-64px)",
          display: "flex",
          position:"relative",
          backgroundColor: "#f3f5f9",
        }}
      >
        
        <Box       // white container
          sx={{
            width:"75%",
            height:"100%",
            
            backgroundColor: "#ffffff",
            display:"flex"
          }}
        >
        <Box sx={{width:"35%",mt:2.3, position:"sticky",height:"100vh",top:0,flexShrink:0}}>
          <Box          //top grey container
            sx={{
              width: "300px",
              backgroundColor: "#eef1f5",
              borderRadius: 1,
              p: 4,
              ml:6,mt:4,
              position:"sticky",top:20
              
            }}
          >
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;

              return (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-start",
                    mb: index !== steps.length - 1 ? 5 : 0
                  }}
                >
                  {/* Circle + Line Container */}
                  <Box
                    sx={{
                      position: "relative",
                      mr: 2
                    }}
                  >
                    {/* Circle */}
                   
                    <Box
                    sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: isActive
                        ? "3px solid #1976d2"
                        : isCompleted
                        ? "3px solid #1976d2"
                        : "2px solid #c0c6d4",
                        backgroundColor: isCompleted
                        ? "#1976d2"
                        : "#fff"
                    }}
                    >
                    {/* Show inner white dot for active step */}
                    {isActive && !isCompleted && (
                        <Box
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: "#1976d2"
                        }}
                        />
                    )}

                    {/* Show checkmark for completed step */}
                    {isCompleted && (
                        <Typography
                        sx={{
                            color: "#fff",
                            fontSize: 12,
                            fontWeight: 700
                        }}
                        >
                        ✓
                        </Typography>
                    )}
                    </Box>

                    {/* Vertical Line */}
                    {index !== steps.length - 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 22,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "2px",
                          height: 60,
                          backgroundColor:
                            index < activeStep
                              ? "#1976d2"
                              : "#c0c6d4"
                        }}
                      />
                    )}
                  </Box>

                  {/* Step Text */}
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: isActive ? 600 : 400,
                        fontSize: 14
                      }}
                    >
                      {step.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "#8a94a6"
                      }}
                    >
                      {isCompleted && step.path === "primary-details"
                        ? selectedPropertyType // store from context or state
                        : `Step ${index + 1}`}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
          
           <Box
            sx={{
                width: "300px",
                backgroundColor: "#eef1f5",
                borderRadius: 1,
                p: 3,
                mt: 4 , ml:6 ,
                position:"sticky",top:300
            }}
            >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                
                {/* Circular Percentage */}
                <Box
                sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink:0,
                    background: `conic-gradient(
                    #2e7d32 ${progressPercent * 3.6}deg,
                    #e0e0e0 0deg
                    )`
                }}
                >
                {/* Inner White Circle */}
                <Box
                    sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: 14
                    }}
                >
                    {progressPercent}%
                </Box>
                </Box>

                {/* Text Content */}
                <Box>
                <Typography sx={{ fontWeight: 600,ml:2 }}>
                    Property Score
                </Typography>
                <Typography
                    sx={{
                    fontSize: 14,
                    color: "#8a94a6",ml:2
                    }}
                >
                    Better your property score,
                    greater your visibility
                </Typography>
                </Box>

            </Box>
            </Box>
        </Box> 
        {/* Right Side of white Container */}
        <Box 
          sx={{ flex: 1,              
              minWidth: 0,          
              ml: { xs: 0, md: 6 }, 
              height: "100vh",
              overflowY: "auto",
              overflowX: "hidden",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
          }}>
            <Outlet/>
          </Box>
        </Box>

        {/* Map image in Location page */}
        {currentPath === "location" && (
            <Box
                sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 6
                }}
            >
                <Box textAlign="center">
                <img
                    src={LocationHelp}   // better to use public folder image
                    alt="location-help"
                    width={200}
                />
                <Typography mt={2} fontWeight={550}>
                    Why we need an accurate location?
                </Typography>
                <Typography sx={{ color: "#8a94a6", mt: 1,fontSize:15 }}>
                    Location is the most important for Buyer’s.
                    By capturing a detailed location
                    we ensure we get you genuine enquiries.
                </Typography>
                </Box>
            </Box>
            )}

            {/* RIGHT SECTION */}
            {currentPath === "photo-details" &&(
            <Box
              width="25%"
              bgcolor="#f3f5f9"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              px={4}
            >
              <img
                src="https://www.99acres.com/ppf-static/media/Photos.a374d44a.png"
                alt="photo-guide"
                width={180}
              />

              <Typography mt={3} fontWeight={540}>
                Make your picture perfect!
              </Typography>

              <Box mt={-1} color="#6b778c" fontSize={14} width={280}>
                <ul>
                  <li>Capture photos in landscape mode.</li>
                  <li>Try clicking photos during the day. Avoid using flash.</li>
                  <li>Tidy up for better impact.</li>
                  <li>Edit with 99acres filters for finish</li>
                  <li>
                    To learn more <span style={{ color: "#1976d2" }}>click here</span>
                  </li>
                </ul>
              </Box>
            </Box>)}
          {currentPath === "other-details" && (
            <Box width={250} ml={8} mt={16}>
            {/* Image */}
            <Box
              component="img"
              src="https://www.99acres.com/ppf-static/media/Amenities.816edd86.png"
              alt="Amenities Info"
              sx={{
                width: 160,
                mb: 3
              }}
            />

            {/* Text */}
            <Typography variant="body1" color="text.secondary" ml={-3} fontSize={16}>
              These are the features that buyers look for.
              Highlighting them attracts more responses.
            </Typography>

            
          </Box>
          )}


        {/* 🔹 Bottom Right Help Box */}
        <Box
        sx={{
            position: "absolute",
            bottom: 5,
            right: 150,
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#9aa3b2",
            fontSize: 14,
            cursor: "pointer",border:1

        }}
        >
        {/* Phone Icon */}
        <Box
            sx={{
            // width: 30,
            // height: 30,
            // borderRadius: "50%",
            // border: "1px solid #d0d5dd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",pl:1
            }}
        >
            <PhoneIcon sx={{ fontSize: 16, color: "#9aa3b2" }} />
        </Box>

        <Typography sx={{ fontSize: 14, color: "#9aa3b2",p:1 }}>
            Need help ?
        </Typography>
        </Box>
      </Box>
    </>
  );
};

export default PrimaryDetailsLayout;