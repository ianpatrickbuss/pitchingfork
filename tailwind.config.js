module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: ["./src/**/*.svelte", "./src/**/*.html", "./public/**/*.html"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
