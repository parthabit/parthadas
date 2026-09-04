// ==============================================================
// SKILLS DATA
// Only technologies listed here are shown on the site.
// Add/remove a line to add/remove a skill — no component edits.
// "level" is optional (0-100) and only used for the progress bar;
// omit it to just show the skill as a plain tag.
// ==============================================================

export const skillCategories = [
  {
    id: "programming",
    label: "Programming",
    eyebrow: "01",
    skills: [
      { name: "Python" },
      { name: "Java" },
      { name: "C" },
      { name: "JavaScript" },
    ],
  },
  {
    id: "web",
    label: "Web Development",
    eyebrow: "02",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "React" },
      { name: "Node.js" },
    ],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    eyebrow: "03",
    skills: [
      { name: "Python" },
      { name: "Machine Learning" },
      { name: "AI Application Development" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    eyebrow: "04",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Figma" },
      { name: "Vercel" },
    ],
  },
];

export default skillCategories;
