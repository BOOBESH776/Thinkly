
const finalScore = localStorage.getItem("quizScore") || 0;
const timeTaken = localStorage.getItem("quizTime") || "00:00";
const quizSummary = JSON.parse(localStorage.getItem("quizSummary")) || [];

const timerContainer = document.getElementById("finish-one");
const scoreContainer = document.getElementById("score");
const score = document.getElementById("score-show");
const summaryContainer = document.getElementById("display-questions");

const all = document.getElementById("all");
const incrt = document.getElementById("incrt");
const crt = document.getElementById("crt");
const unans = document.getElementById("unanswer");

function fl(filtertype) {
    if (!summaryContainer || quizSummary.length === 0) return;

    summaryContainer.innerHTML = "";

    quizSummary.forEach((item) => {
        const isCorrect = item.userAnswer === item.correctAnswer;

        if (filtertype === "unanswer" && item.userAnswer) {
            return;
        }

        if (filtertype === "correct" && (!isCorrect || !item.userAnswer)) {
            return;
        }

        if (filtertype === "incorrect" && (isCorrect || !item.userAnswer)) {
            return;
        }

        let statusText = "";
        let alertClass = "";

        if (!item.userAnswer) {
            statusText = "Not Answered";
            alertClass = "text-warning";
        } else if (isCorrect) {
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

all.addEventListener("click", () => {
    fl("all");
});

unans.addEventListener("click", () => {
    fl("unanswer");
});

crt.addEventListener("click", () => {
    fl("correct");
});

incrt.addEventListener("click", () => {
    fl("incorrect");
});

if (scoreContainer) {
    scoreContainer.textContent = `Your Final Score: ${finalScore} / 10`;
    scoreContainer.style.color = "var(--num-)"
    scoreContainer.style.fontWeight = "bold"
    score.textContent = finalScore
}

if (timerContainer) {
    timerContainer.textContent = `${timeTaken} / 5:00`;
}
fl("all");