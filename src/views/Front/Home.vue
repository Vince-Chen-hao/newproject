<template>
  <div>
    <section class="HomeSection">
      <!-- 彈出式蓋板 -->
      <div class="d-none d-md-block">
        <div class="share-icon-container">
          <div class="share-icon">
            <a href="https://m.me/cleands717" target="_blank">
              <img src="../../assets/images/messenger.png" width="60px" alt="" />
            </a>

            <div class="contact-text">線上詢問</div>
          </div>
        </div>
      </div>

      <div class="d-block d-md-none">
        <div class="fixed-bottom-container py-1">
          <div class="d-flex flex-column align-items-center">
            <a href="https://m.me/cleands717" target="_blank" class="icon facebook" title="Facebook">
              <img src="../../assets/images/message.png" width="35px" alt="" />
            </a>

            <div class="text-light">Facebook</div>
          </div>
          <div class="d-flex flex-column align-items-center">
            <a href="https://line.me" class="icon line" target="_blank" title="LINE">
              <img src="../../assets/images/line.png" width="35px" alt="" />
            </a>
            <div class="text-light">Line</div>
          </div>
          <div class="d-flex flex-column align-items-center">
                  <a
                      href="https://shopee.tw/%E3%80%90%E6%B8%85%E6%B8%85%E5%B0%8F%E6%A3%AE-dyson-%E6%B8%85%E4%B8%80%E6%B8%85%E3%80%91%E6%B7%B1%E5%B1%A4%E6%B8%85%E7%90%86%E6%B8%85%E6%BD%94-%E6%88%B4%E6%A3%AE-dyson-%E5%90%B8%E5%A1%B5%E5%99%A8-%E9%9B%BB%E5%8B%95%E5%90%B8%E9%A0%AD-900%E8%B5%B7-%E5%85%A8%E5%8F%B07-11%E6%94%B6%E9%80%81%E4%BB%B6-i.3918719.461535767?srsltid=AfmBOory6i1RKFi0doazzwgpDANfXy6EcMArGtdRoDl-4SWh5Pwz95Lv"
                      target="_blank"
                    >
              <img src="../../assets/images/Shopee2.png" width="35px" alt="" />
            </a>
            <div class="text-light">Shopee</div>
          </div>
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

      <div class="d-none d-md-block">
        <div id="SliderTop2">
          <img class="SliderTop-img" src="../../assets/images/up3.png" alt="cart" />
        </div>
      </div>

      <!-- SHOWCASE SLIDER -->
      <section id="showcase" style="margin-top: 80px">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active w-100">
              <img src="../../assets/images/home11.png" class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
              <img src="../../assets/images/home12.png" class="d-block w-100" alt="..." />
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

      <section id="CategoryList " >
        <div class="container my-md-4 my-0 mb-md-0 mb-md-2 mb-1 mt-md-0 mt-1">
          <ul class="row category-list justify-content-around">
            <li
              class="col-md-3 col-6"
              v-for="(category, key) in categories"
              :key="key"
            >
              <i :class="category.icon" class="py-auto"></i>
              <ul style="list-style-type: none;" class="categoryFont">
                <li>{{ category.name }}</li>
                <li class="d-none d-md-block">{{ category.title }}</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <!-- Mission HEAD -->
      <section id="mission-head-section" style="background: #1f2d35">
        <div class="container">
          <div class="row">
            <div class="col py-md-5 py-4 text-light mt-1">
              <h1 class="display-5">關於我們</h1>
              <div class="lead mt-4">
                <p>
                  我們是一群充滿專業熱忱的清潔維修團隊，擁有親切與確實的優質服務，只要是無線的Dyson戴森吸塵器機型，
                  我們都能夠提供高品質的清潔與維修。我們的專業，成為您清潔Dyson戴森的最佳選擇，為您提供最細心周到的服務！
                </p>
                <!-- <p>我們的專業，成為您清潔Dyson戴森的最佳選擇，為您提供最細心周到的服務！</p> -->
              </div>
              <!--添加.lead讓段落突出，常與display合用-->
                <!--<a href="#" class="btn btn-outline-info mt-4">更多</a>-->
            </div>
          </div>
        </div>
      </section>

      <!-- Brandspirit SECTION -->
      <div class="bg-light text-muted py-md-5 py-4">
        <div class="container">
          <div class="row justify-content-between align-items-center">
            <div class="col-lg-3">
              <img
                src="../../assets/images/Logo.jpg"
                alt=""
                class="img-thumbnail img-fluid mb-3 rounded-circle companylogoSize"
              />
            </div>
            <div class="col-lg-7" style="font-size: 20px">
              <h2 class="text-dark">服務項目</h2>

              <hr />

              <div class="ml-md-5 ml-2 pl-md-5 pl-0 text-left" style="color: #313131; letter-spacing: 1px;">
                <div class="d-flex align-items-center mb-3 mt-4">
                  <div class="mr-4">
                    <img src="../../assets/images/check3.png" width="30px" alt="" />
                  </div>
                  <div>Dyson主機與刷頭的專業清洗服務</div>
                </div>

                <div class="d-flex align-items-center mb-3">
                  <div class="mr-4">
                    <img src="../../assets/images/check3.png" width="30px" alt="" />
                  </div>
                  <div>Dyson 吸塵器零件銷售與更換</div>
                </div>

                <div class="d-flex align-items-center mb-3">
                  <div class="mr-4">
                    <img src="../../assets/images/check3.png" width="30px" alt="" />
                  </div>
                  <div>吸塵器濾心清洗與更換服務</div>
                </div>
                <div class="d-flex align-items-center mb-3">
                  <div class="mr-4">
                    <img src="../../assets/images/check3.png" width="30px" alt="" />
                  </div>
                  <div>吸塵器吸力與性能檢測及調整建議</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Teams-head-section -->
      <section id="Teams-head-section" class="text-center text-dark py-md-5 py-4" style="background: #1f2d35">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="info-header mb-5">
                <h1 class="text-white pb-3">
                  <img src="../../assets/images/star3.png" width="30px" alt="" />
                  網友推薦評論
                  <img src="../../assets/images/star3.png" width="30px" alt="" />
                </h1>
                <div class="lead text-light pb-3">
                  我們的吸塵器清洗服務深受廣大客戶的信賴，並在 Facebook 和蝦皮上獲得超過 400 則正面評價
                  <i class="far fa-thumbs-up"></i> <i class="far fa-thumbs-up"></i>。
                  <br />
                  <div class="mt-md-0 mt-2">每一則好評都是對我們專業與用心的肯定，選擇我們，讓您的吸塵器煥然一新！</div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-2 col-6">
              <div class="card mb-4">
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
              <div class="card mb-4">
                <div class="card-body">
                  <img src="../../assets/images/share3.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3" />
                  <h5>Irenebaby</h5>
                  <p class="ellipsis">我們的Dyson無線手持系列吸塵器清潔交給清清小森-職人洗塵來守護</p>
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
              <div class="card mb-4">
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
              <div class="card mb-4">
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
              <div class="card mb-4">
                <div class="card-body">
                  <img src="../../assets/images/Logo.jpg" alt="" class="img-fluid rounded-circle w-50 mb-3" />
                  <h5>FB官網</h5>
                  <p class="ellipsis">交給小森清洗乾淨以後跟新的一樣，而且只洗了一天就好了超快 大推！</p>
                </div>

                <div class="d-flex justify-content-center">
                  <div class="pb-4">
                    <a href="https://m.me/cleands717" target="_blank">
                      <i class="fab fa-facebook"></i> 官網評論
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-2 col-6">
              <div class="card mb-3">
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

      <section id="VideoIntro">
        <div class="bg-light">
          <div class="container">
            <div class="row pt-md-5 pt-4" style="font-size: 16px">
              <div class="col-lg-5 p-3">
                <div class="video-container">
                  <video src="../../../public/clean.mp4" controls poster="../../assets/images/video_img.png"></video>
                </div>
              </div>
              <div class="col-lg-7 p-3 mt-2 mt-md-0" >
                <h2 class="text-center">吸塵器長期未清潔的問題</h2>
                <hr />
                <div class="text-left mt-4">
                  <div class="d-flex">
                    <div class="mr-2">
                      <img src="../../assets/images/no2.png" width="23px" alt="" />
                    </div>
                    <div>
                      <div class="mb-4">
                        <h5 style="text-decoration: underline">吸力下降</h5>
                        長期使用後，吸塵器的吸力會因為過濾器或吸塵頭的堵塞而降低，影響清潔效果。
                      </div>
                    </div>
                  </div>

                  <div class="d-flex">
                    <div class="mr-2">
                      <img src="../../assets/images/no2.png" width="23px" alt="" />
                    </div>
                    <div>
                      <div class="mb-4">
                        <h5 style="text-decoration: underline">噪音增大</h5>
                        吸塵器使用時間長了，可能會因為內部部件磨損或堵塞而產生異常噪音。
                      </div>
                    </div>
                  </div>

                  <div class="d-flex">
                    <div class="mr-2">
                      <img src="../../assets/images/no2.png" width="23px" alt="" />
                    </div>
                    <div>
                      <div class="mb-4">
                        <h5 style="text-decoration: underline">異味散發</h5>
                        吸塵器使用時間長了，可能會因為內部部件磨損或堵塞而產生異常噪音。
                      </div>
                    </div>
                  </div>

                  <div class="d-flex">
                    <div class="mr-2">
                      <img src="../../assets/images/no2.png" width="23px" alt="" />
                    </div>
                    <div>
                      <div class="mb-4">
                        <h5 style="text-decoration: underline">過熱故障</h5>
                        吸塵器內部長時間堆積灰塵和毛髮，可能會造成機器過熱，甚至引發故障或損壞。
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


         <div class="container my-md-4 my-0" >
        <div class="row ">
<div class="col-md-3 image-container d-sm-block d-none">

  <img src="../../assets/images/dirty1.jpg" class="img-fluid rounded  img-thumbnail" alt="">

</div>
<div class="col-md-3 image-container ">

  <img src="../../assets/images/dirty2.jpg" class="img-fluid rounded  img-thumbnail" alt="">

</div>
<div class="col-md-3 image-container d-sm-block d-none ">

  <img src="../../assets/images/dirty3.jpg" class="img-fluid rounded  img-thumbnail" alt="">

</div>
<div class="col-md-3 image-container d-sm-block d-none">

  <img src="../../assets/images/dirty7.jpg" class="img-fluid rounded  img-thumbnail" alt="">

</div>

        </div>



        <div class="row mt-3">


<div class="col-md-6 image-container2">

  <img src="../../assets/images/dirty4.jpg" class="img-fluid rounded  img-thumbnail" alt="">

</div>
<div class="col-md-6 image-container2">

  <img src="../../assets/images/dirty5.jpg" class="img-fluid rounded  img-thumbnail" alt="">

</div>


        </div>
      </div>
      </div>
      </section>




              <section id="Teams-head-section" class="text-center text-dark py-md-5 py-4" style="background: #1f2d35">

        <div class="container my-4">
          <h2 class="text-center text-light">清潔後成果</h2>

          <div class="mt-3 text-light lead">每一個清洗過程都會拍照分享，請放心交給我們</div>
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
                  <span class="h4">團隊分工</span>
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
                  <span class="h4">經驗豐富</span>
                </router-link>
              </div>
            </div>
            <div class="col-md-6 my-1">
              <div class="l-bg-cover rounded type05 img-thumbnail">
                <router-link class="black-cover" style="text-decoration: none" to="/product_list">
                  <span class="h4">天然洗劑</span>
                </router-link>
              </div>
            </div>
          </div>

        </div>
      </section>



    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  // import PopupNews from '../../components/Front/PopupNews.vue'
  // import Shoppingcart from '../../components/Front/Shoppingcart.vue'

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
    components: {
      // PopupNews,
      // Shoppingcart,
    },

    data() {
      return {
        showSocialIcons: false,

        categories: [
          { name: '專業團隊', title: 'Professional', icon: 'fas fa-users fa-2x' },
        { name: '高效服務', title: 'Efficiency', icon: 'fas fa-stopwatch fa-2x' },
                  { name: '顧客至上', title: 'Service', icon: 'fas fa-hand-holding-heart fa-2x' },

        { name: '安心洗劑', title: 'Safety', icon: 'fas fa-tint fa-2x' },
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
        $('#SliderTop2').click(() => {
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
    bottom: 35px;
    right: 30px;
    width: 40px;
    background: #ececec;
    border-radius: 70%;
    border-width: 2px;
    border-style: solid;
    border-color: #bbc2d6;
    padding: 5px;
    z-index: 1000;
    cursor:pointer
  }

  .l-bg-cover {
    background-position: center center;
    background-size: cover;
  }

  .carousel-item {
    height: 550px;

    @media (max-width: 768px) {
      height: 300px;
    }
    @media (max-width: 575.98px) {
      height: 170px;
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
      padding-left: 15px;
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
    background-image: url('../../assets/images/clean1.jpg');
  }
  .type02 {
    background-image: url('../../assets/images/Home_img.jpg');
  }
  .type03 {
    background-image: url('../../assets/images/home_caro2.jpg');
  }
  .type04 {
    background-image: url('../../assets/images/home_caro.jpg');
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
      background-color: rgba(0, 0, 0, 0.6);
      transition: all 1s;
    }

    &:hover::before {
      opacity: 1;
    }

    @media (max-width: 575.98px) {
      span {
        display: none;
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
        opacity: 0;
        // background-color: #30303099;
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


//手機寬度
  @media (max-width: 575.98px) {

    h1{
  font-size:32px
}

    .categoryFont{
  font-size:15px;
  font-weight:500
}

    .video-container {
      width: 100%;
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

    .companylogoSize {
      width: 250px;
    }

    .borderLine {
      border: 1px solid #dee2e6 !important;
    }

      .image-container {
  width: 1005; /* 设置固定宽度 */
  height: 250px; /* 设置固定高度 */
  overflow: hidden; /* 隐藏超出容器的内容 */
  position: relative; /* 可选，用于更复杂的定位 */
}

.image-container img {
  width: 100%; /* 使图片宽度适应容器 */
  height: 100%; /* 使图片高度适应容器 */
  object-fit: cover; /* 保持图片的纵横比，裁剪图片以适应容器 */
}
  }



//桌機寬度

  @media (min-width: 575px) {

h1{
  font-size:40px
}
.categoryFont{
  font-size:18px;
    font-weight:500

}

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

      .image-container {
  width: 240px; /* 设置固定宽度 */
  height: 300px; /* 设置固定高度 */
  overflow: hidden; /* 隐藏超出容器的内容 */
  position: relative; /* 可选，用于更复杂的定位 */
}

.image-container img {
  width: 100%; /* 使图片宽度适应容器 */
  height: 100%; /* 使图片高度适应容器 */
  object-fit: cover; /* 保持图片的纵横比，裁剪图片以适应容器 */
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
    font-size: 16px;
  }

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

  ul {
    padding-inline-start: 0;
    margin-block-end: 0;
  }




  .image-container2 {
  width: 500px; /* 设置固定宽度 */
  height: 260px; /* 设置固定高度 */
  overflow: hidden; /* 隐藏超出容器的内容 */
  position: relative; /* 可选，用于更复杂的定位 */
}

.image-container2 img {
  width: 100%; /* 使图片宽度适应容器 */
  height: 100%; /* 使图片高度适应容器 */
  object-fit: cover; /* 保持图片的纵横比，裁剪图片以适应容器 */
}
</style>
