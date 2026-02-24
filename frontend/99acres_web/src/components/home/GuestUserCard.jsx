import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginModal  from '../auth/Login';
import RegisterModal  from '../auth/Register';
import { useState,useEffect } from 'react';
import { Button, Box, Typography, IconButton, Paper } from '@mui/material';

function GuestUserCard({ user, setUser, showSecondaryNav }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
//   const position = showSecondaryNav ? "fixed" : "sticky";

//    useEffect(() => {
//     if (showSecondaryNav) {
      
//       setPosition('fixed');
//       setTopOffset(140); 
//     } else {
      
//       setPosition('sticky');
//       setTopOffset(480);
//     }
//   }, [showSecondaryNav]);

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
          <IconButton sx={{ bgcolor: "#f0f0f0", width: 40, height: 40 }}>
            <AccountCircleIcon sx={{ color: "#555" }} />
          </IconButton>
          <Typography fontWeight={600}>Guest User</Typography>
        </Box>

        {/* Buttons: Login & Register */}
        <Box sx={{ display: "flex", gap: 2, width: "100%", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ textTransform: "none", flex: 1, borderRadius:"4px" }}
            onClick={() => setOpenLogin(true)}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            sx={{ textTransform: "none", flex: 1,borderRadius:"4px" }}
            onClick={() => setOpenRegister(true)}
          >
            Register
          </Button>
        </Box>

        {/* Bottom small text */}
        <Typography variant="caption" color="text.secondary" textAlign="center">
          & see your activities across browsers & devices...
        </Typography>
      </Paper>

      {/* Login & Register Modals */}
      <LoginModal
        open={openLogin}
        handleMenuClose={() => setOpenLogin(false)}
        user={user}
        setUser={setUser}
      />
      <RegisterModal
        open={openRegister}
        handleMenuClose={() => setOpenRegister(false)}
        user={user}
        setUser={setUser}
      />
    </>
  );
}

export default GuestUserCard;