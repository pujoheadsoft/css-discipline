module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-easy-import")({ glob: true}),
    require("postcss-simple-vars"),
    require("postcss-nested"),
    require("postcss-simple-vars")
  ]
};
