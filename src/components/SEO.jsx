import { useEffect } from "react";
import portfolioConfig from "../data/portfolio";

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function SEO({ title, description, path = "/" }) {
  useEffect(() => {
    const finalTitle = title || portfolioConfig.seo.title;
    const finalDescription = description || portfolioConfig.seo.description;
    const url = `${portfolioConfig.siteUrl.replace(/\/$/, "")}${path}`;

    document.title = finalTitle;
    setMeta("description", finalDescription);
    setMeta("keywords", portfolioConfig.seo.keywords.join(", "));

    setLink("canonical", url);

    setMeta("og:title", finalTitle, "property");
    setMeta("og:description", finalDescription, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", url, "property");
    setMeta("og:site_name", portfolioConfig.name, "property");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", finalTitle);
    setMeta("twitter:description", finalDescription);

    setJsonLd("person-jsonld", {
      "@context": "https://schema.org",
      "@type": "Person",
      name: portfolioConfig.name,
      jobTitle: "Computer Science Student & Full-Stack Developer",
      url: portfolioConfig.siteUrl,
      email: `mailto:${portfolioConfig.email}`,
      sameAs: [portfolioConfig.github, portfolioConfig.linkedin, portfolioConfig.instagram],
    });

    setJsonLd("website-jsonld", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${portfolioConfig.name} — Portfolio`,
      url: portfolioConfig.siteUrl,
    });
  }, [title, description, path]);

  return null;
}
