const loginForm = document.getElementById("user-form")

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let hashedWord = hex_sha256(loginForm.passinput.value)
    let formData = new FormData();
    formData.set("username", loginForm.usernameinput.value)
    formData.set("password", hashedWord)

    fetch(fetchPath + "/login", {
        method: "POST",
        body: formData
    })
    .then((res) => {
        return res.json()
    }).then((data) => {
        localStorage.setItem("forest-user", data.username)
    })
})
