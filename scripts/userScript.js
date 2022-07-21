const registrationForm = document.getElementById("user-form")


// mdn SubtleCrypto docs
async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}

async function getDigested(message) {
    const data = await digestMessage(message);
    return data;
}

registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let hashedWord = await getDigested(registrationForm.passinput.value)
    fetch(fetchPath + "/register", {
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
        alert(res.text())
        window.location.href = "login.html"
    })
})