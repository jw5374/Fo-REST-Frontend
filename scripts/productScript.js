const termDisplay = document.getElementById("search-term")
const individualProduct = document.getElementById("individual-product-container")

let qParams = new URLSearchParams(window.location.search)

if(termDisplay) {
    termDisplay.textContent += qParams.get("searchbar")
    document.title += " " +  qParams.get("searchbar")
    console.log(pageTitle)
}

if(individualProduct) {
    document.title += " " + document.getElementsByClassName("product-title")[0].textContent
}
