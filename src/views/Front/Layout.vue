<template>
  <div>
    <Navbar />

    <div style="min-height: 600px">
      <router-view></router-view>
    </div>
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

<style>

  .fixed-bottom-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: #343a40d4; /* 背景顏色，可根據需求調整 */
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* 可選的陰影效果 */
    z-index: 1000; /* 確保它在其他內容之上 */
  }

  .fixed-bottom-container .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 20px;
    color: #000; /* 圖標顏色，可根據需求調整 */
    text-decoration: none;
  }

  .share-icon-container {
    position: fixed;
    bottom: 20px; /* 调整图标距离页面底部的距离 */
    left: 20px; /* 调整图标距离页面左侧的距离 */
    z-index: 1000;
    text-align: center;
  }

  .contact-text {
    /* position: absolute;
    top: 10px;
    left: 10px; */
    margin-top: 5px;
    font-size: 15px; /* 字體大小 */
    color: #9caac1; /* 字體顏色 */
    font-family: 'Arial', sans-serif; /* 現代感字體 */
    /* text-shadow: 1px 1px 1px rgba(19, 104, 195, 0.576); */
    font-weight: 500;
  }

  .share-icon {
    cursor: pointer;
    position: relative;
  }

  .social-icons {
    display: flex;
    flex-direction: column;
    padding: 0; /* 移除 padding */
  }

  .icon {
    font-size: 24px; /* 调整图标大小 */
    color: #333;
    cursor: pointer;
    /* margin-bottom: 10px;  */
    background: transparent; /* 背景透明 */
    border: none; /* 移除边框 */
    padding: 0; /* 移除内边距 */
  }

  .icon:last-child {
    margin-bottom: 0;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }

  .coupon-bg {
    background-image: url('../../assets/images/bg1.png');
    background-position: center center;
    background-size: cover;
    height: 140px;
    margin-top: 80px;
  }

  @media (min-width: 768px) {
    .PcDevice {
      display: block;
    }

    .MbDevice {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .PcDevice {
      display: none;
    }

    .MbDevice {
      display: block;
    }
  }
</style>
