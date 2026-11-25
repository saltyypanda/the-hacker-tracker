import linkedinIcon from "./assets/icons/linkedin-icon.svg";
import githubIcon from "./assets/icons/github-icon.svg";
import devpostIcon from "./assets/icons/devpost-icon.svg";

/** Single source of truth for contact details and social links. */
export const contact = {
  email: "esh7943@rit.edu",
  linkedinHandle: "tess-hacker",
  linkedinUrl: "https://www.linkedin.com/in/tess-hacker",
  resumeUrl: "/resume.pdf",
  resumeFileName: "Esther_Hacker_Resume.pdf",
  formspreeUrl: "https://formspree.io/f/xnndyrkb",
};

export const socialLinks = [
  { name: "LinkedIn", url: contact.linkedinUrl, icon: linkedinIcon, size: 18 },
  { name: "GitHub", url: "https://github.com/saltyypanda", icon: githubIcon, size: 28 },
  { name: "Devpost", url: "https://devpost.com/saltyypanda", icon: devpostIcon, size: 24 },
];

export const navSections = ["home", "skills", "projects", "experience"];
