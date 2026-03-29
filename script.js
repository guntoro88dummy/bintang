const hero = document.getElementById("hero-video");
const shorts = document.getElementById("shorts");
const videos = document.getElementById("videos");
const live = document.getElementById("live");
const trending = document.getElementById("trending");

// HERO RANDOM
const allVideos = [...DATA.videos, ...DATA.live];
const random = allVideos[Math.floor(Math.random()*allVideos.length)];

hero.innerHTML = `
<iframe src="https://www.youtube.com/embed/${random.id}" allowfullscreen></iframe>
`;

// RENDER
function render(list, container){
container.innerHTML = "";

list.forEach(v => {

const thumb = `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`;

container.innerHTML += `
<div class="card">
<img src="${thumb}">
<p>${v.title}</p>
</div>
`;

});
}

// TRENDING
function renderTrending(list){
trending.innerHTML = "";

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
render(DATA.shorts, shorts);
render(DATA.videos, videos);
render(DATA.live, live);
renderTrending(DATA.videos);
