<template>
  <div class="container" id="app">
    <div class="row">
      <div class="col">
        <h2 class="text-capitalize mb-4">websocket</h2>
        <div class="form-group">
          <button @click="onSend()" class="btn btn-info text-capitalize">send message</button>
        </div>
        <div class="form-group">
          <p class="text-success">{{ win }}</p>
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
        state: null
      }
    },
    computed: {
      win() {
        // if (this.state.Event === 'winNumberHash')
        // if (this.state.Event === 'winNumber') {
        //   return this.state.Data.WinNum
        // }
        return this.state;
      }
    },
    methods: {
      onSend() {
        this.ws.send(this.message);
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
        this.state = event.data
        console.log(event.data);
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
  button {
    cursor: pointer;
  }
</style>
