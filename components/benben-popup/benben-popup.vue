<template>
  <view
    v-if="visibleSync"
    :style="[
      customStyle,
      {
        zIndex: fuZindex - 1,
      },
    ]"
    :class="{ 'fu-drawer-visible': showDrawer }"
    class="fu-drawer"
    hover-stop-propagation
  >
    <fu-mask
      :custom-style="maskCustomStyle"
      :maskClickAble="maskCloseAble"
      :z-index="fuZindex - 2"
      :show="showDrawer && mask"
      @click="maskClick"
    ></fu-mask>
    <view
      class="fu-drawer-content"
      @tap="modeCenterClose(mode)"
      :class="[
        safeAreaInsetBottom ? 'safe-area-inset-bottom' : '',
        'fu-drawer-' + mode,
        showDrawer ? 'fu-drawer-content-visible' : '',
        zoom && mode == 'center' ? 'fu-animation-zoom' : '',
      ]"
      @touchmove.stop.prevent
      @tap.stop.prevent
      :style="[style]"
    >
      <view class="fu-mode-center-box" @tap.stop.prevent @touchmove.stop.prevent v-if="mode == 'center'" :style="[centerStyle]">
        <scroll-view class="fu-drawer-scroll-view" scroll-y="true">
          <slot />
        </scroll-view>
      </view>
      <scroll-view class="fu-drawer-scroll-view" scroll-y="true" v-else>
        <slot />
      </scroll-view>
    </view>
  </view>
</template>

<script>
/**
 * popup 弹窗
 * @description 弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出。组件只提供容器，内部内容由用户自定义
 * @property {String} mode 弹出方向（默认left）
 * @property {Boolean} mask 是否显示遮罩（默认true）
 * @property {Boolean} zoom 是否开启缩放动画，只在mode为center时有效（默认true）
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配（默认false）
 * @property {Boolean} mask-close-able 点击遮罩是否可以关闭弹出层（默认true）
 * @property {String} transition 运动轨迹 值为 css3 transition 值
 * @property {Object} custom-style 用户自定义样式
 * @property {Stringr | Number} negative-top 中部弹出时，往上偏移的值
 * @property {Numberr | String} border-radius 弹窗圆角值（默认0）
 * @property {Numberr | String} z-index 弹出内容的z-index值（默认1075）
 * @event {Function} open 弹出层打开
 * @event {Function} close 弹出层收起
 * @example <benben-popup v-model="show"><view>Fast-UI真是太好用了</view></benben-popup>
 */
export default {
  name: 'benben-popup',
  props: {
    // 显示状态
    show: {
      type: Boolean,
      default: false,
    },

    // 弹出方向，left|right|top|bottom|center
    mode: {
      type: String,
      default: 'left',
    },

    // 是否显示遮罩
    mask: {
      type: Boolean,
      default: true,
    },

    // 是否开启缩放动画，只在mode=center时有效
    zoom: {
      type: Boolean,
      default: true,
    },

    // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
    safeAreaInsetBottom: {
      type: Boolean,
      default: false,
    },

    // 是否可以通过点击遮罩进行关闭
    maskCloseAble: {
      type: Boolean,
      default: true,
    },

    // 用户自定义样式
    customStyle: {
      type: Object,
      default() {
        return {}
      },
    },

    value: {
      type: Boolean,
      default: false,
    },

    // 此为内部参数，不在文档对外使用，为了解决Picker和keyboard等融合了弹窗的组件
    // 对v-model双向绑定多层调用造成报错不能修改props值的问题
    popup: {
      type: Boolean,
      default: true,
    },

    // 显示显示弹窗的圆角，单位rpx
    borderRadius: {
      type: [Number, String],
      default: 0,
    },

    zIndex: {
      type: [Number, String],
      default: '',
    },

    // 宽度，只对左，右，中部弹出时起作用，单位rpx，或者"auto" 或者百分比"50%"，表示由内容撑开高度或者宽度
    width: {
      type: String,
      default: '',
    },

    // 高度，只对上，下，中部弹出时起作用，单位rpx，或者"auto" 或者百分比"50%"，表示由内容撑开高度或者宽度
    height: {
      type: String,
      default: '',
    },

    // 运动轨迹 值为 'all ease .3s'
    transition: {
      type: String,
      default: 'all 0.2s ease',
    },

    // 给一个负的margin-top，往上偏移，避免和键盘重合的情况，仅在mode=center时有效
    negativeTop: {
      type: [String, Number],
      default: 0,
    },

    // 遮罩的样式，一般用于修改遮罩的透明度
    maskCustomStyle: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      visibleSync: false,
      showDrawer: false,
      timer: null,
      closeFromInner: false, // value的值改变，是发生在内部还是外部
    }
  },
  computed: {
    // 根据mode的位置，设定其弹窗的宽度(mode = left|right)，或者高度(mode = top|bottom)
    style() {
      let style = {}
      // 如果是左边或者上边弹出时，需要给translate设置为负值，用于隐藏
      if (this.mode == 'left' || this.mode == 'right') {
        style = {
          transition: this.transition,
          width: this.getUnitValue(this.width),
          height: '100%',
          transform: `translate3D(${this.mode == 'left' ? '-100%' : '100%'},0px,0px)`,
        }
      } else if (this.mode == 'top' || this.mode == 'bottom') {
        style = {
          width: '100%',
          transition: this.transition,
          height: this.getUnitValue(this.height),
          transform: `translate3D(0px,${this.mode == 'top' ? '-100%' : '100%'},0px)`,
        }
      }
      style.zIndex = this.fuZindex
      // 如果用户设置了borderRadius值，添加弹窗的圆角
      if (this.borderRadius) {
        switch (this.mode) {
          case 'left':
            style.borderRadius = `0 ${this.borderRadius}rpx ${this.borderRadius}rpx 0`
            break
          case 'top':
            style.borderRadius = `0 0 ${this.borderRadius}rpx ${this.borderRadius}rpx`
            break
          case 'right':
            style.borderRadius = `${this.borderRadius}rpx 0 0 ${this.borderRadius}rpx`
            break
          case 'bottom':
            style.borderRadius = `${this.borderRadius}rpx ${this.borderRadius}rpx 0 0`
            break
          default:
        }
        // 不加可能圆角无效
        style.overflow = 'hidden'
      }
      return style
    },

    // 中部弹窗的特有样式
    centerStyle() {
      let style = {}
      style.width = this.getUnitValue(this.width)
      // 中部弹出的模式，如果没有设置高度，就用auto值，由内容撑开高度
      style.height = this.height ? this.getUnitValue(this.height) : 'auto'
      style.zIndex = this.fuZindex
      style.marginTop = `-${this.negativeTop}`
      if (this.borderRadius) {
        style.borderRadius = `${this.borderRadius}rpx`
        style.overflow = 'hidden'
      }
      return style
    },

    // 计算整理后的z-index值
    fuZindex() {
      return this.zIndex ? this.zIndex : 10000
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.open()
      } else if (!this.closeFromInner) {
        this.close()
      }
      this.closeFromInner = false
    },
  },
  mounted() {
    // 组件渲染完成时，检查value是否为true，如果是，弹出popup
    this.value && this.open()
  },

  methods: {
    // 判断传入的值，是否带有单位，如果没有，就默认用rpx单位
    getUnitValue(val) {
      if (/(%|px|rpx|auto)$/.test(val)) return val
      else return val + 'rpx'
    },

    // 遮罩被点击
    maskClick() {
      console.log('点击了关闭遮罩层')
      this.close()
    },

    close() {
      // 标记关闭是内部发生的，否则修改了value值，导致watch中对value检测，导致再执行一遍close
      // 造成@close事件触发两次
      this.closeFromInner = true
      this.change('showDrawer', 'visibleSync', false)
    },
    // 中部弹出时，需要.fu-drawer-content将居中内容，此元素会铺满屏幕，点击需要关闭弹窗
    // 让其只在mode=center时起作用
    modeCenterClose(mode) {
      if (mode != 'center' || !this.maskCloseAble) return
      this.close()
    },

    open() {
      this.change('visibleSync', 'showDrawer', true)
    },

    // 此处的原理是，关闭时先通过动画隐藏弹窗和遮罩，再移除整个组件
    // 打开时，先渲染组件，延时一定时间再让遮罩和弹窗的动画起作用
    change(param1, param2, status) {
      // 如果this.popup为false，意味着为picker，actionsheet等组件调用了popup组件
      if (this.popup == true) {
        this.$emit('input', status)
      }
      this[param1] = status
      if (status) {
        // #ifdef H5 || MP
        this.timer = setTimeout(() => {
          this[param2] = status
          this.$emit(status ? 'open' : 'close')
        }, 50)
        // #endif
        // #ifndef H5 || MP
        this.$nextTick(() => {
          this[param2] = status
          this.$emit(status ? 'open' : 'close')
        })
        // #endif
      } else {
        this.timer = setTimeout(() => {
          this[param2] = status
          this.$emit(status ? 'open' : 'close')
        }, 300)
      }
    },
  },
}
</script>
<style scoped lang="scss">
.#{$fu-prefix} {
  &-drawer {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  &-drawer-content {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    position: absolute;
    z-index: 1003;
    transition: all 0.2s ease;
  }

  &-drawer-scroll-view {
    width: 100%;
    height: 100%;
  }

  &-drawer-left {
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
  }

  &-drawer-right {
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #ffffff;
  }

  &-drawer-top {
    top: 0;
    left: 0;
    right: 0;
    // background-color: #ffffff;
  }

  &-drawer-bottom {
    bottom: 0;
    left: 0;
    right: 0;
    // background-color: #ffffff;
  }

  &-drawer-center {
    /* #ifndef APP-NVUE */
    display: flex;
    flex-direction: column;
    /* #endif */
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    opacity: 0;
    z-index: 99;
  }

  &-mode-center-box {
    min-width: 100rpx;
    min-height: 100rpx;
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    position: relative;
  }

  &-drawer-content-visible.#{$fu-prefix}-drawer-center {
    transform: scale(1);
    opacity: 1;
  }

  &-animation-zoom {
    transform: scale(1.5);
  }

  &-drawer-content-visible {
    transform: translate3D(0px, 0px, 0px) !important;
  }
}
</style>
