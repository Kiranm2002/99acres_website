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
import AuthModal from "../auth/AuthModal";


const SecondaryNavbar = ({ show,user,setUser,onSearch, resultsCount, searchQuery  }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openAuth, setOpenAuth] = useState(false)
  
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
            onClick={()=>{
            const id = localStorage.getItem("userId")
              if(id){
                navigate('/dashboard')
              }else{
                navigate('/')
              }}}
            sx={{ fontWeight: 700, whiteSpace: "nowrap", cursor:"pointer" }}
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
              onChange={(e) => onSearch(e.target.value)}
              error={searchQuery && resultsCount === 0}
              helperText={
                searchQuery && resultsCount === 0
                  ? `No listings found for "${searchQuery}"`
                  : ""}
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
          onClick={()=>{
             const accessToken = localStorage.getItem("accessToken")
              if(accessToken){
                navigate("/post-property/primary-details")
              }else{
                navigate("/post-property")
              }
          }}
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
                  bgcolor: "#ddf8df",
                  color: "#5ea92f",
                  fontWeight: "bold",
                  width: 28,  // responsive
                  height: 28,
                  fontSize: 12
                  
                }}
                 title={`${user.firstName || ""} ${user.lastName || ""}`}
              >
                {user.firstName?.charAt(0).toUpperCase() || ""} 
                {user.lastName?.charAt(0).toUpperCase() || ""}
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
                      setOpenAuth(true);
                      handleMenuClose();
                    }}
                  >
                    Login / Register
                  </MenuItem>
                  
                </>
              ) : (
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("userId");
                    localStorage.removeItem("accessToken");
                    setUser(null); // log out user
                    handleMenuClose();
                    navigate('/')
                  }}
                >
                  Logout
                </MenuItem>
              )}
              {user && (<MenuItem onClick={()=>navigate("/post-property/shortlist-property")}>
                ShortListed
              </MenuItem>)}
            </Menu>

          {/* MENU */}
          <IconButton sx={{ color: "#fff" }} onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <AuthModal
              open={openAuth}
              handleClose={() => setOpenAuth(false)}
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