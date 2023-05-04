import Final from "../js/final.js";
import Question from "../js/question.js";

class Quiz {
    constructor(quizEl, amount, questions) {
        this.quizEl = quizEl;
        this.totalAmount = amount;
        this.answerdAmount = 0;
        this.currentEl = document.querySelector('.current .done');
        this.totalEl = document.querySelector('.total');
        this.finalEl = document.querySelector('.finaly');
        this.nextBtn = document.querySelector('#next');
        this.questions = this.setQuestion(questions);

        this.nextBtn.addEventListener('click', this.nextQuestion);
        this.renderQuestion();
    }

    setQuestion = (qu) => {
        return qu.map((q) => new Question(q));
    }

    renderQuestion = async () => {
        await this.questions[this.answerdAmount].render();
        this.currentEl.innerHTML = this.answerdAmount +1 ;
        this.totalEl.innerHTML = this.totalAmount;
    }
    nextQuestion = async() => {
        function filtering(eles) {
            for (let i = 0; i < eles.length; i++) {
                if (eles[i].firstChild.checked) {
                    return eles[i];
                }
            }
        }
        let checkEl = filtering(this.questions[this.answerdAmount].answersEL);
        if (checkEl.length == 0) {
            alert('check one element')
        } else {
            await this.questions[this.answerdAmount].answer(checkEl.textContent);
            this.answerdAmount++;
            setTimeout(() => {
                this.answerdAmount < this.totalAmount 
                ? this.renderQuestion() 
                : this.endQuestion();
            }, 501);
        }
    }
    endQuestion = () => {
        this.quizEl.style.opacity = '0';
        setTimeout(() => {
            this.quizEl.style.display = 'none';
            this.finalEl.style.display = 'flex';
            setTimeout(() => {
                this.finalEl.style.opacity = '1';
            }, 100);
        }, 1000);


        new Final(this.countCorrectAnswers() ,this.totalAmount);
    }
    countCorrectAnswers = () => {
        let count = 0;
        this.questions.forEach(e => {
            if (e.isCorrect) {
                count++; 
            }
        });
        return count;
    }

}
export default Quiz;


