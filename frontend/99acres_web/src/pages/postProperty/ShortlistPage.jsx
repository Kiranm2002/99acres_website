import { useState,useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  InputBase,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MicIcon from "@mui/icons-material/Mic";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Footer from "../../components/home/Footer";
import axios from "axios"

// ── Building illustration (reused from other pages) ──
const BuildingPlaceholder = () => (
  <svg width="100%" height="100%" viewBox="0 0 310 165" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2a2a3e" stopOpacity="0.95" />
        <stop offset="55%" stopColor="#b0b8c8" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#d0d8e4" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <rect width="310" height="165" fill="#c8d5e4" />
    {/* Building 1 */}
    <rect x="50" y="40" width="80" height="110" rx="2" fill="#9aaec4" />
    {[0,1,2,3].map(r => [0,1,2].map(c => (
      <rect key={`a${r}${c}`} x={58+c*22} y={50+r*20} width="14" height="14" rx="1" fill="#b8d0e8" opacity="0.7" />
    )))}
    <rect x="82" y="120" width="16" height="30" rx="1" fill="#7a94ae" />
    {/* Building 2 */}
    <rect x="148" y="25" width="95" height="125" rx="2" fill="#8090a8" />
    {[0,1,2,3,4].map(r => [0,1,2,3].map(c => (
      <rect key={`b${r}${c}`} x={156+c*20} y={34+r*20} width="13" height="13" rx="1" fill="#a0b8d0" opacity="0.65" />
    )))}
    <rect x="183" y="120" width="18" height="30" rx="1" fill="#607088" />
    {/* Ground */}
    <rect y="148" width="310" height="17" fill="#b0bcc8" />
    {/* Gradient overlay */}
    <rect width="310" height="165" fill="url(#fade)" />
  </svg>
);

// ── Tab config ──
const TABS = [
  { key: "recent", label: "Recent Searches", count: 1 },
  { key: "viewed", label: "Viewed", count: 2 },
  { key: "shortlisted", label: "Shortlisted", count: 1 },
  { key: "contacted", label: "Contacted", count: 1 },
];

// ── Property data ──
const SHORTLISTED_PROPERTIES = [
  {
    id: 1,
    price: "₹ 75 L",
    title: "2 BHK Apartment, 1 Baths",
    location: "In Skyline City Apartment, Chandra La...",
    postedBy: "Posted by Owner",
    shortlisted: true,
  },
];

// ── Navbar ──
const Navbar = () => (
  <Box sx={{ backgroundColor: "#2a59c7ff", height: "62px", display: "flex", alignItems: "center", px: { xs: 2, sm: 4 }, gap: 3 }}>
    {/* Logo */}
    <Typography sx={{ fontWeight: 800, fontSize: "35px", color: "#fff", fontFamily: "'Segoe UI', sans-serif", flexShrink: 0, letterSpacing: "-0.5px" }}>
      99<span style={{ fontWeight: 400 }}>acres</span>
    </Typography>

    {/* Wide search bar */}
    <Box
      sx={{
        flex: 2,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "6px",
        height: "44px",
        overflow: "hidden",
        border: "none",ml:6
      }}
    >
      {/* Buy dropdown */}
      <Box sx={{ display: "flex", alignItems: "center", px: 1.8, borderRight: "1px solid #ddd", height: "100%", gap: 0.3, cursor: "pointer", flexShrink: 0 }}>
        <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#333", fontFamily: "'Segoe UI', sans-serif" }}>Buy</Typography>
        <KeyboardArrowDownIcon sx={{ fontSize: "17px", color: "#555" }} />
      </Box>
      {/* Input */}
      <InputBase
        placeholder="Enter Locality / Project / Society / Landmark"
        sx={{ flex: 1, px: 2, fontSize: "14px", fontFamily: "'Segoe UI', sans-serif", color: "#333" }}
      />
      {/* Icons */}
      <MyLocationIcon sx={{ fontSize: "20px", color: "#1c3060", mx: 1, cursor: "pointer" }} />
      <MicIcon sx={{ fontSize: "20px", color: "#1c3060", mx: 0.5, cursor: "pointer" }} />
      {/* Search button */}
      <Box sx={{ backgroundColor: "#fff", height: "44px", px: 1.5, display: "flex", alignItems: "center", borderLeft: "1px solid #eee" }}>
        <SearchIcon sx={{ color: "#333", fontSize: "22px", cursor: "pointer" }} />
      </Box>
    </Box>

    <Box sx={{ flex: 0.3 }} />

    {/* Post property */}
    <Button
      sx={{
        backgroundColor: "#fff",
        color: "#222",
        textTransform: "none",
        fontWeight: 600,
        fontSize: "14px",
        borderRadius: "6px",
        px: 2,
        py: 0.9,
        fontFamily: "'Segoe UI', sans-serif",
        flexShrink: 0,
        whiteSpace: "nowrap",
        "&:hover": { backgroundColor: "#f0f0f0" },
      }}
    >
      Post property{" "}
      <Box component="span" sx={{ backgroundColor: "#4caf50", color: "#fff", fontSize: "10px", fontWeight: 700, px: 0.7, py: 0.25, borderRadius: "3px", ml: 0.8 }}>
        FREE
      </Box>
    </Button>

    {/* Avatar + hamburger */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}>
      <Avatar sx={{ width: 30, height: 30, backgroundColor: "#c8e6c9", color: "#2e7d32", fontSize: "11px", fontWeight: 700 }}>KM</Avatar>
      <KeyboardArrowDownIcon sx={{ color: "#fff", fontSize: "18px" }} />
    </Box>
    <IconButton sx={{ color: "#fff", p: 0.5 }}>
      <MenuIcon sx={{ fontSize: "22px" }} />
    </IconButton>
  </Box>
);

// ── Property Card ──
const PropertyCard = ({ onToggle }) =>{
  const [property,setProperty] = useState("");

  const propertyId = localStorage.getItem("propertyId")
    useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/property/${propertyId}`);
        setProperty(res.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
  
    fetchProperty();
  }, []);
  return (
  <Box sx={{ width: "220px", flexShrink: 0, cursor: "pointer", }}>
    {/* Image area */}
    <Box sx={{ position: "relative", width: "100%", height: "165px", borderRadius: "8px", overflow: "hidden", mb: 1.2 }}>
      <BuildingPlaceholder />
      {/* Heart icon */}
      <IconButton
        onClick={(e) => { e.stopPropagation(); onToggle(property.id); }}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          p: 0.5,
          backgroundColor: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(4px)",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
        }}
      >
        <FavoriteIcon sx={{ fontSize: "20px", color: property.shortlisted ? "#e91e63" : "rgba(255,255,255,0.7)" }} />
      </IconButton>
      {/* Price badge */}
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          left: 10,
          backgroundColor: "rgba(255,255,255,0.92)",
          borderRadius: "5px",
          px: 1.2,
          py: 0.5,
        }}
      >
        <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>
          ₹ {property?.expectedPrice}
        </Typography>
      </Box>
    </Box>

    {/* Card text */}
    <Typography sx={{ fontSize: "24px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", mb: 0.4, lineHeight: 1.3 }}>
      {property?.bedrooms} BHK {property?.catogory}, {property?.bathrooms}Bath
    </Typography>
    <Typography sx={{ fontSize: "16px", color: "#666", fontFamily: "'Segoe UI', sans-serif", mb: 0.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
      In {[property?.propertyprojects?.name, property?.subLocality?.name, property?.locality?.name]
    .filter(Boolean)
    .join(" ")}
    </Typography>
    <Typography sx={{ fontSize: "12px", color: "#888", fontFamily: "'Segoe UI', sans-serif" }}>
      Posted by Owner
    </Typography>
  </Box>
)};

// ── Placeholder for empty tabs ──
const EmptyState = ({ label }) => (
  <Box sx={{ py: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
    <Box sx={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "#f0f4fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <SearchIcon sx={{ fontSize: "30px", color: "#c0ccdd" }} />
    </Box>
    <Typography sx={{ fontSize: "15px", color: "#aaa", fontFamily: "'Segoe UI', sans-serif" }}>
      No {label} yet
    </Typography>
  </Box>
);

// ── Main Page ──
export default function ShortlistPage() {
  const [activeTab, setActiveTab] = useState("shortlisted");
  const [properties, setProperties] = useState(SHORTLISTED_PROPERTIES);

  const handleToggle = (id) => {
    setProperties(prev =>
      prev.map(p => p.id === id ? { ...p, shortlisted: !p.shortlisted } : p)
    );
  };

  const shortlistedProps = properties.filter(p => p.shortlisted);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />

      {/* Page body */}
      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, sm: 6 }, pt: 4 }}>

        {/* ── Tabs row ── */}
        <Box sx={{ display: "flex", alignItems: "center", borderBottom: "1.5px solid #eef0f4", mb: 5 }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <Box
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                sx={{
                  px: 0,
                  mr: 5,
                  pb: 1.5,
                  cursor: "pointer",
                  borderBottom: isActive ? "2.5px solid #1c3060" : "2.5px solid transparent",
                  mb: "-1.5px",
                  transition: "border-color 0.15s",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? "#1c3060" : "#555",
                    fontFamily: "'Segoe UI', sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.count} {tab.label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* ── Tab content ── */}
        {activeTab === "shortlisted" && (
          <Box>
            <Typography sx={{ fontSize: "22px", fontWeight: 800, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", mb: 0.5,}}>
              Shortlisted Properties
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#888", fontFamily: "'Segoe UI', sans-serif", mb: 3.5, }}>
              Contact now to close the deal
            </Typography>

            {shortlistedProps.length > 0 ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {shortlistedProps.map(p => (
                  <PropertyCard key={p.id} property={p} onToggle={handleToggle} />
                ))}
              </Box>
            ) : (
              <EmptyState label="shortlisted properties" />
            )}
          </Box>
        )}

        {activeTab === "recent" && (
          <Box>
            <Typography sx={{ fontSize: "22px", fontWeight: 800, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", mb: 0.5 }}>
              Recent Searches
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#888", fontFamily: "'Segoe UI', sans-serif", mb: 3.5 }}>
              Pick up where you left off
            </Typography>
            <EmptyState label="recent searches" />
          </Box>
        )}

        {activeTab === "viewed" && (
          <Box>
            <Typography sx={{ fontSize: "22px", fontWeight: 800, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", mb: 0.5 }}>
              Viewed Properties
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#888", fontFamily: "'Segoe UI', sans-serif", mb: 3.5 }}>
              Properties you've recently browsed
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {properties.map(p => (
                <PropertyCard key={p.id} property={p} onToggle={handleToggle} />
              ))}
            </Box>
          </Box>
        )}

        {activeTab === "contacted" && (
          <Box>
            <Typography sx={{ fontSize: "22px", fontWeight: 800, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", mb: 0.5 }}>
              Contacted Properties
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#888", fontFamily: "'Segoe UI', sans-serif", mb: 3.5 }}>
              Properties where you've reached out
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {properties.map(p => (
                <PropertyCard key={p.id} property={p} onToggle={handleToggle} />
              ))}
            </Box>
          </Box>
        )}

      </Box>
      <Box sx={{mt:6}}>
        <Footer/>
      </Box>
      
    </Box>
  );
}
