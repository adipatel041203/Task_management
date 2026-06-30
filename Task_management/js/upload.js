document.getElementById("uploadBtn").addEventListener("click", uploadImage);

async function uploadImage() {
    const token = localStorage.getItem("accessToken");
    const imageFile = document.getElementById("image").files[0];

    if (!imageFile) {
        alert("Please select an image");
    }

    const formData = new FormData();

    formData.append("image", imageFile);

    try {

        const response = await fetch("https://intern-crud-task-api.onrender.com/api/files/upload", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        const result = await response.json();
        console.log(response.status);
        console.log(result);

        if (response.status === 200) {
            alert(result.message);
            const image = document.getElementById("uploadedImage");
            image.src = result.secure_url;
            image.style.display = "block";
        }
        else {
            alert(result.error || "Upload failed");
        }

    } catch (error) {
        console.log(error); 
    }
}