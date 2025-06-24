document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  if (!productList || !window.products) return;

  productList.innerHTML = window.products.map(product => {
    const fullStars = "⭐ ".repeat(Math.floor(product.rating));
    const ratingStars = fullStars;

    const badgeLeft = product.tags[0]
      ? `<span class="absolute z-10 top-2 left-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded shadow">${product.tags[0]}</span>`
      : "";

    const badgeRight = product.tags[1]
      ? `<span class="absolute z-10 top-2 right-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded shadow">${product.tags[1]}</span>`
      : "";

    return `
      <div>
        <div class="relative w-full h-60 overflow-hidden rounded-lg shadow-md">
          ${badgeLeft}
          ${badgeRight}
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
          <h3 class="font-semibold uppercase">${product.name}</h3>
          <p class="text-gray-600">$${product.price.toFixed(2)}</p>
          <div class="flex items-center mt-1">
            <span class="mr-2">${ratingStars}</span>
            <span class="text-gray-500 text-sm">(${product.reviews} reviews)</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
});
