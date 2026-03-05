import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate,useParams } from "react-router-dom";
import PostNavbar from "../PostNavbar";
import Footer from "../../../components/home/Footer";
import axiosInstance from "../../../utils/axiosInstance";

// House SVG illustration (inline, matching the image style)
const HouseIllustration = () => (
  <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* House body */}
    <rect x="30" y="42" width="55" height="38" rx="2" fill="#e8edf2" />
    {/* Roof */}
    <polygon points="25,44 57,18 92,44" fill="#8fafc8" />
    {/* Door */}
    <rect x="50" y="60" width="14" height="20" rx="2" fill="#b0bec5" />
    {/* Window left */}
    <rect x="34" y="52" width="11" height="10" rx="1" fill="#90caf9" />
    {/* Window right */}
    <rect x="70" y="52" width="11" height="10" rx="1" fill="#90caf9" />
    {/* Tree left */}
    <rect x="14" y="62" width="4" height="18" rx="1" fill="#8d6e63" />
    <circle cx="16" cy="56" r="10" fill="#66bb6a" />
    {/* Tree right */}
    <rect x="100" y="65" width="3" height="15" rx="1" fill="#8d6e63" />
    <circle cx="101" cy="60" r="8" fill="#81c784" />
    {/* Orange dot decoration */}
    <circle cx="88" cy="38" r="4" fill="#ffa726" />
    <circle cx="30" cy="35" r="2.5" fill="#ffa726" opacity="0.6" />
  </svg>
);

// Diamond/sparkle icon for features
const DiamondIcon = ({ color = "#5b9bd5" }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <path d="M9 1 L11.5 6.5 L17 9 L11.5 11.5 L9 17 L6.5 11.5 L1 9 L6.5 6.5 Z" fill={color} />
  </svg>
);

// ─────────────────────────────────────────────
// NEW: Compare Plans Table (added below main content)
// ─────────────────────────────────────────────

const VisibilityGauge = ({ percent, color }) => {
  const r = 28, cx = 36, cy = 36;
  const circumference = Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="72" height="44" viewBox="0 0 72 44">
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#e0e0e0" strokeWidth="6" strokeLinecap="round" />
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill={color}>{percent}%</text>
      </svg>
      <Typography sx={{ fontSize: "11px", color: "#777", mt: "-4px", fontFamily: "'Segoe UI', sans-serif" }}>
        Listing visibility
      </Typography>
    </Box>
  );
};

const PLANS = [
  { name: "ADVANCED",      nameColor: "#1557a0", group: "self",     badge: null,                                  visibility: 59, gaugeColor: "#1557a0", responses: "5X",  relationshipMgr: false, facebook: false,               duration: "1 / 2 / 3 / 4 / 12 Months", cost: "₹1,439"  },
  { name: "ADVANCED PLUS", nameColor: "#1557a0", group: "self",     badge: { label: "MOST BOUGHT",   color: "#7b2ff7" }, visibility: 73, gaugeColor: "#1557a0", responses: "8X",  relationshipMgr: false, facebook: "7,500 impressions",  duration: "4 Months",                   cost: "₹6,901"  },
  { name: "ASSIST",        nameColor: "#e07b00", group: "assisted", badge: null,                                  visibility: 85, gaugeColor: "#e07b00", responses: "6X",  relationshipMgr: true,  facebook: false,               duration: "3 / 6 Months",               cost: "₹15,839" },
  { name: "ASSIST PLUS",   nameColor: "#e07b00", group: "assisted", badge: { label: "RECOMMENDED",   color: "#4caf50" }, visibility: 97, gaugeColor: "#e07b00", responses: "10X", relationshipMgr: true,  facebook: "15,000 impressions", duration: "3 / 6 Months",               cost: "₹23,107" },
];

const ROWS = [
  { key: "visibility",      label: "Be more visible to Buyers" },
  { key: "responses",       label: "Increase in Buyer Responses" },
  { key: "relationshipMgr", label: "Relationship manager assistance in selling" },
  { key: "facebook",        label: "Reach Buyers on Facebook and Google platforms" },
  { key: "duration",        label: "Plan duration" },
  { key: "cost",            label: "Plan Cost" },
];

const CellValue = ({ rowKey, plan }) => {
  const val = plan[rowKey];
  const textSx = { fontSize: "14px", color: "#333", fontFamily: "'Segoe UI', sans-serif", textAlign: "center" };

  if (rowKey === "visibility")
    return <VisibilityGauge percent={val} color={plan.gaugeColor} />;

  if (rowKey === "responses")
    return <Typography sx={textSx}>up to <strong>{val}</strong></Typography>;

  if (rowKey === "relationshipMgr")
    return val
      ? <CheckIcon sx={{ color: "#4caf50", fontSize: "22px" }} />
      : <CloseIcon sx={{ color: "#bbb", fontSize: "22px" }} />;

  if (rowKey === "facebook")
    return val
      ? <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "center" }}>
          <CheckIcon sx={{ color: "#4caf50", fontSize: "16px" }} />
          <Typography sx={{ ...textSx, color: "#4caf50", fontWeight: 600, fontSize: "13px" }}>{val}</Typography>
        </Box>
      : <CloseIcon sx={{ color: "#bbb", fontSize: "22px" }} />;

  if (rowKey === "cost")
    return <Typography sx={{ ...textSx, fontWeight: 700, fontSize: "15px", color: "#071c2c" }}>
      {val} <span style={{ fontWeight: 400, fontSize: "12px", color: "#777" }}>incl. GST</span>
    </Typography>;

  return <Typography sx={textSx}>{val}</Typography>;
};

const ComparePlansTable = () => (
  <Box sx={{ maxWidth: "1100px", mx: "auto", px: { xs: 1, sm: 4 }, py: 4 }}>
    <Typography sx={{ fontSize: { xs: "20px", sm: "26px" }, fontWeight: 800, color: "#071c2c", textAlign: "center", fontFamily: "'Segoe UI', sans-serif", mb: 3 }}>
      Compare the plans and benefits
    </Typography>

    <Box sx={{ border: "1.5px solid #c8ddf0", borderRadius: "10px", overflow: "hidden" }}>

      {/* Group headers */}
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "22%", minWidth: "160px", flexShrink: 0, borderRight: "1px solid #dde6f0" }} />
        <Box sx={{ flex: 2, backgroundColor: "#e8f2fb", display: "flex", alignItems: "center", justifyContent: "center", gap: 1, py: 1.2, borderRight: "2px solid #1557a0" }}>
          <TrendingUpIcon sx={{ fontSize: "18px", color: "#1557a0" }} />
          <Typography sx={{ fontWeight: 700, fontSize: "13px", color: "#1557a0", letterSpacing: "0.5px", fontFamily: "'Segoe UI', sans-serif" }}>SELF SERVICE PLANS</Typography>
        </Box>
        <Box sx={{ flex: 2, backgroundColor: "#fdf6e8", display: "flex", alignItems: "center", justifyContent: "center", gap: 1, py: 1.2 }}>
          <PersonOutlineIcon sx={{ fontSize: "18px", color: "#e07b00" }} />
          <Typography sx={{ fontWeight: 700, fontSize: "13px", color: "#e07b00", letterSpacing: "0.5px", fontFamily: "'Segoe UI', sans-serif" }}>ASSISTED PLANS</Typography>
        </Box>
      </Box>

      {/* Plan name headers */}
      <Box sx={{ display: "flex", borderTop: "1.5px solid #dde6f0", borderBottom: "1.5px solid #dde6f0" }}>
        <Box sx={{ width: "22%", minWidth: "160px", flexShrink: 0, p: 2, display: "flex", alignItems: "center", borderRight: "1px solid #dde6f0", backgroundColor: "#fafbfc" }}>
          <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#333", fontFamily: "'Segoe UI', sans-serif" }}>Plan Benefits</Typography>
        </Box>
        {PLANS.map((plan, idx) => (
          <Box key={plan.name} sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", borderRight: idx === 1 ? "2px solid #1557a0" : idx < 3 ? "1px solid #dde6f0" : "none", backgroundColor: "#fff", overflow: "visible" }}>
            {plan.badge && (
              <Box sx={{ position: "absolute", top: 0, right: 0, backgroundColor: plan.badge.color, color: "#fff", fontSize: "9px", fontWeight: 700, px: 1, py: 0.4, borderRadius: "0 0 0 8px", letterSpacing: "0.3px", fontFamily: "'Segoe UI', sans-serif", zIndex: 2 }}>
                {plan.badge.color === "#4caf50" ? "★ " : "⊕ "}{plan.badge.label}
              </Box>
            )}
            <Typography sx={{ fontSize: "14px", fontWeight: 800, color: plan.nameColor, fontFamily: "'Segoe UI', sans-serif", letterSpacing: "0.3px", textAlign: "center" }}>
              {plan.name}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Data rows */}
      {ROWS.map((row, rowIdx) => (
        <Box key={row.key} sx={{ display: "flex", borderBottom: rowIdx < ROWS.length - 1 ? "1px solid #eef1f5" : "none", backgroundColor: rowIdx % 2 === 0 ? "#fafbfc" : "#fff" }}>
          <Box sx={{ width: "22%", minWidth: "160px", flexShrink: 0, p: 2, display: "flex", alignItems: "center", gap: 0.8, borderRight: "1px solid #dde6f0" }}>
            <Typography sx={{ fontSize: "13px", color: "#444", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.4 }}>{row.label}</Typography>
            <Tooltip title={row.label} placement="top">
              <InfoOutlinedIcon sx={{ fontSize: "14px", color: "#aaa", flexShrink: 0, cursor: "pointer" }} />
            </Tooltip>
          </Box>
          {PLANS.map((plan, idx) => (
            <Box key={plan.name} sx={{ flex: 1, p: "16px 8px", display: "flex", alignItems: "center", justifyContent: "center", borderRight: idx === 1 ? "2px solid #1557a0" : idx < 3 ? "1px solid #dde6f0" : "none" }}>
              {row.key === "cost" ? (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, width: "100%" }}>
                  <CellValue rowKey={row.key} plan={plan} />
                  <Button variant="contained" sx={{ backgroundColor: "#1557a0", color: "#fff", fontWeight: 700, fontSize: "13px", textTransform: "none", borderRadius: "6px", px: 2, py: 0.9, width: "100%", fontFamily: "'Segoe UI', sans-serif", "&:hover": { backgroundColor: "#0e4080" } }}>
                    Buy Now
                  </Button>
                </Box>
              ) : (
                <CellValue rowKey={row.key} plan={plan} />
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  </Box>
);

// ─────────────────────────────────────────────
// ORIGINAL ThankYou component — unchanged
// ─────────────────────────────────────────────

const ThankYou = ()=> {
  const navigate = useNavigate();
  const propertyId  = localStorage.getItem("propertyId")

    const [property, setProperty] = useState(null);

    useEffect(() => {
      const fetchProperty = async () => {
        try {
          const res = await axiosInstance.get(`/property/${propertyId}`);
          setProperty(res.data);
        } catch (error) {
          console.error("Error fetching property:", error);
        }
      };

      fetchProperty();
    }, []);
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* ── Navbar ── */}
      <PostNavbar/>

      {/* ── Main Content ── */}
      <Box
        sx={{
          maxWidth: "1100px",
          mx: "auto",
          px: { xs: 2, sm: 4 },
          py: 4,
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "flex-start" },
        }}
      >
        {/* ── LEFT CARD ── */}
        <Box
          sx={{
            backgroundColor: "#e0e0e0",
            borderRadius: "16px",
            p: 3,
            minWidth: { md: "280px" },
            maxWidth: { md: "320px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {/* Green check */}
          <CheckCircleIcon sx={{ fontSize: "52px", color: "#2e7d32", mt: 1 }} />

          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#071c2c",
              textAlign: "center",
              lineHeight: 1.3,
              fontFamily: "'Segoe UI', sans-serif",
            }}
          >
            Your free listing<br />will be live soon
          </Typography>

          {/* Property preview card */}
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              p: 2,
              width: "100%",
              mt: 0.5,
            }}
          >
            {/* House image area */}
            <Box
              sx={{
                backgroundColor: "#f0f4f8",
                borderRadius: "8px",
                height: "110px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1.5,
              }}
            >
              <HouseIllustration />
            </Box>

            {property && (
              <>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#8a9bb0",
                    fontFamily: "'Segoe UI', sans-serif",
                    mb: 0.3,
                  }}
                >
                  Property ID: {property._id}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#071c2c",
                    fontFamily: "'Segoe UI', sans-serif",
                    mb: 0.3,
                  }}
                >
                  {property.lookingFor} {property.propertyType} {property.category}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "#555",
                    fontFamily: "'Segoe UI', sans-serif",
                    mb: 1,
                    lineHeight: 1.4,
                  }}
                >
                  {property.project?.name}, {property.SubLoaclity?.name}, {property.city?.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#071c2c",
                    fontFamily: "'Segoe UI', sans-serif",
                  }}
                >
                  ₹ {property.expectedPrice}
                </Typography>
              </>
            )}
          </Box>

          {/* Edit / Preview */}
          <Button
            variant="text"
            sx={{
              color: "#1557a0",
              fontWeight: 600,
              fontSize: "14px",
              textTransform: "none",
              fontFamily: "'Segoe UI', sans-serif",
              width: "100%",
              border: "1px solid #e0e4ea",
              borderRadius: "6px",
              py: 1,
              backgroundColor: "#fff",
              "&:hover": { backgroundColor: "#f0f7ff" },
            }}
            onClick={()=>navigate("/post-property/property-dashboard")}
          >
            Edit / Preview
          </Button>
        </Box>

        {/* ── RIGHT SECTION ── */}
        <Box sx={{ flex: 1 }}>
          {/* Top tag line */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography sx={{ fontSize: "20px" }}>🎯</Typography>
            <Typography sx={{ fontSize: "14px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
              12,32,422+ listings currently live on 99acres
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: { xs: "20px", sm: "26px" },
              fontWeight: 800,
              color: "#071c2c",
              fontFamily: "'Segoe UI', sans-serif",
              lineHeight: 1.25,
              mb: 2.5,
            }}
          >
            Free listings get lower visibility due to competition
          </Typography>

          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#071c2c",
              fontFamily: "'Segoe UI', sans-serif",
              mb: 1.5,
            }}
          >
            Upgrade &amp; get more attention from buyers
          </Typography>

          {/* ── Advanced Plan Card ── */}
          <Box
            sx={{
              border: "1.5px solid #a8c8e8",
              borderRadius: "10px",
              overflow: "hidden",
              mb: 0,
            }}
          >
            {/* Tab header */}
            <Box
              sx={{
                backgroundColor: "#ddeef9",
                px: 3,
                py: 1.2,
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "fit-content",
                borderRadius: "0 0 12px 0",
              }}
            >
              <Typography sx={{ fontSize: "16px" }}>👑</Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#1557a0",
                  fontFamily: "'Segoe UI', sans-serif",
                }}
              >
                Advanced
              </Typography>
            </Box>

            {/* Card body */}
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
              {/* Features */}
              <Box sx={{ flex: 1, p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  { bold: "5x more responses", rest: " from buyers" },
                  { bold: "Stand out to buyers", rest: " with Premium listing" },
                  { bold: "Free Verification & Photoshoot", rest: " of your property*" },
                ].map((item, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <DiamondIcon color="#5b9bd5" />
                    <Typography sx={{ fontSize: "14px", color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>
                      <span style={{ fontWeight: 700 }}>{item.bold}</span>
                      {item.rest}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Pricing */}
              <Box
                sx={{
                  backgroundColor: "#edf7ee",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "180px",
                  gap: 1.5,mt:-3,mb:4
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontSize: "14px", color: "#555", fontFamily: "'Segoe UI', sans-serif", mb: 0.2 }}>
                    2 months
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.3 }}>
                    <Typography sx={{ fontSize: "18px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>
                      ₹
                    </Typography>
                    <Typography sx={{ fontSize: "36px", fontWeight: 800, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1 }}>
                      2039
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "12px", color: "#777", fontFamily: "'Segoe UI', sans-serif" }}>
                    all inclusive
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#2d6a0a",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "15px",
                    textTransform: "none",
                    borderRadius: "6px",
                    px: 4,
                    py: 1.2,
                    width: "100%",
                    fontFamily: "'Segoe UI', sans-serif",
                    "&:hover": { backgroundColor: "#245508" },
                  }}
                >
                  Buy Now
                </Button>
              </Box>
            </Box>
          </Box>

          {/* 400+ owners banner */}
          <Box
            sx={{
              backgroundColor: "#e3f0fc",
              borderRadius: "0 0 10px 10px",
              px: 2.5,
              py: 1.2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: "1.5px solid #a8c8e8",
              borderTop: "none",
              mb: 2.5,
            }}
          >
            <TrendingUpIcon sx={{ fontSize: "18px", color: "#1557a0" }} />
            <Typography sx={{ fontSize: "13px", color: "#333", fontFamily: "'Segoe UI', sans-serif" }}>
              400+ owner chose upgrade in last 48hrs
            </Typography>
          </Box>

          {/* Help line */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "16px" }}>🔔</Typography>
            <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
              Need help? Call us on -{" "}
              <span style={{ fontWeight: 700, color: "#071c2c" }}>1800 41 99099</span>{" "}
              (Toll Free IND)
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Compare Plans Table (NEW) ── */}
      <ComparePlansTable />
        <Footer/>    
    </Box>
  );
}

export default ThankYou
