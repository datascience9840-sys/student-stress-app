export function renderTimetable(data) {
    const container = document.getElementById('timetable-result');
    if (!data.schedule || data.schedule.length === 0) {
        container.innerHTML = "<p>No tasks generated. Try adjusting your hours.</p>";
        return;
    }

    let html = `
        <div class="timetable-header">
            <h3>Daily Strategy: <span class="badge">${data.mode}</span></h3>
            <p>Tailored for Stress Level: <strong>${data.stress_level}/10</strong></p>
        </div>
        <div class="timeline">
    `;

    data.schedule.forEach(slot => {
        html += `
            <div class="timeline-item">
                <span class="time-tag">${slot.time}</span>
                <span class="activity-text">${slot.activity}</span>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}
