/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        gold: {
          50: "#fdf9ec",
          100: "#faf0c8",
          200: "#f1e5ac",
          300: "#e8d089",
          400: "#dfb85a",
          500: "#daa520",
          600: "#b8871b",
          700: "#aa6c39",
          800: "#7a4f22",
          900: "#5c3b1a",
        },
        "primary-dark": "#AA6C39",
        "primary-light": "#F1E5AC",
        "text-dark": "#0f172a",
        "text-light": "#64748b",
        "extra-light": "#f8fafc",
        ink: {
          50: "#f6f6f9",
          100: "#ebebf1",
          200: "#cfd0dc",
          300: "#a6a8bd",
          400: "#787aa0",
          500: "#5c5e82",
          600: "#484a68",
          700: "#3a3b55",
          800: "#26273a",
          900: "#15151f",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      maxWidth: {
        "screen-2xl": "1400px",
        "custom-1200": "1200px",
        "custom-900": "900px",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        display: ["'Playfair Display'", "serif"],
      },
      boxShadow: {
        soft: "0 2px 20px -4px rgba(21, 21, 31, 0.08)",
        card: "0 8px 30px -8px rgba(21, 21, 31, 0.12)",
        "card-hover": "0 20px 40px -12px rgba(21, 21, 31, 0.22)",
        glow: "0 0 0 1px rgba(218,165,32,0.15), 0 8px 30px -6px rgba(218,165,32,0.35)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #f1e5ac 0%, #daa520 50%, #aa6c39 100%)",
        "ink-gradient": "linear-gradient(135deg, #26273a 0%, #15151f 100%)",
      },
      gridTemplateColumns: {
        "70/30": "70% 28%",
        "30/70": "30% 70%",
        "80/20": "80% 20%",
        "20/80": "20% 80%",
        "90/10": "90% 10%",
        "10/90": "10% 90%",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
