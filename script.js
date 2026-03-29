const hero = document.getElementById("hero-video");
const shorts = document.getElementById("shorts");
const videos = document.getElementById("videos");
const live = document.getElementById("live");
const trending = document.getElementById("trending");

// HERO
const allVideos = [...DATA.videos, ...DATA.live];
const random = allVideos[Math.floor(Math.random()*allVideos.length)];

hero.innerHTML = `<iframe src="https://www.youtube.com/embed/${random.id}" allowfullscreen></iframe>`;

// META
function meta(){
return `${Math.floor(Math.random()*100)}K views • ${Math.floor(Math.random()*10)} days ago`;
}

// RENDER
function render(list, container, isLive=false){
container.innerHTML = "";

list.forEach(v=>{
const thumb = `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`;

container.innerHTML += `
<div class="card">
<div class="thumb">
<img src="${thumb}">
<div class="duration">12:34</div>
${isLive ? '<div class="live">LIVE</div>' : ''}
</div>
<p>${v.title}</p>
<span>${meta()}</span>
</div>
`;
});
}

// TRENDING 7
function renderTrending(list){
trending.innerHTML = "";

list.slice(0,7).forEach(v=>{
const thumb = `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`;

trending.innerHTML += `
<div class="trend-card">
<img src="${thumb}">
<p>🔥 ${v.title}</p>
</div>
`;
});
}

// LOAD
render(DATA.shorts, shorts);
render(DATA.videos.slice(0,6), videos); // FIX 6 VIDEO
render(DATA.live, live, true);
renderTrending(DATA.videos);
