import { Grid, Box, Typography, Paper, Button } from "@mui/material";
import PropertyCard from "./RecommendedProperties";

function PropertyList() {
  const properties = [
    { id: 1, price: "₹ 49 L", title: "2 BHK Independent House", location: "Whitefield, Bangalore", posted: "6 months ago", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    { id: 2, price: "₹ 47 L", title: "2 BHK Independent House", location: "Whitefield, Bangalore", posted: "4 months ago", imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c" },
    { id: 3, price: "₹ 45 L", title: "2 BHK Independent House", location: "ITPL, Bangalore", posted: "2 weeks ago", imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
    { id: 4, price: "₹ 45 L", title: "2 BHK Independent House", location: "Varthur, Bangalore", posted: "1 week ago", imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae" },
  ];

  return (
    <Box sx={{ px: 6, py: 6, backgroundColor: "#f5f5f5" }}>
      <Grid container spacing={4}>

        {/* LEFT SIDE */}
        <Grid item xs={12} md={9}>
          <Typography variant="h5" fontWeight={600} mb={1}>
            Recommended Properties
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Curated especially for you
          </Typography>

          <Grid container spacing={2}>
            {properties.map((property) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={property.id}>
                <PropertyCard {...property} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* RIGHT SIDE - GUEST USER */}
        {/* <Grid item xs={12} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Guest User
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={2}>
              Your Recent Activity
            </Typography>

            <Typography variant="body2" mt={1}>
              No activity yet! Start browsing properties and track them from here.
            </Typography>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3, borderRadius: 2 }}
            >
              LOGIN / REGISTER
            </Button>
          </Paper>
        </Grid> */}

      </Grid>
    </Box>
  );
}

export default PropertyList;