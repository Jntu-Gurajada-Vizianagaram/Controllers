import React from "react";
import AddCollege from "../affliated_colleges/components/AddCollege";
import AffiliatedColleges from "../affliated_colleges/components/AffliatedColleges";
import { ConsolePage, ConsoleTabs } from "./ConsolePage";

export default function CollegesConsole() {
  return (
    <ConsolePage
      title="Colleges Console"
      description="Manage affiliated, autonomous, and university constituent college records from one year-wise API-backed console."
    >
      <ConsoleTabs
        tabs={[
          { id: "colleges-list", label: "Colleges List", component: <AffiliatedColleges /> },
          { id: "college-add", label: "Add College", component: <AddCollege /> },
        ]}
      />
    </ConsolePage>
  );
}
