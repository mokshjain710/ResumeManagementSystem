const resumeForm = document.getElementById("resumeForm");

const resumePreview = document.getElementById("resumePreview");

const savedResumes = document.getElementById("savedResumes");


// Get saved resumes from browser

let resumes = JSON.parse(localStorage.getItem("resumes")) || [];


// Save Resume

resumeForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // Get form values

    const resume = {

        id: Date.now(),

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value,

        degree: document.getElementById("degree").value,

        college: document.getElementById("college").value,

        year: document.getElementById("year").value,

        cgpa: document.getElementById("cgpa").value,

        technicalSkills: document.getElementById("technicalSkills").value,

        softSkills: document.getElementById("softSkills").value,

        experience: document.getElementById("experience").value,

        projectName: document.getElementById("projectName").value,

        projectDescription: document.getElementById("projectDescription").value,

        objective: document.getElementById("objective").value

    };


    // Check required fields

    if (
        resume.name === "" ||
        resume.email === "" ||
        resume.phone === ""
    ) {

        alert("Please enter Name, Email and Phone Number.");

        return;
    }


    // Add resume to array

    resumes.push(resume);


    // Save all resumes

    localStorage.setItem("resumes", JSON.stringify(resumes));


    // Show preview

    showPreview(resume);


    // Show saved resumes

    displayResumes();


    // Message

    alert("Resume saved successfully!");


    // Clear form

    resumeForm.reset();

});


// Show Resume Preview

function showPreview(resume) {

    resumePreview.innerHTML = `

        <div class="resume">

            <h1>${resume.name}</h1>

            <p>
                <strong>Email:</strong> ${resume.email}
            </p>

            <p>
                <strong>Phone:</strong> ${resume.phone}
            </p>

            <p>
                <strong>Address:</strong> ${resume.address}
            </p>

            <hr>

            <h3>Career Objective</h3>

            <p>
                ${resume.objective}
            </p>


            <h3>Education</h3>

            <p>
                <strong>Degree:</strong> ${resume.degree}
                <br>

                <strong>College:</strong> ${resume.college}
                <br>

                <strong>Year:</strong> ${resume.year}
                <br>

                <strong>CGPA / Percentage:</strong> ${resume.cgpa}
            </p>


            <h3>Skills</h3>

            <p>
                <strong>Technical Skills:</strong>
                ${resume.technicalSkills}
            </p>

            <p>
                <strong>Soft Skills:</strong>
                ${resume.softSkills}
            </p>


            <h3>Experience</h3>

            <p>
                ${resume.experience}
            </p>


            <h3>Projects</h3>

            <p>
                <strong>${resume.projectName}</strong>
            </p>

            <p>
                ${resume.projectDescription}
            </p>


            <button onclick="window.print()">
                Print Resume
            </button>

        </div>

    `;
}


// Display all saved resumes

function displayResumes() {

    if (resumes.length === 0) {

        savedResumes.innerHTML =
            "<p>No resumes saved yet.</p>";

        return;
    }


    savedResumes.innerHTML = "";


    resumes.forEach(function(resume, index) {

        const resumeBox = document.createElement("div");

        resumeBox.className = "saved-resume";


        resumeBox.innerHTML = `

            <h3>${resume.name}</h3>

            <p>
                ${resume.email}
            </p>

            <p>
                ${resume.phone}
            </p>

            <button onclick="viewResume(${resume.id})">
                View
            </button>

            <button onclick="deleteResume(${resume.id})">
                Delete
            </button>

        `;


        savedResumes.appendChild(resumeBox);

    });
}

// View Resume

function viewResume(id) {

    const resume = resumes.find(function(item) {

        return item.id === id;

    });


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
        confirm("Are you sure you want to delete this resume?");


    if (confirmDelete) {

        resumes = resumes.filter(function(resume) {

            return resume.id !== id;

        });


        localStorage.setItem(
            "resumes",
            JSON.stringify(resumes)
        );


        displayResumes();


        alert("Resume deleted successfully!");

    }

}


// Reset form

resumeForm.addEventListener("reset", function() {

    setTimeout(function() {

        resumePreview.innerHTML = `

            <p>
                Fill the form and click "Save Resume"
                to see your resume here.
            </p>

        `;

    }, 100);

});


// Display saved resumes when page opens

displayResumes();