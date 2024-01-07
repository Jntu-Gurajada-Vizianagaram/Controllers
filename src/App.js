import "./App.css";
import Header from "./Frontend/Main/components/Header";
import Navbar from "./Frontend/Main/components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Frontend/Authentications/components/Login";
import Main from "./Frontend/Main/components/Main"
// import { useState } from "react";
import Admin from "./Frontend/admin/components/Admin";
import Updates from "./Frontend/updates/components/Updates";
import DMC from "./Frontend/dmc/components/DMC";
import DMCUpload from "./Frontend/dmc/components/DmcIMGUpload";
import CompleteGallery from "./Frontend/dmc/components/CompleteGallery";
import HODS from "./Frontend/hods/components/HODS";
import AffiliatedColleges from "./Frontend/affliated_colleges/components/AffliatedColleges";
import AddCollege from './Frontend/affliated_colleges/components/AddCollege'
import FacultyGrievance from "./Frontend/grievances/components/FacultyGrievance";
import ForgotPassword from "./Frontend/Authentications/components/ForgotPassword";
import Results from "./Frontend/results/components/Results";
// import { Login } from "@mui/icons-material";

function App() {
  
  
  return (
    <div className="App">
      <Login />
      <Main />
      <Header/>
      
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/results" element={<Results/>} />
          <Route exact path="/admin" element={<Admin/>} />
          <Route exact path="/admin-control" element={<Admin />} />
          <Route exact path="/updates" element={<Updates />} />
          <Route exact path="/updates" element={<Updates />} />
          <Route exact path="/dmc" element={<DMC />}/>
          <Route path="/gallery" element={<CompleteGallery />} />
          <Route exact path="/upload" element={<DMCUpload />} />
        <Route exact path="/hods" element={<HODS />} />
        <Route exact path="/affiliated-college" element={<AffiliatedColleges />}/>
        <Route exact path="/add-new-affliated-college" element={<AddCollege/>} />
        <Route exact path="/grievances" element={<FacultyGrievance />} />
        <Route exact path="/passwordreset" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
    </div >
  );
}

export default App;
