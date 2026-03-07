import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,Avatar
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AppDrawer from "../../components/common/AppDrawer";
import { useNavigate } from "react-router-dom";
import AuthModal from "../../components/auth/AuthModal";

const PostNavbar = ({ onLoginClick, user, setUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const navigate = useNavigate();
  const [authRedirectPath, setAuthRedirectPath] = useState("")
  // console.log(user)
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#1d5ab6" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          <Typography
          onClick={()=>{
            const id = localStorage.getItem("userId")
            if(id){
              navigate('/dashboard')
            }else{
              navigate('/')
            }}}
            
            sx={{ fontSize: 26, fontWeight: 700, color: "#fff", ml: "40px", cursor:"pointer" }}
          >
            99acres
          </Typography>

          <Box>
            
            <IconButton color="inherit" onClick={handleMenuOpen}>
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
                                setAuthRedirectPath("/post-property/primary-details")
                              }}
                            >
                              Login / Register
                            </MenuItem>
                            
                          ) : (
                              <MenuItem
                                onClick={() => {
                                  localStorage.removeItem("userId");
                                  localStorage.removeItem("accessToken");
                                  setUser(null);          // log out user
                                  handleMenuClose();
                                  navigate('/')
                                }}
                              >
                                Logout
                              </MenuItem>
                            )}
            </Menu>

            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon sx={{ mr: 2 }} />
            </IconButton>
          </Box>
          <AuthModal
                        open={openAuth}
                        handleClose={() => setOpenAuth(false)}
                        setUser={setUser}
                        redirectPath={authRedirectPath}
                      />
        </Toolbar>
      </AppBar>
        
      <AppDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={user}
        setUser={setUser}
        onOpenLogin={onLoginClick}
      />

      {/* Spacer */}
      <Toolbar />
    </>
  );
};

export default PostNavbar;