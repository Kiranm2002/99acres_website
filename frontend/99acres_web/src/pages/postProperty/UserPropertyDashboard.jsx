import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Checkbox,
  Chip,
  LinearProgress,
  Divider,
  Select,
  MenuItem,
  InputAdornment,
  TextField,Dialog,DialogTitle,DialogContent,DialogActions,Radio,RadioGroup,FormControlLabel
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BlockIcon from "@mui/icons-material/Block";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import AppDrawer from "../../components/common/AppDrawer";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../../utils/axiosInstance";
import {useNavigate } from "react-router-dom";


// ─── Sidebar menu config ───────────────────────────────────────────────────────
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


// ─── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return(
  <Box
    sx={{
      backgroundColor: "#0b429cff",
      height: "70px",
      display: "flex",
      alignItems: "center",
      px: 3,
      gap: 2,
      flexShrink: 0,
    }}
  >
    <Typography
      sx={{ fontWeight: 800, fontSize: "34px", color: "#fff", fontFamily: "'Segoe UI', sans-serif", flexShrink: 0, letterSpacing: "-0.5px" }}
    >
      99<span style={{ fontWeight: 400 }}>acres</span>
    </Typography>
    <Box sx={{ flex: 1 }} />
    {/* Notification bell */}
    <IconButton
      sx={{ color: "#fff", p: 0.8, width: 34, height: 34 }}
    >
      <NotificationsNoneIcon sx={{ fontSize: "18px" }} />
    </IconButton>
    {/* KM avatar */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, cursor: "pointer" }}>
      <Avatar
        sx={{ width: 30, height: 30, backgroundColor: "#c8e6c9", color: "#2e7d32", fontSize: "11px", fontWeight: 700 }}
      >
        KM
      </Avatar>
      <KeyboardArrowDownIcon sx={{ color: "#fff", fontSize: "18px" }} />
    </Box>
    {/* Hamburger */}
    <IconButton sx={{ color: "#fff", p: 0.5 }} onClick={() => setDrawerOpen(true)}>
      <MenuIcon sx={{ fontSize: "22px" }} />
    </IconButton>
    <AppDrawer
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      // user={user}
      // onOpenLogin={handleOpenLogin}
/>
  </Box>
)};

// ─── Left Sidebar ──────────────────────────────────────────────────────────────
const Sidebar = ({ activeItem, setActiveItem }) => (
  <Box
    sx={{
      width: "240px",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 56px)",
      position: "sticky",
      top: "56px",ml:8
    }}
  >
    {/* Profile panel — navy blue top */}
    <Box
      sx={{
        backgroundColor: "#1c3a6e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 3,
        pb: 2.5,
        px: 2,
      }}
    >
      {/* Avatar circle */}
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: "3px solid rgba(255,255,255,0.35)",
          overflow: "hidden",
          mb: 1.5,
          backgroundColor: "#2a4a80",
        }}
      >
        <Box
          component="img"
          src="https://static.99acres.com/images/owner_pnava.png"
          alt="Owner"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      
      <Typography sx={{ fontSize: "15px", fontWeight: 700, color: "#fff", fontFamily: "'Segoe UI', sans-serif" }}>
        Kiran M
      </Typography>
      <Typography sx={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", fontFamily: "'Segoe UI', sans-serif", mb: 1.5 }}>
        Master User
      </Typography>
      
      <Button
        size="small"
        sx={{
          backgroundColor: "rgba(255,255,255,0.15)",
          color: "#fff",
          textTransform: "none",
          fontSize: "12px",
          fontWeight: 600,
          borderRadius: "4px",
          px: 2,
          py: 0.4,
          fontFamily: "'Segoe UI', sans-serif",
          border: "1px solid rgba(255,255,255,0.3)",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
        }}
      >
        Modify
      </Button>
      
    </Box>

    {/* Menu panel — dark scrollable */}
    <Box
      sx={{
        flex: 1,
        backgroundColor: "#1a2236",
        overflowY: "auto",
        "&::-webkit-scrollbar": { width: "4px" },
        "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "4px" },
      }}
    >
      {SIDEBAR_MENU.map((group, gi) => (
        <Box key={gi}>
          {/* Section header */}
          {group.section && (
            <Typography
              sx={{
                fontSize: group.section === "My99acres" ? "14px" : "11px",
                fontWeight: group.section === "My99acres" ? 700 : 600,
                color: group.section === "My99acres" ? "#fff" : "rgba(255,255,255,0.45)",
                fontFamily: "'Segoe UI', sans-serif",
                px: 2.5,
                pt: group.section === "My99acres" ? 2 : 1.5,
                pb: group.section === "My99acres" ? 1 : 0.5,
                letterSpacing: group.section === "My99acres" ? "0" : "0.5px",
                textTransform: group.section === "My99acres" ? "none" : "uppercase",
              }}
            >
              {group.section}
            </Typography>
          )}

          {/* Menu items */}
          {group.items.map((item) => (
            <Box
              key={item}
              onClick={() => setActiveItem(item)}
              sx={{
                px: 2.5,
                py: 1,
                cursor: "pointer",
                backgroundColor: activeItem === item ? "rgba(255,255,255,0.1)" : "transparent",
                borderLeft: activeItem === item ? "3px solid #4da6ff" : "3px solid transparent",
                transition: "all 0.15s ease",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.07)" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  color: activeItem === item ? "#fff" : "rgba(255,255,255,0.72)",
                  fontFamily: "'Segoe UI', sans-serif",
                  fontWeight: activeItem === item ? 600 : 400,
                }}
              >
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
);

// ─── Property Card ─────────────────────────────────────────────────────────────
const PropertyCard = ({ property }) =>{
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [otherText, setOtherText] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate()

  const handleDeleteListing = async () => {
  try {
      const propertyId = localStorage.getItem("propertyId")
      await axiosInstance.delete(
        `property/delete-property/${propertyId}`,
        {
          data: {
            reason: deleteReason === "Others" ? otherText : deleteReason,
          },
        }
      );

    // remove from UI
    setProperties(prev => prev.filter(p => p.id !== deletingId));

    setDeleteOpen(false);
    setDeleteReason("");
    setOtherText("");
    setDeletingId(null);

    setSuccessOpen(true);

   
    setTimeout(() => {
      setSuccessOpen(false);
    }, 3000);
    localStorage.removeItem("propertyId")

  } catch (error) {
    console.error("Delete failed:", error);
  }
};
const handleCloseDeleteModal = () => {
  setDeleteOpen(false);
  setDeleteReason("");
  setOtherText("");
};
  return(<>
  <Box
    sx={{
      backgroundColor: "#fff",
      border: "1px solid #e0e6ef",
      borderRadius: "8px",
      mb: 2,
      overflow: "hidden",
    }}
  >
    {/* Card top row */}
    <Box sx={{ display: "flex", alignItems: "flex-start", px: 2.5, pt: 2, pb: 1, gap: 1.5 }}>
      <Checkbox size="small" sx={{ mt: "-4px", p: 0.5, color: "#aaa" }} />
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 0.5 }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#071c2c",
              fontFamily: "'Segoe UI', sans-serif",
              lineHeight: 1.4,
              flex: 1,
            }}
          >
            {property.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0, mt: 0.3 }}>
            <Chip
              label={property.badge}
              size="small"
              sx={{
                backgroundColor: property.badgeColor,
                color: "#fff",
                fontSize: "11px",
                fontWeight: 700,
                height: "22px",
                borderRadius: "4px",
                fontFamily: "'Segoe UI', sans-serif",
              }}
            />
            <IconButton sx={{ p: 0.4 }}>
              <OpenInNewIcon sx={{ fontSize: "16px", color: "#888" }} />
            </IconButton>
          </Box>
        </Box>

        <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
          Price: &nbsp;<strong>{property.price}</strong>&nbsp;|&nbsp; Carpet Area: &nbsp;<strong>{property.carpetArea}</strong>
        </Typography>
      </Box>

      {/* Right action icons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
        <Typography
          sx={{ fontSize: "13px", color: "#1557a0", fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", cursor: "pointer", mr: 1 }}
        >
          Show Contact
        </Typography>
        <IconButton sx={{ p: 0.6 }} onClick={()=>window.open("/post-property/primary-details","_blank")}>
          <EditOutlinedIcon sx={{ fontSize: "18px", color: "#888" }} />
        </IconButton>
        <IconButton sx={{ p: 0.6 }} onClick={() => {
            setDeletingId(property.id);
            setDeleteOpen(true);
          }}>
          <DeleteOutlineIcon sx={{ fontSize: "18px", color: "#888" }} />
        </IconButton>
        <IconButton sx={{ p: 0.6 }}>
          <BlockIcon sx={{ fontSize: "18px", color: "#888" }} />
        </IconButton>
      </Box>
    </Box>

    <Divider sx={{ borderColor: "#f0f2f5" }} />

    {/* Card bottom stats row */}
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3, px: 3.5, py: 2 }}>
      {/* ID + Status + Posted */}
      <Box sx={{ minWidth: "220px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.8 }}>
          <Typography sx={{ fontSize: "13px", fontFamily: "'Segoe UI', sans-serif", color: "#444" }}>
            <strong>{property.id}:</strong>
          </Typography>
          <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#4caf50", fontFamily: "'Segoe UI', sans-serif" }}>
            {property.status}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#777", fontFamily: "'Segoe UI', sans-serif" }}>
            | Posted On: <strong style={{ color: "#333" }}>{property.postedOn}</strong>
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "12px", color: "#777", fontFamily: "'Segoe UI', sans-serif", mb: 1.2 }}>
          Expiry On: <strong style={{ color: "#333" }}>{property.expiryOn}</strong>
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "#777", fontFamily: "'Segoe UI', sans-serif" }}>
          Summary view: <strong style={{ color: "#333" }}>{property.summaryViews}</strong>
          &nbsp;&nbsp; Details view: <strong style={{ color: "#333" }}>{property.detailViews}</strong>
        </Typography>
      </Box>

      {/* Completion progress */}
      <Box sx={{ flex: 1, pt: 0.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Box sx={{ flex: 1 }}>
            <LinearProgress
              variant="determinate"
              value={property.completion}
              sx={{
                height: "10px",
                borderRadius: "5px",
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": { backgroundColor: "#4caf50", borderRadius: "5px" },
              }}
            />
          </Box>
          <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#333", fontFamily: "'Segoe UI', sans-serif", flexShrink: 0 }}>
            {property.completion} % Complete
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "12px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
          Listing Price : {property.listingPrice}&nbsp;
          <span style={{ color: "#1557a0", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>Upgrade</span>
        </Typography>
      </Box>

      {/* Video Tour Booking */}
      <Box sx={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 0.8 }}>
        <Chip
          label="New"
          size="small"
          sx={{ backgroundColor: "#4caf50", color: "#fff", fontSize: "10px", fontWeight: 700, height: "18px", borderRadius: "3px" }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography sx={{ fontSize: "12px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>
            Video Tour Booking
          </Typography>
          <InfoOutlinedIcon sx={{ fontSize: "14px", color: "#aaa" }} />
          {/* Toggle */}
          <Box
            sx={{
              width: 34,
              height: 18,
              borderRadius: "9px",
              backgroundColor: "#ccc",
              position: "relative",
              cursor: "pointer",
              ml: 0.5,
            }}
          >
            <Box sx={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#fff", position: "absolute", top: 2, right: 2, boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} />
          </Box>
        </Box>
      </Box>
    </Box>
    
  </Box>
  <Dialog
  open={deleteOpen}
  onClose={handleCloseDeleteModal}
  maxWidth="sm"     // increased width
  fullWidth
  sx={{borderRadius:0}}
>
  {/* Header */}
  <DialogTitle
    sx={{
      backgroundColor: "#4a4f57",
      color: "#fff",
      fontSize: "14px",
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      pr: 1
    }}
  >
    Tell us your reason to delete this listing

    {/* Close Icon */}
    <IconButton
      onClick={handleCloseDeleteModal}
      sx={{ color: "#fff" }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  </DialogTitle>

  <DialogContent sx={{ pt: 2 }}>
    <RadioGroup
      value={deleteReason}
      onChange={(e) => setDeleteReason(e.target.value)}
    >
      {[
        "Property is Sold out",
        "Unable to edit",
        "Have changed my mind",
        "Not satisfied with 99acres",
        "Others",
      ].map((option) => (
        <FormControlLabel
          key={option}
          value={option}
          control={<Radio size="small" />}
          label={option}
        />
      ))}
    </RadioGroup>

    {/* Show textarea only when Others selected */}
    {deleteReason === "Others" && (
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder="Please tell us more ..."
        value={otherText}
        onChange={(e) => setOtherText(e.target.value)}
        sx={{ mt: 2 }}
      />
    )}
  </DialogContent>

  <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
    <Button
      variant="contained"
      disabled={!deleteReason}
      onClick={handleDeleteListing}
      sx={{
        textTransform: "none",
        px: 4,
        backgroundColor: deleteReason ? "#1976d2" : "#cfcfcf",
        "&:hover": {
          backgroundColor: deleteReason ? "#1565c0" : "#cfcfcf",
        },
      }}
    >
      Delete Listing
    </Button>
  </DialogActions>
</Dialog>
<Dialog
  open={successOpen}
  onClose={() => setSuccessOpen(false)}
  maxWidth="xs"
  fullWidth
>
  <DialogTitle
    sx={{
      display: "flex",
      justifyContent: "flex-end",
      pb: 0
    }}
  >
    <IconButton onClick={() => setSuccessOpen(false)}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <DialogContent
    sx={{
      textAlign: "center",
      pb: 4
    }}
  >
    {/* Green Tick */}
    <CheckCircleIcon
      sx={{
        fontSize: 70,
        color: "#4caf50",
        mb: 2
      }}
    />

    {/* Success Message */}
    <Typography
      sx={{
        fontSize: "18px",
        fontWeight: 600,
        color: "#4caf50"
      }}
    >
      Property Deleted Successfully
    </Typography>
  </DialogContent>
</Dialog>
  </>
)};

// ─── Main Content Area ─────────────────────────────────────────────────────────
const MainContent = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Active");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("Newest First");
  const [locality, setLocality] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  
  

  const FILTERS = ["ALL", "Active", "Reported", "Underscreening", "Expired", "Deleted"];

  useEffect(() => {
  const propertyId = localStorage.getItem("propertyId");

  if (!propertyId) return;

  const fetchPropertyFromBackend = async () => {
    try {
      const response = await axiosInstance.get(
        `/property/${propertyId}`
      );
      const data = response.data;

      const formattedProperty = {
        id: data._id,  

        title: `${data.bhk || ""} ${data.propertyType} ${data.category} for ${data.lookingFor} in ${data.project.name}, ${data.subLocality.name}, ${data.city.name}`, 

        price: data.expectedPrice,   

        carpetArea: `${data.plotArea} ${data.areaUnit}`, 

        badge: "Plain",
        badgeColor: "#e07b00",
        status: "Active",

        postedOn: new Date(data.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),   

        expiryOn: "30 Oct 2026",
        completion: 65,
        summaryViews: 0,
        detailViews: 3,
        listingPrice: "0 Credits",
      };

      setProperties([formattedProperty]);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching property:", error);
      setLoading(false)
    }
  };

  fetchPropertyFromBackend();
}, []);

  

  return (<>
    <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

      {/* Top info + service links bar */}
      <Box
        sx={{
          backgroundColor: "#eef2f7",
          borderBottom: "1px solid #dde4ef",
          px: 3,
          py: 1.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: "13px", color: "#666", fontFamily: "'Segoe UI', sans-serif" }}>
          Last Visited: 10:30 AM | 04 Mar, 2026
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
          {["BUY OUR SERVICES", "POST A PROPERTY", "CUSTOMER SERVICE"].map((link, i) => (
            <Box key={link} sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{ fontSize: "13px", fontWeight: 600, color: "#333", fontFamily: "'Segoe UI', sans-serif", px: 3, cursor: "pointer", "&:hover": { color: "#1557a0" } }}
              >
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
        <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>Manage Listing</Typography>
      </Box>

      <Box sx={{ px: 3, pb: 4 }}>

        {/* Filter toolbar */}
        <Box
          sx={{
            border: "1.5px solid #c8ddf0",
            borderRadius: "8px",
            backgroundColor: "#fff",
            mb: 2.5,
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", px: 2.5, py: 1.5, flexWrap: "wrap", gap: 2 }}>
            {/* Activation status */}
            <Box>
              <Typography sx={{ fontSize: "11px", color: "#888", fontFamily: "'Segoe UI', sans-serif", mb: 0.5, letterSpacing: "0.4px", textTransform: "uppercase" }}>
                Activation Status
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexWrap: "wrap" }}>
                {FILTERS.map((f, i) => (
                  <Box key={f} sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      onClick={() => setActiveFilter(f)}
                      sx={{
                        fontSize: "13px",
                        color: activeFilter === f ? "#1557a0" : "#555",
                        fontWeight: activeFilter === f ? 700 : 400,
                        fontFamily: "'Segoe UI', sans-serif",
                        cursor: "pointer",
                        borderBottom: activeFilter === f ? "2px solid #1557a0" : "2px solid transparent",
                        pb: 0.2,
                        "&:hover": { color: "#1557a0" },
                      }}
                    >
                      {f}
                    </Typography>
                    {i < FILTERS.length - 1 && <Box sx={{ width: "1px", height: "14px", backgroundColor: "#ddd", mx: 1 }} />}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ flex: 1 }} />

            {/* Locality search */}
            <TextField
              size="small"
              placeholder="Enter Locality"
              value={locality}
              onChange={e => setLocality(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: "18px", color: "#aaa" }} /></InputAdornment> }}
              sx={{ width: "180px", "& .MuiOutlinedInput-root": { borderRadius: "6px", fontSize: "13px", fontFamily: "'Segoe UI', sans-serif" } }}
            />

            {/* Category */}
            <Box>
              <Typography sx={{ fontSize: "11px", color: "#888", fontFamily: "'Segoe UI', sans-serif", mb: 0.2, letterSpacing: "0.4px", textTransform: "uppercase" }}>Category</Typography>
              <Select
                value={category}
                onChange={e => setCategory(e.target.value)}
                displayEmpty
                size="small"
                sx={{ minWidth: "120px", fontSize: "13px", fontFamily: "'Segoe UI', sans-serif", borderRadius: "6px" }}
              >
                <MenuItem value=""><em>Select</em></MenuItem>
                <MenuItem value="residential">Residential</MenuItem>
                <MenuItem value="commercial">Commercial</MenuItem>
              </Select>
            </Box>

            {/* More Filters */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", px: 1.5, py: 0.8, border: "1px solid #dde6ef", borderRadius: "6px" }}>
              <FilterListIcon sx={{ fontSize: "16px", color: "#555" }} />
              <Typography sx={{ fontSize: "13px", color: "#555", fontFamily: "'Segoe UI', sans-serif" }}>More Filters</Typography>
            </Box>

            {/* Sort */}
            <Box>
              <Typography sx={{ fontSize: "11px", color: "#888", fontFamily: "'Segoe UI', sans-serif", mb: 0.2, letterSpacing: "0.4px", textTransform: "uppercase" }}>Sort</Typography>
              <Select
                value={sort}
                onChange={e => setSort(e.target.value)}
                size="small"
                sx={{ minWidth: "140px", fontSize: "13px", fontFamily: "'Segoe UI', sans-serif", borderRadius: "6px" }}
              >
                <MenuItem value="Newest First">Newest First</MenuItem>
                <MenuItem value="Oldest First">Oldest First</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>

        {/* Premium launches link */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1.5 }}>
          <Typography sx={{ fontSize: "13px", color: "#1557a0", fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
            List of Premium New Launches
          </Typography>
        </Box>

        {/* Action bar */}
        <Box
          sx={{
            backgroundColor: "#fff",
            border: "1px solid #e0e6ef",
            borderRadius: "8px",
            px: 2.5,
            py: 1.2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#333", fontFamily: "'Segoe UI', sans-serif", flex: 1 }}>
            {properties.length} Active Product{properties.length !== 1 ? "s" : ""}
          </Typography>
          <Box sx={{ width: "1px", height: "22px", backgroundColor: "#e0e6ef" }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <Checkbox
              size="small"
              checked={selectAll}
              onChange={e => setSelectAll(e.target.checked)}
              sx={{ p: 0.5, color: "#aaa" }}
            />
            <Typography sx={{ fontSize: "13px", color: "#444", fontFamily: "'Segoe UI', sans-serif" }}>Select All</Typography>
          </Box>
          <Box sx={{ width: "1px", height: "22px", backgroundColor: "#e0e6ef" }} />
          <Typography sx={{ fontSize: "13px", color: "#444", fontFamily: "'Segoe UI', sans-serif", cursor: "pointer", "&:hover": { color: "#e53935" } }}>
            Delete
          </Typography>
          <Box sx={{ width: "1px", height: "22px", backgroundColor: "#e0e6ef" }} />
          <Typography sx={{ fontSize: "13px", color: "#444", fontFamily: "'Segoe UI', sans-serif", cursor: "pointer" }}>
            Show Contact
          </Typography>
        </Box>

        {/* Property cards */}
        {properties.length === 0 ? (
          <Box
            sx={{
              py: 10,
              textAlign: "center",
              backgroundColor: "#fff",
              border: "1px solid #e0e6ef",
              borderRadius: "8px"
            }}
          >
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: 600,
                color: "#888",
                fontFamily: "'Segoe UI', sans-serif"
              }}
            >
              No Property Listed Yet
            </Typography>
          </Box>
        ) : (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        )}

        {/* Pagination footer */}
        {!loading && (
          <Typography sx={{ fontSize: "13px", color: "#666", fontFamily: "'Segoe UI', sans-serif", mt: 1, mb: 4 }}>
            Displaying 1 - 1 of 1 results
          </Typography>
        )}

        {/* ── Queries / Contact Section ── */}
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: "12px", fontWeight: 700, color: "#888", letterSpacing: "0.5px", fontFamily: "'Segoe UI', sans-serif", mb: 1.5, textTransform: "uppercase" }}>
            For Queries You Can Reach Us At:
          </Typography>

          <Box sx={{ border: "1px solid #e0e6ef", borderRadius: "8px", backgroundColor: "#fff", overflow: "hidden" }}>
            {/* Three contact columns */}
            <Box sx={{ display: "flex", alignItems: "flex-start", px: 3, py: 2.5, gap: 4 }}>

              {/* Call us */}
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, flex: 1 }}>
                {/* Phone icon */}
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
                {/* Envelope icon */}
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
                {/* Info icon */}
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

            {/* Office & Locations row */}
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
    
</>
  );
};

// ─── Root Component ────────────────────────────────────────────────────────────
export default function UserPropertyDashboard() {
  const [activeItem, setActiveItem] = useState("All Listings");

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#eef2f7", fontFamily: "'Segoe UI', sans-serif", display: "flex", flexDirection: "column" }}>

      {/* Sticky Navbar */}
      <Box sx={{ position: "sticky", top: 0, zIndex: 1200 }}>
        <Navbar />
      </Box>

      {/* Body: sidebar + content */}
      <Box sx={{ display: "flex", flex: 1, alignItems: "flex-start" }}>
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        <Box sx={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
          <MainContent />
        </Box>
      </Box>
    </Box>
  );
}
