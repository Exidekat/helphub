// site/tailwind.config.js
module.exports = {
  content: [
    "./frontend/**/*.{js,ts,jsx,tsx}",
    "./frontend/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',
        secondary: '#4B5563',
        accent: '#10B981',
        bg: '#111827',
        text: '#F9FAFB'
      }
    }
  },
  plugins: []
};
