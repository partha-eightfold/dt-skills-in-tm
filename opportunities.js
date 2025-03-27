document.addEventListener('DOMContentLoaded', function() {
    // Add click events for view opportunity buttons
    const viewButtons = document.querySelectorAll('.view-button');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const cardTitle = this.closest('.opportunity-card, .learning-card').querySelector('h3').textContent;
            if (this.closest('.opportunity-card')) {
                window.location.href = `job-details.html?job=${encodeURIComponent(cardTitle)}`;
            } else {
                alert(`You clicked to view details for course: ${cardTitle}`);
            }
        });
    });
    
    // Make entire opportunity cards clickable
    const opportunityCards = document.querySelectorAll('.opportunity-card');
    opportunityCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only redirect if click wasn't on a button or link
            if (!e.target.closest('a') && !e.target.closest('button')) {
                const cardTitle = this.querySelector('h3').textContent;
                window.location.href = `job-details.html?job=${encodeURIComponent(cardTitle)}`;
            }
        });
    });
    
    // Add click events for missing skills suggestions
    const missingSkills = document.querySelectorAll('.skill-card.missing .skill-source');
    missingSkills.forEach(skill => {
        skill.addEventListener('click', function() {
            const skillName = this.closest('.skill-card').querySelector('.skill-name').textContent;
            // Smoothly scroll to learning paths section
            const learningPaths = document.querySelector('.learning-paths');
            learningPaths.scrollIntoView({ behavior: 'smooth' });
            
            // Highlight relevant learning card
            setTimeout(() => {
                const learningCards = document.querySelectorAll('.learning-card');
                learningCards.forEach(card => {
                    card.style.transform = 'none';
                    card.style.boxShadow = 'none';
                    
                    const cardTitle = card.querySelector('h3').textContent;
                    if (cardTitle.includes(skillName)) {
                        card.style.transform = 'translateY(-5px)';
                        card.style.boxShadow = '0 15px 30px -5px rgba(0, 0, 0, 0.1)';
                        card.style.border = '2px solid #2563eb';
                    }
                });
            }, 500);
        });
    });
    
    // Simulate dynamic skill updates
    let remainingSkills = 2;
    const skillsCount = document.querySelector('.skills-count');
    
    const acquiredSkillsCards = document.querySelectorAll('.skill-card.acquired');
    acquiredSkillsCards.forEach(card => {
        const source = card.querySelector('.skill-source');
        if (source.textContent === 'Recently inferred') {
            // Add a remove button
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-skill';
            removeBtn.textContent = '✕';
            removeBtn.style.position = 'absolute';
            removeBtn.style.top = '10px';
            removeBtn.style.right = '10px';
            removeBtn.style.background = 'transparent';
            removeBtn.style.border = 'none';
            removeBtn.style.color = '#64748b';
            removeBtn.style.cursor = 'pointer';
            removeBtn.style.fontSize = '16px';
            card.style.position = 'relative';
            card.appendChild(removeBtn);
            
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click
                // Remove the skill card with animation
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                card.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    card.remove();
                    
                    // Update the skills count
                    const currentCount = parseInt(skillsCount.textContent.split(' of ')[0]);
                    skillsCount.textContent = `${currentCount - 1} of 18 skills acquired`;
                    
                    // Update progress bar
                    const progressBar = document.querySelector('.progress');
                    const progressText = document.querySelector('.progress-text');
                    const newProgress = Math.max(30, 65 - ((remainingSkills - 1) * 10));
                    progressBar.style.width = `${newProgress}%`;
                    progressText.textContent = `${newProgress}% Complete`;
                    
                    remainingSkills--;
                }, 300);
            });
        }
    });
}); 