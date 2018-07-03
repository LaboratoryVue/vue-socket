<template>
  <div class="container" id="app">
    <div class="row">
      <div class="col">
        <h2 class="text-capitalize my-4">websocket</h2>
        <div class="output">
          <p class="output__number">{{ win }}</p>
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
        win: null
      }
    },
    created() {
      this.ws = new WebSocket(wsURL);
      this.ws.onopen = () => {
        axios.get(httpURL)
          .then(data => {
            this.game = data.data;
          })
          .catch(e => console.log(e));
      };
      this.ws.onclose = event => console.log(`ws закрыто по причине ${event}`);
      this.ws.onerror = event => console.log(event);
      this.ws.onmessage = event => {
        const data = JSON.parse(event.data);
        if (data.Event === 'winNumber') {
          this.win = Math.floor(parseFloat(data.Data.WinNum));
        }
      };
    }
  }
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
    border: .1rem solid #000;
    border-radius: .4rem;
    min-height: 80px;
  }
  .output__number {
    margin-bottom: 0;
    font-size: 1.4rem;
    padding: .4rem;
  }
</style>
