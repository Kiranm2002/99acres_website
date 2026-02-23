import { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress,
  Box
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterModal = ({ open, handleMenuClose,user,setUser }) => {
  // const location = useLocation()
  // const email = location.state?.email
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgent, setIsAgent] = useState("no");
  const [profilePic, setProfilePic] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // STEP 1 → CHECK EMAIL + SEND OTP
  const handleCheckEmail = async () => {
    if (!email) {
      setError("Enter valid email");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/check-email",
        { email }
      );

      if (res.data.exists) {
        setError("Email already registered. Please login.");
      } else {
        await axios.post(
          "http://localhost:5000/send-otp",
          { email }
        );

        setStep(2);
        setError("");
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      setError("Something went wrong");
    }

    setLoading(false);
  };

  // STEP 2 → VERIFY OTP
  const handleVerifyOtp = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/verify-otp",
        { email, otp }
      );

      if (res.data.success) {
        setStep(3);
        setError("");
      } else {
        setError("Invalid OTP");
      }
    } catch {
      setError("OTP verification failed");
    }

    setLoading(false);
  };

  // STEP 3 → COMPLETE REGISTRATION
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
  setError("");

  try {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("isAgent", isAgent);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    const res = await axios.post(
      "http://localhost:5000/register",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        // withCredentials:true
      }
    );
    // localStorage.setItem("accessToken", res.data.accessToken);
    setSuccess(true)
   
    setTimeout(() => {
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setProfilePic(null);
        setIsAgent("no");
        setSuccess(false);
        setSuccess(false);
      handleMenuClose();
      setUser({firstName: "Kiran",
              lastName: "M"})
      navigate("/dashboard");
    }, 2000);

  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
  }

  setLoading(false);
};

  return (
    <Dialog open={open} onClose={handleMenuClose} maxWidth="xs" fullWidth>
      <DialogContent>

        <Typography variant="h6" mb={2}>
          Register
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Registered Successfully 
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <TextField
              fullWidth
              label="Email"
              sx={{ mb: 2 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleCheckEmail}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Send OTP"}
            </Button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <TextField
              fullWidth
              label="Enter OTP"
              sx={{ mb: 2 }}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
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

            {/* PROFILE UPLOAD */}
            <Box sx={{ mb: 2 }}>
              <Button variant="outlined" component="label" fullWidth>
                Upload Profile Photo
                <input
                  type="file"
                  hidden
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </Button>
              {profilePic && (
                <Typography variant="caption">
                  Selected: {profilePic.name}
                </Typography>
              )}
            </Box>

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
              {loading ? <CircularProgress size={24} /> : "Complete Registration"}
            </Button>
          </>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;