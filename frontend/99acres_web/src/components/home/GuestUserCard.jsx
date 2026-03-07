import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginModal  from '../auth/Login';
import RegisterModal  from '../auth/Register';
import { useState,useEffect } from 'react';
import { Button, Box, Typography, IconButton, Paper,Avatar } from '@mui/material';
import AuthModal from '../auth/AuthModal';
import axiosInstance from '../../utils/axiosInstance';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


function GuestUserCard({ user, setUser, showSecondaryNav }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [properties, setProperties] = useState([])

useEffect(() => {
  const fetchProperties = async () => {
    try {
      const { data } = await axiosInstance.get("/property/all-properties"); // endpoint relative to baseURL
      setProperties(data.properties); // assuming API returns { properties: [...] }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };
  fetchProperties();
}, []);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
        //   position: "sticky",
        //   top: 80,
        //   right: 70, // distance from right edge
        //   left:"auto",
        //   alignSelf:"flex-start",
          width: "100%", // fixed width
          p: 3,
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
        //   alignItems: "center",
          gap: 3,
        //   zIndex: 50,
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit">
                {user ? (
              <Avatar
                sx={{
                  bgcolor: "#ddf8df",
                  color: "#5ea92f",
                  fontWeight: "bold",
                  width: 28,  // responsive
                  height: 28,
                  fontSize: 12
                }}
                title={`${user.firstName} ${user.lastName}`}
              >
                {user.firstName?.charAt(0)?.toUpperCase() || ""}
                {user.lastName?.charAt(0)?.toUpperCase() || ""}
              </Avatar>
            ) : (
              <AccountCircleIcon sx={{ fontSize: { xs: 28, sm: 30 } }}/>
            )}
          </IconButton>
          {user ? (
            <Typography fontWeight={600}>{user.firstName} {user.lastName}</Typography>
          ):(
          <Typography fontWeight={600}>Guest User</Typography>)}
        </Box>

        {user && (<>
          <Typography sx={{fontSize:12, color:"#a5a2a2"}}>YOUR RECENT ACTIVITY</Typography>
        <Box sx={{display:"flex", gap:3, mt:-1}}>
          <Box sx={{backgroundColor:"#e8f4f8", width:"120px", 
            height:"80px", borderRadius:"4px"}}
            onClick={()=>window.open("/post-property/user-property-dashboard","_blank")}>
              <Box sx={{display:"flex", gap:7,}}>
              <Typography sx={{fontSize:24,ml:2, mt:1}}> {properties.length}</Typography>
              <ArrowForwardIcon sx={{transform: "rotate(-45deg)",fontSize: 20, mt:1.5, color:"#4b96ed"}}/>
             </Box>
            <Typography sx={{fontSize:12, mt:1.5,ml:1}}>Property Posted</Typography>
          </Box>

          <Box sx={{backgroundColor:"#e8f4f8", width:"120px", 
            height:"80px", borderRadius:"4px"}}
            onClick={()=>window.open("/post-property/user-property-dashboard","_blank")}>
              <Box sx={{display:"flex", gap:7,}}>
              <Typography sx={{fontSize:24,ml:2, mt:1}}>0</Typography>
              <ArrowForwardIcon sx={{transform: "rotate(-45deg)",fontSize: 20, mt:1.5, color:"#4b96ed"}}/>

            </Box>
            <Typography sx={{fontSize:12, mt:1.5,ml:1}}>Total Responses</Typography>
          </Box>
        </Box> </> )}  

        {/* Buttons: Login & Register */}
        {!user && (<Box sx={{ display: "flex", gap: 2, width: "100%", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ textTransform: "none", flex: 1, borderRadius:"4px" }}
            onClick={() => setOpenAuth(true)}
          >
            Login / Register
           
          </Button>

        </Box>)}
          {/* Alert bannner */}
         {user && (<Box sx={{ mt: 2, backgroundColor: "#fff3f3", border: "1px solid #ffc8c8", borderRadius: "8px", p: 1.5, display: "flex", alignItems: "flex-start", gap: 1 }}>
        <ErrorOutlineIcon sx={{ fontSize: "20px", color: "#e53935", flexShrink: 0, mt: 0.2 }} />
        <Box>
          <Typography sx={{ fontSize: "13px", color: "#333", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.4 }}>
            Free listing is visible to only 14% buyers
          </Typography>
          <Typography sx={{ fontSize: "13px", color: "#1557a0", fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", cursor: "pointer", mt: 0.3 }}>
            Get upto 10X Responses - Upgrade
          </Typography>
        </Box>
      </Box>)}
        {/* Bottom small text */}
        <Typography variant="caption" color="text.secondary" textAlign="center">
          & see your activities across browsers & devices...
        </Typography>
      </Paper>
          <AuthModal
                        open={openAuth}
                        handleClose={() => setOpenAuth(false)}
                        setUser={setUser}
                      />
      
    </>
  );
}

export default GuestUserCard;