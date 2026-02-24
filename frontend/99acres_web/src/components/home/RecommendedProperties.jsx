import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useRef } from "react";

import "swiper/css";
import "swiper/css/navigation";

function RecommendedProperties() {
  const properties = [
    {
      id: 1,
      price: "₹ 75 L",
      title: "2 BHK Independent House",
      location: "In Prasanth Layout, Whitefield",
      postedBy: "Owner",
      postedTime: "5 months ago",
      imageUrl:
        "https://imagecdn.99acres.com/media1/32178/3/643563539M-1767110068657.jpg",
    },
    {
      id: 2,
      price: "₹ 45 L",
      title: "2 BHK Independent House",
      location: "In Kadugodi, Bangalore",
      postedBy: "Dealer",
      postedTime: "2 weeks ago",
      imageUrl:
        "https://imagecdn.99acres.com/media1/35801/17/716037765M-1771615265722.jpg",
    },
    {
      id: 3,
      price: "₹ 49 L",
      title: "2 BHK Independent House",
      location: "In Whitefield, Bangalore",
      postedBy: "Dealer",
      postedTime: "6 months ago",
      imageUrl:
        "https://imagecdn.99acres.com/media1/31830/2/636602387M-1767200280299.jpg",
    },
    {
      id: 4,
      price: "₹ 49 L",
      title: "2 BHK Independent House",
      location: "In Whitefield, Bangalore",
      postedBy: "Owner",
      postedTime: "1 week ago",
      imageUrl:
        "https://imagecdn.99acres.com/media1/31908/15/638175077M-1767175743111.jpg",
    },
    {
      id: 5,
      price: "₹ 55 L",
      title: "3 BHK Apartment",
      location: "In Marathahalli, Bangalore",
      postedBy: "Owner",
      postedTime: "3 months ago",
      imageUrl:
        "https://imagecdn.99acres.com/media1/33193/8/663868847M-1766789528883.jpg",
    },
    {
      id: 6,
      price: "₹ 60 L",
      title: "3 BHK Villa",
      location: "In Whitefield, Bangalore",
      postedBy: "Dealer",
      postedTime: "2 months ago",
      imageUrl:
        "https://imagecdn.99acres.com/media1/35801/17/716037813M-1771615293272.jpg",
    },
  ];

  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const onSwiperInit = (swiper) => {
    setSwiperInstance(swiper);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const onSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <Box sx={{ px: 6, py: 6, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h5" fontWeight={600} mb={1}>
        Recommended Properties
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Curated especially for you
      </Typography>

      <Box sx={{  position:"relative", ml:0 }}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={16}
          slidesPerGroup={1}
          onSwiper={onSwiperInit}
          onSlideChange={onSlideChange}
          
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (prevRef.current && nextRef.current){
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
            
          }}
          loop={false}
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id}>
              <Card
                sx={{
                  borderRadius: 1,
                  boxShadow: 1,
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={property.imageUrl}
                    alt={property.title}
                    sx={{ objectFit: "cover", width: "100%" }}
                  />
                  <Chip
                    label={property.price}
                    sx={{
                      position: "absolute",
                      bottom: 12,
                      left: 12,
                      bgcolor: "#fff",
                      color: "#000",
                      fontWeight: "700",
                      borderRadius: "4px",
                      px: 0.2,
                      fontSize: "0.875rem",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      // maxWidth:90,
                      // whiteSpace:"nowrap",
                      // textOverflow:"ellipsis",
                      // overflow:"hidden"
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      bgcolor: "#fff",
                      width: 32,
                      height: 32,
                      "&:hover": { bgcolor: "#f0f0f0" },
                    }}
                    aria-label="favorite"
                  >
                    <FavoriteBorderIcon fontSize="small" />
                  </IconButton>
                </Box>

                <CardContent sx={{ py: 1.5, px: 2 }}>
                  <Typography
                    fontWeight={700}
                    noWrap
                    sx={{ fontSize: "1rem" }}
                    title={property.title}
                  >
                    {property.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                    noWrap
                    title={property.location}
                  >
                    {property.location}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                      fontSize: "0.75rem",
                      color: "text.secondary",
                    }}
                  >
                    <Typography noWrap>
                      Posted by {property.postedBy}
                    </Typography>
                    <Typography noWrap>{property.postedTime}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        {/* Prev button */}
        <IconButton
          ref={prevRef}
          sx={{
            position: "absolute",
            top: "50%",
            left: -17,
            transform: "translateY(-50%)",
            width: 32,
            height: 32,
            bgcolor: "#fff",
            boxShadow: 3,
            borderRadius: "50%",
            display: isBeginning ? "none" : "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
          }}
          aria-label="Previous"
        >
          {/* You can use any icon here, e.g. ArrowBackIosNewIcon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
        </IconButton>

        {/* Next button */}
        <IconButton
          ref={nextRef}
          sx={{
            position: "absolute",
            top: "50%",
            right: -17,
            transform: "translateY(-50%)",
            width: 32,
            height: 32,
            bgcolor: "#fff",
            boxShadow: 3,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
          }}
          aria-label="Next"
        >
          {/* Right arrow icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </svg>
        </IconButton>
      </Box>
    </Box>
  );
}

export default RecommendedProperties;