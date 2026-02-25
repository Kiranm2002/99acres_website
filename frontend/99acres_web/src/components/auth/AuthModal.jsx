import { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";
import axios from "axios"

const AuthModal = ({ open, handleClose }) => {
  const [step, setStep] = useState("email"); 
  const inputRefs = useRef([]);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  
  // steps: email | otp | register

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });

  const handleContinue = async() => {
    if (!email) return;

    try {
    setLoading(true);
    setEmailError("");

    //  Check if email exists
    const checkRes = await axios.post(
      "http://localhost:5000/check-email",
      { email }
    );
    if (checkRes.data.exists) {
      setEmailError("Email already registered please login");
      setLoading(false);
      return;
    }

    //  Send OTP
    await axios.post(
      "http://localhost:5000/send-otp",
      { email }
    );

    setStep("otp");
  }catch(error){
    console.error(error);
    setEmailError("Something went wrong. Try again.");
  }finally{
    setLoading(false)
  }
};

  const handleVerifyOtp = async () => {
  if (otp.length !== 4) return;

  try {
    setOtpLoading(true);
    setOtpError("");

    const res = await axios.post(
      "http://localhost:5000/verify-otp",
      {
        email,
        otp,
      }
    );

    if (res.data.success) {
      setStep("register");
    } else {
      setOtpError("Invalid OTP");
    }

  } catch (error) {
    setOtpError("Invalid OTP");
  } finally {
    setOtpLoading(false);
  }
};
  const resendOtp = async()=>{
    try {
      await axios.post(
        "http://localhost:5000/send-otp",
        { email }
      );
    } catch (error) {
      console.error("Resend OTP failed");
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth >
      <DialogContent sx={{ p: 4, position: "relative" }}>

        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 10, top: 10 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Step 1 - Email */}
        {step === "email" && (
          <>
            <Typography variant="h5" fontWeight="bold" mb={1}>
              Login / Register
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Please enter your Email ID
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography variant="subtitle2" mb={1}>
                Email ID
              </Typography>
              {emailError && (
                <Typography
                  variant="caption"
                  sx={{ color: "red", fontWeight: 500 }}
                >
                  {emailError}
                </Typography>
              )}
            </Box>

            <TextField
              fullWidth
              placeholder="Enter your email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 , }}
            />

            <Button
              fullWidth
              variant="contained"
              // disabled={!email}
              sx={{
                py: 1.5,
                textTransform: "none",
                fontWeight: "bold",
                mb: 2,borderRadius:"4px",
                fontSize:"15px",color: "#fff",
                backgroundColor: email ? "#1976d2" : "#2f6999",
                pointerEvents:email? "auto":"none",
                opacity: email ? 1 : 0.6,  
                "&:hover": {
                  backgroundColor: email ? "#115293" : "#90caf9",}
              }}
              onClick={handleContinue}
            >
              Continue
            </Button>

            <Typography align="center" mb={2}>
              Or
            </Typography>

            <Button
              fullWidth
              variant="outlined"
              sx={{ textTransform: "none", fontWeight: "bold",
                borderRadius:"4px", color:"#000" ,
                height:50,fontSize:"15px"
              }}
            >
              Already have an account? Click here
            </Button>

            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mt={1}
            >
              By clicking you agree to Terms and Conditions
            </Typography>
          </>
        )}

       {/* Step 2 - OTP */}
          {step === "otp" && (
            <>
              {/* 1. Heading */}
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: "#1c2b39", mb: 2 }}
              >
                Verify your email
              </Typography>

              {/* 2. Masked Email + Edit Icon */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <Typography sx={{ fontWeight: 600 }}>
                  {email.slice(0, 3)}
                  {"*".repeat(email.indexOf("@") - 3)}
                  {email.slice(email.indexOf("@"))}
                </Typography>

                <IconButton
                  size="small"
                  sx={{ ml: 1 }}
                  onClick={() => setStep("email")}
                >
                  ✏️
                </IconButton>
              </Box>

              {/* 3. OTP sent text */}
              <Typography
                variant="body2"
                sx={{ color: "#7a869a", fontSize: "13px", mb: 3 }}
              >
                OTP sent to your email ID
              </Typography>

              {/* 4. Enter 4 digit OTP heading */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Typography sx={{ fontWeight: 600, mb: 1 }}>
                  Enter your 4 digit OTP
                </Typography>

                {otpError && (
                  <Typography
                    variant="caption"
                    sx={{ color: "red", fontWeight: 500 }}
                  >
                    {otpError}
                  </Typography>
                )}
              </Box>

              {/* 5. 4 OTP Boxes */}
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                {[0, 1, 2, 3].map((index) => (
                  <TextField
                    key={index}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center", fontSize: "18px" },
                    }}
                    value={otp[index] || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      if (!value) return;
                      let newOtp = otp.split("");
                      newOtp[index] = value;
                      setOtp(newOtp.join(""));
                      if(index<3){
                        inputRefs.current[index+1]?.focus()
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otp[index] && index > 0) {
                        inputRefs.current[index - 1]?.focus();
                      }
                    }}
                    sx={{
                      width: "55px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#d0d5dd",
                        },
                        "&:hover fieldset": {
                          borderColor: "#98a2b3",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1976d2",
                        },
                      },
                    }}
                  />
                ))}
              </Box>

              {/* 6. Resend Text */}
              <Typography
                variant="body2"
                sx={{ color: "#7a869a", fontSize: "13px", mb: 3 }}
              >
                Haven't received yet?{" "}
                <Box
                  component="span"
                  sx={{
                    color: "#1976d2",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={()=>resendOtp()}
                >
                  RESEND OTP
                </Box>
              </Typography>

              {/* 7. Verify & Continue Button */}
              <Button
                fullWidth
                variant="contained"
                disabled={otp.length !== 4 || otpLoading}
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                  mb: 2,
                  borderRadius:"4px",fontSize:"15px",
                  backgroundColor: otp.length === 4 ? "#1976d2" : "#90caf9",
                  "&:hover": {
                    backgroundColor: otp.length === 4 ? "#1565c0" : "#90caf9",
                  },
                }}
                onClick={handleVerifyOtp}
              >
                Verify & Continue
              </Button>

              {/* 8. Verify via Email Link */}
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,borderRadius:"4px",
                  height:"50px", fontSize:"15px"
                }}
              >
                Or, Verify via Email Link
              </Button>
            </>
          )}

        {/* Step 3 - Register */}
        {step === "register" && (
          <>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Complete Registration
            </Typography>

            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ py: 1.5, textTransform: "none", fontWeight: "bold" }}
              // onClick={handleRegister}
            >
              Register
            </Button>
          </>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;