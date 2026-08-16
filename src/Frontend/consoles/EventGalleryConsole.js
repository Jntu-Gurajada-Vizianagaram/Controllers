import React from "react";
import EventAlbumsManagement from "../dmc/components/EventAlbumsManagement";
import { ConsolePage } from "./ConsolePage";

export default function EventGalleryConsole() {
  return (
    <ConsolePage
      title="Event Albums"
      description="Create, preview, edit, publish, and delete public event photo albums from one routed page."
    >
      <EventAlbumsManagement />
    </ConsolePage>
  );
}
