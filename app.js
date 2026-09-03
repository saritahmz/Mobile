const products = [
  {
    id: 1,
    name: "Fit Me Matte + Poreless",
    brand: "Maybelline",
    category: "Base",
    price: 54.90,
    store: "Amazon",
    icon: "◉"
  },
  {
    id: 2,
    name: "SuperStay Active Wear",
    brand: "Maybelline",
    category: "Base",
    price: 69.90,
    store: "Droga Raia",
    icon: "◉"
  },
  {
    id: 3,
    name: "Fit Me Corretivo",
    brand: "Maybelline",
    category: "Corretivo",
    price: 39.90,
    store: "Época Cosméticos",
    icon: "◌"
  },
  {
    id: 4,
    name: "Blush Feels",
    brand: "Ruby Rose",
    category: "Blush",
    price: 18.90,
    store: "Shopee",
    icon: "●"
  },
  {
    id: 5,
    name: "Lash Sensational",
    brand: "Maybelline",
    category: "Máscara de cílios",
    price: 47.90,
    store: "Amazon",
    icon: "✦"
  },
  {
    id: 6,
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
const wishlistList = document.querySelector("#wishlist");
const wishlistCount = document.querySelector("#wishlistCount");
const searchFab = document.querySelector("#searchFab");
const navItems = document.querySelectorAll(".nav-item[data-view]");
const views = document.querySelectorAll(".view");
const wishlistTopBtn = document.querySelector("#wishlistTopBtn");

let wishlist = JSON.parse(localStorage.getItem("beautyWishlist")) || [];

function money(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function saveWishlist() {
  localStorage.setItem(
    "beautyWishlist",
    JSON.stringify(wishlist)
  );
}

function isFavorite(id) {
  return wishlist.some(product => product.id === id);
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

          <div class="product-info">

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

          <button
            class="favorite-btn ${isFavorite(product.id) ? "active" : ""}"
            data-id="${product.id}"
            aria-label="Adicionar à lista de desejos"
          >
            ${isFavorite(product.id) ? "♥" : "♡"}
          </button>

        </article>
      `
    )
    .join("");

  document
    .querySelectorAll(".favorite-btn")
    .forEach(button => {

      button.addEventListener("click", () => {

        const id = Number(button.dataset.id);

        toggleFavorite(id);

      });

    });
}

function toggleFavorite(id) {

  const product = products.find(item => item.id === id);

  const exists = wishlist.some(item => item.id === id);

  if (exists) {

    wishlist = wishlist.filter(item => item.id !== id);

  } else {

    wishlist.push(product);

  }

  saveWishlist();

  renderProducts(products);
  renderWishlist();
}

function renderWishlist() {

  wishlistCount.textContent =
    `${wishlist.length} ${wishlist.length === 1 ? "item" : "itens"}`;

  if (!wishlist.length) {

    wishlistList.innerHTML = `
      <div class="empty">
        Sua lista de desejos está vazia.
      </div>
    `;

    return;
  }

  wishlistList.innerHTML = wishlist
    .map(
      product => `
        <div
          class="swipe-wrapper"
          data-id="${product.id}"
        >

          <div class="delete-background">
            <span>Excluir</span>
            <span>🗑</span>
          </div>

          <article class="wishlist-card">

            <div class="thumb">
              ${product.icon}
            </div>

            <div>

              <h4>
                ${product.name}
              </h4>

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

        </div>
      `
    )
    .join("");

  activateSwipeToDelete();
}

function activateSwipeToDelete() {

  const swipeItems =
    document.querySelectorAll(".swipe-wrapper");

  swipeItems.forEach(wrapper => {

    const card =
      wrapper.querySelector(".wishlist-card");

    let startX = 0;
    let currentX = 0;
    let dragging = false;

    card.addEventListener(
      "touchstart",
      event => {

        startX =
          event.touches[0].clientX;

        dragging = true;

        card.style.transition = "none";
      }
    );

    card.addEventListener(
      "touchmove",
      event => {

        if (!dragging) return;

        currentX =
          event.touches[0].clientX - startX;

        if (currentX < 0) {

          card.style.transform =
            `translateX(${Math.max(currentX, -120)}px)`;

        }

      }
    );

    card.addEventListener(
      "touchend",
      () => {

        dragging = false;

        card.style.transition =
          "transform 0.25s ease";

        if (currentX < -80) {

          card.style.transform =
            "translateX(-100%)";

          setTimeout(() => {

            const id =
              Number(wrapper.dataset.id);

            removeFromWishlist(id);

          }, 250);

        } else {

          card.style.transform =
            "translateX(0)";

        }

        currentX = 0;
      }
    );
  });
}

function removeFromWishlist(id) {

  wishlist =
    wishlist.filter(
      product => product.id !== id
    );

  saveWishlist();

  renderWishlist();
  renderProducts(products);
}

function searchProducts() {

  productSkeletons();

  const selectedBrand =
    brand.value.trim().toLowerCase();

  const selectedCategory =
    category.value.trim().toLowerCase();

  setTimeout(() => {

    const filteredProducts =
      products.filter(product => {

        const matchesBrand =
          !selectedBrand ||
          product.brand
            .toLowerCase()
            .includes(selectedBrand);

        const matchesCategory =
          !selectedCategory ||
          product.category
            .toLowerCase() === selectedCategory;

        return (
          matchesBrand &&
          matchesCategory
        );
      });

    renderProducts(filteredProducts);

  }, 900);
}

function changeView(viewId) {

  views.forEach(view =>
    view.classList.remove("active")
  );

  navItems.forEach(item =>
    item.classList.remove("active")
  );

  document
    .querySelector(`#${viewId}`)
    .classList.add("active");

  document
    .querySelector(`[data-view="${viewId}"]`)
    ?.classList.add("active");

  if (viewId === "wishlistView") {

    searchFab.style.display = "none";

    renderWishlist();

  } else {

    searchFab.style.display = "flex";

  }
}

searchFab.addEventListener(
  "click",
  searchProducts
);

brand.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      searchProducts();
    }

  }
);

navItems.forEach(item => {

  item.addEventListener(
    "click",
    () => {

      changeView(
        item.dataset.view
      );

    }
  );

});

wishlistTopBtn.addEventListener(
  "click",
  () => {

    changeView("wishlistView");

  }
);

renderProducts(products);
renderWishlist();

if ("serviceWorker" in navigator) {

  window.addEventListener(
    "load",
    () => {

      navigator.serviceWorker
        .register("./sw.js")
        .catch(console.error);

    }
  );

}