import { IconifyIcon } from "@iconify/react/dist/iconify.js";

export interface Link {
  name: string;
  url: string;
}

export interface Skill {
  skill_name: string;
  icon?: IconifyIcon;
  image?: string; // Optional image URL for fallback
}

export interface ToolCategory {
  name: string;
  colorHex: string;
}

export interface Project {
  project_name: string;
  time_range: string;
  image: string;
  image_type: "mobile" | "desktop";
  short_description: string;
  description: string;
  tools: string[];
  links: Link[];
}
