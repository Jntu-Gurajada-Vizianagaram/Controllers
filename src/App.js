import "./App.css";
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
import FirstPage  from './Frontend/Main/Component/firstpage';
import Persons from './Frontend/Main/Component/Persons';
import Adminlogin from './Frontend/Main/Component/Logins/AdminLogin';
import Webadminlogin from './Frontend/Main/Component/Logins/WebAdminlogin';
import Updatelogin from './Frontend/Main/Component/Logins/Updateslogin';
import Hodlogin from './Frontend/Main/Component/Logins/Hodlogin';
import Collegelogin from './Frontend/Main/Component/Logins/Collegeslogin';
import Admindashboard from './Frontend/Main/Component/AdminDashbord';
import AllRequestControls from './Frontend/admin/components/AllRequestControl'
import AllCrudControls from "./Frontend/admin/components/AllCrudControl";
import WebAdminDashboard from './Frontend/Main/Component/WebAdminDashboard';
import Affliatedcollegesdashboard from './Frontend/Main/Component/AffliatedCollegesdashboard';
import Hoddashboard from './Frontend/Main/Component/Hoddashboard';
import Updatesdashboard from './Frontend/Main/Component/UpdatesDashboard';
// import Dashboard from "./Frontend/Main/Component/Dashboard";
// import { Login } from "@mui/icons-material";

function App() {
  
  
  return (
    <div className="App">
      {/* <Login />
      <Main />
      <Header/> */}
      
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<FirstPage />}/>
          <Route exact path="/profiles" element={<Persons />}/>
          {/* <Route exact path="/dashboard" element={<Dashboard />}/> */}
          <Route exact path='/Adminlogin' element={<Adminlogin />}/>
            <Route exact path='/webadminlogin' element={<Webadminlogin />}/>
            <Route exact path='/Hodlogin' element={<Hodlogin />}/>
            <Route exact path='/collegeslogin' element={<Collegelogin />}/>
            <Route exact path='/Updatelogin' element={<Updatelogin />}/>
            <Route path='/admindashboard' element={<Admindashboard />}>
            <Route index element={<AffiliatedColleges />} />
              <Route exact path="affiliated-college" element={<AffiliatedColleges />}/>
              <Route exact path="add-new-affliated-college" element={<AddCollege/>} />
              <Route path='help' element={<FacultyGrievance />} />
              <Route index element={<Admin />} />
              <Route path='admin-home' element={<Admin />} />
              <Route path='all-records' element={<AllRequestControls />} />
              <Route path='all-consoles' element={<AllCrudControls />} />
              <Route path='help' element={<FacultyGrievance />} />
            </Route>
            <Route path='/webadmindashboard' element={<WebAdminDashboard />}>
              <Route index element={<CompleteGallery />} />
              <Route path="gallery" element={<CompleteGallery />} />
              <Route exact path="dmcupload" element={<DMCUpload />} />
              <Route path='help' element={<FacultyGrievance />} />
            </Route>
            <Route path='/hoddashboard' element={<Hoddashboard />}>
              <Route index element={<HODS />} />
              <Route exact path="hods" element={<HODS />} />
              <Route path='help' element={<FacultyGrievance />} />
            </Route>
            <Route path='/Updatesdashboard' element={<Updatesdashboard />}>
              <Route index element={<Updates />} />
              <Route exact path="updates" element={<Updates />} />
              <Route path='help' element={<FacultyGrievance />} />
            </Route>
            <Route path='/affliatedcollegesdashboard' element={<Affliatedcollegesdashboard />}>
              <Route index element={<AffiliatedColleges />} />
              <Route exact path="affiliated-college" element={<AffiliatedColleges />}/>
              <Route exact path="add-new-affliated-college" element={<AddCollege/>} />
              <Route path='help' element={<FacultyGrievance />} />
            </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/results" element={<Results/>} />
          {/* <Route exact path="/admin" element={<Admin/>} /> */}
          {/* <Route exact path="/admin-control" element={<Admin />} /> */}
          {/* <Route exact path="/updates" element={<Updates />} /> */}
          {/* <Route exact path="/updates" element={<Updates />} /> */}
          {/* <Route exact path="/dmc" element={<DMC />}/> */}
          {/* <Route path="/gallery" element={<CompleteGallery />} /> */}
          {/* <Route exact path="/upload" element={<DMCUpload />} /> */}
        {/* <Route exact path="/hods" element={<HODS />} /> */}
        {/* <Route exact path="/affiliated-college" element={<AffiliatedColleges />}/> */}
        {/* <Route exact path="/add-new-affliated-college" element={<AddCollege/>} /> */}
        {/* <Route exact path="/grievances" element={<FacultyGrievance />} /> */}
        <Route exact path="/passwordreset" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
    </div >
  );
}

export default App;
