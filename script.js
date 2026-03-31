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
// JADWAL WAYANG
// =======================

const today = new Date();

const tanggal = today.toLocaleDateString('id-ID',{
day:'numeric',
month:'long',
year:'numeric'
});

const tanggalSimple = today.toLocaleDateString('id-ID',{
day:'numeric',
month:'long'
});

document.getElementById("tanggalHariIni").innerHTML =
"[ "+tanggal+" ]";


fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.kluban.net/feeds/posts/default")

.then(res=>res.json())

.then(data=>{

let itemHariIni = data.items.find(item =>
item.title.includes(tanggalSimple)
);

if(!itemHariIni){
document.getElementById("jadwalWayang").innerHTML =
"Belum ada jadwal hari ini";
return;
}

// Ambil isi artikel
fetch("https://api.allorigins.win/raw?url="+itemHariIni.link)

.then(res=>res.text())

.then(html=>{

let parser = new DOMParser();
let doc = parser.parseFromString(html,"text/html");

let teks = doc.body.innerText;

let potong = teks.split("JADWAL SEWAKTU")[0];

let hasil = potong.replace(itemHariIni.title,"");

document.getElementById("jadwalWayang").innerHTML =
"<div class='jadwal-item'>"+hasil.replace(/\n/g,"<br>")+"</div>";

});

});


// =======================
// INIT
// =======================

const videos = getRandom(DATA.videos, 6);
const shorts = getRandom(DATA.shorts, 6);
const live = getRandom(DATA.live, 6);
const trending = getRandom(DATA.videos, 7);

setHero(videos[0]);

renderGrid(shorts,"shorts");
renderGrid(videos,"videos");
renderGrid(live,"live");
renderTrending(trending);
