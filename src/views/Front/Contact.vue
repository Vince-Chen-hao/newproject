<template>
  <div class="coupon-section">
    <div class="coupon-bg d-flex justify-content-center align-items-center"></div>
    <div class="container">
      <div class="h3 my-4 discount-title p-4">
        <span class="icon">
          <i class="fas fa-mobile-alt"></i>
        </span>
        預約維修
      </div>

      <div>＃維修流程說明</div>

      <div>＃維修型號及價格</div>

      <div></div>

      <!-- <div class="my-3 h5">請點擊圖示立即詢問</div> -->

      <div class="row align-items-center">
        <div class="col-2">
          <img src="../../assets/images/me2.png" class="img-fluid" />
        </div>
        <div class="col-2">
          <img src="../../assets/images/fb2.jpg" class="img-fluid" />
        </div>
        <div class="col-2">
          <img src="../../assets/images/shopee2.png" class="img-fluid" />
        </div>

        <div class="col-2">
          <img src="../../assets/images/gmail2.png" class="img-fluid" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },

    methods: {
      cobycode() {},
    },
  }
</script>

<style lang="scss">
  .coupon-section {
    font-family: monospace;
    p {
      font-size: 13px;
    }
    h4 {
      color: rgb(116, 113, 113);
    }
  }

  .coupon-bg {
    background-image: url('../../assets/images/coupon02.jpg');
    background-position: center center;
    background-size: cover;
    height: 200px;
    margin-top: 90px;
  }

  .discount-title {
    font-size: 37px;
    font-weight: 300;
    border-bottom: 1px dashed rgb(206, 204, 201);
    letter-spacing: 3px;
    .icon {
      font-size: 30px;
      color: rgb(117, 117, 113);
    }
  }

  .coupon-num-open {
    border: 2px dashed rgba(107, 124, 126, 0.842);
    animation: coupon-num-open 3.5s infinite;
    color: rgba(78, 138, 146, 0.842);
    font-family: fantasy;
  }

  .coupon-num {
    border: 2px dashed rgba(107, 124, 126, 0.842);
    color: rgba(107, 136, 139, 0.842);
    font-family: fantasy;
  }

  .btn-warning {
    color: #255d83;
    &:hover {
      color: #f3f4f5;
    }
  }

  @keyframes coupon-num-open {
    0% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    80% {
      opacity: 0;
    }
    85% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
</style>
