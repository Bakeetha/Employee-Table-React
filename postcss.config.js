module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false
      }
    }),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};




// module.exports = {
//   plugins: {
//     tailwindcss: [
//       require("./tailwind.config.js")
//     ],
//     autoprefixer: {},
//   },
// };




// module.exports = {
//   plugins: {
//     tailwindcss: ,
//     autoprefixer: {},
//   },
// }
