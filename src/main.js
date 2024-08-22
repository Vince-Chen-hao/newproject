import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store' // vuex
import router from './router'
import VueMeta from 'vue-meta'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSlickCarousel from 'vue-slick-carousel'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import $ from 'jquery'
window.$ = $ // 將 jQuery 指派給全局變量

// 註冊 vue-slick-carousel 組件
Vue.component('vue-slick-carousel', VueSlickCarousel)

Vue.config.productionTip = false

Vue.use(ElementUI)
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
