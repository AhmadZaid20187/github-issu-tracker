const loginBtn = document.getElementById("loginBtn").addEventListener("click", function () {
    const inputUsername = document.getElementById("inputUsername")
    const userName = inputUsername.value;
    const inputPassword = document.getElementById("password")
    const password = inputPassword.value;
    console.log(userName)
    console.log(password)
    if (userName == "admin" && password == "admin123") {
        alert("Login Successfull")
        window.location.assign("home.html")
    } else {
        alert("Login Faild")
        return;
    }
})