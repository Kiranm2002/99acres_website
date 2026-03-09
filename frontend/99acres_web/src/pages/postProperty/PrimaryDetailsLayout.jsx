import React from "react";
import { Box, Typography } from "@mui/material";
import PostNavbar from "./PostNavbar";
import { Outlet, useLocation,useNavigate,useParams } from "react-router-dom";
import { useState } from "react";
import LocationHelp from "./location-help.png";
import PhoneIcon from "@mui/icons-material/Phone";

const steps = [
  { label: "Basic Details", path: "primary-details" },
  { label: "Location Details", path: "location" },
  { label: "Property Profile", path: "basic-details" },
  { label: "Photos, Videos & Voice-over", path: "photo-details" },
  { label: "Amenities section", path: "other-details" }
];

const PrimaryDetailsLayout = ({user,setUser}) => {
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const location = useLocation();
  const {propertyId} = useParams();
  // const id = propertyId || sessionStorage.getItem("propertyId")
  const currentPath = location.pathname.split("/")[2];
  const navigate = useNavigate()

  const getActiveStep = () => {
    const current = location.pathname.split("/")[2];
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
      <PostNavbar user={user} setUser={setUser}/>

      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 64px)",
          display: "flex",
          backgroundColor: "#f3f5f9",
          overflow: "hidden"
        }}
      >

        {/* WHITE SECTION 70% */}
        <Box
          sx={{
            width: "70%",
            minWidth: 0,
            display: "flex",
            backgroundColor: "#ffffff"
          }}
        >

          {/* SIDEBAR */}
          <Box
            sx={{
              width: { xs: 170, sm: 220, md: 260, lg: 320 },
              minWidth: 150,
              flexShrink: 1,
              mt: 2.3
            }}
          >

            {/* TOP GREY STEPS CONTAINER */}
            <Box
              sx={{
                width: "90%",
                backgroundColor: "#eef1f5",
                borderRadius: 1,
                p: 4,
                mx: "auto",
                mt: 4
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
                    <Box sx={{ position: "relative", mr: 2 }}>

                      {/* Circle */}
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: isActive || isCompleted
                            ? "3px solid #1976d2"
                            : "2px solid #c0c6d4",
                          backgroundColor: isCompleted
                            ? "#1976d2"
                            : "#fff"
                        }}
                      >
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

                      {/* Vertical Line RESTORED */}
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

                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography
                          sx={{
                            fontWeight: isActive ? 600 : 400,
                            fontSize: 14
                          }}
                        >
                          {step.label}
                        </Typography>

                        {/* Show Edit only if step is completed */}
                        {isCompleted && (
                          <Typography
                            onClick={() =>{
                              const id = propertyId || sessionStorage.getItem("propertyId");
                              navigate(`/post-property/${step.path}/${id}`);
                            }}
                            sx={{
                              fontSize: 12,
                              fontWeight: 500,
                              color: "#1976d2",
                              cursor: "pointer"
                            }}
                          >
                            Edit
                          </Typography>
                        )}
                      </Box>
                      <Typography
                        sx={{
                          fontSize: 13,
                          color: "#8a94a6"
                        }}
                      >
                        {isCompleted && step.path === "primary-details"
                          ? selectedPropertyType || `Step ${index + 1}`
                          : `Step ${index + 1}`}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* SECOND GREY PROPERTY SCORE CONTAINER */}
            <Box
              sx={{
                width: "90%",
                backgroundColor: "#eef1f5",
                borderRadius: 1,
                p: 3,
                mt: 4,
                mx: "auto"
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 70,
                    aspectRatio: "1 / 1",   // ✅ FIXED PERFECT CIRCLE
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `conic-gradient(
                      #2e7d32 ${progressPercent * 3.6}deg,
                      #e0e0e0 0deg
                    )`
                  }}
                >
                  <Box
                    sx={{
                      width: "85%",
                      aspectRatio: "1 / 1",
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

                <Box>
                  <Typography fontWeight={600}>
                    Property Score
                  </Typography>
                  <Typography fontSize={13} color="#8a94a6">
                    Better your property score,
                    greater your visibility
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* MAIN CONTENT */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              ml: 4,
              overflowY: "auto"
            }}
          >
            <Outlet />
          </Box>
        </Box>

        {/* RIGHT GREY HELPER SECTION 30% */}
        <Box
          sx={{
            width: "30%",
            backgroundColor: "#f3f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 6
          }}
        >

          {currentPath === "location" && (
            <Box textAlign="center">
              <img src={LocationHelp} alt="location-help" width={200} />
              <Typography mt={2} fontWeight={550}>
                Why we need an accurate location?
              </Typography>
              <Typography sx={{ color: "#8a94a6", mt: 1, fontSize: 15 }}>
                Location is the most important for Buyer’s.
                By capturing a detailed location
                we ensure we get you genuine enquiries.
              </Typography>
            </Box>
          )}

          {currentPath === "photo-details" && (
            <Box textAlign="center">
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
                </ul>
              </Box>
            </Box>
          )}

          {currentPath === "other-details" && (
            <Box textAlign="center">
              <img
                src="https://www.99acres.com/ppf-static/media/Amenities.816edd86.png"
                alt="Amenities Info"
                width={160}
              />
              <Typography mt={2} color="text.secondary">
                These are the features that buyers look for.
                Highlighting them attracts more responses.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* HELP BOX */}
      <Box
        sx={{
          position: "fixed",
          bottom: 10,
          right: 30,
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "#9aa3b2",
          cursor: "pointer"
        }}
      >
        <PhoneIcon sx={{ fontSize: 16 }} />
        <Typography fontSize={14}>
          Need help ?
        </Typography>
      </Box>
    </>
  );
};

export default PrimaryDetailsLayout;