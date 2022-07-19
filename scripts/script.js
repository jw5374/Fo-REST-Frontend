const darkModeButton = document.getElementById("dark-mode-toggle")
const cartCount = document.getElementById("cart-item-count")


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

if(parseInt(cartCount.textContent) > 0) {
    cartCount.classList.remove("hide");
} else {
    cartCount.classList.add("hide");
}