const hero = document.getElementById("hero-video");
const shorts = document.getElementById("shorts");
const videos = document.getElementById("videos");
const live = document.getElementById("live");
const gridMain = document.getElementById("grid-main");
const trending = document.getElementById("trending");

// HERO RANDOM (TETAP VIDEO)
const allVideos = [...DATA.videos, ...DATA.live];
const random = allVideos[Math.floor(Math.random()*allVideos.length)];

hero.innerHTML = `
<iframe src="https://www.youtube.com/embed/${random.id}" allowfullscreen></iframe>
`;

// RENDER TANPA AUTOPLAY
function render(list, container){
list.forEach(v => {

const thumb = `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`;

const el = document.createElement("div");
el.className = "card";

el.innerHTML = `
<img src="${thumb}">
<p>${v.title}</p>
`;

container.appendChild(el);

});
}

// TRENDING
function renderTrending(list){
list.slice(0,5).forEach(v => {

const thumb = `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`;

trending.innerHTML += `
<div class="trend-card">
<img src="${thumb}">
<p>${v.title}</p>
</div>
`;

});
}

// LOAD
render(DATA.grid, gridMain);
render(DATA.shorts, shorts);
render(DATA.videos, videos);
render(DATA.live, live);
renderTrending(DATA.videos);
