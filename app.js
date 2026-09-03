const products=[
{name:"Fit Me Matte + Poreless",brand:"Maybelline",category:"Base",price:52.90,store:"Loja Beauty",icon:"◉"},
{name:"Fit Me Matte + Poreless",brand:"Maybelline",category:"Base",price:57.90,store:"Make Store",icon:"◉"},
{name:"SuperStay Active Wear",brand:"Maybelline",category:"Base",price:69.90,store:"Cosméticos Online",icon:"◉"},
{name:"Fit Me Corretivo",brand:"Maybelline",category:"Corretivo",price:39.90,store:"Beauty Shop",icon:"◌"},
{name:"Batom Matte",brand:"Ruby Rose",category:"Batom",price:17.90,store:"Loja Glam",icon:"●"},
{name:"Blush Feels",brand:"Ruby Rose",category:"Blush",price:21.50,store:"Make Store",icon:"●"},
{name:"Máscara Lash Sensational",brand:"Maybelline",category:"Máscara de cílios",price:46.90,store:"Loja Beauty",icon:"✦"}
];
const brandInput=document.querySelector('#brand');
const categoryInput=document.querySelector('#category');
const searchButton=document.querySelector('#searchButton');
const productList=document.querySelector('#productList');
const resultCount=document.querySelector('#resultCount');
const statusMessage=document.querySelector('#statusMessage');
const money=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const normalize=t=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
function showSkeletons(){statusMessage.hidden=true;productList.innerHTML='';for(let i=0;i<3;i++){productList.innerHTML+=`<div class="skeleton-card" aria-hidden="true"><div class="skeleton skeleton-image"></div><div class="skeleton-lines"><div class="skeleton skeleton-line short"></div><div class="skeleton skeleton-line long"></div><div class="skeleton skeleton-line medium"></div><div class="skeleton skeleton-line price-line"></div></div></div>`}resultCount.textContent='Carregando...'}
function renderProducts(items){productList.innerHTML='';if(!items.length){resultCount.textContent='0 produtos';statusMessage.hidden=false;statusMessage.textContent='Nenhum produto encontrado. Tente outra marca ou categoria.';return}statusMessage.hidden=true;const sorted=[...items].sort((a,b)=>a.price-b.price);const low=sorted[0].price;resultCount.textContent=`${sorted.length} ${sorted.length===1?'produto':'produtos'}`;productList.innerHTML=sorted.map(p=>`<article class="product-card"><div class="product-image" aria-hidden="true">${p.icon}</div><div>${p.price===low?'<span class="best-price">MELHOR PREÇO</span>':''}<h3>${p.name}</h3><p class="product-meta">${p.brand} · ${p.category}</p><div class="price">${money(p.price)}</div><div class="store">${p.store}</div></div></article>`).join('')}
function fakeFirebaseSearch(brand,category){return new Promise(resolve=>setTimeout(()=>resolve(products.filter(p=>(!brand||normalize(p.brand).includes(normalize(brand)))&&(!category||normalize(p.category).includes(normalize(category))))),1400))}
async function searchProducts(){const brand=brandInput.value;const category=categoryInput.value;if(!brand.trim()&&!category.trim()){statusMessage.hidden=false;statusMessage.textContent='Digite pelo menos uma marca ou categoria.';return}searchButton.disabled=true;showSkeletons();try{renderProducts(await fakeFirebaseSearch(brand,category))}finally{searchButton.disabled=false}}
searchButton.addEventListener('click',searchProducts);[brandInput,categoryInput].forEach(input=>input.addEventListener('keydown',e=>{if(e.key==='Enter')searchProducts()}));
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'))}
