document.getElementById('signupForm').addEventListener("submit", async function (event) {

    event.preventDefault();

    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("pwd").value,
        fullName: document.getElementById("fullName").value,
        gender: document.querySelector('input[name="gender"]:checked').value
    }

    try {
        const response = await fetch("https://intern-crud-task-api.onrender.com/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (response.status === 201) {

            document.getElementById("message").innerHTML = "Account created successfully";

            setTimeout(() => {
                window.location.href = "Login.html";
            },1000);

        }
        else if(response.status === 409) 
        {
            document.getElementById("message").innerHTML = "Email already registered";
        }
        else{
            document.getElementById("message").innerHTML = "Something went wrong";
        }
    }
    catch (error) {
        console.log(error);
    }

});