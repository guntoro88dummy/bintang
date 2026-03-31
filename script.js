// =======================
// UTIL
// =======================

function shuffle(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function getRandom(arr, total) {
  return shuffle([...arr]).slice(0, total);
}

function thumb(id) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

function url(id) {
  return `https://www.youtube.com/watch?v=${id}`;
}

// =======================
// HERO VIDEO
// =======================

function setHero(id) {
  document.getElementById("heroFrame").src =
    `https://www.youtube.com/embed/${id}`;
}

// =======================
// RENDER GRID
// =======================

function renderGrid(list, containerId, isShort = false) {
  const el = document.getElementById(containerId);

  el.innerHTML = list.map(id => `
    <a href="${url(id)}" target="_blank">
      <img src="${thumb(id)}">
    </a>
  `).join("");
}

// =======================
// TRENDING (SIDEBAR)
// =======================

function renderTrending(list) {
  const el = document.getElementById("trending-list");

  el.innerHTML = list.map(id => `
    <a href="${url(id)}" target="_blank" style="display:flex; gap:10px;">
      <img src="${thumb(id)}" style="width:120px; border-radius:8px;">
    </a>
  `).join("");
}

// =======================
// POPUP
// =======================

const popup = document.getElementById("popup");
const openBtn = document.getElementById("openPopup");
const closeBtn = document.getElementById("closePopup");

if(openBtn){
  openBtn.onclick = () => popup.style.display = "block";
}

if(closeBtn){
  closeBtn.onclick = () => popup.style.display = "none";
}

window.addEventListener("keydown", (e)=>{
  if(e.key === "Escape"){
    popup.style.display = "none";
  }
});

// =======================
// INIT
// =======================

const videos = getRandom(DATA.videos, 6);
const shorts = getRandom(DATA.shorts, 6);
const live = getRandom(DATA.live, 6);
const trending = getRandom(DATA.videos, 7);

// HERO dari video pertama
setHero(videos[0]);

// RENDER
renderGrid(shorts, "shorts", true);
renderGrid(videos, "videos");
renderGrid(live, "live");
renderTrending(trending);


// =======================
// JADWAL WAYANG
// =======================

const today = new Date();

const tanggal = today.toLocaleDateString('id-ID',{
day:'numeric',
month:'long',
year:'numeric'
});

document.getElementById("tanggalHariIni").innerHTML =
"[ "+tanggal+" ]";

fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.kluban.net/feeds/posts/default")

.then(res=>res.json())

.then(data=>{

let html="";

data.items.slice(0,3).forEach(item=>{

if(item.title.toLowerCase().includes("wayang")){

html+=`

<div class="jadwal-item">
${item.title}
</div>

`;

}

});

document.getElementById("jadwalWayang").innerHTML = html;

});
