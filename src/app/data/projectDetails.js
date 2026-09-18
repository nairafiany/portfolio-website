// Plain-language context, grounded in the published project descriptions.
// Personal responsibilities and results belong in project.contribution once confirmed.
export const projectBriefs = {
  "portfolio-website": {
    type: "Portfolio website",
    audience: "Recruiters and project collaborators",
    purpose: "A website for exploring my projects, technical skills, and background in one place.",
    scope: ["Responsive pages for different screen sizes", "Project and skills presentation", "Interactive navigation"],
  },
  "oscars-dashboard": {
    type: "Interactive data dashboard",
    audience: "People exploring film awards data",
    purpose: "An interactive dashboard for exploring nominations for the 98th Academy Awards alongside earlier awards results.",
    scope: ["Academy Awards nomination tracking", "Precursor awards data", "Interactive data exploration"],
  },
  sikafa: {
    type: "School administration website",
    audience: "School administrators and students",
    purpose: "A school administration website that brings admissions, attendance, tuition payments, and reporting into one place.",
  },
  relay: {
    type: "Marketplace · in development",
    audience: "Buyers and sellers of pre-owned sports gear",
    purpose: "A marketplace being developed to help people discover, sell, and buy secondhand sports equipment.",
  },
  "travel-apap": {
    type: "Travel booking website",
    audience: "People booking travel and rental vehicles",
    purpose: "A travel booking platform with a vehicle rental module for browsing vehicles and making reservations.",
    scope: ["Travel booking platform", "Vehicle rental browsing", "Reservation flow"],
  },
  sizopi: {
    type: "Zoo management website",
    audience: "Zoo management teams",
    purpose: "A website for managing zoo information, with a database at the centre of the system.",
    scope: ["Zoo information management", "Web-based access to records", "Database-backed application"],
  },
  "e-commerce-dashboard": {
    type: "Business analytics dashboard",
    audience: "Teams reviewing e-commerce performance",
    purpose: "A dashboard for exploring sales, products, and logistics using an e-commerce dataset with more than 100,000 records.",
    scope: ["Sales-funnel analysis", "Product analysis", "Logistics analysis"],
  },
  elevfit: {
    type: "UI/UX design & prototype",
    audience: "People tracking exercise and food intake",
    purpose: "A fitness app design focused on making physical activity and food tracking easier to navigate.",
    scope: ["Fitness app interface design", "Activity and food tracking flows", "Human-computer interaction"],
  },
  "rent-n-drive": {
    type: "Car rental website",
    audience: "People renting cars online",
    purpose: "A car rental website developed with a focus on software-security practices.",
    scope: ["Car rental website", "Security-focused application development"],
  },
  ingresync: {
    type: "Experimental AI web application",
    audience: "People exploring skincare ingredient compatibility",
    purpose: "An experimental website that uses AI to check compatibility between skincare ingredients.",
    scope: ["Skincare ingredient compatibility checking", "AI integration in a web application", "Large language model experimentation"],
  },
  jogjappetite: {
    type: "Web & mobile platform",
    audience: "People exploring food in Yogyakarta",
    purpose: "A food review platform for Yogyakarta, with both website and mobile interfaces.",
    scope: ["Food review platform", "Web interface", "Mobile interface"],
  },
  "diamond-analytics": {
    type: "Data science project",
    audience: "People analysing diamond pricing and quality",
    purpose: "A modelling project that explores diamond prices and visual quality using classification, prediction, and clustering.",
    scope: ["Classification models", "Price prediction", "Clustering and visual-quality analysis"],
  },
};

export const technologyGuide = {
  "Java": { area: "Backend", purpose: "Programming language used by the Spring Boot backend." },
  "Gradle": { area: "Backend", purpose: "Builds the backend application and manages its dependencies." },
  "Spring Security": { area: "Authentication", purpose: "Handles application authentication and access controls." },
  "JWT": { area: "Authentication", purpose: "Uses signed tokens to identify signed-in users." },
  "BCrypt": { area: "Authentication", purpose: "Hashes passwords so the application does not store them as plain text." },
  "JPA": { area: "Database", purpose: "Connects the application's Java data models to database records." },
  "GitLab CI/CD": { area: "Deployment", purpose: "Runs the backend build and deployment pipeline." },
  "Kaniko": { area: "Deployment", purpose: "Builds container images in the deployment pipeline." },
  "Google Artifact Registry": { area: "Cloud hosting", purpose: "Stores the application's container images." },
  "Google Cloud Run": { area: "Cloud hosting", purpose: "Runs the deployed backend and provides production logs." },
  "Next.js": { area: "Frontend", purpose: "Builds the website pages and navigation that people interact with." },
  "Vue.js": { area: "Frontend", purpose: "Builds interactive pages, forms, and application screens." },
  "Tailwind CSS": { area: "Frontend", purpose: "Styles the interface and adapts layouts to different screen sizes." },
  "Flutter": { area: "Mobile", purpose: "Builds the mobile application interface." },
  "Spring Boot": { area: "Backend", purpose: "Handles server-side application logic and communication with the interface." },
  "Django": { area: "Backend", purpose: "Supports the application's server-side logic and data workflows." },
  "FastAPI": { area: "Backend", purpose: "Provides an API: the connection between the interface and server-side features." },
  "Go": { area: "Backend", purpose: "A programming language for building server-side services." },
  "PostgreSQL": { area: "Database", purpose: "Stores and organises structured application data." },
  "Docker": { area: "Deployment", purpose: "Packages an application and its dependencies so it can run consistently." },
  "Google Cloud Platform": { area: "Cloud hosting", purpose: "Provides cloud infrastructure for running applications." },
  "AWS": { area: "Cloud hosting", purpose: "Provides cloud infrastructure for running applications." },
  "Vercel": { area: "Web hosting", purpose: "Publishes and hosts the website interface." },
  "Python": { area: "Programming", purpose: "A programming language used for data processing, analysis, and modelling." },
  "Streamlit": { area: "Data visualisation", purpose: "Turns Python analysis into an interactive web dashboard." },
  "Looker Studio": { area: "Data visualisation", purpose: "Presents data in interactive charts, reports, and dashboards." },
  "Figma": { area: "Design", purpose: "Creates interface designs and interactive prototypes." },
  "UI/UX": { area: "Design", purpose: "Focuses on how an interface looks and how people move through it." },
  "OpenAI Platform": { area: "AI integration", purpose: "Provides language models for AI-powered application features." },
  "Machine Learning": { area: "Data science", purpose: "Uses data to build prediction, classification, and clustering models." },
  "Security": { area: "Application security", purpose: "Focuses on practices that protect an application and its data." },
};

export const technologyAreas = {
  Frontend: "The pages, forms, and navigation people interact with.",
  Mobile: "The mobile application interface.",
  Backend: "Server-side application logic and the tools used to build it.",
  Authentication: "Registration, sign-in, user identification, and password protection.",
  Database: "How application records are structured, stored, and connected.",
  Deployment: "Packaging the application and preparing it to run outside local development.",
  "Cloud hosting": "Infrastructure and services for deploying and running the application.",
  "Web hosting": "Publishing and hosting the website interface.",
  Programming: "Code for processing data, running analysis, and building models.",
  "Data visualisation": "Charts, reports, and dashboards for exploring information.",
  Design: "Interface layouts, user flows, and interactive prototypes.",
  "AI integration": "Connecting AI models to user-facing application features.",
  "Data science": "Models for prediction, classification, and clustering.",
  "Application security": "Practices for protecting the application and its data.",
};

export function getProjectTechnologyAreas(project) {
  const technologies = [...project.technologies.map(({ name }) => name), ...(project.contribution?.technologies ?? [])];
  const groups = new Map();
  for (const name of new Set(technologies)) {
    const area = technologyGuide[name]?.area ?? "Technology";
    if (!groups.has(area)) groups.set(area, []);
    groups.get(area).push(name);
  }
  return [...groups].map(([area, names]) => ({ area, names, purpose: technologyAreas[area] ?? "Part of the project's technology stack." }));
}
