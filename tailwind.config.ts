import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(date-picker|button|ripple|spinner|calendar|date-input|popover).js"
  ],
  
  theme: {
    extend: {
      colors: {
        "myColor": {
          "50": "#eff0fe",
          "100": "#e0e0fc",
          "200": "#c1c2f9",
          "300": "#a1a3f7",
          "400": "#8285f4",
          "500": "#6366f1",
          "600": "#4f52c1",
          "700": "#3b3d91",
          "800": "#282960",
          "900": "#141430"
        }
      },
    },
  },
  
  
  plugins: [nextui()],
};
export default config;
