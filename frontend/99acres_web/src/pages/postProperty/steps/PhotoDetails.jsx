import {
  Box,
  Typography,
  Button,
  Divider,
  Modal,
  Paper,
  Radio,
  FormControlLabel,TextField
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ImageIcon from "@mui/icons-material/Image";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Gallery from "./gallery.png";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PhotoDetails = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
    const [openEmailModal, setOpenEmailModal] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
const [uploadedPhotos, setUploadedPhotos] = useState([]);
// const [videoUploaded, setVideoUploaded] = useState(false);
const [imagesUploaded, setImagesUploaded] = useState(false);
const [existingPhotos, setExistingPhotos] = useState([]);
const [existingVideo, setExistingVideo] = useState(null);
const [newVideo, setNewVideo] = useState(null); // newly selected
const [videoUploaded, setVideoUploaded] = useState(false); // success flag

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    document.getElementById("videoUpload").click();
  };

  const handlePhotoUploadClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedPhotos(files)
    if (files.length > 0) {
    setImagesUploaded(true);
  }
    // console.log(files);
  };
  const handleEmailChange = (e) => {
  const value = e.target.value;
  setEmail(value);

  if (value.length >= 8) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      setEmailError(
        "That looks like invalid email (ex: abc@xyz.com)"
      );
    } else {
      setEmailError("");
    }
  } else {
    setEmailError("");
  }
};
    const handleOnContinue= async()=>{
       try {
        // propertyId should already exist (created in Step 1)
        const propertyId = localStorage.getItem("propertyId");

        if (!propertyId) {
          alert("Property ID missing. Please start again.");
          return;
        }

        const formData = new FormData();

        // STEP 4 FIELDS
        formData.append("description", description);
        if (email) {
          formData.append("email", email);
        }

        // VIDEO (single)
        const videoInput = document.getElementById("videoUpload");
        if (videoInput?.files?.length > 0) {
          formData.append("video", videoInput.files[0]);
        }

        // PHOTOS (multiple)
        if (uploadedPhotos.length > 0) {
          uploadedPhotos.forEach((photo) => {
            formData.append("photos", photo);
          });
        }

        // API CALL
        await axios.put(
          `http://localhost:5000/property/photo-details/${propertyId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // GO TO STEP 5
        navigate("/post-property/other-details");
      } catch (error) {
        console.error("Step 4 Error:", error);
        alert("Something went wrong while saving photos. Try again.");
      }
    }
    useEffect(() => {
      const fetchProperty = async () => {
        try {
          const propertyId = localStorage.getItem("propertyId");

          const res = await axios.get(
            `http://localhost:5000/property/${propertyId}`
          );
          console.log("API RESPONSE:", res.data);
          const property = res.data;
          console.log("Description from API:", property.description);
          setDescription(property.description || "");
          setEmail(property.email || "");

          // MEDIA
          if (property.video) {
            setExistingVideo(property.video);
            // setVideoUploaded(true);
          }

          if (property.photos?.length > 0) {
            setExistingPhotos(property.photos);
            setImagesUploaded(true);
          }
        } catch (error) {
          console.log("Fetch error:", error);
        }
      };

      fetchProperty();
    }, []);

  return (
    <Box display="flex" height="100%" mt={6} width={500} ml={5} >
      {/* LEFT SECTION */}
      <Box flex={1} pr={6}>
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
          onClick={() => navigate("/post-property/basic-details")}
        >
          <ArrowBackIcon sx={{ mr: 0.5, fontSize: 22, color: "#808080" }} />
          <Typography sx={{ fontSize: 13, color: "#808080" }}>
            Back
          </Typography>
        </Box>

        {/* ================= VIDEO SECTION (YOUR ORIGINAL CODE) ================= */}

        <Typography fontSize={26} fontWeight={500}>
          Add one video of property
        </Typography>

        <Typography mt={1} fontSize={14} color="#6b778c">
          A video is worth a thousand pictures. Properties with videos get higher page views
        </Typography>

        <Typography mt={3} fontSize={14} color="#6b778c">
          Make sure it follows the{" "}
          <span
            style={{ color: "#1976d2", cursor: "pointer", fontWeight: 500 }}
            onClick={() => setOpen(true)}
          >
            Video Guidelines
          </span>
        </Typography>

        <Box
          mt={3}
          border="1px solid #dbe2ea"
          borderRadius={2}
          sx={{ cursor: "pointer" }}
          onClick={handleUploadClick}
        >
          <Box display="flex" alignItems="center" justifyContent="center" gap={2} py={1} bgcolor="#fff">
            <Typography
              sx={{
                backgroundColor: "#d46076",
                color: "#fff",
                fontSize: 10,
                px: 0.5,
                borderRadius: "4px"
              }}
            >
              NEW
            </Typography>

            <FileUploadOutlinedIcon fontSize="small" />
            <Typography fontWeight={500}>Upload Video</Typography>
          </Box>

          <Divider sx={{ backgroundColor: "#0b4db8", height: 2 }} />

          <Box bgcolor="#eef5ff" py={5} textAlign="center">
            <Typography fontSize={14} color="#6b778c">
              Drag your videos here or{" "}
              <span style={{ color: "#1976d2", fontWeight: 500 }}>Upload</span>
            </Typography>

            <Typography mt={1} fontSize={13} color="#6b778c">
              Upload video of max size 80 MB in format .mov, .mp4, .H264. Video <br />
              duration should be less than 10 mins.
            </Typography>
          </Box>
        </Box>
       {/* CASE 1 → Existing Video from DB */}
        {existingVideo && !videoUploaded && (
          <Box mt={1} display="flex" alignItems="center" gap={0.5}>
            <CheckCircleIcon sx={{ color: "green", fontSize: 18 }} />
            <Typography sx={{ color: "green", fontSize: 14 }}>
              Video already uploaded
            </Typography>
          </Box>
        )}

        {/* CASE 2 → New Video Selected */}
        {videoUploaded && (
          <Box mt={1} display="flex" alignItems="center" gap={0.5}>
            <CheckCircleIcon sx={{ color: "green", fontSize: 18 }} />
            <Typography sx={{ color: "green", fontSize: 14 }}>
              Video uploaded successfully
            </Typography>
          </Box>
        )}

        <input type="file" accept="video/*" id="videoUpload" hidden
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setVideoUploaded(true);
              setExistingVideo(null);
            }
          }} />

        <Box mt={4} p={1} borderRadius="4px" bgcolor="#fff3e0" display="flex" alignItems="center" gap={2}>
          <WarningAmberIcon sx={{ color: "#f57c00" }} />
          <Typography fontSize={14}>
            Don`t have a Video! We can help you create one with our Paid Plans, Contact to Upgrade
          </Typography>
        </Box>

        {/* PHOTO SECTION  */}

        {/* 1. Heading */}
        <Box mt={6}>
          <Typography fontSize={26} fontWeight={500}>
            Add photos of your property{" "}
            <Typography component="span" sx={{ fontSize: 14, color: "gray",fontStyle:"italic" }}>
              (Optional)
            </Typography>
          </Typography>

          <Typography mt={1} fontSize={14} color="#6b778c">
            A picture is worth a thousand words. 87% of buyers look at photos before buying
          </Typography>
        </Box>

        {/* 2. Upload Images */}
        <Box mt={4}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Typography fontWeight={500} mb={2}>
              Upload images
            </Typography>
            {imagesUploaded && (
              <Box display="flex" alignItems="center" gap={0.5} mb={2}>
                <CheckCircleIcon sx={{ color: "green", fontSize: 18 }} />
                <Typography sx={{ color: "green", fontSize: 14 }}>
                  Images uploaded successfully
                </Typography>
              </Box>
            )}
          </Box>

          <Paper
            onClick={handlePhotoUploadClick}
            sx={{
              backgroundColor: "#f5faff",
              border: "1px dashed #90caf9",
              p: 3,
              textAlign: "center",
              cursor: "pointer",borderRadius:"4px",
              width:480, height:220
            }}
          >
            <Box
                component="img" src={Gallery} alt="icon"
                sx={{width: 35, height: 35,mb: 1,objectFit: "contain" }}
            ></Box>

            <Typography fontWeight={600} color="primary" fontSize={13} mt={-1.5}>
              + Add atleast 5 photos
            </Typography>

            <Typography sx={{ color: "gray", mt: 2, fontSize:13 }}>
              Drag and drop your photos here
            </Typography>

            <Typography sx={{ color: "gray", fontSize: 10, mt:0.5 }}>
              Upto 50 photos • Max. size 10 MB • Formats: png, jpg, jpeg, gif, webp, heic, heif.
            </Typography>

            <Button  sx={{ mt: 2,borderRadius:"4px",
                border:"1px solid #256ad3"
             }}>
              Upload Photos Now
            </Button>

            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              hidden
              onChange={handlePhotoChange}
            />
          </Paper>
        </Box>

        {/* 3. Black Info Box */}
        <Box sx={{ position: "relative", mt: -1, width:320, }}>
          <Box
            sx={{
              backgroundColor: "#001f3f",
              color: "white",px:1.5,py:1, width: "fit-content",
              borderRadius: "4px",fontSize:15,lineHeight:1.4,
              display:"flex",alignItems:"center",gap:0.5,
              position: "relative"
            }}
          >
            <LightbulbOutlinedIcon sx={{fontSize:18,mb:3}} />
            Add 4+ property photos & increase responses upto 21%

            <Box
              sx={{
                position: "absolute",
                top: -10,
                right: 20,
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderBottom: "10px solid #001f3f"
              }}
            />
          </Box>
        </Box>

        {/* 4. Phone Upload */}
        <Box mt={1} display="flex" alignItems="center" >
          <Box  mr={0.5} >
            <PhoneIphoneIcon color="primary" sx={{fontSize:36}} />
            {/* <ArrowUpwardIcon color="primary" fontSize="small" /> */}
          </Box>

          <Typography fontWeight={600} mb={1.5} fontSize={13}>
            Now you can also upload photos directly <br/> from your phone
          </Typography>
        </Box>

        {/* 5. Registered Number */}
        <Typography mt={0} fontSize={13}>
          With your registered number +91-7619401943
        </Typography>

        {/* 6A WhatsApp */}
        <Box mt={2} border="1px solid #ddd" borderRadius="10px" 
        px={1} display="flex" alignItems="center" width={300} py={1}>
          <FormControlLabel 
            sx={{m:0,"& .MuiFormControlLabel-label":{
                fontSize:14,color:"#575353"
            }}}
          control={<Radio size="small" sx={{p:0.5,color:"#9e9e9e","&.Mui-checked":{color:"#1976d2"}}}/>} 
          label="Send photos over" />
          <WhatsAppIcon sx={{ color: "green", ml:1, fontSize:18 }} />
          <Typography ml={1} color="#575353" fontSize={14}>WhatsApp</Typography>
        </Box>

        {/* 6B SMS */}
        <Box mt={2} border="1px solid #ddd" borderRadius="10px" 
        px={1} display="flex" alignItems="center" width={300} py={1}>
          <FormControlLabel 
            sx={{m:0,"& .MuiFormControlLabel-label":{
                fontSize:14,color:"#575353"
            }}}
          control={<Radio size="small" sx={{p:0.5,color:"#9e9e9e","&.Mui-checked":{color:"#1976d2"}}}/>} 
          label="Get photo upload link over SMS"  />
        </Box>

        {/* 7 Orange Box */}
        <Box mt={3} bgcolor="#fff3e0" p={2} borderRadius="4px" px={1.5} py={1} 
        display="flex" alignItems="center" width={350}>
          <InfoOutlinedIcon sx={{ color: "#f57c00", mr: 1,fontSize:18 }} />
          <Typography sx={{fontSize:13,color:"#757575"}}>
            Without photos your ad will be ignored by buyers
          </Typography>
        </Box>
      
      {/* ================= UNIQUE PROPERTY SECTION ================= */}

        <Box mt={6}>
        <Typography fontSize={18} fontWeight={500}>
            What makes your property unique
        </Typography>

        <Typography fontSize={14} color="#757575" mt={0.5}>
            Adding description will increase your listing visibility
        </Typography>

        {/* Description Field */}
        <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="Share some details about your property like spacious rooms, well maintained facilities.."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
            mt: 2,
            "& .MuiOutlinedInput-root": {
                borderRadius: "6px",fontSize:14,
            }
            }}
        />

        {/* Character Info */}
        <Box display="flex" justifyContent="space-between" mt={0.5}>
            <Typography fontSize={12} color="#757575">
            Minimum 30 characters required
            </Typography>

            <Typography fontSize={12} color="#757575">
            {description.length}/5000
            </Typography>
        </Box>
        </Box>

        {/* ================= ADD EMAIL SECTION ================= */}

        <Box mt={5}>
        <Box display="flex" alignItems="center" gap={1}>
            <Typography fontSize={20} fontWeight={500}>
            Add Email
            </Typography>

            <Typography
            fontSize={14}
            color="#9e9e9e"
            fontStyle="italic"
            >
            (Optional)
            </Typography>
        </Box>

        {/* Clickable Email Field */}
        <TextField
            fullWidth
            placeholder="Email"
            value={email}
            sx={{ mt: 2, maxWidth: 400,"& .MuiOutlinedInput-root":{borderRadius:0} }}
            onClick={() => setOpenEmailModal(true)}
            InputProps={{
            readOnly: true  // optional (recommended)
          }}
        />
        </Box>

        {/* ================= CONTINUE BUTTON ================= */}

        <Box mt={4} mb={6}>
        <Button
            variant="contained"
            // fullWidth
            sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize:15,
            borderRadius: "4px",
            py: 2,width:"200",
            backgroundColor: "#1976d2",
            "&:hover": {
                backgroundColor: "#115293"
            }
            }}
            onClick={handleOnContinue}
        >
            {uploadedPhotos.length >= 2
            ? "Continue"
            : "Continue without photos"}
            
        </Button>
        </Box>
        </Box>
      

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box bgcolor="#fff" p={4} borderRadius={2} width={400} mx="auto" mt={10}>
          <Typography fontWeight={600}>Video Guidelines</Typography>
          <Typography mt={2} fontSize={14}>
            Guidelines content will be added here later.
          </Typography>
        </Box>
      </Modal>

        {/* Email Modal */}
<Modal
  open={openEmailModal}
  onClose={() => setOpenEmailModal(false)}
  aria-labelledby="email-modal-title"
  aria-describedby="email-modal-description"
>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "#fff",
      p: 4,
      width: 400,
      borderRadius: 1,
      boxShadow: 24,
    //   position: "relative"
    }}
  >
    {/* Close Icon */}
    <IconButton
      onClick={() => setOpenEmailModal(false)}
      sx={{
        position: "absolute",
        top: 8,
        right: 8,
        color: "#757575"
      }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>

    <Typography
      id="email-modal-title"
      fontWeight={600}
      mb={2}
      fontSize={18}
    >
      Add Email
    </Typography>

    <TextField
      fullWidth
      label="Email"
      placeholder="Email"
      value={email}
      onChange={handleEmailChange}
      error={Boolean(emailError)}
      helperText={emailError}
      variant="outlined"
      sx={{ mb: 3,"& .MuiOutlinedInput-root":{borderRadius:0}}}
    />

    <Button
      variant="contained"
      fullWidth
      disabled={email.length < 8 || Boolean(emailError)}
      sx={{
        backgroundColor:
          email.length >= 8 && !emailError
            ? "#1976d2"
            : "#90caf9",
        color: "white",
        textTransform: "none",
        fontWeight: 600,
        "&:hover": {
          backgroundColor:
            email.length >= 8 && !emailError
              ? "#115293"
              : "#90caf9",
        },borderRadius:"4px"
      }}
      onClick={() => {
        if (!emailError && email.length >= 8) {
          setOpenEmailModal(false);
        }
      }}
    >
      Share
    </Button>
  </Box>
</Modal>


    </Box>
  );
};

export default PhotoDetails;