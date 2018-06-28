<template>
  <div class="container" id="app">
    <div class="row">
      <div class="col">
        <HomePage msg="Welcome to Your Vue.js App" />
      </div>
    </div>
  </div>
</template>

<script>
  import HomePage from './components/HomePage.vue'

  export default {
    name: 'app',
    components: {
      HomePage
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
