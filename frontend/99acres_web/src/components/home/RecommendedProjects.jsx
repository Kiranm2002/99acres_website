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

const projects = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
    title: "Jupiter Homes",
    location:
      "2 BHK Apartment in Samethanahalli, Near Whitefield, Bangalore",
    price: "Price on Request",
    status: "Ready To Move",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    title: "Sowparnika Ashiyana",
    location:
      "1, 2, 3 BHK Apartment | Whitefield, Bangalore",
    price: "₹ 35 L - 1 Cr",
    status: "Under Construction",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705",
    title: "Prestige Residency",
    location:
      "Luxury 2 & 3 BHK Apartments in East Bangalore",
    price: "₹ 75 L - 1.2 Cr",
    status: "New Launch",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    title: "Sowparnika Ashiyana",
    location:
      "1, 2, 3 BHK Apartment | Whitefield, Bangalore",
    price: "₹ 35 L - 1 Cr",
    status: "Under Construction",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
    title: "Jupiter Homes",
    location:
      "2 BHK Apartment in Samethanahalli, Near Whitefield, Bangalore",
    price: "Price on Request",
    status: "Ready To Move",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705",
    title: "Prestige Residency",
    location:
      "Luxury 2 & 3 BHK Apartments in East Bangalore",
    price: "₹ 75 L - 1.2 Cr",
    status: "New Launch",
  },
];

function RecommendedProjects() {
  const [isBeginning, setIsBeginning] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Box sx={{ px: 6, py: 6, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h5" fontWeight={600} mb={1}>
        Recommended Projects
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        The most searched projects in Bangalore East
      </Typography>

      <Box sx={{ position: "relative" }}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={16}
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
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <Card
                sx={{
                  borderRadius: 1,
                  boxShadow: 1,
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {/* Image */}
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={project.image}
                    alt={project.title}
                    sx={{ objectFit: "cover" }}
                  />

                  <Chip
                    label="RERA"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      bgcolor: "#fff",
                      fontWeight: 600,
                    }}
                  />

                  <Chip
                    label={project.status}
                    size="small"
                    sx={{
                      position: "absolute",
                      bottom: 12,
                      left: 12,
                      bgcolor: "#000",
                      color: "#fff",
                      fontSize: "0.75rem",
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
                    }}
                  >
                    <FavoriteBorderIcon fontSize="small" />
                  </IconButton>
                </Box>

                {/* Content */}
                <CardContent sx={{ py: 1.5, px: 2 }}>
                  <Typography
                    fontWeight={700}
                    noWrap
                    title={project.title}
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    title={project.location}
                    sx={{ mt: 0.5 }}
                  >
                    {project.location}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    {project.price}
                  </Typography>
                </CardContent>
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

export default RecommendedProjects;