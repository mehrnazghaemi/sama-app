
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				appBackgroundColor: "#F6F7FB",
				primaryTextColor: "#434343",
				secondaryTextColor: "#272727",
				primaryRedColor: "#FD5248",
				secondaryRedColor: "#EA4C43",
				primaryBlueColor: "#1C518D",
			},
			fontFamily: {
				vazirmatn: ["Vazirmatn", "sans-serif"],
				kalameh: ["KalamehWebFaNum", "sans-serif"],
			},
			backgroundImage: {
				"wave-shape-indicator": "url('/src/assets/icons/indicator.svg')",
			},
		},
	},
	plugins: [],
	important: true,
};
