import {
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function RecommendedProperties() {
  const properties = [
    {
      id: 1,
      price: "₹ 49 L",
      title: "2 BHK Independent House",
      location: "In Whitefield, Bangalore",
      postedBy: "Owner",
      postedTime: "6 months ago",
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      id: 2,
      price: "₹ 47 L",
      title: "2 BHK Independent House",
      location: "In Whitefield, Bangalore",
      postedBy: "Dealer",
      postedTime: "4 months ago",
      imageUrl:
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
    },
    {
      id: 3,
      price: "₹ 45 L",
      title: "2 BHK Independent House",
      location: "In ITPL, Bangalore",
      postedBy: "Dealer",
      postedTime: "2 weeks ago",
      imageUrl:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    },
    {
      id: 4,
      price: "₹ 52 L",
      title: "2 BHK Independent House",
      location: "In Sarjapur, Bangalore",
      postedBy: "Dealer",
      postedTime: "1 week ago",
      imageUrl:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    },
  ];

  return (
    <Box sx={{ px: 6, py: 6, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h5" fontWeight={600} mb={1}>
        Recommended Properties
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Curated especially for you
      </Typography>

      <Grid container spacing={2}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={property.id}>
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
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={property.imageUrl}
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
                  label={property.price}
                  sx={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    bgcolor: "#fff",
                    fontWeight: 600,
                  }}
                />
              </Box>

              <CardContent>
                <Typography
                  fontWeight={600}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {property.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={0.5}
                >
                  {property.location}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Posted by {property.postedBy}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {property.postedTime}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RecommendedProperties;