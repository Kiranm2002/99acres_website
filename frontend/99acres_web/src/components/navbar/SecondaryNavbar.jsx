import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Slide,MenuItem,Menu,Avatar
} from "@mui/material";

import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AppDrawer from "../common/AppDrawer";
import LoginModal from "../auth/Login";
import RegisterModal from "../auth/Register";
import { useNavigate } from "react-router-dom";


const SecondaryNavbar = ({ show,user,setUser }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  
  const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
      const handleMenuClose = () => {
        setAnchorEl(null);
      };

  // const toggleDrawer = (state) => {
  //   setOpenDrawer(state);
  // };
  return (<>
    <Slide direction="down" in={show} mountOnEnter unmountOnExit>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#1565c0",
          px: 2,
          boxShadow: 3,
          // zIndex: 1400,
        }}
      >
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          
          {/* LOGO */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, whiteSpace: "nowrap" }}
          >
            99acres
          </Typography>

          {/* LOCATION */}
          <Button
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              textTransform: "none",
              color: "#fff",
              whiteSpace: "nowrap",
            }}
          >
            Buy in Bangalore East
          </Button>

          {/* SEARCH SECTION */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: "8px",
              px: 1,
              height: 40,
            }}
          >
            <Button
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                textTransform: "none",
                color: "#000",
                minWidth: 80,
              }}
            >
              Buy
            </Button>

            <TextField
              fullWidth
              variant="standard"
              placeholder="Enter Locality / Project / Society / Landmark"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <MyLocationIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <MicIcon fontSize="small" />
                  </InputAdornment>
                  
                ),
              }}
              sx={{ ml: 1 }}
            />

            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* POST PROPERTY */}
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: "#fff",
              color: "#000",
              px: 2,
              borderRadius:"10px",
              whiteSpace: "nowrap",
              "&:hover": { backgroundColor: "#f5f5f5" },
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

          {/* PROFILE */}
          <IconButton sx={{ color: "#fff" }} onClick={handleMenuOpen}>
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
                {user.firstName.charAt(0).toUpperCase()}
                {user.lastName.charAt(0).toUpperCase()}
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
                    setUser(null); // log out user
                    handleMenuClose();
                    navigate('/')
                  }}
                >
                  Logout
                </MenuItem>
              )}
            </Menu>

          {/* MENU */}
          <IconButton sx={{ color: "#fff" }} onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
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
      </AppBar>
    </Slide>
    <AppDrawer
    open={drawerOpen}
    onClose={() => setDrawerOpen(false)}
    user={user}
  />
  </>
  );
};

export default SecondaryNavbar;