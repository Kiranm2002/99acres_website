import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip,
  IconButton,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const projects = [
  {
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
    title: "Jupiter Homes",
    subtitle:
      "2 BHK Apartment in Samethanahalli, Near Whitefield, Bangalore",
    price: "Price on Request",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    title: "Sowparnika Ashiyana",
    subtitle:
      "1, 2, 3 BHK Apartment | Whitefield, Bangalore",
    price: "₹ 35 L - 1 Cr",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705",
    title: "Prestige Residency",
    subtitle:
      "Luxury 2 & 3 BHK Apartments in East Bangalore",
    price: "₹ 75 L - 1.2 Cr",
  },
];

const RecommendedProjects = () => {
  return (
    <Box sx={{px:6, py: 6, backgroundColor: "#f5f5f5" }}>
      {/* <Container maxWidth="lg"> */}
        {/* Heading */}
        <Typography variant="h5" fontWeight={700}>
          Recommended Projects
        </Typography>

        <Typography sx={{ color: "#777", mb: 4 }}>
          The most searched projects in Bangalore East
        </Typography>

        {/* Cards */}
        <Grid container spacing={3}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {/* Image Section */}
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image}
                  />

                  <Chip
                    label="RERA"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      bgcolor: "#fff",
                    }}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      bgcolor: "rgba(255,255,255,0.9)",
                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>

                  <Chip
                    label="Ready To Move"
                    size="small"
                    sx={{
                      position: "absolute",
                      bottom: 12,
                      left: 12,
                      bgcolor: "#000",
                      color: "#fff",
                    }}
                  />
                </Box>

                {/* Content */}
                <CardContent>
                  <Typography fontWeight={700} mb={1}>
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "#555" }}
                  >
                    {project.subtitle}
                  </Typography>

                  <Typography
                    sx={{ mt: 2, fontWeight: 600 }}
                  >
                    {project.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      {/* </Container> */}
    </Box>
  );
};

export default RecommendedProjects;