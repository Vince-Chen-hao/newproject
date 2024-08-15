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
        <div class="row justify-content-start">
          <div class="col-lg-4">
            <div class="card m-4 border-0 shadow">
              <div class="card-body">
                <h4 class="card-title text-center">
                  <i class="fas fa-toggle-on" style="color: skyblue"></i>
                  週年慶全館7折
                </h4>
                <hr />
                <p class="card-text">適用通路：網路</p>
                <p class="card-text">適用商品：架上商品</p>
                <h5 class="coupon-num-open text-center p-2">HAPPY2YEARS</h5>
                <p class="card-text text-muted">活動日期：2020/05/25 - 2020/6/25</p>
                <a href="#" class="btn btn-coupon btn-warning btn-block" @click.prevent="cobycode">複製優惠序號</a>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card m-4 border-0 shadow">
              <div class="card-body">
                <h4 class="card-title text-center">
                  <i class="fas fa-toggle-on" style="color: skyblue"></i>
                  新會員享88折
                </h4>
                <hr />
                <p class="card-text">適用通路：網路</p>
                <p class="card-text">適用商品：架上商品(不含料理廚具)</p>
                <h5 class="coupon-num-open text-center p-2">NEWMEMBER2020</h5>
                <p class="card-text text-muted">活動日期：2020/01/01 - 2020/12/31</p>
                <a href="#" class="btn btn-coupon btn-warning btn-block" @click.prevent="cobycode">複製優惠序號</a>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card bg-light m-4 border-0 shadow-sm">
              <div class="card-body">
                <h4 class="card-title text-center">
                  <i class="fas fa-toggle-off" style="color: gray"></i>
                  月月滿千送百
                </h4>
                <hr />
                <p class="card-text">適用通路：網路 & 實體</p>
                <p class="card-text">適用商品：限料理廚具</p>
                <h5 class="coupon-num text-center p-2">XXXXXXXX</h5>
                <p class="card-text text-muted">活動日期：2020/07/01 - 2020/07/31</p>
                <a href="#" class="btn btn-info btn-block disabled">敬請期待</a>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card bg-light m-4 border-0 shadow-sm">
              <div class="card-body">
                <h4 class="card-title text-center">
                  <i class="fas fa-toggle-off" style="color: gray"></i>
                  寵愛媽媽5折起
                </h4>
                <hr />
                <p class="card-text">適用通路：網路</p>
                <p class="card-text">適用商品：指定商品</p>
                <h5 class="coupon-num text-center p-2">XXXXXXXX</h5>
                <p class="card-text text-muted">活動日期：2020/05/19 - 2020/05/20</p>
                <a href="#" class="btn btn-info btn-block disabled">活動結束</a>
              </div>
            </div>
          </div>
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
