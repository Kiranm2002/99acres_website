import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedIcon from "@mui/icons-material/Verified";

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
    },
    {
      id: 2,
      name: "Shriram WYT Field",
      description:
        "2 BHK Apartment in Whitefield, Bangalore",
      price: "₹ 91 L - 1.08 Cr",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      id: 3,
      name: "Brigade Cornerstone",
      description:
        "Luxury Apartments in Sarjapur, Bangalore",
      price: "₹ 75 L - 1.5 Cr",
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    },
  ];

  return (
    <Box sx={{ px: 6, py: 6, backgroundColor: "#f5f5f5" }}>
      {/* Section Heading */}
      <Typography variant="h5" fontWeight={600} mb={1}>
        Projects in High Demand
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={4}>
        The most explored projects in Bangalore East
      </Typography>

      {/* Cards Grid */}
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              sx={{
                borderRadius: 3,
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
                  height="220"
                  image={project.image}
                />

                {/* RERA Badge */}
                <Chip
                  icon={<VerifiedIcon sx={{ fontSize: 16 }} />}
                  label="RERA"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "#fff",
                  }}
                />

                {/* Favorite Icon */}
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

                {/* Ready To Move Tag */}
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

              {/* Content Section */}
              <CardContent>
                <Typography fontWeight={600}>
                  {project.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={0.5}
                >
                  {project.description}
                </Typography>

                <Typography fontWeight={600} mt={2}>
                  {project.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProjectsHighDemand;