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

function App() {
  const [user, setUser] = useState(null);
  
  
  return (
    
      <Routes>
        <Route path="/" element={<MainLayout><Home user={user} setUser={setUser}/></MainLayout>} />
        {/* <Route path="/login" element={<MainLayout><Login user={user} setUser={setUser}/></MainLayout>} /> */}
        {/* <Route path="/register" element={<MainLayout><Register user={user} setUser={setUser} /></MainLayout>} /> */}
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser}/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/post-property" >
          <Route index element={<PostProperty/>}/>
          <Route element={<PrimaryDetailsLayout />}>
            <Route path="primary-details" element={<PrimaryDetails />} />
            <Route path="location" element={<LocationDetails/>}/>
            <Route path="basic-details" element={<PropertyProfile/>}/>
            <Route path="photo-details" element={<PhotoDetails/>}/>
            <Route path="other-details" element={<OtherDetails/>}/>
          </Route>
          <Route path="thank-you" element={<ThankYou/>}/>
          <Route path="property-dashboard" element={<PropertyDashboard/>}/>
          <Route path="property-preview" element={<PropertyPreview/>}/>
        </Route>
        
        
      </Routes>
    
  );
}

export default App;