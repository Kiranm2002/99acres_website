import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Dashboard from "./pages/dashboard/Dashboard"
import { useState, useEffect } from "react";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
function App() {
  const [user, setUser] = useState(null);
  
  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");

  //   if (token) {
  //     axios
  //       .get("http://localhost:5000/me", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         setUser(res.data.user);
  //       })
  //       .catch(() => {
  //         setUser(null);
  //       });
  //   }
  // }, []);
  return (
    
      <Routes>
        <Route path="/" element={<MainLayout><Home user={user} setUser={setUser}/></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login user={user} setUser={setUser}/></MainLayout>} />
        <Route path="/register" element={<MainLayout><Register user={user} setUser={setUser} /></MainLayout>} />
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser}/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword/>}/>
      </Routes>
    
  );
}

export default App;