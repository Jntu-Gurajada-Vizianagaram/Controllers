import React from "react";
import UpdateCRUDControl from "../admin/components/UpdateCRUDControl";
import AllRecordsControl from "../admin/components/AllRecordsControl";
import { ConsolePage, ConsoleTabs } from "./ConsolePage";

export default function NotificationConsole() {
  return (
    <ConsolePage
      title="Notification Console"
      description="Create, edit, publish, scroll, archive, and manage notifications from one RBAC-protected console."
    >
      <ConsoleTabs
        tabs={[
          { id: "manage", label: "Create & Recent", component: <UpdateCRUDControl /> },
          { id: "records", label: "Record Storage", component: <AllRecordsControl /> },
        ]}
      />
    </ConsolePage>
  );
}
