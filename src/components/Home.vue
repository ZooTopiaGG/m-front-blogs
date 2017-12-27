<template>
  <div class="home">
    <div style="position: relative">
      <div class="sy-box2 ">
        <ul id="slider" style="list-style: none; width: 100%; height: 100%; padding: 0; margin: 0;" class="hde sy-list">  
          <li class="sy-slide kenburns useCSS sy-ken sy-active" style="transition-duration: 5000ms; opacity: 1; animation-duration: 19000ms;">
            <img src="../assets/images/slide1.jpg">
          </li>
          <li class="sy-slide kenburns useCSS" style="transition-duration: 5000ms; opacity: 0; animation-duration: 19000ms;">
            <img src="../assets/images/slide2.jpg">
          </li>
          <li class="sy-slide kenburns useCSS" style="transition-duration: 5000ms; opacity: 0; animation-duration: 19000ms;">
            <img src="../assets/images/slide3.jpg">
          </li>
        </ul>
      </div>
    <!-- 第一板块 -->
      <!-- <div class="fb">
        <div>
          <img class="avatar" src="../assets/images/23115938.jpg" alt="avatar">
        </div>
        <div class="fb-title">
          前端开发 / NodeJs开发
        </div>
        <div class="desc">
          大家好！我是邓鹏，专门从事前端开发，NodeJs开发，這是我的一个个人网站
        </div>
      </div> -->
    </div>
    <div class="box second-box-s">
      <div class="s-left img">
          <img src="../assets/images/left.jpg" alt="avatar">
          <div>
            <small>
              技术
            </small>
            <h4>My Skill</h4>
            <p class="pbtn">
              <button  @click="goSkill">前往 <pre style="display:inline-block">-></pre></button>
            </p>
          </div>
          <div class="bg"></div>
      </div>
      
    </div>
    <div class="box second-box">
      <div class="s-right flex-v">
        <div class="img s-right1" style="width:100%">
          <img style="width:100%" src="../assets/images/right1.jpg" alt="avatar">
          <div>
            <small>
              文章
            </small>
            <h4>My Article</h4>
            <p class="pbtn">
              <button  @click="goArticle">前往 <pre style="display:inline-block">-></pre></button>
            </p>
          </div>
          <div class="bg"></div>
        </div>
        
      </div>
    </div>
    <div class="box second-box">
      <div class="flex">
          <div class="img s-right2" style="width:100%">
            <img style="width:100%"  src="../assets/images/right2.jpg" alt="avatar">
            <div>
              <small>
                音乐
              </small>
              <h4>My Music</h4>
              <p class="pbtn">
                <button  @click="goMusic">前往 <pre style="display:inline-block">-></pre></button>
              </p>
            </div>
            <div class="bg"></div>
          </div>
          
        </div>
    </div>
    <div class="box second-box">
      <div class="img s-right3" style="width:100%">
          <img style="width:100%" src="../assets/images/right3.jpg" alt="avatar">
          <div>
            <small>
              动态
            </small>
            <h4>My Dynamic</h4>
            <p class="pbtn">
              <button  @click="goDynamic">前往 <pre style="display:inline-block">-></pre></button>
            </p>
          </div>
          <div class="bg"></div>
        </div>
    </div>
    <div class="skillsBox flex flex-pack-around flex-align-center">
      <div class="second-box">
        <aside>技能</aside>
      </div>
      <div class="second-box">
        <img src="../assets/images/html.png" alt="html/css">
        <span>HTML/CSS</span>
      </div>
      <div class="second-box">
        <img src="../assets/images/javascript.png">
        <span>JAVASCRIPT</span>
      </div>
      <div class="second-box">
        <img src="../assets/images/vuejs.png">
        <span>VUEJS</span>
      </div>
      <div class="second-box">
        <img src="../assets/images/nodejs.png">
        <span>NODEJS</span>
      </div>
      <div class="second-box">
        <img src="../assets/images/mysql.png">
        <span>MYSQL</span>
      </div>
    </div>
    <div class="box">
      <div class="job">
        <h1>工作经历</h1>
        <div>
          我是2016年毕业的本科生，我从2015年8月初就开始工作，第一家公司是在四川成都的四凯科技有限公司实习，工作了2个月。然后去了第二家公司九益恒泰科技有限公司，工作到至今，负责web前端开发，高效的完成了公司的给的任务并在空余的时间进行自学新的前端技术等。
        </div>
        <div class="second-box">
          <img class='maps' src="../assets/images/maps.png">
        </div>
      </div>
    </div>
    <div class="second-box ">
      <div class="about">
        <div>
          <img class="avatar" src="../assets/images/23115938.jpg" alt="avatar">
        </div>
        <div class="con-title">关于我</div>
        <div class="con">
          大家好！我是邓鹏，2016年毕业后从事前端开发，NodeJs开发，這是我的一个个人网站，到目前已经一年多了，我非常开心能从事這个行业，因为在這里我找到了每天的充实感以及成就感！我很爱這份职业，如果有一天，当我写不懂代码的时候，我相信我还是会坚持把這个网站做好，虽然现在刚刚开始，這个网站整体而言不太成熟，但是我相信终有一天，這个网站会被很多相同职业的伙伴喜欢，這里包含了技术、阅读、音乐以及个人动态等很多东西。加油！
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
$(function () {
  // $('.sy-box').height($(window).height())
  // $('.fb').css('marginTop','-'+$(window).height()/2+'px')
})
export default {
  name: 'home',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    goSkill () {
      this.$router.push({ name: 'program' })
    },
    goDynamic () {
      this.$router.push({ name: 'dynamic' })
    },
    goMusic () {
      this.$router.push({ name: 'music' })
    },
    goArticle () {
      this.$router.push({ name: 'articles' })
    }
  },
  mounted () {
    // console.log(sr)
    var demo1 = $("#slider").slippry({
       transition: 'kenburns',
       useCSS: true,
       speed: 5000,
       pause: 9000,
       auto: true,
       controls: false,
       preload: 'visible',
       autoHover: false
    });
    sr.reveal(document.querySelectorAll('.second-box'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css">
  .sy-box2 .sy-pager {
    display: none;
  }
</style>
<style scoped>

body{
  overflow:hidden;
}
.home {
  position: relative;
}
.sy-box2{
  z-index: -1;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.first-box{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  z-index: 8;
}
.fb{
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
    color: #fff
}
.fb-title{
  font-size: 68px;
  padding-bottom: 5%;
}
.desc{
  font-size: 36px;
}
.avatar {
  width: 160px;
  height: 160px;
  border-radius: 100%; 
  margin-bottom: 15px; 
}
.second-box img, .second-box-s img, .second-box-s a .second-box a{
  display:block;
  color: #fff;
}
.second-box .bg, .second-box-s .bg{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0);
  -webkit-transition: all .4s;
  --moz-transition: all .4s;
  -o-transition: all .4s;
  transition: all .4s;
  z-index:7;
}
.s-left,.s-right {
  width: 100%;
}
.s-left img{
  width: 100%;
  transition: 6s;
  -webkit-transition: 6s;
  -moz-transition: 6s
}
.s-right img{
  transition: 6s;
  -webkit-transition: 6s;
  -moz-transition: 6s
}
.s-right1:hover img,
.s-right2:hover img,
.s-right3:hover img{
  transform: scale(1.5);
  -webkit-transform: scale(1.5);
  -moz-transform: scale(1.5);
}
.s-left:hover img{
  transform: scale(1.5);
  -webkit-transform: scale(1.5);
  -moz-transform: scale(1.5);
}
.s-left1 {
  width: 50%;
}
.s-left1 img{
  width: 100%;
  height: 100%;
}
.img{
  position: relative;
  color: #fff;
  font-size: 40px;
  overflow: hidden;
}
.img div{
  position: absolute;
  z-index: 9;
  left: 20px;
  bottom: 20px;
  font-size:24px;
}
small::after{
  -webkit-transition: all .4s;
  --moz-transition: all .4s;
  -o-transition: all .4s;
  transition: all .4s;
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
  background: rgba(255,255,255,0);
  cursor: pointer;
  letter-spacing: 4px;
  -webkit-transition: all .4s;
  --moz-transition: all .4s;
  -o-transition: all .4s;
  transition: all .4s;
}
.s-left:hover .pbtn button,
.s-right1:hover .pbtn button,
.s-right2:hover .pbtn button,
.s-right3:hover .pbtn button {
  background: #fff;
  color: #3d69e7
}
.s-left:hover .bg,
.s-right1:hover .bg,
.s-right2:hover .bg,
.s-right3:hover .bg{
  background: rgba(0,0,0,0.3);
}
.pbtn button pre{
  -webkit-transition: all .4s;
  --moz-transition: all .4s;
  -o-transition: all .4s;
  transition: all .4s;
}
.pbtn button:hover {
  width: 160px;
}
.pbtn button:hover pre{
  margin-left: 40px;
}
.job, .con {
  color: #4c4c4c;
  font-size: 16px;
  line-height: 1.7;
  width: 95%;
  margin:0 auto;
  padding: 0.4rem 0;
  text-align: justify;
}
.job h1{
  color: #18aacf;
  font-size: 20px;
  margin: 0.2rem 0 0.2rem;
  text-align: center;
}
.job img{
  margin: 0.2rem auto 0;
}
.skillsBox {
  width:100%; 
  height:1.6rem; 
  font-size: 12px;
  background: url(http://weixin.lawyer-says.cn/static/img/slide3.0edea6a.jpg) no-repeat; 
  background-size: cover;
  color: #fff;
}
.skillsBox img{
  width: 0.64rem;
  height: 0.64rem;
  margin:0 auto 0.2rem;
}
.skillsBox aside {
  font-size: 16px;
}
.about {
  width: 95%;
  margin:0 auto;
  text-align: center;
  padding-bottom:0.4rem;
}
.about img{
  width: 2.0rem;
  height: 2.0rem;
  margin: auto;
}
.con-title {
  color: #18aacf;
  font-size: 20px;
  margin: 0.4rem 0 0;
  text-align: center;
}
.maps {
  width: 100%;
  height: 100%;
}
</style>
