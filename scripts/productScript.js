const termDisplay = document.getElementById("search-term")

let qParams = new URLSearchParams(window.location.search)

termDisplay.textContent += qParams.get("searchbar")