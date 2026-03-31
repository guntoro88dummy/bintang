```javascript
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
// GRID
// =======================

function renderGrid(list, containerId) {
  const el = document.getElementById(containerId);

  el.innerHTML = list.map(id => `
    <a href="${url(id)}" target="_blank">
      <img src="${thumb(id)}">
    </a>
  `).join("");
}


// =======================
// TRENDING
// =======================

function renderTrending(list) {
  const el = document.getElementById("trending-list");

  el.innerHTML = list.map(id => `
    <a href="${url(id)}" target="_blank">
      <img src="${thumb(id)}">
    </a>
  `).join("");
}


// =======================
// JADWAL WAYANG KULIT HARI INI
// =======================

function loadJadwalWayang(){

const tanggalEl = document.getElementById("tanggalHariIni");
const jadwalEl = document.getElementById("jadwalWayang");

if(!jadwalEl) return;

const today = new Date();

const tanggalFull = today.toLocaleDateString('id-ID',{
day:'numeric',
month:'long',
year:'numeric'
});

const tanggalCari = today.toLocaleDateString('id-ID',{
day:'numeric',
month:'long'
});

tanggalEl.innerHTML = "[ " + tanggalFull + " ]";

// RSS BLOGGER JSON
fetch("https://www.kluban.net/feeds/posts/default?alt=json")

.then(res=>res.json())

.then(data=>{

const items = data.feed.entry;

let html = "";
let found = false;

items.forEach(item=>{

const title = item.title.$t;

if(
title.includes(tanggalCari) &&
title.toLowerCase().includes("wayang")
){

found = true;

html += `
<div class="jadwal-item">
🎭 ${title}
</div>
`;

}

});

if(!found){
html = "<div class='jadwal-item'>Belum ada jadwal hari ini</div>";
}

jadwalEl.innerHTML = html;

})

.catch(()=>{

jadwalEl.innerHTML =
"<div class='jadwal-item'>Gagal memuat jadwal</div>";

});

}


// =======================
// INIT
// =======================

document.addEventListener("DOMContentLoaded", function(){

const videos = getRandom(DATA.videos, 6);
const shorts = getRandom(DATA.shorts, 6);
const live = getRandom(DATA.live, 6);
const trending = getRandom(DATA.videos, 7);

setHero(videos[0]);

renderGrid(shorts,"shorts");
renderGrid(videos,"videos");
renderGrid(live,"live");
renderTrending(trending);

// load jadwal
loadJadwalWayang();

});
```
