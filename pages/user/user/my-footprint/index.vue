<template>
  <view class="page">
    <!-- topbar start -->
    <view class="cu-custom bg-white  solid-bottom" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
      <view class="cu-bar bg-white fixed" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
        <view class="action" @click="back"><text class="cuIcon-back fu-fs36"></text></view>
        <!-- #ifdef H5 -->
        <view class="fu-fs32 text-333">{{i18n['我的足迹']}}</view>
        <!-- #endif -->
        <!-- #ifndef H5 -->
        <view class="fu-fs32">{{i18n['我的足迹']}}</view>
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <view v-if="len > 0" class="action text-lg" @click="showSelect">{{ edit }}</view>
        <view v-else class="action"></view>
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <view></view>
        <!-- #endif -->
      </view>
    </view>
    <!-- topbar end -->
  <!-- #ifdef MP-WEIXIN -->
  <view class="sticky-bar" :style="{top: CustomBar+'px'}">
    <view v-if="len > 0" class="action" @click="showSelect">{{ edit }}</view>
    <view v-else class="action"></view>
  </view>
  <!-- #endif -->
    <!-- 收藏数据 start-->
    <view class="content">
      <!-- 日历 start -->
      <view class="calendar-wrap bg-white">
        <view class="calendar-title height-76 flex justify-center align-center" v-if="isOpen">
          <view class="calendar-title-prev text-333" @click="prevMonth"><text class="cuIcon-playfill"></text></view>
          <view class="calendar-title-data text-333">{{ currentDate[0] }}{{i18n['年']}}{{ currentDate[1] }}{{i18n['月']}}</view>
          <view class="calendar-title-next text-333" @click="nextMonth"><text class="cuIcon-playfill"></text></view>
        </view>
        <view class="flex justify-between align-center text-center text-333 text-df height-76">
           <view class="calendar-item">{{i18n['日']}}</view>
           <view class="calendar-item">{{i18n['一']}}</view>
           <view class="calendar-item">{{i18n['二']}}</view>
           <view class="calendar-item">{{i18n['三']}}</view>
           <view class="calendar-item">{{i18n['四']}}</view>
           <view class="calendar-item">{{i18n['五']}}</view>
           <view class="calendar-item">{{i18n['六']}}</view>
        </view>
        <view class="flex justify-between align-center flex-wrap text-center text-333 text-df calendar-content" :style="{'height':isOpen?456+'rpx':76+'rpx'}">
          <block v-if="isOpen">
            <view class="height-76 calendar-item flex justify-center align-center" v-for="(item,index) in calendar" :key="index" @click="chooseTime(item)">
              <view class="calendar-item-num round" :class="{'not':item.isNot,'active':item.active}">
                {{item.day}}
              </view>
            </view>
          </block>
          <block v-else>
            <view class="height-76 calendar-item flex justify-center align-center" v-for="(item,index) in weekData" :key="index" @click="chooseTime(item)">
              <view class="calendar-item-num round" :class="{'not':item.isNot,'active':item.active}">
                {{item.day}}
              </view>
            </view>
          </block>


        </view>
        <view class="flex justify-end align-center calendar-close">
          <view class="calendar-item flex justify-center align-center" @click="openCalendar">
            <view class="calendar-close-btn round text-center" :style="{'transform':isOpen?'rotate(-90deg)':'rotate(90deg)'}">
              <text class="cuIcon-playfill text-white"></text>
            </view>
          </view>
        </view>
      </view>
      <!-- 日历 end -->
      <!-- 数据加载状态 start -->
      <!-- <fu-loading v-if="isInit"></fu-loading>  -->
      <view class="content-wrap"  v-if="isInit">
        <!-- <image class="loading" src="./static/loading.gif"></image> -->
        <view class="loading-wapper">
          <view class="loading" >
            <view class="item loading-1"></view>
            <view class="item loading-2"></view>
            <view class="item loading-3"></view>
            <view class="item loading-4"></view>
            <view class="item loading-5"></view>
            <view class="item loading-6"></view>
            <view class="item loading-7"></view>
            <view class="item loading-8"></view>
          </view>
        </view>
        <view class="desc">loading...</view>
      </view>
      <!-- 数据加载状态 end -->
      <!-- 列表 start -->
      <block>
        <block v-for="(item, index) in listData" :key="index" v-if="!isInit">
          <view class="footprint-data bg-white text-666 flex justify-start align-center" style="padding: 0 24rpx;" @click.stop="dataChange(index)">
            <block v-if="showDel == 1">
              <!-- <text v-if="selectId[0].length != listData[index].length" class="fu-iconfont select-dot margin-right-xs text-999">&#xe867;</text> -->
			  <image v-if="selectId.length == listData[index].list.length" src="../../static/select.png" style="width: 36rpx;height: 36rpx;"></image>
			  <image v-if="selectId.length != listData[index].list.length" src="../../static/1.png" style="width: 36rpx;height: 36rpx;"></image>
              <!-- <text v-if="selectId[0].length == listData[index].length" class="fu-iconfont act select-dot  margin-right-xs">&#xe65b;</text> -->
            </block>
            <text style="color: #295B7B;padding-left: 10rpx;">{{ index }}</text>
          </view>
		  <!-- 列表 -->
          <!-- <view class="footprint-wrap grid col-3  ">
            <view class="footprint-item-wrap" v-for="(oItem, oIndex) in item" :key="oIndex" @click="navToDetail(oItem)">
              <view class="footprint-item">
                <view class="mask" v-if="showDel == 1"></view>
                <view v-if="showDel == 1" class="footprint-item-select" @click.stop="checkChange(oItem.isSelect, oItem.aid, index, oIndex)">
                  <text v-if="!oItem.isSelect" class="fu-iconfont select-dot text-999">&#xe867;</text>
                  <text v-if="oItem.isSelect" class="fu-iconfont act select-dot">&#xe65b;</text>
                </view>
                <view class="footprint-item-image">
                 <view class="image">
                   <fu-image :src="oItem.collect_img" mode="aspectFill"></fu-image>
                 </view>
                </view>
                <view class="text-cut text-sm text-title">{{ oItem.collect_title }}</view>
                <view class="text-lg footprint-item-color">
                  <text class="text-xs">￥</text>
                  <text class="text-bold">{{ oItem.market_price }}</text>
                </view>
              </view>
            </view>
          </view> -->
		  <!-- 列表 end -->
		  <!-- xin start -->
		  <view style="padding: 24rpx;" class="flex align-center flex-wrap">
		  	<view class="meiyiege bg-white flex flex-direction "  v-for="(oItem, oIndex) in item.list" :key="oIndex" @click="navToDetail(oItem)" style="width: 341rpx;padding: 16rpx;">
		  		<view style="width: 100%;height: 229rpx;position: relative;">
		  			<fu-image :src="oItem.cover_images[0]"></fu-image>
		  			<view v-if="showDel == 1" @click.stop="checkChange(oItem.isSelect, oItem.id,index, oIndex)" style="width: 36rpx;height: 36rpx;position: absolute;top: 21rpx;right: 21rpx;">
		  				<image src="../../static/select.png" v-if="oItem.isSelect" style="width: 36rpx;height: 36rpx;" mode=""></image>
		  				<image src="../../static/1.png" v-else style="width: 36rpx;height: 36rpx;" mode=""></image>
		  			</view>
		  		</view>
		  		<view style="margin-top: 16rpx;color: #36373D;" class="text-cut-2 text-df">
		  			<text class="text-df " style="color: #659BC7;" v-if="oItem.is_bao == 1">[包赔]</text>
		            {{oItem.goods_name}}
		  		</view>
		  		<view style="margin-top: 16rpx;color: #868686;" class="text-xs text-cut">区服：{{oItem.area_name}}</view>
		  		<view style="margin-top: 8rpx;color: #868686;" class="text-xs text-cut">发布时间：{{oItem.create_time}}</view>
		  		<view style="margin-top: 24rpx;color: #F55B29;" class="text-lg">
		  			¥{{oItem.price}}
		  		</view>
		  	</view>
		  </view>
		  
		  <!-- xin end -->
        </block>
      </block>
      <!-- 列表 end -->

      <!-- 编辑 start -->
      <view class="footer-wrap " v-if="len > 0" v-show="showDel == 1">
        <view class="footer flex justify-between align-center">
          <view @click.stop="dataChange()" class="flex justify-start align-center">
            <!-- <text v-if="len != num" class="fu-iconfont select-dot text-999">&#xe867;</text> -->
			<image v-if="selectId.length == allSuoyoulength" src="../../static/select.png" style="width: 36rpx;height: 36rpx;"></image>
			<image v-if="selectId.length != allSuoyoulength" src="../../static/1.png" style="width: 36rpx;height: 36rpx;"></image>
            <!-- <text v-if="len == num" class="fu-iconfont act select-dot">&#xe65b;</text> -->
            <text class="margin-left-xs">{{ selectAllFont }}</text>
          </view>
          <view><button type="mini-btn" class="btn-bg" plain="true" @click="del()"> {{i18n['删除']}}</button></view>
        </view>
      </view>
      <!-- 编辑 end -->
    </view>
    <!-- 收藏数据 end -->
    <!-- 空数据 start -->
    <fu-empty-ui emptyImage="collection" v-if="len == 0 && !isInit"></fu-empty-ui>
    <!-- 空数据 end -->
    <!-- 断网监测 start -->
    <fu-notwork></fu-notwork>
    <!-- 断网监测 end -->
  </view>
</template>

<script>
import calendar from '@/common/mixin/calendar.js';
export default {
  mixins: [calendar],
  data() {
    return {
      StatusBar: this.StatusBar, // 标题栏高度
      CustomBar: this.CustomBar, // 状态栏高度
      listData: [], //我的收藏列表
      showDel: 0, //编辑状态显示 0不显示 1 显示
      selectId: [], // 当前选中的商品
      edit: global.i18n['编辑'] , //编辑状态显示时编辑值
      isInit: false, //初始化
      selectAllFont:global.i18n['全选'], // 全选按钮显示文字
      isSelectAll: false ,// 是否全选
      isOpen:true,//是否展开日历
      weekData:[],//周日历
	  allSuoyoulength:0
    };
  },
  computed: {
    len() {
      let num = 0;
      for (let attr in this.listData) {
		  console.log('this.listData[attr].list')
		  console.log(this.listData[attr].list)
        this.listData[attr].list.forEach(val => {
          num++;
        });
      }
      return num;
    },
    num() {
      let number = 0;
      // for (let attr in this.selectId) {
        this.selectId.forEach(val => {
          number++;
        });
      // }
      return number;
    },
  },
  watch:{
    //当收起日历时，显示选中日期的周日历
    isOpen(newVal,oldVal){
      if(!newVal){
        this.currentDate = this.time.split('-');
        console.log(this.currentDate)
        this.calendar = this.getCalendar(Number(this.currentDate[0]),Number(this.currentDate[1]));
        // console.log(this.calendar)
        let data = [];
        let arr = this.groupList(this.calendar,7);
        console.log(arr);
        arr.forEach((val,i)=>{
          if(val.find(item=>item.formData == this.time)){
            data = val;
            return ;
          }
        })
        this.weekData = data;
      }
    }
  },
  methods: {
    /**
     * @description 返回上一页
     */
    back() {
      uni.navigateBack();
    },

    /**
     * @description 编辑事件
     */
    showSelect() {
		console.log('1')
      this.showDel = this.showDel == 1 ? 0 : 1;
      this.edit = this.showDel == 1 ? this.i18n['完成'] : this.i18n['编辑'];
    },
    /**
     * @description 选中事件
     * @param {Object} isSelect 事件源选中与否
     * @param {Object} id 事件源id
     * @param {Object} index 事件源下标
     */
    checkChange(isSelect, id, index, oIndex) {
      // 判断是否被选中  未选中id加入选中数组  已选中id从数组中删除选中
      if (!isSelect) {
          this.selectId.push(id);
      } else {
        let i = this.selectId.findIndex(item => item == id);
        this.selectId.splice(i, 1);
      }
      // 判断数据是否已经全部选中  数据已经全部选中 全部选中按钮变色 同时改为取消全选

      if (this.len == this.num) {
        this.selectAllFont = this.i18n['取消全选'];
        this.isSelectAll = true;
      } else {
        this.selectAllFont = this.i18n['全选'];
        this.isSelectAll = false;
      }

      // 改变数据选中状态
      this.listData[index].list[oIndex].isSelect = !isSelect;
    },
    /**
     * @description 点击去详情事件
     * @param {Object} item 入参 事件源的信息
     */
    navToDetail(item) {
      // 在编辑装填不能跳转
      if (this.showDel == 1) return;
      // 跳转商品详情
      this.$urouter.navigateTo({
        url: '/pages/goods/goodsdetail/goods-detail/index',
        params: {
          goods_id: item.goods_id, //商品id
          sku_id: item.sku_id //商品规格sku_id
        }
      });
    },
    /**
     * @description 取消编辑事件
     */
    cancle() {
      this.showDel = 0;
    },
    /**
     * @description 获取足迹数据
     * @param {Boolen} isPull 是否刷新
     * @param {Number} type 1不带搜索  2带时间搜索 3 带时间段搜索 type == 2 time type ==3 start_time  end_time
     */
    getData(isInit,isPull) {
      if (isInit) {
        this.isInit = true;
      }
      this.$api
        .post(global.apiUrls.postFootprint, { type: 2,start_time:this.time,end_time:'' })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
			  
            let list = res.data.data;
            let obj = [];
			let allSuoyoulength = 0;
            for (let attr in list) {
				// console.log(list[attr].list);
				// obj.
              
              list[attr].list.forEach(val => {
                val.isSelect = false;
				// obj[0].push(val);
				allSuoyoulength = allSuoyoulength += 1;
              });  
            }
			this.allSuoyoulength = allSuoyoulength;
			// obj[0] = list;
            this.selectId = obj;
            this.listData = list;
          } else {
            this.$message.info(res.data.msg);
          }
          if (isInit) {
            this.isInit = false;
          }
          if (isPull) {
            uni.stopPullDownRefresh();
          }
        })
        .catch(err => {
          console.log(err);
          if (isInit) {
            this.isInit = false;
          }
          if (isPull) {
            uni.stopPullDownRefresh();
          }
        });
    },
    /**
     * @description 删除事件
     */
    del() {
      var that = this;
      // 无选中时不能删除
      console.log(this.num);
      if (this.num == 0) {
        this.$message.info(this.i18n['请选择要删除的商品']);
        return;
      }
      // let arr = [];
      // for (let attr in this.selectId) {
      //   this.selectId[attr].forEach(val => {
      //     arr.push(val);
      //   });
      // }
      // console.log(arr);
      // return;
      // 根据选中id调用接口删除收藏
      this.$api
        .post(global.apiUrls.PostUserAddonsCancelCollection, {
          id: this.selectId.join(','),
          type: 1
        })
        .then(res => {
          var res = res.data;
          if (res.code == 1) {
            // 删除成功提示
           this.$message.info(this.i18n['删除成功']);
            // this.num = 0
            this.getData();
            // 删除后状态回归
            this.isSelectAll = false;
            this.selectId = {};
            this.showDel = 0;//编辑状态显示 0不显示 1 显示
            this.edit = this.i18n['编辑']; //编辑状态显示时编辑值
            this.selectAllFont = this.i18n['全选']; // 全选按钮显示文字
            // 删除成功刷新数据
          } else {
            // 删除失败提示
            this.$message.info(res.msg);
          }
        });
    },
    /**
     * @description 同意日期下全选  全不选
     */
    dataChange(index) {
      let len = 0;
	  let list = [];
	  let num = this.selectId.length;
	  let select = this.selectId;
	  for (let attr in this.listData) {
		  list = this.listData[attr].list;
	    this.listData[attr].list.forEach(val => {
	      // val.isSelect = false;
	  	// obj[0].push(val);
			len = len += 1;
	    });  
	  }
      
      
      // 已全部选中
      if (len == num) {
        select = [];
        // list.forEach(val => {
        //   val.isSelect = false;
        // });
		for (let attrs in this.listData) {
				  // list = this.listData[attr].list;
		  this.listData[attrs].list.forEach(val => {
		    val.isSelect = false;
			// obj[0].push(val);
					// len = len += 1;
		  });  
		}
      } else {
        select = [];
        // this.listData[index].list.forEach(val => {
        //   val.isSelect = true;
        //   select.push(val.id);
        // });
		
		for (let attrss in this.listData) {
				  // list = this.listData[attr].list;
		  this.listData[attrss].list.forEach(val => {
		    val.isSelect = true;
			  select.push(val.id);
			// obj[0].push(val);
					// len = len += 1;
		  });  
		}
      }
	  this.selectId = select;
      // this.$set(this.selectId, 0, select);
      // this.$set(this.listData[index], , list);
      // 判断数据是否已经全部选中  数据已经全部选中 全部选中按钮变色 同时改为取消全选

      if (this.len == this.num) {
        this.selectAllFont = this.i18n['取消全选'];
        this.isSelectAll = true;
      } else {
        this.selectAllFont = this.i18n['全选'];
        this.isSelectAll = false;
      }
    },
    /**
     * @description 全选 全不选事件
     */
    selectAll() {
      // 判断是否全选  若已全选则清空已选中id  反正全部选中
      if (!this.isSelectAll) {
        // this.selectId = {};
        this.selectAllFont = this.i18n['取消全选'];
        for (let attr in this.listData) {
          this.selectId[attr] = [];
          this.listData[attr].forEach(val => {
            val.isSelect = true;
            this.selectId[attr].push(val.aid);
          });
        }
        this.isSelectAll = true;
      } else {
        // this.selectId = {};
        this.selectAllFont = this.i18n['全选'];
        for (let attr in this.listData) {
          this.selectId[attr] = [];
          this.listData[attr].forEach(val => {
            val.isSelect = false;
          });
        }
        this.isSelectAll = false;
      }
    },
    /**
     * @description 处理日历的钩子
     * @param {Object} arr 入参  日历数组
     */
    handleCalendarFn(arr){
      // 日历暂开时，显示全部日历 日历收起时 显示已经选择的日期  默认当前日期
      arr.forEach(val=>{
        if(val.formData == this.time){
          val.active = true;
        }
      })
      return arr;
    },
    /**
     * @description 打开收起日历
     */
    openCalendar(){
      this.isOpen = !this.isOpen;
    },
    /**
     * @description 选中日期
     * @param {Object} item 入参  日历单个对象
     */
    chooseTime(item){
      // 大于当前时间不能点击
      if(new Date(item.formData).getTime() > new Date().getTime()){
        return;
      }
      if(item.isNot){
        return;
      }
      this.time = item.formData;
      this.calendar.forEach(val=>{
        val.active = false;
        if(val.day == item.day && !val.isNot){
          val.active = true;
        }
      })
      this.weekData.forEach(val=>{
        val.active = false;
        if(val.day == item.day && !val.isNot){
          val.active = true;
        }
      })
      this.getData(false,false);
    },
    /**
     * @description 分割数组方法
     * @param {Object} array 要分割的数组
     * @param {Object} subGroupLength  截取数组的长度
     */
    groupList(array, subGroupLength) {
        let index = 0;
        let newArray = [];
        while(index < array.length) {
            newArray.push(array.slice(index, index += subGroupLength));
    }
       return newArray;
    }
  },
  onLoad() {
    // 获取足迹数据
    this.getData(true,false);
    // 默认应该为false  为了触发监听
    this.isOpen = false;
  },
  onUnload() {
  },
  onShow() {},
  onReachBottom() {},
  onPullDownRefresh() {
     this.selectId = {};
    // this.num = 0;
    this.showDel = 0;//编辑状态显示 0不显示 1 显示
    this.edit = this.i18n['编辑']; //编辑状态显示时编辑值
    this.selectAllFont = this.i18n['全选']; // 全选按钮显示文字
    this.isSelectAll = false; // 是否全选
    this.getData(true);
    this.getData(false,true);
  }
};
</script>

<style lang="scss" scoped>
.page {
  padding-bottom: 100rpx;
  padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
  background: #FAFAFC;
  min-height: 100vh;
}

.meiyiege {
	margin-right: 20rpx;
	margin-bottom: 20rpx;
	box-sizing: border-box;
}

.meiyiege:nth-child(2n) {
	margin-right: 0!important;
}

.text-cut-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.text-through {
  text-decoration: line-through;
}
.text-333 {
  color: #333333;
}
.text-999 {
  color: #999999;
}
// 主体 start
.content {
  // padding: 0 24upx;
  position: relative;
  z-index: 1;
  .notData {
    padding-top: 200upx;
  }
  .check {
    display: inline-block;
    width: 60upx;
    height: 220upx;
    padding-top: 80upx;
    text {
      display: inline-block;
      vertical-align: top;
      font-size: 40upx;
      margin-right: 10upx;
      color: #999;
      &.act {
        color: $fu-main-color;
      }
    }
  }
  // 列表 start
  .act {
    color: #ff6464;
  }
  // 列表 end
  // 选中样式 start
  .item-active {
    label {
      line-height: 160upx;
      padding-top: 30upx;
    }
    .article {
      width: 370upx;
    }
  }
  // 选中样式 end
  // 按钮 start
  .btn-box {
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
    height: 100upx;
    padding: 30upx 40upx 0;
    z-index: 100;
    button {
      border: 1px solid #999;
      color: #666;
      width: auto;
      padding: 0 40upx;
      font-size: 28upx;
      border-radius: 40upx;
      float: right;
      margin-right: 20upx;
      height: auto;
      line-height: 1.9;
    }
  }
  // 按钮 end
  .edit {
    text-align: right;
    padding: 20upx 20upx;
    font-size: 28upx;
    .select-tip {
      float: left;
    }
  }
}
// 主体 end

// 选中radio样式 start
.select-dot {
  font-size: 36rpx !important;
}
// 选中radio样式 end
// 足迹列表 start
.footprint-data {
  height: 60rpx;
  .act {
    color: #ff6464;
  }
}
.footprint-wrap {
  .footprint-item-wrap {
    padding: 0 6rpx 20rpx;
    box-sizing: border-box;
  }
  .footprint-item {
    position: relative;
    .mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      // background: rgba(0, 0, 0, 0.2);
      z-index: 11;
    }
    .footprint-item-select {
      position: absolute;
      top: 20rpx;
      right: 20rpx;
      width: 36rpx;
      height: 36rpx;
      line-height: 36rpx;
      border-radius: 50%;
      text-align: right;
      color: #ffffff;
      background: #ffffff;
      z-index: 12;
      .act {
        color: #ff6464;
      }
    }

    .footprint-item-image {
      width: 100%;
      padding-bottom: 100%;
      position: relative;
      overflow: hidden;
      .image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .text-title {
      width: 100%;
      margin: 20rpx 0 8rpx;
    }
    .footprint-item-color {
      color: #fa2033;
      margin-bottom: 26rpx;
    }
  }
}

// 足迹列表 end

// 足迹编辑 start
.footer-wrap {
  width: 750rpx;
  // height: 100rpx;
  background: #ffffff;
  opacity: 1;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .footer {
    height: 100rpx;
    padding: 0rpx 24rpx;
    box-sizing: border-box;
  }
  &::after {
    content: '';
    width: 100%;
    height: 1px;
    background: #eeeeee;
    position: absolute;
    left: 0;
    top: 0;
    transform: scaleY(0.5);
  }
  .btn-bg {
    border: none;
    width: 200rpx;
    height: 72rpx;
    line-height: 72rpx;
    background: linear-gradient(126deg, #fa2033 0%, #ff6530 100%);
    opacity: 1;
    border-radius: 0;
    color: #ffffff;
    font-size: 28rpx;
  }
}
// 足迹编辑 end
// 日历 start
.calendar-wrap {
  .height-76 {
    height: 76rpx;
  }
  .calendar-title-prev {
    padding: 0 24rpx;
    transform: rotate(-180deg);
    box-sizing: border-box;
  }
  .calendar-title-next {
    padding: 0 24rpx;
    box-sizing: border-box;
  }
  .calendar-content{
    height: 76rpx;
    transition: all .3s ease;
    overflow: hidden;

  }
  .calendar-item{
    width: calc(100% / 7);
    .calendar-item-num{
      width: 48rpx;
      height: 48rpx;
      line-height: 46rpx;
      &.not{
        color: #BFBFBF;
      }
      &.active{
        // border: 1px solid #5997FC;
        background: #659BC7;
		color: #fff;
      }
    }
  }
  .calendar-close{
    height: 48rpx;
    position: relative;
    &::after{
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 1rpx;
      background: #EEEEEE;
      transform: scaleY(0.5);

    }
    .calendar-close-btn{
      width: 48rpx;
      height: 48rpx;
      line-height: 48rpx;
      background: #659BC7;
      // transform: rotate(90deg);
      position: relative;
      z-index: 1;

    }
  }
}
// 日历 end
// loadding start
.content-wrap{
        margin:0 auto;
        width:100%;
        // position:relative;
        border:1rpx solid #FBFBFB;
        text-align: center;
       .loading{
         margin-top:30rpx;
       }
       .content{
           margin:0 auto;
           width:100%;
           position:relative;
           border:1rpx solid #FBFBFB;
           height:300rpx;
           margin-top:30%;
          .desc{
            height:70rpx;
            line-height: 70rpx;
            width:100%;
            padding-left:13rpx;
            // margin-top:146rpx;
            text-align: center;
          }
       }

    }
    .loading-wapper {
      width: auto;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 40upx;
      // padding-bottom: 40rpx;
    }

    .loading {
      position: relative;
      top: 0px;
      height: 100rpx;
    }
    .loading .item {
      width: 18rpx;
      height: 18rpx;
      border-radius: 50%;
      background-color: #333;
      position: absolute;
    }

    .loading-1 {
      top: 50rpx;
      left: 0;
      -webkit-animation: loading-3 1s ease 0s infinite;
    }

    .loading-2 {
      top: 34rpx;
      left: 34rpx;
      -webkit-animation: loading-3 1s ease -0.12s infinite;
    }

    .loading-3 {
      top: 0px;
      left: 50rpx;
      -webkit-animation: loading-3 1s ease -0.24s infinite;
    }

    .loading-4 {
      top: -34rpx;
      left: 34rpx;
      -webkit-animation: loading-3 1s ease -0.36s infinite;
    }

    .loading-5 {
      top: -50rpx;
      left: 0;
      -webkit-animation: loading-3 1s ease -0.48s infinite;
    }

    .loading-6 {
      top: -34rpx;
      left: -34rpx;
      -webkit-animation: loading-3 1s ease -0.6s infinite;
    }

    .loading-7 {
      top: 0px;
      left: -50rpx;
      -webkit-animation: loading-3 1s ease -0.72s infinite;
    }

    .loading-8 {
      top: 34rpx;
      left: -34rpx;
      -webkit-animation: loading-3 1s ease -0.84s infinite;
    }

    @-webkit-keyframes loading-3 {
      50% {
        transform: scale(0.4);
        opacity: 0.3;
      }

      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
// loadding end

.sticky-bar{
  position: sticky;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 32rpx;
  background-color: #F8F8F8;
  z-index: 99;
}
.solid-bottom::after{
  z-index:9999;
}
</style>
