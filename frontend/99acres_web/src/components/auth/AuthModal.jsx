import { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,FormControlLabel,Checkbox
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useNavigate} from "react-router-dom"
import { useRef } from "react";
import axios from "axios";
import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@mui/material/InputAdornment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ForgotPassword from "../../pages/auth/ForgotPassword";

const AuthModal = ({ open, handleClose }) => {
  const [step, setStep] = useState("email"); 
  const inputRefs = useRef([]);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [passwordError, setPasswordError] = useState(""); 
  
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

  const handleRegister=async () => {
            try {
              const response = await axios.post(
              "http://localhost:5000/register",
                  {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email,
                    phone: formData.phone,
                    password: formData.password,
                    agent: formData.agent,
                  }
                );
                if(response.data.success){
                  setRegisterSuccess(true)
                  setTimeout(()=>{
                    handleClose();
                    navigate("/dashboard")
                  },2000)
                  
                }
                
              } catch (error) {
                  console.error(error);
                  setRegisterError(err.response?.data?.message || "Registration failed")
                }}

    const handleUsernameContinue = async () => {
      try {
        setEmailError("")
        const res = await axios.post(
          "http://localhost:5000/check-email",
          { email:loginInput }
        );

        if (res.data.exists) {
          
          setEmail(loginInput);
          setStep("password"); // or "otp"
        }else {
      
          setEmailError("Email is not Registered");
        }
      } catch (err) {
        console.error(err);
        setEmailError("Something went wrong");
      }
};
    const handlePasswordLogin = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/login",
          {email,password}
        );

        if (res.data.success) {
          setLoginSuccess(true)
          setPasswordError("")
          setLoading(false)
          setTimeout(()=>{
            handleClose();
            navigate("/dashboard");
          },1000)
         
        }else{
          setPasswordError('Incorrect Password')
        }
      } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          setPasswordError(err.response.data.message);
          } else if (err.response && err.response.status === 401) {
            setPasswordError("Incorrect Password");
          }else{
            setPasswordError("Something went wrong")
          }
        
      }finally{
        setLoading(false)
      }
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
              onClick={() => setStep("username")}
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
              {/* 1️⃣ Top Icons */}
              {/* <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                
                <IconButton onClick={() => setStep("otp")}>
                  ←
                </IconButton>

                
                <IconButton onClick={handleClose}>
                  ✕
                </IconButton>
              </Box> */}

              {/* 2️⃣ Heading */}
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: "#1c2b39", mb: 3 }}
              >
                Create Account
              </Typography>

              {/* 3️⃣ First Name */}
              <TextField
                fullWidth
                placeholder="First Name"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              {/* Last Name */}
              <TextField
                fullWidth
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              {/* 4️⃣ Email (Read Only Initially) */}
              <TextField
                fullWidth
                value={email}
                InputProps={{
                  readOnly: !formData.editEmail,
                  endAdornment: !formData.editEmail && (
                  <InputAdornment position="end">
                    <LockIcon sx={{ color: "gray", fontSize: 20 }} />
                  </InputAdornment>
                ),
                }}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 1,
                  backgroundColor: formData.editEmail ? "#fff" : "#f2f2f2",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: formData.editEmail ? "#ccc" : "#ddd",
                    },
                  },
                 }}
              />

              <Typography
                sx={{
                  color: "#1976d2",
                  fontSize: "14px",
                  cursor: "pointer",
                  mb: 2,
                }}
                onClick={() =>
                  setFormData({ ...formData, editEmail: true })
                }
              >
                Change Email
              </Typography>

              {/* 5️⃣ Phone */}
              <TextField
                fullWidth
                placeholder="Phone Number"
                name="phone"
                value={formData.phone || ""}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              {/* Password */}
              <TextField
                fullWidth
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password || ""}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              {/* Confirm Password */}
              <TextField
                fullWidth
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                onChange={handleInputChange}
                error={
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword
                }
                helperText={
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword
                    ? "Passwords do not match"
                    : ""
                }
                sx={{ mb: 3 }}
              />

              {/* 6️⃣ Real Estate Agent Option */}
              <Typography sx={{ fontWeight: 600, mb: 1 }}>
                Are you a Real Estate Agent?
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button
                  variant={formData.agent === "yes" ? "contained" : "outlined"}
                  onClick={() =>
                    setFormData({ ...formData, agent: "yes" })
                  }
                >
                  Yes
                </Button>

                <Button
                  variant={formData.agent === "no" ? "contained" : "outlined"}
                  onClick={() =>
                    setFormData({ ...formData, agent: "no" })
                  }
                >
                  No
                </Button>
              </Box>

              {/* 7️⃣ Terms Checkbox */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <input
                  type="checkbox"
                  checked={formData.terms || false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      terms: e.target.checked,
                    })
                  }
                />
                <Typography sx={{ ml: 1, fontSize: "14px" }}>
                  I agree to the{" "}
                  <span style={{ color: "#1976d2" }}>
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span style={{ color: "#1976d2" }}>
                    Privacy Policy
                  </span>
                </Typography>
              </Box>

              {/* 8️⃣ Create Account Button */}
              <Button
                fullWidth
                variant="contained"
                disabled={
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.phone ||
                  !formData.password ||
                  formData.password !== formData.confirmPassword ||
                  !formData.agent ||
                  !formData.terms
                }
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "4px",
                  fontSize: "15px",
                  backgroundColor:
                    formData.firstName &&
                    formData.lastName &&
                    formData.phone &&
                    formData.password &&
                    formData.password === formData.confirmPassword &&
                    formData.agent &&
                    formData.terms
                      ? "#1976d2"
                      : "#90caf9",
                }}
                onClick={()=>handleRegister()}
              >
                Create Account
              </Button>
              {/* Success Message */}
              {registerSuccess && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 2,
                    gap: 1,
                  }}
                >
                  <CheckCircleIcon sx={{ color: "green" }} />
                  <Typography
                    sx={{
                      color: "green",
                      fontWeight: 500,
                      fontSize: "16px",
                    }}
                  >
                    Account Created Successfully
                  </Typography>
                </Box>
              )}
            </>
          )}

          {/* Step UserName */}
          {step === "username" && (
            <>
              {/* Top Back Arrow */}
              <IconButton
                onClick={() => setStep("email")}
                sx={{ position: "absolute", top: 12, left: 12 }}
              >
                ←
              </IconButton>

              {/* Heading */}
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mt: 4, mb: 1 }}
              >
                Login / Register
              </Typography>

              {/* Sub Text */}
              <Typography
                sx={{
                  color: "#98a2b3",
                  fontSize: "13px",
                  mb: 3,
                }}
              >
                Please enter your Email ID/Username
              </Typography>

              {/* Label */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography
                  sx={{
                    color: "#1976d2",
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Email ID/Username
                </Typography>
                {emailError && (
                  <Typography
                    sx={{
                      color: "red",
                      fontWeight: 500,
                      ml: 2,
                      fontSize: "13px",
                    }}
                  >
                    {emailError}
                  </Typography>
                )}
              </Box>

              {/* Input */}
              <TextField
                fullWidth
                placeholder="Email ID/Username"
                value={loginInput}
                onChange={(e) => {setLoginInput(e.target.value); setEmailError('')}}
                sx={{ mb: 4 }}
              />

              {/* Continue Button */}
              <Button
                fullWidth
                variant="contained"
                disabled={!loginInput}
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "4px",
                  fontSize: "15px",
                  backgroundColor: loginInput ? "#1976d2" : "#90caf9",
                  "&:hover": {
                    backgroundColor: loginInput ? "#1565c0" : "#90caf9",
                  },
                }}
                onClick={handleUsernameContinue}
              >
                Continue
              </Button>
            </>
          )}

          {step === "password" && (
            <>
              {/* Heading */}
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                Enter Password
              </Typography>

              {/* Sub text */}
              <Typography sx={{ fontSize: "14px", mb: 3 }}>
                <span style={{ color: "#98a2b3" }}>
                  Your Password for{" "}
                </span>
                <span style={{ color: "#1976d2", fontWeight: 600 }}>
                  {email}
                </span>
              </Typography>

              {/* Password Label */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography
                  sx={{
                    color: "#1976d2",
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Password
                </Typography>
                {loginSuccess && (
                    <Typography
                      sx={{
                        color: "green",
                        fontWeight: 600,
                        ml: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "14px",
                      }}
                    >
                      <CheckCircleIcon sx={{ fontSize: 18 }} />
                      Login Successfully
                    </Typography>
                  )}
              </Box>

              {/* Password Input */}
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => {setPassword(e.target.value);
                  if(password) setPasswordError("")
                }}
                sx={{ mb: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {passwordError && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "14px",
                    mb: 1,
                    textAlign: "left",
                  }}
                >
                  {passwordError}
                </Typography>
              )}

              {/* Forgot Password */}
              <Typography
                sx={{
                  textAlign: "right",
                  color: "#1976d2",
                  fontWeight: 600,
                  cursor: "pointer",
                  mb: 3,
                }}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password
              </Typography>

              {/* Whatsapp Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={whatsappUpdates}
                    onChange={(e) =>
                      setWhatsappUpdates(e.target.checked)
                    }
                  />
                }
                label={
                  <Typography>
                    Get updates via{" "}
                    <span style={{ color: "green", fontWeight: 600 }}>
                      whatsapp
                    </span>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              {/* Continue Button */}
              <Button
                fullWidth
                variant="contained"
                disabled={!password}
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "4px",
                  fontSize: "15px",
                  backgroundColor: password ? "#1976d2" : "#90caf9",
                  "&:hover": {
                    backgroundColor: password ? "#1565c0" : "#90caf9",
                  },
                }}
                onClick={handlePasswordLogin}
              >
                Login
              </Button>
            </>
          )}

      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;