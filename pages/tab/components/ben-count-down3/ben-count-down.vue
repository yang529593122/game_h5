<template>
	<view class="countwrap">
		<view class="count-title">{{leftTime}}点场</view>
		<!-- <view class="icon"></view> -->
		<view class="count-down">
			<text class="box">{{h}}</text>
			<text class="tag" >:</text>
			<text class="box">{{m}}</text>
			<text class="tag">:</text>
			<text class="box">{{s}}</text>
		</view>
	</view>
</template>

<script>
	const times = ['00','02','04','06','08','10','12','14','16','18','20','22','24'];
	export default {
		name: 'benCountdown',
		data() {
			return {
				timer: null,
				h: '00',
				m: '00',
				s: '00',
				leftTime: '00',
				seconds: 0,
				test: 7,
			};
		},
		created() {
			clearInterval(this.timer);
			this.init();
		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		methods: {
			// 初始化函数
			init(){
				// console.log("初始化倒计时");
				let date = new Date();
				let _year = date.getFullYear();
				let _month = date.getMonth() + 1;
				let _date = date.getDate();
				let _hour = date.getHours();
				let _index = times.findIndex(item => item > _hour);
				this.leftTime = times[_index - 1];
				let _endCount = times[_index];
				let _endTime = new Date(`${_year}/${_month}/${_date} ${_endCount}:00:00`).getTime();
				// let _endTime = new Date(`${_year}/${_month}/${_date} 11:${this.test}:00`).getTime();
				this.seconds = Math.floor((_endTime - date.getTime())/1000);
				// console.log('倒计时秒',this.seconds);
				this.countDown();
				this.timer = setInterval(() => {
					this.seconds--;
					if(this.seconds < 0){
						this.over();
						return ;
					}
					this.countDown();
				},1000);
			},
			countDown(){
				let seconds = this.seconds;
				let [hour,minute,second] = [0,0,0];
				if(seconds > 0){
					// console.log("计算时间");
					hour = Math.floor(seconds/(60*60));
					minute = Math.floor(seconds/60)-(hour*60);
					second = Math.floor(seconds)-(hour*60*60)-(minute*60);
				}else{
					console.log("结束倒计时");
					this.over();
				}
				if(hour < 10){
					hour = '0'+hour;
				}
				if(minute < 10){
					minute = '0'+minute;
				}
				if(second < 10){
					second = '0'+second;
				}
				this.h = hour;
				this.m = minute;
				this.s = second;
			},
			// 倒计时结束触发函数
			over(){
				clearInterval(this.timer);
				setTimeout(() => {
					this.$emit('refresh');
					this.init();
				},1000);
			},
			refresh(){
				this.timer && clearInterval(this.timer);
				this.timer = null;
				this.init();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.countwrap{
		height: 36rpx;
		border-radius: 20rpx;
		border: 1rpx solid #F02325;
		line-height: 32rpx;
		display: flex;
		.count-title{
			height: 100%;
			padding: 0 4rpx;
			font-size: 20rpx;
			color: #FFFFFF;
			border-radius: 20rpx;
			width: 100rpx;
		text-align: center;
			background: linear-gradient(126deg, #F3180E 0%, #FF6530 100%);
		}
		.icon{
			width: 0;
			height: 0;
			border-width: 16rpx 8rpx 16rpx;
			border-style: solid;
			border-color: transparent transparent transparent #F02325;
		}
		.count-down{
			font-weight:bold;
			padding: 0 16rpx ;
			font-size: 20rpx;
			color: #F02325;
		}
	}
	.tag{
		margin-right: 6rpx;
	}
</style>
