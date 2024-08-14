<template>
  <div>
    <section class="HomeSection">
      <!-- 彈出式蓋板 -->

      <div class="share-icon-container">
        <div class="share-icon">
          <a href="https://www.messenger.com/" target="_blank">
            <img src="../../assets/images/messenger.png" width="60px" alt="" />
          </a>

          <div class="contact-text">線上詢問</div>
        </div>
      </div>

      <!-- <div class="share-icon-container" @click="toggleIcons">
        <div v-if="!showSocialIcons" class="share-icon">
          <img src="../../assets/images/message.png" width="60px" alt="" />
        </div>

        <div v-if="showSocialIcons" class="social-icons">
          <div class="icon" @click.stop="openLink('https://www.facebook.com')">
            <i class="fab fa-facebook-f"></i>
          </div>
          <div class="icon" @click.stop="openLink('https://line.me')"><i class="fab fa-line"></i></div>
        </div>
      </div> -->
      <!-- 點擊滑動置頂 -->
      <div id="SliderTop">
        <img class="SliderTop-img" src="../../assets/images/up3.png" alt="cart" />
      </div>

      <!-- SHOWCASE SLIDER -->
      <section id="showcase" style="margin-top: 90px">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active w-100">
              <img src="../../assets/images/cover04.jpg" class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
              <img src="../../assets/images/cover02.jpg" class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
              <img src="../../assets/images/cover03.jpg" class="d-block w-100" alt="..." />
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </section>

      <section id="CategoryList">
        <div class="container my-5">
          <ul class="row mr-4 category-list justify-content-around">
            <li
              class="col-md-3 col-6"
              v-for="(category, key) in categories"
              :key="key"
              @click.prevent="linkProductlist"
            >
              <i :class="category.icon" class="py-auto"></i>
              <ul style="list-style-type: none">
                <li>{{ category.name }}</li>
                <li>{{ category.title }}</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <!-- Mission HEAD -->
      <section id="mission-head-section" style="background: #1f2d35">
        <div class="container">
          <div class="row">
            <div class="col py-5 text-light">
              <h1 class="display-5">關於我們</h1>
              <div class="lead mt-4">
                <p>
                  我們是一群充滿專業熱忱的清潔維修團隊，擁有親切與確實的優質服務，只要是無線的Dyson戴森吸塵器機型，
                  我們都能夠提供高品質的清潔與維修。我們的專業，成為您清潔Dyson戴森的最佳選擇，為您提供最細心周到的服務！
                </p>
                <!-- <p>我們的專業，成為您清潔Dyson戴森的最佳選擇，為您提供最細心周到的服務！</p> -->
              </div>
              <!--添加.lead讓段落突出，常與display合用-->
              <a href="#" class="btn btn-outline-info mt-4">更多</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Brandspirit SECTION -->
      <div class="bg-light text-muted py-5">
        <div class="container">
          <div class="row justify-content-between align-items-center">
            <div class="col-lg-4">
              <img src="../../assets/images/Logo.jpg" alt="" class="img-thumbnail img-fluid mb-3 rounded-circle" />
            </div>
            <div class="col-lg-7">
              <h1>服務項目</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore reiciendis, voluptate at alias laborum
                odit aliquid tempore perspiciatis repudiandae hic?
              </p>
              <div class="d-flex align-items-center mb-3">
                <div class="mr-4">
                  <i class="fas fa-check-circle fa-2x"></i>
                </div>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi distinctio iusto, perspiciatis mollitia
                  natus harum?
                </div>
              </div>

              <div class="d-flex align-items-center mb-3">
                <div class="mr-4">
                  <i class="fas fa-check-circle fa-2x"></i>
                </div>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi distinctio iusto, perspiciatis mollitia
                  natus harum?
                </div>
              </div>
              <div class="d-flex align-items-center mb-3">
                <div class="mr-4">
                  <i class="fas fa-check-circle fa-2x"></i>
                </div>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi distinctio iusto, perspiciatis mollitia
                  natus harum?
                </div>
              </div>
              <div class="d-flex align-items-center">
                <div class="mr-4">
                  <i class="fas fa-check-circle fa-2x"></i>
                </div>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi distinctio iusto, perspiciatis mollitia
                  natus harum?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Teams-head-section -->
      <section id="Teams-head-section" class="my-5 text-center text-dark py-5" style="background: #1f2d35">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="info-header mb-5">
                <h1 class="text-white pb-3">
                  <img src="../../assets/images/star3.png" width="30px" alt="" />
                  網友推薦評論
                  <img src="../../assets/images/star3.png" width="30px" alt="" />
                </h1>
                <p class="lead text-light pb-3">
                  我們的吸塵器清洗服務深受廣大客戶的信賴，並在 Facebook 和蝦皮上獲得超過 400 則正面評價
                  <i class="far fa-thumbs-up"></i> <i class="far fa-thumbs-up"></i>。
                  <br />
                  每一則好評都是對我們專業與用心的肯定，選擇我們，讓您的吸塵器煥然一新！
                </p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-2 col-6">
              <div class="card mb-5">
                <div class="card-body">
                  <img src="../../assets/images/share6.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3" />
                  <h5>Hsu Abow</h5>
                  <p class="ellipsis">
                    需要來大大分享一下清清小森-職人洗塵Dyson清潔有多優秀！家裡有2隻多年前（至少十年了）去日本還有美國帶回Dyson
                    DC34 & V6
                  </p>
                </div>

                <div class="d-flex justify-content-center">
                  <div class="pb-4">
                    <a
                      href="https://www.facebook.com/story.php?story_fbid=10160913272548070&id=654283069&mibextid=WaXdOe&rdid=haMl1165aHX4Ze61"
                      target="_blank"
                    >
                      <i class="fab fa-facebook"></i> 貼文連結
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-2 col-6">
              <div class="card mb-5">
                <div class="card-body">
                  <img src="../../assets/images/share3.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3" />
                  <h5>Irenebaby</h5>
                  <p class="ellipsis">
                    ［ 我們的Dyson無線手持系列吸塵器清潔交給 清清小森-職人洗塵 來守護
                    ］，雖然本人最近狂熱用Bissell五合一無線吸塵洗地機清潔
                  </p>
                </div>

                <div class="d-flex justify-content-center">
                  <div class="pb-4">
                    <a
                      href="https://www.facebook.com/100044432769624/posts/826498022174616/?mibextid=WaXdOe&rdid=fo4ouEN0PntSj7G3"
                      target="_blank"
                    >
                      <i class="fab fa-facebook"></i> 貼文連結
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-2 col-6">
              <div class="card mb-5">
                <div class="card-body">
                  <img src="../../assets/images/share5.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3" />
                  <h5>即將起飛</h5>
                  <p class="ellipsis">
                    好友推薦的這個清理達人真的太優秀這個清理達人「清清小森」，是專門清理Dyson的吸塵器，Dyson一台都不便宜，超怕送修以後被用壞
                  </p>
                </div>

                <div class="d-flex justify-content-center">
                  <div class="pb-4">
                    <a
                      href="https://www.facebook.com/100064405401276/posts/818226627000843/?mibextid=WaXdOe&rdid=XpeE6dLN6i1JBeDt"
                      target="_blank"
                    >
                      <i class="fab fa-facebook"></i> 貼文連結
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-6">
              <div class="card mb-5">
                <div class="card-body">
                  <img src="../../assets/images/share2.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3" />
                  <h5>Wisely</h5>
                  <p class="ellipsis">
                    #清清小森
                    處理的流程完全流程化，會應對不同的型號做拆卸處理，然後再細心地將每個零組件做好清理，並且還會做一番基礎的檢測保養。
                  </p>
                </div>

                <div class="d-flex justify-content-center">
                  <div class="pb-4">
                    <a
                      href="https://www.facebook.com/100044379791204/posts/997695685053082/?mibextid=WaXdOe&rdid=1pLXgmgcDG3dQOMm"
                      target="_blank"
                    >
                      <i class="fab fa-facebook"></i> 貼文連結
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-2 col-6">
              <div class="card mb-5">
                <div class="card-body">
                  <img src="../../assets/images/Logo.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3" />
                  <h5>FB官網</h5>
                  <p class="ellipsis">交給小森清洗乾淨以後跟新的一樣，而且只洗了一天就好了超快 大推！</p>
                </div>

                <div class="d-flex justify-content-center">
                  <div class="pb-4">
                    <a href="https://www.facebook.com/cleands717/reviews" target="_blank">
                      <i class="fab fa-facebook"></i> 官網評論
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-2 col-6">
              <div class="card mb-5">
                <div class="card-body">
                  <img src="../../assets/images/Shopee2.png" alt="" class="img-fluid rounded-circle w-50 mb-3" />
                  <h5>蝦皮賣場</h5>
                  <p class="ellipsis">清洗完後像新的一樣，因軟管破損順便換新的，濾心賣家還換了一組新的給我</p>
                </div>

                <div class="d-flex justify-content-center">
                  <div class="pb-4">
                    <a
                      href="https://shopee.tw/%E3%80%90%E6%B8%85%E6%B8%85%E5%B0%8F%E6%A3%AE-dyson-%E6%B8%85%E4%B8%80%E6%B8%85%E3%80%91%E6%B7%B1%E5%B1%A4%E6%B8%85%E7%90%86%E6%B8%85%E6%BD%94-%E6%88%B4%E6%A3%AE-dyson-%E5%90%B8%E5%A1%B5%E5%99%A8-%E9%9B%BB%E5%8B%95%E5%90%B8%E9%A0%AD-900%E8%B5%B7-%E5%85%A8%E5%8F%B07-11%E6%94%B6%E9%80%81%E4%BB%B6-i.3918719.461535767?srsltid=AfmBOory6i1RKFi0doazzwgpDANfXy6EcMArGtdRoDl-4SWh5Pwz95Lv"
                      target="_blank"
                    >
                      <img src="../../assets/images/Shopee2.png" alt="" class="mb-1 rounded-circle" width="15px" />
                      賣場評論
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ProductsType">
        <div class="container my-5">
          <h3>清潔圖片</h3>
          <hr />
          <div class="row">
            <div class="col-sm-4 my-1">
              <div class="l-bg-cover rounded type01 img-thumbnail">
                <router-link class="black-cover" to="/product_list">
                  <span class="h4">專業</span>
                </router-link>
              </div>
            </div>
            <div class="col-sm-4 my-1">
              <div class="l-bg-cover rounded type02 img-thumbnail">
                <router-link class="black-cover" style="text-decoration: none" to="/product_list">
                  <span class="h4">極淨</span>
                </router-link>
              </div>
            </div>
            <div class="col-sm-4 my-1">
              <div class="l-bg-cover rounded type03 img-thumbnail">
                <router-link class="black-cover" style="text-decoration: none" to="/product_list">
                  <span class="h4">效率</span>
                </router-link>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6 my-1">
              <div class="l-bg-cover rounded type04 img-thumbnail">
                <router-link class="black-cover" to="/product_list">
                  <span class="h4">團隊分工</span>
                </router-link>
              </div>
            </div>
            <div class="col-md-6 my-1">
              <div class="l-bg-cover rounded type05 img-thumbnail">
                <router-link class="black-cover" style="text-decoration: none" to="/product_list">
                  <span class="h4">風乾</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="VideoIntro">
        <div class="bg-light">
          <div class="container">
            <div class="row py-3">
              <div class="col-lg-6 p-3">
                <div class="video-container">
                  <video src="../../../public/clean.mp4" controls></video>
                </div>
              </div>
              <div class="col-lg-6 p-3">
                <h4 class="text-center">吸塵器長期未清潔的問題</h4>
                <hr />
                <div class="text-left mt-4">
                  <div class="d-flex">
                    <div class="mr-2">
                      <img src="../../assets/images/no1.png" width="23px" alt="" />
                    </div>
                    <div>
                      <div class="mb-4">
                        <h5>吸力下降</h5>
                        長期使用後，吸塵器的吸力會因為過濾器或吸塵頭的堵塞而降低，影響清潔效果。
                      </div>
                    </div>
                  </div>

                  <div class="d-flex">
                    <div class="mr-2">
                      <img src="../../assets/images/no1.png" width="23px" alt="" />
                    </div>
                    <div>
                      <div class="mb-4">
                        <h5>噪音增大</h5>
                        吸塵器使用時間長了，可能會因為內部部件磨損或堵塞而產生異常噪音。
                      </div>
                    </div>
                  </div>

                  <div class="d-flex">
                    <div class="mr-2">
                      <img src="../../assets/images/no1.png" width="23px" alt="" />
                    </div>
                    <div>
                      <div class="mb-4">
                        <h5>異味散發</h5>
                        吸塵器使用時間長了，可能會因為內部部件磨損或堵塞而產生異常噪音。
                      </div>
                    </div>
                  </div>

                  <div class="d-flex">
                    <div class="mr-2">
                      <img src="../../assets/images/no1.png" width="23px" alt="" />
                    </div>
                    <div>
                      <div class="mb-4">
                        <h5>過熱故障</h5>
                        吸塵器內部長時間堆積灰塵和毛髮，可能會造成機器過熱，甚至引發故障或損壞。
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Shoppingcart />
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  // import PopupNews from '../../components/Front/PopupNews.vue'
  // import Shoppingcart from '../../components/Front/Shoppingcart.vue'

  export default {
    components: {
      // PopupNews,
      // Shoppingcart,
    },

    data() {
      return {
        showSocialIcons: false,

        categories: [
          { name: 'Professional', title: '專業團隊', icon: 'fas fa-users fa-2x' },
          { name: 'Service', title: '顧客至上', icon: 'fas fa-hand-holding-heart fa-2x' },
          { name: 'Safety', title: '安心洗劑', icon: 'fas fa-tint fa-2x' },
          { name: 'Efficiency', title: '高效服務', icon: 'fas fa-stopwatch fa-2x' },
        ],
      }
    },

    methods: {
      toggleIcons() {
        this.showSocialIcons = !this.showSocialIcons
      },
      openLink(url) {
        window.open(url, '_blank')
      },
    },
    created() {
      $(() => {
        $('#SliderTop').click(() => {
          $('html,body').animate({ scrollTop: 0 }, 'slow')
          return false
        })
      })
    },
  }
</script>

<style lang="scss" scoped>
  .SliderTop-img {
    position: fixed;
    bottom: 30px;
    right: 40px;
    width: 40px;
    background: rgb(241, 237, 206);
    border-radius: 70%;
    border-width: 2px;
    border-style: dotted;
    border-color: rgb(214, 210, 187);
    padding: 5px;
    z-index: 1000;
  }

  .l-bg-cover {
    background-position: center center;
    background-size: cover;
  }

  .carousel-item {
    height: 500px;

    @media (max-width: 768px) {
      height: 300px;
    }
    @media (max-width: 575.98px) {
      height: 200px;
    }
  }

  .inside-banner {
    width: 100%;
    position: relative;
    padding-bottom: 40%;
    background-size: cover;
    background-position: center center;
    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      opacity: 0.8;
      font-size: 40px;
      text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);

      @media (max-width: 575.98px) {
        margin-top: 20px;
        font-size: 28px;
      }
    }
  }

  .category-list {
    ul {
      padding-left: 20px;
    }

    > li {
      //只改變下一層的子元素li，不再往內層作用
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px 0;
      transition: all 0.5s;
      cursor: pointer;
      color: #6e7070;
      white-space: nowrap;
      @media (max-width: 575.98px) {
        font-size: 10px;
        padding: 10px 0px;
      }

      // &:hover,
      // &:active {
      //   background-color: rgb(218, 215, 188);
      //   color: rgb(173, 136, 80);
      // }
    }
    > li:not(:last-child) {
      //作用在最後一個子元素
      border-right: rgb(228, 224, 224) solid 1px;
      @media (max-width: 768px) {
        border: none;
      }
    }
  }

  .type01 {
    background-image: url('../../assets/images/Home_img.jpg');
  }
  .type02 {
    background-image: url('../../assets/images/Home_img2.jpg');
  }
  .type03 {
    background-image: url('../../assets/images/img1.jpg');
  }
  .type04 {
    background-image: url('../../assets/images/img5.jpg');
  }
  .type05 {
    background-image: url('../../assets/images/img6.jpg');
  }

  .black-cover {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1.5px solid rgba(255, 255, 255, 0.5);
    text-decoration: none;
    height: 280px;
    position: relative;

    span {
      display: none;
    }

    &:hover span {
      z-index: 2;
      display: block;
      color: white;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 1s;
    }

    &:hover::before {
      opacity: 1;
    }

    @media (max-width: 575.98px) {
      span {
        display: block;
        color: rgb(255, 255, 255);
        z-index: 2;
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0.7;
        background-color: rgba(156, 152, 152, 0.5);
      }
    }
  }

  .NewsIist {
    //淡出動畫效果
    @keyframes flicker {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.3;
      }
      100% {
        opacity: 1.2;
      }
    }
    .flicker {
      animation: flicker 1.5s linear infinite;
      color: #f7d202;
    }
    p {
      line-height: 10px;
    }
  }

  .font-intro {
    text-indent: 2em;
  }

  .brand-text {
    padding: 20px;
    background-color: rgb(187, 173, 133);
  }

  @media (min-width: 767px) {
    .brand-block {
      position: relative;
      height: 450px;
      .brand-img {
        margin-top: 55px;
        height: 350px;
        position: absolute;
        right: 0;
        z-index: 1;
      }
      .brand-text {
        height: 400px;
        position: absolute;
        left: 0;
        padding: 20px 130px 20px 40px;
      }
    }
  }

  .form-control {
    padding: 0.3rem;
    border-radius: 5px;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .video-container {
    width: 400px;
    padding-top: 400px; /* 使容器保持正方形 */
    position: relative;
    overflow: hidden;
  }
  .video-container video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 避免視頻變形 */
  }
</style>
