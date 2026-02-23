import React, { useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  IconButton,
  Collapse
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const AppDrawer = ({ open, onClose, user }) => {
  const [openProfile, setOpenProfile] = useState(false);

  const commonOptions = [
    "Buy Property",
    "Rent Property",
    "Sell Property",
    "Home Loans",
    "Property Services",
    "Contact Us"
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300 }}>

        {/* ========================= */}
        {/* 🔹 TOP SECTION */}
        {/* ========================= */}

        <Box
          sx={{
            p: 3,
            backgroundColor: "#f5f7fa",
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >
          {!user ? (
            // 🔹 WITHOUT LOGIN
            <>
              <AccountCircleIcon sx={{ fontSize: 40 }} />

              <Box>
                <Typography fontWeight={600}>Welcome</Typography>
                <Typography
                  sx={{ cursor: "pointer", color: "#1565c0", fontSize: 14 }}
                >
                  Login / Register
                </Typography>
              </Box>
            </>
          ) : (
            // 🔹 WITH LOGIN
            <>
              <Avatar sx={{ bgcolor: "#1565c0" }}>
                {user.firstName?.charAt(0).toUpperCase()}
                {user.lastName?.charAt(0).toUpperCase()}
              </Avatar>

              <Box sx={{ flexGrow: 1 }}>
                <Typography fontWeight={600}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                  My Account
                </Typography>
              </Box>

              <IconButton
                size="small"
                onClick={() => setOpenProfile(!openProfile)}
              >
                {openProfile ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </>
          )}
        </Box>

        {/* ========================= */}
        {/* 🔹 PROFILE DROPDOWN */}
        {/* ========================= */}

        {user && (
          <Collapse in={openProfile}>
            <List>
              <ListItemButton>
                <ListItemText primary="My Profile" />
              </ListItemButton>

              <ListItemButton>
                <ListItemText primary="My Properties" />
              </ListItemButton>

              <ListItemButton>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </List>
            <Divider />
          </Collapse>
        )}

        {/* ========================= */}
        {/* 🔹 COMMON OPTIONS */}
        {/* ========================= */}

        <List>
          {commonOptions.map((item, index) => (
            <ListItemButton key={index}>
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>

      </Box>
    </Drawer>
  );
};

export default AppDrawer;