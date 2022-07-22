const loginForm = document.getElementById("user-form")

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    // let hashedWord = hex_sha256(loginForm.passinput.value)
    let formData = new FormData();
    formData.set("username", loginForm.usernameinput.value)
    formData.set("password", loginForm.passinput.value)

    fetch(fetchPath + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    })
    // .then((res) => {
    //     return res.text()
    // }).then((data) => {
    //     alert(data) // need to change this somehow
    //     window.location.href = "login.html"
    // })
})