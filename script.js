const hero = document.getElementById("hero-video");
const shorts = document.getElementById("shorts");
const videos = document.getElementById("videos");
const live = document.getElementById("live");

// HERO RANDOM
const allVideos = [...DATA.videos, ...DATA.live];
const random = allVideos[Math.floor(Math.random()*allVideos.length)];

hero.innerHTML = `
<iframe src="https://www.youtube.com/embed/${random.id}" allowfullscreen></iframe>
`;

// RENDER FUNCTION
function render(list, container, isScroll=false){

list.forEach(v => {

const thumb = `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`;

container.innerHTML += `
<div class="card"
onmouseover="playPreview(this,'${v.id}')"
onmouseout="stopPreview(this,'${thumb}')">

<img src="${thumb}">
<p>${v.title}</p>

</div>
`;

});

}

// PREVIEW HOVER (PLAY VIDEO)
function playPreview(el, id){
el.innerHTML = `
<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&mute=1"
allowfullscreen></iframe>
`;
}

function stopPreview(el, thumb){
el.innerHTML = `
<img src="${thumb}">
`;
}

// LOAD
render(DATA.shorts, shorts, true);
render(DATA.videos, videos);
render(DATA.live, live);
