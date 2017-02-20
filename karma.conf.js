// Karma configuration
// Generated on Mon Feb 20 2017 16:13:56 GMT+0800 (CST)
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      './test/**/*.js'
    ],


    // list of files to exclude
    exclude: [
        'node_modules',
        'src'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './test/**/*.js':['webpack']
    },

    webpack:{
      resolve:{
        extensions:['*','.scss','.vue','.js'],
        alias:{
          vue:'vue/dist/vue.common.js'
        }
      },
      module:{
        rules:[{
          test:/\.js$/,
          loader:'babel-loader',
          exclude:/node_modules|dist|src/,
          include:/test/
        },{
          test:/\.scss$/,
          exclude:/node_modules/,
          include:/src/,
          use:[{
            loader:'style-loader'
          },{
            loader:'css-loader'
          },{
            loader:'sass-loader'
          }]
        },{
          test:/\.vue$/,
          loader:'vue-loader'
        }]
      }
    },

    webpackMiddleware:{
      noInfo:true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],

    plugins:[
        'karma-mocha',
        'karma-chrome-launcher',
        'karma-webpack',
        'karma-spec-reporter'
    ],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
