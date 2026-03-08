const API_KEY = "c52bd918eae40d9cd640a0871f2ce481";



const newsContainer = document.getElementById("newsContainer");

let page = 1;
let currentCategory = "general";
let loading = false;

window.onload = () => {
    loadNews();
};

async function loadNews() {

    if (loading) return;

    loading = true;

    const url = `https://gnews.io/api/v4/top-headlines?category=${currentCategory}&lang=en&country=in&max=10&page=${page}&apikey=${API_KEY}`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        displayNews(data.articles);

        page++;

    } catch (error) {

        console.log(error);

    }

    loading = false;
}

function getNews(category) {

    currentCategory = category;

    page = 1;

    newsContainer.innerHTML = "";

    loadNews();
}

function displayNews(articles) {

    if (!articles || articles.length === 0) return;

    articles.forEach(article => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
        <img src="${article.image || ''}">
        <h3>${article.title}</h3>
        <p>${article.description || ""}</p>
        <a href="${article.url}" target="_blank">Read More</a>
        `;

        newsContainer.appendChild(card);
    });
}

async function searchNews() {

    const query = document.getElementById("searchInput").value;

    if (!query) {
        alert("Enter search text");
        return;
    }

    newsContainer.innerHTML = "";

    page = 1;

    const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&country=in&max=10&page=${page}&apikey=${API_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    displayNews(data.articles);
}

// Infinite Scroll

window.addEventListener("scroll", () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {

        loadNews();

    }

});