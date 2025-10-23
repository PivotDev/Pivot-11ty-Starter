import fs from 'fs';
import path from 'path';
import { inspect } from 'util';
import { fileURLToPath } from 'url';

import EleventyPluginRss from '@11ty/eleventy-plugin-rss'
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import YAML from "yaml";



import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv.config();


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
  metaImage: "",
  baseUrl: baseUrl,
  buildMode: buildMode
}


export default function (eleventyConfig) {

  /* --- GLOBAL DATA --- */
  
  eleventyConfig.addGlobalData("site", globalSiteData);

  /* --- YAML SUPPORT --- */
  
  eleventyConfig.addDataExtension("yaml", (contents) => YAML.parse(contents));
  eleventyConfig.addDataExtension("yml", (contents) => YAML.parse(contents));

  /* --- PASSTHROUGHS --- */

  eleventyConfig.addPassthroughCopy('src/assets/css')
	eleventyConfig.addPassthroughCopy('src/assets/js')
  eleventyConfig.addPassthroughCopy('src/assets/images') // maybe not needed?
  eleventyConfig.addPassthroughCopy('src/public')


  /* --- PLUGINS --- */

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyPluginRss)
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: ".11ty-vite",
    viteOptions: {
      appType: "mpa",
       // Default name of the temp folder
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

  /* --- RESPONSIVE IMAGES --- */

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",

		// Add any other Image utility options here:

		// optional, output image formats
		formats: ["webp", "jpeg", "svg"],
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

	eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

  // Useful "debug" filter for dumping all variable data to screen
  eleventyConfig.addFilter("debug", (content) => `<pre>${inspect(content)}</pre>`);

  eleventyConfig.addFilter('toJson', JSON.stringify);

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
			input: 'src',
			// better not use "public" as the name of the output folder (see above...)
			output: '_site',
			includes: '_includes',
			layouts: 'layouts',
			data: '_data'
		},
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};