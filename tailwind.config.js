/** @type {import('tailwindcss').Config} */
function withOpacity(varName) {
  return ({ opacityValue }) =>
    opacityValue !== undefined
      ? `rgb(var(${varName}) / ${opacityValue})`
      : `rgb(var(${varName}))`;
}

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: withOpacity("--ink-950"),
          900: withOpacity("--ink-900"),
          850: withOpacity("--ink-850"),
          800: withOpacity("--ink-800"),
          700: withOpacity("--ink-700"),
        },
        paper: {
          50: withOpacity("--paper-50"),
          100: withOpacity("--paper-100"),
          400: withOpacity("--paper-400"),
        },
        fog: {
          400: withOpacity("--fog-400"),
          500: withOpacity("--fog-500"),
        },
        signal: {
          400: withOpacity("--signal-400"),
          500: withOpacity("--signal-500"),
          600: withOpacity("--signal-600"),
        },
        ok: {
          500: withOpacity("--ok-500"),
        },
        warn: {
          500: withOpacity("--warn-500"),
        },
        muted2: {
          500: withOpacity("--muted2-500"),
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-dots":
          "radial-gradient(circle, rgba(140,150,170,0.16) 1px, transparent 1px)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: 0.55 },
          "50%": { opacity: 0.9 },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "glow-pulse": "glow-pulse 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
