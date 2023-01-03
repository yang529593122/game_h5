<template>
  <view class="cu-chat">
    <!-- 标题栏  start-->
      <fu-custom bgColor="bg-white" :isBack="true" :isBottom="true">
        <block slot="content">{{i18n['在线客服']}}</block>
        <block slot="right">
          <view class="flex align-center" @click="goCall">
            <image src="../../static/call.png"  class="call-img"  />
          </view>
        </block>
      </fu-custom>
      <!-- 标题栏  end -->
      <!-- 商品 start -->
      <view class="goods-wrap" v-if='isShowLink'>
        <view class="goods flex align-center justify-between" @click="navToDetail(goodsInfo.data)">
          <view class="img">
            <fu-image :src="goodsInfo.data.goods_thumb" mode="aspectFill"></fu-image>
          </view>
          <view class="con flex flex-direction justify-between">
            <view class="con-title text-df text-weight-500 text-333 text-cut">
              {{goodsInfo.data.goods_name}}
            </view>
            <view class="con-price flex justify-between align-center">
              <view class="text-price text-lg text-weight-500 text-theme">
                {{goodsInfo.data.goods_price}}
              </view>
              <view class="con-btn text-sm text-white text-center text-weight-500" @click.stop="sendLink">{{i18n['发给客服']}}</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 商品 end -->
      <!-- 聊天 start -->
      <scroll-view scroll-y="true" id="scrollview" :scroll-top="scrollTop" class="scroll-box" :style="{height:'calc('+ h + 'px - ' + (isShowLink ? '220rpx - ':'0rpx - ') +(keyboardheight>0? keyboardheight +'px - ' :(isOpen ? '360rpx - ':'100rpx - ') )+ CustomBar +'px)'}" >
        <view class="scroll-content" id="msglistview" :scroll-into-view="scrollToView">
          <!-- <view class="chat-time text-999 text-sm text-center">2020-11-11 12:23</view> -->
          <view v-for="(row, index) in msgList" :key="index" :id="'msg' + row.id">

              <!-- 系统消息 -->
              <block v-if="row.type == 'system'">
                <view class="chat flex others">
                  <view class="header">
                    <fu-image :src="row.face || '../../static/005.png'" radius="50%" :isGrowth="true" errorImg="../../static/005.png" mode="aspectFill"></fu-image>
                  </view>
                  <view class="chat-con">
                    <view class="chat-msg text-lg text-333">
                        {{ row.content }}
                    </view>
                  </view>
                </view>
              </block>
              <block v-else>
                <block v-if="row.uid == myuid">
                  <view class="chat flex myself">
                    <view class="header">
                      <fu-image :src="row.face || '../../static/005.png'" radius="50%" :isGrowth="true" errorImg="../../static/005.png" mode="aspectFill"></fu-image>
                    </view>
                    <view class="chat-con">
                      <!-- 商品 -->
                      <view class="chat-goods" v-if="row.type == 'link'"  @click="navToDetail(row.msg)">
                        <image :src="row.msg.goods_thumb" mode="aspectFill" class="goods-img"></image>
                        <view class="chat-goods-con">
                          <view class="text-333 text-sm text-weight-500 goods-title text-cut-2">{{row.msg.goods_name}}</view>
                          <view class="goods-money">
                            <text class="text-price text-lg text-weight-500 text-theme">{{row.msg.goods_price}}</text>
                            <text class="text-price text-sm text-weight-400 text-999 text-through" style="margin-left:16rpx;">{{row.msg.market_price}}</text>
                          </view>
                          <view class="goods-sale text-sm text-weight-400 text-999 ">{{i18n['月销']}}{{row.msg.sales_sum}}</view>
                        </view>
                      </view>
                      <!-- 图片 -->
                      <image v-if="row.type == 'img'" @tap="showPic(row)" :src="row.msg" mode="widthFix" class="chat-img"></image>
                      <!-- 文字 -->
                      <view class="chat-msg text-lg text-333" v-if="row.type == 'text'">
                          <rich-text :nodes="row.msg"></rich-text>
                      </view>
                    </view>
                    </view>
                </block>
                <block v-if="row.uid != myuid">
                  <view class="chat flex others">
                  <view class="header">
                    <fu-image :src="row.face || '../../static/005.png'" :isGrowth="true" radius="50%" errorImg="../../static/005.png" mode="aspectFill"></fu-image>

                  </view>
                  <view class="chat-con">

                    <!-- 商品 -->
                    <!-- <view class="chat-goods">
                      <image src="../../../activity/static/top.png" mode="aspectFill" class="goods-img"></image>
                      <view class="chat-goods-con">
                        <view class="text-333 text-sm text-weight-500 goods-title text-cut-2">进口高定钻石项链 意大利定制款炫彩</view>
                        <view class="goods-money">
                          <text class="text-price text-lg text-weight-500 text-theme">608.00</text>
                          <text class="text-price text-sm text-weight-400 text-999 text-through">800.00</text>
                        </view>
                        <view class="goods-sale text-sm text-weight-400 text-999">月销2333</view>
                      </view>
                    </view> -->
                    <!-- 图片 -->
                    <image v-if="row.type == 'img'" :src="row.msg" mode="widthFix" class="chat-img"></image>
                    <!-- 文字 -->
                    <view class="chat-msg text-lg text-333" v-if="row.type == 'text'">
                        <rich-text :nodes="row.msg"></rich-text>
                    </view>
                  </view>
                  </view>
                </block>
              </block>

          </view>

        </view>
      </scroll-view>
      <!-- 聊天 end -->
      <!-- 输入 start -->
      <view class="chat-input-wrap" :style="{bottom:upBottom +'px'}" :class="{'open':isOpen,'close':!isOpen && (type == 'file' || type == 'emoji')}">
        <view class="mask" @click="close" v-if="isOpen"></view>
        <view class="chat-input flex justify-between align-center">
          <view class="chat-left flex align-center">
            <input type="text" v-model="textMsg" :confirm-hold="true" @focus="inputFocus" @input="inputChange" @blur="inputBlur" :adjust-position="false" class="chat-ipt" confirm-type="send" @confirm="sendText(true)" />
            <image src="../../static/emoji.png" mode="widthFix" class="emoji-img" @click="handleOpen('emoji')"></image>
          </view>
          <view class="chat-right flex align-center" @click="handleOpen('file')">
            <image src="../../static/add.png" mode="widthFix" class="add-img"></image>
          </view>
        </view>
        <view class="chat-content">
          <view class="chat-emoji" v-show="type == 'emoji'">
            <scroll-view scroll-y="true" style="height: 360rpx;" class="scroll-view">
              <view class="flex flex-wrap justify-between emoji-wrap">
                <!-- <view class="emoji" v-for="(item,index) in emoji2.emoji" :key="index" @tap="addEmoji(item)">
                  {{item}}
                </view> -->
                <view class="emoji" v-for="(em, index) in emojiList" :key="index" @tap="addEmoji(em)">
                   <image mode="widthFix" :src="'https://zbphp.zhongbenzx.com/mini_param/emoji/' + em.url"></image>
                </view>
                <!-- 删除，发送按钮 -->
                <view class="emoji-btn flex algin-item" v-if="isOpen">
                  <view class="backspace flex justify-center align-center" @click="delte">
                    <image src="../../static/backspace-solid.png" mode="widthFix" />
                  </view>
                  <view class="send-btn" @click="sendText(false)">{{i18n['发送']}}</view>
                </view>
              </view>
            </scroll-view>
          </view>
          <view class="chat-file flex" v-show="type == 'file'">
            <view class="chat-file-img flex flex-direction text-center" @tap="chooseImage('album')">
              <image src="../../static/img.png" mode="widthFix" class="img"></image>
              <view class="text-666 text-sm text-weight-400">{{i18n['图片']}}</view>
            </view>
            <view class="chat-file-img flex flex-direction text-center" @tap="chooseImage('camera')">
              <image src="../../static/camera-1.png" mode="widthFix" class="img"></image>
              <view class="text-666 text-sm text-weight-400">{{i18n['拍摄']}}</view>
            </view>
          </view>

        </view>
      </view>
      <!-- 输入 end -->
  </view>
</template>

<script>
  import emoji from './libs/emoji.js';
   // websocket 接口配置
  import { WEBSOCKET, UPLOAD_IMAGE_URL } from "@/common/config.js";
  var that;
  var socketOpen = false; // websocket 开启状态
  var socketMsgQueue = []; // websocket信息列表
  var kf_id = 0; // 客服id
  var kf_name = ''; // 客服名字
  // 是否点击显示表情的标志
  var flag = 1;
  var commChat = 1;
  export default {
    data() {
      return {
        emojiHeight: 0,  // 表情包高度
        minKeyboardHeight: 50,  //  最小高度
        socket:null,  // socket实例
        marginBottom: uni.upx2px(100), // 默认输入框距离底部高度
        partnerServiceList: [], // 快捷标签列表
        isShowLink: true, // 是否显示商品链接
        scrollHeight: '250', // 商品链接高度
        goods_id: '', // 商品id
        goodsInfo: {
          type: '',
          data: {
          }
        }, // 临时商品信息
        keyboardheight: 0, // 实时键盘高度
        onKeyboard: false, //是否打开了软键盘
        partner_id: 0,  // 商户id 不存在为0
        kf_id: 0, //客服id
        customer: {}, //客服信息
        // imgUrl: 'https://zbphp.zhongbenzx.com/mini_param/',
        // imgUrl: this.$apiurl, //远程图片地址
        user: {}, //会员信息
        textMsg: '', //文字消息
        scrollAnimation: false, // scroll-view标签动画
        scrollTop: 0, // scrollTop位置
        scrollToView: '', // scrollToView位置
        msgList: [], //聊天列表
        msgImgList: [], //聊天图片列表
        msg_code: [
          {
            //聊天列表里的字段定义
            id: 0,
            uid: -1,
            username: global.i18n['系统助手'],
            face: 'http://lbphp.lwwan.com/uploads/images/20190923/837437f04ede29d8ce6d169385d77496.jpg',
            time: '',
            type: 'system',
            content: global.i18n['您好，有问题请留言']
          }
        ],
        myuid: 0, //我的uid
        //录音相关参数
        // #ifndef H5
        //H5不能录音
        RECORDER: uni.getRecorderManager(),
        // #endif
        isVoice: false,
        voiceTis: global.i18n['按住 说话'],
        recordTis: global.i18n['手指上滑 取消发送'],
        recording: false,
        willStop: false,
        initPoint: { identifier: 0, Y: 0 },
        recordTimer: null,
        recordLength: 0,
        //播放语音相关参数
        AUDIO: uni.createInnerAudioContext(),
        playMsgid: null,
        VoiceTimer: null,
        //表情定义
        showEmji: '',
        emojiList: Object.freeze(emoji),
        isOpen:false,//是否打开表情或者文件
        type:'',//打开了标枪还是文件
        safeHeight:0,//ios安全区高度
        upBottom:0,//抬起键盘输入框上升高度
        focusIndex:-1,
      };
    },
    watch: {
      keyboardheight:{
        handler(newVal,oldVal){
          // console.log('ZZZZZZZZZZZZZZZZZZZZZZZZnewVal',newVal,this.safeHeight)
          if(newVal == 0){
            this.upBottom = uni.getSystemInfoSync().windowBottom;
          }else{
            this.upBottom = newVal - this.safeHeight;
          }
        },
        immediate:true
      }
    },
    /**
     * @description 页面入参
     * @param {object} options = [kid,goods_id,activity_id]
     * @param {string} kid = 客服id
     * @param {string} goods_id = 商品id
     * @param {string} activity_id = 活动id
     */
    onLoad(option) {
      // console.log(this.emojiList);
      this.h = uni.getSystemInfoSync().screenHeight - uni.getSystemInfoSync().windowBottom;
      // console.log('XXXXXXXXXXX',this._h)
      console.log(uni.getSystemInfoSync().safeAreaInsets.bottom);
      this.safeHeight = uni.getSystemInfoSync().safeAreaInsets.bottom;
			// this.setNavigationBarTitle(this.i18n['客服'])
         // 监听键盘事件
      uni.onKeyboardHeightChange((res) => {
        console.log("键盘监听", res);
        this.keyboardheight = res.height;

      });

      this.get_customer_info(option.kid || 0);
      this.goods_id = option.goods_id || ''
      this.activity_id = option.activity_id  || ''
      console.log(this.goods_id)
      if(this.goods_id){
        this.loadData()
      }else{
        this.isShowLink = false
      }
      this.getPartnerServiceData()
      that = this;
			that.kf_id = option.kid;
      //语音自然播放结束
      this.AUDIO.onEnded(res => {
        this.playMsgid = null;
      });
      // #ifndef H5
      //录音开始事件
      this.RECORDER.onStart(e => {
        this.recordBegin(e);
      });
      //录音结束事件
      this.RECORDER.onStop(e => {
        this.recordEnd(e);
      });
      // #endif
      // 获取用户自己的信息
      let user_data = uni.getStorageSync('USER_INFO');
      if (user_data) {
        this.myuid = user_data.id;
        this.user.id = user_data.id;
        this.user.name = user_data.user_nickname;
        this.user.avatar = user_data.head_img;
        this.user.group = 1;
      } else {
        uni.navigateTo({
          url: '/pages/login/login'
        });
      }
      /* 创建连接和获取聊天记录 */
      this.connectSocket();
      this.getMsgList();
    },
    onUnload(){
      this.closeSocket()
    },
    // watch: {
    //   showEmji(val) {
    //     console.log(val)
    //     if (val == 'showEmoji') {
    //       if (this.keyboardheight > 0) {
    //         setTimeout(() => {
    //           this.minKeyboardHeight = 220
    //           this.emojiHeight = '300'
    //         }, 100)
    //       } else {
    //         this.minKeyboardHeight = 220
    //         this.emojiHeight = '300'
    //       }

    //     } else {
    //       this.minKeyboardHeight = 50
    //       this.emojiHeight = 0
    //     }
    //   },
    // },
	onReady() {
		if(this.upBottom == 0) {
			this.upBottom = uni.getSystemInfoSync().windowBottom
		}
	},
    methods: {
      //关闭已经打开的表情或者文件
      close(){
        this.isOpen = false;
        // 关闭动画执行完再清空
        setTimeout(()=>{
          this.type = '';
        },300)
      },
      // 打开表情或者文件
      handleOpen(type){
        this.isOpen = true;
        this.type = type;
        this.scrollToBottom();
      },
      // 输入框聚焦
      inputFocus(){
        console.log('聚焦了');
        this.isOpen = false;
        this.type = '';
        this.scrollToBottom();
        // 在input、textarea等focus之后，获取输入框的光标位置。注意：只有在focus的时候调用此接口才有效。目前仅支持 vue 页面，nvue 可以直接使用 weex 的 getSelectionRange。
        // uni.getSelectedTextRange({
        //   success: res => {
        //     console.log('getSelectedTextRange res', res.start, res.end)
        //     this.focusIndex = res.start;
        //   }
        // })
      },
      // 输入表情时从尾部删除
      delte(){
        let textArr = this.textMsg.split('');
        textArr.pop();
        this.textMsg = textArr.join('');
      },
      inputChange(){

      },
      inputBlur(){

      },
      /**
       * @func 滚动至聊天底部
       */
      scrollToBottom(t) {
        let that = this;
        let query = uni.createSelectorQuery()
        query.select('#scrollview').boundingClientRect()
        query.select('#msglistview').boundingClientRect()
        query.exec((res) => {
          // console.log(res)
          if (res[1].height > res[0].height) {
            that.scrollTop = res[1].height - res[0].height + 999
            // that.scrollToBottom = 'msg'+ this.msgList[this.msgList.length - 1].id;
          }
        })
      },
       /**
       * @description 点击服务标签
       * @param {object} item = 服务标签信息
       */
      goService(item) {
        this.$util.throttle(() => {
          this.goServiceDispose(item);
        }, 1000, true);
      },
          /**
       * @description 服务标签处理
       * @param {object} item = 服务标签信息
       */
      goServiceDispose(item) {
        if (item.url) {
          uni.navigateTo({
            url: item.url
          });
        } else {
          // 服务标签纯前端处理，不走ws
          let lastid = this.msgList[this.msgList.length - 1].id || 0;
          lastid++;
          console.log('发送消息', item)
          let content = {
            type: "text",
            msg: item.answer,
            content: item.answer,
            id: lastid + 1
          }
          var nowDate = new Date();
          let sendContent = {
            type: "text",
            msg: item.problem,
            content: item.problem,
            uid: this.user.id,
            username: this.user.name,
            face: this.user.avatar,
            time: nowDate.getHours() + ':' + nowDate.getMinutes(),
            id: lastid
          }
          // 发送快捷标签信息
          this.addTextMsg(sendContent, 'text')
          that.$nextTick(() => {
            console.log(that.msgList.length)
            that.scrollToBottom()
          });

          // 自动回复标签信息
          setTimeout(() => {
            this.addService(content, 'text')
            that.$nextTick(() => {
              that.scrollToBottom()
            });
          }, 800)
        }
      },
      // 获取快捷标签信息
      getPartnerServiceData() {
        this.$api
          .post(global.apiUrls.getPartnerServiceLabels, {
            partner_id: this.partner_id
          }).then(res => {
            console.log('快捷标签列表', res)
            if (res.data.code == 1) {
               const info = uni.getSystemInfoSync();
              this.marginBottom = uni.upx2px(160) + info.safeAreaInsets.bottom;
              this.partnerServiceList = res.data.data
              // 滚动到底部
              this.$nextTick(() => {
                this.scrollToBottom()
                this.scrollAnimation = true;
              });
            }
          })
      },
      /**
       * @description 去商品详情
       * @param {object} item = 商品信息
       */
      navToDetail(item) {
        console.log(item)
        //  goods_type
          // 0=>'无',
          // 1=>'秒杀',
          // 2=>'拼团',
          // 3=>'预售',
          // 4=>'折扣',
          // 5=>'砍价',
          // 6=>'首次限购',
          // 7=>'新人0元购',
          // 8=>'积分',
          // 9=>'抽奖9宫格',
          // 10=>'砍价活动',

      if(item.goods_type == 8){
         // 跳转到积分商品详情
        this.$urouter.navigateTo({
          url: "/pages/integral/integralgoods/integral-goods-detail/index",
          params: {
            goods_id: item.goods_id,
            activity_id: item.activity_id,
            sku_id:0,
          },
        });

      }else if(item.goods_type == 1){

       this.$urouter.navigateTo({
         url: "/pages/activity/assemble/assemble-detail/index",
         params: {
           goods_id: item.goods_id,
           sku_id: item.sku_id || 0,
           activity_id: item.activity_id || 0,
         },
       });

      }else if(item.goods_type == 2){

        this.$urouter.navigateTo({
          url: '/pages/activity/seckill/seckill-detail/index',
          params: {
            goods_id: item.goods_id,
            sku_id: item.sku_id || 0,
            activity_id: item.activity_id || 0,
          }
        });

      }else if(item.goods_type == 3){

       this.$urouter.navigateTo({
          url: '/pages/activity/advance/advance-detail/index',
          params: {
            goods_id: item.goods_id,
            sku_id: item.sku_id || 0,
            activity_id: item.activity_id || 0,
          }
        });

      } else{
        // 跳转到普通商品详情
        this.$urouter.navigateTo({
          url: "/pages/goods/goodsdetail/goods-detail/index",
          params: {
            goods_id: item.goods_id,
            activity_id: item.activity_id
          },
        });

      }

      },
      /**
       * @func 获取商品详情
       */
      loadData() {
        this.$api
          .get(global.apiUrls.getGoodsDetail, {
            goods_id: this.goods_id,
            activity_id: this.activity_id
          })
          .then(res => {
            if (res.data.code == 1) {
              console.log('goods detail', res.data.data);
              let data = res.data.data
              // 插入临时商品信息
              this.goodsInfo = {
                type: 'consult',
                data: {
                  goods_name: data.name,
                  goods_price: data.chat_price,
                  goods_thumb: data.thumb,
                  goods_id: this.goods_id,
                  activity_id: this.activity_id,
                  goods_type:data.goods_type  ,//用来判断是普通商品还是活动商品
                  market_price:data.market_price,
                  sales_sum:data.sales_sum
                }
              }
              // console.log(this.msgList)
            }else{
              this.isShowLink = false;
            }
          })
      },

       /**
        * @description 获取客服消息
        * @param {String} id = 聊天id
        */
      get_customer_info(id) {
        this.$api.get(global.apiUrls.postCustomerInfo, { id: id })
        .then(res => {
          if (res.data.code == 1) {
            that.customer = res.data.data;
          }
        });
      },
         /**
      * @func 连接websocket
      */
      connectSocket() {
        let that = this;
       this.socket = uni.connectSocket({
          //创建连接
          url: WEBSOCKET,
          success: () => { }
        });
        this.socket.onOpen(function (res) {
          // console.log('WebSocket连接已打开！', res);
          // 登录
          var login_data = '{"type":"userInit", "partner_id":"' + that.partner_id + '",  "uid": ' + that.user.id + ', "name" : "' + that.user.name + '", "avatar" : "' + that.user.avatar + '", "group" : ' + that.user.group + '}';
          that.sendSocketMessage(login_data);
          socketOpen = true;
          for (var i = 0; i < socketMsgQueue.length; i++) {
            that.sendSocketMessage(socketMsgQueue[i]);
          }
          socketMsgQueue = [];
        });

        this.socket.onError(function (res) {
          // console.log('WebSocket连接打开失败，请检查！', res);
          that.socket = uni.connectSocket({ url: WEBSOCKET});
					// that.$message.info('客服不在线，请稍后再试')
        });
        this.socket.onMessage(function (res) {
          console.log('onSocketMessage', res);
          var data = JSON.parse(res.data);
          console.log(data,'后端收到通知成功返回信息')
          // console.log(data)
          switch (data.message_type) {
            // 服务端ping客户端
            case 'ping':
              that.sendSocketMessage('{"type":"ping"}');
              break;
            // 已经被分配了客服/ 或者客服不在线code为0
            case 'connect':
              if (data.data.code == 0) {
                //0客服不在线
                let content = {
                  type: "text",
                  msg: data.data.content,
                  content: data.data.content,
                  face: data.data.avatar,
                }
                // 添加临时客服不在线提醒
                that.addOfflineMessage(content)
                that.$nextTick(function () {
                  that.scrollToBottom()
                });
              } else {
                // console.warn('connect', data.data.kf_id);
                // console.warn('connect', data.data.kf_name);
                kf_id = data.data.kf_id;
                kf_name = data.data.kf_name;

                uni.setStorageSync('kf_id', kf_id);
                that.kf_id = data.data.kf_id;
                if (1 == commChat) {
                  that.getMsgList();
                }
              }
              break;
            // 排队等待
            case 'wait':
              if (data.data.code == 0) {
                //0客服不在线1排队
                that.closeSocket();
              }
              // showSystem(data.data);
              break;
            // 监测聊天数据
            case 'chatMessage':
              that.showMsg(data.data, data.data.type);
              break;
            // 问候语
            case 'helloMessage':
              that.showMsg(data.data, 'text', 'helloMessage');
              break;
            // 转接
            case 'relinkMessage':
              commChat = 2;
              document.getElementById('title').innerHTML = this.i18n['正在转接中...'];
              break;
          }
        });
        this.socket.onClose(function (res) {
          console.log('WebSocket 已关闭！');
          this.$message.info('连接服务已暂停不可用，需联系平台重启');

        });
      },
        /**
       * @description  发送
       * @param {Object} msg 用户信息
       */
      sendSocketMessage(msg) {
        // console.log('发送通知', msg, socketOpen, socketMsgQueue);
        if (socketOpen) {
          this.socket.send({
            data: msg,
            success: function (res) {
              console.log(res);
            }
          });
        } else {
          socketMsgQueue.push(msg);
        }
      },
        /**
       * @func 关闭websocket
       */
      closeSocket() {
        if (socketOpen) {
          this.socket.close()
        }

        uni.onSocketClose(function (res) {
          console.log('WebSocket 已关闭！');
          this.$message.info('连接服务已暂停不可用，需联系平台重启');
        });
      },
      /**
       * @description  发送消息
       * @param {Object} content 消息内容
       * @param {String} type 消息类型
       */
      sendMsg(content, type) {
        var nowDate = new Date();
        // 判断出现自动回复不带id得情况
        let  lastid =0
        if(this.msgList.length >0){
          lastid = this.msgList[this.msgList.length - 1].id || 0;
        }
        lastid++;
        let msg = {
          id: lastid,
          uid: this.user.id,
          username: this.user.name,
          face: this.user.avatar,
          time: nowDate.getHours() + ':' + nowDate.getMinutes(),
          type: type,
          msg: content
        };
        this.screenMsg(msg);
        console.log(this.kf_id);

        let send_data = JSON.stringify({
          type: 'chatMessage',
          data: {
            to_id: this.kf_id,
            to_name: kf_name,
            content: content,
            type: type,
            from_name: this.user.name,
            from_id: this.user.id,
            from_avatar: this.user.avatar,
            partner_id: this.partner_id,
            group_id: this.user.group
          }
        });
        this.sendSocketMessage(send_data);
      },
      /**
       * @description  接收消息
       * @param {Object} data 消息
       * @param {String} type 消息类型
       * @param {String} val 消息类型里的第二级类型
       */
      showMsg(data, type, val) {
        var nowDate = new Date();
        let lastid = 0,
          content = '';
        if (this.msgList.length > 0) {
          lastid = this.msgList[this.msgList.length - 1].id || 0;
        }
        lastid++;
        if (type != 'img') {
          content = this.replaceEmoji(data.content);
          console.log(content)
        } else {
          content = data.content;
        }
        let msg = {
          id: lastid,
          uid: data.id,
          username: data.name,
          face: data.avatar,
          time: nowDate.getHours() + ':' + nowDate.getMinutes(),
          type: type ? type : 'text',
          msg: content,
          content: content
        };
        console.log(msg, 'shouMsg', val);
        this.screenMsg(msg, val);
      },
      /**
       * @func 读取本地聊天记录
       */
      getMsgList() {
        // 读取本地聊天记录
        let kf_id = this.kf_id == 0 ? uni.getStorageSync('kf_id') : this.kf_id;
        var key = kf_id + '-' + this.user.id;
        // 消息列表
        let list = this.getCacheChat(key) ? this.getCacheChat(key) : [];
        var msg_code = this.msg_code;
        console.log(list, '缓存聊天记录', key);

        // 获取消息中的图片,并处理显示尺寸
        for (let i = 0; i < list.length; i++) {
          if (list[i].type == 'img') {
            list[i] = this.setPicSize(list[i]);
            console.log('list[i]: ' + JSON.stringify(list[i]));
            this.msgImgList.push(list[i].msg.url);
          }
        }
        if (list.length > 0) {
          this.msgList = list;
        } else {
          // this.msgList = msg_code;
        }
        // 滚动到底部
        this.$nextTick(() => {
          this.scrollAnimation = true;
          this.scrollToBottom()
        });
      },
      /**
       * @description 处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
       * @param {Object} row 消息信息
       */
      setPicSize(row) {
        if (typeof row.msg == 'object') {
          return row;
        }
        let url = row.msg;
        let pa = /.*\[(.*)\]/;
        let path = url.match(pa) ? url.match(pa)[1] : '';
        row.msg = path || row.msg;
        return row;
        /* 下方为原始逻辑，已废弃 */
        let maxW = uni.upx2px(350);
        let maxH = uni.upx2px(350);
        if (row.msg.w > maxW || row.msg.h > maxH) {
          let scale = row.msg.w / row.msg.h;
          if (row.msg.w > row.msg.h) {
            row.msg.w = maxW;
            row.msg.h = row.msg.w / scale;
          } else {
            row.msg.h = maxH;
            row.msg.w = row.msg.h * scale;
          }
        }
        return row;
      },
      /**
       * @description  接受消息(筛选处理)
       * @param {Object} msg 消息信息
       * @param {String} val 消息类型里的第二级类型
       */
      screenMsg(msg, val) {
        //从长连接处转发给这个方法，进行筛选处理
        if (msg.uid != this.myuid) {
          uni.vibrateLong();
        }

        switch (msg.type) {
          case 'text':
            this.addTextMsg(msg);
            break;
          case 'voice':
            this.addVoiceMsg(msg);
            break;
          case 'img':
            this.addImgMsg(msg);
            break;
          case 'link':
            this.addLinkMsg(msg)
        }
        this.$nextTick(() => {
          this.scrollToBottom()
        });
        // 储存聊天记录
        console.log(msg, '接受了什么吗', val)
        let kf_id = this.kf_id == 0 ? uni.getStorageSync('kf_id') : this.kf_id;
        var key = kf_id + '-' + this.user.id;
        var localMsg = this.getCacheChat(key);
        if (localMsg == null || localMsg.length == 0) {
          localMsg = [];
        }
        // 开场白信息不记录缓存
        if (val == 'helloMessage') return;
        console.log(localMsg)
        localMsg.push(msg);
        console.log(key, this.kf_id + this.user.id)
        this.setCacheChat({ key: key, data: localMsg });
      },
       /**
       * @func 选择表情
       */
      chooseEmoji() {
        this.hideKeyboard(); //隐藏软键盘
        this.showEmji = this.showEmji == 'showEmoji' ? 'hideEmoji' : 'showEmoji';
      },
        /**
       * @description  隐藏表情
       * @param {Boolean} val  是否不需要隐藏软键盘
       */
      hideEmoji(val) {
        if(!val){
          this.hideKeyboard(); //隐藏软键盘
        }
        this.showEmji = this.showEmji == 'showEmoji' ? 'hideEmoji' : '';
      },
        /**
       * @description  添加表情
       * @param {Object} em  表情alt
       */
      addEmoji(em) {
        this.textMsg += em.alt;
        // if(this.focusIndex == -1) {
        //   this.textMsg += item;
        // }
        // else{
        //   let textArr = this.textMsg.split("");
        //   textArr.splice(this.focusIndex,0,item);
        //   this.textMsg = textArr.join("");
        //   this.focusIndex++;
        //   console.log(textArr);
        // }
      },
      /**
       * @func 发送文字消息
       */
      sendText(isClose) {
        if (!this.textMsg) {
          return;
        }
        let content = this.replaceEmoji(this.textMsg);
        this.sendMsg(content, 'text');
        this.textMsg = '';
        // console.log(this.msgList);
        if(isClose){
          this.close();
        }
        // uni.hideKeyboard();
      },
     /**
      * @func 发送商品链接
      */
      sendLink() {
        console.log(11111)
        this.isShowLink = false
        this.scrollHeight = 0
        let content = this.goodsInfo.data
        this.sendMsg(content, 'link')
      },

       /**
      * @description  替换表情符号为图片
      * @param {String} str  消息内容
      */
      replaceEmoji(str) {
        str = str.replace(/emoji/g, ' '); // 去除 emoji 这个字符串
        let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
          console.log(item, '表情');
          for (let i = 0; i < this.emojiList.length; i++) {
            // let row = this.emojiList[i];
            // for (let j = 0; j < row.length; j++) {
            //   let EM = row[j];
            //   if (EM.alt == item) {
            //     //在线表情路径，图文混排必须使用网络路径
            //     let onlinePath = 'https://zbphp.zhongbenzx.com/mini_param/emoji/';
            //     let imgstr = '<img style="width:27px;" src="' + onlinePath + EM.url + '">';
            //     return imgstr;
            //   }
            // }
            let EM = this.emojiList[i];
            console.log(EM)
            if (EM.alt == item) {
              //在线表情路径，图文混排必须使用网络路径
              let onlinePath = 'https://zbphp.zhongbenzx.com/mini_param/emoji/';
              let imgstr = '<img style="width:25px;display:inline-block;vertical-align:middle;" src="' + onlinePath + EM.url + '">';
              return imgstr;
            }
          }
        });
        // console.log('99999999999999999999999',replacedStr)
        return replacedStr;
      },
       /**
       * @description  选择图片发送
       * @param {String} sourceType 相册或者相机 类型
       */
      chooseImage(type) {
        this.close();
        this.uploadImg(type,res => {
          console.log(res, '上传图片');
          if(res.code == 1){
            let msg = 'img[' + res.data[0].path + ']';
            this.sendMsg(msg, 'img');
          }else{
            this.$message.info(res.msg);
          }

        });
        return false;
      },
      /**
       * @description  推送离线消息
       * @param {Object} msg 单个消息信息
       */
      addOfflineMessage(msg) {
        this.msgList.push(msg);
      },
        /**
       * @description  推送快捷服务消息
       * @param {Object} msg 单个消息信息
       */
      addService(msg) {
        this.msgList.push(msg);
      },
      /**
       * @description  添加系统文字消息到列表
       * @param {Object} msg 单个消息信息
       */
      addSystemTextMsg(msg) {
        this.msgList.push(msg);
      },
      /**
       * @description  处理商品链接
       * @param {Object} msg 单个消息信息
       */
      addLinkMsg(msg) {
        this.msgList.push(msg);
      },
       /**
       * @description  处理文字消息
       * @param {Object} msg 单个消息信息
       */
      addTextMsg(msg) {
        this.msgList.push(msg);
      },
   /**
       * @description  处理语音消息
       * @param {Object} msg 单个消息信息
       */
      addVoiceMsg(msg) {
        this.msgList.push(msg);
      },
    /**
       * @description  处理图片消息
       * @param {Object} msg 单个消息信息
       */
      addImgMsg(msg) {
        msg = this.setPicSize(msg);
        this.msgImgList.push(msg.msg);
        this.msgList.push(msg);
      },
       /**
       * @description  预览图片
       * @param {Object} row 单个消息信息
       */
      showPic(row) {
        console.log(row);
        uni.previewImage({
          indicator: 'none',
          current: row.msg,
          urls: [row.msg]
        });
      },
      /**
       * @description  播放语音
       * @param {Object} msg 消息信息
       */
      playVoice(msg) {
        this.playMsgid = msg.id;
        this.AUDIO.src = msg.msg.url;
        console.log('msg.msg.url: ' + msg.msg.url);
        this.AUDIO.play();
      },
     /**
       * @description  录音开始
       * @param {Object} e 录音事件源
       */
      voiceBegin(e) {
        if (e.touches.length > 1) {
          return;
        }
        this.initPoint.Y = e.touches[0].clientY;
        this.initPoint.identifier = e.touches[0].identifier;
        this.RECORDER.start({ format: 'aac' }); //录音开始,
      },
        /**
       * @description  录音开始UI效果
       * @param {Object} e 录音事件源
       */
      recordBegin(e) {
        this.recording = true;
        this.voiceTis = this.i18n['松开 结束'];
        this.recordLength = 0;
        this.recordTimer = setInterval(() => {
          this.recordLength++;
        }, 1000);
      },
       /**
       * @func 录音被打断
       */
      voiceCancel() {
        this.recording = false;
        this.voiceTis = this.i18n['按住 说话'];
        this.recordTis = this.i18n['手指上滑 取消发送'];
        this.willStop = true; //不发送录音
        this.RECORDER.stop(); //录音结束
      },
       /**
       * @description  录音中(判断是否触发上滑取消发送)
       * @param {Object} e 录音事件源
       */
      voiceIng(e) {
        if (!this.recording) {
          return;
        }
        let touche = e.touches[0];
        //上滑一个导航栏的高度触发上滑取消发送
        if (this.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
          this.willStop = true;
          this.recordTis = this.i18n['松开手指 取消发送'];
        } else {
          this.willStop = false;
          this.recordTis = this.i18n['手指上滑 取消发送'];
        }
      },
      /**
       * @description  结束录音
       * @param {Object} e 录音事件源
       */
      voiceEnd(e) {
        if (!this.recording) {
          return;
        }
        this.recording = false;
        this.voiceTis = this.i18n['按住 说话'];
        this.recordTis = this.i18n['手指上滑 取消发送'];
        this.RECORDER.stop(); //录音结束
      },

     /**
       * @description  录音结束(回调文件)
       * @param {Object} e 录音事件源
       */
      recordEnd(e) {
        clearInterval(this.recordTimer);
        if (!this.willStop) {
          plus.io.resolveLocalFileSystemURL(
            e.tempFilePath,
            function (entry) {
              // 可通过entry对象操作test.html文件
              entry.file(function (file) {
                console.log(file.size + '--' + file.name);
              });
            },
            function (e) {
              alert('Resolve file URL failed: ' + e.message);
            }
          );
          console.log('e: ' + JSON.stringify(e));
          let msg = {
            length: 0,
            url: e.tempFilePath
          };
          let min = parseInt(this.recordLength / 60);
          let sec = this.recordLength % 60;
          min = min < 10 ? '0' + min : min;
          sec = sec < 10 ? '0' + sec : sec;
          msg.length = min + ':' + sec;
          this.sendMsg(msg, 'voice');
        } else {
          console.log('取消发送录音');
        }
        this.willStop = false;
      },
      /**
       * @func 切换语音/文字输入
       */
      switchVoice() {
        this.hideEmoji();
        this.isVoice = this.isVoice ? false : true;
      },
       /**
       * @func 空事件
       */
      discard() {
        return;
      },
       /**
       * @description  获取缓存聊天记录
       * @param {Array} key 缓存名称
       */
      getCacheChat(key) {
        return uni.getStorageSync(key);
      },
        /**
       * @description  设置缓存聊天记录
       * @param {Object} obj 缓存信息
       */
      setCacheChat(obj) {
        uni.setStorageSync(obj.key, obj.data);
      },
      /**
       * @description 上传图片
       * @param {Function} successFn  = 回调
       * @param {string} num	=选择图片的数量
       * @param {object} data  =上传的参数
       * @param {Function} progressFn  = 进度的回调
       */
      uploadImg(type,successFn, num = 1, data = {}, progressFn) {
        console.log(type)//上传图片
        // let url = UPLOAD_IMAGE_URL;
        uni.chooseImage({
          count: num, //默认1
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: [type], //从相册选择
          success: function (res) { //选择后
            const tempFilePaths = res.tempFilePaths;
            let fileList = {}; //储存上传实例；
            for (var i in tempFilePaths) {
              fileList['uploadTask' + i] = uni.uploadFile({ //上传后台
                url: UPLOAD_IMAGE_URL,
                filePath: tempFilePaths[i],
                name: 'file[]',
                formData: data,
                success: function (upRes) { //上传成功
                  //uni.hideLoading();
                  //console.log(upRes, '上传图片');
                  if (upRes.statusCode == 200) {
                    let data = JSON.parse(upRes.data);
                    if (typeof (successFn) == 'function') {
                      successFn(data)
                    }
                  } else {
                    uni.showToast({
                      title: upRes.errMsg,
                      icon: 'none'
                    })
                  }

                },
                fail: function (err) {
                  //console.log('上传失败',err);
                  uni.showToast({
                    title: this.i18n['图片上传失败，请稍后再试.'] + err.errMsg,
                    icon: 'none'
                  })
                }
              })
              //监听进度
              fileList['uploadTask' + i].onProgressUpdate(function (res) {
                if (typeof (progressFn) == 'function') {
                  progressFn(res)
                }
                if (res.progress < 99.99) {
                  uni.showLoading({
                    title: res.progress + '%'
                  });
                } else {
                  uni.hideLoading()
                }
                //console.log('上传进度' + res.progress);
                //console.log('已经上传的数据长度' + res.totalBytesSent);
                //console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
              });
            };
          } //选择成功——end
        });
      },
      goCall(){
        // console.log(this.$store.state.userInfo.phone);
        let phone = String(this.$store.state.userInfo.phone);
        uni.makePhoneCall({
            'phoneNumber': phone,
            fail(err){
              console.log(err);
            }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .cu-chat{
    height: 100vh;
	padding-bottom: var(--window-bottom);
  }
.call-img{
  width: 40rpx;
  height: 40rpx;
}
.goods-wrap{
  padding: 24rpx 32rpx;
  box-sizing: border-box;
  .goods{
    padding: 16rpx;
    box-sizing: border-box;
    height: 172rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    .img{
      width: 140rpx;
      height: 140rpx;
      border-radius: 16rpx;
      overflow: hidden;
      flex-shrink: 0;
    }
    .con{
      padding: 8rpx 0;
      box-sizing: border-box;
      width: calc(100% - 164rpx);
      height: 100%;
      .con-btn{
        width: 140rpx;
        height: 48rpx;
        background: linear-gradient(126deg, #FA2033 0%, #FF6530 100%);
        border-radius: 44rpx;
        line-height: 48rpx;
        margin-right: 10rpx;
      }
    }
  }
}
@keyframes up{
  0%{
    height: 100rpx;
    height: calc(100rpx + constant(safe-area-inset-bottom));
    height: calc(100rpx + env(safe-area-inset-bottom));
  }
  100%{
    height: 460rpx;
    height: calc(460rpx + constant(safe-area-inset-bottom));
    height: calc(460rpx + env(safe-area-inset-bottom));
  }
}
@keyframes down{
  0%{
    height: 460rpx;
    height: calc(460rpx + constant(safe-area-inset-bottom));
    height: calc(460rpx + env(safe-area-inset-bottom));
  }
  100%{
    height: 100rpx;
    height: calc(100rpx + constant(safe-area-inset-bottom));
    height: calc(100rpx + env(safe-area-inset-bottom));
  }
}
.chat-input-wrap{
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0);
    z-index: 98;
  }
  position: fixed;
  bottom: var(--window-bottom);
  bottom: calc(var(--window-bottom) + constant(safe-area-inset-bottom));
  bottom: calc(var(--window-bottom) + env(safe-area-inset-bottom));
  width: 100%;
  background: #F8F8F8;
  height: 100rpx;

  height: calc(100rpx + constant(safe-area-inset-bottom));
  height: calc(100rpx + env(safe-area-inset-bottom));
  padding-bottom: calc(0rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(0rpx + env(safe-area-inset-bottom));
  transition: all 0.3s ease;
  &.open{
    height: 460rpx;
    animation: up 0.3s ease;
    height: calc(460rpx + constant(safe-area-inset-bottom));
    height: calc(460rpx + env(safe-area-inset-bottom));
  }
  &.close{
    height: 100rpx;
    animation: down 0.3s ease;
    height: calc(100rpx + constant(safe-area-inset-bottom));
    height: calc(100rpx + env(safe-area-inset-bottom));
  }

  .chat-input{
    height: 100rpx;
    padding: 14rpx 32rpx;
    box-sizing: border-box;
    box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.06);
    position: relative;
    z-index: 99;
    .chat-left{
      width: 614rpx;
      height: 72rpx;
      background: #FFFFFF;
      border-radius: 36rpx;
      padding: 0 24rpx;
      .chat-ipt{
        width: calc(100% - 48rpx);
      }
      .emoji-img{
        width: 48rpx;
        height: 48rpx;
      }
    }
    .chat-right{
      padding-left: 24rpx;
      .add-img{
        width: 48rpx;
        height: 48rpx;
      }
    }
  }
  .chat-content{
    position: relative;
    z-index: 99;
    height: 360rpx;
    border-top: 1rpx solid rgba(0, 0, 0, 0.06);
    .chat-file{
      padding: 40rpx 48rpx 0;
      box-sizing: border-box;
      .chat-file-img{
        margin-right: 64rpx;
        .img{
          width: 116rpx;
          height: 116rpx;
          margin-bottom: 16rpx;
        }
      }
    }
    .scroll-view{
      padding: 24rpx 10rpx;
      box-sizing: border-box;
      .emoji{
        width: 12.5%;
        margin-bottom: 30rpx;
        text-align: center;
        text-indent: -8rpx;
        font-size: 48rpx;
        image{
          width: 50%;
        }
      }
      .emoji-wrap{
          position: relative;
          .emoji-btn{
            position: fixed;
            bottom:var(--window-bottom);
            bottom: calc(var(--window-bottom) + constant(safe-area-inset-bottom));
            bottom: calc(var(--window-bottom) + env(safe-area-inset-bottom));
            right: 24rpx;
            padding: 24rpx 0 48rpx 10rpx;
            background: #F8F8F8;
            .backspace{
              width:80rpx;
              height:64rpx;
              border-radius:8rpx;
              background: #ffffff;
              image{
                width:40rpx;
                height:34rpx;
              }
            }
            .send-btn{
              width:80rpx;
              height:64rpx;
              border-radius:8rpx;
              background: #f65a68;
              line-height: 64rpx;
              text-align: center;
              font-size: 24rpx;
              color:#ffffff;
              margin-left: 12rpx;
            }
          }
      }
      .emoji-wrap:after{
        content: '';
        flex: auto;
      }
    }
  }
}
.scroll-box{
  // height: 507px;
  padding: 24rpx;
  box-sizing: border-box;
  .scroll-content{
    .chat-time{
      padding: 32rpx 0;
    }
    .chat{
      &.myself{
        flex-direction:row-reverse;
        .chat-con{
          .chat-goods,.chat-img{
            margin-right:16rpx;
          }

          .chat-msg{
            margin-right:34rpx;
            background: #f65a68;
            color:#ffffff;
            &::before{
              content:'';
              position: absolute;
              right: -18rpx;
              top: 24rpx;
              width: 0;
              height: 0;
              border-top: 14rpx solid transparent;
              border-left: 18rpx solid #f65a68;
              border-bottom: 14rpx solid transparent;
            }
          }
        }

      }
      &.others{
        // flex-direction:row-reverse;
        .chat-con{
          .chat-goods,.chat-img{
            margin-left:16rpx;
          }
          .chat-msg{
            margin-left:34rpx;
            &::before{
              content:'';
              position: absolute;
              left: -18rpx;
              top: 24rpx;
              width: 0;
              height: 0;
              border-top: 14rpx solid transparent;
              border-right: 18rpx solid #ffffff;
              border-bottom: 14rpx solid transparent;
            }
          }
        }

      }
      .header{
        width: 72rpx;
        height: 72rpx;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        // margin-right: 16rpx;
        image{
          width: 100%;
          height: 100%;
        }
      }
      .chat-con{

        margin-bottom: 48rpx;
        .chat-goods{
          width: 346rpx;
          background: #FFFFFF;
          border-radius: 16rpx;
          overflow: hidden;
          .goods-img{
            width: 346rpx;
            height: 346rpx;
          }
          .chat-goods-con{
            padding: 16rpx 16rpx 24rpx;
            box-sizing: border-box;
            .goods-money{
              margin: 8rpx 0 16rpx;
            }
          }
        }
        .chat-img{
          width: 346rpx;
          border-radius: 16rpx;
          overflow: hidden;
          background: #f1f2f3;
        }
        .chat-msg{
          padding: 12rpx 32rpx;
          background: #FFFFFF;
          border-radius: 16rpx;
          min-height:72rpx;
          max-width:496rpx;
          position:relative;
          line-height: 48rpx;
          // letter-spacing:6rpx;
          // float:right;
        }
      }
    }
  }
}

</style>
