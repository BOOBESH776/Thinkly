let quizdata = [];
let loop_intervel;

async function data() {
    let questions = document.getElementById('q-card');
    try {
        const res = await fetch('/assets/quizz_data/data.json');
        let fulldata = await res.json();

        //random question
        quizdata = fulldata.sort(function () {
            let randomNumber = 0.5 - Math.random();
            if (randomNumber > 0) {
                return 1
            }
            else {
                return -1
            };
        }).slice(0, 10);

        let i = 1

        quizdata.forEach((item) => {
            
            questions.innerHTML += `
                <h5 class="card-header">Question No : ${i++}</h5>              
                <div class="card-body">
                     <h5 class="card-title question">${item.question}</h5>
                     <div class="options-container" id="op-card-${item.id}">
                        <div class="question-option d-flex align-items-end mb-2">
                            <div>
                                <input type="radio" alt="btn" name="q-${item.id}" value="option1" onchange="onAnswerSelected()">
                            </div>
                            <div>
                                &nbsp; <label>${item.options.option1}</label>
                            </div>
                        </div>
                        <div class="question-option d-flex align-items-end mb-2">
                            <div>
                                <input type="radio" alt="btn" name="q-${item.id}" value="option2" onchange="onAnswerSelected()">
                            </div>
                            <div>
                                &nbsp; <label>${item.options.option2}</label>
                            </div>
                        </div>
                        <div class="question-option d-flex align-items-end mb-2">
                            <div>
                                <input type="radio" alt="btn" name="q-${item.id}" value="option3" onchange="onAnswerSelected()">
                            </div>
                            <div>
                                &nbsp; <label>${item.options.option3}</label>
                            </div>
                        </div>
                        <div class="question-option d-flex align-items-end mb-2">
                            <div>
                                <input type="radio" alt="btn" name="q-${item.id}" value="option4" onchange="onAnswerSelected()">
                            </div>
                            <div>
                                &nbsp; <label>${item.options.option4}</label>
                            </div>
                        </div> 
                    </div>  
                </div>`;
                
        });

        console.log(quizdata);
        starttimer(300);
        return quizdata;
    }
    catch (er) {
        console.error('Error:', er);
    }
}

data();

function onAnswerSelected() {
    // 1. Find all radio buttons that are currently checked across the whole quiz
    const answeredQuestionsCount = document.querySelectorAll('input[type="radio"]:checked').length;

    // 2. Update the progress layout with the actual number of answered questions
    if (answeredQuestionsCount <= 10) {
        updateProgress(answeredQuestionsCount);
    }

    // 3. Optional status flag text modification
    if (answeredQuestionsCount === 10) {
        document.getElementById('pct-text').innerText = "100% Complete - Finished!";
    }
}

// Keep your updateProgress function exactly as it is
function updateProgress(currentNumber) {
    let pct = (currentNumber / 10) * 100;

    document.getElementById('q-num').textContent = currentNumber;
    document.getElementById('pct-text').textContent = pct + "% Complete";
    document.getElementById('bar-fill').style.width = pct + "%";
}


// validation
let validation = document.getElementById("validation");
if (validation) {
    validation.addEventListener("click", () => {
        clearInterval(loop_intervel);

        let score = 0;
        let unansweredCount = 0;

        let quizSummary = [];

        quizdata.forEach((item) => {
            const select = document.querySelector(`input[name="q-${item.id}"]:checked`);
            let userAnswer;
            if (select) {
                userAnswer = select.value
            }
            else {
                userAnswer = null
            }

            if (select) {
                if (select.value === item.answer) {
                    score = score + 1;
                }
            }

            else {
                unansweredCount = unansweredCount + 1;
            }

            quizSummary.push({
                id: item.id,
                question: item.question,
                options: item.options,
                correctAnswer: item.answer,
                userAnswer: userAnswer
            });
        });

        // if (unansweredCount > 0) {
        //     alert(`You scored ${score}/10! Note: You left ${unansweredCount} questions unanswered.`);
        // } else {
        //     alert(`Great job! You answered all questions. Final Score: ${score}/10`);
        // }

        let finalTime = "00:00";
        let timerElement = document.getElementById("timer");

        if (timerElement) {
            finalTime = timerElement.textContent;
        }

        localStorage.setItem("quizScore", score);
        localStorage.setItem("quizTime", finalTime);
        localStorage.setItem("quizSummary", JSON.stringify(quizSummary));

        // window.location.href = "score.html";
    });
}


// Timer For Quizz
function starttimer(t) {
    let remaining = t;
    let timer = document.getElementById("timer");
    loop_intervel = setInterval(() => {
        let minutes = Math.floor(remaining / 60);
        let seconds = remaining % 60;

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (timer) {
            timer.textContent = `${minutes}:${seconds}`;
        }

        if (remaining <= 0) {
            clearInterval(loop_intervel);
            alert("time up");
            if (validation) {
                validation.click();
            }
        }
        remaining = remaining - 1;
    }, 1000);
}