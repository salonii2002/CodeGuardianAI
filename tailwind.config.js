
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080D18",
        surface: {
          DEFAULT: "#111B2E",
          elevated: "#17243A",
          floating: "#1E293B",
        },
        border: "#263750",
        brand: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
          dark: "#1D4ED8",
        },
        accent: {
          DEFAULT: "#22D3EE",
        },
        emerald: {
          DEFAULT: "#10B981",
        },
        agent: {
          security: "#F43F5E",
          quality: "#3B82F6",
          testing: "#10B981",
          documentation: "#F59E0B",
        },
        severity: {
          high: "#F97316",
          medium: "#EAB308",
          low: "#3B82F6",
          info: "#94A3B8",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#CBD5E1",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "16px",
        panel: "20px",
        spatial: "24px",
      },
      boxShadow: {
        brand: "0 8px 30px rgba(37, 99, 235, 0.22)",
      },
    },
  },
  plugins: [],
};
