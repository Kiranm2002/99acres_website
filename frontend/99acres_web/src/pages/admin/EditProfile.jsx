import { useState, useEffect } from "react";
import {
  Box, Typography, Button, Avatar, IconButton, Checkbox,
  Chip, LinearProgress, Divider, Select, MenuItem,
  InputAdornment, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, Radio, RadioGroup, FormControlLabel,
  FormControl, InputLabel,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import PostNavbar from "../postProperty/PostNavbar";
import AppDrawer from "../../components/common/AppDrawer";

// ─── Sidebar menu config ──────────────────────────────────────────────────────
const SIDEBAR_MENU = [
  { section: "My99acres", items: [] },
  {
    section: "MANAGE LISTINGS",
    items: [
      "All Products", "E-Mailers", "Banners", "All Listings",
      "Plain Listings", "Basic Listings", "Platinum Listings", "Premium Listings",
    ],
  },
  {
    section: "MANAGE RESPONSES",
    items: [
      "All Products", "E-Mailers", "All Listings", "Basic Listings",
      "Plain Listings", "Platinum Listings", "Premium Listings", "All Leads",
    ],
  },
  {
    section: "",
    items: [
      "Subscription Status", "Manage Payments", "Credit Usage History",
      "Upgrade History", "FSL Booking", "Omni Ads Performance",
      "Shortlist My Leads", "Opt out Dealer Response", "Change Password",
    ],
  },
];

// ─── Left Sidebar ─────────────────────────────────────────────────────────────
const Sidebar = ({ activeItem, setActiveItem }) => {
    const navigate = useNavigate();
    return(
  <Box sx={{ width: "240px", flexShrink: 0, display: "flex", flexDirection: "column", height: "calc(100vh - 56px)", position: "sticky", top: "56px", ml: 8 }}>
    {/* Profile panel */}
    <Box sx={{ backgroundColor: "#1c3a6e", display: "flex", flexDirection: "column", alignItems: "center", pt: 3, pb: 2.5, px: 2 }}>
      <Box sx={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.35)", overflow: "hidden", mb: 1.5, backgroundColor: "#2a4a80" }}>
        <Box component="img" src="https://static.99acres.com/images/owner_pnava.png" alt="Owner" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Box>
      <Typography sx={{ fontSize: "15px", fontWeight: 700, color: "#fff", fontFamily: "'Segoe UI', sans-serif" }}>Kiran M</Typography>
      <Typography sx={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", fontFamily: "'Segoe UI', sans-serif", mb: 1.5 }}>Master User</Typography>
      <Button size="small" sx={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", textTransform: "none", fontSize: "12px", fontWeight: 600, borderRadius: "4px", px: 2, py: 0.4, fontFamily: "'Segoe UI', sans-serif", border: "1px solid rgba(255,255,255,0.3)", "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" } }}>
        Modify
      </Button>
    </Box>

    {/* Menu panel */}
    <Box sx={{ flex: 1, backgroundColor: "#1a2236", overflowY: "auto", "&::-webkit-scrollbar": { width: "4px" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "4px" } }}>
      {SIDEBAR_MENU.map((group, gi) => (
        <Box key={gi}>
          {group.section && (
            <Typography sx={{ fontSize: group.section === "My99acres" ? "14px" : "11px", fontWeight: group.section === "My99acres" ? 700 : 600, color: group.section === "My99acres" ? "#fff" : "rgba(255,255,255,0.45)", fontFamily: "'Segoe UI', sans-serif", px: 2.5, pt: group.section === "My99acres" ? 2 : 1.5, pb: group.section === "My99acres" ? 1 : 0.5, letterSpacing: group.section === "My99acres" ? "0" : "0.5px", textTransform: group.section === "My99acres" ? "none" : "uppercase" }}>
              {group.section}
            </Typography>
          )}
          {group.items.map((item) => (
            <Box key={item} onClick={() => {
                if (item === "All Listings") {
                        navigate("/post-property/user-property-dashboard");
                    }
                setActiveItem(item)}} 
                sx={{ px: 2.5, py: 1, cursor: "pointer", backgroundColor: activeItem === item ? "rgba(255,255,255,0.1)" : "transparent", borderLeft: activeItem === item ? "3px solid #4da6ff" : "3px solid transparent", transition: "all 0.15s ease", "&:hover": { backgroundColor: "rgba(255,255,255,0.07)" } }}>
              <Typography sx={{ fontSize: "13px", color: activeItem === item ? "#fff" : "rgba(255,255,255,0.72)", fontFamily: "'Segoe UI', sans-serif", fontWeight: activeItem === item ? 600 : 400 }}>
                {item}
              </Typography>
            </Box>
          ))}
          {gi < SIDEBAR_MENU.length - 1 && group.items.length > 0 && (
            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 0.5 }} />
          )}
        </Box>
      ))}
    </Box>
  </Box>
)};

// ─── Modify Profile Main Content ──────────────────────────────────────────────
const ModifyProfileContent = ({ user }) => {
    const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    youAre: "Owner",
    name: "",
    email: "",
    phone1: "",
    phone2: "",
    phone3: "",
    city: "",
    address: "",
    landlineNo: "",
    whatsappConsent: true,
    subscribeConsent: true,
    gstin: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        youAre: user.youAre || "Owner",
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email || "",
        phone1: user.phone || "",
        phone2: user.phone2 || "",
        phone3: user.phone3 || "",
        city: user.city || "Bangalore West",
        address: user.address || "",
        landlineNo: user.landlineNo || "",
        subscribeConsent: user.subscribeConsent || true,
        whatsappConsent : user.whatsappConsent || true

      }));
    }
  }, [user]);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axiosInstance.put(`/user/${userId}`, formData);
      setSuccessMsg("Profile saved successfully!");
      setTimeout(() => {
        setSuccessMsg("");
    }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
      fontSize: "14px",
      fontFamily: "'Segoe UI', sans-serif",
      backgroundColor: "#fff",
      "& fieldset": { borderColor: "#ddd" },
      "&:hover fieldset": { borderColor: "#bbb" },
      "&.Mui-focused fieldset": { borderColor: "#1557a0" },
    },
  };

  const LabelCell = ({ children, required }) => (
    <Box sx={{ width: "200px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "flex-end", pr: 3 }}>
      <Typography sx={{ fontSize: "14px", color: "#444", fontFamily: "'Segoe UI', sans-serif" }}>
        {children}
        {required && <span style={{ color: "#e53935", marginLeft: 2 }}>*</span>}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column",mt:1 }}>

      {/* Top info + service links bar */}
      <Box sx={{ backgroundColor: "#eef2f7", borderBottom: "1px solid #dde4ef", px: 3, py: 1.2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: "13px", color: "#666", fontFamily: "'Segoe UI', sans-serif" }}>
          Last Visited: 09:22 PM | 07 Mar, 2026
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
          {["BUY OUR SERVICES", "POST A PROPERTY", "CUSTOMER SERVICE"].map((link, i) => (
            <Box key={link} sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#333", fontFamily: "'Segoe UI', sans-serif", px: 3, cursor: "pointer", "&:hover": { color: "#1557a0" } }}>
                {link}
              </Typography>
              {i < 2 && <Box sx={{ width: "1px", height: "18px", backgroundColor: "#bbb" }} />}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Breadcrumb */}
      <Box sx={{ px: 3, py: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ fontSize: "13px", color: "#1557a0", cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>Home</Typography>
        <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>Modify Profile</Typography>
      </Box>

      <Box sx={{ px: 3, pb: 4 }}>

        {/* ── Main form card ── */}
        <Box sx={{ backgroundColor: "#fff", border: "1px solid #dde4ef", 
            borderRadius: "10px", overflow: "hidden", maxWidth: "1000px",mt:6 }}>

          {/* Contact Details header */}
          <Box sx={{ backgroundColor: "#ececec", px: 3, py: 2, borderBottom: "1px solid #ddd", }}>
            <Typography sx={{ fontSize: "15px", fontWeight: 500, color: "#333", fontFamily: "'Segoe UI', sans-serif" }}>
              Your Contact Details
            </Typography>
            <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
              (This is where people interested in your property will contact you)
            </Typography>
          </Box>

          {/* Form fields */}
          <Box sx={{ px: 4, py: 4, display: "flex", flexDirection: "column", gap: 2.5 }}>

            {/* You are */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LabelCell required>You are</LabelCell>
              <TextField value={formData.youAre} onChange={handleChange("youAre")} size="small" sx={{ ...inputSx, width: "320px" }} />
            </Box>

            {/* Name */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LabelCell required>Name</LabelCell>
              <TextField value={formData.name} onChange={handleChange("name")} size="small" sx={{ ...inputSx, width: "320px" }} />
            </Box>

            {/* Email ID */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LabelCell required>Email ID</LabelCell>
              <TextField value={formData.email} onChange={handleChange("email")} size="small" sx={{ ...inputSx, width: "320px" }} />
            </Box>

            {/* Phone Number 1 */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LabelCell required>Phone Number</LabelCell>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Select value="+91 IND" size="small" sx={{ minWidth: "115px", fontSize: "14px", fontFamily: "'Segoe UI', sans-serif", borderRadius: "30px", "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" } }}>
                  <MenuItem value="+91 IND">+91 IND</MenuItem>
                </Select>
                <TextField value={formData.phone1} onChange={handleChange("phone1")} size="small" placeholder="Phone Number" sx={{ ...inputSx, width: "200px" }} />
              </Box>
            </Box>

            {/* WhatsApp consent */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "200px", flexShrink: 0 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Checkbox size="small" checked={formData.whatsappConsent} onChange={e => setFormData(p => ({ ...p, whatsappConsent: e.target.checked }))} sx={{ color: "#1557a0", "&.Mui-checked": { color: "#1557a0" }, p: 0.3 }} />
                <Typography sx={{ fontSize: "13px", color: "#1557a0", fontFamily: "'Segoe UI', sans-serif" }}>
                  Allow buyers to WhatsApp me on this number
                </Typography>
              </Box>
            </Box>

            {/* Phone Number 2 */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LabelCell>Phone Number</LabelCell>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Select value="+91 IND" size="small" sx={{ minWidth: "115px", fontSize: "14px", fontFamily: "'Segoe UI', sans-serif", borderRadius: "30px", "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" } }}>
                  <MenuItem value="+91 IND">+91 IND</MenuItem>
                </Select>
                <TextField value={formData.phone2} onChange={handleChange("phone2")} size="small" placeholder="Phone Number" sx={{ ...inputSx, width: "200px" }} />
              </Box>
            </Box>

            {/* Phone Number 3 */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LabelCell>Phone Number</LabelCell>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Select value="+91 IND" size="small" sx={{ minWidth: "115px", fontSize: "14px", fontFamily: "'Segoe UI', sans-serif", borderRadius: "30px", "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" } }}>
                  <MenuItem value="+91 IND">+91 IND</MenuItem>
                </Select>
                <TextField value={formData.phone3} onChange={handleChange("phone3")} size="small" placeholder="Phone Number" sx={{ ...inputSx, width: "200px" }} />
              </Box>
            </Box>

            {/* Your City */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LabelCell required>Your City</LabelCell>
              <Select value={formData.city || "Bangalore West"} onChange={handleChange("city")} size="small" sx={{ minWidth: "320px", fontSize: "14px", fontFamily: "'Segoe UI', sans-serif", borderRadius: "30px", "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" } }}>
                <MenuItem value="Bangalore West">Bangalore West</MenuItem>
                <MenuItem value="Bangalore North">Bangalore North</MenuItem>
                <MenuItem value="Bangalore South">Bangalore South</MenuItem>
                <MenuItem value="Mumbai">Mumbai</MenuItem>
                <MenuItem value="Delhi">Delhi</MenuItem>
                <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                <MenuItem value="Chennai">Chennai</MenuItem>
                <MenuItem value="Pune">Pune</MenuItem>
              </Select>
            </Box>

            {/* Address */}
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <LabelCell>Address</LabelCell>
              <TextField value={formData.address} onChange={handleChange("address")} size="small" placeholder="Address" sx={{ ...inputSx, width: "320px" }} />
            </Box>

            {/* Landline No */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LabelCell>Landline No</LabelCell>
              <TextField value={formData.landlineNo} onChange={handleChange("landlineNo")} size="small" placeholder="Landline No" sx={{ ...inputSx, width: "320px" }} />
            </Box>

            {/* Upload image */}
            <Box sx={{ display: "flex", alignItems: "flex-start", mt: 1 }}>
              <LabelCell>Upload image</LabelCell>
              <Box sx={{ border: "1px solid #ddd", borderRadius: "10px", p: 2.5, display: "flex", flexDirection: "column", gap: 2, backgroundColor: "#fafafa" }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  {/* Upload profile photo */}
                  <Box sx={{ width: "160px", height: "120px", border: "1.5px dashed #ccc", borderRadius: "8px", backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 1, "&:hover": { borderColor: "#1557a0", backgroundColor: "#f0f7ff" } }}>
                    <PersonIcon sx={{ fontSize: "36px", color: "#1557a0" }} />
                    <Typography sx={{ fontSize: "12px", color: "#1557a0", fontFamily: "'Segoe UI', sans-serif", textAlign: "center", lineHeight: 1.3 }}>
                      Upload profile photo
                    </Typography>
                  </Box>
                  {/* Upload company logo */}
                  <Box sx={{ width: "160px", height: "120px", border: "1.5px dashed #ccc", borderRadius: "8px", backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 1, "&:hover": { borderColor: "#1557a0", backgroundColor: "#f0f7ff" } }}>
                    <ImageIcon sx={{ fontSize: "36px", color: "#1557a0" }} />
                    <Typography sx={{ fontSize: "12px", color: "#1557a0", fontFamily: "'Segoe UI', sans-serif", textAlign: "center", lineHeight: 1.3 }}>
                      Upload company logo (optional)
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontSize: "12px", color: "#aaa", fontFamily: "'Segoe UI', sans-serif" }}>
                  Images should .jpg, .jpeg format &amp; less than 10 mb
                </Typography>
              </Box>
            </Box>

          </Box>

          {/* ── GST / State / City info section ── */}
          <Divider sx={{ borderColor: "#eee", mx: 3 }} />

          <Box sx={{ px: 4, py: 3, display: "flex", flexDirection: "column", gap: 0.8 }}>
            <Box sx={{ display: "flex", gap: 8 }}>
              <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
                Current State: <strong style={{ color: "#333" }}>Bangalore</strong>
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
                Current City: <strong style={{ color: "#333" }}>Bangalore West</strong>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 8 }}>
              <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
                Current Address:
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
                GSTIN Number:
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "12px", color: "#555", fontFamily: "'Segoe UI', sans-serif", mt: 0.5 }}>
              <strong>Note:</strong> These details will be used to compute GST when you make a purchase. To edit GST related details contact{" "}
              <span style={{ color: "#1557a0", cursor: "pointer" }}>gst.customer@infoedge.in</span>.
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "#eee", mx: 3 }} />

          {/* ── Subscribe section ── */}
          <Box sx={{ mx: 3, my: 3, border: "1px solid #e0e6ef", borderRadius: "8px", px: 3, py: 2.5 }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#333", fontFamily: "'Segoe UI', sans-serif", mb: 1 }}>
              Subscribe For Updates From 99acres
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <Checkbox size="small" checked={formData.subscribeConsent} onChange={e => setFormData(p => ({ ...p, subscribeConsent: e.target.checked }))} sx={{ color: "#1557a0", "&.Mui-checked": { color: "#1557a0" }, p: 0.3, mt: 0.2 }} />
              <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.5 }}>
                I agree to be contacted by 99acres for similar properties or related services via WhatsApp, phone (overriding NDNC registration), sms, e-mail etc.
              </Typography>
            </Box>
          </Box>

          {/* ── Save Profile ── */}
          <Box sx={{ px: 4, pb: 4, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
            <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
              By clicking below you agree to{" "}
              <span style={{ color: "#1557a0", cursor: "pointer" }}>Terms and Conditions</span>
            </Typography>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                backgroundColor: "#387ecd",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "15px",
                borderRadius: "10px",
                px: 6,
                py: 1.3,
                fontFamily: "'Segoe UI', sans-serif",
                mt: 0.5,
                "&:hover": { backgroundColor: "#0e4080" },
                ml:10
              }}
            >
              Save Profile
            </Button>

            {successMsg && (
                <span style={{ color: "green", fontSize: "14px" }}>
                ✅ {successMsg}
                </span>
            )}
            </div>
          </Box>
          
        </Box>

        {/* ── For Queries You Can Reach Us At ── */}
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#888", letterSpacing: "0.5px", fontFamily: "'Segoe UI', sans-serif", mb: 1.5, textTransform: "uppercase" }}>
            For Queries You Can Reach Us At:
          </Typography>

          <Box sx={{ border: "1px solid #e0e6ef", borderRadius: "8px", backgroundColor: "#fff", overflow: "hidden" }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", px: 3, py: 2.5, gap: 4 }}>

              {/* Call us */}
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, flex: 1 }}>
                <Box sx={{ width: 36, height: 52, flexShrink: 0, display: "flex", alignItems: "flex-start", pt: 0.3 }}>
                  <svg width="28" height="44" viewBox="0 0 28 44" fill="none">
                    <rect x="3" y="0" width="22" height="38" rx="4" fill="#4caf50" />
                    <rect x="6" y="3" width="16" height="28" rx="2" fill="#fff" />
                    <circle cx="14" cy="35" r="2" fill="#fff" />
                    <rect x="9" y="8" width="10" height="2" rx="1" fill="#e0f2f1" />
                    <rect x="7" y="12" width="14" height="1.5" rx="0.75" fill="#e0f2f1" />
                    <rect x="7" y="15" width="14" height="1.5" rx="0.75" fill="#e0f2f1" />
                    <rect x="7" y="18" width="10" height="1.5" rx="0.75" fill="#e0f2f1" />
                  </svg>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "13px", color: "#333", fontFamily: "'Segoe UI', sans-serif", mb: 0.4 }}>
                    <strong>Call us at:</strong> 1800 41 99099
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#555", fontFamily: "'Segoe UI', sans-serif", mb: 0.4 }}>
                    For international numbers click{" "}
                    <span style={{ color: "#1557a0", cursor: "pointer", fontWeight: 600 }}>here</span>
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
                    SMS: BUY as 56070
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ width: "1px", backgroundColor: "#eef0f4", alignSelf: "stretch" }} />

              {/* Mail us */}
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, flex: 1 }}>
                <Box sx={{ width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                    <rect width="32" height="24" rx="3" fill="#607d8b" />
                    <path d="M2 3 L16 14 L30 3" stroke="#fff" strokeWidth="2" fill="none" />
                    <line x1="2" y1="21" x2="11" y2="13" stroke="#fff" strokeWidth="1.5" />
                    <line x1="30" y1="21" x2="21" y2="13" stroke="#fff" strokeWidth="1.5" />
                  </svg>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "13px", color: "#333", fontFamily: "'Segoe UI', sans-serif", mb: 0.5 }}>
                    <strong>Mail us for Sales/Service/General Enquiries:</strong>
                  </Typography>
                  <Typography sx={{ fontSize: "13px", color: "#1557a0", fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", cursor: "pointer" }}>
                    services@99acres.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ width: "1px", backgroundColor: "#eef0f4", alignSelf: "stretch" }} />

              {/* Request for Information */}
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, flex: 1 }}>
                <Box sx={{ width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
                    <rect x="0" y="0" width="28" height="36" rx="3" fill="#546e7a" />
                    <circle cx="14" cy="10" r="4" fill="#fff" />
                    <rect x="11" y="17" width="6" height="14" rx="3" fill="#fff" />
                    <text x="14" y="13" textAnchor="middle" fontSize="8" fontWeight="900" fill="#546e7a">i</text>
                  </svg>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "13px", color: "#333", fontFamily: "'Segoe UI', sans-serif", mb: 0.5 }}>
                    <strong>Request for Information:</strong>
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#555", fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.5 }}>
                    Ask us for information about our services.{" "}
                    <span style={{ color: "#1557a0", cursor: "pointer", fontWeight: 600 }}>Request Info</span>
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ borderColor: "#eef0f4" }} />

            <Box sx={{ px: 3, py: 1.5 }}>
              <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
                Office &amp; Locations :{" "}
                <span style={{ color: "#1557a0", fontWeight: 600, cursor: "pointer" }}>Click here</span>
                {" "}for Branch Address
              </Typography>
            </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

// ─── Root Component ───────────────────────────────────────────────────────────
export default function EditProfile({ user, setUser }) {
  const [activeItem, setActiveItem] = useState("My99acres");

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#eef2f7", fontFamily: "'Segoe UI', sans-serif", display: "flex", flexDirection: "column" }}>

      {/* Sticky Navbar */}
      <Box sx={{ position: "sticky", top: 0, zIndex: 1200 }}>
        <PostNavbar user={user} setUser={setUser} />
      </Box>

      {/* Body: sidebar + content */}
      <Box sx={{ display: "flex", flex: 1, alignItems: "flex-start" }}>
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        <Box sx={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
          <ModifyProfileContent user={user} />
        </Box>
      </Box>
    </Box>
  );
}
