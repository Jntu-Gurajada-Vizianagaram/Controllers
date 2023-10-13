import "./App.css";
import Header from "./Frontend/components/Header";
import Navbar from "./Frontend/components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin_login from "./Frontend/Authentications/Admin_login";
import Admin from "./Frontend/components/admin/Admin";
import Updates from "./Frontend/components/updates/Updates";
import DMC from "./Frontend/components/dmc/DMC";
import DMCUpload from "./Frontend/components/dmc/Upload";
import DMCTenders from "./Frontend/components/dmc/Tenders";
import HODS from "./Frontend/components/hods/HODS";
import Affliated_colleges from "./Frontend/components/affliatedColleges/Affliated_colleges";
import Forgot_password from "./Frontend/Authentications/Forgot_password";

function App() {
  return (
    <div className="App">
      <Header />

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/admin" element={<Admin_login />} />
          <Route exact path="/admin-control" element={<Admin />} />
          <Route exact path="/updates" element={<Updates />} />
          <Route exact path="/updates" element={<Updates />} />
          <Route exact path="/DMC" element={<DMC />}>
           <Route exact path="DMC-upload" element={<DMCUpload />} />
           <Route exact path="DMC-tenders" element={<DMCTenders/>} />
          </Route>
        <Route exact path="/HODS" element={<HODS />} />
        <Route
          exact
          path="/Affliated-College"
          element={<Affliated_colleges />}
        />
        <Route exact path="/passwordreset" element={<Forgot_password />} />
      </Routes>
    </BrowserRouter>
    </div >
  );
}

export default App;
