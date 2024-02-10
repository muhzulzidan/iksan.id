import type { Config } from "tailwindcss"


import colors from 'tailwindcss/colors'

const config = {
  darkMode: ["class"],
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    colors: {
      "secondary1": '#3B80FF',
      purple: colors.purple,
      stone: colors.stone,
      gray: colors.stone,
      blue: colors.blue,
      white: colors.white,
      green: colors.green,
      orange: colors.orange,
      yellow: colors.yellow,
      pink: colors.pink,
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        'costum': 'rgba(0, 0, 0, 0.075) 0px 10px 30px 0px',
      },
      colors: {
        green: {
          50: '#00A26E',
        },
        orange: {
          50: '#F25607',
        },
        yellow: {
          50: '#FFB50C',
        },
        pink:{
          50: '#3B80FF',
        },
        "primary1": '#FF006E',
        "secondary1": '#3B80FF',
        "secondary2": '#8038E3',
        "secondary3": '#FFB50C',
        "tertiary1": '#00A26E',
        "tertiary2": '#F25607',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "bannermoveleft": {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-50% - (theme(spacing.8) / 2)))' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      fontFamily: {

        kanakiraBold: ['var(--font-Kanakira-BoldInktrap)'],
        kanakiraItalic: ['var(--font-Kanakira-BoldInktrapItalic)'],
        kanakiraHeavy: ['var(--font-Kanakira-HeavyInktrap)'],
        kanakiraHeavyItalic: ['var(--font-Kanakira-HeavyInktrapItalic)'],
        mabryBold: ['var(--font-MabryPro-Bold)'],
        mabryBoldItalic: ['var(--font-MabryPro-BoldItalic)'],
        mabryItalic: ['var(--font-MabryPro-Italic)'],
        mabryLight: ['var(--font-MabryPro-Light)'],
        mabryLightItalic: ['var(--font-MabryPro-LightItalic)'],
        mabryRegular: ['var(--font-MabryPro-Regular)'],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'left': 'bannermoveleft 20s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography'),],
} satisfies Config

export default config