const darkModeButton = document.getElementById("dark-mode-toggle")
const cartCount = document.getElementById("cart-item-count")

darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle("dark-mode")
    darkModeButton.textContent = (darkModeButton.textContent == "Dark Mode") ? "Light Mode" : "Dark Mode"
})

if(parseInt(cartCount.textContent) > 0) {
    cartCount.classList.remove("hide");
} else {
    cartCount.classList.add("hide");
}