document.addEventListener('DOMContentLoaded', function() {
    const eventDates = document.querySelectorAll('.calendar .event-date');
    const eventNameDisplay = document.getElementById('event-name-display');
    const eventMediaLinksDisplay = document.getElementById('event-media-links');

    eventDates.forEach(dateElement => {
        dateElement.addEventListener('click', function() {
            const eventName = this.getAttribute('data-event-name');
            const eventDetails = this.getAttribute('data-event-details'); // We'll use this for links

            eventNameDisplay.textContent = eventName || "No event specified.";
            
            // Clear previous media links
            eventMediaLinksDisplay.innerHTML = ''; 

            if (eventDetails) {
                // Super simple parsing of the details string for links
                // A real app would handle this much better.
                const parts = eventDetails.split('|').map(part => part.trim());
                parts.forEach(part => {
                    if (part.toLowerCase().startsWith("photos:") || part.toLowerCase().startsWith("videos:")) {
                        const linkText = part.substring(0, part.indexOf(':') + 1);
                        const url = part.substring(part.indexOf(':') + 1).trim();
                        if (url && url !== "#") { // Check if there's a real link
                            const linkElement = document.createElement('a');
                            linkElement.href = url; // In real scenario, this would be the actual URL
                            linkElement.textContent = linkText.replace(':',''); // "Photos" or "Videos"
                            linkElement.target = "_blank"; // Open in new tab
                            linkElement.style.marginRight = "10px";
                            eventMediaLinksDisplay.appendChild(linkElement);
                        }
                    }
                });
                 if (eventMediaLinksDisplay.innerHTML === '') {
                     const noMediaText = document.createElement('p');
                     noMediaText.textContent = "No media links provided for this event.";
                     eventMediaLinksDisplay.appendChild(noMediaText);
                 }
            } else {
                 const noDetailsText = document.createElement('p');
                 noDetailsText.textContent = "No further details or media links for this event.";
                 eventMediaLinksDisplay.appendChild(noDetailsText);
            }
        });
    });
});
