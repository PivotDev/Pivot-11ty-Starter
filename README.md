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

Components should be stored within the `includes/components/` directory. 

There is also a file called `components.njk` one level up in the includes directory. This file allows you to autoload all your components rather than manually importing each, and wraps each component in the required `{% macro %}` tags behind the scenes, so you can focus on markup.

Components can be passed a `params` object with any values you wish to make dynamic. Creating a simple button component would look like this:

    <a class="btn btn-{{ params.style }}">{{ params.title }}</a>

Let's assume we added this to a file located here: `includes/components/button.njk`. 

To use in a template, we would first need to import the main component file anywhere in the template above where we want our button:

    {%- from "./includes/components.njk" import component -%}

This gives you access to a `component` function that will load any component by name and pass in the parameters you provide.

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

## Custom Shortcodes

This section is a work in progress... More info coming soon.
    

## Important note:

Currently the vite plugin has a bug with the 3.0.0 canary of 11ty. We have a custom modified version at `plugins/custom-vite-plugin`. When installing and running the site, be sure to navigate to this directory and run `npm install` as well to get the plugin dependencies.

This should just be a temporary patch that will be resolved soon.

#### UPDATE:

Custom plugin is no longer used so you can skip the above step. It is still included for now as a safety in case a regression happens.