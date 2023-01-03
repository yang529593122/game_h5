<template>
	<view>
		<view v-if="isEmptyShow" class="page"
			:style="{ 'background-color': model == 'inline' ? '#f8f8f8' : '#f8f8f8' }">
			<!-- 头部 start -->
			<view class="cu-custom bg-white" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
				<view class="cu-bar bg-white fixed"
					:style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
					<view class="action" @tap="back"><text class="cuIcon-back"></text></view>
					<view class="search-form round" style="padding-left: 25rpx;">
						<!-- <text class="cuIcon-search text-999"></text> -->
						<input confirm-type="search" class="text-999" type="text" v-model="keywords"
							:adjust-position="false" :hold-keyboard="false" placeholder-style="color:#999"
							:placeholder="placeholder" @confirm="searchConfirm" />
						<text v-if="keywords.length != 0" class="cuIcon-close text-gray padding-right-xs"
							@tap="handleClear"></text>
					</view>
					<view class="right padding-right">
						<text class="cuIcon-search" style="font-size: 36rpx;" @click="searchConfirm($event,1)"></text>
					</view>
				</view>
			</view>
			<!-- 头部 end -->
			<view class="flex flex-direction justify-center align-center bg-white" style="padding-top: 225rpx;">
				<image src="../../static/empty.png" style="width: 209rpx;height: 207rpx;" mode=""></image>
				<view class="text-center" style="margin-top: 67rpx;font-size: 28rpx;color: #5C707E;">暂无数据</view>
			</view>
			<!-- 断网检测组件 -->
			<fu-notwork></fu-notwork>
		</view>


		<!-- 是否搜索 -->
		<view v-else>
			<view class="bg-white fixed" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
				<view class="bg-white fixed flex align-center" style="padding: 0 30rpx;"
					:style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
					<view class="action" @tap="back"><text class="cuIcon-back"></text></view>
					<view class="flex align-center">
						<view class="" style="width: 64rpx;height: 64rpx;margin-left: 24rpx;">
							<fu-image radius="32" :src="game_logo"></fu-image>
						</view>
						<view class="" style="margin-left: 24rpx;font-size: 28rpx;
font-family: PingFang SC;
font-weight: 500;
color: #36373D;">{{game_name}}</view>
					</view>
					<view>

					</view>
				</view>
			</view>
			<view style="height: 25rpx;" class="bg-white"></view>
			<view style="padding: 0 24rpx;height: 72rpx;position: relative;" class="flex align-center bg-white">
				<view style="width: 100%;" class="flex justify-between align-center">
					<view @click="openGramSelect"
						style="height: 72rpx;background: #F8F8F8;width: 630rpx;padding: 0 24rpx;font-size: 28rpx;font-weight: 500;color: #868686;"
						class="flex align-center justify-between">
						<view class="text-333" v-if="currentSelectGameName">{{currentSelectGameName}}</view>
						<view v-else>请选择游戏大区</view>
						<view style="width: 40rpx;height: 40rpx;">
							<image src="/static/home/bottom.png" v-if="showSelector"
								style="width: 40rpx;height: 40rpx;transform: rotate(180deg);" mode=""></image>
							<image src="/static/home/bottom.png" style="width: 40rpx;height: 40rpx;" v-else mode="">
							</image>
						</view>
					</view>
					<view class="flex flex-direction justify-center align-center" @click="changeopenShaixuan()">
						<image src="../../static/shaixuan.png" style="width: 32rpx;height: 32rpx;"></image>
						<text class="text-sm" style="color: #36373D;">筛选</text>
					</view>
				</view>
				<!-- 选择游戏 start -->
				<view class="dropSelectMask" style="" v-if="showSelector">
					<scroll-view scroll-y="true" style="width: 630rpx;height: 300rpx;">
						<view @click="changeAreaSelect(item)" v-for="(item,index) in area_list" :key="index"
							style="width: 630rpx;font-size: 14px;height: 36px;line-height:36px;padding: 0 24rpx;">
							{{item.area_name}}</view>
					</scroll-view>


				</view>
				<!-- 选择游戏 end -->
			</view>
			<!-- 筛选 -->
			<view>
				<fu-filter-dropdown :top="CustomBar" @changeLayout="changeLayout" @changeFilter="changeFilter"
					:filterKeyword="keywords" ref="childMethod" :cid="cid"></fu-filter-dropdown>
			</view>
			<!-- loading组件 -->
			<fu-loading v-if="isShowLoading"></fu-loading>
			<block v-else>
				<!--商品列表 start-->
				<view class="list" style="background: #f8f8f8;" :class="[model == 'inline' ? 'padding-lr-24' : 'padding-lr-4']">
					<view v-if="model == 'inline'" >
						<view style="height: 20rpx;"></view>
						<block v-for="item in lists" :key="item.id">
							<view class="solid-bottom fu-goods-line bg-white" @click.stop="navToDetail(item)">
								<view class="block-246 margin-right-sm">
									<fu-image :src="item.cover_images[0]" mode="aspectFill"></fu-image>
								</view>
								<view class="content">
									<view>
										<view class="text-df text-333 text-cut-2">
											<text v-if="item.is_bao == 1">[{{'包赔'}}]</text>
											<text v-if="item.is_bao === 0">[{{'押证包安'}}]</text>
											{{ item.goods_name }}
										</view>
										<view style="font-size: 20rpx;color: #868686;margin-top: 6rpx;" class="text-cut">区服：{{item.area_name}}</view>
									</view>
									<view class="flex justify-between align-center">
										<view style="font-size: 20rpx;color: #868686;margin-top: 6rpx;" class="text-cut">发布时间：{{item.create_time}}</view>
										<view class="text-lg" style="color: #F55B29;">￥{{item.price}}</view>
										
									</view>
								</view>
							</view>
						</block>
					</view>
					<view v-else class="padding-top" style="background: #f8f8f8;">
						<fu-waterfall v-model="lists">
							<template v-slot:left="{ leftList }">
								<block v-for="(item, index) in leftList" :key="item.id">
									<fu-goods-simple :info="item"></fu-goods-simple>
								</block>
							</template>
							<template v-slot:right="{ rightList }">
								<block v-for="(item, index) in rightList" :key="item.id">
									<fu-goods-simple :info="item"></fu-goods-simple>
								</block>
							</template>
						</fu-waterfall>
					</view>
				</view>
				<!--商品列表 end-->
				<!-- 悬浮按钮 -->

				<!-- 空布局 -->
				<fu-empty-ui v-if="lists.length == 0 "></fu-empty-ui>
				<!-- 加载状态 -->
				<!-- <uni-load-more v-if="lists.length > 5" :status="status"></uni-load-more> -->
			</block>
		</view>
		<!-- 是否搜索 -->


		<!-- 打开黑色弹窗 start -->
		<view class="openBlackPopup" v-if="openBlackPopup">
			<view class="bg-white" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
				<view class="bg-white fixed flex align-center" style="padding: 0 30rpx;"
					:style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
					<view class="action" @tap="back"><text class="cuIcon-back"></text></view>
					<view class="flex align-center">
						<view class="" style="width: 64rpx;height: 64rpx;margin-left: 24rpx;">
							<fu-image radius="32" :src="game_logo"></fu-image>
						</view>
						<view class="" style="margin-left: 24rpx;font-size: 28rpx;
		 font-family: PingFang SC;
		 font-weight: 500;
		 color: #36373D;">{{game_name}}</view>
					</view>
					<view>

					</view>
				</view>
			</view>
			<view style="height: 25rpx;" class="bg-white"></view>
			<view style="padding: 0 24rpx;height: 72rpx;position: relative;top:-2rpx;"
				class="flex align-center bg-white">
				<view style="width: 100%;" class="flex justify-between align-center">
					<view @click="openGramSelect"
						style="height: 72rpx;background: #F8F8F8;width: 630rpx;padding: 0 24rpx;font-size: 28rpx;font-weight: 500;color: #868686;"
						class="flex align-center justify-between">
						<view class="text-333" v-if="currentSelectGameName">{{currentSelectGameName}}</view>
						<view v-else>请选择游戏大区</view>
						<view style="width: 40rpx;height: 40rpx;">
							<image src="/static/home/bottom.png" v-if="showSelector"
								style="width: 40rpx;height: 40rpx;transform: rotate(180deg);" mode=""></image>
							<image src="/static/home/bottom.png" style="width: 40rpx;height: 40rpx;" v-else mode="">
							</image>
						</view>
					</view>
					<view class="flex flex-direction justify-center align-center" @click.stop="changeopenShaixuan()">
						<image src="../../static/shaixuan.png" style="width: 32rpx;height: 32rpx;"></image>
						<text class="text-sm" style="color: #36373D;">筛选</text>
					</view>
				</view>
				<!-- 选择游戏 start -->
				<view class="dropSelectMaskRadus" style="" v-if="showSelectorShaixuan">
					<scroll-view scroll-y="true" style="width: 750rpx;height: 400rpx;">
						<view style="width: 750rpx;" v-for="(item,index) in attr_list" :key="index">
							<view style="padding: 40rpx 24rpx 24rpx;color: #36373D;" class="text-lg text-weight-500">
								{{item.attr_name}}</view>
							<view style="padding: 0 24rpx;" class="flex align-center flex-wrap">
								<view :class="[it.is_select ? 'shifouxuanzhongfou' : 'shifouxuanzhongshi']"
									@click="changeAttrInfo(index,idx)" v-for="(it,idx) in item.values">{{it.value}}
								</view>
								<!-- <view class="">否</view> -->
							</view>
						</view>

					</scroll-view>
					<view class="flex align-center justify-between" style="padding: 30rpx 24rpx;">
						<view class="flex align-center justify-center" style="width: 290rpx;
						 height: 80rpx;
						 background: #E9EEF1;border-radius: 4rpx;font-size: 32rpx;
						 font-family: PingFang SC;
						 font-weight: 500;color: #36373D;" @click.stop="chongzhiAttrInfo">重置</view>
						<view class="flex align-center justify-center" style="width: 380rpx;
						 					 height: 80rpx;
						 					 background: #295B7B;border-radius: 4rpx;font-size: 32rpx;
						 					 font-family: PingFang SC;
						 					 font-weight: 500;color: #fff;" @click.stop="confirmShaixuanInfo">确定</view>
					</view>
				</view>
				<!-- 选择游戏 end -->
			</view>
			<view class="bg-white" style="height: 20rpx;margin-top:-4rpx ;"></view>
		</view>
		<!-- 打开黑色弹窗 end -->

	</view>
</template>
<script>
	// 基础筛选与高级筛选组件
	import fuFilterDropdown from '../../components/fu-filter-dropdown/fu-filter-dropdown.vue';
	import uniDataSelect from '../../components/uni-data-select/uni-data-select.vue'
	export default {
		components: {
			fuFilterDropdown,
			uniDataSelect
		},
		data() {
			return {
				timer: null, // 定时器
				type: 1, // 悬浮按钮状态 1 页码 2 返回顶部
				isShow: false, //是否显示按钮
				totalSize: 0, // 悬浮按钮总页码
				currentPage: 1, // 当前页页码
				isShowLoading: true, // 是否显示loading
				keywords: '', // 搜索的文本
				placeholder: '搜索游戏名称／商品编号／关键字', // 默认文本
				model: 'block', // 布局样式
				lists: [], // 结果列表
				cid: '', // 分类id(点击分类跳转过来必传)
				isInit: false, // 是否请求过数据
				status: 'more', // 加载状态
				page: 1, // 页数
				size: 10, // 页条数
				sorts: '1', // 条件
				// order: 'asc', // 排序 asc: 正序 desc: 倒序
				order: 0, // 排序 asc: 正序 desc: 倒序
				advancedSearch: null, // 高级搜索对象
				isEmptyShow: false,
				currentSelectGameName: '',
				showSelector: false,
				showSelectorShaixuan: false,
				openBlackPopup: false,
				gameId: 0,
				game_name: '',
				game_logo: '',
				area_list: [],
				area_name: '', //区服名字
				area_id: '', //区服id
				attr_list: [], //附加属性列表
			};
		},

		onLoad(options) {
			console.log(options, '搜索参数');
			/***
			 * @keyWords 关键词
			 * @cid 分类id
			 **/
			const {
				keyWords = '', cid = '', gameId = ''
			} = options;
			if (keyWords) {
				this.keywords = keyWords;
			}
			if (gameId) {
				this.gameId = gameId;
				this.gamegameinfo();
				this.gamegamefiltratelist();
			}
			if (cid != '') {
				this.cid = cid;
			}
			// this.handleSearch(); // 搜索方法
			// this.gamegamegoodslist();
		},
		onReachBottom() {
			// this.handleSearch(); // 搜索方法
			console.log('触底了')
			if(this.currentPage < this.totalSize) {
				this.gamegamegoodslist();
			}
			
		},
		methods: {
			gamegamegoodslist() {
				if (this.page == 1) {
					this.isShowLoading = true;
				}
				// if (this.status != 'more') return;
				// this.status = 'loading';
				let requestParams = {
					goods_name: this.keywords, //搜索字
					game_id: this.gameId, //游戏id
					order: this.order, //0综合 1时间正序 2时间倒叙 3价格正序 4价格倒叙
					page: this.page,
					list_rows: this.size,
				}
				if (this.area_id) {
					requestParams.area_id = this.area_id //大区id
				}
				if (this.attr_list.length) {
					let attr_values = [];
					let multiset = [];
					this.attr_list.forEach((i, j) => {
						if (i.type == 1) {
							i.values.forEach(k => {
								if (k.is_select) {
									let everyValue = '' + i.id + '-' + k.id;
									attr_values.push(everyValue)
								}
							})
						}

						if (i.type == 2 || i.type == 3) {
							i.values.forEach(k => {
								if (k.is_select) {
									requestParams[i.param_name] = k.value;
								}
							})
						}
						
						if(i.type == 4) {
							// let everylet = '' + i.id + '-';
							i.values.forEach(k => {
								if (k.is_select) {
									// requestParams[i.param_name] = k.value;
									let everylet = '' + i.id + '-' + k.id;
									 // += (k.id + ',')
									multiset.push(everylet)
								}
							})
							
						}
					})
					// console.log(multiset.join(';'));
					if(multiset.length) {
						requestParams.multiset = multiset.join(',');
					}
					// return;
				// requestParams.multiset = 	
					if (attr_values.length) {
						requestParams.attr_values = attr_values.join(',');
					} else {
						requestParams.attr_values = '';
					}
				}
				this.$api.post(global.apiUrls.gamegamegoodslist, requestParams).then(res => {
					if (res.data.code == 1) {
						let totalSize = res.data.data.total;
						this.totalSize = Math.ceil(totalSize / 10); // 悬浮按钮总页码
						this.currentPage = this.page; //悬浮当前页面
						// console.log(res.data.data);
						let list = res.data.data.data;
						if (this.page == 1) this.lists = [];
						this.lists = this.lists.concat(list);
						// console.log(this.lists);
						if (this.lists.length >= totalSize) {
							// this.status = 'noMore';
						} else {
							// this.status = 'more';
							this.page++;
						}
						this.isInit = true;
					} else {
						this.$message.info(res.data.msg);
					}
					this.isShowLoading = false;
				})
			},
			confirmShaixuanInfo() {
				console.log('点击了')
				console.log(this.showSelectorShaixuan);
				
				this.showSelectorShaixuan = false;
				// this.showSelectorShaixuan = false;
				this.showSelector = false;
				this.openBlackPopup = false;
				this.page = 1;
				this.gamegamegoodslist()
			},
			changeAttrInfo(index, idx) {
				this.attr_list.forEach((i, j) => {
					if (j == index) {
						if(this.attr_list[j].type == 4) {
							i.values.forEach((l, k) => {
								// l.is_select = false;
								if(k == idx) {
									this.$set(this.attr_list[j].values[k], 'is_select', !this.attr_list[j].values[k].is_select)
								}
								// console.log(l)
							})
							console.log('进来了')
						} else {
							console.log('没111进来了')
							i.values.forEach((l, k) => {
								// l.is_select = false;
								this.$set(this.attr_list[j].values[k], 'is_select', false)
							})
						}
						
					}
				})
				if(this.attr_list[index].type == 4) {
					
				} else {
					this.$set(this.attr_list[index].values[idx], 'is_select', !this.attr_list[index].values[idx].is_select)
				}
			},
			chongzhiAttrInfo() {
				this.attr_list.forEach((i, j) => {
					// if(j == index) {
					i.values.forEach((l, k) => {
						// l.is_select = false;
						this.$set(this.attr_list[j].values[k], 'is_select', false)
					})
					// }
				})
			},
			changeAreaSelect(item) {
				this.currentSelectGameName = item.area_name;
				this.area_id = item.id;
				this.showSelector = !this.showSelector;
				this.page = 1;
				this.lists = [];
				this.gamegamegoodslist();
			},
			gamegamefiltratelist() {
				this.$api.post(global.apiUrls.gamegamefiltratelist, {
					game_id: this.gameId,
					client_type: 2
				}).then(res => {
					if (res.data.code == 1) {
						this.area_list = res.data.data.area_list;
						this.attr_list = res.data.data.attr_list;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			gamegameinfo() {
				this.$api.post(global.apiUrls.gamegameinfo, {
					game_id: this.gameId
				}).then(res => {
					if (res.data.code == 1) {
						this.game_name = res.data.data.game_name;
						this.game_logo = res.data.data.logo;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			changeopenShaixuan() {
				this.showSelector = false;
				this.openBlackPopup = !this.openBlackPopup;
				// this.showSelectorShaixuan = !this.showSelectorShaixuan;
				this.showSelectorShaixuan = true;
			},
			changeshowSelectorShaixuan() {
				this.openBlackPopup = false;
				// this.showSelectorShaixuan = !this.showSelectorShaixuan;
			},
			openGramSelect() {
				this.openBlackPopup = false;
				this.showSelector = !this.showSelector;
			},
			/**
			 * @event
			 * @description 去商品详情
			 */
			navToDetail(item) {
				this.$urouter.navigateTo({
					url: '/pages/goods/goodsdetail/goods-detail/index',
					params: {
						sku_id: item.sku_id || 0,
						goods_id: item.id
					}
				});
			},
			/**
			 * @description 切换布局
			 * @param {Object} e inline和block布局切换
			 */
			changeLayout(e) {
				this.model = e;
			},
			/**
			 * @description 切换搜索条件
			 * @param {Object} type 条件
			 * @param {Object} order  排序 asc: 正序 desc: 倒序
			 * @param {Object} advancedSearch 高级搜索对象
			 */
			changeFilter(type, order, advancedSearch) {
				// this.sorts = ++type;
				// this.order = order;
				this.page = 1;
				this.status = 'more';
				// this.scrollInfo = []; // 清空楼层数量
				// console.log(type)
				// console.log(order)
				if (type === 0) {
					this.order = 0;
				}

				if (type === 1 && order == 'asc') {
					// 时间正序
					this.order = 1;
				}

				if (type === 1 && order == 'desc') {
					// 时间倒叙
					this.order = 2;
				}

				if (type === 2 && order == 'asc') {
					// 时间正序
					this.order = 3;
				}

				if (type === 2 && order == 'desc') {
					// 时间倒叙
					this.order = 4;
				}

				this.gamegamegoodslist();
				console.log(this.order)
				// 判断高级搜索存在
				// if (advancedSearch) {
				//   this.advancedSearch = advancedSearch;
				// }
				// console.log(advancedSearch);
				// this.handleSearch();
				this.$nextTick(() => {
					// 切换条件回到底部
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 0
					});
				});
			},
			/**
			 * @description 切换搜索条件
			 * @param {Object} e input框事件源
			 */
			searchConfirm(e, type) {
				console.log(e, type)
				if (type == 1) {
					if (this.keywords.trim() == '') {
						this.$message.info(this.i18n['请输入要搜索的内容']);
						return;
					}
				} else {
					if (e && e.detail.value.trim() == '') {
						this.$message.info(this.i18n['请输入要搜索的内容']);
						return;
					}
				}

				// this.cid = 0;
				this.page = 1;
				this.status = 'more';
				this.scrollInfo = []; // 清空楼层数量
				if (this.$refs.childMethod) {
					// this.$refs.childMethod.resetPop();
					this.advancedSearch = {
						goods_cid: '',
						brand_id: '',
						sku_id: '',
						service_lable_id: '',
						min_price: '',
						max_price: ''
					};
				}
				this.handleSearch();
				uni.hideKeyboard();
			},
			/**
			 * @func 搜索
			 */
			handleSearch() {
				if (this.status != 'more') return;
				this.status = 'loading';
				let data = {
					type: 7,
					sort: this.sorts,
					order: this.order,
					page: this.page,
					list_rows: this.size,
					goods_cid: this.cid
				};
				//判断是否有高级搜索
				if (this.advancedSearch) {
					data.brand_id = this.advancedSearch.brand_id;
					data.sku_id = this.advancedSearch.sku_id;
					// data.goods_cid = this.advancedSearch.goods_cid;
					data.service_lable_id = this.advancedSearch.service_lable_id;
					data.min_price = this.advancedSearch.min_price;
					data.max_price = this.advancedSearch.max_price;
				}
				console.log(data, '判断是否有高级搜索');
				// 判断关键字或者placeholder内容
				if (this.placeholder.trim() || this.keywords.trim()) {
					data.keyword = this.keywords;
					this.addHistory(this.keywords.trim());
				}
				// if(this.keywords.trim() == ''){
				//   this.$message.info("请输入搜索关键字");
				//   this.lists=[];
				//   return
				// }
				// 判断cid是否存在
				if (this.cid) {
					data.cid = this.cid;
				}
				console.log('search data', data);
				if (this.page == 1) {
					this.isShowLoading = true;
				}
				// 获取商品列表接口
				this.$api
					.get(global.apiUrls.getGoodsGetGoodsList, data)
					.then(res => {
						this.isShowLoading = false;
						console.log('搜索结果', res);
						if (res.data.code == 1) {
							let totalSize = res.data.data.total;
							this.totalSize = Math.ceil(totalSize / 10); // 悬浮按钮总页码
							this.currentPage = this.page; //悬浮当前页面
							console.log(res.data.data);
							let list = res.data.data.data;
							if (this.page == 1) this.lists = [];
							this.lists = this.lists.concat(list);
							console.log(this.lists);
							if (this.lists.length >= totalSize) {
								this.status = 'noMore';
							} else {
								this.status = 'more';
								this.page++;
							}
							this.isInit = true;
						} else {
							this.$message.error(res.data.msg);
						}
					})
					.catch(err => {
						this.isShowLoading = false;
					});
			},
			// 清除关键字
			handleClear() {
				this.keywords = '';
				this.page = 1;
				this.status = 'more';
				this.advancedSearch = false;
				this.scrollInfo = []; // 清空楼层数量
				if (this.$refs.childMethod) {
					// this.$refs.childMethod.resetPop();
					this.advancedSearch = {
						goods_cid: '',
						brand_id: '',
						sku_id: '',
						service_lable_id: '',
						min_price: '',
						max_price: ''
					};
				}
				// this.handleSearch();
				uni.hideKeyboard();
			},
			// 返回
			back() {
				uni.navigateBack();
			},
			/**
			 * @description 增加一条搜索历史记录
			 * @param {Object} value 关键词
			 */
			addHistory(value) {
				if (!value) return;
				let _history = uni.getStorageSync('SEARCHHISTORY');
				if (!_history) {
					_history = [];
				}
				_history.unshift(value);
				let history = [...new Set(_history)];
				uni.setStorageSync('SEARCHHISTORY', history);
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		background: #f8f8f8;
	}

	.page {
		min-height: 100%;
		background: #f8f8f8;
	}

	.head-top {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}

	.nav-bar-wrap {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}

	.sort-wrap {
		position: fixed;
		left: 0;
		right: 0;
	}

	.height-100 {
		height: 100rpx;
	}

	.block-180 {
		width: 180rpx;
		min-width: 180rpx;
		height: 180rpx;
		min-height: 180rpx;
		position: relative;

		image {
			width: 100%;
			height: 100%;
			border-radius: 8rpx;
		}

		.null {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			border-radius: 8rpx;
			background-color: rgba(0, 0, 0, 0.45);
			color: #ffffff;
			font-size: 36rpx;
			text-align: center;
			line-height: 180rpx;
		}
	}

	.list-item+.list-item {
		border-top: 1rpx solid #eeeeee;
	}

	.overlay-animate {
		position: fixed;
	}

	.float-action {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		// background-color: rgba(165, 165, 165, .85);
		position: fixed;
		right: 20rpx;
		bottom: 280rpx;
		z-index: 996;
		border: 1rpx solid #cccccc;

		.cuIcon-cart {
			color: #cccccc;
		}
	}

	.animate {
		position: fixed;
		border-radius: 50%;
		z-index: 995;
		transform-origin: 50% 50%;
		transition: transform linear 0.5s, left linear 0.5s, top cubic-bezier(0.3, -0.2, 1, 0) 0.5s !important;

		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
	}

	// 商品卡片line
	.fu-goods-line {
		/* min-height: 570rpx; */
		padding: 24rpx;
		border-radius: 24rpx;
		overflow: hidden;
		/* background-color: #ffffff; */
		// margin-top: 20rpx;
		margin-bottom: 20rpx;
		display: flex;

		.block-246 {
			width: 172rpx;
			height: 172rpx;
			border-radius: 6rpx;
			background-color: #eeeeee;

			image {
				width: 100%;
				height: 100%;
				border-radius: 6rpx;
			}
		}

		.content {
			flex: 1;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}

	// 商品卡片block
	.fu-goods-block {
		overflow: hidden;
		margin-bottom: 20rpx;
		padding: 0 10rpx;

		.wrap-box {
			background-color: #ffffff;
			border-radius: 16rpx;

			.square-wrap {
				width: 100%;
				height: 0;
				padding-bottom: 100%;
				box-sizing: border-box;
				position: relative;

				.square-box {
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					bottom: 0;
					border-radius: 24rpx 24rpx 0 0;

					image {
						width: 100%;
						height: 100%;
						border-radius: 24rpx 24rpx 0 0;
					}
				}
			}

			.image {
				width: 100%;
				border-radius: 24rpx 24rpx 0 0;
			}
		}

		.content {
			padding: 20rpx;
		}
	}

	.item-activity-label {
		padding: 2rpx 5rpx;
		/* margin: 5rpx; */
		font-size: 24rpx;
		border-radius: 6rpx;
		border: 1px solid;
		margin: 0rpx 1px 0px;
		display: inline-block;
		transform: scale(0.8);
	}

	.padding-lr-24 {
		padding: 0 24rpx;
	}

	.padding-lr-4 {
		padding: 0 4rpx;
	}

	.search-form {
		margin-left: 12rpx;
	}

	.item-goods-label {
		padding: 2rpx 8rpx;
		color: #ff6464;
		font-size: 24rpx;
		margin-right: 6rpx;
		background: rgba(255, 100, 100, 0.1);
		/* opacity: 0.1; */
		border-radius: 4rpx;
	}

	.item-activity-label {
		padding: 0 8rpx;
		height: 32rpx;
		line-height: 30rpx;
		border: 1px solid #fa2033;
		opacity: 1;
		border-radius: 4rpx;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #fa2033;
		margin-right: 16rpx;

		&:nth-of-type(1) {
			border: 1px solid #0a7ce6;
			color: #0a7ce6;
		}
	}

	.sales-number {
		margin-top: 16rpx;
	}

	.through-price {
		margin-left: 16rpx;
		color: #bfbfbf;
	}

	.dropSelectMask {
		position: absolute;
		top: 72rpx;
		width: 630rpx;
		left: 24rpx;
		background: #ffffff;
		border-radius: 6px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		z-index: 999999999999;
	}

	.dropSelectMaskRadus {
		position: absolute;
		top: 72rpx;
		width: 750rpx;
		left: 0rpx;
		height: 600rpx;
		background: #ffffff;
		// border-radius: 6px;
		// box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		z-index: 999999999999;
	}

	.openBlackPopup {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.7);
		z-index: 999999999999999999999999999;
	}

	.shifouxuanzhongfou {
		min-width: 124rpx;
		height: 64rpx;
		background: #295B7B;
		border-radius: 4rpx;
		padding: 0 20rpx;
		text-align: center;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 28rpx;
		margin-right: 24rpx;
		margin-bottom: 24rpx;
	}

	.shifouxuanzhongshi {
		min-width: 124rpx;
		height: 64rpx;
		padding: 0 20rpx;
		background: #F8F8F8;
		border-radius: 4rpx;
		text-align: center;
		line-height: 64rpx;
		color: #36373D;
		font-size: 28rpx;
		margin-bottom: 24rpx;
		margin-right: 24rpx;
	}
</style>
