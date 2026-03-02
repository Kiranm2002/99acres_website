import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  InputAdornment,
  IconButton,Checkbox
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios"
import { useEffect } from "react";

const PropertyProfile = () => {
  const navigate = useNavigate();
//   const [boundaryWall, setPropertyType] = useState("Farmhouse");
    
  const [areaUnit, setAreaUnit] = useState("sq.ft.");
  const [boundaryWall, setBoundaryWall] = useState("");
  const [openSides, setOpenSides] = useState("");
  const [construction, setConstruction] = useState("");
  const [possession, setPossession] = useState("");
  const [ownerShip,setOwnerShip] = useState("");
  const [authority,setAuthority] = useState('');
  // Area
const [plotArea, setPlotArea] = useState("");
const [plotLength, setPlotLength] = useState("");
const [plotBreadth, setPlotBreadth] = useState("");
const [floorsAllowed, setFloorsAllowed] = useState("");



// Price
const [expectedPrice, setExpectedPrice] = useState("");
const [pricePerSqft, setPricePerSqft] = useState("");

const [allInclusivePrice, setAllInclusivePrice] = useState(false);
const [taxExcluded, setTaxExcluded] = useState(false);
const [priceNegotiable, setPriceNegotiable] = useState(false);

  const inputStyle = {
    width: 380,
    height: 48,
    "& .MuiOutlinedInput-root": {
      borderRadius: "4px" // square
    }
  };
  const handleOnContinue = async()=>{
    try{
      const propertyId = localStorage.getItem("propertyId");
      console.log(construction,possession,ownerShip,authority)
      await axios.put(
        `http://localhost:5000/property/update-profile`,
        {
          propertyId,
          plotArea,
          areaUnit,
          plotLength,
          plotBreadth,
          floorsAllowed,
          boundaryWall,
          openSides,
          construction,
          possession,
          ownerShip,
          authority,
          expectedPrice,
          pricePerSqft,
          allInclusivePrice,
          taxExcluded,
          priceNegotiable,
        }
      );

      navigate("/post-property/photo-details");
    }catch(error){
      console.error("Error saving profile details:", error);
    }
  }
  useEffect(() => {
  const propertyId = localStorage.getItem("propertyId");

  if (propertyId) {
    axios.get(`http://localhost:5000/property/${propertyId}`)
      .then(res => {
        const data = res.data;

      setPlotArea(data.plotArea || "");
    setAreaUnit(data.areaUnit || "");
    setPlotLength(data.plotLength || "");
    setPlotBreadth(data.plotBreadth || "");
    setFloorsAllowed(data.floorsAllowed || "");
    setBoundaryWall(data.boundaryWall || "");
    setOpenSides(data.openSides || "");
    setConstruction(data.construction || "");
    setPossession(data.possession || "");
    setOwnerShip(data.ownerShip || "");
    setAuthority(data.authority || "");
    setExpectedPrice(data.expectedPrice || "");
    setPricePerSqft(data.pricePerSqft || "");
    setAllInclusivePrice(data.allInclusivePrice || false);
    setTaxExcluded(data.taxExcluded || false);
    setPriceNegotiable(data.priceNegotiable || false);
      });
  }
}, []);

  return (
    <Box sx={{ ml: 6, mt: 6, width: 500,}}>

      {/* 1️⃣ Back */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          mb: 2,
          width: "fit-content",
          "&:hover": { color: "#1976d2" }
        }}
        onClick={() => navigate("/post-property/location")}
      >
        <ArrowBackIcon sx={{ mr: 0.5, fontSize: 22, color: "#808080" }} />
        <Typography sx={{ fontSize: 13, color: "#808080" }}>
          Back
        </Typography>
      </Box>

      {/* 2️⃣ Heading */}
      <Typography variant="h4" sx={{ mb: 4, fontSize:25,fontWeight:600 }}>
        Tell us about your Property
      </Typography>

      {/* 3️⃣ Add Area Details */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ mr: 1,fontWeight:500,fontSize:18 }}>
            Add Area Details
          </Typography>
          <HelpOutlineIcon sx={{ fontSize: 18, color: "gray" }} />
        </Box>

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
            placeholder="Plot Area"
            // label="Plot Area"
            value={plotArea}
            onChange={(e) => setPlotArea(e.target.value)}
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
            <MenuItem value="sq.ft.">sq.ft.</MenuItem>
            <MenuItem value="sq.yards">sq.yards</MenuItem>
            <MenuItem value="sq.m">sq.m</MenuItem>
            <MenuItem value="acres">acres</MenuItem>
            <MenuItem value="marla">marla</MenuItem>
            <MenuItem value="cents">cents</MenuItem>
            <MenuItem value="guntha">guntha</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* 4️⃣ Property Dimensions */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{fontWeight:500,fontSize:18}}>
            Property Dimensions
          </Typography>
          <Typography sx={{ ml: 1, color: "gray",fontSize:14,fontStyle:"italic" }}>
            (Optional)
          </Typography>
        </Box>

        <TextField
          placeholder="Length of plot (in Ft.)"
          value={plotLength}
          onChange={(e) => setPlotLength(e.target.value)}
          sx={{ ...inputStyle, mb: 2 }}
        />

        <TextField
          placeholder="Breadth of plot (in Ft.)"
          value={plotBreadth}
          onChange={(e) => setPlotBreadth(e.target.value)}
          sx={inputStyle}
        />
      </Box>

      {/* 5️⃣ Floors Allowed */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" sx={{ mb: 2,fontWeight:500,fontSize:18 }}>
          Floors Allowed For Construction
        </Typography>

        <TextField
          placeholder="No. of floors"
          value={floorsAllowed}
          onChange={(e) => setFloorsAllowed(e.target.value)}
          sx={inputStyle}
        />
      </Box>

      {/* 6️⃣ Boundary Wall */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" sx={{ mb: 2,fontWeight:500,fontSize:18 }}>
          Is there a boundary wall around the property?
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {[
                        "Yes","No"
                      ].map((type, index) => (
                        <Button
                          key={index}
                          variant="outlined"
                          onClick={() => setBoundaryWall(type)}
                          sx={{
                            borderRadius: 5,
                            textTransform: "none",
                            fontSize: 13,
                            borderColor: "#d0d5dd",
                            color: "#555",
                            backgroundColor: boundaryWall === type ? "#e3f2fd" : "#f8f9fb",
                            "&:hover": {
                                backgroundColor: "#e3f2fd"
                            }
                          }}
                        >
                          {type}
                    </Button>
                ))}
            </Box>
      </Box>

      {/* 7️⃣ No of Open Sides */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{fontWeight:500,fontSize:18}}>
            No. of open sides
          </Typography>
          <HelpOutlineIcon sx={{ fontSize: 18, color: "gray", ml: 1 }} />
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {[
                "1","2","3","3+"
              ].map((type, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => setOpenSides(type)}
                  sx={{
                    height:34,
                    width:34,
                    minWidth:34,
                    borderRadius: "50%",
                    textTransform: "none",
                    fontSize: 13,
                    borderColor: "#d0d5dd",
                    color: "#555",
                    backgroundColor: openSides === type ? "#e3f2fd" : "#f8f9fb",
                    "&:hover": {
                        backgroundColor: "#e3f2fd"
                    },
                  }}
                >
                  {type}
                </Button>
              ))}
            </Box>
      </Box>

      {/* 8️⃣ Any Construction */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2,}}>
          <Typography variant="h6" sx={{fontWeight:500,fontSize:18 }}>
            Any construction done on this property
          </Typography>
          <HelpOutlineIcon sx={{ fontSize: 18, color: "gray", ml: 1 }} />
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {[
                        "Yes","No"
                      ].map((type, index) => (
                        <Button
                          key={index}
                          variant="outlined"
                          onClick={() => setConstruction(type)}
                          sx={{
                            borderRadius: 5,
                            textTransform: "none",
                            fontSize: 13,
                            borderColor: "#d0d5dd",
                            color: "#555",
                            backgroundColor: construction === type ? "#e3f2fd" : "#fff",
                            "&:hover": {
                                backgroundColor: "#e3f2fd"
                            }
                          }}
                        >
                          {type}
                    </Button>
                ))}
            </Box>
      </Box>

        {/* Possession By */}
        <Box mt={4}>
        <Typography fontWeight={500} mb={2} fontSize={18}>
            Possession By
        </Typography>

        <TextField
            select
            fullWidth
            label="Expected by"
            onChange={(e) => setPossession(e.target.value)}
            // SelectProps={{ native: true }}
            sx={{ maxWidth: 350,
                "& .MuiOutlinedInput-root": {
                    borderRadius: "4px" // square
                }
             }}
        >
            <MenuItem value="" disabled>
                Expected by
            </MenuItem>
            <MenuItem value="Immediate">Immediate</MenuItem>
            <MenuItem value="3months">Within 3 months</MenuItem>
            <MenuItem value="6months">Within 6 months</MenuItem>
            <MenuItem value="2026">By 2026</MenuItem>
            <MenuItem value="2027">By 2027</MenuItem>
            <MenuItem value="2028">By 2028</MenuItem>
        </TextField>
        </Box>
            
        {/* Ownership */}
        <Box mt={4}>
        <Box display="flex" alignItems="center" gap={1}>
            <Typography fontWeight={500} fontSize={18}>
            Ownership
            </Typography>
            <HelpOutlineIcon sx={{ fontSize: 18, color: "#8a94a6" }} />
        </Box>

        <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
            {["Freehold", "Leasehold", "Co-operative society", "Power of Attorney"].map((type,index) => (
            <Button
                key={index}
                onClick={() => setOwnerShip(type)}
                variant="outlined"
                sx={{
                borderRadius: 5,
                textTransform: "none",
                fontSize: 13,
                borderColor: "#d0d5dd",
                color: "#555",
                backgroundColor: ownerShip === type ? "#e3f2fd" : "#fff",
                "&:hover": {
                    backgroundColor: "#e3f2fd"
                }
                }}
            >{type}</Button>
            ))}
        </Box>
        </Box>

        {/* Authority Section */}
        <Box mt={4}>
        <Box display="flex" alignItems="center" gap={1}>
            <Typography fontWeight={500} fontSize={18}>
            Which authority the property is approved by ?
            </Typography>
            <HelpOutlineIcon sx={{ fontSize: 18, color: "#8a94a6" }} />
            <Typography sx={{ fontSize: 13, color: "#8a94a6" }}>
            (Optional)
            </Typography>
        </Box>

        <Box mt={2} display="flex" flexWrap="wrap" gap={1} ml={-1}>
            {["DTCP", "BMRDA", "BBMP", "BMICAP", "CUDA", "NPA", "BDA", "DPA", "BIAAPA"].map((type,index) => {
                const isSelected = authority === type;
                return (
                <Button
                    key={index}
                    variant="outlined"
                    onClick={() => setAuthority(type)}
                    startIcon={
                    isSelected ? (
                        <CheckIcon sx={{ fontSize: 16 }} />
                    ) : (
                        <AddIcon sx={{ fontSize: 16 }} />
                    )
                    }
                    sx={{
                    borderRadius: 5,
                    textTransform: "none",
                    fontSize: 13,
                    borderColor: isSelected ? "#1976d2" : "#d0d5dd",
                    color: isSelected ? "#1976d2" : "#555",
                    backgroundColor: isSelected ? "#e3f2fd" : "#fff",
                    "&:hover": {
                        backgroundColor: "#e3f2fd"
                    }
                    }}
                    
                >
                    {type}
                </Button>
                );
            })}
        </Box>
        </Box>

        {/* Price Details */}
        <Box mt={5} >
        <Typography fontWeight={500} mb={2} fontSize={18}>
            Price Details
        </Typography>

        <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
            // fullWidth
            placeholder="₹ Expected Price"
            // fontSize={10}
             value={expectedPrice}
             onChange={(e) => setExpectedPrice(e.target.value)}
            sx={{ width: 220,
                "& .MuiOutlinedInput-root": {
                    borderRadius: "4px"   // sharp edges
                }
             }}
            />

            <TextField
            // fullWidth
            placeholder="₹ Price per sq.ft."
            value={pricePerSqft}
            onChange={(e) => setPricePerSqft(e.target.value)}
            sx={{ maxWidth: 180,
                "& .MuiOutlinedInput-root": {
                    borderRadius: "4px"   // sharp edges
                }
             }}
            />
        </Box>

        <Typography mt={1} fontSize={14} color="#8a94a6">
            ₹ Price in words
        </Typography>

        <Box mt={2} display="flex" flexDirection="column" gap={1}>
            <Box display="flex" gap={3}>
                <FormControlLabel
                sx={{
                    gap: 0.5,
                    ml: 0, 
                    "& .MuiFormControlLabel-label": {
                    fontSize: 14, color:"#696363"
                    }
                }}
                control={<Checkbox 
                  checked={allInclusivePrice}
                  onChange={(e) => setAllInclusivePrice(e.target.checked)}
                  size="small"
                    sx={{color:"#9e9e9e",p:0.5,
                        "&.Mui-checked": {
                        color: "#1976d2"
                        }}}
                />}
                label={<Box display="flex" alignItems="center" gap={0.5}>
                        All inclusive price
                        <HelpOutlineIcon sx={{ fontSize: 16, color: "#9e9e9e" }} />
                    </Box>}
                />
                <FormControlLabel
                sx={{
                    gap: 0.5,
                    ml: 0, 
                    "& .MuiFormControlLabel-label": {
                    fontSize: 14 , color:"#696363"
                    }
                }}
                control={<Checkbox
                  checked={taxExcluded}
                  onChange={(e) => setTaxExcluded(e.target.checked)} 
                  size="small" 
                    sx={{color:"#9e9e9e",ml:-3,p:0.5,
                        "&.Mui-checked": {
                        color: "#1976d2"
                        }}}/>
                }
                label="Tax and Govt. charges excluded"
                />
            </Box>
            <FormControlLabel
            sx={{
                    gap: 0.5,
                    ml: 0, 
                    "& .MuiFormControlLabel-label": {
                    fontSize: 14,color:"#696363" 
                    }
                }}
            control={
                <Checkbox
                     checked={priceNegotiable}
                    onChange={(e) => setPriceNegotiable(e.target.checked)}
                    size="small"
                    sx={{
                    color: "#9e9e9e",p:0.5,
                    "&.Mui-checked": {
                        color: "#1976d2"
                    }
                    }}
                />
                }
            label="Price Negotiable"
            />
        </Box>

        <Typography
            mt={2}
            sx={{
            color: "#1976d2",
            cursor: "pointer",
            fontWeight: 500,fontSize:15
            }}
        >
            + Add more pricing details
        </Typography>
        </Box>

      {/* Continue Button */}
      <Button
        variant="contained"
        sx={{ mt: 3, width: 200, height: 45,borderRadius:"4px" }}
        onClick={handleOnContinue}
      >
        Continue
      </Button>

    </Box>
  );
};

export default PropertyProfile;