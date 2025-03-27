document.addEventListener('DOMContentLoaded', function() {
    // Add click event for the Undo button
    const undoButton = document.querySelector('.undo-button');
    if (undoButton) {
        undoButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Skill removal has been requested. This would trigger the skill inference system to recalculate.');
        });
    }
    
    // Add click events for recommendation cards
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    recommendationCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const jobTitle = this.querySelector('h4').textContent;
            window.location.href = `job-details.html?job=${encodeURIComponent(jobTitle)}`;
        });
    });
    
    // Add click event for the CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Direct the user to the job details page for the top opportunity
            window.location.href = 'job-details.html?job=Senior%20Data%20Scientist';
        });
    }
    
    // Add click events for video and FAQ links
    const videoLink = document.querySelector('.video-link');
    if (videoLink) {
        videoLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This would open a video explaining how the skill inference works.');
        });
    }
    
    const faqLink = document.querySelector('.faq-link');
    if (faqLink) {
        faqLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This would open the FAQs about the skill inference system.');
        });
    }
    
    // Add click event for view more link
    const viewMoreLink = document.querySelector('.view-more');
    if (viewMoreLink) {
        viewMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'opportunities.html';
        });
    }
}); 