<template>
  <section>
    <div class="music">
      <div class="title flex flex-align-center">
        <icon name="music" scale="1.2" style="color:#00AACD"></icon>
        <span class="title-text">音乐专栏</span>
        <span class="title-label">Music column</span>
      </div>
      <div class="music-header m-content bgbox flex flex-align-top">
        <img
          class="avatar"
          src="../assets/images/23115938.jpg"
          alt="dengpeng"
        />
        <div class="info flex-1">
          <div class="user">
            <span class="name">邓鹏</span> <span class="from">QQ音乐用户</span>
          </div>
          <div class="intro">
            <span>个人介绍：</span> <span>因为刚好遇见你，留下十年的期许</span>
          </div>
          <div class="address">
            <span>所在地区：</span> <span>四川省-成都市</span>
          </div>
          <div class="age"><span>年龄：</span> <span>24岁</span></div>
        </div>
      </div>
      <div class="music-list m-content bgbox">
        <div class="music-list-title">
          歌曲列表 <span>累积共有{{ list.length }}首</span>
        </div>
        <ul class="list">
          <li
            class="list-cell flex flex-align-center flex-pack-justify"
            v-for="(item, index) in list"
            :key="index"
          >
            <span style="width:25px">{{ index + 1 }}. </span>
            <audio class="audio" :src="item.url">
              亲，您的浏览器不支持html5的audio标签
            </audio>
            <i
              style="margin:0 10px; cursor: pointer"
              @click.self="playorpause(index, item.singername, item.songname)"
              :class="{ active: index === i ? true : false }"
            ></i>
            <a
              href="javascript:;"
              class="music-title"
              style="color:#000;margin-left: 10px;"
              >{{ item.songname }}</a
            >
            <!-- <span style="margin: 0 5px">-</span> 
            <a href="javascript:;" >{{ item.singername }}</a> -->
            <span class="flex-1"></span>
            <div class="playStatus" style="width:15px;height:10px;">
              <b></b>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="music-bg flex flex-align-center" v-show="GET_PLAY_STATUS">
      <div class="mb flex flex-align-center flex-pack-justify">
        <div class="music-btns flex flex-pack-justify">
          <a
            href="javascript:;"
            hidefocus="true"
            data-action="prev"
            class="prv"
            @click="prev"
            title="上一首(ctrl+←)"
          >
            <icon name="step-backward" scale="1.0" style="color:#ddd"></icon>
          </a>
          <a
            href="javascript:;"
            hidefocus="true"
            data-action="pause"
            @click="isPlay"
            class="ply j-flag pas"
            title="播放/暂停(p)"
          >
            <icon :name="names" scale="1.0" style="color:#ddd"></icon>
          </a>
          <a
            href="javascript:;"
            hidefocus="true"
            data-action="next"
            class="nxt"
            @click="next"
            title="下一首(ctrl+→)"
          >
            <icon name="step-forward" scale="1.0" style="color:#ddd"></icon>
          </a>
        </div>
        <div class="music-process flex-1">
          <div
            class="flex flex-pack-justify"
            style="color:#fff; font-size:14px;"
          >
            <span>{{ title }}</span>
            <span
              ><span class="currentTime">00:00</span>/{{ durationTime }}</span
            >
          </div>
          <div style="position:relative; width:100%" @click="pointPos($event)">
            <div class="base-line1 base-line-audio-all-process"></div>
            <div class="flex flex-align-center">
              <div class="base-line base-line-audio-process"></div>
              <div class="base-ball"></div>
            </div>
          </div>
        </div>
        <!-- <div class="volume-btns flex flex-align-center">
          <div @click="volumeormute">
            <icon :name="volume" scale="1.0" style="color:#ddd;" ></icon>
          </div>
          <div style="position:relative; width:100%; top: -4px; left: 2px; display:none" @click="pointVol($event, $event.offsetX)">
            <div class="base-line1 base-line-volume-all-process"></div>
            <div  class="flex flex-align-center">
              <div class="base-line base-line-volume-process"></div>
              <div class="base-ball" draggable="true"
                @dragstart="dragStart($event, index)" @drag="drag($event, index)" @dragend="dragend($event, index)" 
              ></div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
// icon 图标
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
import Asides from "@/components/Aside";
import { mapGetters } from "vuex";
export default {
  name: "music",
  components: {
    Icon,
    Asides
  },
  computed: {
    ...mapGetters(["GET_PLAY_STATUS"]),
    // 以规定数量分割数组，并重组
    lists() {
      var arr = [];
      this.list.map((x, i) => {
        if (i % 10 == 0) {
          arr.push([]);
        }
        arr[arr.length - 1].push();
      });
      return arr;
    }
  },
  data() {
    return {
      list: [],
      totalcount: 100,
      currentPage4: 1,
      size: 100,
      page: 1,
      active: false,
      i: -1,
      names: "play",
      timer: "",
      title: "",
      currentTime: "00:00",
      durationTime: "00:00",
      currentTimes: "00:00",
      index: 0, // 歌曲索引,
      volume: "volume-up",
      initVolume: 0.5,
      // 起始位置
      startPoint: 0,
      // 结束位置
      endPoint: 0,
      volumeWidth: 0,
      nowVolWidth: 0
    };
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.getQQMusic();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getQQMusic();
    },
    // 获取音乐列表
    getQQMusic() {
      // 自定义配置axios
      var axiosin = axios.create({
        baseURL: "https://api.55lover.com/",
        timeout: 5000,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        range: "bytes=0-"
      });
      var para = {
        size: this.size,
        page: this.page
      };
      axiosin
        .post("/api/getAudioList", Qs.stringify(para))
        .then(res => {
          let result = res.data.result;
          this.totalcount = res.data.total_count;
          this.list = result;
          // console.log(this.list)
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 播放暂停
    isPlay() {
      var $audio = $(".audio")
        .eq(this.index)
        .get(0);
      //改变暂停/播放icon
      if ($audio.paused) {
        $audio.play();
        this.names = "pause";
      } else {
        $audio.pause();
        this.names = "play";
      }
    },
    // 下一曲
    next() {
      if (this.index < this.list.length - 1) {
        this.playorpause(
          this.index + 1,
          this.list[this.index + 1].singername,
          this.list[this.index + 1].songname
        );
      } else {
        this.playorpause(0, this.list[0].singername, this.list[0].songname);
      }
    },
    prev() {
      // 上一曲 判断 当前播放歌曲索引 如果比0大则 可上一曲 否则调到最后一曲
      if (this.index > 0) {
        this.playorpause(
          this.index - 1,
          this.list[this.index - 1].singername,
          this.list[this.index - 1].songname
        );
      } else {
        this.playorpause(
          this.list.length - 1,
          this.list[this.list.length - 1].singername,
          this.list[this.list.length - 1].songname
        );
      }
    },
    // 改变进度条
    updateProcess($audio) {
      var self = this;
      // var $audio = $('.audio').eq(self.index).get(0);
      var value = Math.round(
        (Math.floor($audio.currentTime) / Math.floor($audio.duration)) * 100
      );
      // jquery 可实现实时更新当前进度
      $(".base-line-audio-process").css("width", value + "%");
      $(".currentTime").html(Coms.transTime($audio.currentTime));
      if (value == 100) {
        self.names = "play";
        if (self.index < self.list.length - 1) {
          self.playorpause(
            self.index + 1,
            self.list[self.index + 1].singername,
            self.list[self.index + 1].songname
          );
        } else {
          self.playorpause(0, self.list[0].singername, self.list[0].songname);
        }
        self.names = "pause";
        clearInterval(self.timer); // 播放完歌曲 自动停止定时器
      }
    },
    // 进度直接跳转到点击位置
    pointPos(e) {
      var $audio = $(".audio")
        .eq(this.index)
        .get(0);
      console.log(e.offsetX);
      $(".base-line-audio-process").width(e.offsetX);
      var pgsWidth = $(".base-line-audio-all-process").width();
      // 计算点击位置 与 播放总长度 的比例 算时间比例
      var rate = e.offsetX / pgsWidth;
      console.log($audio.duration * rate);
      $audio.currentTime = $audio.duration * rate;
      console.log(`pointPos:${$audio.currentTime}`);
      this.updateProcess($audio);
    },
    // 点击喇叭，静音或者有声
    // volumeormute () {
    //   var $audio = $('.audio').eq(this.index).get(0)
    //   if (this.volume == 'volume-off') {
    //     this.volume = 'volume-up'
    //     $audio.volume = this.initVolume
    //   } else {
    //     this.volume = 'volume-off'
    //     $audio.volume = 0
    //   }
    // },
    // 控制音量
    // pointVol (e, x) {
    //   $('.base-line-volume-process').width(x)
    //   var pgsWidth = $('.base-line-volume-all-process').width()
    //   // 计算点击位置 与 播放总长度 的比例 算时间比例
    //   var rate = x/pgsWidth
    //   var $audio = $('.audio').eq(this.index).get(0);
    //   this.initVolume = rate
    //   $audio.volume = rate
    // },
    // 拖拽控制音量
    // dragStart (e) {
    //   // 保存起始位置 以及球的起始位置
    //   this.startPoint = e.offsetX
    //   // 保存起始base-line的宽度
    //   this.volumeWidth = $('.base-line-volume-process').width()
    // },
    // drag (e) {},
    // dragend (e) {
    //   // 拖拽末位置-起始位置 拖拽距离 即 volume的长度 也要+
    //   var $min = e.offsetX - this.startPoint
    //   var nowVolWidth = this.volumeWidth + $min
    //   if (nowVolWidth >= $('.base-line-volume-all-process').width()) {
    //     this.nowVolWidth = $('.base-line-volume-all-process').width()
    //   } else if (nowVolWidth <= 0) {
    //     this.nowVolWidth = 0
    //   } else {
    //     this.nowVolWidth = nowVolWidth
    //   }
    //   this.pointVol(e, this.nowVolWidth)
    // },
    // 点击图标播放歌曲
    async playorpause(index, singername, songname) {
      var self = this;
      self.$store.commit("MUISC_PLAYED");
      self.firstplay = true;
      self.index = index;
      clearInterval(this.timer); // 避免再次选择歌曲时  没重复
      var s = [];
      this.title = `${songname} - ${singername}`;
      var str = ` 正在播放 ${songname} - ${singername}`;
      $("title").html(str);
      // 滚动 标题
      s = $("title")
        .html()
        .split("");
      self.timer = setInterval(() => {
        s.push(s[0]);
        s.shift(); // 去掉数组的第一个元素
        document.title = s.join("");
      }, 1000); //设置时间间隔运行
      await $(".audio")
        .get(this.i)
        .pause();
      self.names = "pause";
      self.i = index;
      // console.log(`播放歌曲索引是：${index}`)
      var $audio = $(".audio")
        .eq(index)
        .get(0);
      //  设置音量
      $audio.volume = this.initVolume;
      // 获取音量
      // console.log($audio.volume)
      // 获取音乐总时长
      self.durationTime = Coms.transTime($audio.duration);
      //  设置进度条
      $audio.addEventListener(
        "timeupdate",
        function() {
          self.updateProcess($audio);
        },
        false
      );
      $audio.play();
      // console.log($('.audio').eq(index).get(0).play())
    }
  },
  mounted() {
    $("title").html("聆听他的声音_音乐专栏_邓鹏博客");
    this.getQQMusic();
    console.log(this.GET_PLAY_STATUS);
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.music {
  margin: 0 auto;
}
.m-content {
  padding: 0.2rem;
}
.avatar {
  width: 1.24rem;
  height: 1.24rem;
  border: 1px solid #d5d5d5;
  background: #fff;
  border-radius: 2px;
  margin-right: 0.2rem;
}
.music-header {
  font-size: 14px;
}
.music-list-title {
  padding-bottom: 0.1rem;
  border-bottom: 2px solid #409eff;
}
.name {
  color: #000;
  font-size: 18px;
  margin-right: 0.15rem;
}
.from {
  color: #999;
}
.intro {
  padding-top: 0.15rem;
}
.address {
  padding: 0.15rem 0;
}

.music-list {
  padding: 0.2rem 0;
  font-size: 14px;
}
.music-list-title {
  font-size: 24px;
  padding: 0.2rem;
  line-height: 1;
}
.music-list-title span {
  font-size: 14px;
  color: #999;
}
.audio {
  width: 2rem;
}
.list .list-cell {
  height: 1rem;
  line-height: 1rem;
  transition: all 0.4s;
  font-size: 14px;
  padding: 0 0.2rem;
}
.list .list-cell:hover {
  background: #eee;
}
.list .list-cell i {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url(../assets/images/bf1.png) no-repeat;
  background-size: cover;
}
.list-cell a {
  color: #888;
}
.list-cell a:hover {
  text-decoration: underline !important;
}
.list .list-cell i:hover {
  background: url(../assets/images/bf3.png) no-repeat;
  background-size: cover;
}
.list .list-cell i.active {
  background: url(../assets/images/bf2.png) no-repeat;
  background-size: cover;
}
.playStatus {
  padding: 5px 10px;
  background: #409eff;
}
.playStatus b {
  display: block;
  width: 0.3rem;
  height: 0.2rem;
  background: url(../assets/images/music.png) no-repeat;
  background-size: cover;
}
.list .list-cell i.active ~ .playStatus b {
  background: url(https://qzonestyle.gtimg.cn/aoi/skin/img/skin-gif/1-music-sonic.gif)
    no-repeat;
  background-size: cover;
}
.page {
  text-align: center;
  margin-top: 0.6rem;
}

.music-bg {
  height: 0.8rem;
  padding: 0.2rem 0;
  width: 100%;
  background: linear-gradient(70deg, #333, #666);
  background: -webkit-linear-gradient(70deg, #333, #666);
  background: -moz-linear-gradient(70deg, #333, #666);
  background: -ms-linear-gradient(70deg, #333, #666);
  background: -o-linear-gradient(70deg, #333, #666);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
}
.mb {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.2rem;
  margin: 0 auto;
  position: relative;
}
.music-btns {
  width: 1.2rem;
  margin-top: 0.1rem;
}
.music-process {
  margin-left: 0.4rem;
  margin-top: -0.09rem;
}
.base-line1 {
  position: absolute;
  top: 0.03rem;
  width: 100%;
  z-index: -1;
  height: 1px;
  background: #aaa;
}
.base-line {
  height: 1px;
  background: #fff;
  width: 0%;
}
.base-ball {
  width: 0.08rem;
  height: 0.08rem;
  border-radius: 100%;
  background: #fff;
  box-shadow: 0 0 2px 2px #fff;
}
.base-line-volume-process {
  width: 50%;
}
.base-line-audio-process {
  width: 0;
}
.volume-btns {
  width: 1.6rem;
  transform: rotate(-90deg);
  position: absolute;
  right: -0.4rem;
  top: -0.6rem;
}
</style>
