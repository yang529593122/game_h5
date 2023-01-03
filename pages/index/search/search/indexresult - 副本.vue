<template>
  <view class="page">
    <!-- 头部 start-->
    <view class="cu-custom bg-white" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
      <view class="cu-bar bg-white fixed solid-bottom" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
        <view class="action" @tap="back"><text class="cuIcon-back"></text></view>
        <view class="search-form round">
          <!-- placeholder的值应该是动态的，但是跳转过来的时候没有传递任何参数，暂时砍掉这个需求 -->
          <input
            class="search-input"
            confirm-type="search"
            type="text"
            v-model="search_info"
            :maxlength="50"
            :focus="true"
            :adjust-position="false"
            :hold-keyboard="false"
            :placeholder="placeholder"
            placeholder-class="placeholderStyle"
            @confirm="gamemobile_search"
          />
          <text v-if="search_info.length != 0" class="cuIcon-close text-gray padding-right-xs" @tap="clear"></text>
        </view>
        <view class="right padding-right" @click="gamemobile_search"><text class="cuIcon-search" style="font-size: 36rpx;"></text></view>
      </view>
    </view>
    <!-- 头部 end-->
	<fu-loading v-if="isShowLoading"></fu-loading>
	<block v-else>
		<view class="flex flex-direction justify-center align-center bg-white" style="padding-top: 225rpx;" v-if="!allGameList.length">
			<image src="../../static/empty.png" style="width: 209rpx;height: 207rpx;" mode=""></image>
			<view class="text-center" style="margin-top: 67rpx;font-size: 28rpx;color: #5C707E;">暂无数据</view>
		</view>
		<view class="allGramYouxiList" v-else>
			<block v-for="(item,index) in allGameList" :key="index">
				<view class="allGramYouxiItem" @click="gotoDetail(item)" >
					<view class="allGramYouxiItemImg">
						<fu-image radius="24" :src="item.logo"></fu-image>
					</view>
					<view class="allGramYouxiItemText">{{item.game_name}}</view>
				</view>
			</block>
		</view>
	</block>
	
    <!-- 断网检测组件 -->
    <fu-notwork></fu-notwork>
  </view>
</template>

<script>
export default {
  data() {
    return {
      localSearchHistory: [], // 本地历史搜索记录表
      keyword: '', // 搜索关键字
      history_list: [], // 历史记录表
      removeIndex: -1, // 要删除的下标
      words: [], // 搜索联想分词表
      placeholder: '搜索游戏名称／关键字',
      listenerType: 'listener', // 是否识别成功 listener success fail
      listenerWord: '', // 语音识别的文字
      keyboardheight: 0, // 键盘高度
      isFind: true, // 是否展示搜索发现
      findData: [], // 热搜榜
      search_found: [], //热搜发现
      tabindex: 0, // tab初始值
      search_info: {}, //搜索信息
      isInit: false, // 初始化数据信息
      current: 0, // 榜单tab切换
      hotSerchList: [], // 热销榜
	  allGameList:[],
	  isShowLoading:false
    };
  },
  onShow() {
    
  },
  onLoad(options) {
    this.search_info = options.keyWords;
	if(this.search_info) {
		this.gamemobile_search();
	}
  },
  onReachBottom() {
  },
  methods: {
	  gotoDetail(item) {
		  this.$urouter.navigateTo('/pages/index/search/search-list/index?gameId=' + item.game_id)
	  },
	  gamemobile_search() {
		  let _data = uni.getStorageSync('SEARCHHISTORY') || '[]';
		  if (_data) {
		    let history_list = JSON.parse(_data);
			const set = new Set(history_list);
			set.delete(this.search_info);
			set.add(this.search_info);
			history_list = Array.from(set).reverse();
			uni.setStorageSync('SEARCHHISTORY',JSON.stringify(history_list))
		  }
		  this.isShowLoading = true;
		  this.$api.post(global.apiUrls.gamemobile_search,{
			  search_word:this.search_info
		  }).then(res => {
			  if(res.data.code == 1) {
				  this.allGameList = res.data.data;
			  } else {
				  this.$message.info(res.data.msg);
			  }
			  this.isShowLoading = false;
		  })
	  },
    // 清除历史记录弹窗
    clearHistory() {
      this.$util.showModal({
        title: this.i18n["提示"],
        content: this.i18n['确定删除历史记录？'],
        confirmColor: this.$store.state.themeColor,
        success: res => {
          if (res.confirm) {
            this.clearAllHistory();
          }
        }
      });
    },
    // 清除历史记录
    clearAllHistory() {
      this.history_list = [];
      uni.clearStorageSync('SEARCHHISTORY');
    },
    // 长按事件
    handleLongpress(index) {
      this.removeIndex = index;
    },
    // 搜索发现
    getSearchFound() {
      this.$api
        .post(global.apiUrls.postSearchHistoryRecommend, {
          user_id: (global.userInfo && global.userInfo.id) || 0
        })
        .then(res => {
          console.log('搜索发现', res);
          if (res.statusCode == 200 && res.data.code == 1) {
            this.search_found = res.data.data.filter(item => item);
          }
        })
        .catch(err => {
          console.log('err: ' + JSON.stringify(err));
        });
    },
    // 删除单个历史记录
    removeHistory(keyword) {
      console.log('删除历史搜索', keyword);
      this.history_list = this.history_list.filter(ele => ele != keyword);
      uni.setStorageSync('SEARCHHISTORY', this.history_list);
    },
    /**
     * @description 搜索
     * @param {Object} e 事件源对象
     * @param {Object} item 商品信息
     */
    handleSearch(e, item,index) {
      uni.hideKeyboard();
      if (item) {
        if (index == this.removeIndex) {
          this.removeHistory(item);
          this.removeIndex = -1;
          return false;
        }
        console.log('搜索历史触发');
        // 点击历史记录去搜索
        this.$urouter.navigateTo({
          url: '/pages/index/search/search-list/index',
          params: {
            keyWords: item
          }
        });
      } else {
        // 搜索按钮或语音搜索
        if (this.keyword.trim() != '') {
          // 输入框触发搜索
          this.$urouter.navigateTo({
            url: '/pages/index/search/search-list/index',
            params: {
              keyWords: this.keyword
            }
          });
        } else if (this.placeholder != '搜索游戏名称／关键字') {
          // 首页带过来的数据触发搜索
          this.$urouter.navigateTo({
            url: '/pages/index/search/search-list/index',
            params: {
              keyWords: this.placeholder
            }
          });
        } else {
          this.$message.info(this.i18n['请输入搜索关键字']);
        }
        this.keyword = '';
        this.keyboardheight = 0;
      }
    },
    /**
     * @description 去商品列表页面
     * @param {String} item 商品关键词信息
     */
    toClassify(item) {
      this.keyword = item;
      this.handleSearch();
    },
    /**
     * @func 后退
     */
    back() {
      uni.navigateBack();
    },
    // 初始化历史记录列表
    initHistory() {
		
		// this.$api.post(global.apiUrls.searchgetHistorySearch).then(res => {
		// 	if(res.data.code == 1) {
				
		// 	} else {
		// 		this.$message.info(res.data.msg);
		// 	}
		// })
		// return;
      let _data = uni.getStorageSync('SEARCHHISTORY');
      if (_data) {
        this.history_list = _data;
      }
    },
    /**
     * @func 清除输入框
     */
    clear() {
      this.search_info = '';
      this.words = [];
    }
  }
};
</script>

<style lang="scss" scoped>
// 标签样式
.history-list {
  display: flex;
  flex-wrap: wrap;
  .history-tag {
    padding: 12rpx 40rpx;
    background-color: #f8f8f8;
    margin-right: 24rpx;
    margin-bottom: 24rpx;
    border-radius: 48rpx;
    font-size: 24rpx;
    color: #333333;
    position: relative;
    .close {
      position: absolute;
      top: 50%;
      right: 10rpx;
      transform: translateY(-50%);
      font-size: 20rpx;
    }
  }
}

.page {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
}

.search-form {
  position: relative;
  background-color: #f9f9f9;
  .search-input {
    font-size: 24rpx;
    color: #666666;
    text-indent: 32rpx;
  }
  .placeholderStyle {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 24rpx;
    color: #bfbfbf;
    text-indent: 32rpx;
  }
  .close {
    position: absolute;
    right: 0;
  }
}

// 推荐
.fu-recommend-box {
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 7%, #f8f8f8 34%, #f8f8f8 100%);
}

.allGramYouxiList {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 40rpx 28rpx;
		
		.allGramYouxiItem {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 160rpx;
			margin-right: 19rpx;
			margin-bottom: 40rpx;
			
			.allGramYouxiItemImg {
				width: 128rpx;
				height: 128rpx;
			}
			
			.allGramYouxiItemText {
				width: 128rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				text-align: center;
				margin-top: 16rpx;
			}
		}
		
		.allGramYouxiItem:nth-child(4n) {
			margin-right: 0!important;
		}
	}
</style>
