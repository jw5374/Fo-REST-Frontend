const loginForm = document.getElementById("user-form")


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
        let date = new Date();
        date.setTime(date.getTime() + 7*24*60*60*1000)
        localStorage.setItem("forest-user", data.username)
        console.log(`token=${data.token}; expires=${date.toUTCString()}; path=/`, data)
        document.cookie += `token=${data.token}; expires=${date.toUTCString()}; path=/`
        window.location.href = "index.html"
    }).catch((err) => {
        alert(err)
    })
})

