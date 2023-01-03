import Vue from 'vue';
import { Router } from '@/common/utils/index.js';
import { needLoginPages, STATIC_URL } from '@/common/config.js';
const router = new Router({ needLoginPages });
Vue.mixin({
  data () { return { STATIC_URL: STATIC_URL } },
  computed: {
    colorTheme () {
      return this.$store.state.themeColor + '!important';
    },
    colorBgTheme () {
      return this.$store.state.themeBgColor + '!important';
    },
    radioColor () {
      return this.$store.state.themeColor;
    },
    i18n () {
      return this.$t('defVal');
    },
    _top () {
      let h = uni.upx2px(110);
      let _h = h + this.StatusBar + 'px';
      console.log(_h)
      return _h;
    }
  },
  methods: {
    toJSON () { },
    // diy点击事件处理函数
    handleEven (e, params) {
      let dataset = e.currentTarget && e.currentTarget.dataset;
      let type, data;
      if (dataset) {
        type = dataset.event_type
        data = dataset.event_params
      } else {
        type = e
        data = params
      }
      console.log('点击事件触发', dataset, type, data);
      this.$util.handleAllFn(type, data);
    },
    // 设置自定义头部
    setNavigationBarTitle (title) {
      uni.setNavigationBarTitle({
        title: title
      })
    },
    // 点击复制
    copyText (data) {
      uni.setClipboardData({
        data: data,
        success: () => {
          this.$message.success('复制成功')
        }
      });
    },
    // 点击打电话
    callMobile (phoneNumber) {
      this.$util.showModal({
        title: '拨打电话给', content: phoneNumber + '', confirmText: '拨打', success: res => {
          if (res.confirm) {
            uni.makePhoneCall({
              phoneNumber: phoneNumber,

            });
          }
        },
      })
    },
    // 判断是否多值是否成立
    in_array (type, str) {
      let arr = []
      // str 是否为字符串
      if (typeof str === 'string') arr = str.split(',')
      // str 是否为数组
      if (typeof str === 'object') arr = str
      let index = -1
      index = arr.findIndex(item => type == item)
      console.log('index-------------', index);
      if (index == -1) {
        return false
      }
      return true
    },
    // 设置自定义底部
    setTabBarItem () {
      uni.setTabBarItem({
        index: 0,
        text: global.i18n['首页'],
      })
      uni.setTabBarItem({
        index: 1,
        text: global.i18n['分类'],
      })
      uni.setTabBarItem({
        index: 2,
        text: global.i18n['购物车'],
      })
      uni.setTabBarItem({
        index: 3,
        text: global.i18n['我的'],
      })
    },
    // 页面跳转
    handleJump (e) {
      let target = e.currentTarget || e.target,
        url = target.dataset.url || 'back',
        type = target.dataset.type;
      if (url == '' || url == '#') return;
      switch (type) {
        case 'SWITCH':
          router.switchTab(url);
          break;
        case 'REDIRECT':
          router.redirectTo(url);
          break;
        case 'RELAUNCH':
          router.reLaunch(url);
          break;
        case 'BACK':
          router.navigateBack();
          break;
        default:
          router.navigateTo(url);
          break;
      }
    },
    // Diy页面跳转
    handleJumpDiy (e) {
      let target = e.currentTarget || e.target,
        url = target.dataset.url || 'back',
        type = target.dataset.type;
      if (url == '' || url == '#') return;
      switch (type) {
        case 'switchTab':
          router.switchTab(url);
          break;
        case 'redirectTo':
          router.redirectTo(url);
          break;
        case 'reLaunch':
          router.reLaunch(url);
          break;
        case 'navigateTo':
          router.navigateTo(url);
          break;
        case 'back':
          router.navigateBack(+url);
          break;
        default:
          router.navigateTo(url);
          break;
      }
    },
    mixinToPlayVideo (src) {
      let parm = encodeURIComponent(src)
      router.redirectTo(`/pages/benben-built-in/playVideo/playVideo?src=${parm}`)
    },
    singleImagePreview (url) {
      uni.previewImage({
          current: url,
          urls:[url]
      });
    },
    multiImagePreview(url, images, field) {
      let arr = []
      if (field) {
        images.map((item) => {
          arr.push(item[field])
        })
      } else {
        arr = images
      }
      uni.previewImage({
        current: url,
        urls: arr
      });
    }
  }
})
