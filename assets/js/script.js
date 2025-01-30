document.addEventListener('DOMContentLoaded', function() {
    const easyTexts = [
        "The cat sat on the mat.",
        "A quick brown fox jumps over the lazy dog.",
        "She sells seashells by the seashore."
    ];

    const mediumTexts = [
        "To be or not to be, that is the question.",
        "All that glitters is not gold.",
        "A journey of a thousand miles begins with a single step."
    ];

    const hardTexts = [
        "It was the best of times, it was the worst of times.",
        "In the beginning God created the heavens and the earth.",
        "The only thing we have to fear is fear itself."
    ];

    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const userInput = document.getElementById('user-input');
    const timeSpan = document.getElementById('time');
    const wpmSpan = document.getElementById('wpm');
    const levelSpan = document.getElementById('level');

    let startTime, endTime;

    function getRandomText(textArray) {
        const randomIndex = Math.floor(Math.random() * textArray.length);
        return textArray[randomIndex];
    }

    function updateSampleText() {
        let selectedDifficulty = difficultySelect.value;
        let selectedText;

        if (selectedDifficulty === 'easy') {
            selectedText = getRandomText(easyTexts);
        } else if (selectedDifficulty === 'medium') {
            selectedText = getRandomText(mediumTexts);
        } else if (selectedDifficulty === 'hard') {
            selectedText = getRandomText(hardTexts);
        }

        sampleTextDiv.textContent = selectedText;
    }

    function startTest() {
        startTime = new Date();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        userInput.disabled = false;
        userInput.value = '';
        userInput.focus();
    }

    function stopTest() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000;
        timeSpan.textContent = timeTaken.toFixed(2);
        startBtn.disabled = false;
        stopBtn.disabled = true;
        userInput.disabled = true;

        const sampleText = sampleTextDiv.textContent.trim();
        const userText = userInput.value.trim();
        const sampleWords = sampleText.split(/\s+/);
        const userWords = userText.split(/\s+/);
        let correctWords = 0;

        for (let i = 0; i < userWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }

        const wpm = Math.round((correctWords / timeTaken) * 60);
        wpmSpan.textContent = wpm;
        levelSpan.textContent = difficultySelect.options[difficultySelect.selectedIndex].text;
    }

    function updateTypingFeedback() {
        const sampleText = sampleTextDiv.textContent.trim();
        const userText = userInput.value.trim();
        const sampleWords = sampleText.split(/\s+/);
        const userWords = userText.split(/\s+/);

        let feedbackHTML = '';

        for (let i = 0; i < sampleWords.length; i++) {
            if (i < userWords.length) {
                if (userWords[i] === sampleWords[i]) {
                    feedbackHTML += `<span style="color: blue;">${sampleWords[i]}</span> `;
                } else {
                    feedbackHTML += `<span style="color: red;">${sampleWords[i]}</span> `;
                }
            } else {
                feedbackHTML += `<span>${sampleWords[i]}</span> `;
            }
        }

        sampleTextDiv.innerHTML = feedbackHTML.trim();
    }

    difficultySelect.addEventListener('change', updateSampleText);
    startBtn.addEventListener('click', startTest);
    stopBtn.addEventListener('click', stopTest);

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            stopTest();
        }
    });

    userInput.addEventListener('input', updateTypingFeedback);

    // Initialize with a random text from the default difficulty level
    updateSampleText();
});