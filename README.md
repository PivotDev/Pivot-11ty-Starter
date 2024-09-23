# 11ty Pivot 

Static site generation with Bootstrap 5 and Vite.js

## Built in settings and features

 - Dynamic component imports
 - Navigation plugin with data file for configuring html
 - SEO optimized meta include file with multiple fallbacks
 - Image plugin for performance
 - Sitemap generation

## Using Components

Components should be stored within the `includes/components/` directory. 

There is also a file called `components.njk` one level up in the includes directory. This file allows you to autoload all your components rather than manually importing each, and wraps each component in the required `{% macro %}` tags behind the scenes, so you can focus on markup.

Components can be passed a `params` object with any values you wish to make dynamic. Creating a simple button component would look like this:

    <a class="btn btn-{{ params.style }}">{{ params.title }}</a>

Let's assume we added this to a file located here: `includes/components/button.njk`. 

To use in a template, we would first need to import the main component file anywhere in the template above where we want our button:

    {%- from "./includes/components.njk" import component -%}

This is usually added at the top of any template file and gives you access to a `component` function that will load any component by name and pass in the parameters you provide.

Once imported, you could use the button component like so:

    {{ component("button", {style:"primary", title: "test button"}) }}

The `component` function is nice because it allows you to have direct access to all your components without manually importing each one you may want to use.

### Components with children

If you want to encapsulate a larger block of content within a component (for instance maybe the content in a modal), you can use nunjucks built in "call" tags.

Here's how you would modify the example from above.

First change the template to output "content", this will contain whatever children are passed:

    <a class="btn btn-{{ params.style }}">{{ content }}</a>

Then update the structure of where you are calling the actual component (the import statement remains the same).

    {% call component("button", {style:"primary"}) %}
      button using inner content
    {% endcall%}

This example is a bit contrived, since the button text could easily have been passed through the "title" variable we used previously. The power of this technique is that in between the `call` and `endcall` blocks you can add any HTML or Nunjucks code.

This is useful for components like accordions, modals, etc, where the inner content may be quite complex.

### What about normal includes?

Components are used for pieces of code that will be shared across the site, but with varying attributes.

Includes are still used when appropriate for shared sections that don't benefit as much from the ability to explicitly pass params and child content.
    
## Styles and organization

All scss/js is found under the assets folder and gets compiled by Vite.

Styles are organized in a way that closely lines up with the njk template files. 

Components each have thier own stylesheet since they can be used sitewide. Pages also each have their own stylesheet for specific styles to each page. These are generally fairly short since we make use of bootstrap components and our own njk components as well.

The common folder of styles hosts any additional setup that applies sitewide, but not to a component.

## Javascript

We strive to keep javascript dependencies light and stable. The following explains dependencies and why they are used:

  - Splide.js: Provides an accessible and performant carousel. There are many slider/carousel libraries out there, but we have found Splide to be the best for performance and accessibility.
  - Alpine.js: This library is an extremely minimal interactive framework. It powers the resource hub of the site and excels for creating client side interactivy you would see in a React.js app, without the overhead.
  - GSAP: There are many animation libraries out there, but GSAP consistently shines as the gold standard. We use it for any animation, motion, and scroll based interactivity.
  - Bootstrap: This is a Bootstrap based starter and we do makes use of some of the bootstrap javascript functionality as well.

Javascript is all compiled by Vite. We typically break the site's javascript into modules that are imported into the main index.js entry point. These modules will handle a single aspect, for instance the resource filtering or scroll-based animations.

## Data Cascade

We make use of many elements from the 11ty data cascade including global site data for things like meta tags, page specific front matter, and directory specific json files to set up front matter across many files.

For large collections of data a sample CSV importer is provided in the `scripts` directory. This will allow easy conversion of CSVs to json for use within your templates.

## Eleventy 3.0 Image Handling

The latest version of Eleventy introduces a new recommended way to process images. Rather than creating shortcodes, the 11ty.config.js file sets up the configuration for processing any `<img>` tags automatically. You can read more about this here:

https://www.11ty.dev/docs/plugins/image/#eleventy-transform