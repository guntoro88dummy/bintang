const CHANNEL_ID = "UCSKrztE8VRnE3XxXG3ATduw"; // GANTI PUNYAMU

const hero = document.getElementById("hero-video");
const trending = document.getElementById("trending");
const videos = document.getElementById("videos");

const logo = document.getElementById("channel-logo");
const name = document.getElementById("channel-name");
const handle = document.getElementById("channel-handle");

async function loadChannel(){

const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;

const res = await fetch(url);
const text = await res.text();

// PARSE XML
const parser = new DOMParser();
const xml = parser.parseFromString(text, "text/xml");

const entries = xml.getElementsByTagName("entry");

// CHANNEL INFO
name.innerText = xml.getElementsByTagName("title")[0].textContent;
handle.innerText = "YouTube Channel";

// LOGO fallback
logo.src = "https://www.youtube.com/s/desktop/fe7c0c3d/img/favicon_144x144.png";

// AMBIL VIDEO LIST
let videosData = [];

for(let i=0; i<entries.length; i++){

const entry = entries[i];

const id = entry.getElementsByTagName("yt:videoId")[0].textContent;
const title = entry.getElementsByTagName("title")[0].textContent;

videosData.push({
id,
title,
thumb: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
link: `https://www.youtube.com/watch?v=${id}`
});

}

// RANDOM HERO
const randomIndex = Math.floor(Math.random() * videosData.length);
const heroVideo = videosData[randomIndex];

hero.innerHTML = `
<iframe
src="https://www.youtube.com/embed/${heroVideo.id}"
frameborder="0"
allowfullscreen>
</iframe>
`;

// CLEAR
videos.innerHTML = "";
trending.innerHTML = "";

// LOOP
videosData.forEach((v,i)=>{

// GRID
videos.innerHTML += `
<a href="${v.link}" target="_blank" class="video-card">
<img src="${v.thumb}">
<p class="video-title">${v.title}</p>
</a>
`;

// TRENDING MAX 5
if(i < 5){
trending.innerHTML += `
<a href="${v.link}" target="_blank" class="trend-card">
<img src="${v.thumb}">
<p class="video-title">${v.title}</p>
</a>
`;
}

});

}

loadChannel();
