/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from "fluid-tailwind";
export default {
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    extract,
  },
  theme: {
    screens,
    fontSize: {
      "fluid-sm": "clamp(0.875rem, 1vw + 0.5rem, 1.25rem)",
      "fluid-lg": "clamp(1.25rem, 2vw + 0.75rem, 100rem)",
    },

    padding: {
      "fluid-sm": "clamp(0.5rem, 1vw + 0.25rem, 1rem)",
      "fluid-lg": "clamp(1rem, 2vw + 0.5rem, 30rem)",
    },
    extend: {
      screens: {
        xs: { max: "450px" },
        xss: { max: "380px" },
      },
    },
  },
  plugins: [fluid],
};
