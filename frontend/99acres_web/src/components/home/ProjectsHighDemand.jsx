import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useRef } from "react";

import "swiper/css";
import "swiper/css/navigation";

function ProjectsHighDemand() {
  const projects = [
    {
      id: 1,
      name: "Provident Capella",
      description:
        "1, 2, 3 BHK Apartment in Whitefield, Bangalore",
      price: "₹ 54.42 L - 1.3 Cr",
      image:
        "https://images.unsplash.com/photo-1599423300746-b62533397364",
      status: "Ready To Move",
    },
    {
      id: 2,
      name: "Shriram WYT Field",
      description:
        "2 BHK Apartment in Whitefield, Bangalore",
      price: "₹ 91 L - 1.08 Cr",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      status: "Under Construction",
    },
    {
      id: 3,
      name: "Brigade Cornerstone",
      description:
        "Luxury Apartments in Sarjapur, Bangalore",
      price: "₹ 75 L - 1.5 Cr",
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
      status: "New Launch",
    },
    {
      id: 4,
      name: "Provident Capella",
      description:
        "1, 2, 3 BHK Apartment in Whitefield, Bangalore",
      price: "₹ 54.42 L - 1.3 Cr",
      image:
        "https://images.unsplash.com/photo-1599423300746-b62533397364",
      status: "Ready To Move",
    },
    {
      id: 5,
      name: "Shriram WYT Field",
      description:
        "2 BHK Apartment in Whitefield, Bangalore",
      price: "₹ 91 L - 1.08 Cr",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      status: "Under Construction",
    },
    {
      id: 6,
      name: "Brigade Cornerstone",
      description:
        "Luxury Apartments in Sarjapur, Bangalore",
      price: "₹ 75 L - 1.5 Cr",
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
      status: "New Launch",
    },
  ];

  const [isBeginning, setIsBeginning] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Box sx={{ px: 6, py: 6, backgroundColor: "#f5f5f5" }}>
      {/* Section Heading */}
      <Typography variant="h5" fontWeight={600} mb={1}>
        Projects in High Demand
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        The most explored projects in Bangalore East
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
                    alt={project.name}
                    sx={{ objectFit: "cover" }}
                  />

                  {/* RERA */}
                  <Chip
                    icon={<VerifiedIcon sx={{ fontSize: 14 }} />}
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

                  {/* Status */}
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

                  {/* Favorite */}
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
                    title={project.name}
                  >
                    {project.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    title={project.description}
                    sx={{ mt: 0.5 }}
                  >
                    {project.description}
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

export default ProjectsHighDemand;