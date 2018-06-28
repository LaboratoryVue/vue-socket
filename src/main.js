import Vue from 'vue'
import App from './App.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

export const SocketInstance = socketio('wss://echo.websocket.org/');

Vue.use(VueSocketIO, SocketInstance);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
