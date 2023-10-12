// DMC.js
import React from "react";
import "../../css/dmc_css/DMC.css";
import { Outlet } from "react-router-dom";

const DMC = () => {
  return (
    
    <div className="dmc-main">
      <div class="title">DIGITAL MONITORING CELL(DMC)</div>
      <div class="link">
        <a href="/DMC/DMC-Upload"> Upload The Photography/content</a>
      </div>
      <Outlet />
    </div>
  );
};

export default DMC;
