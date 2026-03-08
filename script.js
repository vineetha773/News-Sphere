const API_KEY = "c52bd918eae40d9cd640a0871f2ce481";

const newsContainer = document.getElementById("newsContainer");

let page = 1;
let category = "general";
let loading = false;

window.onload = () => {
loadNews();
};

async function loadNews(){

if(loading) return;

loading = true;

const url =
`https://api.allorigins.win/raw?url=https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=10&page=${page}&apikey=${API_KEY}`;
try{

const response = await fetch(url);

if(!response.ok){
throw new Error("API request failed");
}

const data = await response.json();

displayNews(data.articles);

page++;

}catch(error){

console.log(error);

newsContainer.innerHTML += "<p>Failed to load more news</p>";

}

loading = false;
}

function displayNews(articles){

if(!articles || articles.length === 0) return;

articles.forEach(article=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="${article.image || ''}">

<h3>${article.title}</h3>

<p>${article.description || ""}</p>

<a href="${article.url}" target="_blank">Read More</a>

`;

newsContainer.appendChild(card);

});

}

function changeCategory(newCategory){

category=newCategory;

page=1;

newsContainer.innerHTML="";

loadNews();

}

async function searchNews(){

const query=document.getElementById("searchInput").value;

if(!query){
alert("Enter search text");
return;
}

newsContainer.innerHTML="Searching...";

const url=
`https://api.allorigins.win/raw?url=https://gnews.io/api/v4/search?q=${query}&lang=en&country=in&max=10&apikey=${API_KEY}`;

try{

const response=await fetch(url);

const data=await response.json();

newsContainer.innerHTML="";

displayNews(data.articles);

}catch(error){

newsContainer.innerHTML="Search failed";

}

}

window.addEventListener("scroll",()=>{

if(window.innerHeight+window.scrollY>=document.body.offsetHeight-500){

loadNews();

}

});

