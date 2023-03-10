const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      // values to help us managing the health of the two participants
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      // our logMessages array will contain several log messages that are objects
      logMessages: []
    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // a draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // the player lost
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        // the monster lost
        this.winner = 'player';
      }
    }
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0 ) {
        // 0 because we can't display a negative value
        return { width: '0%' };
      }
      return {width: this.monsterHealth + '%'};
    },
    playerBarStyles() {
      if (this.playerHealth < 0 ) {
        return { width: '0%' };
      }
      return {width: this.playerHealth + '%'};
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    }
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
    },
    attackMonster() {
      // keeping track of the current round
      this.currentRound++;
      console.log(this.currentRound);
      // calculate damage (random number between 5 and 12)
      const attackValue = getRandomValue(5, 12);
      // reduce the monster's health by that damage
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      // the monster should attack back whenever we attack it
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'special-attack', attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      // we need to insure that we can't go above 100
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = 'monster';
    },
    addLogMessage(who, what, value) {
      // unshift is like push but it adds a new element at the beginning of an array
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      });
    }
  }
});

app.mount('#game');
