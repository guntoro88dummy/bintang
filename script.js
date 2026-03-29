const hero = document.getElementById("hero-video");
const shorts = document.getElementById("shorts");
const videos = document.getElementById("videos");
const live = document.getElementById("live");
const gridMain = document.getElementById("grid-main");

// HERO RANDOM
const allVideos = [...DATA.videos, ...DATA.live];
const random = allVideos[Math.floor(Math.random()*allVideos.length)];

hero.innerHTML = `
<iframe src="https://www.youtube.com/embed/${random.id}?autoplay=1&mute=1" allowfullscreen></iframe>
`;

// RENDER
function render(list, container){

list.forEach(v => {

const thumb = `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`;

const el = document.createElement("div");
el.className = "card";

el.innerHTML = `
<img src="${thumb}">
<p>${v.title}</p>
`;

el.addEventListener("mouseover", () => {
el.innerHTML = `
<iframe src="https://www.youtube.com/embed/${v.id}?autoplay=1&mute=1" allowfullscreen></iframe>
`;
});

el.addEventListener("mouseout", () => {
el.innerHTML = `
<img src="${thumb}">
<p>${v.title}</p>
`;
});

container.appendChild(el);

});

}

// LOAD
render(DATA.grid, gridMain);
render(DATA.shorts, shorts);
render(DATA.videos, videos);
render(DATA.live, live);
