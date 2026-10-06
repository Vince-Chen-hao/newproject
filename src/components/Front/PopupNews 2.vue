<template>
  <div
    class="popup-overlay d-none justify-content-center align-items-center"
    id="popup-overlay"
    @click.prevent="closepopup"
  >
    <div class="popup-card d-flex justify-content-center align-items-center">
      <div class="text-right">
        <a href="#" @click.prevent="closepopup">
          <i class="close-btn far fa-times-circle"></i>
        </a>
        <div class="popup-wrapper p-4 my-2">
          <div class="popup-content">
            <h2 class="text-center text-danger py-2">活動快報</h2>
            <p class="text-center lead">慶祝台北品牌概念店正式開幕！</p>
            <div class="text-center h5">
              即日起來店打卡合照上傳，就送純銅奶油抹刀
            </div>
            <div class="activity-num">限量101組</div>
          </div>
          <div class="shine-screen"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {};
  },
  methods: {
    closepopup() {
      $('#popup-overlay').removeClass('d-flex');
      $('#popup-overlay').addClass('d-none');
      // 由於d-flex與d-none設定為!important因此用移除添加的方式做切換
    },
  },
  created() {
    setTimeout(() => {
      $('#popup-overlay').removeClass('d-none');
      $('#popup-overlay').addClass('d-flex');
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
.popup-overlay {
  background-color: rgba(#242424, 0.5);
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.popup-wrapper {
  position: relative;
  border-radius: 10px;
  background: rgb(223, 205, 161);
  background: linear-gradient(
    63deg,
    rgb(236, 222, 173) 0%,
    rgb(227, 206, 131) 48%,
    rgb(223, 197, 104) 100%
  );
}

.shine-screen {
  position: absolute;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 0;

  &:after {
    content: "";
    top: 0;
    left: 0;
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    animation: slide 2s infinite;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.65) 50%,
      rgba(128, 186, 232, 0) 99%,
      rgba(125, 185, 232, 0) 100%
    );
  }
}

/* animation */
@keyframes slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.popup-content {
  position: relative;
  z-index: 2;
  @media (max-width: 575.98px) {
    width: 270px;
  }
}

.close-btn {
  font-size: 22px;
  color: rgb(197, 174, 125);
}

.activity-num {
  text-align: center;
  font-size: 60px;
  color: #fff;
  text-shadow: 0 3px 5px #c5c3c3;
}

</style>
