import { useState } from "react";
import api from "../../utils/api";

const OtpVerification = ({ email, onVerified }) => {
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    try {
      const res = await api.post("/otp/verify", { email, otp });
      if (res.data.success) {
        onVerified(res.data.type); // "login" or "register"
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("OTP verification failed");
    }
  };

  return (
    <div>
      <h3>Enter OTP sent to {email}</h3>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify OTP</button>
    </div>
  );
};

export default OtpVerification;