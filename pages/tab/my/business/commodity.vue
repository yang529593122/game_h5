<template>
	<view class="content">
		<view class="tab-list">
			<view class="tab-item" v-for='(item ,index) in COMMODITY_NAV_DATAS' :key="index" @click="getTab(item,index)" :class="[active===index ? 'active' :'']">
				{{ item.title }}<span v-if="active===index "></span>
			</view>
		</view>
		<view style="height: 110rpx;"></view>
		<view class="shop-list">
			<view class="shop-item" v-for="(item,index) in list" :key="index">
				<view class="shop-number">
					<view class="number">
						<text>商品编号：{{ item.sn }}</text>
						<image @click="getCopy(item)" src="/static/newPage/65.png" mode="aspectFill" ></image>
					</view>
          <!-- 0.待审核；1.已通过；2.已拒绝 -->
					<text class="shop-status" v-if="item.audit_status === 0">审核中</text>
          <text class="shop-status" v-if="item.audit_status === 1 && item.is_sale">出售中</text>
          <text class="shop-status" v-if="item.audit_status === 1 && !item.is_sale">已下架</text>
          <text class="shop-status" v-if="item.audit_status === 2">审核失败</text>
				</view>
				<view class="shop-info">
					<image class="shop-img" :src="item.thumb" mode="aspectFill" @click="goDetails(item)"></image>
					<view class="shop-info-other">
						<view class="shop-name">
							{{ item.name }}
						</view>
						<view class="shop-price">
							<text>￥</text>
							<text>{{ item.shop_price }}</text>
							<text>￥{{ item.market_price }}</text>
						</view>
					</view>
				</view>
				<view class="btns">
					<button class="btns1" v-if="item.audit_status === 2 || item.audit_status === 0 || (item.audit_status === 1 && !item.is_sale) " @click="delShop(item,index)">删除</button>
          <button class="btns2" v-if="item.audit_status === 1 && item.is_sale" @click="takeOffTheShelf(item)">下架</button>
          <button class="btns2" v-if="item.audit_status === 1 && item.is_sale" @click="topShop(item)">置顶</button>
					<button class="btns2" v-if="item.audit_status === 1 ">查看评价</button>
					<button class="btns3" v-if="item.audit_status === 1 && item.is_sale">编辑商品</button>
          <button class="btns3" v-if="item.audit_status === 1 && !item.is_sale" @click="shelf(item)">上架</button>
          <button class="btns2" v-if="item.audit_status === 2 " @click="showFailure(item)">失败原因</button>
          <button class="btns3" v-if="item.audit_status === 2 ">编辑商品</button>
				</view>
			</view>
		</view>

    <view class="showFailurebox" v-if="isFailure">
      <view class="showFailurebox-content">
        <view class="asdfsadf">
          <view class="title">
            审核失败原因
            <text class="close" @click="closeEvent">X</text>
          </view>
          <view class="text">
            {{ isFailureText }}
          </view>
        </view>

      </view>
    </view>
	</view>
</template>

<script>
  import { COMMODITY_NAV_DATAS } from "@/common/constStatic.js"
	export default{
		data(){
			return{
        COMMODITY_NAV_DATAS,
				active:0,
        list:[],
        isFailure:false,
        isFailureText:''
			}
		},
		onLoad() {
      this.initData({
         type:'-1'
      })
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			if(e.index==0){
				uni.navigateTo({
					url:'/pages/newPage/shop/addItem'
				})
			}
		},
		methods:{
      initData(obj){
        this.$api.post(global.apiUrls.shop_goods_manager,obj).then(res => {
          if (res.data.code === '1') {
           this.list =[ ...this.list,...res.data.data.data]
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },
      getTab(item,index){
        this.active = index
        this.list =[ ]
        this.initData({
           type:item.status
        })
      },
			getCopy(item){
				// 复制订单号
				uni.setClipboardData({
					data: item.sn,
					success:  () =>{
						this.$message.info('商品编号已复制')
					}
				});
			},
      // 删除商品
      delShop(item,index){
        this.$api.post(global.apiUrls.shop_delete_goods,{
          goods_id:item.id
        }).then(res => {
          if (res.data.code === '1') {
            this.list = []
            this.initData({
               type:'-1'
            })
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },
      // 置顶
      topShop(item){
        uni.navigateTo({
          url:`/pages/tab/my/business/toppay?id=${item.id}`
        })
      },
      // 上架
      shelf(item){
        this.$api.post(global.apiUrls.shop_puton_goods,{
          goods_id:item.id
        }).then(res => {
          if (res.data.code === '1') {
            this.list = []
            this.initData({
               type:'-1'
            })
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },
      // 下架
      takeOffTheShelf(item){
        this.$api.post(global.apiUrls.shop_down_goods,{
          goods_id:item.id
        }).then(res => {
          if (res.data.code === '1') {
            this.list = []
            this.initData({
               type:'-1'
            })
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },
      closeEvent(){
        this.isFailure = false
        this.isFailureText = ''
      },
      showFailure(item){
        this.isFailure = true
        this.isFailureText = item.reason
      },
      goDetails(item){
        uni.navigateTo({
          url:`/pages/tab/my/business/details?id=${item.id}`
        })
      }

		}
	}
</script>

<style lang="scss">
	.content{
    .showFailurebox{
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .8);
      top:0;
      left: 0;
      z-index: 2000;
      .showFailurebox-content{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .asdfsadf{
          background: #fff;
          width: 70%;
          padding: 30rpx;
          border-radius: 20rpx;
          .title{
            text-align: center;
            position: relative;
            .close{
              position: absolute;
              right: 0;
            }
          }
          .text{
            color: #8A8A8A;
          }
        }
      }
    }
		.tab-list {
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: #fff;
			position: fixed;
			/* #ifdef APP-PLUS */
			top: 0;
			/* #endif */
			/* #ifdef H5 */
			top: 88rpx;
			/* #endif */
			left: 0;
			width: 100%;
			z-index: 1024;
			.tab-item {
				font-size: 28rpx;
				color: #868686;
				font-weight: 500;
				line-height: 88rpx;
				position: relative;
				span {
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					display: inline-block;
					width: 40rpx;
					height: 6rpx;
					border-radius: 3rpx;
					background: #36373D;
				}
			}
			.active {
				font-size: 32rpx;
				color: #36373D;
				font-weight: 700;
			}
		}
		.shop-list {
			width: 702rpx;
			margin: 0 auto;
			.shop-item {
				background: #fff;
				margin-top: 24rpx;
				padding: 24rpx;
				.shop-number {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24rpx;
					.number {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						text {
							font-size: 28rpx;
							color:#8C9199 ;
							margin-right: 20rpx;
						}
						image {
							width: 28rpx;
							height: 28rpx;
						}
					}
					.shop-status {
						font-size: 28rpx;
						font-weight: 600;
					}
				}
				.shop-info {
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					padding-bottom: 32rpx;
					border-bottom: 1rpx solid #DDDDDD;
					.shop-img {
						width: 200rpx;
						height: 148rpx;
						margin-right: 24rpx;
					}
					.shop-info-other {
						width: 420rpx;
						height: 148rpx;
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						flex-direction: column;
						.shop-name {
							font-size: 28rpx;
							color: #36373D;
							font-weight: 500;
						}
						.shop-price {
							text {
								font-weight: bold;
								color: #F55B29;
							}
							text:nth-child(1){
								font-size: 24rpx;
							}
							text:nth-child(2){
								font-size: 32rpx;
							}
							text:nth-child(3){
								font-size: 24rpx;
								color: #919191;
								font-weight: 400;
								margin-left: 10rpx;
								text-decoration: line-through;
							}
						}
					}
				}

				.btns {
					padding-top: 24rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					button {
						height: 60rpx;
						width: 170rpx;
						line-height: 60rpx;
						background: #295B7B;
						color: #fff;
						font-size: 24rpx;
					}
					.btns1,.btns2{
						height: 60rpx;
						line-height: 60rpx;
						background: #F8F8F8;
						color: #333;
						margin-right: 24rpx;
					}
				}
			}
		}
	}
</style>
