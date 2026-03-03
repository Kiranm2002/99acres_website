import { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const PrimaryDetails = ({ user }) => {
  const navigate = useNavigate();

  // States
  // const [lookingFor, setLookingFor] = useState("Sell");
  // const [propertyType, setPropertyType] = useState("Residential");
  // const [category, setCategory] = useState("Independent House / Villa");
  const [lookingFor, setLookingFor] = useState("");

const [propertyType, setPropertyType] = useState("");

const [category, setCategory] = useState("");

  const propertyOptions = [
    "Flat/Apartment",
    "Independent House / Villa",
    "Independent / Builder Floor",
    "Plot / Land",
    "1 RK / Studio Apartment",
    "Serviced Apartment",
    "Farmhouse",
    "Other",
  ];

  const handleContinue = async() => {
    
    try {
    const existingPropertyId = localStorage.getItem("propertyId");

    let response;

    if (existingPropertyId) {
      // 🔁 UPDATE PROPERTY
      response = await axios.put(
        `http://localhost:5000/property/update-primaryDetails/${existingPropertyId}`,
        {
          lookingFor,
          propertyType,
          category,
        }
      );

      console.log("Property Updated Successfully");
    } else {
      // 🆕 CREATE NEW PROPERTY
      response = await axios.post(
        "http://localhost:5000/property/create",
        {
          lookingFor,
          propertyType,
          category,
        }
      );

      // Save new propertyId
      localStorage.setItem("propertyId", response.data.propertyId);

      console.log("Property Created Successfully");
    }

    navigate("/post-property/location");

  } catch (error) {
    console.error("Error saving primary details:", error);
  }
  };

  useEffect(()=>{
    const propertyId = localStorage.getItem("propertyId")
    if(propertyId){
      axios.get(`http://localhost:5000/property/${propertyId}`)
      .then(res=>{const data = res.data
      
      setLookingFor(data.lookingFor || "")
      setPropertyType(data.propertyType || "")
      setCategory(data.category || "")
     
      })}
  },[])

  return (
    <Box sx={{ px: 6, py: 6, }}>

      {/* ===== Heading Section ===== */}
      <Typography variant="h5" sx={{ fontWeight: 550 }}>
        Welcome back {user?.fullname ? user.fullname : "User"},
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 550, mt: 1 }}>
        Fill out basic details
      </Typography>

      {/* ===== I'm looking to ===== */}
      <Typography variant="h6" sx={{ mt: 5, mb: 2, fontWeight: 500,fontSize:18 }}>
        I'm looking to
      </Typography>

     

    <Box
        sx={{ display: "flex", flexWrap: "wrap", gap: 1,mt:-1 }}
            >
                {["Sell", "Rent / Lease", "PG"].map((type,index) => (
                        <Button
                        key={index}
                        variant="outlined"
                        onClick={() => setLookingFor(type)}
                        // value={item}
                        sx={{
                            borderRadius: 5,
                            textTransform: "none",
                            fontSize: 13,
                            borderColor: "#d0d5dd",
                            color: "#555",
                            backgroundColor: lookingFor === type ? "#e3f2fd" : "#fff",
                            "&:hover": {
                                backgroundColor: "#e3f2fd"
                            }
                        }}
                        >
                        {type}
                    </Button>
                ))}
            </Box>


      {/* ===== Property Type ===== */}
      <Typography variant="h6" sx={{ mt: 5, mb: 2, fontWeight: 500,fontSize:18 }}>
        What kind of property do you have?
      </Typography>

      <RadioGroup
        row
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        sx={{mt:-2}}
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

      {/* ===== Property Category Chips ===== */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2,mt:2 }}>
                    {[
                      "Flat/Apartment",
                      "Independent House / Villa",
                      "Independent / Builder Floor",
                      "Plot / Land",
                      "1 RK/ Studio Apartment",
                      "Serviced Apartment",
                      "Farmhouse",
                      "Other"
                    ].map((type, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        onClick={() => setCategory(type)}
                        sx={{
                          borderRadius: 5,
                          textTransform: "none",
                          fontSize: 13,
                          borderColor: "#d0d5dd",
                          color: "#555",
                          backgroundColor: category === type ? "#e3f2fd" : "#fff",
                          "&:hover": {
                              backgroundColor: "#e3f2fd"
                          }
                        }}
                      >
                        {type}
                      </Button>
                    ))}
                  </Box>

      {/* ===== Continue Button ===== */}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 6,
            py: 1,
            borderRadius: "4px",
            textTransform: "none",
            fontSize: "18px",
          }}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default PrimaryDetails;