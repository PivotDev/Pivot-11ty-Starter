# 11ty Pivot Starter

A static site generation starter built with 11ty and Bootstrap 5.

## Built in settings and features

 - Dynamic shortcode imports
 - Dynamic component imports
 - Navigation plugin with data file for configuring html
 - SEO optimized meta include file with multiple fallbacks
 - Image plugin for performance
 - Sitemap generation

When building with this starter you have two options for reusable components. The tradeoffs and how to use each are found below:

## Using Components

Components should be stored within the `includes/components/` directory. There is a file called `components.njk` in the main includes directory that will autoload each of these and pass in the correct parameters.

Components use the underlying "Macro" functionality of Nunjucks, which lets you scope variables to the component itself.

Components will be passed a `params` object that contains any options you choose to pass. Creating a simple button component would look like this:

    <a class="btn btn-{{ params.style }}">{{ params.title }}</a>

To use this component assuming it is at `includes/components/button.njk` in a template you would first add

    {%- from "./includes/components.njk" import component -%}

To the top of the template file to import the component loader. Then you could use the component like so:

    {{ component("button", {style:"primary", title: "test button"}) }}

This is extremely useful for reusing components across a site with support for variants based on the data passed.

### Components with children

If you want to encapsulate a larger block of content within a component (for instance maybe the content in a modal), you can use nunjucks built in "call" tags.

Here's how you would modify the example from above.

First change the template to output "content", this will contain whatever children are passed:

    <a class="btn btn-{{ params.style }}">{{ content }}</a>

Then update the structure of where you are calling the actual component (the import statement remains the same).

    {% call component("button", {style:"primary"}) %}
      button using inner content
    {% endcall%}

This example is a bit contrived since this could easily have been pased through the "title" variable we used, but in between the call and endcall blocks you can add any HTML or Nunjucks code.

This is very useful for components like accordions, modals, etc where the inner content may be quite complex.

## Custom Shortcodes

This section is a work in progress... More info coming soon.
    

## Important note:

Currently the vite plugin has a bug with the 3.0.0 canary of 11ty. We have a custom modified version at `plugins/custom-vite-plugin`. When installing and running the site, be sure to navigate to this directory and run `npm install` as well to get the plugin dependencies.

This should just be a temporary patch that will be resolved soon.

#### UPDATE:

Custom plugin is no longer used so you can skip the above step. It is still included for now as a safety in case a regression happens.