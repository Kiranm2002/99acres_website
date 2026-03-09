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
import PostProperty from "./pages/postProperty/PostProperty";
import PrimaryDetailsLayout from "./pages/postProperty/PrimaryDetailsLayout"
import PrimaryDetails from "./pages/postProperty/steps/PrimaryDetails";
import LocationDetails from "./pages/postProperty/steps/LocationDetails"
import PropertyProfile from "./pages/postProperty/steps/PropertyProfile";
import PhotoDetails from "./pages/postProperty/steps/PhotoDetails";
import OtherDetails from "./pages/postProperty/steps/OtherDetails";
import ThankYou from "./pages/postProperty/steps/ThankYou";
import PropertyDashboard from "./pages/postProperty/PropertyDashboard";
import PropertyPreview from "./pages/postProperty/PropertyPreview";
import UserPropertydashboard from "./pages/postProperty/UserPropertyDashboard"
import ShortlistPage from "./pages/postProperty/ShortlistPage";
import axiosInstance from "./utils/axiosInstance";
import EditProfile from "./pages/admin/EditProfile";

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get("/me");
        setUser(data.user);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);
  
  return (
    
      <Routes>
        <Route path="/" element={<MainLayout><Home user={user} setUser={setUser}/></MainLayout>} />
        {/* <Route path="/login" element={<MainLayout><Login user={user} setUser={setUser}/></MainLayout>} /> */}
        {/* <Route path="/register" element={<MainLayout><Register user={user} setUser={setUser} /></MainLayout>} /> */}
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser}/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/post-property"  >
          <Route index element={<PostProperty  user={user} setUser={setUser}/>}/>
          <Route element={<PrimaryDetailsLayout user={user} setUser={setUser}/>}>
            <Route path="primary-details/:propertyId?" element={<PrimaryDetails user={user} setUser={setUser}/>} />
            <Route path="location/:propertyId?" element={<LocationDetails/>}/>
            <Route path="basic-details/:propertyId?" element={<PropertyProfile/>}/>
            <Route path="photo-details/:propertyId?" element={<PhotoDetails/>}/>
            <Route path="other-details/:propertyId?" element={<OtherDetails/>}/>
          </Route>
          <Route path="thank-you/:propertyId" element={<ThankYou user={user} setUser={setUser}/>}/>
          <Route path="property-dashboard/:propertyId" element={<PropertyDashboard user={user} setUser={setUser}/>}/>
          <Route path="property-preview/:propertyId" element={<PropertyPreview/>}/>
          <Route path="user-property-dashboard" element={<UserPropertydashboard user={user} setUser={setUser}/>}/>
          <Route path="shortlist-property" element={<ShortlistPage user={user} setUser={setUser}/>}/>
        </Route>
        <Route path="my99acres/edit-profile" element={<EditProfile user={user} setUser={setUser}/>}/>
        
      </Routes>
    
  );
}

export default App;