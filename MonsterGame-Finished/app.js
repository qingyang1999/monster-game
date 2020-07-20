new Vue({
    el: '#app',
    data: {
        playerHealth: 0,
        monsterHealth: 0,
        gameIsRunning: false,
        turns: [],
        secretNum:0,
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 0;
            this.monsterHealth = 0;
            this.turns = [];
            this.secretNum = Math.floor(Math.random(1,10)* 10);
        },
        add: function () {
           // var added = this.calculateDamage(0, 10);
          
           
            this.playerHealth += this.secretNum;
            this.turns.unshift({
                isPlayer: true,
                text: 'HouseKeeper add number for ' + this.secretNum
            });
            if (this.checkWin()) {
                return;
            }
            this.secretNum = Math.floor(Math.random(1,10)* 10);

            //this.monsterAttacks();
        },
        subtract: function () {
            var damage = this.calculateDamage(1, 8);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'HouseKeeper subtract number for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        multiply: function () {
           
            this.turns.unshift({
                isPlayer: true,
                text: 'HouseKeeper heals for 10'
            });
            this.monsterAttacks();
        },

        divide: function(){

        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'robber hits HouseKeeper for ' + damage
            });
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.monsterHealth <= 21 && this.monsterHealth >= 19) {
                if (confirm('OOPS ! You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 21 && this.playerHealth >= 19) {
                if (confirm('You win! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});