<template>
  <view class="page">
    <!-- topbar start -->
    <view class="cu-custom bg-white solid-bottom" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
      <view class="cu-bar bg-white fixed" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
        <view class="action" @click="back"><text class="cuIcon-back fu-fs36"></text></view>
        <view class="fu-fs32">{{i18n['我的收藏']}}</view>
        <!-- #ifndef MP-WEIXIN -->
        <view v-if="listData.length > 0" class="action text-lg" @click="showSelect">{{ edit }}</view>
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
      <view v-if="listData.length > 0" class="action text-lg" @click="showSelect">{{ edit }}</view>
      <view v-else class="action"></view>
    </view>
    <!-- #endif -->
    <!-- 收藏数据 start-->
    <view class="">
      <!-- 列表 start -->
      <block>
		  <!-- 旧 数据 start -->
        <!-- <view class="item" :class="showDel == 1 ? 'item-active' : ''" v-for="(item, index) in listData" :key="index">
          <view class="check" v-if="showDel == 1" @click.stop="checkChange(item.isSelect, item.aid, index)">
            <text v-if="!item.isSelect" class="fu-iconfont select-dot text-999">&#xe867;</text>
            <text v-if="item.isSelect" class="fu-iconfont act select-dot">&#xe65b;</text>
          </view>
          <view class="goods-img radius overHidden" @click.stop="navToDetail(item)">
            <fu-image mode="aspectFill" :src="item.collect_img" ></fu-image>
          </view>
          <view class="article" @click.stop="navToDetail(item)">
            <view class="text-df text-cut-2 margin-bottom-sm height-80">{{ item.collect_title }}</view>
            <view class="text-999 text-sm  margin-bottom-sm">{{item.collect_num}}{{i18n['收藏']}}</view>
            <view class="price flex justify-between align-center">
              <view class="text-lg ">
                <text class="text-bold price-color text-999 text-price">{{ item.shop_price |  formatNumber }}</text>
                <text class="text-through text-price text-sm  margin-left-sm text-999">{{ item.market_price }}</text>
              </view>
              <view class="text-sm text-999">
              {{  i18n['月销']}}{{item.sales_sum}}{{i18n['件']}}
              </view>
            </view>
          </view>
        </view> -->
		<!-- 旧 数据 end -->
		<!-- 新数据 start -->
		<view style="padding: 24rpx;" class="flex align-center flex-wrap">
			<view class="meiyiege bg-white flex flex-direction " @click="gotoGoodsDetail(item)" v-for="(item,index) in listData" :key="index" style="width: 341rpx;padding: 16rpx;">
				<view style="width: 100%;height: 229rpx;position: relative;">
					<fu-image :src="item.cover_images[0]"></fu-image>
					<view v-if="showDel == 1" @click.stop="checkChange(item.isSelect, item.id, index)" style="width: 36rpx;height: 36rpx;position: absolute;top: 21rpx;right: 21rpx;">
						<image src="../../static/select.png" v-if="item.isSelect" style="width: 36rpx;height: 36rpx;" mode=""></image>
						<image src="../../static/1.png" v-else style="width: 36rpx;height: 36rpx;" mode=""></image>
					</view>
				</view>
				<view style="margin-top: 16rpx;color: #36373D;" class="text-cut-2 text-df">
					<text class="text-df " style="color: #659BC7;" v-if="item.is_bao == 1">[包赔]</text>
                  {{item.goods_name}}
				</view>
				<view style="margin-top: 16rpx;color: #868686;" class="text-xs text-cut">区服：{{item.area_name}}</view>
				<view style="margin-top: 8rpx;color: #868686;" class="text-xs text-cut">发布时间：{{item.create_time}}</view>
				<view style="margin-top: 24rpx;color: #F55B29;" class="text-lg">
					¥{{item.price}}
				</view>
			</view>
		</view>
		<!-- 新数据 end -->
      </block>
      <!-- 列表 end -->
      <!-- 编辑 start -->
      <view class="footer-wrap" v-if="listData.length > 0" v-show="showDel == 1">
        <view class="footer flex justify-between align-center">
          <view @click="selectAll" class="flex justify-start align-center">
            <!-- <text v-if="!isEqual" class="fu-iconfont select-dot text-999">&#xe867;</text> -->
            <!-- <text v-else class="fu-iconfont act select-dot">&#xe65b;</text> -->
			<image src="../../static/select.png" style="width: 36rpx;height: 36rpx;" v-if="isEqual" mode=""></image>
			<image src="../../static/1.png" style="width: 36rpx;height: 36rpx;" v-else mode=""></image>
            <text class="margin-left-xs">{{ selectAllFont }}</text>
          </view>
          <view>
            <button type="mini-btn" class="btn-bg" plain="true" @click="del()">{{i18n['删除']}}</button>
          </view>
        </view>
      </view>
      <!-- 编辑 end -->
    </view>
    <!-- 收藏数据 end -->
    <!-- 空状态 start-->
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
    <!-- 空状态 end -->
    <!-- 断网监测 start -->
    <fu-notwork></fu-notwork>
    <!-- 断网监测 end -->
  </view>
</template>

<script>
// 引入混入数据加载 js
import pagingList from '@/common/mixin/paging_list.js';
export default {
  mixins: [pagingList], //混入
  data() {
    return {
      StatusBar: this.StatusBar, // 标题栏高度
      CustomBar: this.CustomBar, // 状态栏高度
      listData: [], //我的收藏列表
      showDel: 0, //编辑状态显示 0不显示 1 显示
      selectId: [], // 当前选中的商品
      edit: global.i18n['编辑'], //编辑状态显示时编辑值
      minixPagingListsApi: global.apiUrls.GetUserAddonsGetCollectionList, //混入获取列表接口名
      allowOnloadGetList: false, //是否允许onlaod加载数据
      pageingListApiMethod: 'get', //接口类型属于get
      selectAllFont: global.i18n['全选'], // 全选按钮显示文字
      isSelectAll: false, // 是否全选
    };
  },
  computed: {
    isEqual(){
      return this.listData.length == this.selectId.length
    }
  },
  methods: {
    /**
     * @description 返回上一页
     */
    back() {
      uni.navigateBack();
    },
	gotoGoodsDetail(item) {
		this.$urouter.navigateTo('/pages/goods/goodsdetail/goods-detail/index?sku_id=0&goods_id=' + item.goods_id)
	},
    /**
     * @description 混入处理数据钩子函数
     * @param {Object} tempLists 混入传入数据
     */
    pagingListResponseData(tempLists) {
      tempLists.forEach(val => {
        val.isSelect = false;
      });
      return tempLists;
    },
    /**
     * @description 编辑事件
     */
    showSelect() {
      this.showDel = this.showDel == 1 ? 0 : 1;
      this.edit = this.showDel == 1 ? this.i18n['完成'] : this.i18n['编辑'];
    },
    /**
     * @description 选中事件
     * @param {Object} isSelect 事件源选中与否
     * @param {Object} id 事件源id
     * @param {Object} index 事件源下标
     */
    checkChange(isSelect, id, index) {
      let that = this
      // 判断是否被选中  未选中id加入选中数组  已选中id从数组中删除选中
      if (!isSelect) {
        this.selectId.push(id);
      } else {
        that.selectId.forEach(function(item,itemIndex){
          if(item == id){
            that.selectId.splice(itemIndex, 1);
          }

        })
        // this.selectId.splice(index, 1);
      }
      // 判断数据是否已经全部选中  数据已经全部选中 全部选中按钮变色 同时改为取消全选
      if (this.listData.length == this.selectId.length) {
        this.selectAllFont = this.i18n['取消全选'];
        this.isSelectAll = true;
      } else {
        this.selectAllFont = this.i18n['全选'];
        this.isSelectAll = false;
      }
      // 改变数据选中状态
      this.listData[index].isSelect = !isSelect;
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
          goods_id: item.collect_id, //商品id
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
     * @description 删除事件
     */
    del() {
      var that = this;
      // 无选中时不能删除
      if (!this.selectId || this.selectId.length == 0) {
        this.$message.info(this.i18n['请选择要删除的商品']);
        return;
      }
      // 根据选中id调用接口删除收藏
      this.$api
        .post(global.apiUrls.PostUserAddonsCancelCollectionsss, {
          id: this.selectId.join(','),
          type: 1
        })
        .then(res => {
          var res = res.data;
          if (res.code == 1) {
            // 删除成功提示
            this.$message.info(this.i18n['删除成功']);
            // 删除后状态回归
            this.isSelectAll = false;
            this.selectId = [];
            this.selectAllFont = this.i18n['全选'];
            // 删除成功刷新数据
            this.pagingListToggle();
          } else {
            // 删除失败提示
            this.$message.info(res.msg);
          }
        });
    },
    /**
     * @description 混入传参钩子函数
     * @param type 获取数据类型 type 1为收藏列表 3为浏览历史
     */
    pagingListPostData() {
      this.selectId = [];
      this.showDel = 0 ; //编辑状态显示 0不显示 1 显示
      this.selectAllFont = this.i18n['全选'];// 全选按钮显示文字
      this.isSelectAll = false;// 是否全选
      this.edit = this.i18n['编辑'];
      return {
        type: 1
      };
    },
    /**
     * @description 全选 全不选事件
     */
    selectAll() {
      // 判断是否全选  若已全选则清空已选中id  反正全部选中
      if (!this.isSelectAll) {
        this.selectId = [];
        this.selectAllFont = this.i18n['取消全选'];
        for (let i = 0; i < this.listData.length; i++) {
          this.listData[i].isSelect = true;
          this.selectId.push(this.listData[i].id);
        }
        this.isSelectAll = true;
      } else {
        this.selectId = [];
        this.selectAllFont = this.i18n['全选'];
        for (let i = 0; i < this.listData.length; i++) {
          this.listData[i].isSelect = false;
        }
        this.isSelectAll = false;
      }
    }
  },
  onLoad() {
    // 允许onload加载数据
    // this.allowOnloadGetList = true;
    // 获取数据
    // this.pagingListGetLists();
  },
  onShow() {
    this.pagingListToggle()
  },
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
.height-80{
  height: 80rpx;
  line-height: 40rpx;
}

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
.fu-fs32{
  position:absolute;
  left: 50%;
  transform:translateX(-50%);
}
// 主体 start
.content {
  padding: 0 34upx;
  .notData {
    padding-top: 200upx;
  }
  .check {
    display: inline-block;
    width: 60upx;
    height: 200rpx;
    padding-top: 80upx;
    text {
      display: inline-block;
      vertical-align: top;
      font-size: 40upx;
      margin-right: 10upx;
      color: #999;
      &.act {
        color: $theme;
      }
    }
  }
  .act {
    color: $theme;
  }
  // 列表 start
  .item {
    padding: 32rpx 0;
    border-bottom: 1upx solid #efefef;
    background: #fff;
    display: flex;
    .goods-img {
      display: inline-block;
      vertical-align: top;
      width: 200rpx;
      height: 200rpx;
      border-radius: 16rpx;
    }
    &:last-child {
      border-bottom: 0;
    }
    .article {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 28upx;
      width: 430upx;
      height: 200rpx;
      position: relative;
      vertical-align: top;
      .price{
        // margin-top: 50rpx;
        .price-color{
          color: $theme;
        }
      }
    }
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
    padding: 0upx 40upx 0 0;
    width: 100%;
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
      box-sizing: border-box;
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
// 足迹编辑 start
.footer-wrap{
  width: 750rpx;
  // height: 100rpx;
  background: #FFFFFF;
  opacity: 1;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 99;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  .footer{
    height: 100rpx;
    padding: 0rpx 24rpx;
    box-sizing: border-box;
  }
  &::after{
    content: '';
    width: 100%;
    height: 1px;
    background: #EEEEEE;
    position: absolute;
    left: 0;
    top: 0;
    transform: scaleY(0.5);
  }
  .btn-bg{
    border: none;
    width: 200rpx;
    height: 72rpx;
    line-height: 72rpx;
    background: #F02525;
    opacity: 1;
    // border-radius: 36rpx;
	border-radius: 0;
    color: #FFFFFF;
    font-size: 28rpx;
  }
}
// 足迹编辑 end
.solid-bottom::after{
  z-index: 9999;
}
</style>
