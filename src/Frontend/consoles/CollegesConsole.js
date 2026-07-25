import React from "react";
import AddCollege from "../affliated_colleges/components/AddCollege";
import AffiliatedColleges from "../affliated_colleges/components/AffliatedColleges";
import { ConsolePage, ConsoleTabs } from "./ConsolePage";

const StaticCollegeNotice = ({ type }) => (
  <div className="console-placeholder">
    <h3>{type} Colleges</h3>
    <p>
      This section is reserved for {type.toLowerCase()} college operations. The public site currently keeps these lists
      in static frontend data files, so this console shows the section here without changing old API URLs.
    </p>
    <p>
      Next backend step: migrate {type.toLowerCase()} colleges into the same database-backed college API so add/edit/delete
      operations can be performed here.
    </p>
  </div>
);

export default function CollegesConsole() {
  return (
    <ConsolePage
      title="Colleges Console"
      description="Manage affiliated colleges now, with constituent and autonomous college sections grouped into the same navigation."
    >
      <ConsoleTabs
        tabs={[
          { id: "affiliated-list", label: "Affiliated Colleges List", component: <AffiliatedColleges /> },
          { id: "affiliated-add", label: "Add Affiliated College", component: <AddCollege /> },
          { id: "constituent", label: "Constituent Colleges", component: <StaticCollegeNotice type="Constituent" /> },
          { id: "autonomous", label: "Autonomous Colleges", component: <StaticCollegeNotice type="Autonomous" /> },
        ]}
      />
    </ConsolePage>
  );
}
