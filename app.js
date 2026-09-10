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


/* =========================
   ELEMENTOS DO HTML
========================= */

const brand =
  document.querySelector("#brand");

const category =
  document.querySelector("#category");

const productList =
  document.querySelector("#productList");

const productCount =
  document.querySelector("#productCount");

const wishlistList =
  document.querySelector("#wishlist");

const wishlistCount =
  document.querySelector("#wishlistCount");

const searchFab =
  document.querySelector("#searchFab");

const navItems =
  document.querySelectorAll(
    ".nav-item[data-view]"
  );

const views =
  document.querySelectorAll(".view");

const wishlistTopBtn =
  document.querySelector(
    "#wishlistTopBtn"
  );


/* MODAL */

const searchConfirmation =
  document.querySelector(
    "#searchConfirmation"
  );

const confirmationModal =
  document.querySelector(
    "#confirmationModal"
  );

const closeConfirmation =
  document.querySelector(
    "#closeConfirmation"
  );


/* =========================
   LISTA DE DESEJOS
========================= */

let wishlist =
  JSON.parse(
    localStorage.getItem(
      "beautyWishlist"
    )
  ) || [];


/* =========================
   DINHEIRO
========================= */

function money(value) {

  return value.toLocaleString(
    "pt-BR",
    {
      style:
        "currency",

      currency:
        "BRL"
    }
  );

}


/* =========================
   SALVAR FAVORITOS
========================= */

function saveWishlist() {

  localStorage.setItem(
    "beautyWishlist",
    JSON.stringify(wishlist)
  );

}


function isFavorite(id) {

  return wishlist.some(
    product =>
      product.id === id
  );

}


/* =========================
   SKELETON
========================= */

function productSkeletons() {

  productList.innerHTML =
    Array.from(
      {
        length: 3
      }
    )
    .map(
      () => `

        <div class="skeleton-card">

          <div
            class="skeleton skeleton-img"
          ></div>

          <div>

            <div
              class="skeleton skeleton-line w40"
            ></div>

            <div
              class="skeleton skeleton-line w80"
            ></div>

            <div
              class="skeleton skeleton-line w60"
            ></div>

            <div
              class="skeleton skeleton-line w40"
            ></div>

          </div>

        </div>

      `
    )
    .join("");

}


/* =========================
   PRODUTOS
========================= */

function renderProducts(items) {

  productCount.textContent =
    `${items.length} ${
      items.length === 1
        ? "item"
        : "itens"
    }`;


  if (!items.length) {

    productList.innerHTML = `

      <div class="empty">

        Nenhum produto encontrado.

      </div>

    `;

    return;

  }


  const lowest =
    Math.min(
      ...items.map(
        product =>
          product.price
      )
    );


  productList.innerHTML =
    [...items]

      .sort(
        (a, b) =>
          a.price - b.price
      )

      .map(
        product => `

          <article
            class="product-card"
          >

            <div class="thumb">

              ${product.icon}

            </div>


            <div class="product-info">

              ${
                product.price ===
                lowest

                  ? `
                    <span class="best">
                      MELHOR PREÇO
                    </span>
                  `

                  : ""
              }


              <h4>

                ${product.name}

              </h4>


              <p class="meta">

                ${product.brand}
                ·
                ${product.category}

              </p>


              <div class="price">

                ${money(
                  product.price
                )}

              </div>


              <p class="meta">

                ${product.store}

              </p>

            </div>


            <button

              class="
                favorite-btn
                ${
                  isFavorite(
                    product.id
                  )
                    ? "active"
                    : ""
                }
              "

              data-id="
                ${product.id}
              "

              aria-label="
                Adicionar à lista de desejos
              "

            >

              ${
                isFavorite(
                  product.id
                )
                  ? "♥"
                  : "♡"
              }

            </button>

          </article>

        `
      )
      .join("");


  document
    .querySelectorAll(
      ".favorite-btn"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const id =
              Number(
                button.dataset.id
              );

            toggleFavorite(id);

          }
        );

      }
    );

}


/* =========================
   FAVORITAR
========================= */

function toggleFavorite(id) {

  const product =
    products.find(
      item =>
        item.id === id
    );


  const exists =
    wishlist.some(
      item =>
        item.id === id
    );


  if (exists) {

    wishlist =
      wishlist.filter(
        item =>
          item.id !== id
      );

  } else {

    wishlist.push(product);

  }


  saveWishlist();

  renderProducts(products);

  renderWishlist();

}


/* =========================
   LISTA DE DESEJOS
========================= */

function renderWishlist() {

  wishlistCount.textContent =
    `${wishlist.length} ${
      wishlist.length === 1
        ? "item"
        : "itens"
    }`;


  if (!wishlist.length) {

    wishlistList.innerHTML = `

      <div class="empty">

        Sua lista de desejos
        está vazia.

      </div>

    `;

    return;

  }


  wishlistList.innerHTML =
    wishlist

      .map(
        product => `

          <div
            class="swipe-wrapper"
            data-id="${product.id}"
          >

            <div
              class="delete-background"
            >

              <span>
                Excluir
              </span>

              <span>
                🗑
              </span>

            </div>


            <article
              class="wishlist-card"
            >

              <div class="thumb">

                ${product.icon}

              </div>


              <div>

                <h4>

                  ${product.name}

                </h4>


                <p class="meta">

                  ${product.brand}
                  ·
                  ${product.category}

                </p>


                <div class="price">

                  ${money(
                    product.price
                  )}

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


/* =========================
   SWIPE TO DELETE
========================= */

function activateSwipeToDelete() {

  const swipeItems =
    document.querySelectorAll(
      ".swipe-wrapper"
    );


  swipeItems.forEach(
    wrapper => {

      const card =
        wrapper.querySelector(
          ".wishlist-card"
        );


      let startX = 0;

      let currentX = 0;

      let dragging = false;


      card.addEventListener(
        "touchstart",
        event => {

          startX =
            event
              .touches[0]
              .clientX;

          dragging = true;

          card.style.transition =
            "none";

        }
      );


      card.addEventListener(
        "touchmove",
        event => {

          if (!dragging) {
            return;
          }


          currentX =
            event
              .touches[0]
              .clientX
            -
            startX;


          if (currentX < 0) {

            card.style.transform =
              `translateX(${
                Math.max(
                  currentX,
                  -120
                )
              }px)`;

          }

        }
      );


      card.addEventListener(
        "touchend",
        () => {

          dragging =
            false;


          card.style.transition =
            "transform 0.25s ease";


          if (currentX < -80) {

            card.style.transform =
              "translateX(-100%)";


            setTimeout(
              () => {

                const id =
                  Number(
                    wrapper.dataset.id
                  );

                removeFromWishlist(
                  id
                );

              },
              250
            );

          } else {

            card.style.transform =
              "translateX(0)";

          }


          currentX =
            0;

        }
      );

    }
  );

}


/* =========================
   REMOVER FAVORITO
========================= */

function removeFromWishlist(id) {

  wishlist =
    wishlist.filter(
      product =>
        product.id !== id
    );


  saveWishlist();

  renderWishlist();

  renderProducts(products);

}


/* =========================
   LOTTIE
========================= */

const sampleLottieJSON =

  "data:text/json;charset=utf-8," +

  encodeURIComponent(

    JSON.stringify({

      v: "5.5.7",

      fr: 60,

      ip: 0,

      op: 60,

      w: 100,

      h: 100,

      nm: "Check",


      layers: [

        {

          ddd: 0,

          ind: 1,

          ty: 4,

          nm: "Checkmark",

          sr: 1,


          ks: {

            o: {
              a: 0,
              k: 100
            },

            r: {
              a: 0,
              k: 0
            },

            p: {
              a: 0,
              k: [50, 50, 0]
            },

            a: {
              a: 0,
              k: [0, 0, 0]
            },

            s: {
              a: 0,
              k: [100, 100, 100]
            }

          },


          shapes: [

            {

              ty: "grp",


              items: [

                {

                  ty: "sh",


                  ks: {

                    a: 0,


                    k: {

                      i: [
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],

                      o: [
                        [0, 0],
                        [0, 0],
                        [0, 0]
                      ],

                      v: [
                        [-20, 0],
                        [-5, 15],
                        [20, -10]
                      ],

                      c: false

                    }

                  }

                },


                {

                  ty: "st",


                  c: {

                    a: 0,

                    k: [
                      0.48,
                      0.24,
                      0.39,
                      1
                    ]

                  },


                  w: {

                    a: 0,

                    k: 7

                  },


                  lc: 2,

                  lj: 2

                },


                {

                  ty: "tr",


                  p: {

                    a: 0,

                    k: [0, 0]

                  },


                  a: {

                    a: 0,

                    k: [0, 0]

                  },


                  s: {

                    a: 0,

                    k: [100, 100]

                  },


                  r: {

                    a: 0,

                    k: 0

                  },


                  o: {

                    a: 0,

                    k: 100

                  }

                }

              ]

            }

          ]

        }

      ]

    })

  );


let lottieAnimation =
  null;


if (
  typeof lottie !==
  "undefined"
) {

  lottieAnimation =
    lottie.loadAnimation({

      container:
        document.querySelector(
          "#lottie-container"
        ),

      renderer:
        "svg",

      loop:
        false,

      autoplay:
        false,

      path:
        sampleLottieJSON

    });

}


/* =========================
   ABRIR CONFIRMAÇÃO
========================= */

function showSearchConfirmation() {

  searchConfirmation
    .classList
    .add("active");


  if (
    typeof Motion !==
    "undefined"
  ) {

    Motion.animate(

      searchConfirmation,

      {
        opacity: [
          0,
          1
        ]
      },

      {
        duration:
          0.2
      }

    );


    Motion.animate(

      confirmationModal,

      {
        transform: [

          "translateY(30px) scale(0.9)",

          "translateY(0px) scale(1)"

        ]
      },

      {

        duration:
          0.3,

        easing: [
          0.175,
          0.885,
          0.32,
          1.275
        ]

      }

    );

  }


  if (lottieAnimation) {

    lottieAnimation
      .goToAndPlay(
        0,
        true
      );

  }

}


/* =========================
   FECHAR CONFIRMAÇÃO
========================= */

function hideSearchConfirmation() {

  if (
    typeof Motion !==
    "undefined"
  ) {

    Motion.animate(

      searchConfirmation,

      {
        opacity: [
          1,
          0
        ]
      },

      {
        duration:
          0.2
      }

    )
    .finished
    .then(
      () => {

        searchConfirmation
          .classList
          .remove(
            "active"
          );

      }
    );

  } else {

    searchConfirmation
      .classList
      .remove(
        "active"
      );

  }

}


/* =========================
   PESQUISAR
========================= */

function searchProducts() {

  productSkeletons();


  productCount.textContent =
    "Carregando...";


  const selectedBrand =
    brand
      .value
      .trim()
      .toLowerCase();


  const selectedCategory =
    category
      .value
      .trim()
      .toLowerCase();


  setTimeout(
    () => {

      const filteredProducts =
        products.filter(
          product => {


            const matchesBrand =

              !selectedBrand ||

              product
                .brand
                .toLowerCase()
                .includes(
                  selectedBrand
                );


            const matchesCategory =

              !selectedCategory ||

              product
                .category
                .toLowerCase()
                .includes(
                  selectedCategory
                );


            return (

              matchesBrand &&

              matchesCategory

            );

          }
        );


      renderProducts(
        filteredProducts
      );


      if (
        filteredProducts.length >
        0
      ) {

        showSearchConfirmation();

      }

    },
    900
  );

}


/* =========================
   TROCAR TELA
========================= */

function changeView(viewId) {

  views.forEach(
    view =>
      view.classList.remove(
        "active"
      )
  );


  navItems.forEach(
    item =>
      item.classList.remove(
        "active"
      )
  );


  document
    .querySelector(
      `#${viewId}`
    )
    .classList
    .add("active");


  document
    .querySelector(
      `[data-view="${viewId}"]`
    )
    ?.classList
    .add("active");


  if (
    viewId ===
    "wishlistView"
  ) {

    searchFab.style.display =
      "none";

    renderWishlist();

  } else {

    searchFab.style.display =
      "flex";

  }

}


/* =========================
   EVENTOS
========================= */

searchFab.addEventListener(

  "click",

  searchProducts

);


brand.addEventListener(

  "keydown",

  event => {

    if (
      event.key ===
      "Enter"
    ) {

      searchProducts();

    }

  }

);


category.addEventListener(

  "keydown",

  event => {

    if (
      event.key ===
      "Enter"
    ) {

      searchProducts();

    }

  }

);


navItems.forEach(
  item => {

    item.addEventListener(

      "click",

      () => {

        changeView(
          item.dataset.view
        );

      }

    );

  }
);


wishlistTopBtn.addEventListener(

  "click",

  () => {

    changeView(
      "wishlistView"
    );

  }

);


/* BOTÃO VER RESULTADOS */

closeConfirmation.addEventListener(

  "click",

  () => {

    hideSearchConfirmation();

  }

);


/* CLICAR FORA DO MODAL */

searchConfirmation.addEventListener(

  "click",

  event => {

    if (
      event.target ===
      searchConfirmation
    ) {

      hideSearchConfirmation();

    }

  }

);


/* =========================
   INICIALIZAÇÃO
========================= */

renderProducts(products);

renderWishlist();


/* =========================
   SERVICE WORKER
========================= */

if (
  "serviceWorker" in
  navigator
) {

  window.addEventListener(

    "load",

    () => {

      navigator
        .serviceWorker
        .register(
          "./sw.js"
        )
        .catch(
          console.error
        );

    }

  );

}