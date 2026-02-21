import { Grid } from "@mui/material";
import PropertyCard from "./RecommendedSection"; // the card component from before

function PropertyList() {
  // Example data (you can replace with your real data)
  const properties = [
    { id: 1, price: "₹ 50.2 L", title: "Land", location: "RM Green Square, Sarjapur", posted: "1 week ago", imageUrl: "https://images.unsplash.com/photo-1507089947367-19c1da9775ae" },
    { id: 2, price: "₹ 51 L", title: "Land", location: "RM Green Square, Sarjapur", posted: "1 week ago", imageUrl: "https://images.unsplash.com/photo-1507089947367-19c1da9775ae" },
    { id: 3, price: "₹ 57.54 L", title: "Land", location: "Sarjapur, Bangalore", posted: "3 days ago", imageUrl: "https://images.unsplash.com/photo-1507089947367-19c1da9775ae" },
    { id: 4, price: "₹ 57.54 L", title: "Land", location: "Sarjapur, Bangalore", posted: "3 days ago", imageUrl: "https://images.unsplash.com/photo-1507089947367-19c1da9775ae" },
    // add more objects here
  ];

  return (
    <Grid container spacing={3}>
      {properties.map((property) => (
        <Grid item xs={12} sm={6} md={4} key={property.id}>
          <PropertyCard
            price={property.price}
            title={property.title}
            location={property.location}
            posted={property.posted}
            imageUrl={property.imageUrl}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default PropertyList;
