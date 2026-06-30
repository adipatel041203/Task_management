document.getElementById("logoutBtn").addEventListener("click", async function () {

    try {

        const response = await fetch("https://intern-crud-task-api.onrender.com/api/auth/logout", {

            method: "POST",
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        });

        const result = await response.json();

        console.log(result);

        if (response.status === 200) {
            localStorage.removeItem("accessToken");
            setTimeout(() => {
                window.location.href = "Login.html";
            }, 1000);
        }
    } catch (error) {
        console.log(error);
    }
});

document.getElementById("profileBtn").addEventListener("click", function () {
    window.location.href = "profile.html";
});

document.getElementById("taskForm").addEventListener("submit", async function (event) {

    event.preventDefault();

    const taskData = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value
    };

    // console.log(taskData);

    const token = localStorage.getItem("accessToken");

    const response = await fetch("https://intern-crud-task-api.onrender.com/api/tasks", {

        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(taskData)

    });

    const result = await response.json();
    console.log(response.status);
    console.log(result);

    if (response.status === 201) {

        document.getElementById("message").innerHTML = "Task created successfully";
        document.getElementById("taskForm").reset();
    }
    else if (response.status === 400) {
        document.getElementById("message").innerHTML = "Please fill all required field";
    }
    else if (response.status === 401) {
        document.getElementById("message").innerHTML = "Please login again";
    }
    else {
        document.getElementById("message").innerHTML = "Server error";
    }

});


async function getTasks(priority = "") {

    const token = localStorage.getItem("accessToken");

    let url = "https://intern-crud-task-api.onrender.com/api/tasks";

    if (priority) {
        url += `?priority=${priority}`;
    }

    try {

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const result = await response.json();

        console.log(response.status);
        console.log(result);

        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        if (response.status === 200) {

            result.forEach(task => {

                taskList.innerHTML += `
<div class="card mb-3" id="task-${task.id}">
    <div class="card-body">

        <div class="d-flex justify-content-between align-items-center">
            <h5>${task.title}</h5>

            <span
                id="status-${task.id}"
                class="badge bg-primary"
            >
                ${task.status}
            </span>
        </div>

        <p>${task.description}</p>

        <p>
            <strong>Priority:</strong>
            ${task.priority}
        </p>

        <div class="d-flex gap-2">

            <select
                class="form-select"
                onchange="updateStatus('${task.id}', this.value)"
            >
                <option value="pending"
                    ${task.status === "pending" ? "selected" : ""}>
                    Pending
                </option>

                <option value="in-progress"
                    ${task.status === "in-progress" ? "selected" : ""}>
                    In Progress
                </option>

                <option value="completed"
                    ${task.status === "completed" ? "selected" : ""}>
                    Completed
                </option>
            </select>

            <button
                class="btn btn-danger"
                onclick="deleteTask('${task.id}')"
            >
                Delete
            </button>

        </div>

    </div>
</div>
`;
        });

        } else if (response.status === 401) {

            taskList.innerHTML = "Please login again";

        }

    } catch (error) {

        console.log(error);
        document.getElementById("taskList").innerHTML =
            "Something went wrong";
    }
}

getTasks();

document.getElementById("priorityFilter").addEventListener("change", function () {

    const selectedPriority = this.value;
    getTasks(selectedPriority);

});

async function updateTask(taskId) {

    const newDescription = prompt("Enter new description");
    const newPriority = prompt("Enter priority(Low,Medium,High)");

    const token = localStorage.getItem("accessToken");

    try {
        const response = await fetch(`https://intern-crud-task-api.onrender.com/api/tasks/${taskId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                description: newDescription,
                priority: newPriority
            })
        });

        const result = await response.json();
        console.log(response.status);
        console.log(result);

        if (response.status === 200) {
            alert("Task updated successfully");
            getTasks();
        }
        else if (response.status === 404) {
            alert("Task not found");
        }
        else if (response.status === 401) {
            alert("Login again");
        }
        else {
            alert("something went wrong");
        }

    } catch (error) {
        console.log(error);
    }

}

async function updateStatus(taskId, newStatus) {

    const token = localStorage.getItem("accessToken");

    try {

        const response = await fetch(
            `https://intern-crud-task-api.onrender.com/api/tasks/${taskId}/status`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    status: newStatus
                })
            }
        );

        const result = await response.json();

        console.log(response.status);
        console.log(result);

        if (response.status === 200) {

            document.getElementById(
                `status-${taskId}`
            ).innerText = newStatus;

        } else {

            alert(result.error || "Failed to update status");

        }

    } catch (error) {

        console.log(error);

    }

}

async function deleteTask(taskId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
        return;
    }

    const token = localStorage.getItem("accessToken");

    try {

        const response = await fetch(
            `https://intern-crud-task-api.onrender.com/api/tasks/${taskId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(response.status);

        if (
            response.status === 200 ||
            response.status === 204
        ) {

            document
                .getElementById(`task-${taskId}`)
                .remove();

        } else if (response.status === 401) {

            alert("Please login again");

        } else if (response.status === 404) {

            alert("Task not found");

        } else {

            alert("Failed to delete task");

        }

    } catch (error) {

        console.log(error);

    }

}






