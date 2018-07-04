<template>
  <div class="container" id="app">
    <div class="row">
      <div class="col">
        <h2 class="text-capitalize my-4">btc rocket</h2>
        <hr>
        <h4 class="text-capitalize text-center">current game id: <strong>{{ game.id }}</strong></h4>
        <div class="output">
          <p :style="{ backgroundColor: game.color }" class="output__number">{{ game.win }}</p>
        </div>
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
      game: {
        win: null,
        color: null,
        id: null
      }
    };
  },
  methods: {
    // => GET CURRENT WIN COLOR
    getColor(value) {
      const id = String(value);
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
          color = 'orange';
          break;
        default:
          color = 'white';
      }
      return color;
    },
    // => GET NEW GAME DATA
    getNewGameData() {
      axios
        .get(httpURL)
        .then(game => {
          console.log(`-- start game --`);
          console.log(game.data);
          this.game.id = game.data.ID;
        })
        .catch(e => console.log(e));
    },
    // => GET END GAME DATA
    getEndGameData(info) {
      axios.get(httpURL)
      .then(game => {
        console.log(`-- end game --`);
        console.log(game.data);
        const colors = game.data.Colors;
        this.game.win = Math.floor(parseFloat(info.Data.WinNum));
        this.game.color = this.getColor(colors.charAt(colors.length - this.game.win));
      })
      .catch(e => console.log(e));
    }
  },

  created() {

    // START
    this.ws = new WebSocket(wsURL);

    // OPEN CONNECTION
    this.ws.onopen = () => {
      this.getNewGameData();
    };

    // GET START AND END DATA ABOUT CURRENT GAME
    this.ws.onmessage = event => {
      const gameInfo = JSON.parse(event.data);
      if (gameInfo.Event === 'winNumberHash') {
        // => START GAME
        this.getNewGameData();
      } else {
        // => END GAME
        this.getEndGameData(gameInfo);
        console.log(gameInfo);
      }
    };

    // ERROR CONNECTION
    this.ws.onerror = event => console.log(event);

    // CLOSE CONNECTION
    this.ws.onclose = event => console.log(`ws закрыто по причине ${event}`);
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
  padding: 0.4rem 0.9rem 0.2rem;
  font-weight: 700;
  border-radius: 0.4rem;
  color: white;
}
</style>
