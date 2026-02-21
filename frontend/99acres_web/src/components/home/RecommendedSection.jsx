import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function PropertyCard() {
  return (
    <Card
      sx={{
        maxWidth: 320,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
        position: "relative",
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image="https://imagecdn.99acres.com/media1/35513/0/710260089M-1770541626762.jpg"
          alt="Property"
        />

        {/* Heart Icon (Top Right) */}
        <IconButton
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "rgba(0,0,0,0.4)",
            color: "#fff",
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>

        {/* Play Icon (Center) */}
        {/* <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgba(0,0,0,0.4)",
            color: "#fff",
          }}
        >
          <PlayArrowIcon />
        </IconButton> */}

        {/* Price Tag */}
        <Chip
          label="₹ 50.2 L"
          sx={{
            position: "absolute",
            bottom: 10,
            left: 10,
            bgcolor: "#fff",
            fontWeight: 600,
          }}
        />
      </Box>

      {/* Content Section */}
      <CardContent>
        <Typography variant="h6" fontWeight={600}>
          Land
        </Typography>

        <Typography variant="body2" color="text.secondary">
          In RM Green Square, Sarjapur, Bangalore
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          Posted by Dealer • 1 week ago
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PropertyCard;
