import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fab } from "@mui/material";

function Footer() {
    const handleScrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    };
  const sectionStyle = {
    color: "#fff",
    fontSize: "14px",
    fontWeight:"500",
    mb: 1.2,
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #0f2027, #0f2027, #0f2027)",
        color: "#fff",
        
        pt: 6,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={12}>
          {/* 99acres Column */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography fontWeight={600} mb={2}>
              99acres
            </Typography>
            {[
              "Mobile Apps",
              "Our Services",
              "Price Trends",
              "Post your Property",
              "Real Estate Investments",
              "Builders in India",
              "Area Converter",
              "Articles",
              "Rent Receipt",
              "Customer Service",
              "Sitemap",
            ].map((item) => (
              <Typography key={item} sx={sectionStyle}>
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Company */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography fontWeight={600} mb={2}>
              Company
            </Typography>
            {[
              "About us",
              "Contact us",
              "Careers with us",
              "Terms & Conditions",
              "Request Info",
              "Feedback",
              "Report a problem",
              "Testimonials",
              "Privacy Policy",
              "Summons/Notices",
              "Grievances",
              "Safety Guide",
            ].map((item) => (
              <Typography key={item} sx={sectionStyle}>
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Our Partners */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography fontWeight={600} mb={2}>
              Our Partners
            </Typography>
            {[
              "Naukri.com - Jobs in India",
              "Naukrigulf.com - Jobs in middle east",
              "Jeevansathi.com - Matrimonials",
              "Brijj.com - Professional Networking",
              "Shiksha.com - Education Career Info",
              "Policybazaar.com - Insurance India",
              "PaisaBazaar.com",
              "AmbitionBox.com",
              "FirstNaukri.com - Campus Hiring",
              "Jobhai.com – Find Jobs Near You",
              "Techminis.com - Tech news on the go",
            ].map((item) => (
              <Typography key={item} sx={sectionStyle}>
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography fontWeight={600} mb={2}>
              Contact Us
            </Typography>

            <Typography sx={{ fontSize: 14 }}>
              Toll Free - 1800 41 99099
            </Typography>

            <Typography sx={{ fontSize: 13, color: "#ccc", mb: 2 }}>
              9:30 AM to 6:30 PM (Mon-Sun)
            </Typography>

            <Typography sx={{ fontSize: 14, mb: 3 }}>
              Email - feedback@99acres.com
            </Typography>

            <Typography fontWeight={600} mb={1}>
              Connect with us
            </Typography>

            <Box>
              <IconButton sx={{ color: "#fff" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <YouTubeIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <InstagramIcon />
              </IconButton>
            </Box>

            <Typography fontWeight={600} mt={3} mb={1}>
              Download the App
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Box
                component="img"
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                sx={{ height: 40 }}
              />
              <Box
                component="img"
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                sx={{ height: 40 }}
              />
            </Box>

            {/* Bottom Disclaimer all inside Contact column */}
            <Typography
              variant="body2"
              sx={{ color: "#aaa", fontSize: 10, mb: 2 }}
            >
              Usage of 99acres.com to upload content showing area in non standard<br/>
              units or which enables targeting by religion/community/caste/race is<br/>
              prohibited. Please report inappropriate content by writing to us at
              report abuse.
            </Typography>

            <Typography variant="body2" sx={{ color: "#fff", fontSize: 12 }}>
              All trademarks are the property of their respective owners.
              <br />
              All rights reserved - Info Edge (India) Ltd.
              <br />
              A naukri.com group venture
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Fab
        onClick={handleScrollToTop}
        sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            backgroundColor: "#fff",
            color: "#000",
            width: 48,
            height: 48,
            "&:hover": {
            backgroundColor: "#ddd",
            },
        }}
        >
        <KeyboardArrowUpIcon />
        </Fab>
    </Box>
  );
}

export default Footer;