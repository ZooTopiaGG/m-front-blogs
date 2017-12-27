import wx from 'weixin-js-sdk'

export default {
	createTime(tt){
		var time = new Date(parseInt(tt.slice(6, 19)))
		//tt.replace(/Date\([\d+]+\)/, function(a) { eval('d = new '+a) });
		var y = time.getFullYear();
	    var m = time.getMonth() + 1;
	    m = m < 10 ? ('0' + m) : m;
	    var d = time.getDate();
	    d = d < 10 ? ('0' + d) : d;
	    var h = time.getHours();
	    var minute = time.getMinutes();
	    minute = minute < 10 ? ('0' + minute) : minute;
	    var seconds = time.getSeconds();
	    seconds = seconds < 10 ? ('0' + seconds) : seconds;
	    return y + '-' + m + '-' + d+' '+h+':'+minute;
	},
  getCommonTime(milliseconds) {
    var time = new Date(milliseconds)
    //tt.replace(/Date\([\d+]+\)/, function(a) { eval('d = new '+a) });
    var y = time.getFullYear();
      var m = time.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = time.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = time.getHours();
      var minute = time.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var seconds = time.getSeconds();
      seconds = seconds < 10 ? ('0' + seconds) : seconds;
      return y + '-' + m + '-' + d;
  },
  getCommonTime1(milliseconds){
    var time = new Date(milliseconds),
        time_ = new Date(),
        time1 = time.getTime(time),//发布时间
        time_1 = time_.getTime(time_),//现在时间
        jTime = time_1 - time1,
        days    = jTime / 1000 / 60 / 60 / 24,
        daysRound   = Math.floor(days),
        hours    = jTime/ 1000 / 60 / 60 - (24 * daysRound),
        hoursRound   = Math.floor(hours),
        minutes   = jTime / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound),
        minutesRound  = Math.floor(minutes),
        seconds   = jTime/ 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound),
        secondsRound = Math.floor(seconds);
    if(daysRound>0){
        return this.getCommonTime(milliseconds)
    }else{
      if(hoursRound>0){
        return hoursRound+"小时前";
      }else{
        if(minutesRound>10){
          return minutesRound+"分钟前";
        }else{
          if(secondsRound>0){
            return "刚刚";
          }
        }
      }
    }
  },
	getTime(tt){
    let t = tt
    if (t) {
      var time = t.split('+')[0]
      time = time.replace('T', ' ')
      return time
    } else {
      return t
    }
	},
	getParam(paramName){
	    var paramValue = "";
	    var isFound = false;
	    if (location.search.indexOf("?") == 0 && location.search.indexOf("=") > 1) {
        var arrSource = unescape(location.search).substring(1, location.search.length).split("&");
        var i = 0;
        while (i < arrSource.length && !isFound) {
          if (arrSource[i].indexOf("=") > 0) {
            if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
              paramValue = arrSource[i].split("=")[1];
              isFound = true;
            }
          }
          i++;
	      }
	    }
	    return paramValue;
	},
	getRequest(){  
	   var url = location.search; //获取url中"?"符后的字串  
	   var theRequest = new Object();  
	   if (url.indexOf("?") != -1) {  
	      var str = url.substr(1);  
	      var strs = str.split("&");  
	      for(var i = 0; i < strs.length; i ++) {  
	         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
	      }  
	   }  
	   return theRequest;  
	},
	/*判断是否是微信 微博 QQ*/
	isWeiXin(){
		var wx = navigator.userAgent.toLowerCase();
		if(wx.indexOf('micromessenger')>-1){
			return true;
		}else{
			return false;
		}
	},
	isAlipay(){
		var weibo = navigator.userAgent.toLowerCase();
		if(weibo.indexOf('weibo')>-1){
			return true;
		}else{
			return false;
		}
	},
	// 分享
	share (title, desc, pic) {
    let url = location.href.split('#')[0]
    let para = {
      url: url
    }
    para = Qs.stringify(para)
    axios.post('/pay/GetWXShareInfo', para)
    .then(res=>{
      var data = res.data.result
      data = JSON.parse(data)
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.noncestr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(function(){
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: data.url, // 分享链接
            imgUrl: pic, // 分享图标
            success: function () { 
                // 用户确认分享后执行的回调函数
                //layer.msg('分享成功');
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
                 Toast('分享失败');
            }
        });
        //分享给好友
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: data.url, // 分享链接
            imgUrl: pic, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () { 
                // 用户确认分享后执行的回调函数
                //layer.msg('分享成功');
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
               Toast('分享失败');
            }
        });
        //分享到qq
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link:data.url, // 分享链接
            imgUrl: pic, // 分享图标
            success: function () { 
               // 用户确认分享后执行的回调函数
              //layer.msg('分享成功');
            },
            cancel: function () { 
               // 用户取消分享后执行的回调函数
              Toast('分享失败');
            }
        });
        //分享到QQ空间
        wx.onMenuShareQZone({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: data.url, // 分享链接
            imgUrl: pic, // 分享图标
            success: function () { 
               // 用户确认分享后执行的回调函数
               //layer.msg('分享成功');
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
                Toast('分享失败');
            }
        });
      });
      wx.error(function(res){
        console.log(res);
      });
    })
    .catch(error=>{

    })
  }
}
