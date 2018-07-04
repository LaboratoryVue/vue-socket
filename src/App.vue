<template>
  <div class="container" id="app">
    <div class="row">
      <div class="col">
        <h2 class="text-capitalize my-4">btc rocket</h2>
        <h4>current game id {{ gameID }}</h4>
        <div class="output">
          <p :style="{ backgroundColor: color }" class="output__number">{{ win }}</p>
        </div>
        <h6 class="mb-2">http info</h6>
        <section>{{ game }}</section>
        <h6 class="mb-2">ws info</h6>
        <section>{{ gameWS }}</section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const wsURL = `ws://rocket.pelidev.com/ws/game`;
const httpURL = `http://rocket.pelidev.com/api/game/current`;

export default {
  name: 'app',
  data() {
    return {
      ws: null,
      win: null,
      game: null,
      gameWS: null,
      color: null,
      gameID: null
    };
  },
  methods: {
    // => GET CURRENT WIN COLOR
    getColor(id) {
      let color = null;
      switch (id) {
        case '1':
          color = 'green';
          break;
        case '2':
          color = 'red';
          break;
        case '3':
          color = 'black';
          break;
        case '4':
          color = 'yellow';
          break;
        default:
          color = 'white';
      }
      return color;
    },
    // => GET DATA GAME
    getNewGameData() {
      axios
        .get(httpURL)
        .then(game => {
          this.game = game.data;
          this.gameID = game.data.ID;
          // const colors = data.data.Colors;
          // this.color = this.getColor(colors.charAt(colors.length - this.win));
        })
        .catch(e => console.log(e));
    }
  },
  created() {
    this.ws = new WebSocket(wsURL);
    this.ws.onopen = () => {
      axios
        .get(httpURL)
        .then(currentGame => {
          this.gameID = currentGame.data.ID;
          this.game = currentGame.data;
        })
        .catch(e => console.log(e));
    };
    this.ws.onclose = event => console.log(`ws закрыто по причине ${event}`);
    this.ws.onerror = event => console.log(event);

    // GET START AND AND DATA ABOUT CURRENT GAME
    this.ws.onmessage = event => {
      const gameEvent = JSON.parse(event.data);
      if (gameEvent.Event === 'winNumberHash') {
        console.log(`start game`);
      } else if (gameEvent.Event === 'winNumber') {
        console.log(`end game`);
      }
      this.getNewGameData();
      // const gameInfo = JSON.parse(event.data);
      this.gameWS = JSON.parse(event.data);
      // if (gameInfo.Event === 'winNumber') {
      //   this.win = Math.floor(parseFloat(gameInfo.Data.WinNum));
      // }
    };
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.output {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 0.1rem solid #000;
  border-radius: 0.4rem;
  min-height: 80px;
}
.output__number {
  margin-bottom: 0;
  font-size: 1.4rem;
  padding: 0.4rem 0.8rem;
  font-weight: 700;
  border-radius: 0.4rem;
  color: white;
}
</style>
