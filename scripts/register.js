const registrationForm = document.getElementById("user-form")


if(isTokenCookiePresent()) {
    window.location.href = "profile.html"
}

registrationForm.passinput.addEventListener('change', () => {
    registrationForm.passinput.value = registrationForm.passinput.value.replace(/\s+/g, "")
})

registrationForm.usernameinput.addEventListener('change', () => {
    registrationForm.usernameinput.value = registrationForm.usernameinput.value.replace(/\s+/g, "")
})

registrationForm.emailinput.addEventListener('change', () => {
    registrationForm.emailinput.value = registrationForm.emailinput.value.replace(/\s+/g, "")
})

registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let hashedWord = hex_sha256(registrationForm.passinput.value)
    fetch(fetchPath + "/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: registrationForm.usernameinput.value,
            password: hashedWord,
            email: registrationForm.emailinput.value
        })
    }).then((res) => {
        if(res.status != 200) {
            throw new Error("Invalid registration information. Please try again.")
        }
        return res.text()
    }).then((data) => {
        let main =  document.getElementsByTagName("main")[0]
        let loginlink = document.createElement("a")
        loginlink.href = "login.html"
        loginlink.textContent = "Go to Login"
        clearElements(document.getElementsByTagName("main")[0])
        main.style.color = "green"
        main.textContent = data
        main.appendChild(loginlink)
    }).catch((err) => {
        document.getElementById("err-msg").textContent = err
    })
})
