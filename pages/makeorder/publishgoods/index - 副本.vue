<template>
	<view class="publishGoodsPages">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				发布商品
			</view>
		</fu-custom>

		<view style="padding: 16rpx 24rpx 40rpx;" class="flex align-center bg-white justify-between">
			<view class="flex align-center">
				<view style="width: 128rpx;height: 128rpx;">
					<fu-image :src="goodsInfo.game_logo"></fu-image>
				</view>
				<view class="flex flex-direction justify-between"
					style="padding: 15rpx 0;margin-left: 32rpx;height: 128rpx;">
					<view class="text-lg text-weight-500 text-cut" style="width: 250rpx;color: #36373D;">
						{{goodsInfo.game_name}}</view>
					<view class="text-sm" style="color: #868686;">{{goodsInfo.area_name}} / {{goodsInfo.service_name}} </view>
				</view>
			</view>

			<view class="flex align-center justify-center" @click="gotoBack" style="width: 171rpx;
height: 48rpx;
background: #659BC7;border-radius: 26rpx;">
				<image src="../static/100.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
				<view class="text-sm text-white">重新修改</view>
			</view>
			<!-- <view style="margin-left: 32rpx;color: #36373D;" class="text-lg text-weight-500">天龙八部怀旧服</view> -->
		</view>

		<!-- 平台回收 -->
		<block v-if="type == 1">
			<view @click="openShowSource" class="bg-white flex align-center justify-between"
				style="height: 80rpx;width: 702rpx;border-radius: 4rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;margin-top: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">账号来源</text>
				</view>
				<view style="position: relative;width: 300rpx;height: 80rpx;">
					<view class="flex align-center justify-end" style="width: 300rpx;height: 80rpx;">
						<input placeholder="请选择游戏账号来源" v-model="gamesource" disabled="true" class="text-right"
							placeholder-style="color: #B7BAC2;font-size:28rpx" style="width: 250rpx;" />
						<image src="/static/my/arr.png" style="width: 24rpx;height: 20rpx;margin-left: 15rpx;"
							mode="aspectFit"></image>
					</view>
			
					<view class="bg-white" v-if="isShowSource"
						style="position: absolute;width: 300rpx;top: 80rpx;left: 0;height: 300rpx;z-index: 99999999999;">
						<scroll-view scroll-y="true" style="width: 300rpx;height: 300rpx;">
							<view style="height: 32px;line-height: 32px;" class="text-center" @click="laiyuanSelectTwo(item)" :key="index" v-for="(item,index) in source">{{item.name}}
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			
			<block v-for="(item,index) in attr_list">
				<!-- 下拉框 -->
				<view :key="index" v-if="item.type === 1" @click="openShowAttrList(index)" class="bg-white flex align-center justify-between"
					style="height: 80rpx;width: 702rpx;border-radius: 4rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;margin-top: 16rpx;">
					<view class="flex align-start">
						<text class="text-df" style="color: #DA1715;" v-if="item.is_must == 1">*</text>
						<text class="text-df" style="color: #19212D;">{{item.attr_name}}</text>
					</view>
					<view style="position: relative;width: 300rpx;height: 80rpx;">
						<view class="flex align-center justify-end" style="width: 300rpx;height: 80rpx;">
							<input v-model="item.selectContent" :placeholder="'请选择' + item.attr_name" disabled="true" class="text-right"
								placeholder-style="color: #B7BAC2;font-size:28rpx" style="width: 250rpx;" />
							<image src="/static/my/arr.png" style="width: 24rpx;height: 20rpx;margin-left: 15rpx;"
								mode="aspectFit"></image>
						</view>
				
						<view class="bg-white" v-if="item.isOpen"
							style="position: absolute;width: 300rpx;top: 80rpx;left: 0;max-height: 300rpx;z-index: 99999999999;">
							<scroll-view scroll-y="true" style="width: 300rpx;max-height: 300rpx;">
								<view style="height: 32px;line-height: 32px;" class="text-center" @click.stop="selectTwoValue(index,idx)" v-for="(it,idx) in item.values">{{it.value}}
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
				<!-- 加减 -->
				<view :key="index" v-if="item.type === 2" class="bg-white flex align-center justify-between"
					style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
					<view class="flex align-start">
						<text class="text-df" style="color: #DA1715;" v-if="item.is_must == 1">*</text>
						<text class="text-df" style="color: #19212D;">{{item.attr_name}}</text>
					</view>
					<view class="flex align-center text-df " style="color: #36373D;">
						<image @click="addjianNum(index,'-')" src="../static/1.png" style="width: 24rpx;height: 24rpx;margin-right: 16rpx;" mode="aspectFit">
						</image>
						<input @input="inputContent(item)" :placeholder="'请输入' + item.attr_name" v-model="item.num" type="number" class="text-center" placeholder-style="color: #B7BAC2;font-size:28rpx"
							style="margin-right: 15rpx;width: 200rpx;" />
						<image  @click="addjianNum(index,'+')" src="../static/2.png" style="width: 24rpx;height: 24rpx;margin-left: 16rpx;" mode=""></image>
					</view>
				</view>
			</block>
			
			
			
			<!-- 固定项 -->
			<!-- 游戏账号
				game_accout : '',//游戏账号
				game_password:'' ,//游戏密码
				role_id:'',// 角色id
				mobile:'',// 手机号码
				 qqNum:'',// qq号码
				 wechat:'',//微信账号
			 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">游戏账号：</text>
				</view>
				<input placeholder="请填入" v-model="game_accout" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>
			
			<!-- 游戏密码
				game_accout : '',//游戏账号
				game_password:'' ,//游戏密码
				role_id:'',// 角色id
				mobile:'',// 手机号码
				 qqNum:'',// qq号码
				 wechat:'',//微信账号
			 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">游戏密码：</text>
				</view>
				<input placeholder="请填入" v-model="game_password" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>
			
			<!-- 角色 
				game_accout : '',//游戏账号
				game_password:'' ,//游戏密码
				role_id:'',// 角色id
				mobile:'',// 手机号码
				 qqNum:'',// qq号码
				 wechat:'',//微信账号
			-->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">角色ID：</text>
				</view>
				<input placeholder="请填入" v-model="role_id" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>
			
			<!-- 手机号码
				game_accout : '',//游戏账号
				game_password:'' ,//游戏密码
				role_id:'',// 角色id
				mobile:'',// 手机号码
				 qqNum:'',// qq号码
				 wechat:'',//微信账号
			 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">手机号码：</text>
				</view>
				<input placeholder="请填入" v-model="mobile" maxlength="11" type="number" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>
			
			<!-- qq号码
				game_accout : '',//游戏账号
				game_password:'' ,//游戏密码
				role_id:'',// 角色id
				mobile:'',// 手机号码
				 qqNum:'',// qq号码
				 wechat:'',//微信账号
			 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">qq号码：</text>
				</view>
				<input placeholder="请填入" maxlength="20" v-model="qqNum" type="number" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>
			
			<!-- 微信号码
				game_accout : '',//游戏账号
				game_password:'' ,//游戏密码
				role_id:'',// 角色id
				mobile:'',// 手机号码
				 qqNum:'',// qq号码
				 wechat:'',//微信账号
			 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">微信号码：</text>
				</view>
				<input placeholder="请填入" maxlength="25" v-model="wechat" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #19212D;">推荐码</text>
				</view>
				<input placeholder="请输入推荐码" v-model="introducer_no" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>
		</block>
		<!-- 平台代售 -->
		<block v-if="type == 2">
			<view style="padding: 40rpx 24rpx 24rpx;color: #19212D;" class="text-lg text-weight-500">第一步：商品信息</view>
			<view @click="openShowSource" class="bg-white flex align-center justify-between"
				style="height: 80rpx;width: 702rpx;border-radius: 4rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">账号来源</text>
				</view>
				<view style="position: relative;width: 300rpx;height: 80rpx;">
					<view class="flex align-center justify-end" style="width: 300rpx;height: 80rpx;">
						<input placeholder="请选择游戏账号来源" v-model="gamesource" disabled="true" class="text-right"
							placeholder-style="color: #B7BAC2;font-size:28rpx" style="width: 250rpx;" />
						<image src="/static/my/arr.png" style="width: 24rpx;height: 20rpx;margin-left: 15rpx;"
							mode="aspectFit"></image>
					</view>
			
					<view class="bg-white" v-if="isShowSource"
						style="position: absolute;width: 300rpx;top: 80rpx;left: 0;height: 300rpx;z-index: 99999999999;">
						<scroll-view scroll-y="true" style="width: 300rpx;height: 300rpx;">
							<view style="height: 32px;line-height: 32px;" class="text-center" @click="laiyuanSelectTwo(item)" v-for="(item,index) in source">{{item.name}}
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			
			<block v-for="(item,index) in attr_list">
				<!-- 下拉框 -->
				<view :key="index" v-if="item.type === 1" @click="openShowAttrList(index)" class="bg-white flex align-center justify-between"
					style="height: 80rpx;width: 702rpx;border-radius: 4rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;margin-top: 16rpx;">
					<view class="flex align-start">
						<text class="text-df" style="color: #DA1715;" v-if="item.is_must == 1">*</text>
						<text class="text-df" style="color: #19212D;">{{item.attr_name}}</text>
					</view>
					<view style="position: relative;width: 300rpx;height: 80rpx;">
						<view class="flex align-center justify-end" style="width: 300rpx;height: 80rpx;">
							<input v-model="item.selectContent" :placeholder="'请选择' + item.attr_name" disabled="true" class="text-right"
								placeholder-style="color: #B7BAC2;font-size:28rpx" style="width: 250rpx;" />
							<image src="/static/my/arr.png" style="width: 24rpx;height: 20rpx;margin-left: 15rpx;"
								mode="aspectFit"></image>
						</view>
				
						<view class="bg-white" v-if="item.isOpen"
							style="position: absolute;width: 300rpx;top: 80rpx;left: 0;max-height: 300rpx;z-index: 99999999999;">
							<scroll-view scroll-y="true" style="width: 300rpx;max-height: 300rpx;">
								<view style="height: 32px;line-height: 32px;" class="text-center" @click.stop="selectTwoValue(index,idx)" v-for="(it,idx) in item.values">{{it.value}}
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
				<!-- 加减 -->
				<view :key="index" v-if="item.type === 2" class="bg-white flex align-center justify-between"
					style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
					<view class="flex align-start">
						<text class="text-df" style="color: #DA1715;" v-if="item.is_must == 1">*</text>
						<text class="text-df" style="color: #19212D;">{{item.attr_name}}</text>
					</view>
					<view class="flex align-center text-df " style="color: #36373D;">
						<image @click="addjianNum(index,'-')" src="../static/1.png" style="width: 24rpx;height: 24rpx;margin-right: 16rpx;" mode="aspectFit">
						</image>
						<input :placeholder="'请输入' + item.attr_name" @input="inputContent(item)" v-model="item.num" type="number" class="text-center" placeholder-style="color: #B7BAC2;font-size:28rpx"
							style="margin-right: 15rpx;width: 200rpx;" />
						<image  @click="addjianNum(index,'+')" src="../static/2.png" style="width: 24rpx;height: 24rpx;margin-left: 16rpx;" mode=""></image>
					</view>
				</view>
			</block>
			
			<!-- 商品标题 -->
			<!-- <view class="bg-white"
				style="border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class=" flex align-center justify-between" style="height: 80rpx;">
					<view class="flex align-start">
						<text class="text-df" style="color: #DA1715;">*</text>
						<text class="text-df" style="color: #19212D;">商品标题</text>
					</view>
					<view></view>
				</view>
				<view style="padding: 24rpx 0;">
					<textarea auto-height="true" v-model="goods_name" style="width: 100%;min-height: 150rpx;" placeholder="请输入商品标题"
						placeholder-style="color: #B7BAC2;font-size:28rpx"></textarea>
				</view>
			</view> -->
			
			<!-- 商品单价 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">商品单价：</text>
				</view>
				<view class="flex align-center text-333 text-df">
					<input placeholder="请填写商品价格" type="digit" v-model="price" style="margin-right: 20rpx;" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
					元
				</view>
			</view>
			
			<!-- 商品描述 -->
			<view class="bg-white"
				style="border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class=" flex align-center justify-between" style="height: 80rpx;">
					<view class="flex align-start">
						<!-- <text class="text-df" style="color: #DA1715;">*</text> -->
						<text class="text-df" style="color: #19212D;">留言备注</text>
					</view>
					<view></view>
				</view>
				<view style="padding: 24rpx 0;">
					<textarea auto-height="true" v-model="detail" style="width: 100%;min-height: 150rpx;" placeholder="请输入留言备注"
						placeholder-style="color: #B7BAC2;font-size:28rpx"></textarea>
				</view>
			</view>
		
			<!-- 游戏账号 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">游戏账号：</text>
				</view>
				<input placeholder="请填入" v-model="game_accout" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>
			
			<!-- 游戏密码 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">游戏密码：</text>
				</view>
				<input placeholder="请填入" v-model="game_password" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>
			
			<!-- 是否砍价 -->
			<!-- <view  @click="isShowKanjia = !isShowKanjia" class="bg-white flex align-center justify-between"
				style="height: 80rpx;width: 702rpx;border-radius: 4rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;margin-top: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">是否可砍价</text>
				</view>
				<view style="position: relative;width: 300rpx;height: 80rpx;">
					<view class="flex align-center justify-end" style="width: 300rpx;height: 80rpx;">
						<input v-model="kanjia" :placeholder="'请选择是否砍价'" disabled="true" class="text-right"
							placeholder-style="color: #B7BAC2;font-size:28rpx" style="width: 250rpx;" />
						<image src="/static/my/arr.png" style="width: 24rpx;height: 20rpx;margin-left: 15rpx;"
							mode="aspectFit"></image>
					</view>
			
					<view class="bg-white" v-if="isShowKanjia"
						style="position: absolute;width: 300rpx;top: 80rpx;left: 0;max-height: 300rpx;z-index: 99999999999;">
						<scroll-view scroll-y="true" style="width: 300rpx;max-height: 300rpx;">
							<view style="height: 32px;line-height: 32px;" class="text-center" @click.stop="selectTwoKanjia(it)" :key="idx" v-for="(it,idx) in kanjialiebiao">{{it.value}}
							</view>
						</scroll-view>
					</view>
				</view>
			</view> -->
			
			<!-- 角色id -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">角色ID：</text>
				</view>
				<input placeholder="请填入" v-model="role_id" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>
			
			
			<!-- <view class="bg-white"
				style="border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class=" flex align-center justify-between" style="height: 80rpx;">
					<view class="flex align-start">
						<text class="text-df" style="color: #DA1715;">*</text>
						<text class="text-df" style="color: #19212D;">商品标题</text>
					</view>
					<view></view>
				</view>
				<view style="padding: 24rpx 0;">
					<textarea auto-height="true" style="width: 100%;" placeholder="请输入商品标题"
						placeholder-style="color: #B7BAC2;font-size:28rpx"></textarea>
				</view>
			</view> -->
			
			
			
			
			<!--  -->
			<view style="padding: 40rpx 24rpx 24rpx;color: #19212D;" class="text-lg text-weight-500">第二步：联系方式</view>
			<!-- 手机号码 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">手机号码：</text>
				</view>
				<input placeholder="请填入" v-model="mobile" maxlength="11" type="number" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>
			
			
			<!-- QQ号码 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">qq号码：</text>
				</view>
				<input placeholder="请填入" maxlength="20" v-model="qqNum" type="number" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>
			
			<!-- 微信号码 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">微信号码：</text>
				</view>
				<input placeholder="请填入" maxlength="25" v-model="wechat" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>
			<!-- 推荐码 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #19212D;">推荐码</text>
				</view>
				<input placeholder="请输入推荐码" v-model="introducer_no" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view>
			<view style="padding: 40rpx 24rpx 24rpx;color: #19212D;" class="text-lg text-weight-500">第三步：信息条款</view>
			<view @click="changeXuanze(index)" style="width: 702rpx;padding: 20rpx;margin-left: 24rpx;border-radius: 4rpx;margin-bottom: 16rpx;"
				class="bg-white flex align-center" v-for="(item,index) in ruleselect" :key="index">
				<view style="" style="width: 36rpx;height: 36rpx;">
					<image src="../static/xz.png" style="width: 36rpx;height: 36rpx;" v-if="item.select" mode=""></image>
					<image src="../static/mxz.png" style="width: 36rpx;height: 36rpx;" v-else mode=""></image>
				</view>
				<view class="text-sm" style="margin-left: 22rpx;" :style="[{
					color:item.select ? '#659BC7' :'#868686'
				}]">
						{{item.content}}
				</view>
			</view>
		</block>
		<view style="height: 200rpx;"></view>
		<button type="default" class="onlinePayBottomBtn" :loading="confirmPayLoading" @click="confirmSubmit">提交</button>
	</view>
</template>

<script>
	import {validate} from '@/common/utils/index.js'
	export default {
		data() {
			return {
				type:'',
				confirmPayLoading:false,
				goodsInfo:{},
				source:[],//账号来源
				isShowSource:false,
				attr_list:[],
				gamesource:'',
				gamesourceId:'',
				game_accout : '',//游戏账号
				game_password:'' ,//游戏密码
				role_id:'',// 角色id
				mobile:'',// 手机号码
				 qqNum:'',// qq号码
				 wechat:'',//微信账号
				 introducer_no:'',//推荐吗
				 ruleselect:[],
				 qingxuanze:[],
				 price:'',//商品单价
				 detail:'',//商品描述
				 goods_name:'',//商品名称
				 isShowKanjia:false,
				 kanjia:'',
				 kanjiaId:'',
				 kanjialiebiao:[{
					 value:'是',
					 id:1
				 },{
					 value:'否',
					 id:0
				 }],
				 goods_id:0
			}
		},
		onLoad(options) {
			this.type = options.type;
			if(this.type == 1 && options.goodId) {
				this.goods_id = options.goodId || '';
			}
			if(this.type == 2) {
				this.platformhelpsellmsg();
			}
			this.goodsInfo = JSON.parse(options.goodsInfo);
			this.gamesellaccountgameattrlist();
		},
		methods:{
			inputContent(item) {
				console.log(item)
				 this.$set(item,'num',item.num.replace(/[^\d]/g,''));
				 if(item.num < 0) {
					 this.$set(item,'num','');
				 } else {
					  this.$set(item,'num',item.num.replace(/[^\d]/g,''));
				 }
				
				                // this.$set(item,'num',item.num.replace(/\.{2,}/g,"."));
				                // this.$set(item,'num',item.num.replace(".","$#$").replace(/\./g,"").replace("$#$","."));
			},
			gamerecycledetail() {
				this.$api.post(global.apiUrls.gamerecycledetail,{
					goods_id:this.goods_id
				}).then(res => {
					if(res.data.code == 1) {
						// 账号来源
						this.gamesource=res.data.data.source;
						this.gamesourceId=res.data.data.source_id;
						// 角色性别
						res.data.data.attr_values.forEach(i => {
							// i.selectContent = '';
							// i.selectContentid = '';
							this.attr_list.forEach(j => {
								if(j.id === i.attr_id) {
									if(i.type === 1) {
										j.selectContent = i.value_name;
										j.selectContentid = i.value_id;
									}
									if(i.type === 2) {
										j.num = i.value;
									}
								}
							})
						})
						
						// 游戏账号
						this.game_accout = res.data.data.game_accout;
						// 游戏密码
						this.game_password = res.data.data.game_password;
						// 角色id
						this.role_id = res.data.data.role_id;
						// 手机号码
						this.mobile = res.data.data.mobile;
						// qq号码
						this.qqNum = res.data.data.qq;
						// 微信号码
						this.wechat = res.data.data.wechat;
						// 推荐码
						this.introducer_no = res.data.data.introducer_no;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			selectTwoKanjia(item) {
				this.kanjia = item.value;
				this.kanjiaId = item.id;
				this.isShowKanjia = false;
			},
			changeXuanze(idx) {
				// this.qingxuanze = idx;
				this.$set(this.ruleselect[idx],'select',!this.ruleselect[idx].select)
			},
			platformhelpsellmsg() {
				this.$api.post(global.apiUrls.platformhelpsellmsg).then(res => {
					if(res.data.code == 1) {
						
						this.ruleselect = res.data.data.rule.map(i => ({
							content:i,
							select:false
						}));
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			addjianNum(index,status) {
				switch(status) {
					case '-' :
						if(this.attr_list[index].num > 1) {
							this.$set(this.attr_list[index],'num',this.attr_list[index].num - 1);
						} 
						
						break;
					case '+' :
						this.$set(this.attr_list[index],'num',this.attr_list[index].num + 1);
						break;
				}
			},
			laiyuanSelectTwo(item) {
				this.gamesource = item.name;
				this.gamesourceId = item.id;
			},
			openShowAttrList(index) {
				console.log('点击了');
				console.log(this.attr_list[index].isOpen);
				this.isShowSource = false;
				this.attr_list.forEach((i,j) => {
					if(j != index) {
						this.$set(this.attr_list[j],'isOpen',false);
					}
				})
				// this.selectContent
				// this.$set(this.attr_list[index],'selectContent',)
				this.$set(this.attr_list[index],'isOpen',!this.attr_list[index].isOpen);
			},
			selectTwoValue(index,idx) {
				this.$set(this.attr_list[index],'selectContent',this.attr_list[index].values[idx].value);
				this.$set(this.attr_list[index],'selectContentid',this.attr_list[index].values[idx].id);
				this.$set(this.attr_list[index],'isOpen',!this.attr_list[index].isOpen);
			},
			openShowSource() {
				this.attr_list.forEach((i,j) => {
					this.$set(this.attr_list[j],'isOpen',false);
				})
				this.isShowSource = !this.isShowSource;
			},
			gamesellaccountgameattrlist() {
				this.$api.post(global.apiUrls.gamesellaccountgameattrlist,{
					game_id:this.goodsInfo.game_id
				}).then(res => {
					if(res.data.code == 1) {
						this.source = res.data.data.source;//账号来源
						res.data.data.attr_list.forEach(i => {
							i.isOpen = false;
							i.selectContent = '';
							i.selectContentid = '';
						})
						this.attr_list = res.data.data.attr_list;//附加属性
						console.log(this.attr_list)
						if(this.goods_id) {
							this.gamerecycledetail();
						}
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			gotoBack() {
				uni.navigateBack({
					delta:1
				})
			},
			confirmSubmit() {
				
				if(this.type == 1) {
					// 平台回收
					//this.gamesource;账号来源
					//this.gamesourceId;账号id
					
					if(!this.gamesource) {
						this.$message.info('请选择游戏账号来源')
						return;
					}
					let jinquleforXunhuan = false;
					let params = {};
					let attr_values = [];
					this.attr_list.forEach(i => {
						if(i.type == 1) {
							// 下拉框
							console.log('进来l')
							if(i.is_must == 1) {
								if(!i.selectContent && !jinquleforXunhuan) {
									this.$message.info('请选择' + i.attr_name);
									jinquleforXunhuan = true;
									return;
								} 
								attr_values.push(i.id + '-' + i.selectContentid);
							}
		
						}
						if(i.type == 2) {
							
							// 加减数字框
							if(i.is_must == 1) {
								if(!i.num && !jinquleforXunhuan) {
									this.$message.info('请输入' + i.attr_name);
									jinquleforXunhuan = true;
									return;
								} 
								
								if(i.num > i.max_level && !jinquleforXunhuan) {
									this.$message.info(i.attr_name + '不能大于' + i.max_level)
									jinquleforXunhuan = true;
									return;
								}
								params[i.param_name] = i.num;
							}
							
						}
					})
					if(jinquleforXunhuan) {
						return;
					}
					
					//this.game_accout;游戏账号
					// this.game_password ;游戏密码
					// this.role_id 角色id
					// mobile 手机号码
					// qqNum qq号码
					// wechat微信账号
					
					if(!this.game_accout) {
						this.$message.info('请输入游戏账号');
						return;
					}
					
					if(!this.game_password) {
						this.$message.info('请输入游戏密码');
						return;
					}
					
					if(!this.role_id) {
						this.$message.info('请输入角色ID');
						return;
					}
					
					if(!this.mobile) {
						this.$message.info('请输入手机号码');
						return;	
					}
					
					if(!validate(this.mobile,'phone')) {
						this.$message.info('手机号码格式有误,请重新输入');
						return;	
					}
					if(!this.qqNum) {
						this.$message.info('请输入QQ号码');
						return;	
					}
					
					if(!this.wechat) {
						this.$message.info('请输入微信号码');
						return;	
					}
					this.confirmPayLoading = true;
					let requestParams = {
						source:this.gamesourceId,
						game_id:this.goodsInfo.game_id,
						qq:this.qqNum,
						role_id:this.role_id,
						area_id:this.goodsInfo.area_id,
						mobile:this.mobile,
						wechat:this.wechat,
						game_accout:this.game_accout,
						service_id:this.goodsInfo.service_id,
						game_password:this.game_password,
						attr_values:attr_values.join(','),
						params:JSON.stringify(params),
						introducer_no : this.introducer_no
					}
					if(this.goods_id) {
						requestParams.goods_id = this.goods_id
					}
					this.$api.post(global.apiUrls.gameplatformrecycle,requestParams).then(res => {
						if(res.data.code == 1) {
							if(this.goods_id) {
								uni.navigateBack({
									delta:1
								})
								uni.$emit('updatelist',1);
							} else {
								setTimeout(() =>{
									this.$urouter.redirectTo('/pages/makeorder/publishsuccess/index?type=' + this.type);
								},700)
							}
							
						} else {
							this.$message.info(res.data.msg);
						}
						this.confirmPayLoading = false;
					})
					// return;
					
					
				}
				
				
				if(this.type == 2) {
					// if(this.qingxuanze === -1) {
					// 	this.$message.info('请选择信息条款');
					// 	return;
					// }
					 let isShowQuanxuan =this.ruleselect.every(i => i.select);
					 console.log(isShowQuanxuan)
					 if(!isShowQuanxuan) {
						 this.$message.info('请选择信息条款');
							return;
					 }
					// return;
					if(!this.gamesource) {
						this.$message.info('请选择游戏账号来源')
						return;
					}
					let jinquleforXunhuan = false;
					let params = {};
					let attr_values = [];
					this.attr_list.forEach(i => {
						if(i.type == 1) {
							// 下拉框
							console.log('进来l')
							if(i.is_must == 1) {
								if(!i.selectContent && !jinquleforXunhuan) {
									this.$message.info('请选择' + i.attr_name);
									jinquleforXunhuan = true;
									return;
								} 
								attr_values.push(i.id + '-' + i.selectContentid);
							}
							
						}
						if(i.type == 2) {
							
							// 加减数字框
							if(i.is_must == 1) {
								if(!i.num && !jinquleforXunhuan) {
									this.$message.info('请输入' + i.attr_name);
									jinquleforXunhuan = true;
									return;
								} 
								
								if(i.num > i.max_level && !jinquleforXunhuan) {
									this.$message.info(i.attr_name + '不能大于' + i.max_level)
									jinquleforXunhuan = true;
									return;
								}
								params[i.param_name] = i.num;
							}
							
						}
					})
					if(jinquleforXunhuan) {
						return;
					}
					
					//this.game_accout;游戏账号
					// this.game_password ;游戏密码
					// this.role_id 角色id
					// mobile 手机号码
					// qqNum qq号码
					// wechat微信账号
					
					// if(!this.goods_name) {
					// 	this.$message.info('请输入商品标题');
					// 	return;
					// }
					if(!this.price) {
						this.$message.info('请输入商品价格');
						return;
					}
					
					if(parseFloat(this.price) < 0) {
						this.$message.info('请输入大于零的商品价格');
						return;
					}
					if(!this.game_accout) {
						this.$message.info('请输入游戏账号');
						return;
					}
					
					if(!this.game_password) {
						this.$message.info('请输入游戏密码');
						return;
					}
					
					// if(!this.kanjia) {
						// this.$message.info('请选择是否可砍价');
						// return;
						// kanjia:'',
						// kanjiaId:'',
					// }
					
					
					if(!this.role_id) {
						this.$message.info('请输入角色ID');
						return;
					}
					
					if(!this.mobile) {
						this.$message.info('请输入手机号码');
						return;	
					}
					
					if(!validate(this.mobile,'phone')) {
						this.$message.info('手机号码格式有误,请重新输入');
						return;	
					}
					if(!this.qqNum) {
						this.$message.info('请输入QQ号码');
						return;	
					}
					
					if(!this.wechat) {
						this.$message.info('请输入微信号码');
						return;	
					}
					this.confirmPayLoading = true;
					this.$api.post(global.apiUrls.gameplatformhelpsell,{
						source:this.gamesourceId,
						game_id:this.goodsInfo.game_id,
						qq:this.qqNum,
						role_id:this.role_id,
						area_id:this.goodsInfo.area_id,
						mobile:this.mobile,
						wechat:this.wechat,
						game_accout:this.game_accout,
						service_id:this.goodsInfo.service_id,
						game_password:this.game_password,
						attr_values:attr_values.join(','),
						params:JSON.stringify(params),
						introducer_no : this.introducer_no,
						detail:this.detail,
						price:this.price,
						goods_name:this.goods_name,
						is_bargain:this.kanjiaId
					}).then(res => {
						if(res.data.code == 1) {
							setTimeout(() =>{
								this.$urouter.redirectTo('/pages/makeorder/publishsuccess/index?type=' + this.type);
							},700)
						} else {
							this.$message.info(res.data.msg);
						}
						this.confirmPayLoading = false;
					})
				
				}
				
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.onlinePayBottomBtn {
		position: fixed;
		bottom: 40rpx;
		left: 32rpx;
		width: 686rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background: #295B7B;
		border-radius: 0;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
