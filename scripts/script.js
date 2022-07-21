const fetchPath = "http://localhost:5000"
const darkModeButton = document.getElementById("dark-mode-toggle")
const cartCount = document.getElementById("cart-item-count")
const searchButton = document.querySelector(".bi.bi-search")
const searchBar = document.getElementById("search-bar")


if(localStorage.getItem("mode") === "Dark Mode") {
    document.body.classList.add("dark-mode")
    darkModeButton.textContent = "Light Mode"
} else {
    document.body.classList.remove("dark-mode")
    darkModeButton.textContent = "Dark Mode"
}

darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle("dark-mode")
    localStorage.setItem("mode", darkModeButton.textContent)
    darkModeButton.textContent = (darkModeButton.textContent == "Dark Mode") ? "Light Mode" : "Dark Mode"
})

searchButton.addEventListener('click', () => {
    searchBar.classList.toggle("search-bar-show")
})

if(parseInt(cartCount.textContent) > 0) {
    cartCount.classList.remove("hide");
} else {
    cartCount.classList.add("hide");
}