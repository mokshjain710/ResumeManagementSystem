const form =
    document.getElementById("resumeForm");

const preview =
    document.getElementById("resumePreview");

const savedResumes =
    document.getElementById("savedResumes");

let resumes =
    JSON.parse(localStorage.getItem("resumes")) || [];


// Save Resume
form.addEventListener(
    "submit",
    function (event) {

        // Prevent page reload
        event.preventDefault();
        // Get form values
        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const degree =
            document.getElementById("degree").value.trim();

        const college =
            document.getElementById("college").value.trim();

        const year =
            document.getElementById("year").value.trim();

        const cgpa =
            document.getElementById("cgpa").value.trim();

        const technicalSkills =
            document.getElementById("technicalSkills").value.trim();

        const softSkills =
            document.getElementById("softSkills").value.trim();

        const experience =
            document.getElementById("experience").value.trim();

        const projectName =
            document.getElementById("projectName").value.trim();

        const projectDescription =
            document.getElementById("projectDescription").value.trim();

        const objective =
            document.getElementById("objective").value.trim();


        // Check required fields
        if (
            name === "" ||
            email === "" ||
            phone === ""
        ) {

            alert(
                "Please enter Name, Email and Phone Number."
            );

            return;
        }


        // Create resume object
        const resume = {

            id: Date.now(),

            name: name,

            email: email,

            phone: phone,

            address: address,

            degree: degree,

            college: college,

            year: year,

            cgpa: cgpa,

            technicalSkills: technicalSkills,

            softSkills: softSkills,

            experience: experience,

            projectName: projectName,

            projectDescription: projectDescription,

            objective: objective

        };


        // Add resume to array
        resumes.push(resume);


        // Save resumes in browser
        localStorage.setItem(
            "resumes",
            JSON.stringify(resumes)
        );


        // Show resume preview
        showPreview(resume);


        // Display saved resumes
        displayResumes();


        // Success message
        alert(
            "Resume saved successfully!"
        );


        // Clear form
        form.reset();

    }
);


// Show Resume Preview
function showPreview(resume) {

    preview.innerHTML = `

        <div class="resume">

            <h1>
                ${resume.name}
            </h1>

            <p>
                <strong>Email:</strong>
                ${resume.email}
            </p>

            <p>
                <strong>Phone:</strong>
                ${resume.phone}
            </p>

            <p>
                <strong>Address:</strong>
                ${resume.address}
            </p>

            <hr>

            <h3>
                Career Objective
            </h3>

            <p>
                ${resume.objective}
            </p>


            <h3>
                Education
            </h3>

            <p>
                <strong>Degree:</strong>
                ${resume.degree}
                <br>

                <strong>College:</strong>
                ${resume.college}
                <br>

                <strong>Year:</strong>
                ${resume.year}
                <br>

                <strong>CGPA / Percentage:</strong>
                ${resume.cgpa}
            </p>


            <h3>
                Skills
            </h3>

            <p>
                <strong>
                    Technical Skills:
                </strong>

                ${resume.technicalSkills}
            </p>

            <p>
                <strong>
                    Soft Skills:
                </strong>

                ${resume.softSkills}
            </p>


            <h3>
                Experience
            </h3>

            <p>
                ${resume.experience}
            </p>


            <h3>
                Projects
            </h3>

            <p>
                <strong>
                    ${resume.projectName}
                </strong>
            </p>

            <p>
                ${resume.projectDescription}
            </p>


            <button
                type="button"
                onclick="window.print()">

                Print Resume

            </button>

        </div>

    `;
}


// Display Saved Resumes
function displayResumes() {

    if (resumes.length === 0) {

        savedResumes.innerHTML =
            "<p>No resumes saved yet.</p>";

        return;
    }


    // Clear previous records
    savedResumes.innerHTML = "";


    // Display each resume
    resumes.forEach(
        function (resume) {

            const resumeBox =
                document.createElement("div");


            resumeBox.className =
                "saved-resume";


            resumeBox.innerHTML = `

                <h3>
                    ${resume.name}
                </h3>

                <p>
                    ${resume.email}
                </p>

                <p>
                    ${resume.phone}
                </p>

                <button
                    type="button"
                    class="viewButton"
                    onclick="viewResume(${resume.id})">

                    View

                </button>

                <button
                    type="button"
                    class="deleteButton"
                    onclick="deleteResume(${resume.id})">

                    Delete

                </button>

            `;


            // Add resume box
            savedResumes.appendChild(
                resumeBox
            );

        }
    );

}


// View Resume
function viewResume(id) {

    const resume =
        resumes.find(
            function (item) {

                return item.id === id;

            }
        );


    if (resume) {

        showPreview(resume);


        document
            .getElementById("preview")
            .scrollIntoView({
                behavior: "smooth"
            });

    }

}


// Delete Resume
function deleteResume(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this resume?"
        );


    if (confirmDelete) {

        resumes =
            resumes.filter(
                function (resume) {

                    return resume.id !== id;

                }
            );


        // Update browser storage
        localStorage.setItem(
            "resumes",
            JSON.stringify(resumes)
        );


        // Update saved resumes
        displayResumes();


        alert(
            "Resume deleted successfully!"
        );

    }

}


// Reset Form
form.addEventListener(
    "reset",
    function () {

        setTimeout(
            function () {

                preview.innerHTML = `

                    <p>
                        Fill the form and click
                        "Save Resume"
                        to see your resume here.
                    </p>

                `;

            },
            100
        );

    }
);


// Display saved resumes
// when page opens
displayResumes();