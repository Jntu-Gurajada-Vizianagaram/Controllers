import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./Frontend/admin/components/Admin";
import AllCrudControls from "./Frontend/admin/components/AllCrudControl";
import Allfiles from "./Frontend/admin/components/Allfiles";
import AllRecordsControls from './Frontend/admin/components/AllRecordsControl';
import DirectorsCRUDControl from "./Frontend/admin/components/DirectorsCRUDControl";
import AddCollege from './Frontend/affliated_colleges/components/AddCollege';
import AffiliatedColleges from "./Frontend/affliated_colleges/components/AffliatedColleges";
import ForgotPassword from "./Frontend/Authentications/components/ForgotPassword";
import Login from "./Frontend/Authentications/components/Login";
import ProtectedRoute from "./Frontend/Authentications/components/ProtectedRoute";
import AuthorizedRoute from "./Frontend/Authentications/components/AuthorizedRoute";
import RoleHomeRedirect from "./Frontend/Authentications/components/RoleHomeRedirect";
import CarouselDisplay from './Frontend/dmc/components/CarouselDisplay';
import CompleteGallery from "./Frontend/dmc/components/CompleteGallery";
import DMCUpload from "./Frontend/dmc/components/DmcIMGUpload";
import EventPhotosUpload from './Frontend/dmc/components/EventPhotosUpload';
import GalleryImagesUpload from "./Frontend/dmc/components/GalleryImagesUpload";
import FacultyGrievance from "./Frontend/grievances/components/FacultyGrievance";
import HODS from "./Frontend/hods/components/HODS";
import Dashboard from "./Frontend/Main/Component/Dashboard";
import FirstPage from './Frontend/Main/Component/firstpage';
import Profile from "./Frontend/Main/Component/Profile";
import RestricetedPage from './Frontend/Main/Component/RestricetedPage';
// import Header from "./Frontend/Main/components/Header";
import Updates from "./Frontend/updates/components/Updates";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passwordreset" element={<ForgotPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/restrictedaccess" element={<RestricetedPage />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<RoleHomeRedirect />} />
              <Route path="profile" element={<AuthorizedRoute page="profile"><Profile /></AuthorizedRoute>} />
              <Route path="admin-home" element={<AuthorizedRoute page="admin-home"><Admin /></AuthorizedRoute>} />
              <Route path="directors" element={<AuthorizedRoute page="directors"><DirectorsCRUDControl /></AuthorizedRoute>} />
              <Route path="all-consoles" element={<AuthorizedRoute page="all-consoles"><AllCrudControls /></AuthorizedRoute>} />
              <Route path="all-records" element={<AuthorizedRoute page="all-records"><AllRecordsControls /></AuthorizedRoute>} />
              <Route path="all-stored-files" element={<AuthorizedRoute page="all-stored-files"><Allfiles /></AuthorizedRoute>} />
              <Route path="help" element={<AuthorizedRoute page="help"><FacultyGrievance /></AuthorizedRoute>} />
              <Route path="affiliated-college" element={<AuthorizedRoute page="affiliated-college"><AffiliatedColleges /></AuthorizedRoute>} />
              <Route path="add-new-affliated-college" element={<AuthorizedRoute page="add-new-affliated-college"><AddCollege /></AuthorizedRoute>} />
              <Route path="gallery" element={<AuthorizedRoute page="gallery"><CompleteGallery /></AuthorizedRoute>} />
              <Route path="dmcupload" element={<AuthorizedRoute page="dmcupload"><DMCUpload /></AuthorizedRoute>} />
              <Route path="eventphotosupload" element={<AuthorizedRoute page="eventphotosupload"><EventPhotosUpload /></AuthorizedRoute>} />
              <Route path="carousel" element={<AuthorizedRoute page="carousel"><CarouselDisplay /></AuthorizedRoute>} />
              <Route path="galleryimagesupload" element={<AuthorizedRoute page="galleryimagesupload"><GalleryImagesUpload /></AuthorizedRoute>} />
              <Route path="updates" element={<AuthorizedRoute page="updates"><Updates /></AuthorizedRoute>} />
              <Route path="hods" element={<AuthorizedRoute page="hods"><HODS /></AuthorizedRoute>} />
              <Route path="*" element={<Navigate to="/restrictedaccess" replace />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
