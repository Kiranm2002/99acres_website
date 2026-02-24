import { Box, Typography, Card, CardMedia, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";

function ExclusiveProjects() {
  const exclusiveProjects = [
    {
      id: 1,
      image:
        "https://www.ieplads.com/bmsjs/banners99/2022/Cynosure-Homez-308x198.jpg",
    },
    {
      id: 2,
      image:
        "https://static.ieplads.com/bmsjs/banners99/ds/bannerkrishna-brindavan-23dec25-st-308x198.jpg",
    },
    {
      id: 3,
      image:
        "https://www.ieplads.com/bmsjs/banners99/2022/amrutha-lake-vista-r-308x198.jpg?ver=2",
    },
  ];

  const [isBeginning, setIsBeginning] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Box sx={{ px: 6, py: 6, backgroundColor: "#f5f5f5" }}>
      {/* Heading */}
      <Typography variant="h5" fontWeight={600} mb={0.5}>
        99acres exclusive
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Sponsored projects and events
      </Typography>

      <Box sx={{ position: "relative" }}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={20}
          onSlideChange={(swiper) =>
            setIsBeginning(swiper.isBeginning)
          }
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (prevRef.current && nextRef.current) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
        >
          {exclusiveProjects.map((project) => (
            <SwiperSlide key={project.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 1,
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={project.image}
                  alt="exclusive project"
                  sx={{ objectFit: "cover" }}
                />
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev Button */}
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
            display: isBeginning ? "none" : "flex",
            zIndex: 10,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </IconButton>

        {/* Next Button */}
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
            zIndex: 10,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </IconButton>
      </Box>
    </Box>
  );
}

export default ExclusiveProjects;