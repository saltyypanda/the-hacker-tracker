import { Project } from "./types";

export const ProjectInfos: Project[] = [
  {
    slug: "dawn",
    project_name: "D.A.W.N.",
    accent: "#f3ba50",
    time_range: "2026 – 2027",
    image: "/project-media/dawn-poster.webp",
    video: "/project-media/dawn",
    image_type: "desktop",
    short_description: `A calm, hands-free tablet that helps people with dementia know what day it is and hear from their family, with apps for families and care staff. My senior project; I lead the tablet app and DevOps.`,
    description: `People with dementia often wake up not knowing where they are, what day it is, or why. D.A.W.N. (Daily Awareness & Well-being Navigator) puts a tablet in a care-facility resident's room that always shows the day and time of day in very large type, with family photos and notes, and plays video and audio messages from family. The resident never has to touch it.

It's three apps on one Go backend: a caregiver web app where families upload media, lay out the screen with a live preview and schedule messages; the Android tablet app; and a staff app that lets floor staff play a clip by situation ("asking for someone", "wants to go home") and rate how it went. We're a team of six preparing a beta at St. Ann's Home in Rochester.

I lead the carepartner tablet app and DevOps. I rebuilt the tablet app in Expo/React Native: the always-on widget grid, night dimming, a single playback state machine that drives the screen, staff play and stop commands over a WebSocket, telemetry that reports every play and touch, automatic pairing, and EAS builds with over-the-air updates. On the DevOps side I set up CI on every pull request, Discord review bots and nightly PR metrics, kept secrets out of the deployment config, and licensed the project under Apache 2.0.

The demo runs the real apps locally with sample content (a placeholder message and photo), not real residents or families.`,
    story: {
      src: "/project-media/dawn-why-it-matters",
      poster: "/project-media/dawn-why-it-matters-poster.webp",
      title: "Why it matters",
      duration: "0:54",
      caption: "Our team's official video. All app footage and the video message were recorded by the D.A.W.N. team.",
    },
    tools: ["REACT_NATIVE", "EXPO", "TYPESCRIPT", "GO", "POSTGRESQL", "DOCKER", "GITHUB_ACTIONS"],
    links: [
      {
        name: "GitHub Repo",
        url: "https://github.com/dawn-care/DAWN",
      },
      {
        name: "Project Docs",
        url: "https://github.com/dawn-care/Artifacts",
      },
      {
        name: "Team Website",
        url: "https://dawn-sigma-gold.vercel.app",
      },
    ],
    gallery: [
      {
        src: "/project-media/dawn-always-on.webp",
        alt: "Tablet screen reading Wednesday, Afternoon in large type, with a photo of a house captioned Our house and a note saying Elena is coming for dinner tonight",
        caption: "The always-on screen: the day and time of day in very large type, a family photo and a note",
      },
      {
        src: "/project-media/dawn-night.webp",
        alt: "Dark tablet screen with warm text: Wednesday, Nighttime, You're safe. Sleep well.",
        caption: "During sleeping hours the screen dims to warm text",
      },
      {
        src: "/project-media/dawn-staff-app.webp",
        alt: "Three staff app screens: choosing what's happening, choosing who the resident is asking for, and rating how the clip went",
        caption: "The staff app: pick the situation, pick who they're asking for, play, then rate how it went",
      },
      {
        src: "/project-media/dawn-pairing.webp",
        alt: "Tablet setup screen showing a six-character pairing code to enter in the family app",
        caption: "Pairing: the tablet shows a code and the family enters it in their app, with no login on the tablet",
      },
    ],
  },
  {
    slug: "petal",
    project_name: "Petal",
    accent: "#8ab4ff",
    time_range: "",
    image: "/project-media/petal-poster.webp",
    video: "/project-media/petal",
    image_type: "desktop",
    short_description: `An application with an intuitively designed interface to help people with aphasia communicate with their caregivers.`,
    description: `Petal is an image-based communication app designed to
        support people with aphasia, inspired by my stepdad Pete, who
        lost the ability to speak after a stroke when I was twelve. My
        mom, his full-time caregiver, struggled to find tools that could
        help him communicate even basic needs. Together, we designed Petal
        as a tool we wish we’d had. Named in honor of Pete and the
        forget-me-nots we used to plant, this project is my way of continuing
        his memory while helping other families navigate the same
        challenges.

Built in Django with both Patient and Caregiver
        UIs, Petal uses a visually simple image tree for patients to express
        their needs, and AI-assisted tools for caregivers to manage and generate
        photo libraries. Despite learning Django on the fly, our team created
        a functional prototype in just 24 hours, and we’re excited to keep
        building. Planned features include a training mode to help users
        relearn nouns, object recognition, and enhanced multi-user support
        through Auth0.`,
    tools: ["PYTHON", "DJANGO", "HTML", "TAILWIND", "CSS"],
    links: [
      {
        name: "GitHub Repo",
        url: "https://github.com/sjk7876/brickhack11",
      },
      {
        name: "Devpost Post",
        url: "https://devpost.com/software/petal-od7isk",
      },
    ],
  },
  {
    slug: "stock-stalker",
    project_name: "Stock Stalker",
    accent: "#b7ffc9",
    time_range: "",
    image: "/project-images/stock-stalker-homepage.png",
    image_type: "desktop",
    short_description: `A full-stack AWS-based web application that predicts stock trends for S&P 500 companies based on sentiments pulled from various sources.`,
    description: `This is a semester-long project for my Cloud Computing
        class at RIT. I'm working with three classmates to build an application
        that takes a stock ticker, time range, and source selection from the
        user, then gathers and analyzes sentiment data from those sources. The
        application visualizes sentiment trends alongside actual stock price
        trends, using data pulled from Finnhub.

We're using a suite of AWS services to build this project. Our frontend
        is built with React and deployed via Amplify. It communicates with a custom
        API that serves data from our database. The backend is powered by AWS
        Lambda, which periodically collects news data, sends it through AWS
        Comprehend for sentiment analysis, and stores the results. All
        infrastructure is provisioned using Terraform.`,
    tools: ["AWS", "REACT", "TYPESCRIPT", "PYTHON"],
    links: [],
  },
  {
    slug: "sse-website",
    project_name: "SSE Website Rebuild",
    accent: "#ffc77a",
    time_range: "",
    image: "/project-images/sse-website-homepage.png",
    image_type: "desktop",
    short_description: `Led a team of over 20 people to rebuild RIT's Society of Software Engineers website to make it more maintainable and scalable.`,
    description: `During my time as Tech Head for the Society of
        Software Engineers at RIT, I led a large team in a full rebuild
        of our organization’s website using modern technologies and industry
        best practices. We’re using React, TypeScript, Next.js, PostgreSQL,
        and Prisma to build a clean, maintainable codebase with strong
        documentation and an extensible architecture. The new site will
        serve as an accessible hub for information about SSE—highlighting
        events, leadership, projects, and more.

The rebuild also introduces a robust backend to manage memberships, mentor
        schedules, quotes, and other internal data. By making the platform
        open-source, we’re fostering a culture of collaboration and inviting
        new members to contribute to the Society’s growth through hands-on
        development experience.`,
    tools: ["NEXT_JS", "POSTGRESQL", "PRISMA", "TYPESCRIPT", "TAILWIND"],
    links: [
      {
        name: "GitHub Repo",
        url: "https://github.com/rit-sse/WebsiteTheSSEquel",
      },
    ],
  },
  {
    slug: "workout-tracker",
    project_name: "Workout Tracker",
    accent: "#ff8fb8",
    time_range: "",
    image: "/project-media/workout-poster.webp",
    video: "/project-media/workout",
    image_type: "desktop", // Change to mobile once I finalize the design
    short_description: `Developed a workout tracker as a personal project using React Native, Nativewind, and SQLite. Emphasis on clean, aesthetic UI for mobile platform`,
    description: `This is a personal project I built to track my workouts. I was inspired by the Aflete app, which
    had a UI I really resonated with and found intuitive as a user, but was only available to download
    workout guides, not make them yourself. I also would have liked more customization options for the
    general appearance of the app.
    
    I wanted to learn more about mobile development, so I built this app in React Native with Nativewind for styling and
    SQLite for local data storage.`,
    tools: ["REACT_NATIVE", "SQL_LITE", "TYPESCRIPT", "NATIVEWIND"],
    links: [
      {
        name: "GitHub Repo",
        url: "https://github.com/saltyypanda/workout-tracker",
      },
    ],
  },
  {
    slug: "outer-wilds-chat",
    project_name: "Outer Wilds Chat",
    accent: "#b49cff",
    time_range: "April 2026",
    image: "/project-media/outer-wilds-chat-poster.webp",
    video: "/project-media/outer-wilds-chat",
    image_type: "desktop",
    short_description: `A transparent desktop overlay for chatting with Outer Wilds characters over the "signalscope," powered by character-driven LLM prompts.`,
    description: `A fan project built over a few days in April 2026: a small, frameless, transparent Electron overlay that sits on the desktop and lets you tune into planets from Outer Wilds to chat with the travelers camped there, like Chert on Ember Twin and Gabbro on Giant's Deep.

Each character has a detailed system prompt covering their voice, worldview and relationships, so replies read like in-game dialogue rather than a chatbot. Chert, for example, has no idea what "code" is and asks about it. Conversations go through the OpenAI Responses API with timestamped history, and the UI adds signal-locating states, typed-out replies and per-planet sound design.

Outer Wilds and its characters belong to Mobius Digital; this is an unofficial fan project.`,
    tools: ["JAVASCRIPT", "ELECTRON", "OPENAI", "TAILWIND"],
    gallery: [
      {
        src: "/project-media/outer-wilds-chat-desktop.webp",
        alt: "Linux desktop with an Outer Wilds wallpaper of a campfire under the stars, system widgets on the left, and the chat overlay floating in the top right",
        caption: "In its natural habitat: the overlay on my Outer Wilds-themed desktop",
      },
    ],
    links: [
      {
        name: "GitHub Repo",
        url: "https://github.com/saltyypanda/outer-wilds-chat",
      },
    ],
  },
];
