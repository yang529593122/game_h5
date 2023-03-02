<template>
	<view class="content">
		<view class="header" :style="{paddingTop:StatusBar+8+'px'}">
			<image @click="backUp" class="back" src="/static/newPage/59.png" mode="aspectFill"></image>
			<view class="title">议价竞拍</view>
			<view class="filter" @click="selectGames">
				<image src="/static/newPage/60.png" mode="aspectFill"></image>
				<view>筛选</view>
			</view>
		</view>
		<view class="filter-list" :style="{top:StatusBar+44+'px'}">
			<view class="filter-select" >
				<view class="filter-time" v-for="item in BARGAINING_CONDITIONS" :key="item.id" @click="selectList(item)">
					<text :class="[ present === item.id ? 'activedColor' : '']">{{ item.title }}</text>
					<view class="filter-img">
						<image src="/static/newPage/8.png" mode="aspectFill"></image>
						<image src="/static/newPage/6.png" mode="aspectFill"></image>
					</view>
				</view>

			</view>
			<image class="select-icon" @click="getScreen" :src="screen=='portrait'?'/static/newPage/34.png':'/static/newPage/35.png'" mode="aspectFill"></image>
		</view>
		<view :style="{height: StatusBar+88+'px'}"></view>


    <fu-empty-ui v-if="!lists.length"></fu-empty-ui>
		<view class="shop-list" v-else>
			<view :class="{'shop-item':screen=='transverse','shop-item-two':screen=='portrait'}" v-for="item in lists" @click="goDetail(item)">
				<image class="shop-img" :src="item.cover_images" mode="aspectFill"></image>
				<view class="shop-info">
					<view class="shop-name">
						<text v-if="item.is_bao === 0"> 【押正包安】</text>
            <text v-if="item.is_bao === 1"> 【包赔】</text>
						{{ item.goods_name }}
					</view>
					<view class="shop-num">
						商品编号：{{ item.goods_no }}
					</view>
					<view class="shop-tips">
						<view class="shop-tips-one">
							<view class="tips-text">{{ item.introduce }}</view>
							<view class="tips-text-once">
								<text>议价中</text>
								{{ item.end_time }}
							</view>
						</view>
						<view class="shop-price">
							<text>当前竞拍价</text>
							<text>￥{{item.max_price }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>



		<fu-popup v-model="show" mode="top" zIndex="101">
			<view class="popup-content">

        <view class="types-conent">
          <view class="types-title">
            游戏分类
          </view>
          <view class="types-list">
            <view :class="[types_item_cur === index ? 'types_item_cur_actived':'','types-item']" v-for="(item,index) in types_list" @click="selectTypeGames(item,index)" :key="item.game_id">
              {{ item.game_name }}
            </view>
          </view>

        </view>
        <view class="types-btns">
          <view class="btns-item resetbtn" @click="submitGames(false)">
            重置
          </view>
          <view class="btns-item" @click="submitGames(true)">
            确定
          </view>
        </view>
      </view>
		</fu-popup>

	</view>
</template>

<script>
  import { BARGAINING_CONDITIONS } from "../../common/constStatic.js"
	export default {
		data(){
			return {
        BARGAINING_CONDITIONS, // 筛选条件集合
				screen:'portrait', //transverse
				show:false,
        present:0, // 是否选中当前选择导航元素
        lists:[],  // 列表数据源
        types_list:[] , // 游戏分类列表
        types_item_cur:null, //游戏分类的当前项
        cur_games_type_item:null, // 选中当前游戏分类集合
			}
		},
    onLoad() {
      this.getbargainingList({
        order:BARGAINING_CONDITIONS[0].order,
      })
    },
		methods:{
      // 详情
      goDetail(item){
        this.$urouter.navigateTo('/pages/bargaining/details?type=yj&goods_id='+item.goods_id)
      },
      // 提交筛选条件
       submitGames(flag){
        if(flag){
          this.present = 0
          this.getbargainingList({
            order:BARGAINING_CONDITIONS[0].order,
            game_id:this.cur_games_type_item.game_id
          })
        }else{
          this.types_item_cur = null
          this.cur_games_type_item = null
          this.present = 0
          this.getbargainingList({
            order:BARGAINING_CONDITIONS[0].order,
          })
        }
      },
      // 筛选游戏分类
      selectGames(){
        this.$api.post(global.apiUrls.gameTypes).then(res => {
          if(res.data.code === '1'){
              this.show = true
              const result = res.data.data
              this.types_list = result.data
          }else{
            this.$message.info(res.data.msg);
          }
        })

      },
      // 选择分类
      selectTypeGames(item,index){
        this.types_item_cur = index
        this.cur_games_type_item = item

      },
      // 获取议价列表
      getbargainingList(parameter){
        this.$api.post(global.apiUrls.bargainingList,parameter).then(res => {
          if(res.data.code === '1'){
              const result = res.data.data
              this.lists = result.data
          }else{
            this.$message.info(res.data.msg);
          }
          this.show = false
        })
      },
      // 点击筛选导航
      selectList(item){
        this.present = item.id
        let obj=null
        if(this.cur_games_type_item){
          obj = {
            order:item.order,
            game_id:this.cur_games_type_item.game_id
          }
        }else{
          obj = {
            order:item.order,
          }
        }

        this.getbargainingList(obj)
      },
      // 返回上级页面
      backUp(){
        uni.navigateBack({ delta: 1});
      },

			// 筛选
			getScreen(){
				if(this.screen=='transverse'){
					this.screen = 'portrait';
				}else{
					this.screen = 'transverse';
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {

		.header {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			background: #fff;
			padding: 16rpx 32rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			z-index: 1024;

			.back {
				width: 20rpx;
				height: 32rpx;
			}

			.title {
				font-size: 32rpx;
				font-weight: bold;
			}

			.filter {
				text-align: center;
				image {
					width: 32rpx;
					height: 32rpx;
					vertical-align: top;
				}
				view{
					font-size: 24rpx;
					color: #36373D;
				}
			}
		}

		.filter-list {
			position: fixed;
			top: 88rpx;
			left: 0;
			width: 100%;
			background: #fff;
			padding: 24rpx 32rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: 100;

			.filter-select {
				display: flex;
				align-items: center;
				text {
					font-size: 28rpx;
					color: #868686;
				}

				.filter-time {
					display: flex;
					justify-content: flex-start;
					align-items: center;
          padding-right: 20rpx;
          .activedColor{
            color: #000;
          }
					.filter-img {
						display: flex;
						flex-direction: column;
						justify-content: flex-start;
						align-items: center;
						margin-left: 10rpx;
						image {
							width: 10rpx;
							height: 10rpx;
							vertical-align: top;
						}
						image:nth-child(1){
							margin-bottom: 5rpx;
						}
					}
				}
			}
			.select-icon {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.shop-list {
			padding: 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			flex-wrap: wrap;

			.shop-item {
				width: 702rpx;
				padding: 16rpx;
				background: #fff;
				margin-bottom: 20rpx;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;

				.shop-img {
					width: 204rpx;
					height: 152rpx;
				}

				.shop-info {
					width: 449rpx;
					margin-left: 16rpx;

					.shop-name {
						font-size: 28rpx;
						color: #36373D;
						font-weight: 700;
						line-height: 40rpx;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
						text {
							color: #659BC7;
						}
					}

					.shop-num {
						font-size: 20rpx;
						color: #868686;
						margin: 8rpx 0;
					}

					.shop-tips {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.shop-tips-one {

							.tips-text {
                max-width: 260rpx;
								font-size: 20rpx;
								color: #868686;
								margin-bottom: 11rpx;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
							}

							.tips-text-once {
								font-size: 20rpx;
								color: #868686;
								text {
									padding: 10rpx;
									line-height: 28rpx;
									background: rgba(41,91,123,0.1);
									color: #295B7B;
									margin-right: 10rpx;
								}
							}
						}

						.shop-price {
							// width: 120rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							align-items: flex-end;
							text:nth-child(1){
								font-size: 20rpx;
								color: #659BC7;
							}
							text:nth-child(2){
								font-size: 32rpx;
								color: #F55B29;
								font-weight: bold;
								display: inline-block;
								line-height: 40rpx;
							}
						}
					}
				}
			}

			.shop-item-two {
				background: #fff;
				padding:16rpx;
				width: 341rpx;
				margin-bottom: 24rpx;
				.shop-img {
					width: 309rpx;
					height: 229rpx;
				}
				.shop-info {
					.shop-name {
						font-size: 28rpx;
						font-weight: 700;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
						text {
							color: #659BC7;
							line-height: 40rpx;
							display: inline-block;
						}
					}
					.shop-num {
						font-size: 24rpx;
						color: #868686;
						margin: 16rpx 0 8rpx;
					}

					.shop-tips {

						.shop-tips-one {

							.tips-text {
								font-size: 24rpx;
								color: #868686;
								margin-bottom: 8rpx;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
							}

							.tips-text-once {
								font-size: 20rpx;
								text {
									margin-right: 10rpx;
									display: inline-block;
									padding: 0 10rpx;
									line-height: 34rpx;
									background: rgba(41,91,123,0.1);
									color: #295B7B;
								}
							}
						}
						.shop-price {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							margin-top: 20rpx;
							text:nth-child(1){
								font-size: 20rpx;
								color: #659BC7;
								margin-right: 16rpx;
							}
							text:nth-child(2){
								font-size: 32rpx;
								color: #F55B29;
								font-weight: bold;
							}
						}
					}
				}
			}
		}
    .popup-content{
      padding-top: 100rpx;
      .types-conent{
        padding: 20rpx;
        .types-title{
          margin-bottom: 40rpx;
          font-size: 32rpx;
        }
        .types-list{
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-row-gap: 20rpx;
          grid-column-gap: 20rpx;
          .types-item{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            border-radius: 10rpx;
            background: #F8F8F8;
            color: #3D3E43;
            text-align: center;
            line-height: 60rpx;
            padding: 0 10rpx;
          }
          .types_item_cur_actived{
            background: #295B7B;
            color: #fff;
          }
        }

      }
      .types-btns{
        padding: 40rpx 20rpx 20rpx 20rpx;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 20rpx;
        .btns-item{
          background: red;
          border-radius: 10rpx;
          text-align: center;
          line-height: 70rpx;
          background: #295B7B;
          color: #fff;
        }
        .resetbtn{
          font-size: 32rpx;
          color: #393A40;
          background: #E9EEF1;
        }
      }
    }
	}
</style>
