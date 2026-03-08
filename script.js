const API_KEY = "c52bd918eae40d9cd640a0871f2ce481";

const container = document.getElementById("newsContainer");

let category = "WORLD";
let page = 1;
let loading = false;

window.onload = function(){
loadNews();
};

async function loadNews(){

if(loading) return;

loading = true;

const url =
`https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/headlines/section/topic/${category}?hl=en-IN&gl=IN&ceid=IN:en`;

try{

const response = await fetch(url);
const data = await response.json();

displayNews(data.items);

}catch(error){

console.log("Error:",error);

}

loading=false;

}

function displayNews(articles){

articles.forEach(article=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<h3>${article.title}</h3>
<p>${article.pubDate}</p>
<a href="${article.link}" target="_blank">Read more</a>

`;

container.appendChild(card);

});

}

function changeCategory(newCategory){

category=newCategory;

container.innerHTML="";

loadNews();

}

window.addEventListener("scroll",()=>{

if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 200){

loadNews();

}

});

