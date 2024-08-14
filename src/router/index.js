import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history', // 添加这一行

  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { x: 0, y: 0 }
  },

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
          path: 'Review',
          name: 'Review',
          component: () => import('@/views/Front/Review.vue'),
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
