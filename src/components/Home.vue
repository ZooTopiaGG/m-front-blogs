<template>
  <section class="home flex flex-v">
    <!-- 左边内容区域 -->
    <div class="left-content flex-1" style="position: relative;">
      <!-- 滚动区域 -->
      <div class="sy-box2">
        <ul
          id="slider"
          style="list-style: none; width: 100%; height: 100%; padding: 0; margin: 0;"
          class="hde sy-list"
        >
          <li
            class="sy-slide kenburns useCSS sy-ken sy-active"
            style="transition-duration: 5000ms; opacity: 1; animation-duration: 19000ms;"
          >
            <img src="http://image.55lover.com/image/banner/vue@3x.jpg" />
          </li>
          <li
            class="sy-slide kenburns useCSS"
            style="transition-duration: 5000ms; opacity: 0; animation-duration: 19000ms;"
          >
            <img src="http://image.55lover.com/image/banner/react@3x.png" />
          </li>
          <li
            class="sy-slide kenburns useCSS"
            style="transition-duration: 5000ms; opacity: 0; animation-duration: 19000ms;"
          >
            <img src="http://image.55lover.com/image/banner/python@3x.jpg" />
          </li>
        </ul>
      </div>
      <!-- 最新文章区域 -->
      <div>
        <LastestArticle></LastestArticle>
      </div>
    </div>
    <!-- 右边内容区域 -->
    <!-- <div class="right-content">
      <asides></asides>
    </div> -->
  </section>
</template>

<script>
import LastestArticle from "@/components/LastestArticle";
import Asides from "@/components/Aside";
export default {
  name: "home",
  data() {
    return {
      msg: ""
    };
  },
  components: {
    LastestArticle,
    Asides
  },
  methods: {
    goSkill() {
      this.$router.push({ name: "program" });
    },
    goDynamic() {
      this.$router.push({ name: "dynamic" });
    },
    goMusic() {
      this.$router.push({ name: "music" });
    },
    goArticle() {
      this.$router.push({ name: "articles" });
    }
  },
  mounted() {
    $("title").html("首页_邓鹏博客");
    $(".main").css("paddingTop", "1.15rem");
    // console.log(sr)
    var demo1 = $("#slider").slippry({
      transition: "kenburns",
      useCSS: true,
      speed: 5000,
      pause: 9000,
      auto: true,
      controls: false,
      preload: "visible",
      autoHover: false
    });
    sr.reveal(document.querySelectorAll(".sy-box2"));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css">
.sy-box2 .sy-pager {
  display: none;
}
</style>
<style scoped>
body {
  overflow: hidden;
}
.home {
  position: relative;
}
.sy-box2 {
  height: 3.6rem;
  width: 100%;
  overflow: hidden;
}
.first-box {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  z-index: 8;
}
.fb {
  width: 800px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.6;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -240px;
  margin-left: -400px;
  z-index: 8;
  color: #fff;
}
.fb-title {
  font-size: 68px;
  padding-bottom: 5%;
}
.desc {
  font-size: 36px;
}
.s-left,
.s-right {
  width: 50%;
}
.s-left img {
  width: 100%;
  transition: 6s;
  -webkit-transition: 6s;
  -moz-transition: 6s;
}
.s-right img {
  transition: 6s;
  -webkit-transition: 6s;
  -moz-transition: 6s;
}
.s-right1:hover img,
.s-right2:hover img,
.s-right3:hover img {
  transform: scale(1.5);
  -webkit-transform: scale(1.5);
  -moz-transform: scale(1.5);
}
.s-left:hover img {
  transform: scale(1.5);
  -webkit-transform: scale(1.5);
  -moz-transform: scale(1.5);
}
.s-left1 {
  width: 50%;
}
.s-left1 img {
  width: 100%;
  height: 100%;
}
.img {
  position: relative;
  color: #fff;
  font-size: 40px;
  overflow: hidden;
}
.img div {
  position: absolute;
  z-index: 9;
  left: 20px;
  bottom: 20px;
  font-size: 24px;
}
small::after {
  -webkit-transition: all 0.4s;
  --moz-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
  margin-top: 20px;
  content: " ";
  display: block;
  height: 4px;
  width: 40px;
  background-color: #3d69e7;
  margin-bottom: 25px;
}
.pbtn {
  margin: 40px 0 20px 0;
}
.pbtn button {
  color: #fff;
  width: 120px;
  border: 1px solid #fff;
  outline: none;
  text-indent: 12px;
  font-size: 16px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0);
  cursor: pointer;
  letter-spacing: 4px;
  -webkit-transition: all 0.4s;
  --moz-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
}
.s-left:hover .pbtn button,
.s-right1:hover .pbtn button,
.s-right2:hover .pbtn button,
.s-right3:hover .pbtn button {
  background: #fff;
  color: #3d69e7;
}
.s-left:hover .bg,
.s-right1:hover .bg,
.s-right2:hover .bg,
.s-right3:hover .bg {
  background: rgba(0, 0, 0, 0.3);
}
.pbtn button pre {
  -webkit-transition: all 0.4s;
  --moz-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
}
.pbtn button:hover {
  width: 160px;
}
.pbtn button:hover pre {
  margin-left: 40px;
}
.job {
  color: #555;
  font-size: 15px;
  line-height: 1.7;
  padding: 40px 20px;
  text-align: center;
}
.job h1 {
  color: #18aacf;
  font-size: 42px;
  margin: 20px 0 20px;
}
.job img {
  margin: 20px auto 0;
}
.skillsBox {
  width: 100%;
  height: 160px;
  font-size: 24px;
  background: url(https://api.55lover.com/static/web/uploads/9fdd4722137ce.jpg)
    no-repeat;
  background-size: auto;
  color: #fff;
}
.skillsBox img {
  margin: 0 auto 20px;
}
.skillsBox aside {
  font-size: 48px;
}
.about {
  text-align: center;
  padding: 40px 20px;
}
.about img {
  margin: auto;
}
.con-title {
  color: #18aacf;
  font-size: 42px;
  margin: 20px 0 20px;
}
.maps {
  width: 100%;
  height: 100%;
}
</style>
