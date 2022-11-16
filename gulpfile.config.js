module.exports = {
  environment: process.env.NODE_ENV ?? 'production',
  output: './build',

  paths: {

    static: [
      './public/**/!(*.jpg|*.png|*.svg)'
    ],

    css: [
      './src/css/**/*.css'
    ],

    javascript: [
      './src/js/**/*.js'
    ],

    html: [
      './src/**/*.html'
    ],

    images: [
      './public/**/*.jpg',
      './public/**/*.png',
      './public/**/*.svg'
    ]

  }

}