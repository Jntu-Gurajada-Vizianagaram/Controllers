

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./Frontend/admin/components/Admin";
import AllCrudControls from "./Frontend/admin/components/AllCrudControl";
import AllRecordsControls from './Frontend/admin/components/AllRecordsControl.jsx';
import DirectorsCRUDControl from "./Frontend/admin/components/DirectorsCRUDControl";
import ForgotPassword from "./Frontend/Authentications/components/ForgotPassword";
import Login from "./Frontend/Authentications/components/Login";
import ProtectedRoute from "./Frontend/Authentications/components/ProtectedRoute";
import AuthorizedRoute from "./Frontend/Authentications/components/AuthorizedRoute";
import RoleHomeRedirect from "./Frontend/Authentications/components/RoleHomeRedirect";
import FacultyGrievance from "./Frontend/grievances/components/FacultyGrievance";
import Dashboard from "./Frontend/Main/Component/Dashboard";
import FirstPage from './Frontend/Main/Component/firstpage';
import Profile from "./Frontend/Main/Component/Profile";
import RestricetedPage from './Frontend/Main/Component/RestricetedPage';
// import Header from "./Frontend/Main/components/Header";
import SiteNavigation from "./Frontend/site/components/SiteNavigation";
import NotificationConsole from "./Frontend/consoles/NotificationConsole";
import CarouselConsole from "./Frontend/consoles/CarouselConsole";
import NewsConsole from "./Frontend/consoles/NewsConsole";
import GalleryConsole from "./Frontend/consoles/GalleryConsole";
import EventGalleryConsole from "./Frontend/consoles/EventGalleryConsole";
import CollegesConsole from "./Frontend/consoles/CollegesConsole";
import YoutubeConsole from "./Frontend/consoles/YoutubeConsole";
import ExecutiveCouncilConsole from "./Frontend/executiveCouncil/ExecutiveCouncilConsole";
import DeveloperDashboard from "./Frontend/developer/DeveloperDashboard";
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
              <Route path="developer-dashboard" element={<AuthorizedRoute page="developer-dashboard"><DeveloperDashboard /></AuthorizedRoute>} />
              <Route path="all-records" element={<AuthorizedRoute page="all-records"><AllRecordsControls /></AuthorizedRoute>} />
              <Route path="help" element={<AuthorizedRoute page="help"><FacultyGrievance /></AuthorizedRoute>} />
              <Route path="colleges-console" element={<AuthorizedRoute page="colleges-console"><CollegesConsole /></AuthorizedRoute>} />
              <Route path="affiliated-college" element={<AuthorizedRoute page="colleges-console"><CollegesConsole /></AuthorizedRoute>} />
              <Route path="add-new-affliated-college" element={<AuthorizedRoute page="colleges-console"><CollegesConsole /></AuthorizedRoute>} />
              <Route path="gallery" element={<AuthorizedRoute page="gallery-console"><GalleryConsole /></AuthorizedRoute>} />
              <Route path="carousel-console" element={<AuthorizedRoute page="carousel-console"><CarouselConsole /></AuthorizedRoute>} />
              <Route path="dmcupload" element={<AuthorizedRoute page="carousel-console"><CarouselConsole /></AuthorizedRoute>} />
              <Route path="carousel" element={<AuthorizedRoute page="carousel-console"><CarouselConsole /></AuthorizedRoute>} />
              <Route path="news-console" element={<AuthorizedRoute page="news-console"><NewsConsole /></AuthorizedRoute>} />
              <Route path="gallery-console" element={<AuthorizedRoute page="gallery-console"><GalleryConsole /></AuthorizedRoute>} />
              <Route path="event-gallery-console" element={<AuthorizedRoute page="event-gallery-console"><EventGalleryConsole /></AuthorizedRoute>} />
              <Route path="eventphotosupload" element={<AuthorizedRoute page="event-gallery-console"><EventGalleryConsole /></AuthorizedRoute>} />
              <Route path="galleryimagesupload" element={<AuthorizedRoute page="gallery-console"><GalleryConsole /></AuthorizedRoute>} />
              <Route path="notification-console" element={<AuthorizedRoute page="notification-console"><NotificationConsole /></AuthorizedRoute>} />
              <Route path="updates" element={<AuthorizedRoute page="notification-console"><NotificationConsole /></AuthorizedRoute>} />
              <Route path="youtube-console" element={<AuthorizedRoute page="youtube-console"><YoutubeConsole /></AuthorizedRoute>} />
              <Route path="executive-council-console" element={<AuthorizedRoute page="executive-council-console"><ExecutiveCouncilConsole /></AuthorizedRoute>} />
              <Route path="site-navigation" element={<AuthorizedRoute page="site-navigation"><SiteNavigation /></AuthorizedRoute>} />
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
