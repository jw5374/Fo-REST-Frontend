const termDisplay = document.getElementById("search-term")
const productGallery = document.getElementById("product-gallery")
const individualProductCount = document.getElementById("i-prod-count")
const addToCartButton = document.getElementById("add-to-cart")

let qParams = new URLSearchParams(window.location.search)

let indProd;
let fetchedCart;

let cartcount = parseInt(localStorage.getItem("forest-cart-count"))

function populateProductData(prodObj) {
    let imgList = prodObj.imageList.split(',')
    let largeImg = imgList.pop()

    let prodLargeImg = document.getElementsByClassName("large-product-image")[0]
    prodLargeImg.src = "../assets/GundamGallery/" + largeImg

    let smallGallery = document.getElementsByClassName("small-image-gallery")[0]

    for(let img of imgList) {
        let smallContainer = document.createElement("img")
        smallContainer.classList.add("small-product-image")
        smallContainer.alt = "small product image"
        smallContainer.src = "../assets/GundamGallery/" + img
        smallContainer.addEventListener('click', () => {
            let largeImg = document.getElementsByClassName("large-product-image")[0]
            let largeSrc = largeImg.src
            largeImg.src = smallContainer.src
            smallContainer.src = largeSrc
        })
        smallGallery.appendChild(smallContainer)
    }

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

function saveNewItem() {
    fetch(fetchPath + `/carts/${localStorage.getItem("forest-user")}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getAuthCookie()
        },
        body: JSON.stringify({
            user: {
                username: localStorage.getItem("forest-user")               
            },
            product: indProd,
            count: individualProductCount.value
        })
    })
    .then(res => res.json())
    .then(data => {
        fetchedCart = data.cartid
        localStorage.setItem("forest-cart-count", cartcount+1)
        window.location.href = window.location.protocol + "//" + window.location.host + "/cart.html"
    })
}

function updateItem() {
    fetch(fetchPath + `/carts/${localStorage.getItem("forest-user")}/item`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getAuthCookie()
        },
        body: JSON.stringify({
            cartid: fetchedCart,
            count: individualProductCount.value
        })
    }).then(() => {
        window.location.href = window.location.protocol + "//" + window.location.host + "/cart.html"
    })
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
        indProd = data
        populateProductData(data)
        document.title += " " + document.getElementsByClassName("product-title")[0].textContent
    })

    if(isTokenCookiePresent()) {
        fetch(fetchPath + `/carts/${localStorage.getItem("forest-user")}/${qParams.get("item")}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + getAuthCookie()
            }
        })
        .then(res => res.json())
        .then(data => {
            individualProductCount.value = data.count
            fetchedCart = data.cartid
            addToCartButton.addEventListener('click', updateItem)
        })
        .catch(() => {
            addToCartButton.addEventListener('click', saveNewItem)
        })
    } else {
        addToCartButton.addEventListener('click', () => {
            window.location.href = window.location.protocol + "//" + window.location.host + "/login.html"
        })
    }
}
