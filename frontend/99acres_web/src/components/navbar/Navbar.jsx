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
import LoginModal from "../auth/Login";
import RegisterModal from "../auth/Register";
import AppDrawer from "../common/AppDrawer";

//testing jwt
// import Login from "../auth/Login1";
// import Register from "../auth/Register1"

const Navbar = ({isHomePage,user,setUser}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    // const navigate = useNavigate();
    // const [openAuth, setOpenAuth] = useState(false);
    // const [authType, setAuthType] = useState(""); 
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

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
        backgroundColor: isHomePage ?"transparent":"#fff", color:isHomePage ? "#fff":"#000",
        top: 0, left: 0, right: 0, width: "100%", 
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "70px",
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Typography variant="h5" fontWeight={700}>
              99acres
            </Typography>

            <Button sx={{ color: "#fff", textTransform: "none" }}>
              Buy in Bangalore East
            </Button>

            <Button sx={{ color: "#fff", textTransform: "none" }}>
              For Buyers
            </Button>

            <Button sx={{ color: "#fff", textTransform: "none" }}>
              For Tenants
            </Button>

            <Button sx={{ color: "#fff", textTransform: "none" }}>
              For Owners
            </Button>

            <Button sx={{ color: "#fff", textTransform: "none" }}>
              For Dealers / Builders
            </Button>

            <Button sx={{ color: "#fff", textTransform: "none" }}>
              Insights
            </Button>
            </Box>
            

          {/* RIGHT SIDE */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "20px",
              textTransform: "none",
              px: 3,
              fontWeight: 600,
            }}
          >
            Post property 
            <Box
                sx={{
                bgcolor: "green",
                color: "#fff",
                fontSize: "10px",
                px: 1,
                ml: 1,
                borderRadius: "4px",
                }}
                >
                FREE
                </Box>
          </Button>
          <IconButton color="inherit">
            <SupportAgentIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen}>
                {user ? (
              <Avatar
                sx={{
                  bgcolor: "#fff",
                  color: "#000",
                  fontWeight: "bold",
                  width: 35,
                  height: 35,
                  fontSize: 14,
                }}
              >
                {user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
              </Avatar>
            ) : (
              <AccountCircleIcon />
            )}
          </IconButton>

              <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {!user ? (
                <>
                  <MenuItem
                    onClick={() => {
                      setOpenLogin(true);
                      handleMenuClose();
                    }}
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpenRegister(true);
                      handleMenuClose();
                    }}
                  >
                    Register
                  </MenuItem>
                </>
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
            {/* <AuthModal 
            open={openAuth} 
            handleClose={() => setOpenAuth(false)}
            authType={authType} 
          /> */}
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
