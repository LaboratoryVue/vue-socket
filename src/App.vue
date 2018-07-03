<template>
  <div class="container" id="app">
    <div class="row">
      <div class="col">
        <h2>websocket</h2>
        <div class="form-group">
          <input type="text" name="message" v-model="message">
        </div>
        <div class="form-group">
          <button @click="onSend()" class="btn btn-info text-capitalize" :disabled="disabled">send message</button>
        </div>
        <div class="form-group">
          <p class="text-success">{{ answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  const wsURL = `ws://rocket.pelidev.com/ws/game`;
  const echoURL = `wss://echo.websocket.org/`;

  export default {
    name: 'app',
    data() {
      return {
        message: null,
        answer: null,
        ws: null
      }
    },
    computed: {
      disabled() {
        return this.message === null || this.message === '';
      }
    },
    methods: {
      onSend() {
        this.ws.send(this.message);
      }
    },
    created() {
      this.ws = new WebSocket(wsURL);
      this.ws.onopen = () => console.log(`ws подключенно`);
      this.ws.onclose = event => console.log(`ws закрыто по причине ${event}`);
      this.ws.onerror = event => console.log(event);
      this.ws.onmessage = message => {
        this.answer = message.data;
        this.message = null;
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
