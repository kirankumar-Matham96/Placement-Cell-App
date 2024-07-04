// const mozjpeg = require("imagemin-mozjpeg");

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Clean the dist directory
    clean: {
      build: ["dist"],
    },

    // Minify CSS files
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: "public/",
            src: ["*.css", "!*.min.css"],
            dest: "dist/",
            ext: ".min.css",
          },
        ],
      },
    },

    // Minify JavaScript files
    uglify: {
      my_target: {
        files: [
          {
            expand: true,
            cwd: "public/",
            src: ["*.js", "!*.min.js"],
            dest: "dist/",
            ext: ".min.js",
          },
        ],
      },
    },

    // replacing attached file extensions in index.html
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: /index.js/g,
              replacement: "index.min.js",
            },
            {
              match: /index.css/g,
              replacement: "index.min.css",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["public/index.html"],
            dest: "dist/",
          },
        ],
      },
    },

    // Minify HTML files
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: [
          {
            expand: true,
            cwd: "dist/",
            src: "*.html",
            dest: "dist/",
          },
        ],
      },
    },

    // minifying the image
    imagemin: {
      dynamic: {
        files: [
          {
            expand: true,
            cwd: "public/",
            src: ["**/*.{png,jpg,gif,jpeg}"],
            dest: "dist/",
          },
        ],
      },
    },

    // Inline CSS and JS into HTML files
    inline: {
      dist: {
        options: {
          cssmin: true,
          uglify: true,
          replace: true,
        },
        src: "dist/index.html",
        dest: "dist/combined.html",
      },
    },

    // replace: {
    //   dist: {
    //     options: {
    //       patterns: [
    //         {
    //           match: /"index.js"/g,
    //           replacement: '"index.min.js"',
    //         },
    //         {
    //           match: /"index.css"/g,
    //           replacement: '"index.min.css"',
    //         },
    //       ],
    //     },
    //     files: [
    //       {
    //         expand: true,
    //         flatten: true,
    //         src: ["public/index.html"],
    //         dest: "dist/",
    //       },
    //     ],
    //   },
    // },

    // replace file names/extensions in index.html file
    // replace: {
    //   dist: {
    //     options: {
    //       patterns: [
    //         {
    //           match: "index.js",
    //           replacement: "index.css.js",
    //         },
    //         {
    //           match: "index.css",
    //           replacement: "index.css.css",
    //         },
    //       ],
    //     },
    //     files: [
    //       {
    //         expand: true,
    //         flatten: true,
    //         src: ["public/index.html"],
    //         dest: "dist/",
    //       },
    //     ],
    //   },
    // },

    // replace: {
    //   dist: {
    //     options: {
    //       patterns: [
    //         {
    //           match: /"index.js"/g,
    //           replacement: '"index.min.js"',
    //         },
    //         {
    //           match: /"index.css"/g,
    //           replacement: '"index.min.css"',
    //         },
    //       ],
    //     },
    //     files: [
    //       {
    //         expand: true,
    //         flatten: true,
    //         src: ["public/index.html"],
    //         dest: "dist/",
    //       },
    //     ],
    //   },
    // },

    // replace: {
    //   files: [
    //     {
    //       expand: true,
    //       dot: true,
    //       // cwd: '<%= config.app %>',
    //       cwd: "public/",
    //       src: ["*.html"],
    //       dest: "dist/",
    //       rename: function (dest, src) {
    //         return dest + src.replace(/\.html$/, ".asp");
    //       },
    //     },
    //   ],
    // },
  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-replace");
  // grunt.loadNpmTasks("grunt-text-replace");
  grunt.loadNpmTasks("grunt-inline");
  grunt.loadNpmTasks("grunt-contrib-imagemin");

  // Default task(s).
  grunt.registerTask("default", [
    "clean",
    "cssmin",
    "uglify",
    "replace",
    "htmlmin",
    "imagemin",
    "inline",
  ]);
};
