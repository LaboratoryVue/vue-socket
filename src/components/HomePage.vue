<template>
  <section>
    <p v-if="isConnected">We're connected to the server</p>
    <p>Message from server: "{{ socketMessage }}"</p>
    <button @click="pingServer()" type="button" class="btn btn-info text-capitalize">ping server</button>
  </section>
</template>

<script>
  export default {
    name: 'HomePage',
    data() {
      return {
        isConnected: false,
        socketMessage: ''
      }
    },
    methods: {
      pingServer() {
        this.$socket.emit('pingServer', 'Ping');
      }
    },
    sockets: {
      connect() { this.isConnected = true },
      disconnect() { this.isConnected = false },
      messageChannel(data) { this.socketMessage = data }
    }
  }
</script>

<style scoped>
  /**/
</style>
