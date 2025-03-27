document.addEventListener('DOMContentLoaded', function() {
    // Parse URL parameters to get job title
    const urlParams = new URLSearchParams(window.location.search);
    const jobTitle = urlParams.get('job');
    
    // Job data object (in a real app, this would come from an API)
    const jobData = {
        "Senior Data Scientist": {
            title: "Senior Data Scientist",
            department: "Data Science Department",
            badge: "Top Match",
            matchPercentage: "92",
            location: "San Francisco, CA",
            salary: "$140,000 - $180,000",
            description: "As a Senior Data Scientist, you will lead data science initiatives, develop machine learning models, and collaborate with cross-functional teams to drive business insights. You'll be responsible for translating complex data problems into actionable solutions that impact our product and business strategy."
        },
        "ML Engineering Lead": {
            title: "ML Engineering Lead",
            department: "Engineering Department",
            badge: "Great Match",
            matchPercentage: "85",
            location: "Boston, MA",
            salary: "$150,000 - $190,000",
            description: "As an ML Engineering Lead, you will oversee the development and deployment of machine learning models into production environments. You'll work closely with data scientists and software engineers to build scalable, efficient, and reliable ML systems."
        },
        "Data Engineering Manager": {
            title: "Data Engineering Manager",
            department: "Infrastructure Department",
            badge: "Good Match",
            matchPercentage: "78",
            location: "New York, NY",
            salary: "$145,000 - $185,000",
            description: "As a Data Engineering Manager, you will lead a team of data engineers to build and maintain data pipelines and infrastructure. You'll be responsible for ensuring data reliability, scalability, and performance across the organization."
        }
    };
    
    // Update job details if job title is provided
    if (jobTitle && jobData[jobTitle]) {
        const job = jobData[jobTitle];
        
        // Update page title
        document.title = `${job.title} - Job Opportunity`;
        
        // Update job header information
        document.getElementById('job-title').textContent = job.title;
        document.getElementById('job-department').textContent = job.department;
        document.getElementById('job-badge').textContent = job.badge;
        
        // Update match percentage
        document.getElementById('match-percentage').textContent = `${job.matchPercentage}%`;
        document.getElementById('skills-percentage').textContent = `${job.matchPercentage}%`;
        
        // Update progress bars
        document.getElementById('match-progress').style.width = `${job.matchPercentage}%`;
        document.querySelector('.chart-progress').style.width = `${job.matchPercentage}%`;
        
        // Update job details
        document.getElementById('job-description').textContent = job.description;
        document.getElementById('job-location').textContent = job.location;
        document.getElementById('job-salary').textContent = job.salary;
    }
    
    // Add event listeners for skill development links
    const skillLinks = document.querySelectorAll('.sidebar-skill-link');
    skillLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const skillName = this.closest('.sidebar-skill').querySelector('.sidebar-skill-name').textContent;
            alert(`This would take you to learning resources for ${skillName}`);
        });
    });
    
    // Add event listeners for similar job links
    const similarJobLinks = document.querySelectorAll('.similar-job-link');
    similarJobLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const jobName = this.closest('.similar-job').querySelector('h4').textContent;
            window.location.href = `job-details.html?job=${encodeURIComponent(jobName)}`;
        });
    });
    
    // Add event listeners for action buttons
    const applyButton = document.querySelector('.primary-button');
    if (applyButton) {
        applyButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This would take you to the application form for this role.');
        });
    }
    
    const saveButton = document.querySelector('.secondary-button');
    if (saveButton) {
        saveButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This job has been saved to your profile for later.');
        });
    }
    
    // Dynamic skill visualization based on inferred skills
    const skillItems = document.querySelectorAll('.skill-match-item');
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-name').textContent;
        const matchPercentage = item.querySelector('.skill-match-text').textContent;
        
        // Add tooltip to show skill inference source
        item.setAttribute('title', `${skillName} (${matchPercentage} match) - Recently inferred from your project work`);
        
        // Add animation effect for recently inferred skills
        if (!item.classList.contains('missing')) {
            item.style.position = 'relative';
            item.style.animation = 'pulse 2s infinite';
            
            // Create and add a "NEW" badge for recently inferred skills
            const newBadge = document.createElement('span');
            newBadge.textContent = 'NEW';
            newBadge.style.position = 'absolute';
            newBadge.style.top = '-8px';
            newBadge.style.right = '-8px';
            newBadge.style.backgroundColor = '#2563eb';
            newBadge.style.color = 'white';
            newBadge.style.fontSize = '10px';
            newBadge.style.fontWeight = 'bold';
            newBadge.style.padding = '2px 6px';
            newBadge.style.borderRadius = '10px';
            
            item.appendChild(newBadge);
        }
    });
    
    // Create animation keyframes for pulse effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.2); }
            70% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }
    `;
    document.head.appendChild(style);
}); 