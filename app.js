const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      // values to help us managing the health of the two participants
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0
    }
  },
  computed: {
    monsterBarStyles() {
      return {width: this.monsterHealth + '%'};
    },
    playerBarStyles() {
      return {width: this.playerHealth + '%'};
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    }
  },
  methods: {
    attackMonster() {
      // keeping track of the current round
      this.currentRound++;
      console.log(this.currentRound);
      // calculate damage (random number between 5 and 12)
      const attackValue = getRandomValue(5, 12);
      // reduce the monster's health by that damage
      this.monsterHealth -= attackValue;
      // the monster should attack back whenever we attack it
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    }
  }
});

app.mount('#game');
