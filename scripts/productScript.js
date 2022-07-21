const termDisplay = document.getElementById("search-term")
const productGallery = document.getElementById("product-gallery")

let qParams = new URLSearchParams(window.location.search)

function populateProductData(prodObj) {
    let prodTitle = document.getElementsByClassName("product-title")[0]
    let prodDesc = document.getElementsByClassName("product-description")[0]
    let prodPrice = document.getElementsByClassName("product-price")[0]
    let stockStatus = document.getElementById("stock-status")
    let stockCount = document.getElementById("stock-count")
    prodTitle.textContent = prodObj.name
    prodDesc.textContent = prodObj.description
    prodPrice.textContent = "$" + prodObj.price.toFixed(2)
    stockCount.textContent = prodObj.count + " left"
    if(prodObj.count > 0) {
        stockStatus.classList.add("in-stock")
        stockStatus.textContent = "In Stock"
    } else {
        stockStatus.classList.add("out-of-stock")
        stockStatus.textContent = "Out of Stock"
    }
}

function createProdContainer(prodObj) {
    let linkContainer = document.createElement("a")
    linkContainer.classList.add("product-link")
    linkContainer.href = `product.html?item=${prodObj.id}`

    let containerDiv = document.createElement("div")
    containerDiv.classList.add("product-container-long")

    let prodImg = document.createElement("img")
    prodImg.classList.add("product-image")
    prodImg.src = "#"
    prodImg.alt = "product image"

    let descContainer = document.createElement("article")
    descContainer.classList.add("product-description-container-long")

    let prodTitle = document.createElement("h3")
    prodTitle.classList.add("product-title")
    prodTitle.textContent = prodObj.name

    let prodDesc = document.createElement("p")
    prodDesc.classList.add("product-description")
    prodDesc.textContent = prodObj.description

    let prodPrice = document.createElement("p")
    prodPrice.classList.add("product-price")
    prodPrice.textContent = "$" + prodObj.price.toFixed(2)

    descContainer.appendChild(prodTitle)
    descContainer.appendChild(prodDesc)
    descContainer.appendChild(prodPrice)
    containerDiv.appendChild(prodImg)
    containerDiv.appendChild(descContainer)
    linkContainer.appendChild(containerDiv)
    return linkContainer
}

if(termDisplay) {
    termDisplay.textContent += qParams.get("searchbar")
    document.title += " " +  qParams.get("searchbar")
    fetch(fetchPath + `/products/product?q=${qParams.get("searchbar")}` , {
        method: "GET"
    })
    .then(res => res.json())
    .then((data) => {
        for(let prod of data) {
            let prodCon = createProdContainer(prod)
            productGallery.appendChild(prodCon)
        }
    })
}

if(qParams.get("item") != null) {
    fetch(fetchPath + `/products/product/${qParams.get("item")}`, {
        method: "GET"
    })
    .then(res => res.json())
    .then((data) => {
        populateProductData(data)
        document.title += " " + document.getElementsByClassName("product-title")[0].textContent
    })
}
