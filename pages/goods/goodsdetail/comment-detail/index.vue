<template>
	<view class="comment">
		<fu-custom :isBack="true" bgColor="bg-white" :isBottom="true">
			<view slot="content">{{i18n['评论详情']}}</view>
		</fu-custom>
		<!-- 用户信息  start -->
		<view class="comment-info">
			<view class="left">
				<view class="user-logo">
					<fu-image radius='50%' :src="commentDetail.head_img" mode="aspectFill"></fu-image>
				</view>
				<view class="cont">
					<view class="user-name">
						{{ commentDetail.user_nickname }}
					</view>
					<view class="start">
						<block v-for="(item,index) in 5" :key="index">
							<image class="block-24"
								:src="index+1 <= commentDetail.star ? require('../../static/stard2.png') : require('../../static/star2.png') "
								mode="aspectFill"></image>
						</block>
					</view>
				</view>
			</view>
			<view class="hour">
				{{ commentDetail.create_time }}
			</view>
		</view>
		<!-- 评价文字描述 start -->
		<view class="contents">
			{{ commentDetail.content }}
		</view>
		<!-- 评价文字描述 end -->
		<view class="padding-top-xs padding-bottom-sm">
			<view class="grid col-1">
				<block v-for="(ele, index) in commentDetail.video" :key="index">
					<view class="padding-lr-32 wrap-box" @tap.stop="previewVideo(ele)">
						<view class="square-wrap">
							<view class="square-box">
								<image :src="ele + '?x-oss-process=video/snapshot,t_1000,f_jpg,w_300,h_300'"
									mode="aspectFill"></image>
								<view class="play-mask"></view>
								<view class="play-btn">
									<view class="play-arrow"></view>
								</view>
							</view>
						</view>
					</view>

				</block>
				<view v-for="(ele, index) in commentDetail.thumb" :key="index">
					<view class="padding-lr-32 wrap-box" @tap.stop="preview(ele, index)">
						<view class="square-wrap">
							<view class="square-box">
								<image :src="ele" lazy-load mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="video-mask" v-if="videoShow">
			<view class="padding-left flex align-center"
				:style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
				<view class="cuIcon-back text-white" style="font-size: 36rpx;" @click.stop="closeVideo"></view>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<video :src="videoSrc" class="myVideo" id="myVideo" :show-fullscreen-btn="false"
				:style="{ height: 'calc(100% - ' + CustomBar + 'px)' }"></video>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<video :src="videoSrc" class="myVideo" id="myVideo" :show-fullscreen-btn="false" :show-mute-btn="true"
				:style="{ height: 'calc(100% - ' + CustomBar + 'px)' }"></video>
			<!-- #endif -->
		</view>
		<!-- 规格 -->
		<view class="sku">
			<view class="left text-sm">
				{{ commentDetail.key_name }}
			</view>
			<view class="right2" @click.stop='fabulous(commentDetail)'>
				<text class="fabulous-num">{{commentDetail.likes_num}}</text>
				<image class="fabulous-icon" v-if='!commentDetail.is_likes' src="../../static/fabulous-fail.png" />
				<image class="fabulous-icon" v-else src="../../static/fabulous-succ.png" />
			</view>
		</view>
		<!-- 分割线 -->
		<view class="lines">
		</view>
		<!-- 回复 -->
		<view class="replay">
			<view class="title">
				<image src="../../static/message2.png" mode=""></image>
				<span>{{ commentList.length }}{{i18n['条回复']}}</span>
			</view>
			<view class="contents" v-if="commentList.length>0">
				<view class="list">
					<view class="item" v-for="(item,i) in commentList" :key="i">
						<view class="info">
							<view class="left">
								<fu-image radius='50%' :src="item.head_img" mode=""></fu-image>
							</view>
							<view class="right">
								<view class="name">
									{{ item.user_nickname }}
								</view>
								<view class="hour">
									{{item.create_time}}
								</view>
							</view>
						</view>
						<view class="desc">
							<view class="empty">
							</view>
							<view class="rep">
								{{item.content}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部回复 -->
		<view class="bomnav solid-top" :style="{bottom:keyboardheight+'px'}">
			<view class="left">
				<image src="../../static/edit.png" mode=""></image>
				<input type="text" maxlength="100" :placeholder="i18n['请输入评论信息']" v-model="content"  placeholder-style="color:#999999" :adjust-position='false' />
			</view>
			<view class="btn" @click="addComment">
				{{i18n['发布']}}
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyboardheight:0,
				videoContext: null,
				videoShow: false,
				videoSrc: '',
				temp: '',
				commentID: "", //评论ID
				commentDetail: {}, //评论详情
				commentList: [], //跟帖者
				content: "", //评论内容
			};
		},
		onLoad(e) {
			this.commentID = e.id;
			console.log(e)
			this.getCommentDetail(e.id);
			  // 监听键盘事件
			  uni.onKeyboardHeightChange((res) => {
        console.log("键盘监听", res);
        this.keyboardheight = res.height;

      });
		},

		methods: {
			fabulous(val) {
				console.log(val)

				//
				this.$api
					.post(global.apiUrls.commentCollection, {
						collect_id: val.id
					})
					.then((res) => {
						this.$message.info(res.data.msg)
						if (res.data.code == 1) {
							  // 更新列表页数据
							  uni.$emit("onPageCommentUpdata", {});
							val.is_likes = !val.is_likes
							if (val.is_likes) {
								val.likes_num++
							} else {
								val.likes_num--
							}
						}
					})
					.catch((err) => {

						console.log(err);
					});
			},
			/**
			 * @event
			 * @description 查看大图
			 * @param {Object} item - 图片的信息
			 * @param {Number} index - 当前图片的索引
			 */
			preview(item, index) {
				uni.previewImage({
					current: index,
					urls: [item],
				});
			},
			/**
	* @event
	* @description 查看视频
	* @param {String} j - 视频路径
	* @param {Number} index - 是第几个视频
	* @param {String} el - 保存当前播放的是哪一个视频的id值+索引
	*/
			previewVideo(ele) {
				console.log('来了老弟', ele)
				this.videoShow = true;
				// 获取 video 上下文 videoContext 对象
				if (this.videoContext) this.videoContext = null;
				this.videoContext = uni.createVideoContext('myVideo', this);
				this.videoSrc = ele;
				// 开始播放
				setTimeout(() => {
					this.videoContext.play();
				}, 200);
			},
			closeVideo() {
				this.videoContext.pause(); //暂停视频播放事件
				this.videoContext.seek(0);
				this.videoShow = false;
			},
			/**
	* @event
	* @description 退出全屏时视频暂停
	*/
			fullscreenchange() {
				let temp = this.temp
				uni.createVideoContext(temp).pause(); //暂停视频播放事件
				uni.createVideoContext(temp).seek(0);
			},
			/**
			 * @event
			 * @description  添加评论
			 * @return {Boolern}
			 * */
			addComment() {
				if (this.content.trim() == "") {
					uni.showToast({
						title: this.i18n["请输入评论内容"],
						mask: true,
						icon: "none",
						duration: 1500
					})
					return
				}
				this.$api
					.post(global.apiUrls.addComment, {
						content: this.content,
						gc_id: this.commentDetail.id
					})
					.then((res) => {
						this.$message.info(res.data.msg)
						if (res.data.code == 1) {
							this.content = "";
							this.getCommentDetail(this.commentID);
						}
					})
					.catch((err) => {

						console.log(err);
					});
			},
			/**
			 * @event
			 * @description  获取评论详情
			 *
			 * */
			getCommentDetail(commentID) {
				this.commentList = [];
				this.$api
					.post(global.apiUrls.postCommentDetails, {
						gc_id: commentID
					})
					.then((res) => {
						if (res.data.code == 1) {
							var data = res.data.data;
							this.commentDetail = data.goods_comment_detail;
							this.commentList = data.goods_comment_reply_list.data ? data.goods_comment_reply_list.data : [];
							console.log(this.commentDetail, this.commentList)
						}
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		background-color: #fff;
	}

	.comment {
		width: 100%;
		height: 100vh;
		margin-bottom: 90rpx;

		.comment-info {
			width: 100%;
			padding: 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;


			.left {
				flex: 1;
				display: flex;

				.user-logo {
					width: 70rpx;
					height: 70rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.cont {
					flex: 1;
					margin-left: 10rpx;

					.user-name {
						width: 300rpx;
						font-size: 28rpx;
						font-weight: 500;
						overflow: hidden;
					}

					.start {
						width: 200rpx;

						image {
							width: 18rpx;
							height: 18rpx;
							margin-right: 1rpx;
						}
					}
				}

			}

			.hour {
				width: 260rpx;
				text-align: right;
				font-size: 24rpx;
				color: #999;
			}
		}

		.contents {
			width: 100%;
			padding: 0 32rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			color: #333;
			font-weight: 400;
			line-height: 44rpx;
			margin: 10rpx 0;
			word-wrap: break-word;
			word-break: break-all;
		}

		.img-box {
			width: 100%;
			padding: 0 20rpx;
			box-sizing: border-box;

			image {
				width: 100%;
				margin-top: 16rpx;
				border-radius: 16rpx;
			}
		}

		.sku {
			width: 100%;
			padding: 20rpx 32rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 20rpx 0;
			color: #999;
			.left {
				flex: 1;

				span {
					font-size: 26rpx;
					color: #999;
				}
			}

			.right {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-left: 10rpx;
				}

				span {
					font-size: 24rpx;
					color: #999;
				}
			}
		}

		.lines {
			width: 100%;
			height: 20rpx;
			background-color: #F1F1F1;
		}

		.replay {
			width: 100%;
			padding: 30rpx 20rpx;
			box-sizing: border-box;
			margin-bottom: 90rpx;
			.title {
				width: 100%;
				padding-bottom: 20rpx;
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #F1F1F1;

				image {
					width: 32rpx;
					height: 32rpx;
				}

				span {
					font-size: 30rpx;
					margin-left: 10rpx;
				}
			}

			.contents {
				width: 100%;

				.list {
					width: 100%;

					.item {
						width: 100%;
						padding: 20rpx 0;
						box-sizing: border-box;

						.info {
							width: 100%;
							display: flex;
							align-items: center;

							.left {
								width: 80rpx;
								height: 80rpx;

								image {
									width: 100%;
									height: 100%;
									border-radius: 50%;
								}
							}

							.right {
								flex: 1;
								margin-left: 10rpx;

								.name {
									font-size: 28rpx;
									color: #333;
									font-weight: 500;
								}

								.hour {
									font-size: 24rpx;
									color: #999;

								}
							}
						}

						.desc {
							width: 100%;
							display: flex;


							.empty {
								width: 90rpx;

							}

							.rep {
								flex: 1;
								line-height: 44rpx;
								word-wrap: break-word;
								word-break: break-all;
								margin-top: 16rpx;
							}
						}
					}

				}
			}
		}




		.bomnav {
			// box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.06);
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			padding-left: 32rpx;
			padding-right: 32rpx;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			left: 0;
			height: 90rpx;
			background-color: #FFFFFF;
			z-index: 9999;
      height: calc(90rpx + constant(safe-area-inset-bottom));
      height: calc(90rpx + env(safe-area-inset-bottom));
      padding-bottom: calc(constant(safe-area-inset-bottom)) !important;
      padding-bottom: calc(env(safe-area-inset-bottom)) !important;
			.left {
				flex: 1;
				display: flex;
				padding: 0 10rpx;
				align-items: center;
				border-radius: 30rpx;
				text-indent: .5rem;
				background-color: #f8f8f8;

				image {
					width: 30rpx;
					height: 30rpx;
				margin-left: 16rpx;

				}

				input {
					flex: 1;
					font-size: 26rpx;
					height: 60rpx;
					line-height: 60rpx;
				}
			}

			.btn {
				width: 104rpx;
                height: 48rpx;
				margin-left: 30rpx;
				color: #fff;
				line-height: 48rpx;
				font-size: 24rpx;
				text-align: center;
				border-radius: 44rpx;
				// background: linear-gradient(to right, #FA2033, #FF6530)
        background: linear-gradient(126deg, #FA2033 0%, #FF6530 100%);
			}
		}
	}

	.square-wrap {
		width: 100%;
		height: 0;
		padding-bottom: 100%;
		box-sizing: border-box;
		position: relative;

		.square-box {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			border-radius: 8rpx;

			image {
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}
		}
	}

	.item:last-child {
		margin-bottom: 88rpx;
		bottom: calc(88rpx + constant(safe-area-inset-bottom));
		bottom: calc(88rpx + env(safe-area-inset-bottom));
	}



	.wrap-box {
		background-color: #ffffff;

		.square-wrap {
			width: 100%;
			height: 0;
			padding-bottom: 100%;
			box-sizing: border-box;
			position: relative;
			margin:12rpx 0;
			.square-box {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				border-radius: 8rpx;

				.play-mask {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 99;
					width: 100%;
					height: 100%;
					background: rgba(255, 255, 255, 0.3);
				}

				.play-btn {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					border: 2rpx solid #ffffff;
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 100;

					.play-arrow {
						width: 0;
						height: 0;
						border-top: 18rpx solid transparent;
						border-left: 30rpx solid #ffffff;
						border-bottom: 18rpx solid transparent;
						margin-left: 8rpx;
					}
				}

				image {
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
					position: relative;
					z-index: 98;
				}
			}
		}
	}

	.video-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #000000;
		z-index: 99999;
	}

	.myVideo {
		width: 750rpx;
	}

	.fabulous-icon {
		width: 24rpx;
		height: 26rpx;
	}

	.fabulous-num {
		margin: 0 10rpx;
	}
	.padding-lr-32{
		padding: 0 32rpx;
	}
</style>
