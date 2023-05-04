import Quiz from "../js/quiz.js";
class Settings {
    constructor () {
        this.result;
        this.settingDom = document.querySelector('.settings');
        this.quesDom = document.querySelector('.ques');
        this.categoryDom = document.getElementById('category');
        this.nQues = document.getElementById('nQues');
        this.btnStart = document.getElementById('start');
        this.difficulty = [
            document.getElementById('easy'),
            document.getElementById('medium'),
            document.getElementById('hard'),
        ];
        this.quiz;
        this.msg = document.getElementById('msgTF');
        this.btnStart.onclick = () => {this.startQuesApp()};
        for (let i = 0; i < this.difficulty.length; i++) {
            this.difficulty[i].addEventListener('click', (e) => {
                for (let j = 0; j < this.difficulty.length; j++) {
                    if (this.difficulty[j] != e.target) {
                        this.difficulty[j].checked = false;
                    }
                }
            });
            
        }
    };
    
    toggleElement = () => {
        this.msg.innerHTML = 'Done...!';
        setTimeout(() => {
            this.settingDom.style.opacity = '0';
            setTimeout(() => {
                this.settingDom.style.display = 'none';
                this.quesDom.style.display = 'flex';
                setTimeout(() => {
                    this.quesDom.style.opacity = '1';
                }, 100);
            }, 1000);
        }, 500);
    };
    
    fetchData  = async (url) =>  {
        this.btnStart.onclick = () => {
            return false;
        }
        let re;
        await fetch(url)
        .then(
            res => {
                this.toggleElement();
                return res.json();
            },
            rej =>  {
                this.msg.innerHTML = 'Please Try Again';
                this.btnStart.onclick = () => {this.startQuesApp()};
            }
        )
        .then(data => {
            re = data.results;
        },
        );
        return re;
    };

    GAmount = () => {
        let amount = +this.nQues.value;
        if (amount > 0 && amount < 16 && amount != '') {
            return amount;
        } else {
            alert('Please Enter The Number of Qestions');
        }
    };

    getDifficulty = () => {
        let dif = this.difficulty.filter((e) => e.checked);
        if (dif.length === 1) {
            return dif[0].id;
        } else {
            alert('Please Select difficulty');
        }
    };

    startQuesApp = async () => {
        let amount = this.GAmount();
        let categoryId = this.categoryDom.value;
        let difficulty = this.getDifficulty();
        let url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
        // let url = './medS.json';
        if(difficulty != undefined && amount != undefined){
            this.msg.innerHTML = 'Wait...!';
            this.result = await this.fetchData(url);
            this.quiz = new Quiz(this.quesDom, amount, this.result);
        };
    };
};


export default Settings;
