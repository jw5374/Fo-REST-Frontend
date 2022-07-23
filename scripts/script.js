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

function checkCookie() {
    let auth = getAuthCookie()
    if(auth == null) {
        return;
    }
    fetch(fetchPath + "/auth/user", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${auth}`
        }
    })
    .then(res => {
        if(res.status != 200) {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
            localStorage.removeItem("forest-user")
            return;
        }
        return res.text()
    })
    .then(data => {
        if(data.split(" ")[0] != localStorage.getItem("forest-user")) {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
            localStorage.removeItem("forest-user")
            return;
        }
        profile.parentElement.href = window.location.protocol + "//" + window.location.host + "/profile.html"
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

if(parseInt(cartCount.textContent) > 0) {
    cartCount.classList.remove("hide");
} else {
    cartCount.classList.add("hide");
}

checkCookie()
