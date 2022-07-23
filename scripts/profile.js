const username = document.getElementById("profile-username")
const email = document.getElementById("profile-email")
const address = document.getElementById("profile-address")
const updateAddress = document.getElementById("profile-address-update-form")
const logout = document.getElementById("logout-button")


function populateProfile(userObj) {
    document.title += " " + userObj.username
    username.textContent = userObj.username
    email.textContent = userObj.email
    address.textContent = userObj.shippingAddress == null ? "You have not set a Shipping Address yet." : userObj.shippingAddress
}

if(getAuthCookie() !== null) {
    fetch(fetchPath + "/auth/users/" + localStorage.getItem("forest-user"), {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + getAuthCookie()
        }
    })
    .then(res => res.json())
    .then(data => {
        populateProfile(data)
    })
} else {
    window.location.href = "index.html"
}

logout.addEventListener('click', () => {
    localStorage.removeItem("forest-user")
    localStorage.removeItem("forest-cart-count")
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
    window.location.href = "index.html"
})

updateAddress.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(fetchPath + "/auth/user", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getAuthCookie()
        },
        body: JSON.stringify({
            username: localStorage.getItem("forest-user"),
            shippingAddress: updateAddress.addressinput.value
        })
    }).then(res => res.text()).then(data => { 
        alert(data)
        window.location.reload()
    })
})