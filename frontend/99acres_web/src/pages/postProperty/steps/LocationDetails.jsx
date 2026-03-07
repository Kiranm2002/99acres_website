import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Button,
  CircularProgress
} from "@mui/material";
import { useNavigate,useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const LocationDetails = () => {
  const navigate = useNavigate();
  const {propertyId} = useParams();
  const wrapperRef = useRef(null);
  const [isCityFocused, setIsCityFocused] = useState(false);
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [locality, setLocality] = useState("");
  const [selectedLocality, setSelectedLocality] = useState(null);
  // const [subLocality, setSubLocality] = useState("");
  // const [society, setSociety] = useState("");

  const [citySuggestions, setCitySuggestions] = useState([]);
  const [localitySuggestions, setLocalitySuggestions] = useState([]);

  const [loadingCity, setLoadingCity] = useState(false);
  const [loadingLocality, setLoadingLocality] = useState(false);

  
  const [subLocality, setSubLocality] = useState("");
  const [selectedSubLocality, setSelectedSubLocality] = useState(null);
  const [subLocalitySuggestions, setSubLocalitySuggestions] = useState([]);
  const [loadingSubLocality, setLoadingSubLocality] = useState(false);

  // ---------------- PROJECT ----------------
const [project, setProject] = useState("");
const [selectedProject, setSelectedProject] = useState(null);

const [projectSuggestions, setProjectSuggestions] = useState([]);
const [loadingProjects, setLoadingProjects] = useState(false);

  // ----------------------------
  // Debounced City Search
  // ----------------------------
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (city.length >= 1 && !selectedCity) {
        try {
          setLoadingCity(true);
          const res = await axiosInstance.get(`/location/cities?query=${city}`);
          console.log(res.data)
          setCitySuggestions(res.data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoadingCity(false);
        }
      } else {
        setCitySuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [city,selectedCity]);

  // ----------------------------
  // Debounced Locality Search
  // ----------------------------
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (locality.length >= 1 && selectedCity && !selectedLocality) {
        try {
          setLoadingLocality(true);
          const res = await axiosInstance.get(
            `/location/localities?query=${locality}&cityId=${selectedCity._id}`
          );
          setLocalitySuggestions(res.data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoadingLocality(false);
        }
      } else {
        setLocalitySuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [locality, selectedCity,selectedLocality]);

    // Sub Locality search
    useEffect(() => {
  const delay = setTimeout(async () => {

    if (subLocality.length >= 1 && selectedLocality && !selectedSubLocality) {

      try {
        setLoadingSubLocality(true);

        const res = await axiosInstance.get(
          `/location/sublocalities?query=${subLocality}&localityId=${selectedLocality._id}`
        );

        setSubLocalitySuggestions(res.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoadingSubLocality(false);
      }

    } else {
      setSubLocalitySuggestions([]);
    }

  }, 400);
  return () => clearTimeout(delay);

}, [subLocality, selectedLocality, selectedSubLocality]);


  useEffect(() => {
  const delay = setTimeout(async () => {

    if (project.length >= 1 && selectedSubLocality && !selectedProject) {

      try {
        setLoadingProjects(true);

        const res = await axiosInstance.get(
          `location/projects/?query=${project}&subLocalityId=${selectedSubLocality._id}`
        );

        setProjectSuggestions(res.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoadingProjects(false);
      }

    } else {
      setProjectSuggestions([]);
    }

  }, 400);

  return () => clearTimeout(delay);

}, [project, selectedSubLocality, selectedProject]);

  // ----------------------------
  // Close dropdown when clicked outside
  // ----------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setCitySuggestions([]);
        setLocalitySuggestions([]);
        setSubLocalitySuggestions([])
        setProjectSuggestions([])
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOnContinue = async()=>{
    try{
        const id = propertyId || sessionStorage.getItem("propertyId");
        const res =  await axiosInstance.put("/property/update-location", {
          propertyId: id,
          city: selectedCity._id,
          locality: selectedLocality._id,
          subLocality: selectedSubLocality?._id,
          project: selectedProject?._id,
      });
      navigate(`/post-property/basic-details/${id}`);
    }catch(error){
      console.error("Error saving location details:", error);
    }
  }
  //data fetching from backend
  useEffect(() => {
    const id = propertyId || sessionStorage.getItem("propertyId")
  if (id) {
    axiosInstance.get(`/property/${id}`)
      .then(res => {
        const data = res.data;

        if (data.city) {
          setCity(data.city.name);
          setSelectedCity(data.city);
        }

        if (data.locality) {
          setLocality(data.locality.name);
          setSelectedLocality(data.locality);
        }

        if (data.subLocality) {
          setSubLocality(data.subLocality.name);
          setSelectedSubLocality(data.subLocality);
        }

        if (data.project) {
          setProject(data.project.name);
          setSelectedProject(data.project);
        }
      });
  }
}, [propertyId]);

  return (
    <Box sx={{ mt: 4, ml: 4, width: 400 }} ref={wrapperRef}>
      {/* 🔙 Back Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          mb: 2,
          width: "fit-content",
          "&:hover": { color: "#1976d2" }
        }}
        onClick={() => {
          const id = propertyId || sessionStorage.getItem("propertyId")
          navigate(`/post-property/primary-details/${id}`)}}
      >
        <ArrowBackIcon sx={{ mr: 0.5, fontSize: 22, color: "#808080" }} />
        <Typography sx={{ fontSize: 13, color: "#808080" }}>
          Back
        </Typography>
      </Box>

      {/* Heading */}
      <Typography variant="h5" fontWeight={400} mb={1}>
        Where is your property located?
      </Typography>

      <Typography sx={{ color: "#8a94a6", mb: 4, fontSize: 14 }}>
        An accurate location helps you connect with the right buyers
      </Typography>

      {/* ---------------- CITY ---------------- */}
      <Box sx={{ position: "relative" }}>
        <TextField
          fullWidth
          label="City"
          value={city}
          onFocus={() => setIsCityFocused(true)}
          onBlur={() => setIsCityFocused(false)}
          onChange={(e) => {
            setCity(e.target.value);
            setSelectedCity(null);
          }}
          InputProps={{
          endAdornment: !isCityFocused && city.length === 0 ? (
            <InputAdornment position="end">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "#1976d2"
                }}
                // onClick={handlePickLocation}
              >
                <MyLocationIcon sx={{ fontSize: 18, mr: 0.5 }} />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500 }}
                >
                  Pick my location
                </Typography>
              </Box>
            </InputAdornment>
          ):null,
        }}
        />

        {loadingCity && (
          <CircularProgress size={20} sx={{ position: "absolute", top: 15, right: 10 }} />
        )}

        {city.length > 0 && !selectedCity && (
          <Paper
            sx={{
              position: "absolute",
              width: "100%",
              maxHeight: 200,
              overflowY: "auto",
              zIndex: 10
            }}
          >
            <List>
              {citySuggestions.map((item) => (
                <ListItem key={item._id} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setCity(item.name);
                      setSelectedCity(item);
                      setCitySuggestions([]);
                    }}
                  >
                    {item.name}
                  </ListItemButton>
                </ListItem>
              ))}
               {/* 🔹 Show this if no results */}
              {!loadingCity && citySuggestions.length === 0 && (
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ cursor: "default", backgroundColor: "#f9f9f9" }}
                  >
                    <LightbulbIcon sx={{ fontSize: 20, mr: 1, color: "#ffb400" }} />
                    <Typography variant="body2" color="text.secondary">
                      Can't find your City?
                    </Typography>
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Paper>
        )}
      </Box>

      {/* ---------------- LOCALITY ---------------- */}
      {selectedCity && (
        <Box sx={{ position: "relative", mt: 3 }}>
          <TextField
            fullWidth
            label="Locality / Apartment"
            value={locality}
            onChange={(e) => {
              setLocality(e.target.value);
              setSelectedLocality(null);
            }}
          />

          {loadingLocality && (
            <CircularProgress size={20} sx={{ position: "absolute", top: 15, right: 10 }} />
          )}

          {locality.length > 0 && !selectedLocality && (
            <Paper
              sx={{
                position: "absolute",
                width: "100%",
                maxHeight: 200,
                overflowY: "auto",
                zIndex: 10
              }}
            >
              <List>
                {localitySuggestions.map((item) => (
                  <ListItem key={item._id} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setLocality(item.name);
                        setSelectedLocality(item);
                        setLocalitySuggestions([]);
                      }}
                    >
                      {item.name}
                    </ListItemButton>
                  </ListItem>
                ))}
                 {/* 🔹 Show if no results */}
              {!loadingLocality && localitySuggestions.length === 0 && (
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={{ cursor: "default", backgroundColor: "#f9f9f9" }}
                    >
                      <LightbulbIcon sx={{ fontSize: 20, mr: 1, color: "#ffb400" }} />
                      <Typography variant="body2" color="text.secondary">
                        Can't find your Locality?
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            </Paper>
          )}
        </Box>
      )}

      {/* ---------------- OPTIONAL FIELDS ---------------- */}
      {selectedLocality && (
        <>
          {selectedLocality && (
              <Box sx={{ position: "relative", mt: 3 }}>

                <TextField
                  fullWidth
                  label="Sub Locality (Optional)"
                  value={subLocality}
                  onChange={(e) => {
                    setSubLocality(e.target.value);
                    setSelectedSubLocality(null);
                    
                  }}
                />

                {loadingSubLocality && (
                  <CircularProgress
                    size={20}
                    sx={{ position: "absolute", top: 15, right: 10 }}
                  />
                )}

                {subLocality.length > 0 && !selectedSubLocality && (
                  <Paper
                    sx={{
                      position: "absolute",
                      width: "100%",
                      maxHeight: 200,
                      overflowY: "auto",
                      zIndex: 10
                    }}
                  >
                    <List>
                      {subLocalitySuggestions.map((item) => (
                        <ListItem key={item._id} disablePadding>
                          <ListItemButton
                            onClick={() => {
                              setSubLocality(item.name);
                              setSelectedSubLocality(item);
                              setSubLocalitySuggestions([]);
                            }}
                          >
                            {item.name}
                          </ListItemButton>
                        </ListItem>
                      ))}
                      {!loadingSubLocality && subLocalitySuggestions.length === 0 && (
                          <ListItem disablePadding>
                            <ListItemButton
                              sx={{ cursor: "default", backgroundColor: "#f9f9f9" }}
                            >
                              <LightbulbIcon sx={{ fontSize: 20, mr: 1, color: "#ffb400" }} />
                              <Typography variant="body2" color="text.secondary">
                                Can't find your Sub-locality?
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        )}

                    </List>
                  </Paper>
                )}

              </Box>
            )}

          {selectedSubLocality && (
          <Box sx={{ position: "relative", mt: 3 }}>

            <TextField
              fullWidth
              label="Apartment / Society (Optional)"
              value={project}
              onChange={(e) => {
                setProject(e.target.value);
                setSelectedProject(null);
              }}
            />

            {loadingProjects && (
              <CircularProgress
                size={20}
                sx={{ position: "absolute", top: 15, right: 10 }}
              />
            )}

            {project.length > 0 && !selectedProject && (
              <Paper
                sx={{
                  position: "absolute",
                  width: "100%",
                  maxHeight: 200,
                  overflowY: "auto",
                  zIndex: 10
                }}
              >
                <List>
                  {projectSuggestions.map((item) => (
                    <ListItem key={item._id} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          setProject(item.name);
                          setSelectedProject(item);
                          setProjectSuggestions([]); // close dropdown
                        }}
                      >
                        {item.name}
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {!loadingProjects && projectSuggestions.length === 0 && (
                    <ListItem disablePadding>
                      <ListItemButton
                        sx={{ cursor: "default", backgroundColor: "#f9f9f9" }}
                      >
                        <LightbulbIcon sx={{ fontSize: 20, mr: 1, color: "#ffb400" }} />
                        <Typography variant="body2" color="text.secondary">
                          Can't find your Apartment / Project?
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  )}
                </List>
              </Paper>
            )}

          </Box>
        )}
        </>
      )}

      {/* ---------------- CONTINUE ---------------- */}
      {selectedCity && selectedLocality && (
        <Button
          variant="contained"
          // fullWidth
          sx={{ mt: 6, height: 48,width:"200px",borderRadius:"4px",fontSize:16 }}
          onClick={handleOnContinue}
        >
          Continue
        </Button>
      )}
    </Box>
  );
};

export default LocationDetails;