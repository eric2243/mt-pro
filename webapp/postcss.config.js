// postcss.config.js 
module.exports = { plugins: { 
"postcss-preset-env": { autoprefixer: { flexbox: 'no-2009', }, stage: 3, }, "postcss-px-to-viewport": { viewportWidth: 750, viewportHeight: 1334, unitPrecition: 3, viewportUnit: "vw", selectorBlackList: [ ".ignore", ".hiarlines" ], minPixelValue: 1, mediaQuery: false }
}, }