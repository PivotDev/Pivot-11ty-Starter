const fs = require('fs');
const path = require('path')
const inspect = require("util").inspect;

const pluginRss = require("@11ty/eleventy-plugin-rss"); // needed for absoluteUrl SEO feature
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
// const EleventyVitePlugin = require("./config/custom-vite-plugin"); // CUSTOM VERSION 
const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const yaml = require("js-yaml"); // Because yaml is nicer than json for editors

require('dotenv').config();

// Set up our globals
const baseUrl = process.env.BASE_URL || "http://localhost:8080";
console.log('-----')
console.log(`BASE URL: ${baseUrl}`);
console.log('-----')

const buildMode = process.env.BUILD_MODE || "dev";
console.log('-----')
console.log(`BUILD MODE: ${buildMode}`)
console.log('-----')


const globalSiteData = {
  title: "11ty Starter Site",
  description: "This is a basic 11ty starter template with my most commonly used features and modern tooling",
  locale: 'en',
  baseUrl: baseUrl,
  buildMode: buildMode
}

// Dynamically find all shortcodes - disable if not using
const shortcodesPath = path.resolve(__dirname, './config/shortcodes');
const shortcodeFiles = fs.readdirSync(shortcodesPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  } else {
    return files
  }
})


module.exports = function(eleventyConfig) {

  /* --- GLOBAL DATA --- */
  
  eleventyConfig.addGlobalData("site", globalSiteData);

  /* --- YAML SUPPORT --- */
  
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));

  /* --- PASSTHROUGHS --- */

  eleventyConfig.addPassthroughCopy('src/assets/css')
	eleventyConfig.addPassthroughCopy('src/assets/js')
  eleventyConfig.addPassthroughCopy('src/public')


  /* --- PLUGINS --- */

  eleventyConfig.addPlugin(pluginRss); // just includes absolute url helper function
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      build: {
        copyPublicDir: true
      },
      resolve:{
        alias:{
          // Allow references to `node_modules` directly for bundling.
          '/node_modules': path.resolve(".", '/node_modules'),
          '~bootstrap': path.resolve(__dirname, './node_modules/bootstrap'),
          '~public': path.resolve(__dirname, './public'),
          // Note that bare module specifiers are also supported
        },
      },
    }
  });

  /* --- SHORTCODES --- */

  // Output year for copyright notices
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Imported shortcodes - disable if not using
  shortcodeFiles.forEach(file => {
    // Check if file has .js extension
    if (path.extname(file) === '.js') {
      // Construct the module path
      const modulePath = path.join(shortcodesPath, file);
      
      // Dynamically require the module
      const module = require(modulePath);
      
      // Check if the module exports a function with the same name
      if (typeof module === 'function') {
        // Call the function
        module(eleventyConfig);
      }
    }
  });

  /* --- RESPONSIVE IMAGES --- */

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",

		// Add any other Image utility options here:

		// optional, output image formats
		formats: ["webp", "jpeg"],
		// formats: ["auto"],

		// optional, output image widths
		// widths: ["auto"],

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});


  /* --- CUSTOM COLLECTION CONFIGURATION --- */

  // EXAMPLE ONLY
	// eleventyConfig.addCollection("postCustomSort", function (collectionApi) {
	// 	return collectionApi.getFilteredByTag("post").sort(function (a, b) {
	// 		//return a.order - b.order; // sort by custom order key - ascending
	// 		return b.order - a.order; // sort by custom order key - descending
	// 		//return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
	// 		//return b.inputPath.localeCompare(a.inputPath); // sort by path - descending
	// 	});
	// });


  /* --- FILTERS --- */

  // Useful "debug" filter for dumping all variable data to screen
  eleventyConfig.addFilter("debug", (content) => `<pre>${inspect(content)}</pre>`);

  // Custom Random Helper Filter (useful for ID attributes)
  eleventyConfig.addFilter("generateRandomIdString", function (prefix) {
    return prefix + "-" + Math.floor(Math.random() * 1000000);
  });

  // Detect if a child link is active and output a class
  eleventyConfig.addFilter("childLinkIsActive", function(array, value) {
    // Check if the value exists in the array
    let hasActiveChild = false
    array.forEach(item => {
      if(item.url === value){
        hasActiveChild = true
      }
    })
    return hasActiveChild ? "child-active" : "";
  })


  /* --- BASE CONFIG --- */

  return {
    dir: {
      input: "./src",
      output: "./_site",
      includes: "includes", // this path is releative to input-path (src/)
      layouts: "layouts", // this path is releative to input-path (src/)
      data: "data", // this path is releative to input-path (src/)
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};