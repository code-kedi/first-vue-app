const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      // values to help us managing the health of the two participants
      playerHealth: 100,
      monsterHealth: 100
    }
  },
  computed: {
    monsterBarStyles() {
      return {width: this.monsterHealth + '%'};
    },
    playerBarStyles() {
      return {width: this.playerHealth + '%'};
    },
  },
  methods: {
    attackMonster() {
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
    }
  }
});

app.mount('#game');
