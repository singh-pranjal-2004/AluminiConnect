// Code By Pranjal

async function getJobData() {
    const url = '/jobs'; // Fetch job data from the server endpoint
    let jobs_data = [];

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        jobs_data = await response.json();

        // Filter out jobs where the date is 'Ended'
        jobs_data = jobs_data.filter(job => job.date !== 'Ended');

        // Sort jobs by remaining time in ascending order
        jobs_data = jobs_data.sort((a, b) => {
            const hoursA = convertToHours(a.date);
            const hoursB = convertToHours(b.date);

            return hoursA - hoursB;
        });

        // Render job listings
        renderJobListings(jobs_data);

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Function to convert 'hours left', 'days left', or 'months left' to hours
function convertToHours(dateString) {
    const [value, unit] = dateString.split(' '); // Extract number and time unit
    const numValue = parseInt(value);

    if (unit.includes('hour')) {
        return numValue; // It's already in hours
    } else if (unit.includes('day')) {
        return numValue * 24; // Convert days to hours
    } else if (unit.includes('month')) {
        return numValue * 720; // Convert months to hours (1 month ≈ 30 days)
    }

    return Infinity; // If the format is unknown, put it at the end
}

// Function to render job listings in grid format using Bootstrap
function renderJobListings(jobs) {
    const jobListingsElement = document.getElementById('job-listings');
    jobListingsElement.innerHTML = jobs.map(job => `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <div class="card-body text-center"> <!-- Center the content -->
                    <img src="${job.logo}" class="img-fluid logo-img mb-3" alt="${job.company} logo">
                    <h5 class="card-title">${job.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${job.company}</h6>
                    <p class="card-text"><strong>Location:</strong> ${job.location.join(', ')}</p>
                    <p class="card-text"><strong>Date Left:</strong> ${job.date}</p>
                    <a href="${job.link}" target="_blank" class="btn btn-primary">Apply</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Fetch and render job data when the page loads
document.addEventListener('DOMContentLoaded', getJobData);