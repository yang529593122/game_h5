<template>
  <view class="content">
    <view class="header">
      <view class="left" @click="navBack">
        <image src="@/components/benben-calendar/static/arrow-left.png" mode=""></image>
      </view>
      <view class="title">交U专区</view>
      <view class="right">
        <view class="screen" @click="getTabList">
          <image src="/static/newPage/4.png" mode="aspectFill"></image>
          <view>筛选</view>
        </view>
        <view class="screen release" @click="handleJump" data-url="/pages/newPage/makeFriends/release">
          <image src="/static/newPage/5.png" mode="aspectFill"></image>
          <view>发布</view>
        </view>
      </view>
    </view>
    <!-- tab切换 -->
    <view class="tab-list">
      <view class="tab-item" v-for="item in tabList" :ke="item.id" @click="getActive(item)"
        :class="{active:tab== item.id}">{{ item.title }}</view>
      <!-- <view class="tab-item" @click="getActive(2)" :class="{active:tab==2}">
				<text>时间</text>
				<view class="screen-img">
					<image src="/static/newPage/8.png" mode="aspectFill"></image>
					<image src="/static/newPage/6.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="tab-item" @click="getActive(3)" :class="{active:tab==3}">
				<text>最新评论</text>
				<view class="screen-img">
					<image src="/static/newPage/8.png" mode="aspectFill"></image>
					<image src="/static/newPage/6.png" mode="aspectFill"></image>
				</view>
			</view> -->
    </view>
    <view style="height: 176rpx;"></view>
    <!-- 列表 -->
    <view class="shop-list">
      <view class="shop-item" v-for="item in list" :key="item.id"  @click.stop="getPath(`/pages/newPage/makeFriends/socialContactdetail?id=${item.id}`)">
        <image :src="item.cover" mode="aspectFill"></image>
        <view class="shop-name">
          {{ item.title }}
        </view>
        <view class="shop-label">
          <view class="label-list">
            <text v-for="it in item.tabs_name">{{ it }}</text>
          </view>
          <view class="look-num">
            <image src="/static/newPage/10.png" mode="aspectFill"></image>
            <text>{{ item.count }}</text>
          </view>
        </view>
        <view class="shop-price">
          <image :src="item.head_img" mode="aspectFill"></image>
          <text>{{ item.user_nickname }}</text>
        </view>
      </view>
    </view>

    <!-- 筛选 -->
    <benben-popup v-model="popupShow" mode="bottom">
      <view class="popup">
        <view class="popup-title">
          <text class="cancel" @click.stop="popupShow=false">取消</text>
          <text class="pop-title">选择标签</text>
          <text class="getyes" @click.stop="getYes">确定</text>
        </view>
        <view class="game-type">
          <view class="game-type-content">
              <view class="type-item"  v-for="(item,index) in tagsList" :key="item.id" @click="selectGame(item,index)">
                <view class="">
                  {{ item.name }}
                </view>
              </view>
          </view>


          <view class="game-type-content">
            <block v-if="twoList.length">
              <view class="type-item"  v-for="(item,index) in twoList" :key="item.id" @click="selectTwoGame(item,index)">
                <view class="">
                  {{ item.name }}
                </view>
              </view>
            </block>

          </view>

           <view class="game-type-content">
              <block v-if="twoList.length">
                <view class="type-item"  v-for="(item,index) in thrList" :key="item.id" @click="selectThrGame(item,index)">
                  <view class="type-item-thr">
                    {{ item.name }}
                    <image  v-if="item.isSelected" @click="getselect(item,index)" src="/static/newPage/12.png" mode="aspectFill"></image>
                    <image  v-else @click="getselect(item,index)" src="/static/newPage/11.png" mode="aspectFill"></image>
                  </view>
                </view>
              </block>

           </view>


        </view>
        <view class="line"></view>
        <view class="my-select" v-if="selectList.length">
          <text>我的选择</text>
          <text>至少选择1个，最多选择6个</text>
        </view>
        <view class="select-list" >
          <view class="select-item select-active"   v-for="item in selectList" :key="item.id">
            {{ item.name }}
            <view class="postimg">
              <image src="/static/newPage/13.png" mode="aspectFill"></image>
            </view>
          </view>
        </view>
      </view>
    </benben-popup>
  </view>
</template>

<script>
  import benbenPopup from '@/components/benben-popup/benben-popup.vue'
  export default {
    components: {
      benbenPopup
    },
    data() {
      return {
        tabList: [ // 1.发布时间正序；2.发布时间倒序；3.评论时间正序；4.评论时间倒序；5.热度
          {
            id: 1,
            title: '热度',
            status: 5,
          },
          {
            id: 2,
            title: '时间',
            status: 2,
          },
          {
            id: 3,
            title: '最新评论',
            status: 4,
          }
        ],
        tab: 1,
        popupShow: false,
        select: 1,
        list: [],
        curPage: 1,
        list_rows: 5,
        totalPages: 1,
        order: 5,
        tagsList: [],

        twoIndex:null,
        twoList:[],
        thrIndex:null,
        thrList:[],
        selectList:[]
      }
    },
    onLoad() {
      this.getList({
        title: "", // 标题搜索
        tabs: "", // 标签ID 多个用英文逗号隔开
        order: this.order, //1.发布时间正序；2.发布时间倒序；3.评论时间正序；4.评论时间倒序；5.热度
        page: this.curPage,
        list_rows: this.list_rows,
      })
    },
    onReachBottom(e) {
      if (this.curPage < this.totalPages) {
        this.curPage++;
        this.getList({
          page: this.curPage,
          list_rows: this.list_rows,
          title: "", // 标题搜索
          tabs: "", // 标签ID 多个用英文逗号隔开
          order: this.order, //1.发布时间正序；2.发布时间倒序；3.评论时间正序；4.评论时间倒序；5.热度
        })
      }
    },
    methods: {
      // selectGame
      selectGame(item,index){
        console.log(item,index,999)
        this.twoIndex = index
        this.twoList = this.tagsList[index].children
      },
      selectTwoGame(item, index){
        this.thrIndex = index
        const arr = [ ... this.twoList[index].children]
        arr.forEach(item => {
               this.$set(item, 'isSelected' ,false);
        })
        this.thrList = arr
      },
      selectThrGame(item,index){},
      // 获取数据源
      getList(parameter) {
        this.$api.post(global.apiUrls.friends_friends_list, parameter).then(res => {
          if (res.data.code === '1') {
            const result = res.data.data
            this.list = [...this.list, ...result.data]
            this.totalPages = result.last_page
          } else {
            this.$message.info(res.data.msg);
          }
          this.popupShow = false
        })
      },
      navBack() {
        // 返回上一页
        uni.navigateBack();
      },
      getActive(item) {
        this.tab = item.id;
        this.order = item.status
        this.list = []
        this.curPage = 1
        this.getList({
          page: this.curPage,
          list_rows: this.list_rows,
          title: "", // 标题搜索
          tabs: "", // 标签ID 多个用英文逗号隔开
          order: item.status, //1.发布时间正序；2.发布时间倒序；3.评论时间正序；4.评论时间倒序；5.热度
        })
      },

      // 获取配置项数据源
      getTabList() {
        // friends_tab_list
        this.popupShow = true
        this.$api.post(global.apiUrls.friends_tab_list).then(res => {
          if (res.data.code === '1') {
            const result = res.data.data
            this.tagsList = result
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },
      getYes(e) {
         let arr =  []
         this.selectList.forEach(item => arr.push(item.id))
        this.curPage = 1
        this.order = 5
        this.list = []
        this.getList({
          page: this.curPage,
          list_rows: this.list_rows,
          title: "", // 标题搜索
          tabs: arr.join(), // 标签ID 多个用英文逗号隔开
          order: this.status, //1.发布时间正序；2.发布时间倒序；3.评论时间正序；4.评论时间倒序；5.热度
        })
      },
      // 选择
      getselect(item,index) {
        if( this.selectList.length>5){
          this.$message.info('最多选择6个');
        }else{
          this.thrList[index].isSelected = !this.thrList[index].isSelected
          this.selectList = this.thrList.filter(item => item.isSelected === true)
        }

      },
      getPath(url) {
        uni.navigateTo({
          url: url
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16rpx 32rpx;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1024;

      .left {
        width: 150rpx;

        image {
          width: 40rpx;
          height: 35rpx;
        }
      }

      .title {
        font-size: 36rpx;
        font-weight: 500;
      }

      .right {
        width: 150rpx;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .screen {
          text-align: center;

          image {
            width: 32rpx;
            height: 32rpx;
            vertical-align: top;
          }

          view {
            font-size: 24rpx;
            color: #36373D;
          }
        }

        .release {
          margin-left: 40rpx;
        }
      }
    }

    .tab-list {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #fff;
      position: fixed;
      top: 88rpx;
      left: 0;
      width: 100%;
      z-index: 1024;

      .tab-item {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 88rpx;
        width: 200rpx;
        color: #868686;
        font-size: 28rpx;

        text {
          margin-right: 16rpx;
        }

        .screen-img {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;

          image {
            width: 25rpx;
            height: 12rpx;
          }

          image:nth-child(2) {
            margin-top: 5rpx;
          }
        }
      }

      .active {
        color: #36373D;
        font-weight: 600;
      }
    }

    .shop-list {
      padding: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;

      .shop-item {
        background: #fff;
        padding: 16rpx;
        width: 341rpx;
        margin-bottom: 20px;

        image {
          width: 309rpx;
          height: 229rpx;
        }

        .shop-name {
          color: #36373D;
          font-size: 28rpx;
          font-weight: 500;
          margin-top: 16rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp: 2; //显示的行
        }

        .shop-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 24rpx;

          .label-list {
            flex: 1;
            display: flex;

            text {
              margin-right: 6rpx;
              margin-bottom: 6rpx;
              display: block;
              line-height: 44rpx;
              padding: 0 10rpx;
              background: rgba(41, 91, 123, 0.3);
              color: #295B7B;
              font-size: 20rpx;
              overflow: hidden;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box; //作为弹性伸缩盒子模型显示。
              -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
              -webkit-line-clamp: 1; //显示的行
            }
          }

          .look-num {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            image {
              width: 24rpx;
              height: 24rpx;
              margin-right: 5rpx;
            }

            text {
              font-size: 20rpx;
              color: #868686;
            }
          }
        }

        .shop-price {
          font-size: 32rpx;
          margin-top: 22rpx;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          text {
            margin-left: 10rpx;
            font-size: 20rpx;
            color: #868686;
          }

          image {
            display: block;
            border-radius: 50%;
            width: 36rpx;
            height: 36rpx;
          }
        }
      }
    }

    .popup {
      background: #fff;
      border-radius: 16rpx 16rpx 0 0;

      .popup-title {
        padding: 0 32rpx;
        line-height: 110rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1rpx solid #EEEEEE;

        .cancel {
          font-size: 32rpx;
          color: #BFBFBF;
        }

        .pop-title {
          font-size: 32rpx;
          color: #333333;
        }

        .getyes {
          font-size: 32rpx;
          color: #295B7B;
          font-weight: 500;
        }
      }

      .line {
        width: 100%;
        height: 10rpx;
        background: #FAFAFC;
      }

      .game-type {
        padding: 0 32rpx 32rpx;
        display: flex;
        justify-content: space-between;
        .game-type-content{
          .type-item{
            height: 60rpx;
            line-height: 60rpx;
            .type-item-thr{
              display: flex;
              justify-content: center;
              align-items: center;
              image {
                margin-left: 20rpx;
                display: block;
                width: 32rpx;
                height: 32rpx;
              }
            }

          }
        }
      }

      .my-select {
        padding: 32rpx 24rpx 0;

        text {
          color: #999999;
          font-size: 28rpx;
        }

        text:nth-child(1) {
          font-size: 32rpx;
          color: #333333;
          font-weight: 600;
          margin-right: 24rpx;
        }
      }

      .select-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 32rpx 24rpx;

        .select-item {
          background: #F8F8F8;
          color: #36373D;
          width: 160rpx;
          line-height: 64rpx;
          text-align: center;
          position: relative;
          font-size: 28rpx;
          margin-right: 16rpx;
          margin-bottom: 16rpx;

          .postimg {}

          image {
            width: 28rpx;
            height: 28rpx;
            position: absolute;
            right: -10rpx;
            top: -10rpx;
            background: #fff;
            overflow: hidden;
            border-radius: 50%;
          }
        }

        .select-item:nth-child(4n) {
          margin-right: 0;
        }

        .select-active {
          background: #295B7B;
          color: #fff;
        }
      }
    }
  }
</style>
