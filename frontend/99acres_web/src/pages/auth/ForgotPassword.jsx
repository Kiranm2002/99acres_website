import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Paper,
} from "@mui/material";

// import SecondaryNavbar from "../../components/navbar/SecondaryNavbar"
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/home/Footer";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");   

  const sendPassResetEmail = async() => {
        try {
        setSuccessMsg("");
        setErrorMsg("");

        const res = await axios.post(
        "http://localhost:5000/password-reset-mail",
        { email }
        );

        if (res.data.success) {
        setSuccessMsg(`Email sent to ${email}`);
        }

    } catch (err) {
        if (err.response?.status === 404) {
        setErrorMsg("Email not registered");
        } else {
        setErrorMsg("Something went wrong");
        }
    }
  };

  return (
    <>
        <Navbar/>
      {/* 1️⃣ Secondary Navbar */}
      {/* <SecondaryNavbar /> */}

      {/* 2️⃣ Centered Container */}
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          px: 2,
        }}
      >
        <Paper
          elevation={1}
          sx={{
            width: "800px",
            maxWidth: "100%",
            p: 4,
          }}
        >
          {/* Heading */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2 }}
          >
            Forgot Password
          </Typography>

          {/* Divider */}
          <Divider />

          {/* 3️⃣ Sub Heading */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3, mb: 3 }}>
            <Typography
              sx={{
                mt: 3,
                mb: 3,
                fontWeight: 700,
                color: "#000000",
              }}
            >
              Enter your email or username to create a new password
            </Typography>
            {successMsg && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CheckCircleIcon sx={{ color: "green", fontSize: 20 }} />
                  <Typography
                    sx={{
                      color: "green",
                      fontWeight: 600,
                    }}
                  >
                    {successMsg}
                  </Typography>
                </Box>
              )}
          </Box>

          {/* 4️⃣ Label + Input Row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography>
              <span style={{ color: "red" }}>*</span>{" "}
              Enter Email ID or Username:
            </Typography>

            <TextField
              size="small"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "350px" }}
            />
            {errorMsg && (
            <Typography sx={{ color: "red", mt: 1 }}>
              {errorMsg}
            </Typography>
          )}
          </Box>

          {/* 5️⃣ Info Text */}
          <Typography
            sx={{
              fontSize: "14px",
              color: "#555",
              mb: 3,
            }}
          >
            On submit, an email with a link to create a password
            will be sent to your email
          </Typography>

          {/* 6️⃣ Submit Button */}
          <Button
            variant="contained"
            onClick={sendPassResetEmail}
            sx={{
              backgroundColor: "#1976d2",
              textTransform: "none",
              fontWeight: 600,
              px: 4,borderRadius:"4px",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Submit
          </Button>
        </Paper>
      </Box>

      {/* 7️⃣ Footer */}
      <Footer />
    </>
  );
};

export default ForgotPassword;