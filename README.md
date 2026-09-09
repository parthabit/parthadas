# Partha Das — Developer Portfolio

A fast, dark-first developer portfolio built with React, Vite, Tailwind CSS,
and React Router. Every piece of personal content lives in `src/data/` —
you should never need to touch a component to update your info, add a
project, or change a link.

## Quick start 
 
```bash
npm install
npm run dev       # http://localhost:5173
```

## Build & deploy

```bash
npm run build      # outputs to dist/ (also regenerates sitemap.xml)
npm run preview    # preview the production build locally
```

`dist/` is a static site — deploy it to Vercel, Netlify, GitHub Pages, or
any static host. Before your first deploy:

1. Set your real domain in `src/data/portfolio.js` → `siteUrl`.
2. Update `public/robots.txt`'s `Sitemap:` line to match.
3. Set the Supabase environment variables on your host so the live
   backend connects (see "Backend (Supabase) & Admin Panel" below):
   - Vercel: Project → Settings → Environment Variables
   - Netlify: Site configuration → Environment variables
   - Add both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Run `npm run build` (this also regenerates `public/sitemap.xml`).

Without those two environment variables set, the site still works —
it just falls back to the static project data bundled in the code
instead of pulling from your live database, and `/admin` will show a
"backend not configured" message instead of the login form.

## Backend (Supabase) & Admin Panel

This portfolio has a real backend: a Supabase Postgres database + storage
bucket power the Projects section, with a `/admin` panel to manage
everything without touching code.

**What's already set up for you:**
- A `projects` table with Row Level Security (public read, authenticated-only write)
- A `project-images` storage bucket for cover photos and screenshots
- An admin login (see the credentials I gave you separately — change the
  password after your first login)
- All 15 of your repos seeded into the live database

**How it works:**
- The site fetches projects from Supabase on load. If Supabase is
  unreachable or not configured, it **automatically falls back** to the
  static data in `src/data/projects.js` — the site never breaks.
- Go to `/admin`, sign in, and you can add/edit/delete projects, upload
  cover images and screenshots, and see a live preview of the card as you
  type. Changes are live on the site immediately (no rebuild/redeploy
  needed) — Vite bundles just the publishable anon key, which is safe to
  expose client-side; the RLS policies are what actually gate writes to
  logged-in users.

**Environment variables** — set these wherever you deploy (Vercel/Netlify
project settings → Environment Variables), and in a local `.env` file for
`npm run dev` (see `.env.example`):

```
VITE_SUPABASE_URL=https://yjuuauhcmaexcvicnitm.supabase.co
VITE_SUPABASE_ANON_KEY=<the publishable/anon key I gave you>
```

Changing your admin password: sign in at `/admin`, then in the Supabase
dashboard go to Authentication → Users → your email → "Send password
reset" (or reset it directly there).

## How to update things

Everything below can be edited either in `src/data/` (for personal info,
skills, education) or via the `/admin` panel (for projects).

### 1. Add a project

Open `src/data/projects.js` and add an object to the `projects` array
(copy an existing one as a template). At minimum:

```js
{
  id: "my-new-project",       // unique, used in the URL
  title: "My New Project",
  category: "AI/ML",           // All | Web | AI/ML | JavaScript | Python | Other
  description: "One-line summary for the card.",
  status: "Completed",         // Completed | In Progress | Archived
  year: "2026",
  featured: true,               // show it prominently on the homepage
}
```

The project grid, filters, search, featured section, and detail page all
update automatically — nothing else to touch.

### 2. Update a project

Find its object in `src/data/projects.js` and edit the fields directly.

### 3. Add an image

1. Create `public/projects/<project-id>/` and drop your images in.
2. Point to them from the project object:
   ```js
   image: "/projects/my-new-project/cover.png",
   screenshots: [
     "/projects/my-new-project/1.png",
     "/projects/my-new-project/2.png",
   ],
   ```
   No `image`? The card shows a clean placeholder automatically.

### 4. Add a video

Any of these work:

```js
video: { type: "youtube", url: "https://youtube.com/watch?v=..." }
video: { type: "youtube", url: "https://youtube.com/shorts/..." }
video: { type: "vimeo", url: "https://vimeo.com/..." }
video: { type: "mp4", url: "https://.../demo.mp4" }
```

The video button/embed only appears when this field is set.

### 5. Add GitHub and live links

```js
github: "https://github.com/parthabit/my-new-project",
live: "https://my-new-project.vercel.app",
```

### 6. Change social links

Edit `src/data/portfolio.js` (`github`, `linkedin`, `instagram`, `email`,
`phone`). `src/data/socialLinks.js` reads from there automatically and
feeds the Navbar, Hero, Contact, and Footer. Set `show: false` on an entry
in `socialLinks.js` to hide it everywhere at once.

### 7. Change personal information

Everything — name, headline, hero tagline, About text, interests,
philosophy — lives in `src/data/portfolio.js`. Look for the comments
marking each editable block.

### 8. Add education / experience / certifications / achievements

Edit the arrays in `src/data/education.js`. Each track (Education,
Experience, Internships, Certifications, Achievements) automatically
hides itself if its array is empty — no blank sections ever show.

### 9. Add your resume

Drop your PDF at `public/resume/partha-das-resume.pdf` (or update the
`resume` path in `src/data/portfolio.js` to match a different filename).

### 10. Choose which GitHub repos are featured

Edit `src/data/repos.js` — add/remove repo names and toggle `featured`.
The GitHub section fetches live descriptions/stars/forks from the public
GitHub API at runtime (no token, nothing exposed client-side); if the
request fails it falls back to showing the repo name only.

### 11. Wire up the contact form

The form never talks to a fake backend. By default, submitting it opens
the visitor's email client with the message pre-filled. To collect
submissions directly, sign up for a form service (Formspree, Getform,
Web3Forms, etc.) and paste the endpoint into
`src/data/portfolio.js` → `contact.formEndpoint`.

### 12. Deploy the updated portfolio

```bash
npm run build
```

Upload the resulting `dist/` folder to your host of choice (or connect
the repo to Vercel/Netlify for automatic deploys on push).

## Project structure

```
src/
  components/     # Reusable, presentational — read data via props/imports
    admin/        # Admin-only: login form, project editor, project list
  data/           # ← You edit here for personal info/skills/education.
  hooks/          # useTheme, useActiveSection, useKonami, useTilt
  lib/            # Supabase client, auth/projects hooks, image upload,
                   # video URL parsing, social icon map
  pages/          # Home, Projects (view all), ProjectDetails, Admin
public/
  projects/       # Project images, one folder per project id (static fallback)
  resume/         # Your resume PDF
  robots.txt
  sitemap.xml     # Regenerated by `npm run generate:sitemap`
scripts/
  generate-sitemap.js
```

## Features included

- Real backend: Supabase database + storage power the Projects section,
  with a `/admin` panel to add/edit/delete projects and upload images —
  see "Backend (Supabase) & Admin Panel" above
- Animated 3D particle-network background in the hero (Three.js),
  mouse-reactive, themed for both dark and light mode
- 3D tilt-on-hover effect with a cursor-following glow on project cards
- Scroll-reveal animations throughout
- Responsive, accessible, dark/light/system theme (remembered via
  `localStorage`)
- Command palette (`Ctrl/Cmd + K`) for quick navigation
- Developer terminal (`help`, `about`, `projects`, `skills`, `github`,
  `contact`, `clear`) driven by the same data as the rest of the site
- Project search + category filtering with smooth animations
- Scroll progress indicator + status bar showing the active section
- Konami code easter egg
- `prefers-reduced-motion` respected throughout
- SEO: per-page meta tags, Open Graph, Twitter Card, canonical URLs,
  JSON-LD (Person + WebSite), `robots.txt`, generated `sitemap.xml`
- The contact form never talks to a fake backend — it either uses a form
  service you configure or falls back to opening the visitor's email client
