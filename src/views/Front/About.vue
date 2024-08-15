<template>
  <div class="coupon-section">
    <div class="share-icon-container">
      <a href="https://m.me/cleands717" target="_blank" class="share-icon-container">
        <div class="share-icon">
          <img src="../../assets/images/messenger.png" width="60px" alt="" />
        </div>
      </a>
    </div>
    <div class="coupon-bg d-flex justify-content-center align-items-center"></div>
    <div class="container">
      <div class="h3 my-4 discount-title p-4">
        <span class="icon">
          <i class="fas fa-users"></i>
        </span>
        關於清清小森
      </div>
      <div class="container">
        <p>
          我們是一群充滿專業熱忱的維修專家，擁有多年的豐富經驗和深厚的專業知識。我們每一位團隊成員都經過嚴格的篩選和專業培訓。
        </p>
        <p>
          我們以友善、親切、與耐心為您服務，無論您使用哪個型號的Dyson戴森吸塵器，我們都能夠提供您高品質的維修服務。我們的承諾是，只要您選擇我們，您就可以享受到最優質、最專業的家電清潔服務。
        </p>
        <p>我們專注於維修，成為您Dyson戴森清潔的最佳選擇，為您提供細心周到的服務！</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },

    methods: {},
  }
</script>

<style lang="scss">
  .coupon-section {
    font-family: monospace;
    p {
      font-size: 18px;
    }
    h4 {
      color: rgb(116, 113, 113);
    }
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
