<template>
  <div id="main-nav">
    <!-- <div class="marquee">
      <span><i class="fas fa-volume-up"></i> 活動快報</span>
      <marquee scrollamount="5" behavior="alternate"
        >歡慶 LifeHouse 品牌創立 2 週年！限時大放送～ 輸入優惠代碼「HAPPY2YEARS」 享有線上購物 7
        折優惠！！
      </marquee>
    </div> -->
    <nav class="navbar navbar-expand-sm navbar-dark fixed-top shadow-sm" style="background: #14181a">
      <div class="container">
        <a href="index.html" class="navbar-brand">
          <img src="../../assets/images/Logo7.png" width="150px" alt="" />
        </a>
        <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" @click.native="closeMenu" class="nav-link">首頁 </router-link>
            </li>
            <li class="nav-item">
              <span @click="scrollToThirdTopic" class="nav-link share-icon">服務項目 </span>
            </li>
            <li class="nav-item">
              <span @click="scrollToThirdTopic2" class="nav-link share-icon">機型價格 </span>
            </li>
            <li class="nav-item">
              <router-link to="/Contact" @click.native="closeMenu" class="nav-link">服務流程 </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Review" @click.native="closeMenu" class="nav-link">客戶評價 </router-link>
            </li>

            <!-- <li class="nav-item">
              <router-link to="/QA" @click.native="closeMenu" class="nav-link">常見問題 </router-link>
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import $ from 'jquery'
  // import { mapGetters } from "vuex";

  export default {
    data() {
      return {}
    },

    methods: {

      scrollToThirdTopic() {
        // 檢查當前路徑是否已經是首頁
         // 檢查當前路徑是否已經是首頁
        if (this.$route.name !== 'Home') {
          this.$router.push({ name: 'Home' }).then(() => {
            this.scrollToTopic()
            this.closeMenu()
          })
        } else {
          this.scrollToTopic()
          this.closeMenu()
        }
      },

      scrollToThirdTopic2() {

        if (this.$route.name !== 'ContactPage') {
          this.$router.push({ name: 'ContactPage' }).then(() => {
            this.scrollToTopic2()
            this.closeMenu()
          })
        } else {
          this.scrollToTopic2()
          this.closeMenu()
        }
      },
      scrollToTopic() {
        const element = document.getElementById('third-topic')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      },

       scrollToTopic2() {
        const element = document.getElementById('third-topic2')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      },
      closeMenu() {
        $('#navbarSupportedContent').collapse('hide')
      },
    },

    mounted() {
      const navbarCollapse = $('#navbarSupportedContent')
      console.log(navbarCollapse) // 查看這裡是否返回正確的元素
    },

    // computed: {
    //   ...mapGetters(["cartNum"])
    // }
  }
</script>

<style lang="scss" scoped>
  .marquee {
    background: rgba(67, 83, 81, 0.781);
    color: #fff;
    padding: 2px 5%;
    display: flex;
    font-size: 15px;

    span {
      display: inline-block;
      padding: 0px 10px;
      font-size: 15x;
      border-radius: 3px;
      white-space: nowrap;
    }
  }

  .logo {
    font-size: 22px;
    font-weight: bold;
    font-family: serif;
    text-shadow: 1px 1px 1px rgb(209, 207, 207);
  }

  .naver-title {
    font-size: 15px;
  }

  .nav-link {
    position: relative;
    display: flex;
    justify-content: center;

    @media (min-width: 768px) {
      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        height: 1px;
        width: 0px;
        background: rgba(240, 227, 109, 0.781);
        transition: width 0.6s;
      }
      &:hover::before {
        width: 100%;
      }

      &.router-link-exact-active {
        font-weight: bold;
        border-bottom: 2px solid rgba(240, 227, 109, 0.781);
        color: white !important;
      }
    }

    @media (max-width: 768px) {
      border-bottom: 1px solid rgba(65, 54, 54, 0.3);

      &:hover {
        background: #536471;
      }

      &.router-link-exact-active {
        font-weight: bold;
        font-size: 17px;
        background: #536471;
        color: white !important;
      }
    }
  }

  .badge {
    transform: translate(-13px, -15px);
    font-size: 11px;
    background-color: #df6b57;
    color: #fff;
  }
</style>
