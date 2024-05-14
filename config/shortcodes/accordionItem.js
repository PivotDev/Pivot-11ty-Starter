module.exports = function(eleventyConfig) {
  eleventyConfig.addPairedNunjucksShortcode("accordionItem", function(content, data) {
    return `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading-${data.id}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${data.id}" aria-expanded="false" aria-controls="collapse-${data.id}">
            ${data.heading}
          </button>
        </h2>
        <div id="collapse-${data.id}" class="accordion-collapse collapse" aria-labelledby="heading-${data.id}">
          <div class="accordion-body">
            ${content}
          </div>
        </div>
      </div>
    `;
  });
};