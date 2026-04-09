"use client";

import dynamic from "next/dynamic";

const VehicleScene = dynamic(
  () =>
    import("@/components/three-portfolio/VehicleScene").then(
      (m) => m.VehicleScene
    ),
  { ssr: false }
);

export default function ThreeDPage() {
  return <VehicleScene />;
}
