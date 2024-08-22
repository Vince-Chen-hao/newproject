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
      <div class="h3 m-4 text-center discount-title p-4">
        <span class="icon">
          <i class="fas fa-ticket-alt"></i>
        </span>
        常見問題
      </div>
      <div class="container">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    metaInfo() {
      return {
        title: this.$route.meta.title || '預設標題',
        meta: [
          {
            name: 'description',
            content: this.$route.meta.description || '預設描述',
          },
          {
            name: 'keywords',
            content: this.$route.meta.keywords || '預設關鍵字',
          },
        ],
      }
    },
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

  .discount-title {
    font-size: 37px;
    font-weight: 300;
    border-bottom: 1px dashed rgb(206, 204, 201);
    letter-spacing: 10px;
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
