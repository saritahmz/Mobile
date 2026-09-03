const products = [
  {
    name: "Fit Me Matte + Poreless",
    brand: "Maybelline",
    category: "Base",
    price: 54.90,
    store: "Amazon",
    icon: "◉"
  },
  {
    name: "SuperStay Active Wear",
    brand: "Maybelline",
    category: "Base",
    price: 69.90,
    store: "Droga Raia",
    icon: "◉"
  },
  {
    name: "Fit Me Corretivo",
    brand: "Maybelline",
    category: "Corretivo",
    price: 39.90,
    store: "Época Cosméticos",
    icon: "◌"
  },
  {
    name: "Blush Feels",
    brand: "Ruby Rose",
    category: "Blush",
    price: 18.90,
    store: "Shopee",
    icon: "●"
  },
  {
    name: "Lash Sensational",
    brand: "Maybelline",
    category: "Máscara de cílios",
    price: 47.90,
    store: "Amazon",
    icon: "✦"
  },
  {
    name: "Super Stay Vinyl Ink",
    brand: "Maybelline",
    category: "Batom",
    price: 59.90,
    store: "Sephora",
    icon: "●"
  }
];

const brand = document.querySelector("#brand");
const category = document.querySelector("#category");
const productList = document.querySelector("#productList");
const productCount = document.querySelector("#productCount");
const searchFab = document.querySelector("#searchFab");

function money(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function productSkeletons() {
  productList.innerHTML = Array.from({ length: 3 })
    .map(
      () => `
        <div class="skeleton-card">
          <div class="skeleton skeleton-img"></div>

          <div>
            <div class="skeleton skeleton-line w40"></div>
            <div class="skeleton skeleton-line w80"></div>
            <div class="skeleton skeleton-line w60"></div>
            <div class="skeleton skeleton-line w40"></div>
          </div>
        </div>
      `
    )
    .join("");
}

function renderProducts(items) {
  productCount.textContent =
    `${items.length} ${items.length === 1 ? "item" : "itens"}`;

  if (!items.length) {
    productList.innerHTML = `
      <div class="empty">
        Nenhum produto encontrado.
      </div>
    `;
    return;
  }

  const lowest = Math.min(...items.map(product => product.price));

  productList.innerHTML = [...items]
    .sort((a, b) => a.price - b.price)
    .map(
      product => `
        <article class="product-card">

          <div class="thumb">
            ${product.icon}
          </div>

          <div>

            ${
              product.price === lowest
                ? `<span class="best">MELHOR PREÇO</span>`
                : ""
            }

            <h4>${product.name}</h4>

            <p class="meta">
              ${product.brand} · ${product.category}
            </p>

            <div class="price">
              ${money(product.price)}
            </div>

            <p class="meta">
              ${product.store}
            </p>

          </div>
        </article>
      `
    )
    .join("");
}

function searchProducts() {
  productSkeletons();

  const selectedBrand = brand.value.trim().toLowerCase();
  const selectedCategory = category.value.trim().toLowerCase();

  setTimeout(() => {
    const filteredProducts = products.filter(product => {
      const matchesBrand =
        !selectedBrand ||
        product.brand.toLowerCase().includes(selectedBrand);

      const matchesCategory =
        !selectedCategory ||
        product.category.toLowerCase() === selectedCategory;

      return matchesBrand && matchesCategory;
    });

    renderProducts(filteredProducts);
  }, 900);
}

searchFab.addEventListener("click", searchProducts);

brand.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    searchProducts();
  }
});

renderProducts(products);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .catch(console.error);
  });
}