import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Slide,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

const SecondaryNavbar = ({ show }) => {
  return (
    <Slide direction="down" in={show} mountOnEnter unmountOnExit>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#1565c0",
          px: 2,
          boxShadow: 3,
          zIndex: 1400,
        }}
      >
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          
          {/* LOGO */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, whiteSpace: "nowrap" }}
          >
            99acres
          </Typography>

          {/* LOCATION */}
          <Button
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              textTransform: "none",
              color: "#fff",
              whiteSpace: "nowrap",
            }}
          >
            Buy in Bangalore East
          </Button>

          {/* SEARCH SECTION */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: "8px",
              px: 1,
              height: 40,
            }}
          >
            <Button
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                textTransform: "none",
                color: "#000",
                minWidth: 80,
              }}
            >
              Buy
            </Button>

            <TextField
              fullWidth
              variant="standard"
              placeholder="Enter Locality / Project / Society / Landmark"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <MyLocationIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <MicIcon fontSize="small" />
                  </InputAdornment>
                  
                ),
              }}
              sx={{ ml: 1 }}
            />

            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* POST PROPERTY */}
          <Button
            sx={{
              textTransform: "none",
              backgroundColor: "#fff",
              color: "#000",
              px: 2,
              whiteSpace: "nowrap",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            Post property
            <Box
              sx={{
                bgcolor: "green",
                color: "#fff",
                fontSize: "10px",
                px: 1,
                ml: 1,
                borderRadius: "4px",
              }}
            >
              FREE
            </Box>
          </Button>

          {/* PROFILE */}
          <IconButton sx={{ color: "#fff" }}>
            <AccountCircleIcon />
          </IconButton>

          {/* MENU */}
          <IconButton sx={{ color: "#fff" }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default SecondaryNavbar;