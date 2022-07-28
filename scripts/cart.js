const cartproducts = document.getElementById("cart-item-container")
const totalPrice = document.getElementById("total-price")
const checkoutButton = document.getElementById("checkout-button")
const saveCart = document.getElementById("save-cart-button")
const cartMessage = document.getElementById("cart-message")

let cartObjs;

function removeCart(id) {
    for(let i = 0; i < cartObjs.length; i++) {
        if(cartObjs[i].cartid == id) {
            cartObjs.splice(i, 1)
            return;
        }
    }
}

function updateCart(id, count) {
    for(let i = 0; i < cartObjs.length; i++) {
        if(cartObjs[i].cartid == id) {
            cartObjs[i].count = count
            return;
        }
    }
}

function createCartItem(cartObj) {
    let productContainer = document.createElement("div")
    let prodLink = document.createElement("a")
    let cartImage = document.createElement("img")
    let cartProductTitle = document.createElement("h3")
    let countMarker = document.createElement("span")
    let productCount = document.createElement("input")
    let productPrice = document.createElement("span")
    let deleteButton = document.createElement("button")
    let deleteIcon = document.createElement("i")

    productContainer.classList.add("cart-product")

    prodLink.href = "products/product.html?item=" + cartObj.product.id
    prodLink.textContent = cartObj.product.name

    let productImgs = cartObj.product.imageList.split(",")
    cartImage.src = "assets/GundamGallery/" + productImgs[productImgs.length - 1]
    cartImage.alt = "cart product image"
    cartImage.classList.add("cart-image")

    cartProductTitle.classList.add("cart-product-name")   

    countMarker.textContent = "x"

    productCount.type = "number"
    productCount.min = 0
    productCount.max = cartObj.product.count
    productCount.name = "productcount"
    productCount.value = cartObj.count
    productCount.classList.add("product-count")

    productPrice.textContent = "$" + cartObj.product.price
    productPrice.classList.add("cart-product-price")

    deleteButton.classList.add("remove-item-button")

    deleteIcon.classList.add("bi", "bi-trash")
    
    deleteButton.appendChild(deleteIcon)
    cartProductTitle.appendChild(prodLink)
    productContainer.appendChild(cartImage)
    productContainer.appendChild(cartProductTitle)
    productContainer.appendChild(countMarker)
    productContainer.appendChild(productCount)
    productContainer.appendChild(productPrice)
    productContainer.appendChild(deleteButton)
    productContainer.dataset.cartid = cartObj.cartid

    deleteButton.addEventListener('click', (e) => {
        cartproducts.removeChild(deleteButton.parentElement)
        document.getElementById("total-price").textContent = `Total: $${(parseFloat(document.getElementById("total-price").textContent.split("$")[1]) - (cartObj.product.price * cartObj.count)).toFixed(2)}`
        fetch(fetchPath + "/carts/" + localStorage.getItem("forest-user"), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthCookie()}`
            },
            body: JSON.stringify({
                cartid: cartObj.cartid
            })
        })
        .then(res => res.json())
        .then(() => {
            cartCount.textContent = parseInt(cartCount.textContent) - parseInt(deleteButton.previousElementSibling.previousElementSibling.value)
            localStorage.setItem("forest-cart-count", cartCount.textContent)
            removeCart(productContainer.dataset.cartid)
        })
    })

    productCount.addEventListener("change", () => {
        let maxVal = cartObj.product.count
        let minVal = 0
        if(productCount.value === "") {
            productCount.value = minVal
        }
        if(productCount.value > maxVal) {
            productCount.value = maxVal
        }
        if(productCount.value < minVal) {
            productCount.value = minVal
        }
        let newval = productCount.value
        let difference = (cartObj.product.price * newval) - (cartObj.product.price * cartObj.count)
        document.getElementById("total-price").textContent = `Total: $${(parseFloat(document.getElementById("total-price").textContent.split("$")[1]) + difference).toFixed(2)}`
        updateCart(productContainer.dataset.cartid, newval)
    })

    return productContainer
}

function calculateTotal(cartObjsArray) {
    let total = 0;
    for(let item of cartObjsArray) {
        total += item.product.price * item.count
    }
    return total.toFixed(2)
}

if(!isTokenCookiePresent()) {
    window.location.href = "login.html"
}

fetch(fetchPath + "/carts/" + localStorage.getItem("forest-user"), {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${getAuthCookie()}`
    }
})
.then(res => res.json())
.then((data) => {
    cartObjs = data
    for(let cartobj of data) {
        cartproducts.appendChild(createCartItem(cartobj))
    }
    totalPrice.textContent = "Total: $" + calculateTotal(cartObjs)
})

saveCart.addEventListener('click', () => {
    fetch(fetchPath + "/carts/" + localStorage.getItem("forest-user"), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAuthCookie()}`
        },
        body: JSON.stringify(cartObjs)
    }).then(() => {
        cartMessage.style.color = "green"
        cartMessage.textContent = "You've successfully saved your cart items!"
        let sum = 0
        for(let obj of cartObjs) {
            sum += parseInt(obj.count)
        }
        cartCount.textContent = sum
        localStorage.setItem("forest-cart-count", cartCount.textContent)
        saveCart.classList.add("disable")
        setTimeout(() => {
            saveCart.classList.remove("disable")
        }, 2000)
    })
})

checkoutButton.addEventListener('click', () => {
    if(cartObjs.length == 0) {
        window.location.reload()
        return
    }
    localStorage.setItem("forest-cart-count", 0)
    fetch(fetchPath + "/carts/" + localStorage.getItem("forest-user") + "/checkout", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAuthCookie()}`
        },
        body: JSON.stringify(cartObjs)
    }).then(() => {
        let sum = 0;
        for(let obj of cartObjs) {
            sum += obj.count
        }
        cartMessage.style.color = "green"
        cartMessage.textContent = "You've successfully purchased " + sum  + " items!"
        cartObjs = []
        cartCount.classList.add("hide")
    })
    clearElements(document.getElementById("cart-item-container"))
})
