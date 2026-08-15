import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import jntugvlogo from '../media/jntugv.png'
import mods from "./Logins/Login";
import "./FirstPage.css";

const Firstpage=()=>{

  if(mods.uds && mods.uds.islogin){
    return <Navigate to="/dashboard" replace />;
  }
  

    return(
      <main className="admin-entry-page">
        <section className="admin-entry-card">
          <img src={jntugvlogo} alt="JNTU-GV" className="admin-entry-logo" />
          <p className="admin-entry-eyebrow">
            University Admin Consoles
          </p>
          <h1 className="admin-entry-title">
            Jawaharlal Nehru Technological University Gurajada Vizianagaram
          </h1>
          <p className="admin-entry-subtitle">
            JNTUGV College of Engineering Vizianagaram
          </p>
          <p className="admin-entry-meta">
            Established by Andhra Pradesh Act No.22 by 2021
          </p>
          <NavLink to="/login" className="admin-entry-button">
            Login to Admin Console
          </NavLink>
        </section>
      </main>
    );
}

export default Firstpage;
