import portfolioConfig from "./portfolio";

// ==============================================================
// SOCIAL LINKS
// Centralized so Navbar, Hero, Contact, and Footer all stay
// in sync. Set `show: false` to hide a link everywhere at once.
// ==============================================================

export const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    href: portfolioConfig.github,
    icon: "github",
    show: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: portfolioConfig.linkedin,
    icon: "linkedin",
    show: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: portfolioConfig.instagram,
    icon: "instagram",
    show: true,
  },
  {
    id: "email",
    label: "Email",
    href: portfolioConfig.emailHref,
    icon: "mail",
    show: true,
  },
  {
    id: "phone",
    label: "Phone",
    href: portfolioConfig.phoneHref,
    icon: "phone",
    show: true,
  },
];

export default socialLinks;
