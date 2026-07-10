// Update stress range text label
document.getElementById('stress').addEventListener('input', (e) => {
    document.getElementById('stress-val').textContent = e.target.value;
});

// Handle Timetable Generation
document.getElementById('timetable-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const hours = document.getElementById('hours').value;
    const stress = document.getElementById('stress').value;
    const resultDiv = document.getElementById('timetable-result');
    
    resultDiv.innerHTML = "Generating your personalized schedule...";

    try {
        const response = await fetch(`/.netlify/functions/generate_timetable?hours=${hours}&stress=${stress}`);
        const data = await response.json();
        
        let html = `<h3>Recommended Schedule (${data.mode} Mode):</h3><ul>`;
        data.schedule.forEach(slot => {
            html += `<li><strong>${slot.time}:</strong> ${slot.activity}</li>`;
        });
        html += `</ul>`;
        resultDiv.innerHTML = html;
    } catch (error) {
        resultDiv.innerHTML = "<p style='color:red;'>Error connecting to backend function.</p>";
    }
});

// Handle Quiz Generation
document.getElementById('quiz-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const board = document.getElementById('board').value;
    const resultDiv = document.getElementById('quiz-result');
    
    resultDiv.innerHTML = "Loading questions...";

    try {
        const response = await fetch(`/.netlify/functions/generate_quiz?board=${board}`);
        const data = await response.json();
        
        let html = `<h3>${data.board} Mock Quiz</h3>`;
        data.quiz.forEach((q, index) => {
            html += `
                <div class="question-block">
                    <p><strong>Q${index + 1}: ${q.question}</strong></p>
                    ${q.options.map(opt => `<label><input type="radio" name="q${index}"> ${opt}</label><br>`).join('')}
                </div><br>
            `;
        });
        resultDiv.innerHTML = html;
    } catch (error) {
        resultDiv.innerHTML = "<p style='color:red;'>Error fetching quiz data.</p>";
    }
});