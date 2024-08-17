import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store' // vuex
import router from './router'
import VueMeta from 'vue-meta'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueMeta)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

router.beforeEach((to, from, next) => {
  next()
})
