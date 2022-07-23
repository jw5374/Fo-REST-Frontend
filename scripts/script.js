const fetchPath = "http://forest-env.eba-rwsmhy3m.us-east-1.elasticbeanstalk.com"
const darkModeButton = document.getElementById("dark-mode-toggle")
const cartCount = document.getElementById("cart-item-count")
const searchButton = document.querySelector(".bi.bi-search")
const searchBar = document.getElementById("search-bar")
const profile = document.querySelector(".bi.bi-person")

function getAuthCookie() {
    for(let cookie of document.cookie.split(";")) {
        let cookieEntry = cookie.split("=")
        if(cookieEntry[0] !== "token") {
            continue;
        }
        return cookieEntry[1]
    }
    return null;
}

function isTokenCookiePresent() {
    let auth = getAuthCookie()
    if(auth == null) {
        localStorage.removeItem("forest-user")
        return false
    }
    if(localStorage.getItem("forest-user") == null) {
        return false;
    }
    return true
}

function checkCookieValid() {
    if(!isTokenCookiePresent()) return;
    profile.parentElement.href = window.location.protocol + "//" + window.location.host + "/profile.html"
}

function populateCartCount() {
    if(!isTokenCookiePresent()) {
        cartCount.classList.add("hide")
        return
    }
    if(localStorage.getItem("forest-cart-count") != null) {
        cartCount.textContent = localStorage.getItem("forest-cart-count")
        if(parseInt(cartCount.textContent) > 0) {
            cartCount.classList.remove("hide");
        } else {
            cartCount.classList.add("hide");
        }
        return
    }
    fetch(fetchPath + "/carts/" + localStorage.getItem("forest-user"), {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + getAuthCookie()
        }
    })
    .then(res => res.json())
    .then((data) => {
        localStorage.setItem("forest-cart-count", data.length)
        cartCount.textContent = data.length
        if(parseInt(cartCount.textContent) > 0) {
            cartCount.classList.remove("hide");
        } else {
            cartCount.classList.add("hide");
        }
    })
}

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

checkCookieValid()

populateCartCount()
