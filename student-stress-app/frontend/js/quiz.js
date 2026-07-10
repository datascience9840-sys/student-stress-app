export function renderQuiz(data) {
    const container = document.getElementById('quiz-result');
    if (!data.quiz || data.quiz.length === 0) {
        container.innerHTML = "<p>Failed to load quiz items.</p>";
        return;
    }

    let html = `<h3>${data.board} Practice Quiz</h3><form id="active-quiz-form">`;
    
    data.quiz.forEach((q, index) => {
        html += `
            <div class="question-block" data-answer="${q.answer}">
                <p><strong>Q${index + 1}:</strong> ${q.question}</p>
                ${q.options.map(opt => `
                    <label class="option-label">
                        <input type="radio" name="question-${index}" value="${opt}" required> ${opt}
                    </label>
                `).join('')}
            </div>
        `;
    });

    html += `<button type="button" id="submit-quiz-btn">Submit Quiz</button></form><div id="score-box"></div>`;
    container.innerHTML = html;

    // Attach grade matching system
    document.getElementById('submit-quiz-btn').addEventListener('click', () => {
        const blocks = document.querySelectorAll('.question-block');
        let score = 0;
        
        blocks.forEach((block, index) => {
            const selected = block.querySelector(`input[name="question-${index}"]:checked`);
            const correctAnswer = block.getAttribute('data-answer');
            
            if (selected && selected.value === correctAnswer) {
                score++;
                block.style.borderLeft = "5px solid #4CAF50"; // Green for correct
            } else {
                block.style.borderLeft = "5px solid #F44336"; // Red for wrong
            }
        });

        document.getElementById('score-box').innerHTML = `
            <div class="score-summary">You scored <strong>${score} / ${blocks.length}</strong>!</div>
        `;
    });
}
