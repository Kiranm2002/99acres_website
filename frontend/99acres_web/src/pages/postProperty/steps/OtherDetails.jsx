import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Checkbox,
  FormControlLabel,
  Stack,TextField,Divider,Select,MenuItem
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";

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

const propertyFacing=["North","South","East","West","North-East",
  "North-West","South-East","South-West"]

const locationAdvantages=["Close to Metro Station","Close to School","Close to Hospital",
  "Close to Market","Close to Railway Station"]

const OtherDetails = () => {
  const navigate = useNavigate();

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedOverlooking, setSelectedOverlooking] = useState([]);
  const [PropertyFacing,setPropertyFacing] = useState([])
  const [areaUnit, setAreaUnit] = useState("Feet");
  const [locationAdv, setLocationAdv]=useState([])
  const [otherFeatures, setOtherFeatures] = useState({
    corner: false,
    gated: false,
    wheelchair: false
  });

  // Toggle handler for Chips
  const handleToggle = (value, list, setter) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  return (
    <Box p={4} mt={1}>
      {/* 1️⃣ Back Button */}
      <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            mb: 2,
            width: "fit-content",
            "&:hover": { color: "#1976d2" }
          }}
          onClick={() => navigate("/post-property/photo-details")}
        >
          <ArrowBackIcon sx={{ mr: 0.5, fontSize: 22, color: "#808080" }} />
          <Typography sx={{ fontSize: 13, color: "#808080" }}>
            Back
          </Typography>
        </Box>

      {/* 2️⃣ Heading + Sentence */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add amenities/unique features
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3} fontSize={14}>
        These fields are used to populate USP & captions.<br/> All fields on this
        page are optional.
      </Typography>

      {/* 3️⃣ Amenities Section */}
      <Typography variant="h6" gutterBottom fontWeight={600} fontSize={17}>
        Amenities
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {amenitiesOptions.map((type,index)=>{
            const isSelected = selectedAmenities === type;
            return(
            <Button
                key={index}
                variant="outlined"
                onClick={() => setSelectedAmenities(type)}
                startIcon={isSelected ? <CheckIcon /> : <AddIcon />}
                sx={{
                 borderRadius: 5,
                 textTransform: "none",
                 fontSize: 13,
                 borderColor: "#d0d5dd",
                 color: "#948f8f",
                 backgroundColor: selectedAmenities === type ? "#e3f2fd" : "#fff",
                 "&:hover": {
                             backgroundColor: "#e3f2fd"
                        }
                }}>
                    {type}
                </Button>)
            })}
      </Box>

      {/* 4️⃣ Overlooking Section */}
      <Typography variant="h6" gutterBottom mt={4} fontWeight={600} fontSize={17}>
        Overlooking
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {overlookingOptions.map((type,index)=>{
            const isSelected = selectedOverlooking === type;
            return(
            <Button
                key={index}
                variant="outlined"
                onClick={() => setSelectedOverlooking(type)}
                startIcon={isSelected ? <CheckIcon /> : <AddIcon />}
                sx={{
                 borderRadius: 5,
                 textTransform: "none",
                 fontSize: 13,
                 borderColor: "#d0d5dd",
                 color: "#948f8f",
                 backgroundColor: selectedOverlooking === type ? "#e3f2fd" : "#fff",
                 "&:hover": {
                             backgroundColor: "#e3f2fd"
                        }
                }}>
                    {type}
                </Button>)
            })}
      </Box>

      {/* 5️⃣ Other Features */}
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
            corner: e.target.checked,
          })
        }
      />
    }
    label="Corner Property"
    componentsProps={{
      typography: {
        sx: { fontSize: 14 },
      },
    }}
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
            gated: e.target.checked,
          })
        }
      />
    }
    label="In a gated society"
    componentsProps={{
      typography: {
        sx: { fontSize: 14 },
      },
    }}
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
            wheelchair: e.target.checked,
          })
        }
      />
    }
    label="Wheelchair friendly"
    componentsProps={{
      typography: {
        sx: { fontSize: 14 },
      },
    }}
  />
</Box>
    <Typography variant="h6" gutterBottom mt={4} fontWeight={600} fontSize={17}>
        Property Facing
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {propertyFacing.map((type,index)=>{
            const isSelected = PropertyFacing === type;
            return(
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
                 backgroundColor: PropertyFacing === type ? "#e3f2fd" : "#fff",
                 "&:hover": {
                             backgroundColor: "#e3f2fd"
                        }
                }}>
                    {type}
                </Button>)
            })}
      </Box>

      <Typography variant="h6" gutterBottom mt={4} fontWeight={600} fontSize={17}>
        Width of facing road
      </Typography>

            <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #c4c4c4",
                        borderRadius: "4px",
                        width: 380,
                        height: 48,
                        px: 2
                      }}
                    >
                      <TextField
                        variant="standard"
                        placeholder="Enter the width"
                        // label="Plot Area"
                        InputProps={{ disableUnderline: true }}
                        sx={{ flex: 1 }}
                      />
            
                      <Divider orientation="vertical" flexItem />
            
                      <Select
                        value={areaUnit}
                        onChange={(e) => setAreaUnit(e.target.value)}
                        variant="standard"
                        disableUnderline
                        sx={{ ml: 2, width: 100 }}
                      >
                        <MenuItem value="" disabled>Select</MenuItem>
                        <MenuItem value="Feet">Feet</MenuItem>
                        <MenuItem value="Meter">Meter</MenuItem>
                        
                      </Select>
                    </Box>
        <Typography variant="h6" gutterBottom mt={4} fontWeight={600} fontSize={17}>
        Location Advantges
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3} fontSize={13} mt={-1}>
        Highlight the nearby landmarks*
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {locationAdvantages.map((type,index)=>{
            const isSelected = locationAdv === type;
            return(
            <Button
                key={index}
                variant="outlined"
                onClick={() => setLocationAdv(type)}
                startIcon={isSelected ? <CheckIcon /> : <AddIcon />}
                sx={{
                 borderRadius: 5,
                 textTransform: "none",
                 fontSize: 13,
                 borderColor: "#d0d5dd",
                 color: "#948f8f",
                 backgroundColor: locationAdv === type ? "#e3f2fd" : "#fff",
                 "&:hover": {
                             backgroundColor: "#e3f2fd"
                        }
                }}>
                    {type}
                </Button>)
            })}
      </Box>
      <Typography variant="body2" color="primary" mb={3} fontSize={13} mt={1}>
        Show more
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3} fontSize={10} mt={-1}>
        *Please provide the correct information, otherwise your listing might get selected
      </Typography>
      <Button
              variant="contained"
              sx={{ mt: 3, width: 200, height: 45,borderRadius:"4px",fontSize:16 }}
              onClick={()=>navigate("/post-property/thank-you")}
            >
              Save and Submit
          </Button>
    </Box>
  );
};

export default OtherDetails;