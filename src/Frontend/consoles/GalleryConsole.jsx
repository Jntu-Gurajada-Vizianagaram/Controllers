import React from "react";
import GalleryImagesUpload from "../dmc/components/GalleryImagesUpload";
import CompleteGallery from "../dmc/components/CompleteGallery";
import { ConsolePage, ConsoleTabs } from "./ConsolePage";

export default function GalleryConsole() {
  return (
    <ConsolePage
      title="Gallery Console"
      description="Manage the public gallery image collection separately from press notes and event photo albums."
    >
      <ConsoleTabs
        tabs={[
          { id: "manage", label: "Upload & Manage Gallery", component: <GalleryImagesUpload /> },
          { id: "overview", label: "Gallery Overview", component: <CompleteGallery /> },
        ]}
      />
    </ConsolePage>
  );
}
