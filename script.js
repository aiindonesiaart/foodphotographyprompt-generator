document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const shareWaBtn = document.getElementById('share-wa-btn');
    const newPromptBtn = document.getElementById('new-prompt-btn');
    const resultContainer = document.getElementById('result-container');
    const promptDisplay = document.getElementById('prompt-display');
    
    // Generate prompt function
    function generatePrompt() {
        // Get all selected values
        const perspective = document.getElementById('perspective').value;
        const artStyle = document.getElementById('art-style').value;
        
        // Main object
        const object1 = document.getElementById('object1').value;
        const object1Condition = document.getElementById('object1-condition').value;
        let mainObject = `${object1Condition} ${object1}`;
        
        // Additional objects
        let withObject = '';
        let andObjects = [];
        
        // Object 2 (with)
        const object2 = document.getElementById('object2').value;
        if (object2) {
            const object2Condition = document.getElementById('object2-condition').value;
            withObject = ` with ${object2Condition} ${object2}`;
        }
        
        // Object 4 (and)
        const object4 = document.getElementById('object4').value;
        if (object4) {
            const object4Condition = document.getElementById('object4-condition').value;
            andObjects.push(`${object4Condition} ${object4}`);
        }
        
        // Object 5 (and)
        const object5 = document.getElementById('object5').value;
        if (object5) {
            const object5Condition = document.getElementById('object5-condition').value;
            andObjects.push(`${object5Condition} ${object5}`);
        }
        
        // Combine and objects
        let andString = '';
        if (andObjects.length > 0) {
            andString = `, ${andObjects.join(', ')}`;
        }
        
        // Other elements
        const lighting = document.getElementById('lighting').value;
        const background = document.getElementById('background').value;
        
        // Construct the prompt
        let prompt = `${perspective}, ${artStyle} photo of ${mainObject}${withObject}${andString}, ${lighting}, ${background}`;
        
        // Clean up grammar (remove empty "with" or "and")
        prompt = prompt.replace(/ with ,/g, '').replace(/, and ,/g, '');
        
        // Display the prompt
        promptDisplay.textContent = prompt;
        resultContainer.style.display = 'block';
        resultContainer.classList.add('show');
        
        // Scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Copy functionality
    function copyPrompt() {
        const prompt = promptDisplay.textContent;
        navigator.clipboard.writeText(prompt).then(() => {
            // Change button text temporarily
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy Prompt';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy prompt. Please try again.');
        });
    }
    
    // WhatsApp share functionality
    function shareToWhatsApp() {
        const prompt = promptDisplay.textContent;
        const encodedPrompt = encodeURIComponent("Check out this food photography prompt:\n\n" + prompt + "\n\nGenerated with Food Photography Prompt Generator");
        window.open(`https://wa.me/?text=${encodedPrompt}`, '_blank');
    }
    
    // Generate new prompt
    function generateNewPrompt() {
        resultContainer.classList.remove('show');
        setTimeout(() => {
            resultContainer.style.display = 'none';
            generatePrompt();
        }, 300);
    }
    
    // Event listeners
    generateBtn.addEventListener('click', generatePrompt);
    copyBtn.addEventListener('click', copyPrompt);
    shareWaBtn.addEventListener('click', shareToWhatsApp);
    newPromptBtn.addEventListener('click', generateNewPrompt);
    
    // Initialize with a random prompt
    function initializeRandomPrompt() {
        // Set random values for all selects
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            if (select.id.includes('condition')) {
                // Skip condition selects for now
                return;
            }
            
            const options = select.options;
            if (options.length > 1) {
                // Skip the first option if it's empty (for optional fields)
                const startIndex = options[0].value === '' ? 1 : 0;
                const randomIndex = Math.floor(Math.random() * (options.length - startIndex)) + startIndex;
                select.selectedIndex = randomIndex;
            }
        });
        
        // Generate the prompt
        generatePrompt();
    }
    
    // Uncomment to generate a random prompt on page load
    // initializeRandomPrompt();
});
