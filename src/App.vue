<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'

  export default {
    name: 'App',
    data() {
      return {}
    },

  }
</script>

<style lang="scss">
  @import './assets/scss/all.scss';
  #app {
    font-family: serif;
  }
</style>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
