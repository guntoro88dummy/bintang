// 🔥 GANTI INI DENGAN CHANNEL ID KAMU
const CHANNEL_ID = "UCSKrztE8VRnE3XxXG3ATduw";

// ELEMENT
const hero = document.getElementById("hero-video");
const trending = document.getElementById("trending");
const videos = document.getElementById("videos");

const logo = document.getElementById("channel-logo");
const name = document.getElementById("channel-name");
const handle = document.getElementById("channel-handle");

// LOAD DATA
async function loadChannel(){

const url = `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

const res = await fetch(url);
const data = await res.json();

const items = data.items;

// SET CHANNEL INFO (ambil dari feed)
name.innerText = data.feed.title;
handle.innerText = data.feed.link;

// LOGO (fallback simple)
logo.src = "https://www.youtube.com/s/desktop/fe7c0c3d/img/favicon_144x144.png";

// RANDOM HERO
const randomIndex = Math.floor(Math.random() * items.length);
const heroVideo = items[randomIndex];
const heroId = heroVideo.link.split("v=")[1];

hero.innerHTML = `
<iframe
src="https://www.youtube.com/embed/${heroId}"
frameborder="0"
allowfullscreen>
</iframe>
`;

// CLEAR
videos.innerHTML = "";
trending.innerHTML = "";

// LOOP VIDEO
items.forEach((item, i) => {

const id = item.link.split("v=")[1];
const title = item.title;
const thumb = item.thumbnail;

// GRID VIDEO
videos.innerHTML += `
<a href="${item.link}" target="_blank" class="video-card">
<img src="${thumb}">
<p class="video-title">${title}</p>
</a>
`;

// TRENDING (MAX 5)
if(i < 5){
trending.innerHTML += `
<a href="${item.link}" target="_blank" class="trend-card">
<img src="${thumb}">
<p class="video-title">${title}</p>
</a>
`;
}

});

}

// INIT
loadChannel();