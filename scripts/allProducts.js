const productGallery = document.getElementById("product-gallery")

function createProdContainer(prodObj) {
    let imgList = prodObj.imageList.split(',')

    let linkContainer = document.createElement("a")
    linkContainer.classList.add("product-link")
    linkContainer.href = `product.html?item=${prodObj.id}`

    let containerDiv = document.createElement("div")
    containerDiv.classList.add("product-container-long")

    let prodImg = document.createElement("img")
    prodImg.classList.add("product-image")
    prodImg.src = "../assets/GundamGallery/" + imgList[imgList.length - 1]
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

fetch(fetchPath + "/products", {
    method: "GET"
})
.then(res => res.json())
.then((data) => {
    for(let prod of data) {
        let prodCon = createProdContainer(prod)
        productGallery.appendChild(prodCon)
    }
})
