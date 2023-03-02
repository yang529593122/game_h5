/*
* @Author: PengFei Yang
* @Date: 2023-02-27 15:17:26
* @Description: 最新上架 页面=>
*/
<template>
	<view class="zuijinPages">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				最新上架
			</view>
		</fu-custom>
		<view class="MoreGram">
			<fu-tab :tabs="MoreListGame" :current="current" node-title="game_name" node-key="game_id" current-key="game_id" @change="changeTab"></fu-tab>
		</view>

		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<fu-empty-ui v-if="!lists.length"></fu-empty-ui>
			<block v-else>
				<view style="height: 24rpx;"></view>
				<fu-waterfall v-model="lists">
				  <template v-slot:left="{ leftList }">
				    <block v-for="(item, index) in leftList" :key="item.id"><fu-goods-simple :info="item"></fu-goods-simple></block>
				  </template>
				  <template v-slot:right="{ rightList }">
				    <block v-for="(item, index) in rightList" :key="item.id"><fu-goods-simple :info="item"></fu-goods-simple></block>
				  </template>
				</fu-waterfall>
			</block>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				MoreListGame:[],
				current:0,
				isShowLoading:false,
				currentPages:1,
				totalPages:1,
				lists:[]
			}
		},
		onLoad() {
				this.gamenearlydepreciategamelist();
		},
		onReachBottom(e) {
			if(this.currentPages < this.totalPages) {
				this.currentPages++;
				this.gamenearlydepreciatelist(false);
			}
		},
		methods:{
			changeTab(e) {
				this.current = e.game_id;
				this.lists = [];
				this.currentPages = 1;
				this.totalPages = 1;
				this.gamenearlydepreciatelist(true);
			},
			gamenearlydepreciategamelist() {
				this.$api.post(global.apiUrls.gamenearlydepreciategamelist).then(res => {
					if(res.data.code == 1) {
						this.MoreListGame = [{
							game_name:'全部',
							game_id:0
						},...res.data.data] || [{
							game_name:'全部',
							game_id:0
						}];
						this.current = 0;
						this.lists = [];
						this.currentPages = 1;
						this.totalPages = 1;
						this.gamenearlydepreciatelist(true);
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			gamenearlydepreciatelist(status) {
				if(status) {
					this.isShowLoading = true;
				}
				this.$api.post(global.apiUrls.gamenearlydepreciatelist,{
					game_id:this.current,
					page:this.currentPages,
					list_rows:15
				}).then(res => {
					if(res.data.code == 1) {
						// currentPages:1,
						// totalPages:1,
						this.totalPages = res.data.data.last_page || 1;
						this.lists = [...this.lists,...res.data.data.data]
					} else {
						this.$message.info(res.data.msg);
					}
					this.isShowLoading = false;
				})
			},
		}
	}
</script>

<style>
	.zuijinPages {

	}
</style>
