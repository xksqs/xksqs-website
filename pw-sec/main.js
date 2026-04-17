const submit = document.getElementById("submit")
const form = document.getElementById("info")

function fpost(url, name, pw) {
    fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        username: name,
        password: pw
    })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

submit.addEventListener("click", () => {
    fpost("https://xksqs-website.pages.dev/api", form.elements["username"], form.elements["password"])
});


