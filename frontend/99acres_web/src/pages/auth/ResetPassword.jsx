import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/home/Footer"

import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  Container
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {useLocation,useNavigate} from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const email = query.get("email");


  const isValid =
    newPassword.length >= 8 &&
    confirmPassword.length >= 8 &&
    newPassword === confirmPassword;

  const handleResetPassword = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/reset-password",
        {
          email:email,
          password: newPassword,
        }
      );

      if (res.data.success) {
        setSuccess(true);
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(()=>{
          navigate("/")
        },1000)
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 10, mb:2 }}>
        <Box
          sx={{
            border: "1px solid #ddd",
            p: 4,
            borderRadius: "4px",
            backgroundColor: "#fff",
          }}
        >
          {/* Heading */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              Create New Password
            </Typography>

            {success && (
              <CheckCircleIcon sx={{ color: "green" }} />
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Second Heading */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Typography fontWeight="bold" color="#1a1a1a">
              Your password should be 8 or more characters in Length
            </Typography>

            <Typography color="red">
              Fields marked * are mandatory
            </Typography>
          </Box>

          {/* Form Section */}
          <Box sx={{ mt: 4, ml: 4 }}>
            {/* New Password */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Typography sx={{ width: 180 }}>
                <span style={{ color: "red" }}>*</span> New Password:
              </Typography>

              <TextField
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{width:300}}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                        >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                />
            </Box>

            {/* Confirm Password */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography sx={{ width: 180 }}>
                <span style={{ color: "red" }}>*</span> Confirm Password:
              </Typography>

              <TextField
                    type={showConfirmPassword  ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{width:300}}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            onClick={() => showConfirmPassword (!showConfirmPassword )}
                            edge="end"
                            >
                            {showConfirmPassword  ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    />
            </Box>

            {/* Password mismatch message */}
            {confirmPassword && newPassword !== confirmPassword && (
              <Typography color="error" sx={{ ml: 22, mb: 2 }}>
                Passwords do not match
              </Typography>
            )}

            {/* Button */}
            <Button
              variant="contained"
              onClick={handleResetPassword}
              disabled={!isValid || loading}
              sx={{
                mt: 2,
                ml: 23,
                backgroundColor: isValid ? "#1976d2" : "#90caf9",
                "&:hover": {
                  backgroundColor: isValid ? "#1565c0" : "#90caf9",
                },
                textTransform: "none",
                fontWeight: "bold",
                px: 4,borderRadius:"4px"
              }}
            >
              Create New Password
            </Button>

            {/* Success Message */}
            {success && (
              <Typography
                sx={{ color: "green", mt: 3, ml: 22 }}
                fontWeight="bold"
              >
                Password Reset Successfully
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
      <Footer/>
    </>
  );
};

export default ResetPassword;