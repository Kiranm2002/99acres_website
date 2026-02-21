import { Box, Typography, Card, CardMedia } from "@mui/material";

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
    // {
    //   id: 4,
    //   image:
    //     "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    // },
  ];

  return (
    <Box sx={{ px: 6, py: 6, backgroundColor: "#f5f5f5" }}>
      {/* Heading */}
      <Typography variant="h5" fontWeight={600} mb={0.5}>
        99acres exclusive
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Sponsored projects and events
      </Typography>

      {/* Horizontal Scroll Section */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          overflowX: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {exclusiveProjects.map((project) => (
          <Card
            key={project.id}
            sx={{
              minWidth: 360,
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 2,
              transition: "0.3s",
              cursor: "pointer",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="240"
              image={project.image}
              alt="exclusive project"
            />
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default ExclusiveProjects;