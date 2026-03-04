import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  IconButton,
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import MenuIcon from "@mui/icons-material/Menu";
// import SecondaryNavbar from "../../components/navbar/SecondaryNavbar";
import { useNavigate } from "react-router-dom";
import RecommendedProjects from "../../components/home/RecommendedProjects";
import RecommendedProperties from "../../components/home/RecommendedProperties";
import Footer from "../../components/home/Footer";
import axios from "axios";

// ── Dummy PostNavbar (replace with your actual import) ──
const PostNavbar = () => (
  <Box sx={{ backgroundColor: "#1557a0", height: "64px", display: "flex", alignItems: "center", px: 4, gap: 3 }}>
    <Typography sx={{ fontWeight: 800, fontSize: "34px", color: "#fff", fontFamily: "'Segoe UI', sans-serif", flexShrink: 0 }}>
      99<span style={{ fontWeight: 400 }}>acres</span>
    </Typography>
    {/* Wide search bar */}
    <Box sx={{ flex: 1, maxWidth: "680px", display: "flex", alignItems: "center", backgroundColor: "#fff", borderRadius: "6px", height: "42px", overflow: "hidden" }}>
      <Box sx={{ display: "flex", alignItems: "center", px: 1.5, borderRight: "1px solid #ddd", height: "100%", gap: 0.3, flexShrink: 0 }}>
        <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#333", fontFamily: "'Segoe UI', sans-serif" }}>Buy</Typography>
        <KeyboardArrowDownIcon sx={{ fontSize: "17px", color: "#555" }} />
      </Box>
      <Typography sx={{ flex: 1, px: 2, fontSize: "14px", color: "#aaa", fontFamily: "'Segoe UI', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        Enter Locality / Project / Society / Landmark
      </Typography>
      <Box sx={{ px: 1.5, display: "flex", alignItems: "center", height: "100%", cursor: "pointer" }}>
        <Typography sx={{ fontSize: "20px", color: "#555" }}>🔍</Typography>
      </Box>
    </Box>
    <Box sx={{ flex: 1 }} />
    {/* Post property — white bg, black text */}
    <Button sx={{ backgroundColor: "#fff", color: "#222", textTransform: "none", fontWeight: 600, fontSize: "14px", borderRadius: "6px", px: 2, py: 0.8, fontFamily: "'Segoe UI', sans-serif", flexShrink: 0, "&:hover": { backgroundColor: "#f0f0f0" } }}>
      Post property
      <Box component="span" sx={{ backgroundColor: "#4caf50", color: "#fff", fontSize: "11px", fontWeight: 700, px: 0.7, py: 0.2, borderRadius: "3px", ml: 1 }}>FREE</Box>
    </Button>
    {/* Avatar — no border */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 1, cursor: "pointer" }}>
      <Box sx={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "#c8e6c9", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#2e7d32" }}>KM</Typography>
      </Box>
      <KeyboardArrowDownIcon sx={{ color: "#fff", fontSize: "18px" }} />
    </Box>
    <IconButton sx={{ color: "#fff" }}>
      <MenuIcon sx={{ fontSize: "24px" }} />
    </IconButton>
  </Box>
);

// ── Property image placeholder ──
const PropertyImagePlaceholder = () => (
  <svg width="100%" height="100%" viewBox="0 0 460 240" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="460" height="240" fill="#d0d8e4" />
    <rect x="80" y="70" width="100" height="150" rx="3" fill="#b0bec5" />
    <rect x="200" y="50" width="120" height="170" rx="3" fill="#90a4ae" />
    {[0,1,2,3].map(r => [0,1,2].map(c => (
      <rect key={`b1-${r}-${c}`} x={90 + c*28} y={82 + r*28} width="18" height="18" rx="2" fill="#cfd8dc" />
    )))}
    {[0,1,2,3,4].map(r => [0,1,2,3].map(c => (
      <rect key={`b2-${r}-${c}`} x={210 + c*26} y={62 + r*26} width="17" height="17" rx="2" fill="#b0bec5" />
    )))}
    <rect x="118" y="190" width="24" height="30" rx="2" fill="#90a4ae" />
    <rect x="250" y="185" width="26" height="35" rx="2" fill="#78909c" />
    <rect y="218" width="460" height="22" fill="#b0bec5" />
  </svg>
);

// ── Detail row item ──
const DetailItem = ({ icon, label, children }) => (
  <Box sx={{ py: 2.5, borderBottom: "1px solid #f0f2f5" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.6 }}>
      <Box sx={{ color: "#aaa", display: "flex", alignItems: "center" }}>{icon}</Box>
      <Typography sx={{ fontSize: "13px", color: "#888", fontFamily: "'Segoe UI', sans-serif" }}>{label}</Typography>
    </Box>
    <Box sx={{ pl: "28px" }}>{children}</Box>
  </Box>
);

const TABS = ["Overview", "Owner Details", "Price Trends", "Explore Locality", "Featured Dealers", "Recomm"];

export default function PropertyPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [pricePinned, setPricePinned] = useState(false);
  const [buyerType, setBuyerType] = useState("Individual");
  const [reason, setReason] = useState("Investment");
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("I am interested in this Property.");
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const tabsRef = useRef(null);
  const priceSectionRef = useRef(null);
  const [property, setProperty] = useState(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const navbarH = 64;
      const breadcrumbH = 48;

      // Hide navbar on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > navbarH) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
      lastScrollY.current = currentY;

      // Pin price+RERA+tabs bar after scrolling past title section
      setPricePinned(currentY > navbarH + breadcrumbH + 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* ── Sticky Navbar (hides on scroll down) ── */}
      <Box
        ref={navbarRef}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1200,
          transform: navbarVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <PostNavbar />
        {/* <SecondaryNavbar/> */}
      </Box>

      {/* ── Breadcrumb ── */}
      <Box sx={{ backgroundColor: "#fff", borderBottom: "1px solid #eef0f4", px: { xs: 2, sm: 6 }, py: 1.2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0.3 }}>
          {["Home", "Property in Bangalore", "Flats for sale in Bangalore", "Flats for sale in Chandra Layout", "2 BHK Flats for sale in Chandra Layout"].map((crumb, i, arr) => (
            <Box key={crumb} sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "12px", color: i < arr.length - 1 ? "#1557a0" : "#555", fontFamily: "'Segoe UI', sans-serif", cursor: i < arr.length - 1 ? "pointer" : "default" }}>
                {crumb}
              </Typography>
              {i < arr.length - 1 && <NavigateNextIcon sx={{ fontSize: "15px", color: "#aaa", mx: 0.2 }} />}
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ fontSize: "12px", color: "#666", fontFamily: "'Segoe UI', sans-serif" }}>Posted on Mar 03, 2026</Typography>
          <Box sx={{ width: "1px", height: "14px", backgroundColor: "#ccc" }} />
          <Typography sx={{ fontSize: "12px", color: "#666", fontFamily: "'Segoe UI', sans-serif" }}>Under Construction</Typography>
        </Box>
      </Box>

      {/* ── Pinned price+RERA+tabs bar (shows when scrolled past title) ── */}
      <Box
        sx={{
          position: "sticky",
          top: navbarVisible ? "64px" : "0px",
          zIndex: 1100,
          backgroundColor: "#fff",
          borderBottom: "1px solid #e0e6ef",
          boxShadow: pricePinned ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
          transition: "top 0.3s ease, box-shadow 0.2s ease",
        }}
      >
        {/* Price + actions row — only visible when pinned */}
        {pricePinned && (
          <Box sx={{ px: { xs: 2, sm: 6 }, py: 1, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f0f2f5" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ fontSize: "24px", fontWeight: 800, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1 }}>
                ₹<span style={{ fontSize: "28px" }}>75 Lac</span>
              </Typography>
              <Box sx={{ width: "1px", height: "26px", backgroundColor: "#ccc" }} />
              <Typography sx={{ fontSize: "18px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>2BHK 1Bath</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
              <IconButton sx={{ border: "1px solid #e0e6ef", borderRadius: "6px", p: 0.8 }}>
                <FavoriteBorderIcon sx={{ fontSize: "20px", color: "#666" }} />
              </IconButton>
              <Button variant="contained" startIcon={<EditIcon />} 
              sx={{ backgroundColor: "#00897b", color: "#fff", textTransform: "none", 
              fontWeight: 600, fontSize: "13px", borderRadius: "6px", px: 2, py: 0.8, 
              fontFamily: "'Segoe UI', sans-serif", "&:hover": { backgroundColor: "#00695c" } }}
               onClick={()=> window.open("/post-property/primary-details", "_blank")}
                >
                Edit property
              </Button>
            </Box>
          </Box>
        )}

        {/* RERA row — only visible when pinned */}
        {pricePinned && (
          <Box sx={{ px: { xs: 2, sm: 6 }, py: 0.8, display: "flex", alignItems: "center", gap: 2, borderBottom: "1px solid #f0f2f5" }}>
            <Chip label="RERA STATUS ℹ" size="small" sx={{ backgroundColor: "#1557a0", color: "#fff", fontSize: "11px", fontWeight: 700, fontFamily: "'Segoe UI', sans-serif", height: "22px", borderRadius: "4px" }} />
            <Chip label="NOT AVAILABLE" size="small" sx={{ backgroundColor: "#fff", color: "#e53935", fontSize: "11px", fontWeight: 700, border: "1.5px solid #e53935", fontFamily: "'Segoe UI', sans-serif", height: "22px", borderRadius: "4px" }} />
            <Box sx={{ width: "1px", height: "16px", backgroundColor: "#ddd" }} />
            <Typography sx={{ fontSize: "12px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
              Website: <span style={{ color: "#1557a0", cursor: "pointer" }}>https://rera.karnataka.gov.in/</span>
            </Typography>
          </Box>
        )}

        {/* Tabs — always sticky */}
        <Box
          ref={tabsRef}
          sx={{ px: { xs: 2, sm: 6 }, display: "flex", alignItems: "center" }}
        >
          {TABS.map((tab, i) => (
            <Box key={tab} onClick={() => setActiveTab(i)} sx={{ px: 2.5, py: 1.5, cursor: "pointer", borderBottom: activeTab === i ? "3px solid #1557a0" : "3px solid transparent" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: activeTab === i ? 700 : 400, color: activeTab === i ? "#1557a0" : "#555", fontFamily: "'Segoe UI', sans-serif", whiteSpace: "nowrap" }}>
                {tab}
              </Typography>
            </Box>
          ))}
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center", cursor: "pointer" }}>
            <NavigateNextIcon sx={{ fontSize: "20px", color: "#555" }} />
          </Box>
        </Box>
      </Box>

      {/* ── Main content ── */}
      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, sm: 5 }, py: 3 }}>

        {/* Title row */}
        <Box ref={priceSectionRef} sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 0.5 }}>
              <Typography sx={{ fontSize: "34px", fontWeight: 800, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1 }}>
                ₹<span style={{ fontSize: "40px" }}>{property?.expectedPrice}</span>
              </Typography>
              <Typography sx={{ fontSize: "15px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>@ {property?.pricePerSqft} per {property?.areaUnit}</Typography>
            </Box>
            <Typography sx={{ fontSize: "14px", color: "#00897b", fontWeight: 600, fontFamily: "'Segoe UI', sans-serif" }}>
              Estimated EMI ₹59,903
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", flex: 1, px: 4 }}>
            <Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>2BHK 1Bath</Typography>
            <Typography sx={{ fontSize: "15px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>{property?.category} for {property?.lookingFor}</Typography>
            <Typography sx={{ fontSize: "13px", color: "#777", fontFamily: "'Segoe UI', sans-serif" }}>in {property?.project?.name}, {property?.subLocality?.name}, {property?.city?.name}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, flexShrink: 0 }}>
            <Button variant="contained" startIcon={<EditIcon />} 
            sx={{ backgroundColor: "#00897b", color: "#fff", textTransform: "none", 
            fontWeight: 600, fontSize: "14px", borderRadius: "6px", px: 3, py: 1, 
            fontFamily: "'Segoe UI', sans-serif", "&:hover": { backgroundColor: "#00695c" } }}
            onClick={()=> window.open("/post-property/primary-details", "_blank")}>
              Edit property
            </Button>
            <Button variant="outlined" startIcon={<FavoriteBorderIcon />} sx={{ borderColor: "#c8d8ec", color: "#333", textTransform: "none", fontWeight: 600, fontSize: "14px", borderRadius: "6px", px: 3, py: 1, fontFamily: "'Segoe UI', sans-serif", "&:hover": { borderColor: "#1557a0" } }}>
              Shortlist
            </Button>
          </Box>
        </Box>

        {/* RERA row */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}>
          <Chip label="RERA STATUS ℹ" size="small" sx={{ backgroundColor: "#1557a0", color: "#fff", fontSize: "11px", fontWeight: 700, fontFamily: "'Segoe UI', sans-serif", height: "24px", borderRadius: "4px" }} />
          <Chip label="NOT AVAILABLE" size="small" sx={{ backgroundColor: "#fff", color: "#e53935", fontSize: "11px", fontWeight: 700, border: "1.5px solid #e53935", fontFamily: "'Segoe UI', sans-serif", height: "24px", borderRadius: "4px" }} />
          <Box sx={{ width: "1px", height: "18px", backgroundColor: "#ddd" }} />
          <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
            Website: <span style={{ color: "#1557a0", cursor: "pointer" }}>https://rera.karnataka.gov.in/</span>
          </Typography>
        </Box>

        {/* ── Content layout ── */}
        <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>

          {/* LEFT column */}
          <Box sx={{ width: "460px", flexShrink: 0, display: "flex", flexDirection: "column", gap: 2.5 }}>

            {/* Photo card */}
            <Box sx={{ border: "1px solid #e0e6ef", borderRadius: "12px", overflow: "hidden", backgroundColor: "#1a1a2e" }}>
              <Box sx={{ px: 2.5, py: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography sx={{ fontSize: "15px", fontWeight: 700, color: "#fff", fontFamily: "'Segoe UI', sans-serif" }}>Property (0)</Typography>
                  <Box sx={{ width: "40px", height: "2px", backgroundColor: "#fff", mt: 0.5 }} />
                </Box>
                <Typography sx={{ fontSize: "13px", color: "#aac4ff", fontFamily: "'Segoe UI', sans-serif", cursor: "pointer" }}>
                  Explore Locality Photos/Videos
                </Typography>
              </Box>
              <Box sx={{ height: "240px", backgroundColor: "#2a2a3e", opacity: 0.6 }}>
                <PropertyImagePlaceholder />
              </Box>
              <Box sx={{ backgroundColor: "#1a1a2e", px: 2.5, py: 1, textAlign: "center" }}>
                <Typography sx={{ fontSize: "12px", color: "#aaa", fontFamily: "'Segoe UI', sans-serif" }}>Photos not shared by advertiser</Typography>
              </Box>
              <Box sx={{ px: 2.5, pb: 2.5, pt: 1 }}>
                <Button fullWidth variant="contained" startIcon={<AddPhotoAlternateOutlinedIcon />} sx={{ backgroundColor: "#1557a0", color: "#fff", textTransform: "none", fontWeight: 600, fontSize: "14px", borderRadius: "6px", py: 1.2, fontFamily: "'Segoe UI', sans-serif", "&:hover": { backgroundColor: "#0e4080" } }}>
                  Request Photos
                </Button>
              </Box>
            </Box>

            {/* ── Owner Details card (single container) ── */}
            <Box sx={{ border: "1px solid #e0e6ef", borderRadius: "12px", backgroundColor: "#fff", p: 3 }}>
              <Typography sx={{ fontSize: "17px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", mb: 2.5 }}>
                Owner Details
              </Typography>

              {/* Avatar + name + phone in one row */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2.5 }}>
                <Box
                  component="img"
                  src="https://static.99acres.com/images/owner_pnava.png"
                  alt="Owner"
                  sx={{ width: 90, height: 100, objectFit: "contain", flexShrink: 0 }}
                />
                <Box>
                  <Typography sx={{ fontSize: "17px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", mb: 0.4 }}>
                    Kiran M
                  </Typography>
                  <Typography sx={{ fontSize: "13px", color: "#888", fontFamily: "'Segoe UI', sans-serif", mb: 2 }}>
                    Owner
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<PhoneIcon sx={{ fontSize: "16px" }} />}
                    sx={{ backgroundColor: "#00897b", color: "#fff", textTransform: "none", fontWeight: 600, fontSize: "13px", borderRadius: "6px", px: 2.5, py: 1, fontFamily: "'Segoe UI', sans-serif", "&:hover": { backgroundColor: "#00695c" } }}
                  >
                    View Phone Number
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ borderColor: "#f0f2f5", mb: 1.5 }} />

              <Typography sx={{ fontSize: "13px", fontFamily: "'Segoe UI', sans-serif", mb: 0.6 }}>
                <span style={{ color: "#1557a0", fontWeight: 600 }}>Properties Listed:</span>{" "}
                <span style={{ color: "#071c2c", fontWeight: 700 }}>1</span>
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
                Localities : {property?.locality.name}
              </Typography>
            </Box>
          </Box>

          {/* RIGHT: Property details + Enquiry */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2.5 }}>

            {/* Property details card */}
            <Box sx={{ backgroundColor: "#fff", border: "1px solid #e0e6ef", borderRadius: "12px", px: 3, py: 1 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <DetailItem icon={<SquareFootIcon sx={{ fontSize: "20px" }} />} label="Area">
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                      <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>Carpet area: {property?.plotArea}</Typography>
                      <Typography sx={{ fontSize: "14px", color: "#1557a0", fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", display: "flex", alignItems: "center" }}>
                        {property?.areaUnit} <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: "12px", color: "#888", fontFamily: "'Segoe UI', sans-serif" }}>(111.48 sq.m.)</Typography>
                  </DetailItem>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ my: 1.5, borderColor: "#f0f2f5" }} />
                <Box sx={{ flex: 1 }}>
                  <DetailItem icon={<ApartmentIcon sx={{ fontSize: "20px" }} />} label="Configuration">
                    <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>2 Bedrooms , 1 Bathroom, No Balcony</Typography>
                  </DetailItem>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <DetailItem icon={<CurrencyRupeeIcon sx={{ fontSize: "20px" }} />} label="Price">
                    <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>₹ {property?.expectedPrice}</Typography>
                    <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>@ {property?.pricePerSqft} per {property?.areaUnit}</Typography>
                  </DetailItem>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ my: 1.5, borderColor: "#f0f2f5" }} />
                <Box sx={{ flex: 1 }}>
                  <DetailItem icon={<LocationOnOutlinedIcon sx={{ fontSize: "20px" }} />} label="Address">
                    <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>{property?.project.name}</Typography>
                    <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>{property?.subLocality.name}, {property?.city.name}</Typography>
                  </DetailItem>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <DetailItem icon={<LayersOutlinedIcon sx={{ fontSize: "20px" }} />} label="Floor Number">
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                      <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>{property?.floorsAllowed}<sup style={{ fontSize: "10px" }}>th</sup></Typography>
                      <Typography sx={{ fontSize: "14px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>of 12 Floors</Typography>
                    </Box>
                  </DetailItem>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ my: 1.5, borderColor: "#f0f2f5" }} />
                <Box sx={{ flex: 1 }}>
                  <DetailItem icon={<CalendarTodayOutlinedIcon sx={{ fontSize: "20px" }} />} label="Possession in">
                    <Typography sx={{ fontSize: "15px", fontWeight: 600, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>{property?.possession}</Typography>
                  </DetailItem>
                </Box>
              </Box>
            </Box>

            {/* ── Send Enquiry card ── */}
            <Box sx={{ backgroundColor: "#fff", border: "1px solid #e0e6ef", borderRadius: "12px", p: 3,mt:4 }}>
              <Typography sx={{ fontSize: "18px", fontWeight: 700, color: "#555", fontFamily: "'Segoe UI', sans-serif", mb: 2 }}>
                Send enquiry to Owner
              </Typography>

              {/* You are */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 1.5 }}>
                <Typography sx={{ fontSize: "14px", color: "#555", fontFamily: "'Segoe UI', sans-serif", minWidth: "130px" }}>You are</Typography>
                <RadioGroup row value={buyerType} onChange={e => setBuyerType(e.target.value)}>
                  <FormControlLabel value="Individual" control={<Radio size="small" sx={{ color: "#888", "&.Mui-checked": { color: "#1557a0" } }} />}
                    label={<Typography sx={{ fontSize: "14px", color: "#333", fontFamily: "'Segoe UI', sans-serif" }}>Individual</Typography>} />
                  <FormControlLabel value="Dealer" control={<Radio size="small" sx={{ color: "#888", "&.Mui-checked": { color: "#1557a0" } }} />}
                    label={<Typography sx={{ fontSize: "14px", color: "#333", fontFamily: "'Segoe UI', sans-serif" }}>Dealer</Typography>} />
                </RadioGroup>
              </Box>

              {/* Reason to buy */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2 }}>
                <Typography sx={{ fontSize: "14px", color: "#555", fontFamily: "'Segoe UI', sans-serif", minWidth: "130px" }}>Your reason to buy is</Typography>
                <RadioGroup row value={reason} onChange={e => setReason(e.target.value)}>
                  <FormControlLabel value="Investment" control={<Radio size="small" sx={{ color: "#888", "&.Mui-checked": { color: "#1557a0" } }} />}
                    label={<Typography sx={{ fontSize: "14px", color: "#333", fontFamily: "'Segoe UI', sans-serif" }}>Investment</Typography>} />
                  <FormControlLabel value="Self Use" control={<Radio size="small" sx={{ color: "#888", "&.Mui-checked": { color: "#1557a0" } }} />}
                    label={<Typography sx={{ fontSize: "14px", color: "#333", fontFamily: "'Segoe UI', sans-serif" }}>Self Use</Typography>} />
                </RadioGroup>
              </Box>

              {/* Name + Message row */}
              <Box sx={{ display: "flex", gap: 2, mb: 0, mt:4 }}>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {/* Name */}
                  <TextField
                    value="Kiran M"
                    size="small"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px", fontSize: "14px", fontFamily: "'Segoe UI', sans-serif" } }}
                  />
                  {/* Phone */}
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Select
                      value="IND"
                      size="small"
                      sx={{ minWidth: "110px", fontSize: "14px", fontFamily: "'Segoe UI', sans-serif", borderRadius: "6px" }}
                    >
                      <MenuItem value="IND" sx={{ fontSize: "14px" }}>IND (+91)</MenuItem>
                    </Select>
                    <TextField
                      value="7619401943"
                      size="small"
                      fullWidth
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px", fontSize: "14px", fontFamily: "'Segoe UI', sans-serif" } }}
                    />
                  </Box>
                </Box>

                {/* Message */}
                <Box sx={{ flex: 1 }}>
                  <TextField
                    multiline
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    fullWidth
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px", fontSize: "14px", fontFamily: "'Segoe UI', sans-serif" } }}
                  />
                  <Typography sx={{ fontSize: "11px", color: "#aaa", textAlign: "right", mt: 0.5, fontFamily: "'Segoe UI', sans-serif" }}>
                    {400 - message.length} chars
                  </Typography>
                </Box>
              </Box>

              {/* Terms */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5, mb: 2 }}>
                <Checkbox size="small" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                  sx={{ p: 0.5, color: "#aaa", "&.Mui-checked": { color: "#1557a0" } }} />
                <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
                  I agree to the{" "}
                  <span style={{ color: "#1557a0", cursor: "pointer" }}>Terms &amp; Conditions</span>
                  {" "}and{" "}
                  <span style={{ color: "#1557a0", cursor: "pointer" }}>Privacy Policy</span>
                </Typography>
              </Box>

              {/* Send button */}
              <Button variant="contained" sx={{ backgroundColor: "#1557a0", color: "#fff", textTransform: "none", fontWeight: 700, fontSize: "15px", borderRadius: "6px", px: 4, py: 1.2, fontFamily: "'Segoe UI', sans-serif", "&:hover": { backgroundColor: "#0e4080" } }}>
                Send Email &amp; SMS
              </Button>
            </Box>

          </Box>
        </Box>
      </Box>
      <RecommendedProjects/>
      <RecommendedProperties/>
      <Footer/>
    </Box>
  );
}
