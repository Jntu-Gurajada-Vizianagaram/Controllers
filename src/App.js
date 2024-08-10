import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Frontend/Authentications/components/Login";
// import { useState } from "react";
import Admin from "./Frontend/admin/components/Admin";
import AllCrudControls from "./Frontend/admin/components/AllCrudControl";
import Allfiles from "./Frontend/admin/components/Allfiles";
import AllRecordsControls from './Frontend/admin/components/AllRecordsControl';
import GalleryImagesUpload from './Frontend/admin/components/requests/GalleryImagesRequests';
import AddCollege from './Frontend/affliated_colleges/components/AddCollege';
import AffiliatedColleges from "./Frontend/affliated_colleges/components/AffliatedColleges";
import ForgotPassword from "./Frontend/Authentications/components/ForgotPassword";
import CarouselDisplay from './Frontend/dmc/components/CarouselDisplay';
import CompleteGallery from "./Frontend/dmc/components/CompleteGallery";
import DMCUpload from "./Frontend/dmc/components/DmcIMGUpload";
import EventPhotosUpload from './Frontend/dmc/components/EventPhotosUpload';
import FacultyGrievance from "./Frontend/grievances/components/FacultyGrievance";
import HODS from "./Frontend/hods/components/HODS";
import Dashboard from "./Frontend/Main/Component/Dashboard";
import DashboardHome from "./Frontend/Main/Component/DashboardHome";
import FirstPage from './Frontend/Main/Component/firstpage';
import Persons from './Frontend/Main/Component/Persons';
import Profile from "./Frontend/Main/Component/Profile";
import RestricetedPage from './Frontend/Main/Component/RestricetedPage';
import Updates from "./Frontend/updates/components/Updates";
// import { Login } from "@mui/icons-material";
// require('dotenv').config()

function App() {
  
  
  return (
    <div className="App">
      {/* <Login />
      <Main /> */}
    {/* <Header/>  */}
      
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<FirstPage />}/>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profiles" element={<Persons />}/>
          <Route exact path="/restrictedaccess" element= {<RestricetedPage/>}/>
          <Route exact path="/dashboard/:adminrole/:page" element={<Dashboard />}>
            <Route index element={<DashboardHome/>} />
            <Route exact path="profile" element={<Profile />}/>
            {/* Admin Routes */}
            <Route path='admin-home' element={<Admin />}/>
            <Route path='all-consoles' element={<AllCrudControls />} />
            <Route path='all-records' element={<AllRecordsControls />} />
            <Route path='all-stored-files' element={<Allfiles />} />
            <Route path='help' element={<FacultyGrievance />} />
            {/* Affiliated College Routes */}
            <Route exact path="affiliated-college" element={<AffiliatedColleges />}/>
            <Route exact path="add-new-affliated-college" element={<AddCollege/>} />
            {/* Web Admin Routes */}
            <Route path="gallery" element={<CompleteGallery />} />
            <Route exact path="dmcupload" element={<DMCUpload />} />
            <Route exact path="eventphotosupload" element={<EventPhotosUpload />} />
            <Route exact path="carousel" element={<CarouselDisplay />} />
            <Route exact path="galleryImagesUpload" element={<GalleryImagesUpload/>}></Route>
            {/* Updates Panel Routes */}
            <Route exact path="updates" element={<Updates />} />
            {/* Directors Panel Routes */}
            <Route exact path="hods" element={<HODS />} />
          </Route>
            {/* <Route exact path='/Hodlogin' element={<Hodlogin />}/>
            <Route exact path='/collegeslogin' element={<Collegelogin />}/>
            <Route exact path='/Updatelogin' element={<Updatelogin />}/>
            <Route index element={<Admin />} />
              <Route path='help' element={<FacultyGrievance />} />
              <Route index element={<Admin />} />
              <Route path='admin-home' element={<Admin />} />
              <Route path='help' element={<FacultyGrievance />} />
            </Route> */}
            {/* <Route path='/webadmindashboard' element={<WebAdminDashboard />}>
            </Route> */}
            {/* <Route path='/hoddashboard' element={<Hoddashboard />}>
              <Route index element={<HODS />} />
              <Route exact path="hods" element={<HODS />} />
              <Route path='help' element={<FacultyGrievance />} />
            </Route>
            <Route path='/Updatesdashboard' element={<Updatesdashboard />}>
              <Route index element={<Updates />} />
              <Route path='help' element={<FacultyGrievance />} />
            </Route>
            <Route path='/affliatedcollegesdashboard' element={<Affliatedcollegesdashboard />}>
              <Route index element={<AffiliatedColleges />} />
              <Route exact path="affiliated-college" element={<AffiliatedColleges />}/>
              <Route exact path="add-new-affliated-college" element={<AddCollege/>} />
              <Route path='help' element={<FacultyGrievance />} />
            </Route>
          <Route exact path="/results" element={<Results/>} /> */}
          {/* <Route exact path="/admin" element={<Admin/>} /> */}
          {/* <Route exact path="/admin-control" element={<Admin />} /> */}
          {/* <Route exact path="/updates" element={<Updates />} /> */}
          {/* <Route exact path="/updates" element={<Updates />} /> */}
          {/* <Route exact path="/dmc" element={<DMC />}/> */}
          {/* <Route path="/gallery" element={<CompleteGallery />} /> */}
          {/* <Route exact path="/upload" element={<DMCUpload />} /> */}
        {/* <Route exact path="/affiliated-college" element={<AffiliatedColleges />}/> */}
        {/* <Route exact path="/add-new-affliated-college" element={<AddCollege/>} /> */}
        {/* <Route exact path="/grievances" element={<FacultyGrievance />} /> */}
        <Route exact path="/passwordreset" element={<ForgotPassword />} />
        <Route exact path="/*" element={<RestricetedPage />} />
      </Routes>
    </BrowserRouter>
    </div >
  );
}

export default App;
