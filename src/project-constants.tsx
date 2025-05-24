export const ProjectInfos = [
  {
    project_name: "Petal",
    time_range: "",
    image: "/project-images/petal-homepage.jpg",
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
    project_name: "Stock Stalker",
    time_range: "",
    image: "/project-images/stock-stalker-homepage.png",
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
    project_name: "SSE Website Rebuild",
    time_range: "",
    image: "/project-images/sse-website-homepage.png",
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
];
