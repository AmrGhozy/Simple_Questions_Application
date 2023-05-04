class Question {
    constructor (d) {
        this.data = d;
        this.headerQues = document.getElementById('question');
        this.answersEL = document.querySelectorAll('.con');
        this.correctAnswer = this.data.correct_answer;
        this.isCorrect = false;
        this.answers = [this.correctAnswer, ...this.data.incorrect_answers];
    }

    answer = async (checkElement) => {
        this.isCorrect = checkElement === this.correctAnswer ? true : false;
        this.headerQues.parentElement.style.opacity = '0';
        for(let i = 0; i < this.answersEL.length; i++) {
            // this.answersEL[i].style.opacity = '0';
            
            await setTimeout(() => {
                this.answersEL[i].innerHTML = '';
            }, 500);
        }
    }

    render = async () => {
        this.headerQues.innerHTML = this.data.question;
        this.headerQues.parentElement.style.opacity = '1';
        let a = 0;
        await this.answersEL.forEach((el, index) => {
            
            let span = document.createElement('span');
            span.append(`${this.answers[index]}`);

            let input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', 'radio');
            input.setAttribute('id', `a${a++}`);
            el.append(input);
            el.append(span);
        });

    }
}


export default Question;
