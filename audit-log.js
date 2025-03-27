// Audit Log JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the audit log functionality
    initializeAuditLog();
});

function initializeAuditLog() {
    // Set up filter buttons
    setupFilterButtons();
    
    // Set up toggle switches
    setupToggleSwitches();
    
    // Initialize confidence bars
    initializeConfidenceBars();
    
    // Set up action buttons
    setupActionButtons();
}

/**
 * Set up filter button functionality
 */
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter the audit log entries based on the selected filter
            const filterType = this.getAttribute('data-filter');
            filterAuditEntries(filterType);
        });
    });
}

/**
 * Filter audit entries based on the selected filter type
 * @param {string} filterType - The type of filter to apply
 */
function filterAuditEntries(filterType) {
    const allRows = document.querySelectorAll('.audit-table tbody tr');
    
    // Show all rows first
    allRows.forEach(row => {
        row.style.display = '';
    });
    
    // If filter is not 'all', then filter rows
    if (filterType !== 'all') {
        allRows.forEach(row => {
            const rowType = row.getAttribute('data-type');
            if (rowType !== filterType) {
                row.style.display = 'none';
            }
        });
    }
}

/**
 * Initialize the confidence bars with their respective levels
 */
function initializeConfidenceBars() {
    const confidenceBars = document.querySelectorAll('.confidence-bar');
    
    confidenceBars.forEach(bar => {
        const confidenceLevel = bar.getAttribute('data-confidence');
        const levelElement = bar.querySelector('.confidence-level');
        
        if (levelElement) {
            levelElement.style.width = `${confidenceLevel}%`;
            
            // Set color based on confidence level
            if (confidenceLevel < 40) {
                levelElement.style.backgroundColor = '#ef4444'; // Red for low confidence
            } else if (confidenceLevel < 70) {
                levelElement.style.backgroundColor = '#f59e0b'; // Yellow for medium confidence
            }
        }
    });
}

/**
 * Set up toggle switches for privacy controls
 */
function setupToggleSwitches() {
    const toggleSwitches = document.querySelectorAll('.switch input[type="checkbox"]');
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const option = this.closest('.privacy-option');
            const optionName = option.getAttribute('data-option');
            
            // Update privacy settings based on toggle state
            updatePrivacySettings(optionName, this.checked);
        });
    });
}

/**
 * Update privacy settings when toggles are changed
 * @param {string} option - The privacy option being updated
 * @param {boolean} enabled - Whether the option is enabled
 */
function updatePrivacySettings(option, enabled) {
    console.log(`Privacy setting updated: ${option} set to ${enabled ? 'enabled' : 'disabled'}`);
    
    // In a real application, this would update user preferences in a database
    // For the prototype, we'll just show a simulated success message
    showNotification(`${option} settings updated successfully!`, 'success');
}

/**
 * Set up action buttons (edit, remove, view)
 */
function setupActionButtons() {
    // Remove buttons
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const itemName = row.querySelector('td:first-child').textContent;
            
            if (confirm(`Are you sure you want to remove "${itemName}" from your profile?`)) {
                // Simulate removing the item with a fade out effect
                row.style.opacity = '0';
                setTimeout(() => {
                    row.remove();
                    showNotification(`${itemName} has been removed from your profile.`, 'success');
                }, 300);
            }
        });
    });
    
    // Edit buttons
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const itemName = row.querySelector('td:first-child').textContent;
            
            // In a real application, this would open an edit modal
            // For the prototype, we'll just show a simulated notification
            showNotification(`Edit mode active for: ${itemName}`, 'info');
        });
    });
    
    // View buttons
    const viewButtons = document.querySelectorAll('.view-button');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const itemName = row.querySelector('td:first-child').textContent;
            const itemType = row.getAttribute('data-type');
            
            // Redirect to the appropriate page based on item type
            if (itemType === 'opportunity') {
                window.location.href = `job-details.html?job=${encodeURIComponent(itemName)}`;
            } else {
                // For other types, show detailed info in a simulated modal
                showNotification(`Viewing details for: ${itemName}`, 'info');
            }
        });
    });
    
    // Export data buttons
    const exportButtons = document.querySelectorAll('.export-button');
    exportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.closest('.audit-section');
            const sectionTitle = section.querySelector('.section-title h2').textContent;
            
            // Simulate export functionality
            showNotification(`Exporting ${sectionTitle} data...`, 'info');
            setTimeout(() => {
                showNotification(`${sectionTitle} data exported successfully!`, 'success');
            }, 1500);
        });
    });
    
    // Data export section buttons
    const dataExportButton = document.querySelector('.primary-button');
    if (dataExportButton) {
        dataExportButton.addEventListener('click', function() {
            showNotification('Preparing your data export...', 'info');
            setTimeout(() => {
                showNotification('All data exported successfully! Check your downloads folder.', 'success');
            }, 2000);
        });
    }
}

/**
 * Show a notification message to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, info, warning, error)
 */
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.top = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '9999';
        document.body.appendChild(notificationContainer);
    }
    
    // Create the notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.backgroundColor = type === 'success' ? '#dcfce7' : 
                                         type === 'error' ? '#fee2e2' : 
                                         type === 'warning' ? '#fef3c7' : '#e0f2fe';
    notification.style.color = type === 'success' ? '#166534' : 
                               type === 'error' ? '#991b1b' : 
                               type === 'warning' ? '#92400e' : '#0c4a6e';
    notification.style.border = `1px solid ${type === 'success' ? '#86efac' : 
                                             type === 'error' ? '#fecaca' : 
                                             type === 'warning' ? '#fed7aa' : '#bae6fd'}`;
    notification.style.borderRadius = '6px';
    notification.style.padding = '12px 16px';
    notification.style.marginBottom = '10px';
    notification.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease-in-out';
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Simulate some loading data for the demo
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading time for data
    const auditSections = document.querySelectorAll('.audit-section');
    
    auditSections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
        }, 300 * (index + 1));
    });
}); 