class Final {
    constructor (correctAnswers, totalAmount) {
        this.finalyDom = document.querySelector('.finaly');
        this.scoreElement = document.querySelector('.score');
        this.btnAgain = document.querySelector('#again');
    
        this.render(correctAnswers, totalAmount);
        this.btnAgain.addEventListener('click', () => {
            this.finalyDom.style.opacity = '0';
            setTimeout(() => {
                this.finalyDom.style.display = '0';
                location.reload();
            }, 1000);
        });
    };
    render = (c, t) => {
        this.scoreElement.innerHTML = `You answered ${c} out of ${t} Correct`
    };
};



export default Final;