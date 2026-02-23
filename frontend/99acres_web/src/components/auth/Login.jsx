import { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ open, handleMenuClose,user,setUser }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

 

  const handleSendOtp = async () => {
  if (!email) {
    setError("Email is required");
    return;
  }

  setLoading(true);
  setError("");

  try {
    
    const checkRes = await axios.post(
      "http://localhost:5000/check-email",
      { email }
    );

    if (!checkRes.data.exists) {
      setError("Email not registered, please register");
      setLoading(false);
      return;
    }

    
    await axios.post("http://localhost:5000/send-otp", { email });

    setStep(2);
  } catch {
    setError("Something went wrong");
  }

  setLoading(false);
};

  const handleVerifyOtp = async () => {
  if (!otp) {
    setError("Please enter OTP");
    return;
  }

  setLoading(true);
  setError("");

  try {
      const res = await axios.post("http://localhost:5000/verify-otp", {
      email,otp});
    // if (!res.data.success) {
    //   setError("OTP Verification Failed");
    //   setLoading(false);
    //   return;
    // }
    if(res.data.success){
      setSuccess(true)
      // setUser(user)
      setTimeout(() => {
        handleMenuClose();
        setUser({firstName: "Kiran",
                lastName: "M"})
        navigate("/dashboard");
        // ✅ Wait 1 sec then redirect
        setStep(1);
        setEmail("");
        setOtp("");
        setError("");
        setSuccess(false);
        
        
      }, 1000);
    }else{
      setError("Invalid OTP");
    }

      // localStorage.setItem("accessToken",res.data.accessToken)
 
    // if(res.data.type ==="register"){
    //   handleMenuClose();
    //   navigate("/register",{state:{email}})
    // }
  } catch {
    setError("OTP Verification Failed");
  }

  setLoading(false);
};

  return (
    <Dialog open={open} onClose={handleMenuClose} maxWidth="xs" fullWidth>
      <DialogContent>

        <Typography variant="h6" mb={2}>
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Login Successful </Alert>}

        {step === 1 && (
          <>
            <TextField
              fullWidth
              label="Email"
              type="email"
              sx={{ mt: 2 }}
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

        {step === 2 && (
          <>
            <TextField
              fullWidth
              label="Enter OTP"
              sx={{ mt: 2 }}
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

      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;