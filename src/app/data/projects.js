export const projects = [
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    year: 2026,
    shortDescription:
      "Responsive portfolio website showcasing projects and skills with a playful, interactive interface.",
    categories: ["Web"],
    technologies: [
      { name: "Next.js", icon: "/stacks/nextjs_icon_dark.svg" },
      { name: "Tailwind CSS", icon: "/stacks/tailwindcss.svg" },
    ],
    thumbnail: {
      src: "/images/preview.png",
      alt: "Preview of Naira's portfolio website",
      width: 1200,
      height: 630,
    },
    repositoryUrl: "https://github.com/nairafiany/portfolio-website",
  },
  {
    slug: "oscars-dashboard",
    title: "Oscars Dashboard",
    year: 2026,
    shortDescription:
      "Interactive data dashboard tracking the 98th Academy Awards nominations and precursor awards.",
    categories: ["Data Analytics", "Visualization"],
    technologies: [
      { name: "Python", symbol: "python" },
      { name: "Streamlit", symbol: "streamlit" },
    ],
    thumbnail: {
      src: "/images/projects/oscars.png",
      alt: "Oscars Dashboard interface",
      width: 1200,
      height: 630,
    },
    repositoryUrl: "https://github.com/nairafiany/oscars-dashboard",
    liveUrl:
      "https://oscars-dashboard-s5hmnzsgglbtq77eqfbt7y.streamlit.app/",
    liveLabel: "Dashboard",
  },
  {
    slug: "sikafa",
    title: "SIKAFA",
    year: 2026,
    contribution: {
      role: "Lead Developer",
      focus: "Account management, authentication, backend data modelling, and deployment.",
      responsibilities: [
        {
          title: "Account & profile management",
          description: "Built account creation, account lists and details, profile editing, and password-related flows. Handled different identity fields for students, teachers, administrative staff, and the principal.",
          technologies: ["Role-specific profiles", "Account management"],
        },
        {
          title: "Registration & secure sign-in",
          description: "Built registration, login, and logout, including prospective-student registration and linked account profiles. Used signed login tokens and password hashing to handle authentication.",
          technologies: ["Spring Security", "JWT", "BCrypt"],
        },
        {
          title: "Backend data modelling",
          description: "Designed the account, profile, and role-specific data structures, including one-to-one relationships, shared identifiers, role definitions, and timestamps for tracking changes.",
          technologies: ["JPA", "@OneToOne / @MapsId", "UUID", "Audit timestamps"],
        },
        {
          title: "Backend & database setup",
          description: "Set up the backend development environment and local database, including application settings, environment variables, and database connections.",
          technologies: ["Spring Boot 3.5.10", "Java 21", "Gradle", "PostgreSQL 17.5", "Docker"],
        },
        {
          title: "Build pipeline & cloud deployment",
          description: "Worked on the backend build-and-deploy pipeline: building container images, storing them in Google Artifact Registry, and deploying the application to Google Cloud Run.",
          technologies: ["GitLab CI/CD", "Docker / Kaniko", "Google Artifact Registry", "Google Cloud Run"],
        },
        {
          title: "Production troubleshooting",
          description: "Used Cloud Run logs to investigate and fix backend issues, including mismatches between application data models and PostgreSQL tables, such as missing columns or relations.",
          technologies: ["Cloud Run logs", "JPA", "PostgreSQL"],
        },
      ],
      technologies: ["Java", "Gradle", "Spring Security", "JWT", "BCrypt", "JPA", "PostgreSQL", "GitLab CI/CD", "Kaniko", "Google Artifact Registry", "Google Cloud Run"],
    },
    shortDescription:
      "A centralized school administration system for admissions, payments, attendance, activities, achievements, and reporting.",
    longDescription:
      "SIKAFA brings essential school administration workflows into one web-based system, giving students and administrators a clearer place to manage admissions, tuition, attendance, learning journals, extracurricular activities, achievements, and reporting.",
    categories: ["Web", "School Administration"],
    technologies: [
      { name: "Vue.js", icon: "/stacks/vue.svg" },
      { name: "Spring Boot", icon: "/stacks/spring.svg" },
      { name: "Docker", icon: "/stacks/docker.svg" },
      { name: "Google Cloud Platform", shortName: "GCP", symbol: "gcp" },
      { name: "Vercel", shortName: "Vercel", symbol: "vercel" },
    ],
    thumbnail: {
      src: "/images/projects/sikafa/1.png",
      alt: "SIKAFA school information system overview poster",
      width: 1080,
      height: 1350,
    },
    context:
      "Daily administration was spread across in-person admissions, paper records, chat messages, and manual recaps. SIKAFA centralizes those workflows so information is easier to manage and monitor.",
    features: [
      "Online student admissions and selection updates",
      "Attendance records and classroom learning journals",
      "Extracurricular enrollment and management",
      "Tuition payment submission and verification",
      "Student achievement records and certificates",
      "Administrative reporting and school dashboards",
    ],
    gallery: [
      {
        src: "/images/projects/sikafa/2.png",
        alt: "SIKAFA poster explaining fragmented manual school administration",
        caption: "The administrative context SIKAFA was designed to simplify.",
        layout: "context",
      },
      {
        src: "/images/projects/sikafa/3.png",
        alt: "SIKAFA online student admissions workflow",
        caption: "Admissions from form purchase through selection results.",
        layout: "wide",
      },
      {
        src: "/images/projects/sikafa/4.png",
        alt: "SIKAFA attendance and learning journal features",
        caption: "Attendance monitoring and organized learning journals.",
        layout: "half",
      },
      {
        src: "/images/projects/sikafa/5.png",
        alt: "SIKAFA extracurricular activity management features",
        caption: "Extracurricular discovery, enrollment, and administration.",
        layout: "half",
      },
      {
        src: "/images/projects/sikafa/6.png",
        alt: "SIKAFA tuition payment and verification workflow",
        caption: "Tuition records, evidence review, and payment verification.",
        layout: "wide",
      },
      {
        src: "/images/projects/sikafa/7.png",
        alt: "SIKAFA student achievement management features",
        caption: "Searchable achievement records and certificate evidence.",
        layout: "half",
      },
      {
        src: "/images/projects/sikafa/8.png",
        alt: "SIKAFA school reporting dashboard with charts",
        caption: "Dashboards make admissions, activities, and achievements visible at a glance.",
        layout: "half",
      },
      {
        src: "/images/projects/sikafa/9.png",
        alt: "SIKAFA website poster with QR code",
        caption: "The SIKAFA launch poster and live website invitation.",
        layout: "closing",
      },
    ],
    liveUrl: "https://sikafa-fe.vercel.app",
    liveLabel: "Live Demo",
  },
  {
    slug: "relay",
    title: "Relay",
    year: 2026,
    shortDescription:
      "Secondhand sports equipment marketplace for discovering, listing, and purchasing pre-owned gear, with integrated DOKU payments.",
    longDescription:
      "Relay is an in-development marketplace for giving pre-owned sports equipment a useful next life. It brings product discovery, seller listings, and the purchasing flow into one focused experience.",
    status: "In Progress",
    categories: [],
    technologies: [
      { name: "Go", symbol: "go" },
      { name: "Next.js", icon: "/stacks/nextjs_icon_dark.svg" },
    ],
    marketplaceConcept:
      "Users will be able to browse secondhand sports equipment, publish gear for sale, inspect product details, and move through a marketplace purchasing flow.",
    developmentNote:
      "Relay is actively being developed. The product direction and technical foundation are established, while marketplace flows remain in progress.",
    plannedFeatures: [
      "Browse and discover secondhand sports equipment",
      "Create and manage seller product listings",
      "Review product details before purchasing",
      "Continue through checkout and payment",
    ],
    integration: {
      name: "DOKU",
      label: "Payment integration",
      description:
        "The purchasing flow is being developed with DOKU as the payment integration. This remains part of Relay's in-progress marketplace experience.",
    },
  },
  {
    slug: "travel-apap",
    title: "TravelAPAP",
    year: 2025,
    shortDescription:
      "Integrated travel booking platform with a vehicle rental module for browsing and booking reservations.",
    categories: ["Web"],
    technologies: [
      { name: "Vue.js", icon: "/stacks/vue.svg" },
      { name: "Spring Boot", icon: "/stacks/spring.svg" },
      { name: "Docker", icon: "/stacks/docker.svg" },
      { name: "AWS", icon: "/stacks/aws_light.svg" },
    ],
    thumbnail: {
      src: "/images/projects/travelapap.png",
      alt: "TravelAPAP vehicle rental interface",
      width: 1200,
      height: 630,
    },
  },
  {
    slug: "sizopi",
    title: "SIZOPI",
    year: 2025,
    shortDescription:
      "Smart Zoo Information System for modern zoo management, built around a robust database system.",
    categories: ["Web"],
    technologies: [
      { name: "Next.js", icon: "/stacks/nextjs_icon_dark.svg" },
      { name: "Django", icon: "/stacks/django.svg" },
      { name: "PostgreSQL", icon: "/stacks/postgresql.svg" },
    ],
    thumbnail: {
      src: "/images/projects/sizopi.png",
      alt: "SIZOPI smart zoo information system interface",
      width: 1200,
      height: 630,
    },
    repositoryUrl: "https://github.com/ezarsurahman/sizopi-a-16",
  },
  {
    slug: "e-commerce-dashboard",
    title: "E-Commerce Dashboard",
    year: 2025,
    shortDescription:
      "Sales-funnel, product, and logistics analysis in Looker Studio using a dataset of more than 100,000 records.",
    categories: ["Data Analytics", "Visualization"],
    technologies: [
      { name: "Looker Studio", symbol: "chart" },
      { name: "Python", symbol: "python" },
    ],
    thumbnail: {
      src: "/images/projects/ecomm_dashboard.png",
      alt: "E-Commerce analytics dashboard",
      width: 1200,
      height: 630,
    },
    liveUrl:
      "https://lookerstudio.google.com/u/0/reporting/8ef341d2-93cd-4913-96a8-b0f77ba7e4c2/page/Pf5QF",
    liveLabel: "Dashboard",
  },
  {
    slug: "elevfit",
    title: "ELEVFIT",
    year: 2025,
    shortDescription:
      "Fitness app design for physical activity and food tracking, focused on human-computer interaction.",
    categories: ["UI/UX"],
    technologies: [
      { name: "Figma", icon: "/stacks/figma.svg" },
      { name: "UI/UX", symbol: "mobile" },
    ],
    thumbnail: {
      src: "/images/projects/elevfit.png",
      alt: "ELEVFIT fitness app design",
      width: 1200,
      height: 630,
    },
    liveUrl: "https://ristek.link/ElevFit",
    liveLabel: "Prototype",
  },
  {
    slug: "rent-n-drive",
    title: "Rent n Drive",
    year: 2025,
    shortDescription:
      "Secure car rental website implementing software-security best practices.",
    categories: ["Web"],
    technologies: [
      { name: "Next.js", icon: "/stacks/nextjs_icon_dark.svg" },
      { name: "Django", icon: "/stacks/django.svg" },
      { name: "Security", symbol: "security" },
    ],
    thumbnail: {
      src: "/images/projects/rent-drive.png",
      alt: "Rent n Drive car rental website",
      width: 1200,
      height: 630,
    },
  },
  {
    slug: "ingresync",
    title: "IngreSync",
    year: 2025,
    shortDescription:
      "AI-powered skincare ingredient compatibility checker built as an experimental LLM project.",
    categories: ["AI", "Web"],
    technologies: [
      { name: "OpenAI Platform", icon: "/stacks/openai_dark.svg" },
      { name: "Next.js", icon: "/stacks/nextjs_icon_dark.svg" },
      { name: "FastAPI", icon: "/stacks/fastapi.svg" },
    ],
    thumbnail: {
      src: "/images/projects/ingresync.png",
      alt: "IngreSync skincare ingredient checker interface",
      width: 1200,
      height: 630,
    },
    repositoryUrl: "https://github.com/ingresync/frontend",
  },
  {
    slug: "jogjappetite",
    title: "JOGJAPPETITE",
    year: 2024,
    shortDescription:
      "Food review platform focused on Yogyakarta's culinary scene across web and mobile interfaces.",
    categories: ["Mobile", "Web"],
    technologies: [
      { name: "Django", icon: "/stacks/django.svg" },
      { name: "Flutter", icon: "/stacks/flutter.svg" },
      { name: "Tailwind CSS", icon: "/stacks/tailwindcss.svg" },
    ],
    thumbnail: {
      src: "/images/projects/jogjappetite.png",
      alt: "JOGJAPPETITE food review platform",
      width: 1200,
      height: 630,
    },
  },
  {
    slug: "diamond-analytics",
    title: "Diamond Analytics",
    year: 2025,
    shortDescription:
      "Classification, prediction, and clustering models for estimating diamond prices and visual quality.",
    categories: ["Data Science", "AI"],
    technologies: [
      { name: "Python", symbol: "python" },
      { name: "Machine Learning", symbol: "brain" },
    ],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectNumber(slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  return index < 0 ? null : String(index + 1).padStart(2, "0");
}

export function getAdjacentProjects(slug) {
  const index = projects.findIndex((project) => project.slug === slug);

  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : null,
  };
}

export function groupProjectsByYear() {
  return projects.reduce((groups, project) => {
    const label = project.year ?? "Other Work";
    const existingGroup = groups.find((group) => group.label === label);

    if (existingGroup) {
      existingGroup.projects.push(project);
    } else {
      groups.push({ label, projects: [project] });
    }

    return groups;
  }, []);
}
