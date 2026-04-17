import TechnologyClient from "./TechnologyClient";

export const metadata = {
  title:
    "Polyol Manufacturing Technology | Polymer Recycling & Depolymerization Process | Enviol",

  description:
    "Explore Enviol’s advanced polymer regeneration and depolymerization technology for manufacturing polyester and polyether polyols from PET and polyurethane waste.",

  keywords: [
    "polyol manufacturing process",
    "polymer recycling technology",
    "polyester polyol production process",
    "polyurethane recycling technology",
    "depolymerization process polyol",
    "chemical recycling PET to polyol",
    "sustainable polyol manufacturing",
    "industrial polymer regeneration",
    "PU waste recycling process"
  ],

  alternates: {
    canonical: "https://enviol.com/technology",
  },
};

export default function TechnologyPage() {
  return <TechnologyClient />;
}