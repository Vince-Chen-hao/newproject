<template>
  <div class="coupon-section">
    <div class="d-none d-md-block">
      <div class="share-icon-container">
        <div class="share-icon mb-2">
          <a href="https://lin.ee/v0Ta2kq" target="_blank">
            <img src="../../assets/images/line.png" width="45px" alt="" />
          </a>
        </div>
        <div class="share-icon">
          <a href="https://m.me/cleands717" target="_blank">
            <img src="../../assets/images/messenger.png" width="45px" alt="" />
          </a>

          <div class="contact-text">線上詢問</div>
        </div>
      </div>
    </div>
    <div class="coupon-bg d-flex justify-content-center align-items-center"></div>
    <div class="container">
      <div class="h3 m-4 text-center discount-title p-4">
        <span class="icon">
          <i class="fas fa-ticket-alt"></i>
        </span>
        常見問題
      </div>
      <div class="container"></div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

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
      return {
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          speed: 500,
          focusOnSelect: true,
          autoplay: true,

          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        },
      }
    },

    methods: {
      cobycode() {},
    },
  }
</script>

<style lang="scss"></style>
