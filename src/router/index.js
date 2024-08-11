import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      // 錯誤網址會導至登入面
      path: '*',
      redirect: '/',
    },

    {
      path: '/',
      name: 'Layout',
      component: () => import('@/views/Front/Layout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Front/Home.vue'),
        },

        {
          path: 'News',
          name: 'CouponPage',
          component: () => import('@/views/Front/News.vue'),
        },

        {
          path: 'Contact',
          name: 'ContactPage',
          component: () => import('@/views/Front/Contact.vue'),
        },

        {
          path: 'About',
          name: 'AboutPage',
          component: () => import('@/views/Front/About.vue'),
        },

        {
          path: 'QA',
          name: 'QAPage',
          component: () => import('@/views/Front/QA.vue'),
        },
      ],
    },
  ],
})
