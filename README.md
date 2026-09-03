# BeautyCompare PWA

Projeto mobile-first em HTML, CSS e JavaScript.

Inclui Thumb-Friendly Zone, navegação inferior, FAB, pesquisa por marca/categoria, cards de comparação de preços, skeleton screens, feed demonstrativo de restaurantes vegetarianos, latitude/longitude/descrição e mapa OpenStreetMap via Leaflet.

## Google Maps / Places
Os restaurantes estão em dados de demonstração para o app funcionar sem uma chave de API. Em produção, use uma Firebase Cloud Function (ou outro backend) para consultar a Google Places API sem expor a chave no navegador e retorne ao frontend nome, descrição, latitude, longitude, endereço e imagem. Depois envie esses dados para `renderRestaurants()`.

## Como testar
Execute por servidor local, por exemplo com VS Code Live Server ou `python -m http.server 8000`, pois Service Workers não funcionam corretamente ao abrir o HTML diretamente por `file://`.
