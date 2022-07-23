const registrationForm = document.getElementById("user-form")


if(isTokenCookiePresent()) {
    window.location.href = "profile.html"
}

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
        return res.text()
    }).then((data) => {
        alert(data) // need to change this somehow
        window.location.href = "login.html"
    })
})
