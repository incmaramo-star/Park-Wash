import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./tests/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "pw-blue": {
          50: "var(--pw-blue-50)",
          100: "var(--pw-blue-100)",
          200: "var(--pw-blue-200)",
          300: "var(--pw-blue-300)",
          400: "var(--pw-blue-400)",
          500: "var(--pw-blue-500)",
          600: "var(--pw-blue-600)",
          700: "var(--pw-blue-700)",
          800: "var(--pw-blue-800)",
          900: "var(--pw-blue-900)",
          950: "var(--pw-blue-950)"
        },
        "pw-ink": "var(--pw-ink)",
        "pw-graphite": "var(--pw-graphite)",
        "pw-slate": "var(--pw-slate)",
        "pw-mist": "var(--pw-mist)",
        "pw-fog": "var(--pw-fog)",
        "pw-cloud": "var(--pw-cloud)",
        "pw-paper": "var(--pw-paper)",
        "pw-white": "var(--pw-white)",
        "pw-signal": "var(--pw-signal)",
        "pw-alert": "var(--pw-alert)"
      },
      borderRadius: {
        xs: "var(--r-xs)",
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        xl: "var(--r-xl)",
        pill: "var(--r-pill)"
      },
      boxShadow: {
        1: "var(--sh-1)",
        2: "var(--sh-2)",
        3: "var(--sh-3)",
        blue: "var(--sh-blue)"
      },
      fontFamily: {
        display: "var(--f-display)",
        body: "var(--f-body)",
        mono: "var(--f-mono)"
      },
      spacing: {
        1: "var(--s-1)",
        2: "var(--s-2)",
        3: "var(--s-3)",
        4: "var(--s-4)",
        5: "var(--s-5)",
        6: "var(--s-6)",
        7: "var(--s-7)",
        8: "var(--s-8)",
        9: "var(--s-9)"
      }
    }
  },
  plugins: []
};

export default config;
