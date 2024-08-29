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
          meta: {
            title: '清清小森職人洗塵（dyson 達人) - 官方網站',
            description:
              '我們是一群充滿專業熱忱的清潔維修團隊，擁有親切與確實的優質服務，各式Dyson戴森吸塵器機型， 我們都能夠提供高品質的清潔與維修。',
            keywords:
              '吸塵器, 清洗吸塵器, 清洗, 吸塵器髒, 吸塵器有臭味, dyson吸塵器, dyson, dyson吸塵器故障, 吸塵器吸力, dyson維修',
          },

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
          meta: {
            title: '清清小森職人洗塵（dyson 達人) - 客戶評價',
            description:
              '我們是一群充滿專業熱忱的清潔維修團隊，擁有親切與確實的優質服務，各式Dyson戴森吸塵器機型， 我們都能夠提供高品質的清潔與維修。',
            keywords:
              '吸塵器, 清洗吸塵器, 清洗, 吸塵器髒, 吸塵器有臭味, dyson吸塵器, dyson, dyson吸塵器故障, 吸塵器吸力, dyson維修',
          },
          component: () => import('@/views/Front/Review.vue'),
        },

        {
          path: 'Contact',
          name: 'ContactPage',

          meta: {
            title: '清清小森職人洗塵（dyson 達人) - 預約清潔',
            description:
              '我們是一群充滿專業熱忱的清潔維修團隊，擁有親切與確實的優質服務，各式Dyson戴森吸塵器機型， 我們都能夠提供高品質的清潔與維修。',
            keywords:
              '吸塵器, 清洗吸塵器, 清洗, 吸塵器髒, 吸塵器有臭味, dyson吸塵器, dyson, dyson吸塵器故障, 吸塵器吸力, dyson維修',
          },
          component: () => import('@/views/Front/Contact.vue'),
        },

        {
          path: 'About',
          name: 'AboutPage',
          meta: {
            title: '清清小森職人洗塵（dyson 達人) - 服務流程',
            description:
              '我們是一群充滿專業熱忱的清潔維修團隊，擁有親切與確實的優質服務，各式Dyson戴森吸塵器機型， 我們都能夠提供高品質的清潔與維修。',
            keywords:
              '吸塵器, 清洗吸塵器, 清洗, 吸塵器髒, 吸塵器有臭味, dyson吸塵器, dyson, dyson吸塵器故障, 吸塵器吸力, dyson維修',
          },
          component: () => import('@/views/Front/About.vue'),
        },

        {
          path: 'QA',
          name: 'QAPage',
          meta: {
            title: '清清小森職人洗塵（dyson 達人) - QA',
            description:
              '我們是一群充滿專業熱忱的清潔維修團隊，擁有親切與確實的優質服務，各式Dyson戴森吸塵器機型， 我們都能夠提供高品質的清潔與維修。',
            keywords:
              '吸塵器, 清洗吸塵器, 清洗, 吸塵器髒, 吸塵器有臭味, dyson吸塵器, dyson, dyson吸塵器故障, 吸塵器吸力, dyson維修',
          },
          component: () => import('@/views/Front/QA.vue'),
        },
      ],
    },
  ],
})
