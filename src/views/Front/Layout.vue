<template>
  <div>
    <Navbar />
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '../../components/Front/Footer.vue'
  import Navbar from '../../components/Front/Navbar.vue'

  export default {
    components: {
      Navbar,
      Footer,
    },
    data() {
      return {}
    },
  }
</script>
