// =======================
// UTIL
// =======================

function shuffle(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function getRandom(arr, total) {
  if (!arr) return [];
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
  if (el && id) {
    el.src = `https://www.youtube.com/embed/${id}`;
  }
}


// =======================
// GRID
// =======================

function renderGrid(list, containerId) {

  const el = document.getElementById(containerId);
  if (!el || !list) return;

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
  if (!el || !list) return;

  el.innerHTML = list.map(id => `
    <a href="${url(id)}" target="_blank">
      <img src="${thumb(id)}">
    </a>
  `).join("");

}


// =======================
// JADWAL WAYANG AUTO
// =======================

function loadJadwalWayang(){

const jadwalEl = document.getElementById("jadwalWayang");
const tanggalEl = document.getElementById("tanggalHariIni");

if(!jadwalEl) return;

jadwalEl.innerHTML = "Memuat jadwal...";

fetch("jadwal.json?t=" + new Date().getTime())

.then(res=>res.json())

.then(data=>{

// tampilkan tanggal
if(tanggalEl && data.tanggal){
tanggalEl.innerHTML = "[ " + data.tanggal + " ]";
}

let html = "";

// cek jika ada jadwal
if(data.jadwal && data.jadwal.length > 0){

data.jadwal.forEach(item=>{

html += `
<div class="jadwal-item">
🎭 ${item}
</div>
`;

});

}else{

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


// jalankan jadwal
loadJadwalWayang();

});


// =======================
// FORCE LOAD (ANTI CACHE)
// =======================

setTimeout(function(){

if(typeof loadJadwalWayang === "function"){
loadJadwalWayang();
}

},1500);
