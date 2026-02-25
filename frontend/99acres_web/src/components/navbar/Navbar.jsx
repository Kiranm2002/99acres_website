import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  IconButton,Avatar
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import AuthModal from "../auth/AuthModal";
// import LoginModal from "../auth/Login";
// import RegisterModal from "../auth/Register";
import AuthModal from "../auth/AuthModal";
import AppDrawer from "../common/AppDrawer";



const Navbar = ({isHomePage,user,setUser}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    // const navigate = useNavigate();
    // const [openAuth, setOpenAuth] = useState(false);
    // const [authType, setAuthType] = useState(""); 
    // const [openLogin, setOpenLogin] = useState(false);
    // const [openRegister, setOpenRegister] = useState(false);
    const [openAuth, setOpenAuth] = useState(false);

    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
  return (<>
    <AppBar
      position={isHomePage ? "absolute":"fixed"} elevation={0}
      sx={{
        backgroundColor: isHomePage ?"transparent":"#fff", 
        // color:isHomePage ? "#fff":"#000",
        top: 0, left: 0, right: 0, width: "100%", 
        "--AppBar-color": isHomePage ? "#fff" : "#000",
    "--AppBar-background": isHomePage ? "transparent" : "#fff",
    boxShadow: isHomePage ? "none" : "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "70px",
            px:0,
            flexWrap:"nowrap",
            color: isHomePage ? "#fff" : "#000"
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: {xs:1,sm:2,md:3},
            whiteSpace:"nowrap",flexShrink:1,minWidth:0
           }}>
            <Typography variant="h5" fontWeight={700} sx={{fontSize:"2rem"}}>
              99acres
            </Typography>

            <Button sx={{ color: isHomePage ? "#f5f5f5" : "#000", fontWeight:"600",
              textTransform: "none",whiteSpace: "nowrap",px: { xs: 0.5, sm: 1, md: 2 } }}>
              Buy in Bangalore East
            </Button>

            <Button 
              variant="text" disableRipple
              sx={{ 
              // color: "#6d6d6d !important",
              color: isHomePage ? "#fff" : "#6d6d6d", 
              fontWeight:"500",
              textTransform: "none" ,
              "&:hover": {
                color: isHomePage ? "#fff" : "#000",
                backgroundColor: "transparent",
              },whiteSpace: "nowrap",px: { xs: 0.5, sm: 1, md: 2 }
              }}>
              For Buyers
            </Button>

            <Button
              variant="text" disableRipple
              sx={{ 
              // color: "#6d6d6d !important",
              color: isHomePage ? "#fff" : "#6d6d6d", 
              fontWeight:"500",
              textTransform: "none" ,
              "&:hover": {
                color: isHomePage ? "#fff" : "#000",
                backgroundColor: "transparent",
              },whiteSpace: "nowrap",px: { xs: 0.5, sm: 1, md: 2 }
              }} 
            >
              For Tenants
            </Button>

            <Button
              variant="text" disableRipple
              sx={{ 
              // color: "#6d6d6d !important",
              color: isHomePage ? "#fff" : "#6d6d6d", 
              fontWeight:"500",
              textTransform: "none" ,
              "&:hover": {
                color: isHomePage ? "#fff" : "#000",
                backgroundColor: "transparent",
              },whiteSpace: "nowrap",px: { xs: 0.5, sm: 1, md: 2 }
              }} 
            >
              For Owners
            </Button>

            <Button
            variant="text" disableRipple
              sx={{ 
              // color: "#6d6d6d !important",
              color: isHomePage ? "#fff" : "#6d6d6d", 
              fontWeight:"500",
              textTransform: "none" ,
              "&:hover": {
                color: isHomePage ? "#fff" : "#000",
                backgroundColor: "transparent",
              },whiteSpace: "nowrap",px: { xs: 0.5, sm: 1, md: 2 }
              }} 
            >
              For Dealers / Builders
            </Button>

            <Button
              variant="text" disableRipple
              sx={{ 
              // color: "#6d6d6d !important",
              color: isHomePage ? "#fff" : "#6d6d6d", 
              fontWeight:"500",
              textTransform: "none" ,
              position:"relative",
              "&:hover": {
                color: isHomePage ? "#fff" : "#000",
                backgroundColor: "transparent",
              },whiteSpace: "nowrap",px: { xs: 0.5, sm: 1, md: 2 }
              }} 
            >
              Insights
              {/* <Box
                sx={{
                  position: "absolute",
                  top: -4,         // adjust vertical position
                  right: -10,       // adjust horizontal position near last letter
                  bgcolor: "#ff4d4f",
                  color: "#fff",
                  fontSize: "8px",
                  fontWeight: 700,
                  px: 0.5,
                  py: "1px",
                  border:"1px solid #fff",
                  borderRadius: "2px",
                  lineHeight: 1.5,
                  minWidth: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                New
              </Box> */}
            </Button>
            </Box>
            

          {/* RIGHT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#444",
              borderRadius: "8px",
              textTransform: "none",
              px: {xs:1,sm:2,md:3},
              py:0.5,
              // minWidth:"auto",
              fontWeight: 600,
              fontSize: { xs: "0.65rem", sm: "0.875rem" },
               height: { xs: 28, sm: 34 },
              boxShadow: "none",
              "&:hover": { backgroundColor: "#f5f5f5", boxShadow: "none" },
              display:"flex",
              alignItems:"center",
              gap:0.5,
              flexShrink:1,
              minWidth:0,
              whiteSpace: "nowrap"
            }}
          >
            Post property 
            <Box
                sx={{
                bgcolor: "green",
                color: "#fff",
                fontSize: "10px",
                px: 0.5,
                ml: 1,
                borderRadius: "4px",
                height:17,
                minWidth:17,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                whiteSpace: "nowrap"
                }}
                >
                FREE
                </Box>
          </Button>

          <IconButton 
            sx={{backgroundColor:"#fff",
              width: { xs: 22, sm: 25 },height: { xs: 22, sm: 25 },
              "&:hover":{backgroundColor:"#f5f5f5"}
            }}
          >
            <SupportAgentIcon sx={{ color: "#000", fontSize:{ xs: 18, sm: 20 } }} />
          </IconButton>

          <IconButton color="inherit" onClick={handleMenuOpen}>
                {user ? (
              <Avatar
                sx={{
                  bgcolor: "#fff",
                  color: "#000",
                  fontWeight: "bold",
                  width: { xs: 28, sm: 35 },   // responsive
                  height: { xs: 28, sm: 35 },
                  fontSize: { xs: 12, sm: 14 },
                }}
              >
                {user.firstName.charAt(0).toUpperCase()}
                {user.lastName.charAt(0).toUpperCase()}
              </Avatar>
            ) : (
              <AccountCircleIcon sx={{ fontSize: { xs: 28, sm: 30 } }}/>
            )}
          </IconButton>

              <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {!user ? (
              <MenuItem
                onClick={() => {
                  setOpenAuth(true);
                  handleMenuClose();
                }}
              >
                Login / Register
              </MenuItem>
            ) : (
                <MenuItem
                  onClick={() => {
                    setUser(null);          // log out user
                    handleMenuClose();
                    navigate('/')
                  }}
                >
                  Logout
                </MenuItem>
              )}
            </Menu>

            
             <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
            </IconButton>
          </Box>
            {/* <AuthModal 
            open={openAuth} 
            handleClose={() => setOpenAuth(false)}
            authType={authType} 
          /> */}
          {/* <LoginModal
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
            /> */}
            <AuthModal
              open={openAuth}
              handleClose={() => setOpenAuth(false)}
              setUser={setUser}
            />
        </Toolbar>
      </Container>
    </AppBar>
    <AppDrawer
    open={drawerOpen}
    onClose={() => setDrawerOpen(false)}
    user={user}
  />
  </>
  );
};

export default Navbar;
