import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

const SecondaryNavbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#ffffff",
        color: "#000",
      }}
      elevation={2}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" fontWeight={700}>
            99acres
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default SecondaryNavbar;
