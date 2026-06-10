import Vue from 'vue'
import VueRouter from 'vue-router'
import FrontLayout from '@/views/Front/Layout.vue'
import Home from '@/views/Front/Home.vue'

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
      component: FrontLayout,
      children: [
        {
          path: '',
          name: 'Home',
          meta: {
            title: '台北 Dyson 吸塵器清洗推薦｜清清小森職人洗塵',
            description:
              '清清小森提供台北 Dyson 戴森吸塵器深層清洗、零件更換與維修服務，全程重視清潔品質，可使用萬華面交、雙北到府收送或全台超商寄送。',
            keywords:
              '清清小森,Dyson清洗,戴森清洗,Dyson維修,台北吸塵器清洗,萬華吸塵器清洗,吸塵器深層清潔',
          },

          component: Home,
        },

        {
          path: 'News',
          name: 'CouponPage',
          meta: {
            title: '最新消息與優惠｜清清小森職人洗塵',
            description:
              '查看清清小森 Dyson 戴森吸塵器清洗、維修服務的最新消息與活動資訊。',
            keywords:
              '清清小森優惠,Dyson清洗優惠,戴森清洗活動,吸塵器清洗優惠',
          },
          component: () => import('@/views/Front/News.vue'),
        },

        {
          path: 'Review',
          name: 'Review',
          meta: {
            title: 'Dyson 清洗客戶評價｜清清小森職人洗塵',
            description:
              '查看清清小森 Dyson 戴森吸塵器清洗與維修服務的真實客戶回饋、清潔經驗與服務評價。',
            keywords:
              '清清小森評價,Dyson清洗評價,戴森清洗推薦,吸塵器清洗推薦',
          },
          component: () => import('@/views/Front/Review.vue'),
        },

        {
          path: 'Contact',
          name: 'ContactPage',

          meta: {
            title: '預約 Dyson 清洗｜萬華面交・雙北收送｜清清小森',
            description:
              '預約清清小森 Dyson 戴森吸塵器清洗服務，可選擇萬華面交、雙北到府收送或全台 7-11 寄送。',
            keywords:
              '預約Dyson清洗,萬華Dyson清洗,雙北吸塵器收送,7-11寄送清洗',
          },
          component: () => import('@/views/Front/Contact.vue'),
        },

        {
          path: 'About',
          name: 'AboutPage',
          meta: {
            title: 'Dyson 深層清洗與維修服務｜關於清清小森',
            description:
              '認識清清小森職人洗塵的專業團隊，以及 Dyson 戴森吸塵器深層清洗、零件更換與維修服務。',
            keywords:
              '清清小森,Dyson深層清洗,戴森維修,Dyson零件更換,吸塵器清潔服務',
          },
          component: () => import('@/views/Front/About.vue'),
        },

        {
          path: 'QA',
          name: 'QAPage',
          meta: {
            title: 'Dyson 吸塵器清洗常見問題｜清清小森',
            description:
              '整理 Dyson 戴森吸塵器清洗、維修、寄送與預約方式的常見問題，協助您送洗前快速了解服務。',
            keywords:
              'Dyson清洗問題,戴森清洗方式,Dyson維修問題,吸塵器送洗,清清小森QA',
          },
          component: () => import('@/views/Front/QA.vue'),
        },
      ],
    },
  ],
})
