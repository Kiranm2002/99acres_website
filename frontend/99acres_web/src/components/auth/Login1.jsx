// import { useState } from "react";
// import api from "../../utils/api";
// import OtpVerification from ".OtpVerification";
// import { useAuth } from "../../context/AuthContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpType, setOtpType] = useState(null);
//   const { loginUser } = useAuth();

//   const sendOtp = async () => {
//     try {
//       const res = await api.post("/otp/send", { email });
//       if (res.data.success) {
//         setOtpSent(true);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send OTP");
//     }
//   };

//   const handleOtpVerified = async (type) => {
//     setOtpType(type);

//     if (type === "login") {
//       try {
//         const res = await api.post("/auth/login-after-otp", { email });
//         if (res.data.success) {
//           loginUser(res.data.user, res.data.accessToken);
//         }
//       } catch (err) {
//         console.error(err);
//         alert("Login failed");
//       }
//     }
//   };

//   if (otpSent) {
//     return (
//       <OtpVerification
//         email={email}
//         onVerified={handleOtpVerified}
//       />
//     );
//   }

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="email"
//         placeholder="Enter Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={sendOtp}>Send OTP</button>
//     </div>
//   );
// };

// export default Login;