# 11ty Pivot Starter

A static site generation starter built with 11ty and Bootstrap 5.

### Built in settings and features

 - Dynamic shortcode imports to allow for quick component builds
 - Navigation plugin with data file for configuring html
 - SEO optimized meta include file with multiple fallbacks
 - Image plugin for performance
 - Sitemap generation

### Important note:

Currently the vite plugin has a bug with the 3.0.0 canary of 11ty. We have a custom modified version at `plugins/custom-vite-plugin`. When installing and running the site, be sure to navigate to this directory and run `npm install` as well to get the plugin dependencies.

This should just be a temporary patch that will be resolved soon.

## UPDATE:

Custom plugin is no longer used so you can skip the above step. It is still included for now as a safety in case a regression happens.