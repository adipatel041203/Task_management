document.getElementById('LoginForm').addEventListener("submit", async function (event) {

    event.preventDefault();

    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("pwd").value
    }

    console.log(data);

    try {

        const response = await fetch("https://intern-crud-task-api.onrender.com/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(response.status);
        console.log(result);

        if (response.status === 200) {

            localStorage.setItem("accessToken", result.accessToken);

            document.getElementById("message").innerHTML = "Login successful";


             setTimeout(() => {
                window.location.href = "Dashboard.html";
            },1000);
        }

        else if (response.status === 401) {
            document.getElementById("message").innerHTML = "Invalid email or password";
        }
        else {
            document.getElementById("message").innerHTML = result.message;
        }

    } catch (error) {
        console.log(error);
        document.getElementById("message").innerHTML = "Something went wrong";
    }

});