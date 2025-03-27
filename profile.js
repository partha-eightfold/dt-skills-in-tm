// Profile page functionality

// Mock data for demonstration
const userProfile = {
    name: 'Leo Botosh',
    title: 'Product Designer at Microsoft',
    location: 'Seattle, WA',
    connections: 342,
    skills: [
        { name: 'UI/UX Design', isNew: false },
        { name: 'Product Strategy', isNew: false },
        { name: 'Figma', isNew: false },
        { name: 'Prototyping', isNew: false },
        { name: 'User Research', isNew: false },
        { name: 'RESTful APIs', isNew: true },
        { name: 'Redis', isNew: true },
        { name: 'SQL', isNew: true }
    ],
    newOpportunities: [
        {
            title: 'Product Design Manager',
            department: 'Design Leadership • Microsoft',
            path: 'job-details.html?job=Product%20Design%20Manager'
        },
        {
            title: 'API Product Designer',
            department: 'Developer Experience • Microsoft',
            path: 'job-details.html?job=API%20Product%20Designer'
        }
    ],
    experience: [
        {
            title: 'Product Designer',
            company: 'Microsoft',
            duration: 'Jan 2020 - Present',
            location: 'Seattle, WA',
            skills: ['UI/UX Design', 'Product Strategy', 'User Research'],
            logo: 'images/microsoft-logo.png'
        },
        {
            title: 'UX Designer',
            company: 'DesignStudio',
            duration: 'Mar 2017 - Dec 2019',
            location: 'San Francisco, CA',
            skills: ['UI Design', 'Prototyping', 'Figma'],
            logo: 'images/design-studio-logo.png'
        }
    ],
    predictionSkills: [
        { name: 'Node.js', percentage: 75 },
        { name: 'GraphQL', percentage: 60 },
        { name: 'React', percentage: 45 }
    ]
};

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the profile
    initializeProfile();

    // Add event listeners
    setupEventListeners();
});

function initializeProfile() {
    // Set user profile information
    document.getElementById('profile-name').textContent = userProfile.name;
    document.getElementById('profile-title').textContent = userProfile.title;
    document.getElementById('profile-location').textContent = userProfile.location;
    document.getElementById('profile-connections').textContent = userProfile.connections;

    // Populate skills
    populateSkills();
    
    // Populate new opportunities
    populateOpportunities();
    
    // Populate experience
    populateExperience();
    
    // Set up prediction skills
    populatePredictionSkills();
}

function populateSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    
    // Clear existing content
    skillsContainer.innerHTML = '';
    
    // Add skills
    userProfile.skills.forEach(skill => {
        const skillPill = document.createElement('div');
        skillPill.className = `skill-pill ${skill.isNew ? 'new-skill' : ''}`;
        skillPill.textContent = skill.name;
        skillsContainer.appendChild(skillPill);
    });

    // Update the count of new skills
    const newSkillsCount = userProfile.skills.filter(skill => skill.isNew).length;
    if (newSkillsCount > 0) {
        const newSkillsImpact = document.getElementById('new-skills-impact');
        if (newSkillsImpact) {
            newSkillsImpact.textContent = `${newSkillsCount} new skills`;
        }
        
        const newOpportunitiesCount = document.getElementById('new-opportunities-count');
        if (newOpportunitiesCount) {
            newOpportunitiesCount.textContent = `+${userProfile.newOpportunities.length}`;
        }
    }
}

function populateOpportunities() {
    const recommendationsContainer = document.querySelector('.recommendations-container');
    
    // Clear existing recommendations
    recommendationsContainer.innerHTML = '';
    
    // Add new opportunities
    userProfile.newOpportunities.forEach(opportunity => {
        const careerCard = document.createElement('div');
        careerCard.className = 'career-card';
        careerCard.innerHTML = `
            <div class="career-info">
                <span class="career-tag">New Opportunity</span>
                <h3 class="career-title">${opportunity.title}</h3>
                <p class="career-department">${opportunity.department}</p>
            </div>
            <div class="career-nav-icon">
                <img src="images/arrow-right.svg" alt="View details">
            </div>
        `;
        
        // Add click event to navigate to job details
        careerCard.addEventListener('click', () => {
            window.location.href = opportunity.path;
        });
        
        recommendationsContainer.appendChild(careerCard);
    });
    
    // Add "View all" link if there are opportunities
    if (userProfile.newOpportunities.length > 0) {
        const viewAllLink = document.createElement('a');
        viewAllLink.href = 'opportunities.html';
        viewAllLink.className = 'view-all-link';
        viewAllLink.textContent = 'View all opportunities';
        recommendationsContainer.appendChild(viewAllLink);
    }
}

function populateExperience() {
    const experienceContainer = document.querySelector('.experience-container');
    
    // Clear existing content
    experienceContainer.innerHTML = '';
    
    // Add experience items
    userProfile.experience.forEach(exp => {
        const experienceCard = document.createElement('div');
        experienceCard.className = 'experience-card';
        
        // Create the skills HTML
        let skillsHTML = '';
        if (exp.skills && exp.skills.length > 0) {
            skillsHTML = `
                <div class="experience-skills">
                    <h4>Skills</h4>
                    <div class="experience-skills-container">
                        ${exp.skills.map(skill => `<div class="skill-pill">${skill}</div>`).join('')}
                    </div>
                </div>
            `;
        }
        
        experienceCard.innerHTML = `
            <div class="experience-logo">
                <img src="${exp.logo}" alt="${exp.company} logo">
            </div>
            <div class="experience-details">
                <h3>${exp.title}</h3>
                <p class="experience-company">${exp.company}</p>
                <p class="experience-duration">${exp.duration}</p>
                <p class="experience-location">${exp.location}</p>
                ${skillsHTML}
            </div>
            <div class="experience-actions">
                <button class="edit-button">✏️</button>
            </div>
        `;
        
        experienceContainer.appendChild(experienceCard);
    });
}

function populatePredictionSkills() {
    const predictionSkillsContainer = document.querySelector('.prediction-skills');
    if (!predictionSkillsContainer) return;
    
    // Clear existing content
    predictionSkillsContainer.innerHTML = '';
    
    // Add prediction skills
    userProfile.predictionSkills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'prediction-skill';
        skillItem.innerHTML = `
            <div class="prediction-skill-name">${skill.name}</div>
            <div class="prediction-skill-bar">
                <div class="prediction-skill-progress" style="width: ${skill.percentage}%"></div>
            </div>
            <div class="prediction-skill-percentage">${skill.percentage}%</div>
        `;
        
        predictionSkillsContainer.appendChild(skillItem);
    });
}

function setupEventListeners() {
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Here you would typically show/hide content based on selected tab
            // For this prototype, we'll just leave it as a visual indication
        });
    });
    
    // Add event listener for the "Undo" button in skills section
    const undoButton = document.querySelector('.skills-undo-button');
    if (undoButton) {
        undoButton.addEventListener('click', () => {
            // Remove the new skills
            userProfile.skills = userProfile.skills.filter(skill => !skill.isNew);
            
            // Reset the opportunities as they were based on the new skills
            userProfile.newOpportunities = [];
            
            // Update the UI
            populateSkills();
            populateOpportunities();
            
            // Show a notification (in a real app)
            alert('Skills and related opportunities removed');
        });
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default for demo purposes if it's going to a non-existent page
            const href = link.getAttribute('href');
            if (href === '#' || href === 'javascript:void(0)') {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
            }
        });
    });
}

// Function to handle the "Add to profile" button for predicted skills
function addPredictedSkill(skillName) {
    // Check if the skill already exists
    const skillExists = userProfile.skills.some(skill => skill.name === skillName);
    
    if (!skillExists) {
        // Add the skill to the profile
        userProfile.skills.push({
            name: skillName,
            isNew: true
        });
        
        // Update the UI
        populateSkills();
        
        // In a real app, you might want to generate new opportunities based on this skill
        alert(`Skill "${skillName}" added to your profile`);
    } else {
        alert(`Skill "${skillName}" is already in your profile`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Sample skills data with all skills added by default
    const skillsData = [
        { id: 1, name: "Python", isSelected: true, isAiInferred: true, sources: ["Microsoft Teams App Development", "Customer Churn Analysis Project"] },
        { id: 2, name: "Data Analysis", isSelected: true, isAiInferred: false },
        { id: 3, name: "Machine Learning", isSelected: true, isAiInferred: true, sources: ["Predictive Analytics Implementation", "ML Model Deployment"] },
        { id: 4, name: "SQL", isSelected: true, isAiInferred: false },
        { id: 5, name: "JavaScript", isSelected: true, isAiInferred: true, sources: ["Web Application Development", "Interactive Dashboard Creation"] },
        { id: 6, name: "Cloud Computing", isSelected: true, isAiInferred: false },
        { id: 7, name: "Deep Learning", isSelected: true, isAiInferred: true, sources: ["Neural Network Implementation", "Computer Vision Project"] },
        { id: 8, name: "DevOps", isSelected: true, isAiInferred: false }
    ];

    // Initialize skills display
    const skillsContainer = document.querySelector('.skills-container');
    const modal = document.getElementById('skills-modal');
    const editButton = document.getElementById('edit-skills-button');
    const closeButton = document.querySelector('.modal-close');
    const cancelButton = document.querySelector('.cancel-button');
    const saveButton = document.querySelector('.save-button');
    const skillsList = document.querySelector('.skills-list');
    const searchInput = document.querySelector('.skill-search');

    // Display skills in the profile
    function displaySkills() {
        skillsContainer.innerHTML = '';
        skillsData.filter(skill => skill.isSelected).forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.textContent = skill.name;
            skillsContainer.appendChild(skillElement);
        });
    }

    // Display skills in the modal
    function displaySkillsInModal() {
        skillsList.innerHTML = '';
        skillsData.forEach(skill => {
            const skillItem = createSkillItem(skill);
            skillsList.appendChild(skillItem);
        });

        // Add event listeners to skill actions
        document.querySelectorAll('.skill-toggle').forEach(button => {
            button.addEventListener('click', (e) => {
                const skillId = parseInt(e.target.dataset.id);
                const skill = skillsData.find(s => s.id === skillId);
                if (skill) {
                    skill.isSelected = !skill.isSelected;
                    displaySkillsInModal();
                }
            });
        });
    }

    function createSkillItem(skill) {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-list-item';
        if (skill.isSelected) {
            skillItem.classList.add('selected');
        }

        const skillInfo = document.createElement('div');
        skillInfo.className = 'skill-info';

        const skillName = document.createElement('span');
        skillName.className = 'skill-name';
        skillName.textContent = skill.name;

        skillInfo.appendChild(skillName);

        if (skill.isAiInferred && skill.sources) {
            skillItem.setAttribute('data-sources', `AI Inferred\n\nInferred from:\n${skill.sources.join('\n')}`);
            skillItem.classList.add('has-sources');
        }

        const toggleButton = document.createElement('button');
        toggleButton.className = 'skill-toggle';
        toggleButton.textContent = skill.isSelected ? '×' : '+';
        toggleButton.onclick = (e) => {
            e.stopPropagation();
            skill.isSelected = !skill.isSelected;
            skillItem.classList.toggle('selected');
            toggleButton.textContent = skill.isSelected ? '×' : '+';
        };

        skillItem.appendChild(skillInfo);
        skillItem.appendChild(toggleButton);
        return skillItem;
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('.skill-list-item').forEach(item => {
            const skillName = item.querySelector('.skill-name').textContent.toLowerCase();
            item.style.display = skillName.includes(searchTerm) ? 'flex' : 'none';
        });
    });

    // Modal event listeners
    editButton.addEventListener('click', () => {
        modal.classList.add('active');
        displaySkillsInModal();
    });

    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    cancelButton.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    saveButton.addEventListener('click', () => {
        displaySkills();
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Initial display
    displaySkills();
}); 