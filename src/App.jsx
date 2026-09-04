import { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import StatusBar from "./components/StatusBar";
import BackToTop from "./components/BackToTop";
import CommandPalette from "./components/CommandPalette";
import Terminal from "./components/Terminal";
import EasterEgg from "./components/EasterEgg";
import useTheme from "./hooks/useTheme";
import useActiveSection from "./hooks/useActiveSection";
import useKonami from "./hooks/useKonami";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";

const Admin = lazy(() => import("./pages/Admin"));

const SECTION_IDS = ["home", "about", "skills", "projects", "education", "contact"];

export default function App() {
  const { mode, cycle } = useTheme();
  const activeSection = useActiveSection(SECTION_IDS);
  const location = useLocation();

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [eggVisible, setEggVisible] = useState(false);

  const showEgg = useCallback(() => {
    setEggVisible(true);
    setTimeout(() => setEggVisible(false), 3200);
  }, []);
  useKonami(showEgg);

  // Ctrl+K / Cmd+K opens the command palette from anywhere.
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll to top on route change (page navigations, not in-page anchors).
  useEffect(() => {
    if (location.pathname !== "/") window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navbar activeSection={activeSection} themeMode={mode} onCycleTheme={cycle} />

      <main className="flex-1 pb-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route
            path="/admin"
            element={
              <Suspense fallback={null}>
                <Admin />
              </Suspense>
            }
          />
        </Routes>
      </main>

      <Footer />

      <StatusBar
        activeSection={activeSection}
        onOpenPalette={() => setPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />
      <BackToTop />

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <EasterEgg show={eggVisible} />
    </div>
  );
}
