// postcss.config.js
module.exports = {
    plugins: {
      'postcss-import': {},
      'postcss-nested': {},
      'postcss-preset-env': {
        features: { 'nesting-rules': false },
      },
      'postcss-custom-properties': {},
      'autoprefixer': {},
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    },
  }