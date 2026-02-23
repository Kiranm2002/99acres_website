import { useState } from "react";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const Register = ({ email }) => {
  const [fullName, setFullName] = useState("");
  const { loginUser } = useAuth();

  const register = async () => {
    try {
      const res = await api.post("/auth/register-after-otp", {
        email,
        fullName,
        isAgent: "no"
      });
      if (res.data.success) {
        loginUser(res.data.user, res.data.accessToken);
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;