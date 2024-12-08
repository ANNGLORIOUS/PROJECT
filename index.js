document.addEventListener("DOMContentLoaded", function () {
    // Initially hide all sections when the page loads
    hideAllSections();
    
    // Fetch data from db.json and display the course cards
    fetch('public/db.json')
        .then(response => response.json())
        .then(data => {
            displayCourses(data.courses);
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });

    // Function to display courses
    function displayCourses(courses) {
        const coursesContainer = document.querySelector(".courses-container");
        // Clear the container before adding new cards
        coursesContainer.innerHTML = '';
        
        // Create and append a card for each course
        courses.forEach(course => {
            const card = createCourseCard(course);
            coursesContainer.appendChild(card);
        });
    }

    // Function to create a single course card
    function createCourseCard(course) {
        const card = document.createElement('div');
        card.classList.add('course-card');
        card.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <a href="${course.link}" target="_blank">
                <button>Get Paper</button>
            </a>
        `;
        return card;
    }

    // Initially show the login section
    showSection('login');

    // Interactive search bar function
    function searchFunction() {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const sectionText = section.textContent.toLowerCase();
            if (sectionText.includes(searchTerm)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }

    // Attach the search function to the input field's keyup event
    document.getElementById('search').addEventListener('keyup', searchFunction);

});

// Function to show the selected section
function showSection(sectionId) {
    hideAllSections(); // Hide all sections first

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Function to hide all sections
function hideAllSections() {
    const sections = document.querySelectorAll('.section');
    
    // Loop through all sections and hide them
    sections.forEach(section => {
        section.style.display = 'none';
    });
}
