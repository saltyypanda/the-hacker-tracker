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

export interface GalleryImage {
  src: string;
  /** Describes the image for screen readers. */
  alt: string;
  caption?: string;
}

export interface Project {
  /** Used for the #anchor and the orbit planet link. */
  slug: string;
  project_name: string;
  /** Planet color: used in the hero orbit and on the project's row. */
  accent: string;
  time_range: string;
  /** Still image; also the video's poster frame when `video` is set. */
  image: string;
  image_type: "mobile" | "desktop";
  /**
   * Optional short looping demo, as a path without extension. Both
   * `<path>.webm` (VP9) and `<path>.mp4` (H.264) must exist so every
   * browser has a format it can play.
   */
  video?: string;
  /** Extra images shown in the mission-log dialog. */
  gallery?: GalleryImage[];
  short_description: string;
  description: string;
  tools: string[];
  links: Link[];
}
