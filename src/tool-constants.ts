interface ToolCategory {
  name: string;
  colorHex: string;
}

export const ToolCategories: { [key: string]: ToolCategory } = {
  LANGUAGE: {
    name: "Language",
    colorHex: "#4A90E2",
  },
  FRONTEND: {
    name: "Frontend",
    colorHex: "#E67E22",
  },
  BACKEND: {
    name: "Backend",
    colorHex: "#27AE60",
  },
  CLOUD: {
    name: "Cloud",
    colorHex: "#8E44AD",
  },
  DATABASE: {
    name: "Database",
    colorHex: "#3498DB",
  },
  ORM: {
    name: "ORM",
    colorHex: "#2C3E50",
  },
  TOOLING: {
    name: "Library",
    colorHex: "#16A085",
  },
  STYLING: {
    name: "Styling",
    colorHex: "#C0392B",
  },
  LIBRARY: {
    name: "Tooling",
    colorHex: "#F1C40F",
  },
};

interface Tool {
  name: string;
  category: string;
}

export const Tools: { [key: string]: Tool } = {
  PYTHON: {
    name: "Python",
    category: "LANGUAGE",
  },
  DJANGO: {
    name: "Django",
    category: "BACKEND",
  },
  HTML: {
    name: "HTML",
    category: "FRONTEND",
  },
  CSS: {
    name: "CSS",
    category: "STYLING",
  },
  TAILWIND: {
    name: "Tailwind",
    category: "LIBRARY",
  },
  TYPESCRIPT: {
    name: "TypeScript",
    category: "LANGUAGE",
  },
  REACT: {
    name: "React",
    category: "FRONTEND",
  },
  NEXT_JS: {
    name: "Next.js",
    category: "FRONTEND",
  },
  POSTGRESQL: {
    name: "PostgreSQL",
    category: "DATABASE",
  },
  PRISMA: {
    name: "Prisma",
    category: "ORM",
  },
  VITE: {
    name: "Vite",
    category: "FRONTEND",
  },
  AWS: {
    name: "AWS Services",
    category: "CLOUD",
  },
};
