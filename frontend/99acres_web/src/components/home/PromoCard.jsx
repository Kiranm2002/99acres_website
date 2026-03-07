import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
function PromoCard() {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={3}
      sx={{
        // position: "fixed",
        // top: 320, // Adjust based on Guest Card height + spacing
        // right: 55,
        width: "100%",
        borderRadius: 1,
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor: "#d9ebe7", // Light greenish background similar to image
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        // zIndex: 50,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography fontWeight={700} fontSize={16} mb={0.5}>
          Sell or rent faster at <br /> the right price!
        </Typography>
        <Typography fontSize={14} mb={1}>
          List your property now
        </Typography>
        <Button
          variant="contained"
          onClick={()=>{
            const accessToken = localStorage.getItem("accessToken")
              if(accessToken){
                navigate("/post-property/primary-details")
              }else{
                navigate("/post-property")
              }
          }}
          sx={{
            backgroundColor: "#0071e3",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            borderRadius:"4px",
            whiteSpace:"nowrap",
            "&:hover": {
              backgroundColor: "#005bb5",
            },
          }}
        >
          Post Property, It's FREE
        </Button>
      </Box>

      <Box sx={{ width: 80, flexShrink: 0 }}>
        <img
          src="https://www.99acres.com/universalapp/img/hp_ppf_banner.png"
          alt="Promo"
          style={{ width: "100%", height: "auto", borderRadius: 6 }}
        />
      </Box>
    </Paper>
  );
}

export default PromoCard;