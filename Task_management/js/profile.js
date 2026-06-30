async function getProfile() {

    const token = localStorage.getItem("accessToken");

    try {

        const response = await fetch(
            "https://intern-crud-task-api.onrender.com/api/profile",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const result = await response.json();

        console.log(response.status);
        console.log(result);

        if (response.status === 200) {

            document.getElementById("fullName").value =
                result.fullName || "";

            document.getElementById("gender").value =
                result.gender || "";

            document.getElementById("address").value =
                result.address || "";

            document.getElementById("universityName").value =
                result.universityName || "";

            document.getElementById("city").value =
                result.city || "";

            document.getElementById("guardianName").value =
                result.guardianName || "";

            document.getElementById("guardianPhoneNumber").value =
                result.guardianPhoneNumber || "";

            document.getElementById("personalMobileNumber").value =
                result.personalMobileNumber || "";

            if (result.profileUrl) {
                document.getElementById("profilePreview").src =
                    result.profileUrl;
            }

        }

    } catch (error) {

        console.log(error);

    }

}

getProfile();

document.getElementById("updateProfileBtn")
    .addEventListener("click", updateProfile);

async function updateProfile() {

    const token = localStorage.getItem("accessToken");

    const formData = new FormData();

    formData.append(
        "fullName",
        document.getElementById("fullName").value
    );

    formData.append(
        "gender",
        document.getElementById("gender").value
    );

    formData.append(
        "address",
        document.getElementById("address").value
    );

    formData.append(
        "universityName",
        document.getElementById("universityName").value
    );

    formData.append(
        "city",
        document.getElementById("city").value
    );

    formData.append(
        "guardianName",
        document.getElementById("guardianName").value
    );

    formData.append(
        "guardianPhoneNumber",
        document.getElementById("guardianPhoneNumber").value
    );

    formData.append(
        "personalMobileNumber",
        document.getElementById("personalMobileNumber").value
    );

    const imageFile =
        document.getElementById("profileImage").files[0];

    if (imageFile) {

        formData.append(
            "profileImage",
            imageFile
        );

    }

    try {

        const response = await fetch(
            "https://intern-crud-task-api.onrender.com/api/profile",
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }
        );

        const result = await response.json();

        console.log(response.status);
        console.log(result);

        if (response.status === 200) {

            alert("Profile updated successfully");

            getProfile();

        } else {

            alert(result.error || "Update failed");

        }

    } catch (error) {

        console.log(error);

    }

}

document.getElementById("profileImage")
.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        document.getElementById("profilePreview").src =
            URL.createObjectURL(file);

    }

});