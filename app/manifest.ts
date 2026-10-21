import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fairway Air",
    short_name: "Fairway Air",
    description: "HVAC service for Palm Desert and the Coachella Valley.",
    start_url: "/",
    display: "browser",
    background_color: "#fbf9f5",
    theme_color: "#102540",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
