document.addEventListener("DOMContentLoaded", ()=>{
    const username = document.getElementById("username");
    const psw = document.getElementById("psw");
    const email = document.getElementById("email");
    const cedula = document.getElementById("cedula");
    const sign_Up = document.getElementById("btnSignUp");
    const listusername = JSON.parse(localStorage.getItem("listusername")) || [];
    sign_Up.addEventListener("click", function() {
        const user = {
            username: username.value,
            psw: psw.value,
            email: email.value,
            cedula: cedula.value
        };
        if (user.username && user.psw && user.email && user.cedula) {
            listusername.push(user);
            console.log(listusername);
            alert(username.value);
            ///guardar en el storage(Json para entrada y salida string-entero)///
            localStorage.setItem("listusername", JSON.stringify(listusername));
            console.log("congrats  your registration is successfull");
            window.location.href = "index.html";
        } else alert("please fill in all fields");
    });
});

//# sourceMappingURL=sign_up.12b30239.js.map
