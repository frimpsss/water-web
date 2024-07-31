/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mantis: {
          50: "#ebf8ff",
          100: "#d1efff",
          200: "#aee3ff",
          300: "#76d5ff",
          400: "#35bbff",
          500: "#0795ff",
          600: "#006fff",
          700: "#0056ff",
          800: "#0047d7",
          900: "#0042aa",
          950: "#062865",
        },
        "blaze-orange": {
          50: "#fff8ec",
          100: "#fff0d3",
          200: "#ffdea5",
          300: "#ffc56d",
          400: "#ffa032",
          500: "#ff830a",
          600: "#ff6a00",
          700: "#cc4c02",
          800: "#a13b0b",
          900: "#82330c",
          950: "#461704",
        },
        "golden-fizz": {
          50: "#fdfee8",
          100: "#fbffc2",
          200: "#fcff89",
          300: "#fffc41",
          400: "#fdf012",
          500: "#ecd506",
          600: "#cca802",
          700: "#a37905",
          800: "#865e0d",
          900: "#724d11",
          950: "#432905",
        },
        scarlet: {
          50: "#fff3ec",
          100: "#ffe4d3",
          200: "#ffc6a5",
          300: "#ff9e6d",
          400: "#ff6932",
          500: "#ff420a",
          600: "#ff2600",
          700: "#cc1602",
          800: "#a1130b",
          900: "#82130c",
          950: "#460504",
        },
        "mountain-mist": {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#929292",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#262626",
        },
        ebony: {
          50: "#e8f3ff",
          100: "#d6e8ff",
          200: "#b5d4ff",
          300: "#89b5ff",
          400: "#5a88ff",
          500: "#355cff",
          600: "#122bff",
          700: "#081efa",
          800: "#0a1ec9",
          900: "#13259c",
          950: "#040720",
        },
        white: {
          50: "#ffffff",
          100: "#efefef",
          200: "#dcdcdc",
          300: "#bdbdbd",
          400: "#989898",
          500: "#7c7c7c",
          600: "#656565",
          700: "#525252",
          800: "#464646",
          900: "#3d3d3d",
          950: "#292929",
        },
        red: {
          50: "#fff0f0",
          100: "#ffdddd",
          200: "#ffc0c0",
          300: "#ff9494",
          400: "#ff5757",
          500: "#ff2323",
          600: "#ff0000",
          700: "#d70000",
          800: "#b10303",
          900: "#920a0a",
          950: "#500000",
        },
        pending: {
          bg: "hsl(49, 100%, 97%)",
          text: "hsl(31, 92%, 45%)",
          border: "hsl(49, 91%, 91%)",
        },
        success: {
          bg: "hsl(143, 85%, 96%)",
          border: "hsl(145, 92%, 91%)",
          text: "hsl(140, 100%, 27%)",
        },
        error: {
          bg: "hsl(359, 100%, 97%)",
          border: "hsl(359, 100%, 94%)",
          text: "hsl(360, 100%, 45%)",
        },
        tremor: {
          brand: {
            faint: colors.blue[50],
            muted: colors.blue[200],
            subtle: colors.blue[400],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[700],
            inverted: colors.white,
          },
          background: {
            muted: colors.gray[50],
            subtle: colors.gray[100],
            DEFAULT: colors.white,
            emphasis: colors.gray[700],
          },
          border: {
            DEFAULT: colors.gray[200],
          },
          ring: {
            DEFAULT: colors.gray[200],
          },
          content: {
            subtle: colors.gray[400],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[700],
            strong: colors.gray[900],
            inverted: colors.white,
          },
        },
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
