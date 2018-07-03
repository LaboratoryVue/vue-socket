<template>
  <div class="container" id="app">
    <div class="row">
      <div class="col">
        <h2>websocket</h2>
        <button @click="onSend()" class="btn btn-info">send message</button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data() {
      return {
        ws: null
      }
    },
    methods: {
      onSend() {
        this.ws.send('тест сообщение');
      }
    },
    created() {
      this.ws = new WebSocket('wss://echo.websocket.org/');
      this.ws.onopen = function() {
        console.log(`ws подключенно`);
      };
      this.ws.onclose = function(event) {
        console.log(`ws закрыто по причине ${event}`);
      };
      this.ws.onmessage = function(message) {
        console.log(message);
        // console.log(`Сообщение ${message}`);
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
