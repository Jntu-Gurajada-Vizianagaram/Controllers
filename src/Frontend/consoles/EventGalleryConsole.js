import React from "react";
import EventPhotosUpload from "../dmc/components/EventPhotosUpload";
import { ConsolePage } from "./ConsolePage";

export default function EventGalleryConsole() {
  return (
    <ConsolePage
      title="Event Gallery Console"
      description="Bulk upload photos for a particular university event and publish the event album through RBAC."
    >
      <EventPhotosUpload />
    </ConsolePage>
  );
}
