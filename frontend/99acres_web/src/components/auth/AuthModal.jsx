import { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress
} from "@mui/material";
import axios from "axios";

const AuthModal = ({ open, handleClose }) => {
  const [step, setStep] = useState(1);

  // STEP 1 & 2
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // STEP 3: Registration
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [isAgent, setIsAgent] = useState("no");

  // UI states
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --------------------------
  // STEP 1: Send OTP to Email
  // --------------------------
  const handleSendOtp = async () => {
    if (!email) {
      setError("Enter a valid email");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/send-otp", { email });
      setStep(2);
      setError("");
    } catch (err) {
      setError("Failed to send OTP. Try again.");
    }
    setLoading(false);
  };

  // --------------------------
  // STEP 2: Verify OTP
  // --------------------------
  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Enter OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp,
      });

      if (res.data.success) {
        setStep(3);
        setError("");
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      setError("Failed to verify OTP");
    }
    setLoading(false);
  };

  // --------------------------
  // STEP 3: Complete Registration
  // --------------------------
  const handleRegister = async () => {
    if (!fullName || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Prepare FormData for profilePic upload
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePic) formData.append("profilePic", profilePic);
      formData.append("isAgent", isAgent);

      const res = await axios.post(
        "http://localhost:5000/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        setSuccess(true);
        setError("");

        // Reset form and close modal after 2s
        setTimeout(() => {
          handleClose();
          setStep(1);
          setSuccess(false);
          setEmail("");
          setOtp("");
          setFullName("");
          setPassword("");
          setConfirmPassword("");
          setProfilePic(null);
          setIsAgent("no");
        }, 2000);
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogContent>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Registered Successfully 🎉
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* STEP 1: EMAIL */}
        {step === 1 && (
          <>
            <Typography variant="h6" mb={2}>
              Enter Your Email
            </Typography>

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Send OTP"}
            </Button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <Typography variant="h6" mb={2}>
              Enter OTP sent to {email}
            </Typography>

            <TextField
              fullWidth
              label="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
          </>
        )}

        {/* STEP 3: Registration */}
        {step === 3 && (
          <>
            <Typography variant="h6" mb={2}>
              Complete Registration
            </Typography>

            <TextField
              fullWidth
              label="Full Name"
              sx={{ mb: 2 }}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              sx={{ mb: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              sx={{ mb: 2 }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Profile Picture
              <input
                type="file"
                hidden
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </Button>

            <Typography mb={1}>Are you a Real Estate Agent?</Typography>

            <RadioGroup
              row
              value={isAgent}
              onChange={(e) => setIsAgent(e.target.value)}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Continue"}
            </Button>
          </>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;