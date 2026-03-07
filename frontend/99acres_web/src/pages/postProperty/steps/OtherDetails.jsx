import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Divider,
  Select,
  MenuItem
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate,useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance"
import { useEffect } from "react";

const amenitiesOptions = [
  "Maintenance Staff",
  "Water Storage",
  "Rain Water Harvesting",
  "Vaastu Compliant"
];

const overlookingOptions = [
  "Pool",
  "Park",
  "Club",
  "Main Road",
  "Others"
];

const propertyFacing = [
  "North","South","East","West",
  "North-East","North-West","South-East","South-West"
];

const locationAdvantages = [
  "Close to Metro Station",
  "Close to School",
  "Close to Hospital",
  "Close to Market",
  "Close to Railway Station"
];

const OtherDetails = () => {
  const navigate = useNavigate();
  const {propertyId} = useParams();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedOverlooking, setSelectedOverlooking] = useState([]);
  const [PropertyFacing, setPropertyFacing] = useState("");
  // const [areaUnit, setAreaUnit] = useState("Feet");
  const [locationAdv, setLocationAdv] = useState([]);
  const [otherFeatures, setOtherFeatures] = useState({
    corner: false,
    gated: false,
    wheelchair: false
  });

  const handleToggle = (value, list, setter) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  const handleOnContinue =async()=>{
     try {
        const id = propertyId || sessionStorage.getItem("propertyId"); // or from params

        const payload = {
          amenities: selectedAmenities,
          overlooking: selectedOverlooking,
          propertyFacing: PropertyFacing,
          locationAdvantages: locationAdv,
          otherFeatures: otherFeatures,
        };

        const response = await axiosInstance.put(
          `/property/other-details/${id}`,
          payload
        );

       
        console.log("Other Details Saved:", response);

        sessionStorage.removeItem("propertyId");

        navigate(`/post-property/thank-you/${id}`);
        
       

        
      } catch (error) {
        console.error("Save Error:", error);
      }

  }
  useEffect(()=>{
    const id = propertyId || sessionStorage.getItem("propertyId")
    if(id){
      axiosInstance.get(`/property/${id}`)
      .then(res=>{const data = res.data
      
      setSelectedAmenities(data.amenities || "")
      setSelectedOverlooking(data.overlooking || "")
      setPropertyFacing(data.propertyFacing || "")
      setLocationAdv(data.locationAdvantages || "")
      setOtherFeatures(data.otherFeatures || "");
      })

    }
  },[propertyId])
  return (
    <Box p={4} mt={1}>
      
      {/* Back Button */}
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
          navigate(`/post-property/photo-details/${id}`)}}
      >
        <ArrowBackIcon sx={{ mr: 0.5, fontSize: 22, color: "#808080" }} />
        <Typography sx={{ fontSize: 13, color: "#808080" }}>
          Back
        </Typography>
      </Box>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add amenities/unique features
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3} fontSize={14}>
        These fields are used to populate USP & captions.<br/>
        All fields on this page are optional.
      </Typography>

      {/* Amenities */}
      <Typography variant="h6" gutterBottom fontWeight={600} fontSize={17}>
        Amenities
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {amenitiesOptions.map((type, index) => {
          const isSelected = selectedAmenities.includes(type);
          return (
            <Button
              key={index}
              variant="outlined"
              onClick={() =>
                handleToggle(type, selectedAmenities, setSelectedAmenities)
              }
              startIcon={isSelected ? <CheckIcon /> : <AddIcon />}
              sx={{
                borderRadius: 5,
                textTransform: "none",
                fontSize: 13,
                borderColor: "#d0d5dd",
                color: "#948f8f",
                backgroundColor: isSelected ? "#e3f2fd" : "#fff",
                "&:hover": { backgroundColor: "#e3f2fd" }
              }}
            >
              {type}
            </Button>
          );
        })}
      </Box>

      {/* Overlooking */}
      <Typography variant="h6" gutterBottom mt={4} fontWeight={600} fontSize={17}>
        Overlooking
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {overlookingOptions.map((type, index) => {
          const isSelected = selectedOverlooking.includes(type);
          return (
            <Button
              key={index}
              variant="outlined"
              onClick={() =>
                handleToggle(type, selectedOverlooking, setSelectedOverlooking)
              }
              startIcon={isSelected ? <CheckIcon /> : <AddIcon />}
              sx={{
                borderRadius: 5,
                textTransform: "none",
                fontSize: 13,
                borderColor: "#d0d5dd",
                color: "#948f8f",
                backgroundColor: isSelected ? "#e3f2fd" : "#fff",
                "&:hover": { backgroundColor: "#e3f2fd" }
              }}
            >
              {type}
            </Button>
          );
        })}
      </Box>

      {/* Other Features */}
      <Typography variant="h6" gutterBottom fontWeight={600} fontSize={17} mt={4}>
        Other Features
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <FormControlLabel
          sx={{ margin: 0 }}
          control={
            <Checkbox
              size="small"
              checked={otherFeatures.corner}
              onChange={(e) =>
                setOtherFeatures({
                  ...otherFeatures,
                  corner: e.target.checked
                })
              }
            />
          }
          label="Corner Property"
        />

        <FormControlLabel
          sx={{ margin: 0 }}
          control={
            <Checkbox
              size="small"
              checked={otherFeatures.gated}
              onChange={(e) =>
                setOtherFeatures({
                  ...otherFeatures,
                  gated: e.target.checked
                })
              }
            />
          }
          label="In a gated society"
        />

        <FormControlLabel
          sx={{ margin: 0 }}
          control={
            <Checkbox
              size="small"
              checked={otherFeatures.wheelchair}
              onChange={(e) =>
                setOtherFeatures({
                  ...otherFeatures,
                  wheelchair: e.target.checked
                })
              }
            />
          }
          label="Wheelchair friendly"
        />
      </Box>

      {/* Property Facing */}
      <Typography variant="h6" gutterBottom mt={4} fontWeight={600} fontSize={17}>
        Property Facing
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {propertyFacing.map((type, index) => {
          const isSelected = PropertyFacing === type;
          return (
            <Button
              key={index}
              variant="outlined"
              onClick={() => setPropertyFacing(type)}
              sx={{
                borderRadius: 5,
                textTransform: "none",
                fontSize: 13,
                borderColor: "#d0d5dd",
                color: "#948f8f",
                backgroundColor: isSelected ? "#e3f2fd" : "#fff",
                "&:hover": { backgroundColor: "#e3f2fd" }
              }}
            >
              {type}
            </Button>
          );
        })}
      </Box>

      {/* Location Advantages */}
      <Typography variant="h6" gutterBottom mt={4} fontWeight={600} fontSize={17}>
        Location Advantages
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {locationAdvantages.map((type, index) => {
          const isSelected = locationAdv.includes(type);
          return (
            <Button
              key={index}
              variant="outlined"
              onClick={() =>
                handleToggle(type, locationAdv, setLocationAdv)
              }
              startIcon={isSelected ? <CheckIcon /> : <AddIcon />}
              sx={{
                borderRadius: 5,
                textTransform: "none",
                fontSize: 13,
                borderColor: "#d0d5dd",
                color: "#948f8f",
                backgroundColor: isSelected ? "#e3f2fd" : "#fff",
                "&:hover": { backgroundColor: "#e3f2fd" }
              }}
            >
              {type}
            </Button>
          );
        })}
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 3, width: 200, height: 45, borderRadius: "4px", fontSize: 16 }}
        onClick={handleOnContinue}
      >
        Save and Submit
      </Button>

    </Box>
  );
};

export default OtherDetails;