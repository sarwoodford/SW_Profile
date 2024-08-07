document.addEventListener('DOMContentLoaded', () => {
    const quizCont = document.getElementById('quizCont');
    const resultsCont = document.getElementById('resultsCont');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const submit = document.getElementById('submit');

    const questionsAnswers = [
        {
            question: 'What career path do I wish to take?',
            answers: {
                a: 'Back End Development',
                b: 'Front End Development',
                c: 'Cloud Engineering'
            },
            rightAnswer: 'b'
        },
        {
            question: "What year did I start Keyin's Software Devlopment Program?",
            answers: {
                a: '2022',
                b: '2023',
                c: '2024'
            },
            rightAnswer: 'c'
        },
        {
            question: 'What Social Media platforms am I active on for contacts?',
            answers: {
                a: 'Instagram, LinkedIn, Facebook',
                b: 'Facebook, LinkedIn, Github',
                c: 'Github, Facebook, Whatsapp'
            },
            rightAnswer: 'b'
        },
        {
            question: 'What do I enjoy most about Front End Development?',
            answers: {
                a: 'Designing and developing',
                b: 'Getting errors',
                c: 'Creating mock-ups'
            },
            rightAnswer: 'a'
        }
    ];

    let questionCount = 0;
    const yourAnswers = new Array(questionsAnswers.length).fill(null);

    function questionDisp(index){
        const currQuestion = questionsAnswers[index];
        const answers = [];

        for (const letter in currQuestion.answers){
            answers.push(
                `<label>
                    <input type= 'radio' name = 'question${index}' value = '${letter}' ${yourAnswers[index] === letter ? 'checked' : ''}>
                    ${letter} : 
                    ${currQuestion.answers[letter]}
                </label>`
            );
        }

            quizCont.innerHTML = `<div class='question'> ${currQuestion.question} </div>
                                    <div class='answers'> ${answers.join('')}</div>`;

            
            prevButton.classList.toggle('hidden', index === 0);
            nextButton.classList.toggle('hidden', index === questionsAnswers.length - 1);
            submit.classList.toggle('hidden', index !== questionsAnswers.length - 1);                         
        
    }

        function saveAnswer(index){
            const selected = document.querySelector(`input[name='question${index}']:checked`)
            if (selected){
                yourAnswers[index] = selected.value;
            }
        }

        function dispResults(){
            let numCorrect = 0;

            questionsAnswers.forEach((currQuestion, index) => {
                const userAnswer = yourAnswers[index];

                if(userAnswer === currQuestion.rightAnswer){
                    numCorrect ++;
                }
            });

            let resultMessage;
            switch(numCorrect){
                case 0:
                    resultMessage = 'Score : 0%. Bad job!!';
                    break;
                case 1:
                    resultMessage = 'Score : 25%. Not great!';
                    break;
                case 2:
                    resultMessage = 'Score : 50%. Barely Passed ):';
                    break;
                case 3:
                    resultMessage = 'Score : 75%. Almost aced it!';
                    break;
                case 4:
                    resultMessage = 'Score : 100%. Great Job!!';
                    break;
                default:
                    resultMessage = '';
            }

            resultsCont.innerHTML  = `${numCorrect} out of ${questionsAnswers.length} - ${resultMessage}`;
        }

        prevButton.addEventListener('click', () => {
            saveAnswer(questionCount)
            questionCount--;
            questionDisp(questionCount);
        });
        nextButton.addEventListener('click', () => {
            saveAnswer(questionCount)
            questionCount++;
            questionDisp(questionCount);
        });
        submit.addEventListener('click', () => {
            saveAnswer(questionCount);
            dispResults();
        });
        questionDisp(questionCount);
});