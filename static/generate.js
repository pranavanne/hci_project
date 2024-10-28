function handleGenerateClick() {
    const generateButton = document.getElementById('generate-button');

    // Ensure the browser registers the class addition
    generateButton.classList.add('pressed');

    // Use a setTimeout to create a delay before removing the pressed class
    setTimeout(() => {
        generateButton.classList.remove('pressed');

        // Continue with the logic after the animation
        if (lines.length === 0) {
            setTimeout(() => {
                alert('No connections to generate output from.');
            }, 50); // Slight delay to prevent blocking CSS animation
            return;
        }

        // Collect information about connected buttons
        const lineData = lines.map(({ line, button1, button2 }) => ({
            button1: button1.textContent,
            button2: button2.textContent,
            lineId: line.getAttribute('id'),
        }));

        // Log line data to console after a delay
        setTimeout(() => {
            console.log('Line Connections:', lineData);
            sendDataToServer(lineData);
            alert('Generation complete! Check console for line data.');
        }, 50);
    }, 200); // Keep this delay in sync with the CSS transition duration
}

function sendDataToServer(data) {
    fetch('/your-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log('Server response:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}