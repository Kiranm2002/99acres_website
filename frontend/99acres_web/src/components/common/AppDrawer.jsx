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
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useLocation,useNavigate } from "react-router-dom";
import PromoCard from "../home/PromoCard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const AppDrawer = ({ open, onClose, user,onOpenLogin, }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
      <Box sx={{ width: 340,borderBottom: "1px solid #e0e0e0" }}>

        {/* ========================= */}
        {/* 🔹 TOP SECTION */}
        {/* ========================= */}

        <Box
          sx={{
            px:2,
            py:1,
            backgroundColor: "#f1f3f6",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            
            // justifyContent:"flex-start"
          }}
        >
          {!user ? (
              <>
                <AccountCircleIcon sx={{ fontSize: 32, color: "#3a4047" }} />

                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#1565c0",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    fontSize: 14
                  }}
                  onClick={onOpenLogin}
                >
                  Login / Register
                </Typography>
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
          <IconButton onClick={onClose} sx={{ml:"90px"}}>
              <CloseIcon />
            </IconButton>
        </Box>
            <Box sx={{ p: 2 }}>
            <PromoCard />
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
        {/* 🔹 UPDATED MENU SECTION */}
        {/* ========================= */}

        <List>

          {/* 1️⃣ Post Property with FREE badge */}
          <ListItemButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
             <Typography fontWeight={500} onClick={()=>navigate("/post-property")}>
              Post Property
            </Typography>
            <Box
              sx={{
                bgcolor: "#1565c0",
                color: "#fff",
                px: 0.5,
                height:"15px",
                ml:1,
                borderRadius: "3px",
                fontSize: 10,
                fontWeight: 600
              }}
            >
              FREE
            </Box>
          </Box>
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          {/* 2️⃣ Explore our Services Heading */}
          <Typography
            sx={{
              px: 2,
              py: 1,
              color: "#333",
              // fontWeight: 600,
              fontSize: 15
            }}
          >
            Explore our Services
          </Typography>

          <Divider />

          {/* 3️⃣ Service Options */}
          {[
            "For Buyers",
            "For Tenants",
            "For Owners",
            "For Dealers / Builders"
          ].map((item, index) => (
            <ListItemButton key={index} sx={{py:0.5}}>
              <ChevronRightIcon sx={{ fontSize: 18, color: "#777", mr: 1 }} />
              <ListItemText primary={item} primaryTypographyProps={{fontSize:"14px"}} />
            </ListItemButton>
          ))}

          <Divider sx={{ my: 1 }} />

          {/* 4️⃣ Home Loans Section */}
          <Typography
            sx={{
              px: 2,
              py: 1,
              color: "#333",
              // fontWeight: 600,
              fontSize: 15
            }}
          >
            Home Loans
          </Typography>

          <ListItemButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ChevronRightIcon sx={{ fontSize: 18, color: "#777", mr: 1 }} />
              <Typography fontWeight={500} sx={{fontSize:"14px"}}>
                Insights
              </Typography>
            <Box
              sx={{
                bgcolor: "#0d1b4c",
                color: "#fff",
                px: 1,
                ml:1,
                height:"15px",
                borderRadius: "3px",
                fontSize: 10,
                fontWeight: 600
              }}
            >
              NEW
            </Box>
            </Box>
          </ListItemButton>

          <ListItemButton>
            <ChevronRightIcon sx={{ fontSize: 18, color: "#777", mr: 1 }} />
            <ListItemText primary="Articles & News" primaryTypographyProps={{fontSize:"14px"}}/>
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          {/* 5️⃣ About Us Section */}
          <Typography
            sx={{
              px: 2,
              py: 1,
              color: "#333",
              // fontWeight: 600,
              fontSize: 15
            }}
          >
            About Us
          </Typography>

          {["Get Help", "Download App"].map((item, index) => (
            <ListItemButton key={index}>
              <ChevronRightIcon sx={{ fontSize: 18, color: "#777", mr: 1 }} />
              <ListItemText primary={item} primaryTypographyProps={{fontSize:"14px"}}/>
            </ListItemButton>
          ))}

          <Divider sx={{ my: 2 }} />

          {/* 6️⃣ Search Box */}
          <Box sx={{ px: 2, pb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#f1f3f6",
                px: 2,
                py: 1,
                borderRadius: 1
              }}
            >
              <input
                type="text"
                placeholder="Search by Property Code"
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  flex: 1,
                  fontSize: 14
                }}
              />
              🔍
            </Box>
          </Box>

          {/* 7️⃣ Bottom Text */}
          <Box sx={{ px: 2, pb: 3 }}>
            <Typography fontSize={13}>
              Toll Free Number: 1800 41 99099.
            </Typography>
            <Typography fontSize={13}>
              For international numbers <span style={{ color: "#1565c0", cursor: "pointer" }}>click here</span>
            </Typography>
          </Box>

        </List>

        
      </Box>
    </Drawer>
  );
};

export default AppDrawer;