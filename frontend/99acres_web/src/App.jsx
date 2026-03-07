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
            <Route path="primary-details/:propertyId?" element={<PrimaryDetails />} />
            <Route path="location/:propertyId?" element={<LocationDetails/>}/>
            <Route path="basic-details/:propertyId?" element={<PropertyProfile/>}/>
            <Route path="photo-details/:propertyId?" element={<PhotoDetails/>}/>
            <Route path="other-details/:propertyId?" element={<OtherDetails/>}/>
          </Route>
          <Route path="thank-you/:propertyId" element={<ThankYou/>}/>
          <Route path="property-dashboard/:propertyId" element={<PropertyDashboard/>}/>
          <Route path="property-preview/:propertyId" element={<PropertyPreview/>}/>
          <Route path="user-property-dashboard" element={<UserPropertydashboard/>}/>
          <Route path="shortlist-property" element={<ShortlistPage/>}/>
        </Route>
        
        
      </Routes>
    
  );
}

export default App;