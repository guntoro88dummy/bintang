// =======================
// UTIL
// =======================

function shuffle(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function getRandom(arr, total) {
  if(!arr) return [];
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
  const el = document.getElementById("heroFrame");
  if(el){
    el.src = `https://www.youtube.com/embed/${id}`;
  }
}


// =======================
// GRID
// =======================

function renderGrid(list, containerId) {

  const el = document.getElementById(containerId);
  if(!el) return;

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
  if(!el) return;

  el.innerHTML = list.map(id => `
    <a href="${url(id)}" target="_blank">
      <img src="${thumb(id)}">
    </a>
  `).join("");

}



// =======================
// JADWAL WAYANG
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

tanggalEl.innerHTML = "[ " + tanggalFull + " ]";

// langsung parsing HTML kluban
fetch("https://api.allorigins.win/raw?url=" + 
encodeURIComponent("https://www.kluban.net"))

.then(res=>res.text())

.then(html=>{

let parser = new DOMParser();
let doc = parser.parseFromString(html,"text/html");

let links = doc.querySelectorAll("h3 a");

let hasil = "";

links.forEach(link=>{

if(link.textContent.toLowerCase().includes("wayang")){
hasil += `
<div class="jadwal-item">
🎭 ${link.textContent}
</div>
`;
}

});

if(!hasil){
hasil = "<div class='jadwal-item'>Belum ada jadwal hari ini</div>";
}

jadwalEl.innerHTML = hasil;

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

try{

if(typeof DATA !== "undefined"){

const videos = getRandom(DATA.videos, 6);
const shorts = getRandom(DATA.shorts, 6);
const live = getRandom(DATA.live, 6);
const trending = getRandom(DATA.videos, 7);

setHero(videos[0]);

renderGrid(shorts,"shorts");
renderGrid(videos,"videos");
renderGrid(live,"live");
renderTrending(trending);

}

}catch(e){
console.log("DATA error aman", e);
}

// jadwal tetap jalan
loadJadwalWayang();

});
