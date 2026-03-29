const CHANNEL_USERNAME = "ajiMangkara"; // GANTI USERNAME CHANNEL (BUKAN ID)

const hero = document.getElementById("hero-video");
const trending = document.getElementById("trending");
const videos = document.getElementById("videos");

async function loadChannel(){

try{

const res = await fetch(`https://www.youtube.com/@${CHANNEL_USERNAME}/videos`);
const text = await res.text();

// AMBIL JSON DARI PAGE
const jsonText = text.split("var ytInitialData = ")[1].split(";</script>")[0];
const data = JSON.parse(jsonText);

// AMBIL VIDEO LIST
const contents = data.contents.twoColumnBrowseResultsRenderer.tabs[1]
.tabRenderer.content.richGridRenderer.contents;

let vids = [];

contents.forEach(c => {
if(c.richItemRenderer){
const v = c.richItemRenderer.content.videoRenderer;

if(v){
vids.push({
id: v.videoId,
title: v.title.runs[0].text,
thumb: v.thumbnail.thumbnails[0].url
});
}
}
});

// RANDOM HERO
const random = vids[Math.floor(Math.random()*vids.length)];

hero.innerHTML = `
<iframe src="https://www.youtube.com/embed/${random.id}" allowfullscreen></iframe>
`;

// CLEAR
videos.innerHTML = "";
trending.innerHTML = "";

// LOOP
vids.forEach((v,i)=>{

videos.innerHTML += `
<a href="https://youtube.com/watch?v=${v.id}" target="_blank" class="video-card">
<img src="${v.thumb}">
<p class="video-title">${v.title}</p>
</a>
`;

if(i < 5){
trending.innerHTML += `
<a href="https://youtube.com/watch?v=${v.id}" target="_blank" class="trend-card">
<img src="${v.thumb}">
<p class="video-title">${v.title}</p>
</a>
`;
}

});

}catch(e){
console.error(e);
hero.innerHTML = "<p>Gagal load</p>";
}

}

loadChannel();
