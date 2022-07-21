const productGallery = document.getElementById("product-gallery")

function createProdContainer(prodObj) {
    let imgList = prodObj.imageList.split(',')

    let linkContainer = document.createElement("a")
    linkContainer.classList.add("product-link")
    linkContainer.href = `products/product.html?item=${prodObj.id}`

    let containerDiv = document.createElement("div")
    containerDiv.classList.add("product-container")

    let prodImg = document.createElement("img")
    prodImg.classList.add("product-image")
    prodImg.src = "assets/GundamGallery/" + imgList[imgList.length - 1]
    prodImg.alt = "product image"

    let prodTitleContainer = document.createElement("h3")
    prodTitleContainer.classList.add("product-title")

    let title = document.createElement("span")
    title.textContent = prodObj.name

    let price = document.createElement("span")
    price.textContent = "$" + prodObj.price.toFixed(2)

    prodTitleContainer.appendChild(title)
    prodTitleContainer.appendChild(price)

    containerDiv.appendChild(prodImg)
    containerDiv.appendChild(prodTitleContainer)
    linkContainer.appendChild(containerDiv)
    return linkContainer
}

fetch(fetchPath + "/products/random", {
    method: "GET"
})
.then(res => res.json())
.then((data) => {
    for(let prod of data) {
        let prodCon = createProdContainer(prod)
        productGallery.appendChild(prodCon)
    }
})