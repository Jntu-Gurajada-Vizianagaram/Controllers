import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin_login from "./Authenications/Admin_login";
import Admin from "./controllers/admin/Admin";
import Updates from "./controllers/updates/Updates";
import DMC from "./controllers/DMC/DMC";
import HODS from "./controllers/hods/HODS";
import Affliated_colleges from "./controllers/affliatedColleges/Affliated_colleges";
import Forgot_password from "./Authenications/Forgot_password";

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
          <Route exact path="/DMC" element={<DMC />} />
          <Route exact path="/DMC" element={<DMC />} />
          <Route exact path="/HODS" element={<HODS />} />
          <Route
            exact
            path="/Affliated-College"
            element={<Affliated_colleges />}
          />
          <Route exact path="/passwordreset" element={<Forgot_password />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
