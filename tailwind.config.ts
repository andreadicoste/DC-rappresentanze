import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0F172A', // Navy Blue Professional
          dark: '#020617',    // Deepest Navy
          accent: '#2563EB',  // Royal Blue
          light: '#F8FAFC',   // Slate 50
          text: '#334155',    // Slate 700
          headings: '#1E293B', // Slate 800
        }
      },
      fontFamily: {
        sans: ['var(--font-inter, Inter)', 'system-ui', 'sans-serif'],
        display: ['Satoshi', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-corporate': 'linear-gradient(to bottom right, #F8FAFC, #E2E8F0)',
        'gradient-blue': 'linear-gradient(to right, #2563EB, #1D4ED8)',
      },
      boxShadow: {
        'glass': '0 20px 40px rgba(15, 23, 42, 0.05)',
        'soft': '0 10px 30px -10px rgba(0,0,0,0.05)',
        'glow': '0 0 20px rgba(37, 99, 235, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [
    typography,
  ],
};
export default config;
