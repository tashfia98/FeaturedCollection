document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  if (!productList || !window.products) return;

  // Render all products with a data-index attribute
  productList.innerHTML = window.products.map((product, index) => {
    const ratingStars = "★".repeat(Math.floor(product.rating));

    const badgeLeft = product.tags[0]
      ? `<span class="bg-white border-2 border-solid border-black text-black text-[8px] md:text-xs font-semibold px-2 py-1 rounded-full">${product.tags[0]}</span>`
      : "";

    const badgeRight = product.tags[1]
      ? `<span class="bg-[#6B7B5A] border-2 border-solid border-black text-white text-[8px] md:text-xs font-semibold px-2 py-1 rounded-full">${product.tags[1]}</span>`
      : "";

    return `
      <div class="product-card md:w-[250px] ${index > 3 ? 'hidden md:block' : ''}" data-index="${index}">
        <div class="relative w-full aspect-square overflow-hidden rounded-lg shadow-md">
          <div class="px-2 w-full absolute top-2 z-10 flex flex-wrap justify-between gap-0.5">
            ${badgeLeft}
            ${badgeRight}
          </div>
          <img
            src="${product.image}"
            alt="${product.name}"
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 hover:opacity-0"
          >
          <img
            src="${product.hoverImage}"
            alt="${product.name} Hover"
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 hover:opacity-100"
          >
        </div>
        <div class="p-2">
          <h3 class="font-semibold uppercase max-md:text-sm">${product.name}</h3>
          <p class="text-black-600 max-md:text-xs">$${product.price.toFixed(2)}</p>
          <div class="flex items-center flex-wrap mt-1">
            <span class="mr-2">${ratingStars}</span>
            <span class="text-gray-500 text-xs max-md:text-[10px]">(${product.reviews} reviews)</span>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Add Show More / Show Less button
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Show More";
  toggleButton.className = "block md:hidden mt-4 mx-auto px-4 py-2 bg-black text-white rounded-full w-full";
  productList.parentElement.appendChild(toggleButton);

  let expanded = false;

  toggleButton.addEventListener("click", () => {
    expanded = !expanded;
    document.querySelectorAll(".product-card").forEach(card => {
      const index = parseInt(card.getAttribute("data-index"), 10);
      if (index > 3) {
        card.classList.toggle("hidden", !expanded);
      }
    });
    toggleButton.textContent = expanded ? "Show Less" : "Show More";
  });
});
