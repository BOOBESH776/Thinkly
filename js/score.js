
// get local storage items
const finalScore = localStorage.getItem("quizScore") || 0;
const timeTaken = localStorage.getItem("quizTime") || "00:00";
const quizSummary = JSON.parse(localStorage.getItem("quizSummary")) || [];

// display score,time,questions
const timerContainer = document.getElementById("finish-one");
const scoreContainer = document.getElementById("score");
const summaryContainer = document.getElementById("display-questions");

// const all = document.getElementById("all");
// const incrt = document.getElementById("incrt");
// const crt = document.getElementById("crt");

if (scoreContainer) {
    scoreContainer.textContent = `Your Final Score: ${finalScore} / 10`;
}

if (timerContainer) {
    timerContainer.textContent = `${timeTaken}`;
}

if (summaryContainer && quizSummary.length > 0) {
    summaryContainer.innerHTML = ""; 

    quizSummary.forEach((item) => {

        let statusText = "";
        let alertClass = "";

        if (!item.userAnswer) {
            statusText = "Not Answered";
            alertClass = "text-warning";
        } else if (item.userAnswer === item.correctAnswer) {
            statusText = "Correct";
            alertClass = "text-success";
        } else {
            statusText = `Wrong (You chose: ${item.options[item.userAnswer]})`;
            alertClass = "text-danger";
        }

        summaryContainer.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">Question ${item.id}: ${item.question}</h5>
                    <p class="card-text"><strong>Correct Answer:</strong> ${item.options[item.correctAnswer]}</p>
                    <p class="card-text ${alertClass}"><strong>Your Status:</strong> ${statusText}</p>
                </div>
            </div>
        `;
    });
}
