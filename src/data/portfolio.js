// ==============================================================
// PORTFOLIO CONFIG — edit this file to update your personal info
// This is the ONE place most text on the site comes from.
// Nothing here should require touching any component.
// ==============================================================

export const portfolioConfig = {
  name: "Partha Das",
  initials: "PD",

  email: "parthadas.connect@gmail.com",
  phone: "+91 8100313027",
  phoneHref: "tel:+918100313027",
  emailHref: "mailto:parthadas.connect@gmail.com",

  github: "https://github.com/parthabit",
  githubUsername: "parthabit",
  linkedin: "https://www.linkedin.com/in/parthadas20040/",
  instagram: "https://www.instagram.com/iamparthadas/?hl=en",

  // Leave blank ("") to hide from the UI. Only fill in what's true.
  location: "",

  role: "Computer Science Student | Full-Stack Developer | AI/ML Enthusiast",
  roles: [
    "Full-Stack Developer",
    "AI/ML Enthusiast",
    "CS Undergraduate",
    "Problem Solver",
  ],

  tagline:
    "I build modern web experiences, intelligent applications, and practical software that solves real problems.",

  // ==============================
  // ABOUT SECTION — edit freely
  // ==============================
  about: {
    summary:
      "I'm a Computer Science student who enjoys turning ideas into working software — from full-stack web apps to small AI-powered tools. I like projects that solve a real, specific problem rather than just demoing a technology.",
    focus:
      "Right now I'm focused on strengthening my full-stack fundamentals and exploring how AI/ML can be built into practical, everyday applications.",
    interests: [
      "Web Development",
      "Artificial Intelligence & Machine Learning",
      "Building side projects",
      "Competitive programming / DSA",
      "Open source",
    ],
    philosophy:
      "I'd rather ship a small, working project than leave a big idea unfinished. Clear code, honest scope, and things that actually run beat things that only sound impressive.",
  },

  // ==============================
  // CONTACT FORM PROVIDER
  // ==============================
  // This site never runs its own backend. Leave `formEndpoint` blank and
  // the contact form falls back to opening the visitor's email client with
  // the message pre-filled. To wire up real form submissions, sign up for
  // a form service (e.g. Formspree, Getform, Web3Forms) and paste the
  // endpoint URL they give you here — no other code changes needed.
  contact: {
    formEndpoint: "", // e.g. "https://formspree.io/f/xxxxxxx"
  },

  // Resume file — drop your PDF at public/resume/partha-das-resume.pdf
  resume: "/resume/partha-das-resume.pdf",

  // Update this when you deploy to a real domain.
  siteUrl: "https://parthadas.dev",

  seo: {
    title: "Partha Das — Full-Stack Developer & AI/ML Enthusiast",
    description:
      "Portfolio of Partha Das, a Computer Science student and full-stack developer building web applications and AI/ML powered tools.",
    keywords: [
      "Partha Das",
      "Partha Das developer",
      "Partha Das portfolio",
      "parthabit",
      "Full-Stack Developer",
      "AI/ML Enthusiast",
      "Computer Science student",
    ],
  },
};

export default portfolioConfig;
