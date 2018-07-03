<template>
  <div class="container" id="app">
    <div class="row">
      <div class="col">
        <h2 class="text-capitalize my-4">websocket</h2>
        <div class="output">
          <p :style="{ backgroundColor: color }" class="output__number">{{ win }}</p>
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
      game: null,
      win: null,
      colors: null
    };
  },
  computed: {
    color() {
      const index = this.colors.charAt(this.colors.length - this.win + 1);
      let color = null;
      switch (index) {
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
          color = 'yelow';
          break;
        default:
          color = 'white';
      }
      return color;
    }
  },
  created() {
    this.ws = new WebSocket(wsURL);
    this.ws.onopen = () => {
      axios
        .get(httpURL)
        .then(data => (this.game = data.data))
        .catch(e => console.log(e));
    };
    this.ws.onclose = event => console.log(`ws закрыто по причине ${event}`);
    this.ws.onerror = event => console.log(event);
    this.ws.onmessage = event => {
      const data = JSON.parse(event.data);
      axios
        .get(httpURL)
        .then(data => {
          this.colors = data.data.Colors;
        })
        .catch(e => console.log(e));
      if (data.Event === 'winNumber') {
        this.win = Math.floor(parseFloat(data.Data.WinNum));
      }
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
