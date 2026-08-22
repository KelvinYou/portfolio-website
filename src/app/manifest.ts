import { personalInfo } from "@/constants";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personalInfo.name} | Portfolio`,
    short_name: personalInfo.name,
    description: personalInfo.title,
    start_url: "/",
    display: "standalone",
    background_color: "#07070C",
    theme_color: "#07070C",
    icons: [
      { src: "/icon/48", sizes: "48x48", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
