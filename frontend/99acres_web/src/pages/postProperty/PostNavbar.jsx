import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AppDrawer from "../../components/common/AppDrawer";

const PostNavbar = ({ onLoginClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
            sx={{ fontSize: 26, fontWeight: 700, color: "#fff", ml: "40px" }}
          >
            99acres
          </Typography>

          <Box>
            <IconButton color="inherit" onClick={handleMenuOpen} sx={{ mr: 1 }}>
              <AccountCircleIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  onLoginClick();   
                }}
              >
                Login / Register
              </MenuItem>
            </Menu>

            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon sx={{ mr: 2 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <AppDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Spacer */}
      <Toolbar />
    </>
  );
};

export default PostNavbar;