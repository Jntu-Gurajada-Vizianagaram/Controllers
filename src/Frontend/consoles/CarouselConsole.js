import React from "react";
import DmcIMGUpload from "../dmc/components/DmcIMGUpload";
import CarouselDisplay from "../dmc/components/CarouselDisplay";
import { ConsolePage, ConsoleTabs } from "./ConsolePage";

export default function CarouselConsole() {
  return (
    <ConsolePage
      title="Carousel Console"
      description="Upload carousel images, edit metadata, and add or remove images from the public carousel."
    >
      <ConsoleTabs
        tabs={[
          { id: "upload", label: "Upload & Edit Images", component: <DmcIMGUpload /> },
          { id: "manage", label: "Carousel Selection", component: <CarouselDisplay /> },
        ]}
      />
    </ConsolePage>
  );
}
