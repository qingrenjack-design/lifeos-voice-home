import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orangeMain: "#FF6A00",
        orangeSoft: "#FF8A35",
        peachBg: "#FFDCC7",
        blueBg: "#E6F1FF",
        offWhite: "#FAFAFB",
        textMain: "#2B2F36",
        textSubtle: "#6B7280",
        dangerRed: "#FF4D37"
      },
      fontFamily: {
        sans: [
          "Source Han Sans CN",
          "Noto Sans SC",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 12px 40px rgba(31, 41, 55, 0.08)",
        mascot: "0 24px 80px rgba(255, 106, 0, 0.18)"
      }
    }
  },
  plugins: []
} satisfies Config;
