<template>
  <view class="pages promoters">
    <view class="content_height">
      <fu-navbar :isBack="true" title="推广人统计" :bgColor="colorTheme" color="#ffffff"></fu-navbar>
       <view class="header-wrap">
         <view class="header-bg"></view>
         <view class="header-info">
           <view class="header-money">{{dataContent.total_push || 0}}</view>
           <view class="header-title">{{i18n['推广人总数']}}</view>
         </view>
       </view>
       <view class="item-wrap">
         <view class="item-content flex justify-around align-center">
           <view class="item">
             <view class="item-num text-333">{{dataContent.first_push || 0}}</view>
             <view class="item-title text-666">{{i18n['直推人数']}}</view>
           </view>
           <view class="item-line"></view>
           <view class="item">
             <view class="item-num text-333">{{dataContent.second_push || 0}}</view>
             <view class="item-title text-666">{{i18n['间推人数']}}</view>
           </view>
         </view>
       </view>
       <view class="search-form round">
         <text class="cuIcon-search"></text>
         <input confirm-type="search" type="text" v-model="keyword"  :adjust-position="false"
            :placeholder="i18n['搜索关键字']"  @confirm="onRefresh" @blur="onRefresh"></input>
         <text v-if="keyword.length != 0" class="cuIcon-close text-gray padding-right-xs" @tap="clear"></text>
       </view>
     </view>
    <view class="list-wrap" >
      <fu-scroll :scrollHeight="scrollHeight"  @onRefresh="onRefresh" @onBottom="onBottom" ref="refresh" :isLoad="isLoad" :isData="isData">
      <!-- <scroll-view scroll-y="true" > -->
        <!-- 标题 -->
        <view class="list-item title flex justify-between align-center"  >
          <view  :class="[{'margin_top': curFilter }]"  class="list-item-time text-333">{{i18n['姓名']}}</view>
          <view  :class="[{'margin_top': curFilter }]" class="text-center list-item-time  text-333">{{i18n['人员类别']}}</view>
          <view   class="row-reverse text-right list-item-time text-333 flex">
            <view  class="flex flex-direction text-right align-center justify-center sorting"  @click="filterClick"  :class="[{'active': curFilter }]">
              <view  v-if="!curFilter  || (order == 'asc')" class="scale top cuIcon-fold"></view>
              <view  v-if="!curFilter  || (order == 'desc')" class="scale bot cuIcon-unfold"></view>
            </view>
            <view    class="orderDesc text-right"  @click="filterClick(1)" >{{i18n['加入时间']}}</view>
		       </view>
        </view>
        <!-- 内容 -->
        <view v-for="(item,index) in dataList"  :key="index" class="list-item flex justify-between align-center">
          <view class="list-item-time text-333 word-break-all text-cut padding-right-xs">{{item.user_nickname}}</view>
          <view  class="text-center list-item-time text-333 word-break-all text-cut padding-right-xs">{{item.type}}</view>
          <view  class="text-right list-item-time text-333 word-break-all text-cut" >{{item.create_time}}</view>
        </view>
      </fu-scroll>
    </view>
    <fu-notwork></fu-notwork>
  </view>
</template>

<script>
  import fuScroll from '../../components/fu-scroll/fu-scroll.vue';
  export default {
    components: {
      fuScroll
    },
  data() {
    return {
      curFilter:false,
      order:'',
      keyword:'',
      isSearch:true,
      scrollHeight:0,
      isLoad:false,
      isData:'more',
      dataContent:{},
      dataList:[],
      page: 1, // 页数
      size: 10, // 页条数
    };
  },
  mounted() {
    // let obj = uni.createSelectorQuery().in(this).select('.content_height');
    let that = this;
    this.$nextTick(function(){
      new Promise((reslove,reject)=>{
        let pageHeight;
        let viewHeight;
        let heightData = {}
        uni.createSelectorQuery().in(this).select('.pages').boundingClientRect(function(data) {
            heightData.pageHeight = data.height;
            // console.log(data.height)
          }).exec();
        uni.createSelectorQuery().in(this).select('.content_height').boundingClientRect(function(data) {
            heightData.viewHeight = data.height;
            // console.log(data.height)
          }).exec();

          setTimeout(()=>{
            reslove(heightData)
          },500)
      }).then(res=>{
        // console.log(res);
        that.scrollHeight = Math.floor(res.pageHeight - res.viewHeight);
        // console.log(Math.floor(res.pageHeight - res.viewHeight))
      })

    })


  },
  onLoad() {
   this.getContent()
   this.handleSearch()
  },

  methods: {
    //主数据
    getContent() {
    	this.$api.post(global.apiUrls.postDistributionPerson, {
    		user_id: global.userInfo && global.userInfo.id || 0,
    	}).then(res => {
    		console.log('推广人统计',res);
    		if (res.data.code == 1) {
          this.dataContent=res.data.data
    		}else{
          this.$message.error(res.data.msg)
        }
    	})
      .catch(err => {
        console.log(err);
      })
    },
    filterClick(type){
      if(type==1){
         this.curFilter=false
         this.order=''
         this.onRefresh()
         return
      }
      this.curFilter=true
      if(this.order=='asc'){
         this.order='desc'
      }else{
         this.order='asc'
      }
      this.onRefresh()
    },
    // 搜索
    handleSearch(isPull = false) {
      if (this.isData != 'more' ) return;
      this.isData = 'more';
      this.isLoad = true;
      let data = {
        sort:this.order,
        user_id:  global.userInfo.id || 0,
        keywords:this.keyword,
        page: this.page,
        list_rows: this.size,
      }
      this.$api.post(global.apiUrls.postDistributionPersonList, data)
        .then(res => {
          if(isPull) this.$refs.refresh.close();
          
          if (res.data.code == 1) {
            let totalSize = res.data.data.total;
            let list = res.data.data.data;
            if (this.page == 1){
              this.dataList = [];
            };
            if(this.page == 1 && list.length == 0){
              this.isData = 'noData';
              this.isLoad = false;
              return
            }
            this.dataList = this.dataList.concat(list);
            if (this.dataList.length >= totalSize) {
              this.isData = 'noMore';
            } else {
              this.isData = 'more';
              this.page++;
            }

          } else {
             this.isData = 'noData';
              this.$message.error(res.data.msg);
          }

          this.isLoad = false;
        }).catch(err => {
          if(isPull) this.$refs.refresh.close();
          this.isLoad = false;
          this.isData = 'noData';
          console.log(err)
           this.$message.error(err);
        })
    },
    clear(){
      this.keyword = '';
      this.onRefresh()
    },
    // 刷新
    onRefresh(){
      console.log('刷新')
      let that = this;
      this.page = 1;
      this.isData = 'more';
      this.handleSearch(true);
    },
    // 加载
    onBottom(){
      // console.log('加载更多')
      this.handleSearch();
    }
  }
};
</script>

<style lang="scss" scoped>
.text-right{
  text-align:right;
}
.text-center{
  text-align:center;
}
.row-reverse{
 flex-direction:row-reverse;
}
.active {
  color: $theme !important;
}
.sorting{
 padding-left:10rpx;
 .top{
   transform: translateY(8rpx) scale(0.65);
 }
 .bot{
   transform: translateY(-4rpx) scale(0.65);
 }
}
.orderDesc {
  padding-top:10rpx
  // position: relative;

}
.margin_top{
  margin-top:14rpx;
}

.pages {
  background: #ffffff;
  // position: relative;
  // z-index: -2;
  height: 100vh;
  overflow: hidden;
}

.header-wrap {
  height: 320rpx;
  position: relative;
  overflow: hidden;
  .header-bg {
    width: 2000rpx;
    height: 2000rpx;
    position: absolute;
    bottom: 0;
    left: -625rpx;
    background: $theme;
    border-radius: 50%;
    z-index: 1;
  }
  .header-info {
    position: relative;
    z-index: 2;
    width: 100%;
    text-align: center;
    font-size: 28rpx;
    color: #ffffff;
    margin-top: 30rpx;
    .header-money {
      font-size: 60rpx;
    }
    .header-title {
      margin-top: 20rpx;
    }
  }
}
.item-wrap {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0 32rpx;
  box-sizing: border-box;
  margin-top: -120rpx;
  .item-content {
    height: 150rpx;
    border-radius: 24rpx;
    background: #ffffff;
    text-align: center;
    box-shadow: 2rpx 2rpx 10rpx rgba(0, 0, 0, 0.3);
    .item-num {
      font-size: 48rpx;
      margin-bottom: 10rpx;
    }
    .item-title {
      font-size: 24rpx;
    }
    .item-line {
      width: 1rpx;
      height: 44rpx;
      background: #eeeeee;
    }
  }
}
.list-wrap {
  width: 100%;
  padding: 0 32rpx;
  box-sizing: border-box;
  .list-item {
    &.title{
      margin-top: 20rpx;
      font-weight: bold;
    }
    padding: 10rpx 20rpx;
    box-sizing: border-box;
    border-radius: 24rpx;
    .list-item-title {
      font-size: 28rpx;
      line-height: 60rpx;
      height: 60rpx;
    }
    .list-item-time {
		width: calc(100% / 3);
      font-size: 24rpx;
	    flex-shrink: 0;
      // line-height: 48rpx;
      // height: 48rpx;
    }
    .list-item-right {
      color: $theme;
      font-size: 36rpx;
    }
  }
}
.item-center{
  text-align: right;
  position: relative;
  right:-40rpx;
}


.search-form {
	background-color: #f5f5f5;
	line-height: 64upx;
	height: 64upx;
	font-size: 24upx;
	color: #333333;
	flex: 1;
	display: flex;
	align-items: center;
	margin: 20rpx 32upx;
  position: relative;
  z-index: 2;
}

.search-form+.action {
	margin-right: 30upx;
}

.search-form input {
	flex: 1;
	padding-right: 30upx;
	height: 64upx;
	line-height: 64upx;
	font-size: 26upx;
	background-color: transparent;
}

.search-form [class*="cuIcon-"] {
	margin: 0 0.5em 0 0.8em;
}

.search-form [class*="cuIcon-"]::before {
	top: 0upx;
}
</style>
