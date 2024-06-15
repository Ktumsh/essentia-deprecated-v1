/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: {
    files: [
      "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
      "./node_modules/flowbite/**/*.js",
    ],
  },
  theme: {
    container: {
      screens: {
        xl: "1280px",
      },
    },
    extend: {
      colors: {
        link: "rgb(33 47 61)",
        "link-h": "rgb(33 47 61 / 87%)",
        "link-m": "rgb(33 47 61 / 60%)",
        "link-d": "rgb(33 47 61 / 38%)",
        "link-dark-f": "rgb(203 213 225)",
        "link-dark-h": "rgb(203 213 225 / 87%)",
        "link-dark-m": "rgb(203 213 225 / 60%)",
        "link-dark-d": "rgb(203 213 225 / 38%)",
        shark: {
          50: "#f6f8f9",
          100: "#eceff2",
          200: "#d4dce3",
          300: "#aebecb",
          400: "#829aae",
          500: "#637e94",
          600: "#4e657b",
          700: "#405264",
          800: "#384654",
          900: "#323d48",
          950: "#191e24",
        },
        disco: {
          50: "#fcf3f9",
          100: "#fae9f5",
          200: "#f6d4eb",
          300: "#f1b0da",
          400: "#e680c1",
          500: "#db59a8",
          600: "#c83a89",
          700: "#ad296f",
          800: "#8f255c",
          900: "#7e2553",
          950: "#480f2d",
        },
        "radical-red": {
          50: "#ffeff1",
          100: "#ffe0e6",
          200: "#ffc6d3",
          300: "#ff97ae",
          400: "#ff5d83",
          500: "#ff245e",
          600: "#ff004d",
          700: "#d70041",
          800: "#b4003f",
          900: "#99023c",
          950: "#57001b",
        },
        broom: {
          50: "#fdfee8",
          100: "#fcffc2",
          200: "#fcff87",
          300: "#fffc43",
          400: "#fff024",
          500: "#efd503",
          600: "#cea700",
          700: "#a47804",
          800: "#885e0b",
          900: "#734c10",
          950: "#432805",
        },
        bittersweet: {
          50: "#fef3f2",
          100: "#fee5e2",
          200: "#ffcfc9",
          300: "#fdada4",
          400: "#fa8072",
          500: "#f15442",
          600: "#df3623",
          700: "#bb2b1a",
          800: "#9b2619",
          900: "#80261c",
          950: "#460f09",
        },
        orient: {
          50: "#e7fffd",
          100: "#c2fffb",
          200: "#8cfff7",
          300: "#3dfff2",
          400: "#00ffee",
          500: "#00f2ff",
          600: "#00bfe3",
          700: "#0096b5",
          800: "#007690",
          900: "#00627b",
          950: "#004055",
        },
        "cerise-red": {
          50: "#fdf3f4",
          100: "#fce7eb",
          200: "#f8d3db",
          300: "#f2afbc",
          400: "#ea8299",
          500: "#da4167",
          600: "#c93560",
          700: "#a92751",
          800: "#8e2349",
          900: "#7a2143",
          950: "#430e21",
        },
        bunker: {
          50: "#f0f7ff",
          100: "#e0edfe",
          200: "#badbfd",
          300: "#7dbefc",
          400: "#389ef8",
          500: "#0e81e9",
          600: "#0264c7",
          700: "#034fa1",
          800: "#074585",
          900: "#0c3a6e",
          950: "#020912",
        },

        "aths-special": {
          50: "#f7f7ef",
          100: "#ebebd3",
          200: "#dad9ae",
          300: "#c5c07f",
          400: "#b4aa5b",
          500: "#a5964d",
          600: "#8d7b41",
          700: "#725e36",
          800: "#614f32",
          900: "#54442f",
          950: "#302418",
        },
        dandelion: {
          50: "#fefaec",
          100: "#fbf2ca",
          200: "#f7e490",
          300: "#f4d35e",
          400: "#f0bd2f",
          500: "#ea9e16",
          600: "#cf7910",
          700: "#ac5611",
          800: "#8c4414",
          900: "#733714",
          950: "#421c06",
        },
        midnight: {
          50: "#ecfaff",
          100: "#d4f2ff",
          200: "#b2e9ff",
          300: "#7ddeff",
          400: "#41c8ff",
          500: "#15a8ff",
          600: "#0087ff",
          700: "#006ffe",
          800: "#0059cd",
          900: "#084da0",
          950: "#061b37",
        },
        "cerise-red": {
          50: "#fdf3f4",
          100: "#fce7eb",
          200: "#f8d3db",
          300: "#f2afbc",
          400: "#ea8299",
          500: "#da4167",
          600: "#c93560",
          700: "#a92751",
          800: "#8e2349",
          900: "#7a2143",
          950: "#430e21",
        },
      },
      backgroundColor: {
        wash: "rgb(255 255 255)",
        "wash-dark": "#061B37",
        "wash-full-dark": "#041225",
      },
      borderColor: {
        wash: "rgb(255 255 255)",
        "wash-dark": "#061B37",
        "wash-full-dark": "#041225",
      },
      boxShadow: {
        nav: "0 16px 32px -16px rgba(0,0,0,.1),0 0 0 1px hsl(210, 30%, 18%, .1)",
        "nav-dark":
          "0 16px 32px -16px rgba(0, 0, 0, .1), 0 0 0 1px hsla(6, 93%, 71%, .15)",
      },

      fontFamily: {
        roboto: '"Roboto", sans-serif',
        grotesk: '"Space Grotesk", sans-serif',
        monasans:
          '"Mona Sans", "Mona Sans Header Fallback", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        motivasans: '"Motiva Sans", Arial, Helvetica, sans-serif',
      },

      backgroundImage: {
        noise: "url(/extras/noise.webp)",
      },

      screens: {
        xs: "375px",
        "3xl": "1919px",
      },

      animation: {
        "shine-infinite": "shine 2s ease-in-out infinite",
      },

      keyframes: {
        shine: {
          "0%": { transform: "skew(-12deg) translateX(-100%)" },
          "100%": { transform: "skew(-12deg) translateX(100%)" },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
