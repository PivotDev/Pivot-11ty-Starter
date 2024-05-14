module.exports = function(eleventyConfig) {
  eleventyConfig.addPairedNunjucksShortcode("accordion", function(content) {
    return `
      <div class="accordion">
        ${content}
      </div>
    `;
  });
};