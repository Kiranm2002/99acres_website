import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  InputBase,
  Chip,Menu,MenuItem,Divider,ListItemText,ListItemIcon
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MicIcon from "@mui/icons-material/Mic";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AppDrawer from "../../components/common/AppDrawer";
import Footer from "../../components/home/Footer";
import RecommendedProjects from "../../components/home/RecommendedProjects";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

// ── Building illustration SVG ──
const BuildingIllustration = () => (
  <svg width="100%" height="100%" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="180" height="120" fill="#c8d5e8" />
    <rect x="45" y="30" width="70" height="80" rx="2" fill="#8fa8c8" />
    {[0,1,2].map(row => [0,1,2,3].map(col => (
      <rect key={`${row}-${col}`} x={52 + col * 16} y={38 + row * 18} width="10" height="12" rx="1" fill={row === 2 && col === 1 ? "#ffe082" : "#b8d4f0"} />
    )))}
    <rect x="72" y="90" width="16" height="20" rx="1" fill="#5a7a9a" />
    <rect x="20" y="80" width="5" height="20" rx="1" fill="#6d4c41" />
    <circle cx="22" cy="72" r="14" fill="#66bb6a" />
    <rect x="148" y="82" width="4" height="18" rx="1" fill="#6d4c41" />
    <circle cx="150" cy="76" r="12" fill="#81c784" />
    <rect x="130" y="88" width="3" height="12" rx="1" fill="#6d4c41" />
    <circle cx="131" cy="84" r="8" fill="#a5d6a7" />
  </svg>
);

// ── Semicircle visibility gauge ──
const VisibilityGauge = ({ percent }) => {
  const r = 34, cx = 44, cy = 44;
  const circumference = Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mr: 2 }}>
      <svg width="88" height="52" viewBox="0 0 88 52">
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#e0e0e0" strokeWidth="7" strokeLinecap="round" />
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#e53935" strokeWidth="7" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset} />
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="15" fontWeight="800" fill="#333">{percent}%</text>
      </svg>
      <Typography sx={{ fontSize: "12px", color: "#555", fontFamily: "'Segoe UI', sans-serif", mt: "-6px", fontWeight: 500 }}>
        Current Visibility
      </Typography>
      <Typography sx={{ fontSize: "12px", color: "#e53935", fontFamily: "'Segoe UI', sans-serif", fontWeight: 600, mt: 0.3 }}>
        2 pending actions!
      </Typography>
    </Box>
  );
};

// ── Relationship Manager Illustration ──
const RelationshipManagerIllustration = () => (
  <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="75" cy="75" r="50" fill="#ddeeff" opacity="0.6" />
    <rect x="30" y="65" width="60" height="6" rx="2" fill="#b0c4de" />
    <rect x="35" y="42" width="50" height="34" rx="3" fill="#e8f0fe" />
    <rect x="38" y="45" width="44" height="28" rx="2" fill="#bbdefb" />
    <circle cx="60" cy="52" r="8" fill="#ffcc80" />
    <rect x="52" y="60" width="16" height="14" rx="3" fill="#42a5f5" />
    <rect x="68" y="38" width="22" height="14" rx="4" fill="#fff" stroke="#90caf9" strokeWidth="1.5" />
    <rect x="70" y="41" width="12" height="2" rx="1" fill="#90caf9" />
    <rect x="70" y="45" width="8" height="2" rx="1" fill="#90caf9" />
    <circle cx="88" cy="28" r="10" fill="#fff" stroke="#90caf9" strokeWidth="1.5" />
    <text x="85" y="33" fontSize="12" fontWeight="700" fill="#1557a0">?</text>
  </svg>
);

// ── Navbar ──
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return(
  <AppBar position="static" sx={{ backgroundColor: "#1557a0", boxShadow: "none", height: "68px", justifyContent: "center" }}>
    <Toolbar sx={{ minHeight: "68px !important", px: { xs: 2, sm: 4 }, gap: 2.5 }}>

      {/* Logo */}
      <Typography sx={{ fontWeight: 800, fontSize: "24px", color: "#fff", letterSpacing: "-0.5px", flexShrink: 0, fontFamily: "'Segoe UI', sans-serif", mr: 0.5 }}>
        99<span style={{ fontWeight: 400 }}>acres</span>
      </Typography>

      {/* My Postings */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, cursor: "pointer", flexShrink: 0 }}>
        <Typography sx={{ fontSize: "15px", color: "#fff", fontWeight: 500, fontFamily: "'Segoe UI', sans-serif", whiteSpace: "nowrap" }}>
          My Postings (1)
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
        <Typography sx={{ fontSize: "15px", color: "#fff", fontWeight: 500, fontFamily: "'Segoe UI', sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
          For Owners
        </Typography>
        <Typography sx={{ fontSize: "15px", color: "#fff", fontWeight: 500, fontFamily: "'Segoe UI', sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
          Owner Plans
        </Typography>
      </Box>

      {/* Post Property */}
      <Button variant="outlined" sx={{ backgroundColor:"#fff",borderColor: "#fff", color: "#000", textTransform: "none", fontWeight: 600, fontSize: "14px", borderRadius: "6px", px: 2, py: 0.8, whiteSpace: "nowrap", flexShrink: 0, fontFamily: "'Segoe UI', sans-serif", "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderColor: "#fff" } }}>
        Post property{" "}
        <Box component="span" sx={{ backgroundColor: "#4caf50", color: "#fff", fontSize: "11px", fontWeight: 700, px: 0.7, py: 0.2, borderRadius: "3px", ml: 1 }}>
          FREE
        </Box>
      </Button>

      {/* Right icons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, flexShrink: 0 }}>
        <IconButton sx={{ color: "#fff", p: 0.8, }}>
          <NotificationsNoneIcon sx={{ fontSize: "22px" }} />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer",  px: 1, py: 0.4 }}>
          <Avatar sx={{ width: 28, height: 28, backgroundColor: "#c8e6c9", color: "#2e7d32", fontSize: "11px", fontWeight: 700 }}>KM</Avatar>
          <KeyboardArrowDownIcon sx={{ color: "#fff", fontSize: "20px" }} />
        </Box>
        <IconButton sx={{ color: "#fff", p: 0.8 }} onClick={()=>setDrawerOpen(true)}>
          <MenuIcon sx={{ fontSize: "24px" }} />
        </IconButton>
        <AppDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        // user={user}               // pass if you have it
        // onOpenLogin={handleLogin} // pass your login handler
      />
      </Box>
    </Toolbar>
  </AppBar>
)};

// ── Responses Section (below "0 Responses on this posting") ──
const ResponsesSection = () => (
  <Box sx={{ mt: 0 }}>
    {/* Buyer / Dealer response count cards */}
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      {[{ count: "0", label: "Buyer Responses" }, { count: "0", label: "Dealer Responses" }].map(({ count, label }) => (
        <Box key={label} sx={{ flex: 1, border: "1px solid #e0e6ef", borderRadius: "10px", backgroundColor: "#fff", display: "flex", alignItems: "center", gap: 2.5, px: 3, py: 2.5 }}>
          <Typography sx={{ fontSize: "32px", fontWeight: 300, color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>{count}</Typography>
          <Box sx={{ width: "1px", height: "36px", backgroundColor: "#e0e6ef" }} />
          <Typography sx={{ fontSize: "15px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>{label}</Typography>
        </Box>
      ))}
    </Box>

    {/* Missing out alert banner */}
    <Box sx={{ border: "1px solid #fdd8c8", borderRadius: "10px", backgroundColor: "#fff8f5", display: "flex", alignItems: "center", gap: 2, px: 2.5, py: 1.8, mb: 2 }}>
      <Box sx={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#fde8e0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <WarningAmberIcon sx={{ fontSize: "20px", color: "#e53935" }} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>
          You are missing out on upto 10+ buyer responses / week with free plan
        </Typography>
        <Typography sx={{ fontSize: "13px", color: "#666", fontFamily: "'Segoe UI', sans-serif", mt: 0.3 }}>
          Upgraded postings appear higher in searches and are seen by more buyers
        </Typography>
      </Box>
      <Button variant="contained" sx={{ backgroundColor: "#1557a0", color: "#fff", textTransform: "none", fontWeight: 700, fontSize: "14px", borderRadius: "6px", px: 2.5, py: 1, fontFamily: "'Segoe UI', sans-serif", flexShrink: 0, whiteSpace: "nowrap", "&:hover": { backgroundColor: "#0e4080" } }}>
        Upgrade Now
      </Button>
    </Box>

    {/* Help line */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
      <Typography sx={{ fontSize: "16px" }}>🔔</Typography>
      <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
        Need more responses? Call us on -{" "}
        <strong style={{ color: "#071c2c" }}>1800 41 99099</strong>{" "}(Toll Free IND)
      </Typography>
    </Box>

    {/* 10X heading */}
    <Typography sx={{ fontSize: "22px", fontWeight: 800, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", mb: 0.5 }}>
      Get upto 10X Responses and sell faster ⚡
    </Typography>
    <Typography sx={{ fontSize: "14px", color: "#666", fontFamily: "'Segoe UI', sans-serif", mb: 2.5 }}>
      Do not miss out on responses with your current free plan
    </Typography>

    {/* Feature cards */}
    <Box sx={{ display: "flex", alignItems: "stretch", border: "1px solid #e0e6ef", borderRadius: "10px", backgroundColor: "#fff", overflow: "hidden", mb: 3 }}>
      {[
        { icon: <TrendingUpIcon sx={{ fontSize: "22px", color: "#4caf50" }} />, title: "Upto 10X more responses", sub: "Reach upto 97% of the buyers", partial: false },
        { icon: <CampaignOutlinedIcon sx={{ fontSize: "22px", color: "#4caf50" }} />, title: "Get upto 15000 more views", sub: "From buyers on Facebook and google", partial: false },
        { icon: <PersonOutlineIcon sx={{ fontSize: "22px", color: "#4caf50" }} />, title: "Get assistance in selling", sub: "4000+ Owners opted for Rela...", partial: true },
      ].map((item, idx) => (
        <Box key={idx} sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1.5, px: 2.5, py: 2, borderRight: idx < 2 ? "1px solid #e0e6ef" : "none", position: "relative", overflow: item.partial ? "hidden" : "visible" }}>
          <Box sx={{ width: 42, height: 42, borderRadius: "50%", backgroundColor: "#e8f5e9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {item.icon}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {item.title}
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#777", fontFamily: "'Segoe UI', sans-serif" }}>{item.sub}</Typography>
          </Box>
          {item.partial && (
            <Box sx={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "50px", background: "linear-gradient(to right, transparent, #fff)", display: "flex", alignItems: "center", justifyContent: "flex-end", pr: 0.5 }}>
              <ChevronRightIcon sx={{ fontSize: "22px", color: "#aaa" }} />
            </Box>
          )}
        </Box>
      ))}
    </Box>

    {/* ── Plans Comparison Box ── */}
    <PlansComparisonBox />
  </Box>
);

// ── Mini Gauge for plans table ──
const MiniGauge = ({ percent, color }) => {
  const r = 26, cx = 32, cy = 32;
  const circ = Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="64" height="38" viewBox="0 0 64 38">
        <path d={`M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy}`} fill="none" stroke="#e0e0e0" strokeWidth="6" strokeLinecap="round" />
        <path d={`M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy}`} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset} />
        <text x={cx} y={cx - 4} textAnchor="middle" fontSize="12" fontWeight="800" fill={color}>{percent}%</text>
      </svg>
      <Typography sx={{ fontSize: "11px", color: "#888", mt: "-4px", fontFamily: "'Segoe UI', sans-serif" }}>Listing visibility</Typography>
    </Box>
  );
};

// plans data
const COMPARE_PLANS = [
  {
    name: "ADVANCED PLUS", nameColor: "#1557a0", group: "self",
    badge: { label: "MOST BOUGHT", color: "#7b2ff7" },
    visibility: 73, gaugeColor: "#1557a0",
    responses: "8X", relationshipMgr: false,
    facebook: "7,500 impressions", premium: true, freeVerify: true,
    duration: "4 Months", cost: "₹7,622",
  },
  {
    name: "ASSIST PLUS", nameColor: "#e07b00", group: "assisted",
    badge: { label: "RECOMMENDED", color: "#4caf50" },
    visibility: 97, gaugeColor: "#e07b00",
    responses: "10X", relationshipMgr: true,
    facebook: "15,000 impressions", premium: true, freeVerify: true,
    duration: "3 Months", cost: "₹23,107",
  },
];

const COMPARE_ROWS = [
  { key: "visibility",      label: "Be more visible to Buyers" },
  { key: "responses",       label: "Increase in Buyer Responses" },
  { key: "relationshipMgr", label: "Relationship manager assistance in selling" },
  { key: "facebook",        label: "Reach Buyers on Facebook and Google platforms" },
  { key: "premium",         label: "Premium listing, standout with large Photos & Slideshow" },
  { key: "freeVerify",      label: "Free Verification & Photoshoot of your property*" },
  { key: "duration",        label: "Plan duration" },
  { key: "cost",            label: "Plan Cost" },
];

const PlanCellValue = ({ rowKey, plan }) => {
  const val = plan[rowKey];
  const textSx = { fontSize: "14px", color: "#333", fontFamily: "'Segoe UI', sans-serif", textAlign: "center" };
  if (rowKey === "visibility") return <MiniGauge percent={val} color={plan.gaugeColor} />;
  if (rowKey === "responses") return <Typography sx={textSx}>up to <strong>{val}</strong></Typography>;
  if (rowKey === "facebook") return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "center" }}>
      <CheckIcon sx={{ color: "#4caf50", fontSize: "16px" }} />
      <Typography sx={{ ...textSx, color: "#4caf50", fontWeight: 600, fontSize: "13px" }}>{val}</Typography>
    </Box>
  );
  if (typeof val === "boolean") return val
    ? <CheckIcon sx={{ color: "#4caf50", fontSize: "22px" }} />
    : <CloseIcon sx={{ color: "#bbb", fontSize: "22px" }} />;
  if (rowKey === "cost") return (
    <Typography sx={{ ...textSx, fontWeight: 700, fontSize: "15px", color: "#071c2c" }}>
      {val} <span style={{ fontWeight: 400, fontSize: "12px", color: "#777" }}>incl. GST</span>
    </Typography>
  );
  return <Typography sx={textSx}>{val}</Typography>;
};

const PlansComparisonBox = () => (
  <Box sx={{ border: "1.5px solid #c8ddf0", borderRadius: "10px", overflow: "hidden" }}>

    {/* Group header row */}
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "38%", flexShrink: 0, borderRight: "1px solid #dde6f0" }} />
      <Box sx={{ flex: 1, backgroundColor: "#e8f2fb", display: "flex", alignItems: "center", justifyContent: "center", gap: 1, py: 1.2, borderRight: "2px solid #1557a0" }}>
        <TrendingUpIcon sx={{ fontSize: "16px", color: "#1557a0" }} />
        <Typography sx={{ fontWeight: 700, fontSize: "12px", color: "#1557a0", letterSpacing: "0.5px", fontFamily: "'Segoe UI', sans-serif" }}>SELF SERVICE PLANS</Typography>
      </Box>
      <Box sx={{ flex: 1, backgroundColor: "#fdf6e8", display: "flex", alignItems: "center", justifyContent: "center", gap: 1, py: 1.2 }}>
        <PersonOutlineIcon sx={{ fontSize: "16px", color: "#e07b00" }} />
        <Typography sx={{ fontWeight: 700, fontSize: "12px", color: "#e07b00", letterSpacing: "0.5px", fontFamily: "'Segoe UI', sans-serif" }}>ASSISTED PLANS</Typography>
      </Box>
    </Box>

    {/* Plan name headers */}
    <Box sx={{ display: "flex", borderTop: "1.5px solid #dde6f0", borderBottom: "1.5px solid #dde6f0" }}>
      <Box sx={{ width: "38%", flexShrink: 0, p: 1.5, display: "flex", alignItems: "center", borderRight: "1px solid #dde6f0", backgroundColor: "#fafbfc" }}>
        <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#333", fontFamily: "'Segoe UI', sans-serif" }}>Plan Benefits</Typography>
      </Box>
      {COMPARE_PLANS.map((plan, idx) => (
        <Box key={plan.name} sx={{ flex: 1, p: 1.5, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderRight: idx === 0 ? "2px solid #1557a0" : "none", backgroundColor: "#fff", overflow: "visible" }}>
          {plan.badge && (
            <Box sx={{ position: "absolute", top: 0, right: 0, backgroundColor: plan.badge.color, color: "#fff", fontSize: "9px", fontWeight: 700, px: 1, py: 0.4, borderRadius: "0 0 0 8px", fontFamily: "'Segoe UI', sans-serif", zIndex: 2 }}>
              {plan.badge.color === "#4caf50" ? "★ " : "⊕ "}{plan.badge.label}
            </Box>
          )}
          <Typography sx={{ fontSize: "14px", fontWeight: 800, color: plan.nameColor, fontFamily: "'Segoe UI', sans-serif", textAlign: "center" }}>
            {plan.name}
          </Typography>
        </Box>
      ))}
    </Box>

    {/* Data rows */}
    {COMPARE_ROWS.map((row, rowIdx) => (
      <Box key={row.key} sx={{ display: "flex", borderBottom: rowIdx < COMPARE_ROWS.length - 1 ? "1px solid #eef1f5" : "none", backgroundColor: rowIdx % 2 === 0 ? "#fafbfc" : "#fff" }}>
        <Box sx={{ width: "38%", flexShrink: 0, p: 1.8, display: "flex", alignItems: "center", gap: 0.8, borderRight: "1px solid #dde6f0" }}>
          <Typography sx={{ fontSize: "13px", color: "#444", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.4 }}>{row.label}</Typography>
          <InfoOutlinedIcon sx={{ fontSize: "14px", color: "#bbb", flexShrink: 0 }} />
        </Box>
        {COMPARE_PLANS.map((plan, idx) => (
          <Box key={plan.name} sx={{ flex: 1, p: "14px 8px", display: "flex", alignItems: "center", justifyContent: "center", borderRight: idx === 0 ? "2px solid #1557a0" : "none" }}>
            {row.key === "cost" ? (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.2, width: "100%" }}>
                <PlanCellValue rowKey={row.key} plan={plan} />
                <Button variant="outlined" sx={{ borderColor: "#1557a0", color: "#1557a0", fontWeight: 700, fontSize: "13px", textTransform: "none", borderRadius: "6px", px: 3, py: 0.8, width: "80%", fontFamily: "'Segoe UI', sans-serif", "&:hover": { backgroundColor: "#f0f7ff" } }}>
                  Buy Now
                </Button>
              </Box>
            ) : (
              <PlanCellValue rowKey={row.key} plan={plan} />
            )}
          </Box>
        ))}
      </Box>
    ))}

    {/* Footer */}
    <Box sx={{ backgroundColor: "#fff", borderTop: "1.5px solid #dde6f0", py: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 1, cursor: "pointer" }}>
      <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#1557a0", fontFamily: "'Segoe UI', sans-serif" }}>
        View all plans and benefits
      </Typography>
      <ArrowForwardIcon sx={{ fontSize: "18px", color: "#1557a0" }} />
    </Box>
  </Box>
);

// ── Listings Section ──
const ListingsSection = () => { 
  const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);
const navigate = useNavigate();

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

const handleNavigate = (path) => {
  handleClose();
  navigate(path); // You can change path later
};
  return(
  <Box sx={{ flex: 1, minWidth: 0 }}>
    <Typography sx={{ fontSize: "14px", color: "#666", fontFamily: "'Segoe UI', sans-serif", mb: 1.2 }}>
      Welcome to your dashboard, <strong style={{ color: "#333" }}>Kiran M</strong>
    </Typography>

    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.2 }}>
      <Typography sx={{ fontSize: "26px", fontWeight: 800, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>
        Your Listings
      </Typography>
      <Typography sx={{ fontSize: "15px", color: "#1557a0", fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
        View all Listings
      </Typography>
    </Box>

    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2.5, cursor: "pointer" }}>
      <Typography sx={{ fontSize: "14px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
        Manage listing for{" "}
        <strong style={{ color: "#071c2c" }}>Property ID - U89266127 (2 BHK Flat/Ap...)</strong>
      </Typography>
      <KeyboardArrowDownIcon sx={{ fontSize: "19px", color: "#555" }} />
    </Box>

    {/* Property Card */}
    <Box sx={{ border: "1px solid #e0e6ef", borderRadius: "12px", overflow: "hidden", backgroundColor: "#fff" }}>

      {/* Top row: Free Plan badge */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2.5, pt: 2 }}>
        <Chip label="Free Plan" size="small" sx={{ backgroundColor: "#f0f0f0", color: "#555", fontSize: "13px", fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", height: "26px" }} />
      </Box>

      {/* Property details row */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2.5, px: 2.5, pb: 2.5 }}>
        {/* Image with Not Verified badge */}
        <Box sx={{ position: "relative", width: "175px", height: "118px", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
          <BuildingIllustration />
          <Box sx={{ position: "absolute", top: 8, left: 8, backgroundColor: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "11px", fontWeight: 600, px: 1, py: 0.3, borderRadius: "4px", fontFamily: "'Segoe UI', sans-serif" }}>
            Not Verified
          </Box>
        </Box>

        {/* Details */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: "17px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", mb: 0.4 }}>
            Sell 2 BHK Flat/Apartment
          </Typography>
          <Typography sx={{ fontSize: "13px", color: "#777", fontFamily: "'Segoe UI', sans-serif", mb: 2 }}>
            in Skyline City Apartment Chandra Layout
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
            <Box>
              <Typography sx={{ fontSize: "12px", color: "#999", fontFamily: "'Segoe UI', sans-serif" }}>Price</Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#333", fontFamily: "'Segoe UI', sans-serif" }}>₹ 75 Lac</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "12px", color: "#999", fontFamily: "'Segoe UI', sans-serif" }}>Property ID</Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#333", fontFamily: "'Segoe UI', sans-serif" }}>U89266127</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "12px", color: "#999", fontFamily: "'Segoe UI', sans-serif" }}>Duration</Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#333", fontFamily: "'Segoe UI', sans-serif" }}>Posted today</Typography>
            </Box>
            <Button
            variant="outlined"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleClick}
            sx={{
              borderColor: "#c8d8ec",
              color: "#333",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "14px",
              borderRadius: "6px",
              px: 2,
              py: 0.7,
              fontFamily: "'Segoe UI', sans-serif",
              ml: "auto",
              "&:hover": {
                borderColor: "#1557a0",
                backgroundColor: "#f0f7ff"
              }
            }}
          >
            Manage Listing
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: 220,
                borderRadius: 2,
                mt: 1,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
              }
            }}
          >
            {/* Preview */}
            <MenuItem onClick={() =>  window.open("/post-property/property-preview", "_blank")}>
              <ListItemText primaryTypographyProps={{fontSize:14}}>Preview</ListItemText>
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
              </ListItemIcon>
            </MenuItem>

            <Divider />

            {/* Add/Edit Details */}
            <MenuItem onClick={() =>  window.open("/post-property/primary-details", "_blank")}>
              <ListItemText primaryTypographyProps={{fontSize:14}}>Add/Edit Details</ListItemText>
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
              </ListItemIcon>
            </MenuItem>

            <Divider />

            {/* Delete */}
            <MenuItem onClick={() =>  window.open("/delete", "_blank")}>
              <ListItemText primaryTypographyProps={{fontSize:14}}>Delete</ListItemText>
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
              </ListItemIcon>
            </MenuItem>

            <Divider />

            {/* Upgrade */}
            <MenuItem onClick={() =>  window.open("/upgrade", "_blank")}>
              <ListItemText primaryTypographyProps={{fontSize:14}}>Upgrade</ListItemText>
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
              </ListItemIcon>
            </MenuItem>
          </Menu>
          </Box>
        </Box>
      </Box>

      {/* Pending actions row */}
      <Box sx={{ borderTop: "1px solid #eef1f5", display: "flex", alignItems: "stretch" }}>

        {/* Gauge */}
        <Box sx={{ display: "flex", alignItems: "center", px: 2.5, py: 2, borderRight: "1px solid #eef1f5" }}>
          <VisibilityGauge percent={14} />
        </Box>

        {/* Action 1 - Add photos */}
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 2, px: 2.5, py: 1.5, borderRight: "1px solid #eef1f5" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
            <AddPhotoAlternateIcon sx={{ fontSize: "28px", color: "#1557a0" }} />
            <Box>
              <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>
                1. Get upto 2X views on listing
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#666", fontFamily: "'Segoe UI', sans-serif" }}>
                Add at least 4 photos of your property. Easy WhatsApp upload
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
            <Typography sx={{ fontSize: "12px", color: "#1557a0", fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", whiteSpace: "nowrap" }}>+10% Visibility</Typography>
            <Button variant="contained" sx={{ backgroundColor: "#1557a0", color: "#fff", textTransform: "none", fontWeight: 700, fontSize: "13px", borderRadius: "6px", px: 2, py: 0.8, fontFamily: "'Segoe UI', sans-serif", whiteSpace: "nowrap", "&:hover": { backgroundColor: "#0e4080" } }}>
              Add Ph...
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Action 2 - Upgrade */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 2.5, py: 1.5, borderTop: "1px solid #eef1f5", backgroundColor: "#fff9f9" }}>
        <WarningAmberIcon sx={{ fontSize: "26px", color: "#e53935", flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>
            2. Sell faster upto <span style={{ color: "#e53935" }}>10X more responses</span>
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#666", fontFamily: "'Segoe UI', sans-serif" }}>
            Get upto 96% visibility with buyers. Relationship manager
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
          <Typography sx={{ fontSize: "12px", color: "#1557a0", fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", whiteSpace: "nowrap" }}>+80% Visibility</Typography>
          <Button variant="contained" sx={{ backgroundColor: "#1557a0", color: "#fff", textTransform: "none", fontWeight: 700, fontSize: "13px", borderRadius: "6px", px: 2, py: 0.8, fontFamily: "'Segoe UI', sans-serif", whiteSpace: "nowrap", "&:hover": { backgroundColor: "#0e4080" } }}>
            Upgrade Now
          </Button>
        </Box>
      </Box>
    </Box>

    {/* Recent Responses */}
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 4, mb: 2 }}>
      <Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>
        0 Responses on this posting
      </Typography>
      <Typography sx={{ fontSize: "15px", color: "#1557a0", fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
        View all responses
      </Typography>
    </Box>

    {/* Responses detail section */}
    <ResponsesSection />
  </Box>
)};

// ── Right Sidebar ──
const RightSidebar = () => (
  <Box sx={{ width: "320px", flexShrink: 0, display: "flex", flexDirection: "column", gap: 2.5,
    position:"sticky",top:"50px",alignSelf:"flex-start"
   }}>

    {/* Kiran M card */}
    <Box sx={{ border: "1px solid #e0e6ef", borderRadius: "12px", backgroundColor: "#fff", p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
        <Avatar sx={{ width: 46, height: 46, backgroundColor: "#c8e6c9", color: "#2e7d32", fontSize: "15px", fontWeight: 700 }}>KM</Avatar>
        <Box>
          <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>Kiran M</Typography>
          <Typography sx={{ fontSize: "13px", color: "#888", fontFamily: "'Segoe UI', sans-serif" }}>Owner</Typography>
        </Box>
      </Box>

      <Typography sx={{ fontSize: "12px", color: "#999", fontWeight: 700, letterSpacing: "0.6px", fontFamily: "'Segoe UI', sans-serif", mb: 1.2, textTransform: "uppercase" }}>
        Your Recent Activity
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2, cursor: "pointer" }}>
        <Typography sx={{ fontSize: "13px", color: "#444", fontFamily: "'Segoe UI', sans-serif" }}>
          Property ID - U89266127 (2 BHK Flat/Ap...)
        </Typography>
        <KeyboardArrowDownIcon sx={{ fontSize: "17px", color: "#555" }} />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        {[{ val: "2", label: "Property Posted" }, { val: "0", label: "Total Responses" }].map(({ val, label }) => (
          <Box key={label} sx={{ flex: 1, border: "1px solid #e0e6ef", borderRadius: "8px", p: 1.8 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "24px", fontWeight: 800, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif" }}>{val}</Typography>
              <OpenInNewIcon sx={{ fontSize: "17px", color: "#1557a0" }} />
            </Box>
            <Typography sx={{ fontSize: "12px", color: "#777", fontFamily: "'Segoe UI', sans-serif" }}>{label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Alert banner */}
      <Box sx={{ mt: 2, backgroundColor: "#fff3f3", border: "1px solid #ffc8c8", borderRadius: "8px", p: 1.5, display: "flex", alignItems: "flex-start", gap: 1 }}>
        <ErrorOutlineIcon sx={{ fontSize: "20px", color: "#e53935", flexShrink: 0, mt: 0.2 }} />
        <Box>
          <Typography sx={{ fontSize: "13px", color: "#333", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.4 }}>
            Free listing is visible to only 14% buyers
          </Typography>
          <Typography sx={{ fontSize: "13px", color: "#1557a0", fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", cursor: "pointer", mt: 0.3 }}>
            Get upto 10X Responses - Upgrade
          </Typography>
        </Box>
      </Box>
    </Box>

    {/* Get a Relationship Manager card */}
    <Box sx={{ border: "1px solid #e0e6ef", borderRadius: "12px", backgroundColor: "#fff", p: 3, position: "relative", overflow: "hidden", minHeight: "170px" }}>
      <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", mb: 1, pr: "90px" }}>
        Get a Relationship Manager
      </Typography>
      <Typography sx={{ fontSize: "13px", color: "#666", fontFamily: "'Segoe UI', sans-serif", mb: 1.5, pr: "90px", lineHeight: 1.5 }}>
        Get filtered and genuine leads for hassle-free selling
      </Typography>
      <Typography sx={{ fontSize: "15px", fontWeight: 700, color: "#071c2c", fontFamily: "'Segoe UI', sans-serif", mb: 1.5 }}>
        ₹7,999 Onwards
      </Typography>
      <Typography sx={{ fontSize: "14px", color: "#1557a0", fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 0.5, "&:hover": { textDecoration: "underline" } }}>
        Explore Now <ArrowForwardIcon sx={{ fontSize: "17px" }} />
      </Typography>
      <Box sx={{ position: "absolute", right: 0, bottom: 0, width: "110px", height: "110px" }}>
        <RelationshipManagerIllustration />
      </Box>
    </Box>
  </Box>
);

// ── Main Dashboard ──
export default function PropertyDashboard() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />

      {/* Gap after navbar */}
      <Box sx={{ height: "100px" }} />

      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, sm: 5 }, pb: 6, display: "flex", gap: 4, alignItems: "flex-start", flexDirection: { xs: "column", lg: "row" } }}>
        
        <ListingsSection />
        <RightSidebar  />
        
      </Box>
      
     
      <Footer/>
    </Box>
  );
}
