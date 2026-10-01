let quizdata = []

async function data() {
    let questions = document.getElementById('q-card');
    try {
        const res = await fetch('/assets/quizz_data/data.json');
        quizdata = await res.json();
        questions.innerHTML = '';
        quizdata.forEach((item) => {
            questions.innerHTML +=
                `<h5 class="card-header">Question No : ${item.id}</h5>
                <div class="card-body">
                     <h5 class="card-title question">${item.question}</h5>

                     <div class="options-container" id="op-card-${item.id}">
                        <div class="question-option d-flex align-items-end mb-2">
                            <div>
                                <input type="radio" alt="btn" name="q-${item.id}" value = "option1">
                            </div>
                            <div>
                                &nbsp; <label>${item.options.option1}</label>
                            </div>
                        </div>

                        <div class="question-option d-flex align-items-end mb-2">
                            <div>
                                <input type="radio" alt="btn" name="q-${item.id}" value = "option2" >
                            </div>
                            <div>
                                &nbsp; <label>${item.options.option2}</label>
                            </div>
                        </div>

                        <div class="question-option d-flex align-items-end mb-2">
                            <div>
                                <input type="radio" alt="btn" name="q-${item.id}" value = "option3" >
                            </div>
                            <div>
                                &nbsp; <label>${item.options.option3}</label>
                            </div>
                        </div>

                        <div class="question-option d-flex align-items-end mb-2">
                            <div>
                                <input type="radio" alt="btn" name="q-${item.id}" value = "option4" >
                            </div>
                            <div>
                                &nbsp; <label>${item.options.option4}</label>
                            </div>
                        </div> 
                    </div>  
                </div> `
        });
        starttimer(960)
    }
    catch (er) {
        console.error('Error:', er);
    }
}
data()

function validation() {
    let score = 0
    quizdata.forEach((item) => {
        const select = document.querySelector(`input[name="q-${item.id}"]:checked`);
        if (select && select.value == item.answer) {
            score += 1
        }
    });
    alert(score)
}

function starttimer(t) {
    let remaining = t
    let timer = document.getElementById("timer");
    const loop_intervel = setInterval(() => {
        let minutes = Math.floor(remaining / 60);
        let seconds = remaining % 60;

        if (minutes < 10) {
            minutes = "0" + minutes
        }
        else {
            minutes = minutes
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        else {
            seconds = seconds;
        }
        timer.textContent = `${minutes}:${seconds}`

        if (remaining <= 0) {
            clearInterval(loop_intervel)
            alert("time up")
            validation();
        }
        remaining = remaining - 1;
    }, 1000);
}