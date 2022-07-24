const loginForm = document.getElementById("user-form")

if(isTokenCookiePresent()) {
    window.location.href = "profile.html"
}

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let hashedWord = hex_sha256(loginForm.passinput.value)

    fetch(fetchPath + "/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: loginForm.usernameinput.value,
            password: hashedWord
        })
    })
    .then((res) => {
        return res.json()
    }).then((data) => {
        if(data.error) {
            throw new Error("Invalid Credentials")
        }
        let productredirect = sessionStorage.getItem("previousproduct")
        let date = new Date();
        date.setTime(date.getTime() + 7*24*60*60*1000)
        localStorage.setItem("forest-user", data.username)
        document.cookie = `token=${data.token}; expires=${date.toUTCString()}; path=/`
        if(productredirect != null) {
            sessionStorage.removeItem("previousproduct")
            window.location.href = "/products/product.html?item=" + productredirect
            return
        }
        window.location.href = "index.html"
    }).catch((err) => {
        document.getElementById("err-msg").textContent = err
    })
})
