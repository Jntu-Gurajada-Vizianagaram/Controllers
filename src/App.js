import "./App.css";
import Header from "./Frontend/components/Header";
import Navbar from "./Frontend/components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./Frontend/Authentications/Admin_login";
import Admin from "./Frontend/components/admin/Admin";
import Updates from "./Frontend/components/updates/Updates";
import DMC from "./Frontend/components/dmc/DMC";
import DMCUpload from "./Frontend/components/dmc/Upload";
import DMCTenders from "./Frontend/components/dmc/Tenders";
import HODS from "./Frontend/components/hods/HODS";
import AffiliatedColleges from "./Frontend/components/affliatedColleges/Affliated_colleges";
import AddCollege from './Frontend/components/affliatedColleges/AddCollege'
import FacultyGrievance from "./Frontend/components/grievances/FacultyGrievance";
import ForgotPassword from "./Frontend/Authentications/Forgot_password";
import Results from "./Frontend/components/results/Results";

function App() {
  
  return (
    <div className="App">
      <Header />
      
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<AdminLogin />} />
          <Route exact path="/results" element={<Results/>} />
          <Route exact path="/admin" element={<Admin/>} />
          <Route exact path="/admin-control" element={<Admin />} />
          <Route exact path="/updates" element={<Updates />} />
          <Route exact path="/updates" element={<Updates />} />
          <Route exact path="/dmc" element={<DMC />}>
           <Route exact path="dmc-upload" element={<DMCUpload />} />
           <Route exact path="dmc-tenders" element={<DMCTenders/>} />
          </Route>
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
