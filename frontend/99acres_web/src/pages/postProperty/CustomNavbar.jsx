import React, { useState, useEffect, useRef } from "react";
import { AppBar, Toolbar, Typography, Box, InputBase, Button,
    IconButton, Avatar, MenuItem, Menu } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AppDrawer from "../../components/common/AppDrawer";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// ── For Owners mega-dropdown ──────────────────────────────────────────────────
const ForOwnersDropdown = ({ onClose, navigate }) => {
  const LEFT_SECTIONS = [
    { label: "OWNER OFFERINGS" },
    { label: "INSIGHTS" },
    { label: "ARTICLES & NEWS" },
  ];

  const MIDDLE_LINKS = [
    { label: "Post Property", badge: "FREE", path: "/post-property/primary-details" },
    { label: "Owner Services",  path: "/post-property/user-property-dashboard" },
    { label: "My99acres",       path: "/post-property/user-property-dashboard" },
    { label: "View Responses",  path: "/post-property/user-property-dashboard" },
  ];

  return (
    // Full-screen overlay to catch outside clicks
    <Box
      onClick={onClose}
      sx={{ position: "fixed", inset: 0, zIndex: 1200 }}
    >
      {/* The actual dropdown panel */}
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: "fixed",
          top: "68px",
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
          zIndex: 1300,
          display: "flex",
          minHeight: "400px",
          width:"900px",ml:30
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: "absolute", top: 12, right: 16, color: "#555", zIndex: 10 }}
        >
          <CloseIcon sx={{ fontSize: "22px" }} />
        </IconButton>

        {/* LEFT column — grey bg */}
        <Box
          sx={{
            width: "240px",
            flexShrink: 0,
            backgroundColor: "#f7f8fa",
            borderRight: "1px solid #eef0f4",
            px: 3.5,
            py: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          {LEFT_SECTIONS.map((s) => (
            <Button
              key={s.label}
              onClick={() => {}}
              disableRipple
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "15px",
                color: "#7A7A7A",
                fontFamily: "'Segoe UI', Sans-serif",
                p: 0,
                minWidth: 0,
                "&:hover": { backgroundColor: "transparent", color: "#1557a0" },
              }}
            >
              {s.label}
            </Button>
          ))}

          {/* Contact info at bottom */}
          <Box sx={{ mt: "auto", pt: 3 }}>
            <Typography sx={{ fontSize: "13px", color: "#888", fontFamily: "'Segoe UI', sans-serif", mb: 0.4 }}>
              contact us toll free on
            </Typography>
            <Box sx={{display:"flex",gap:0.5 }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#333", fontFamily: "'Segoe UI', sans-serif" }}>
              1800 41 99099
            </Typography>
            <Typography sx={{ fontSize: "11px", color: "#aaa",mt:0.5, fontFamily: "'Segoe UI', sans-serif" }}>
              (9AM-11PM IST)
            </Typography>
            </Box>
          </Box>
        </Box>

        {/* MIDDLE column — white */}
        <Box
          sx={{
            flex: 1,
            px: 3,
            py: 4.5,
            display: "flex",
            flexDirection: "column",
            
          }}
        >
          {/* Section heading */}
          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#aaa",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              fontFamily: "'Segoe UI', sans-serif",
              mb: 1,
            }}
          >
            OWNER OFFERINGS
          </Typography>

          {/* Nav links as buttons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            {MIDDLE_LINKS.map((link) => (
              <Button
                key={link.label}
                onClick={() => { navigate(link.path); onClose(); }}
                disableRipple
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#222",
                  fontFamily: "'Segoe UI', sans-serif",
                  px: 0,
                  py: 0.2,
                  minWidth: 0,
                  gap: 1,
                  "&:hover": { backgroundColor: "transparent", color: "#1557a0" },
                }}
              >
                {link.label}
                {link.badge && (
                  <Box
                    component="span"
                    sx={{
                      backgroundColor: "#4caf50",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: 700,
                      px: 0.7,
                      py: 0.2,
                      borderRadius: "3px",
                      lineHeight: 1.6,
                    }}
                  >
                    {link.badge}
                  </Box>
                )}
              </Button>
            ))}
          </Box>

          {/* Footer email/call */}
          <Box sx={{ mt: "auto", pt: 3, borderTop: "1px solid #eef0f4", }}>
            <Typography sx={{ fontSize: "13px", color: "#888", fontFamily: "'Segoe UI', sans-serif" }}>
              Email us at{" "}
              <Typography component="span" sx={{ color: "#5c5a5a", fontWeight: 600,fontSize:14, cursor: "pointer" }}>
                services@99acres.com
              </Typography>
              . or call us at{" "}
              <Typography component="span" sx={{ fontWeight: 600,fontSize:14, color: "#5c5a5a" }}>
                1800 41 99099
              </Typography>{" "}
              <Typography component="span" sx={{ color: "#888",fontSize:14, }}>
                (IND Toll-Free)
              </Typography>
            </Typography>
          </Box>
        </Box>

        {/* RIGHT column — promo card */}
        <Box
          sx={{
            width: "280px",
            flexShrink: 0,
            px: 3,
            py: 3.5,
            display: "flex",
            alignItems: "stretch",
            height:"280px",
            mt:3,mr:4
          }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#eef7f0",
              borderRadius: "12px",
              p: 2.5,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              position: "relative",
              
            }}
          >
            {/* Text content */}
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 800,
                color: "#071c2c",
                fontFamily: "'Segoe UI', sans-serif",
                lineHeight: 1.3,
                mb: 1,
                maxWidth: "160px",
              }}
            >
              Sell or rent faster at the right price!
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: "#555",
                fontFamily: "'Segoe UI', sans-serif",
                mb: 2,
              }}
            >
              List your property now for FREE
            </Typography>
            <Button
              variant="contained"
              onClick={() => { navigate("/post-property/primary-details"); onClose(); }}
              sx={{
                backgroundColor: "#1557a0",
                color: "#fff",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "14px",
                borderRadius: "6px",
                px: 2.5,
                py: 1,
                width: "fit-content",
                fontFamily: "'Segoe UI', sans-serif",
                zIndex: 2,
                position: "relative",
                "&:hover": { backgroundColor: "#0e4080" },
              }}
            >
              Post Property
            </Button>

            {/* Agent image — positioned at bottom right */}
            <Box
              component="img"
              src="https://www.99acres.com/universalapp/img/hp_ppf_banner.png"
              alt="Agent"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                height: "50%",
                objectFit: "contain",
                objectPosition: "bottom right",
                pointerEvents: "none",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// ── Main Navbar ───────────────────────────────────────────────────────────────
const CustomNavbar = ({ user, setUser, onOpenLogin }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [forOwnersOpen, setForOwnersOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const hoverTimeout = useRef(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Hover handlers with small delay to prevent flicker
  const handleForOwnersEnter = () => {
    clearTimeout(hoverTimeout.current);
    setForOwnersOpen(true);
  };
  const handleForOwnersLeave = () => {
    hoverTimeout.current = setTimeout(() => setForOwnersOpen(false), 120);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await axiosInstance.get("/property/all-properties");
        setProperties(data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1557a0", boxShadow: "none", height: "68px", justifyContent: "center" }}>
        <Toolbar sx={{ minHeight: "68px !important", px: { xs: 2, sm: 4 }, gap: 2.5 }}>

          {/* Logo */}
          <Typography 
          onClick={()=>{navigate('/dashboard')}}
          sx={{ fontWeight: 800, fontSize: "35px", color: "#fff", letterSpacing: "-0.5px", 
            flexShrink: 0, 
            fontFamily: "'Segoe UI', sans-serif", mr: 0.5,cursor:"pointer" }}
            >
            99<span style={{ fontWeight: 400 }}>acres</span>
          </Typography>

          {/* My Postings */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, cursor: "pointer", flexShrink: 0 }}>
            <Typography sx={{ fontSize: "15px", color: "#fff", fontWeight: 500, fontFamily: "'Segoe UI', sans-serif", whiteSpace: "nowrap" }}>
              My Postings ({properties.length})
            </Typography>
            <KeyboardArrowDownIcon sx={{ color: "#fff", fontSize: "20px" }} />
          </Box>

          {/* Search Bar */}
          <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#fff", borderRadius: "6px", flex: 1, maxWidth: "480px", height: "42px", overflow: "hidden" }}>
            <Box sx={{ display: "flex", alignItems: "center", px: 1.5, borderRight: "1px solid #ddd", height: "100%", cursor: "pointer", flexShrink: 0 }}>
              <Typography sx={{ fontSize: "14px", color: "#333", fontWeight: 600, fontFamily: "'Segoe UI', sans-serif" }}>Buy</Typography>
              <KeyboardArrowDownIcon sx={{ fontSize: "17px", color: "#555" }} />
            </Box>
            <InputBase placeholder="Enter Locality / Pro..." sx={{ flex: 1, px: 1.5, fontSize: "14px", fontFamily: "'Segoe UI', sans-serif", color: "#333" }} />
            <MyLocationIcon sx={{ fontSize: "20px", color: "#1557a0", mx: 1, cursor: "pointer" }} />
            <MicIcon sx={{ fontSize: "20px", color: "#1557a0", mx: 0.5, cursor: "pointer" }} />
            <Box sx={{ backgroundColor: "#1557a0", height: "42px", px: 1.8, display: "flex", alignItems: "center" }}>
              <SearchIcon sx={{ color: "#fff", fontSize: "22px" }} />
            </Box>
          </Box>

          {/* Nav links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 3, ml: 0.5 }}>

            {/* For Owners — hover triggers dropdown */}
            <Box
              onMouseEnter={handleForOwnersEnter}
              onMouseLeave={handleForOwnersLeave}
              sx={{ position: "relative", display: "flex", alignItems: "center" }}
            >
              <Typography
                sx={{
                  fontSize: "15px",
                  color: "#fff",
                  fontWeight: 500,
                  fontFamily: "'Segoe UI', sans-serif",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  pb: 0.5,
                  borderBottom: forOwnersOpen ? "2px solid #fff" : "2px solid transparent",
                  transition: "border-color 0.15s",
                }}
              >
                For Owners
              </Typography>
            </Box>

            <Typography sx={{ fontSize: "15px", color: "#fff", fontWeight: 500, fontFamily: "'Segoe UI', sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
              Owner Plans
            </Typography>
          </Box>

          {/* Post Property */}
          <Button
            variant="outlined"
            onClick={() => navigate("/post-property/primary-details")}
            sx={{ backgroundColor: "#fff", borderColor: "#fff", color: "#000", textTransform: "none", fontWeight: 600, fontSize: "14px", borderRadius: "6px", px: 2, py: 0.8, whiteSpace: "nowrap", flexShrink: 0, fontFamily: "'Segoe UI', sans-serif", "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderColor: "#fff" } }}
          >
            Post property{" "}
            <Box component="span" sx={{ backgroundColor: "#4caf50", color: "#fff", fontSize: "11px", fontWeight: 700, px: 0.7, py: 0.2, borderRadius: "3px", ml: 1 }}>
              FREE
            </Box>
          </Button>

          {/* Right icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, flexShrink: 0 }}>
            <IconButton sx={{ color: "#fff", p: 0.8 }}>
              <NotificationsNoneIcon sx={{ fontSize: "22px" }} />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", px: 1, py: 0.4 }}>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                {user ? (
                  <Avatar sx={{ bgcolor: "#ddf8df", color: "#5ea92f", fontWeight: "bold", width: 28, height: 28, fontSize: 12 }}
                    title={`${user.firstName} ${user.lastName}`}>
                    {user.firstName?.charAt(0)?.toUpperCase() || ""}
                    {user.lastName?.charAt(0)?.toUpperCase() || ""}
                  </Avatar>
                ) : (
                  <AccountCircleIcon sx={{ fontSize: { xs: 28, sm: 30 } }} />
                )}
              </IconButton>
              <KeyboardArrowDownIcon sx={{ color: "#fff", fontSize: "20px" }} />

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {!user ? (
                  <MenuItem onClick={() => { onOpenLogin?.(); handleMenuClose(); }}>
                    Login / Register
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => { localStorage.removeItem("userId"); localStorage.removeItem("accessToken"); setUser(null); handleMenuClose(); navigate("/"); }}>
                    Logout
                  </MenuItem>
                )}
                {user && (
                  <MenuItem onClick={() => { navigate("/post-property/shortlist-property"); handleMenuClose(); }}>
                    ShortListed
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <IconButton sx={{ color: "#fff", p: 0.8 }} onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ fontSize: "24px" }} />
            </IconButton>
            <AppDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} user={user} onOpenLogin={onOpenLogin} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* For Owners mega dropdown — rendered outside AppBar so it overlays the page */}
      {forOwnersOpen && (
        <Box
          onMouseEnter={handleForOwnersEnter}
          onMouseLeave={handleForOwnersLeave}
        >
          <ForOwnersDropdown onClose={() => setForOwnersOpen(false)} navigate={navigate} />
        </Box>
      )}
    </>
  );
};

export default CustomNavbar;
