import React, { useRef,useState,useEffect } from "react";
import {
  Box,
  Typography,
 
  IconButton
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const options = [
  { title: "Buying a home", image: "https://static.99acres.com/universalhp/img/d_hp_buy.webp" },
  { title: "Renting a home", image: "https://static.99acres.com/universalhp/img/d_hp_rent.webp" },
  { title: "Invest in Real Estate", image: "https://static.99acres.com/universalapp/img/d_hp_invest_new.webp" },
  { title: "Sell/Rent your property", image: "https://www.99acres.com/universalapp/img/hp_ppf_launch_inline.png" },
  { title: "Plots/Land", image: "https://static.99acres.com/universalhp/img/d_hp_plot_land.webp" },
  { title: "Explore Insights", image: "https://static.99acres.com/universalhp/img/ei.webp" },
  { title: "PG/Co-living", image: "https://static.99acres.com/universalhp/img/d_hp_pg.webp" },
  { title: "Buying commercial spaces", image: "https://static.99acres.com/universalhp/img/d_hp_com_buy.webp" },
  { title: "Lease commercial spaces", image: "https://static.99acres.com/universalhp/img/d_hp_com_lease.webp" },
];

const ExploreOptions = () => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    const scrollAmount = el.clientWidth; // scroll full visible width

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <Box sx={{ px: 8, mt: 8, position: "relative" }}>

      {/* CENTER HEADING */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
        <Typography
            sx={{
            color: "#6b778c",
            fontWeight: 600,
            fontSize: "14px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            }}
        >
            GET STARTED WITH EXPLORING REAL ESTATE OPTIONS
        </Typography>
        </Box>

      {/* LEFT ARROW */}
      {showLeft && (
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: 20,
            top: "55%",
            transform: "translateY(-50%)",
            bgcolor: "#fff",
            boxShadow: 3,
            zIndex: 2,
            "&:hover": { bgcolor: "#fff" }
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      )}

      {/* CARDS CONTAINER */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 3,
          overflowX: "hidden",
          scrollBehavior: "smooth"
        }}
      >
        {options.map((item, index) => (
          <Box
            key={index}
            sx={{
              minWidth: 170,
              flexShrink: 0,
              cursor: "pointer"
            }}
          >
            <Box
              component="img"
              src={item.image}
              alt={item.title}
              sx={{
                width: "100%",
                height: 110,
                borderRadius: 1,
                objectFit: "cover",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
              }}
            />

            <Typography
              sx={{
                mt: 2,
                fontSize: "16px",
                fontWeight: 500,
                color: "#253858"
              }}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* RIGHT ARROW */}
      {showRight && (
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: 20,
            top: "55%",
            transform: "translateY(-50%)",
            bgcolor: "#fff",
            boxShadow: 3,
            zIndex: 2,
            "&:hover": { bgcolor: "#fff" }
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default ExploreOptions;