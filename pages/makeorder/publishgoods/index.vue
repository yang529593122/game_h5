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
					<view class="text-sm" style="color: #868686;">{{goodsInfo.area_name}}<text v-if="goodsInfo.service_name"> /</text> {{goodsInfo.service_name}} </view>
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
			<view style="height: 16rpx;"></view>
			<!-- <view style="padding: 40rpx 24rpx 24rpx;color: #19212D;" class="text-lg text-weight-500">第一步：商品信息</view> -->
			<view @click="openShowSource" class="bg-white flex align-center justify-between"
				style="height: 80rpx;width: 702rpx;border-radius: 4rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">账号来源</text>
				</view>
				<view style="position: relative;width: 400rpx;height: 80rpx;">
					<view class="flex align-center justify-end" style="width: 400rpx;height: 80rpx;">
						<input placeholder="请选择游戏账号来源" v-model="gamesource" disabled="true" class="text-right"
							placeholder-style="color: #B7BAC2;font-size:28rpx" style="width: 370rpx;" />
						<image src="/static/my/arr.png" style="width: 24rpx;height: 20rpx;margin-left: 15rpx;"
							mode="aspectFit"></image>
					</view>
			
					<view class="bg-white" v-if="isShowSource"
						style="position: absolute;width: 320rpx;top: 80rpx;left: 80rpx;max-height: 300rpx;z-index: 99999999999;">
						<scroll-view scroll-y="true" style="width: 320rpx;max-height: 300rpx;">
							<view style="height: 32px;line-height: 32px;" class="text-center" @click="laiyuanSelectTwo(item)" v-for="(item,index) in source">{{item.name}}
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			
			<!-- 是否为靓号 start -->
			<view @click="openShowLianghao()" class="bg-white flex align-center justify-between"
				style="height: 80rpx;width: 702rpx;border-radius: 4rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;margin-top: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">是否为靓号</text>
				</view>
				<view style="position: relative;width: 300rpx;height: 80rpx;">
					<view class="flex align-center justify-end" style="width: 300rpx;height: 80rpx;">
						<input v-model="shifouweilianghao" :placeholder="'请选择是否为靓号'" disabled="true" class="text-right"
							placeholder-style="color: #B7BAC2;font-size:28rpx" style="width: 250rpx;" />
						<image src="/static/my/arr.png" style="width: 24rpx;height: 20rpx;margin-left: 15rpx;"
							mode="aspectFit"></image>
					</view>
			
					<view class="bg-white" v-if="isshowLianghao"
						style="position: absolute;width: 300rpx;top: 80rpx;left: 0;max-height: 300rpx;z-index: 99999999999;">
						<scroll-view scroll-y="true" style="width: 300rpx;max-height: 300rpx;">
							<view style="height: 32px;line-height: 32px;" class="text-center" @click.stop="changeLianghao(it,idx)" v-for="(it,idx) in lianghaoliebiao">{{it.value}}
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<!-- 是否为靓号 end -->
			
			<!-- 是否有申诉能力 start -->
			<view @click="openShowShensu()" class="bg-white flex align-center justify-between"
				style="height: 80rpx;width: 702rpx;border-radius: 4rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;margin-top: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">是否有申诉能力</text>
				</view>
				<view style="position: relative;width: 310rpx;height: 80rpx;">
					<view class="flex align-center justify-end" style="width: 310rpx;height: 80rpx;">
						<input v-model="shifouyoushensunengli" :placeholder="'请选择是否有申诉能力'" disabled="true" class="text-right"
							placeholder-style="color: #B7BAC2;font-size:28rpx" style="width: 280rpx;" />
						<image src="/static/my/arr.png" style="width: 24rpx;height: 20rpx;margin-left: 15rpx;"
							mode="aspectFit"></image>
					</view>
			
					<view class="bg-white" v-if="isshowShensu"
						style="position: absolute;width: 300rpx;top: 80rpx;left: 0;max-height: 300rpx;z-index: 99999999999;">
						<scroll-view scroll-y="true" style="width: 300rpx;max-height: 300rpx;">
							<view style="height: 32px;line-height: 32px;" class="text-center" @click.stop="changeShensu(it,idx)" v-for="(it,idx) in shensuliebiao">{{it.value}}
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<!-- 是否为靓号 end -->
			
			<!-- 是否他人购买显示 start -->
			<block v-if="gamesourceId == 1">
				<view class="bg-white flex align-center justify-between"
					style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
					<view class="flex align-start">
						<text class="text-df" style="color: #DA1715;">*</text>
						<text class="text-df" style="color: #19212D;">在手时长：</text>
					</view>
					<input placeholder="请填入在手时长" v-model="shichang" type="text" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
				</view>
				
				<view class="bg-white flex align-center justify-between"
					style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
					<view class="flex align-start">
						<text class="text-df" style="color: #DA1715;">*</text>
						<text class="text-df" style="color: #19212D;">经哪个中介交易获得：</text>
					</view>
					<input placeholder="请填入中介名称" v-model="zhongjie" type="text" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
				</view>
				
				<view @click="openShowJiaoliu()" class="bg-white flex align-center justify-between"
					style="height: 80rpx;width: 702rpx;border-radius: 4rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;margin-top: 16rpx;">
					<view class="flex align-start">
						<text class="text-df" style="color: #DA1715;">*</text>
						<text class="text-df" style="color: #19212D;">购买时流程方式</text>
					</view>
					<view style="position: relative;width: 310rpx;height: 80rpx;">
						<view class="flex align-center justify-end" style="width: 310rpx;height: 80rpx;">
							<input v-model="jialiufangshi" :placeholder="'请选择购买时流程方式'" disabled="true" class="text-right"
								placeholder-style="color: #B7BAC2;font-size:28rpx" style="width: 280rpx;" />
							<image src="/static/my/arr.png" style="width: 24rpx;height: 20rpx;margin-left: 15rpx;"
								mode="aspectFit"></image>
						</view>
				
						<view class="bg-white" v-if="isshowJiaoliu"
							style="position: absolute;width: 300rpx;top: 80rpx;left: 0;max-height: 300rpx;z-index: 99999999999;">
							<scroll-view scroll-y="true" style="width: 300rpx;max-height: 300rpx;">
								<view style="height: 32px;line-height: 32px;" class="text-center" @click.stop="changeLiucheng(it,idx)" v-for="(it,idx) in jiaoliuliebiao">{{it.value}}
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
				
			</block>
			<!-- 是否他人购买显示 end -->
			
			
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
				<view class="flex align-center">
					<input placeholder="请填入"  :type="newpasswordShow ? 'password' : 'text'" v-model="game_password" class="text-right passwordInput" placeholder-style="color: #B7BAC2;font-size:28rpx" />
					<view style="width: 34rpx;margin-left: 10rpx;" @click="changeShowPasswords">
						<image src="../static/open.png" v-if="newpasswordShow" mode="widthFix" style="width: 34rpx;"></image>
						<image src="../static/close.png" v-else mode="widthFix"  style="width: 34rpx;"></image>
					</view>
				</view>
			</view>
			
			<!-- 再次确认密码 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">再次确认游戏密码：</text>
				</view>
				<view class="flex align-center">
					<input placeholder="请填入"  :type="oldpasswordShow ? 'password' : 'text'"  v-model="oldgame_password" class="text-right passwordInput" placeholder-style="color: #B7BAC2;font-size:28rpx" />
					<view style="width: 34rpx;margin-left: 10rpx;" @click="changeShowPassword">
						<image src="../static/open.png" v-if="oldpasswordShow" mode="widthFix" style="width: 34rpx;"></image>
						<image src="../static/close.png" v-else mode="widthFix"  style="width: 34rpx;"></image>
					</view>
				</view>
			</view>
			
			
			<!-- 角色 
				game_accout : '',//游戏账号
				game_password:'' ,//游戏密码
				role_id:'',// 角色id
				mobile:'',// 手机号码
				 qqNum:'',// qq号码
				 wechat:'',//微信账号
			-->
			<!-- <view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">角色ID：</text>
				</view>
				<input placeholder="请填入" v-model="role_id" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view> -->
			
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
			<!-- <view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #19212D;">推荐码</text>
				</view>
				<input placeholder="请输入推荐码" v-model="introducer_no" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view> -->
			<view class="bg-white"
				style="border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class=" flex align-center justify-between" style="height: 80rpx;">
					<view class="flex align-start">
						<!-- <text class="text-df" style="color: #DA1715;">*</text> -->
						<text class="text-df" style="color: #19212D;">号主留言</text>
					</view>
					<view></view>
				</view>
				<view style="padding: 24rpx 0;">
					<textarea auto-height="true" v-model="detail" style="width: 100%;min-height: 150rpx;" placeholder="请输入号主留言"
						placeholder-style="color: #B7BAC2;font-size:28rpx"></textarea>
				</view>
			</view>
			
			<!-- 扩展 start -->
			<block v-for="(item,index) in attr_list">
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
				<view :key="index" v-if="item.type === 2" class="bg-white flex align-center justify-between"
					style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
					<!-- <view class="flex align-start">
						<text class="text-df" style="color: #DA1715;" v-if="item.is_must == 1">*</text>
						<text class="text-df" style="color: #19212D;">{{item.attr_name}}</text>
					</view>
					<view class="flex align-center text-df " style="color: #36373D;">
						<image @click="addjianNum(index,'-')" src="../static/1.png" style="width: 24rpx;height: 24rpx;margin-right: 16rpx;" mode="aspectFit">
						</image>
						<input :placeholder="'请输入' + item.attr_name" @input="inputContent(item)" v-model="item.num" type="number" class="text-center" placeholder-style="color: #B7BAC2;font-size:28rpx"
							style="margin-right: 15rpx;width: 200rpx;" />
						<image  @click="addjianNum(index,'+')" src="../static/2.png" style="width: 24rpx;height: 24rpx;margin-left: 16rpx;" mode=""></image>
					</view> -->
					
						<view class="flex align-start">
							<text class="text-df" style="color: #DA1715;" v-if="item.is_must == 1">*</text>
							<text class="text-df" style="color: #19212D;">{{item.attr_name}}：</text>
						</view>
						<input :placeholder="'请填入' + item.attr_name" v-model="item.selectContent" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
					
				</view>
			</block>
			<!-- 扩展 end -->
			
			<view @click="changeXuanze(index)" style="width: 702rpx;padding: 20rpx;margin-left: 24rpx;border-radius: 4rpx;margin-bottom: 16rpx;"
				class=" flex align-center" v-for="(item,index) in ruleselect" :key="index">
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
			<view style="width: 702rpx;margin-left: 24rpx;padding: 0 20rpx;" class="text-sm text-999">
				<!-- <jyf-parser :html="daishouneirong"></jyf-parser> -->
				<!-- {{daishouneirong}} -->
				<view v-for="(item,index) in daishouneirong">{{
					item
				}}</view>
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
				<view style="position: relative;width: 400rpx;height: 80rpx;">
					<view class="flex align-center justify-end" style="width: 400rpx;height: 80rpx;">
						<input placeholder="请选择游戏账号来源" v-model="gamesource" disabled="true" class="text-right"
							placeholder-style="color: #B7BAC2;font-size:28rpx" style="width: 370rpx;" />
						<image src="/static/my/arr.png" style="width: 24rpx;height: 20rpx;margin-left: 15rpx;"
							mode="aspectFit"></image>
					</view>
							
					<view class="bg-white" v-if="isShowSource"
						style="position: absolute;width: 320rpx;top: 80rpx;left: 80rpx;max-height: 300rpx;z-index: 99999999999;">
						<scroll-view scroll-y="true" style="width: 320rpx;max-height: 300rpx;">
							<view style="height: 32px;line-height: 32px;" class="text-center" @click="laiyuanSelectTwo(item)" v-for="(item,index) in source">{{item.name}}
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			
			<!-- 是否为靓号 start -->
			<view @click="openShowLianghao()" class="bg-white flex align-center justify-between"
				style="height: 80rpx;width: 702rpx;border-radius: 4rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;margin-top: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">是否为靓号</text>
				</view>
				<view style="position: relative;width: 300rpx;height: 80rpx;">
					<view class="flex align-center justify-end" style="width: 300rpx;height: 80rpx;">
						<input v-model="shifouweilianghao" :placeholder="'请选择是否为靓号'" disabled="true" class="text-right"
							placeholder-style="color: #B7BAC2;font-size:28rpx" style="width: 250rpx;" />
						<image src="/static/my/arr.png" style="width: 24rpx;height: 20rpx;margin-left: 15rpx;"
							mode="aspectFit"></image>
					</view>
			
					<view class="bg-white" v-if="isshowLianghao"
						style="position: absolute;width: 300rpx;top: 80rpx;left: 0;max-height: 300rpx;z-index: 99999999999;">
						<scroll-view scroll-y="true" style="width: 300rpx;max-height: 300rpx;">
							<view style="height: 32px;line-height: 32px;" class="text-center" @click.stop="changeLianghao(it,idx)" v-for="(it,idx) in lianghaoliebiao">{{it.value}}
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<!-- 是否为靓号 end -->
			
			<!-- 是否有申诉能力 start -->
			<view @click="openShowShensu()" class="bg-white flex align-center justify-between"
				style="height: 80rpx;width: 702rpx;border-radius: 4rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;margin-top: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">是否有申诉能力</text>
				</view>
				<view style="position: relative;width: 310rpx;height: 80rpx;">
					<view class="flex align-center justify-end" style="width: 310rpx;height: 80rpx;">
						<input v-model="shifouyoushensunengli" :placeholder="'请选择是否有申诉能力'" disabled="true" class="text-right"
							placeholder-style="color: #B7BAC2;font-size:28rpx" style="width: 280rpx;" />
						<image src="/static/my/arr.png" style="width: 24rpx;height: 20rpx;margin-left: 15rpx;"
							mode="aspectFit"></image>
					</view>
			
					<view class="bg-white" v-if="isshowShensu"
						style="position: absolute;width: 300rpx;top: 80rpx;left: 0;max-height: 300rpx;z-index: 99999999999;">
						<scroll-view scroll-y="true" style="width: 300rpx;max-height: 300rpx;">
							<view style="height: 32px;line-height: 32px;" class="text-center" @click.stop="changeShensu(it,idx)" v-for="(it,idx) in shensuliebiao">{{it.value}}
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<!-- 是否为靓号 end -->
			
			<!-- 是否他人购买显示 start -->
			<block v-if="gamesourceId == 1">
				<view class="bg-white flex align-center justify-between"
					style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
					<view class="flex align-start">
						<text class="text-df" style="color: #DA1715;">*</text>
						<text class="text-df" style="color: #19212D;">在手时长：</text>
					</view>
					<input placeholder="请填入在手时长" v-model="shichang" type="text" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
				</view>
				
				<view class="bg-white flex align-center justify-between"
					style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
					<view class="flex align-start">
						<text class="text-df" style="color: #DA1715;">*</text>
						<text class="text-df" style="color: #19212D;">经哪个中介交易获得：</text>
					</view>
					<input placeholder="请填入中介名称" v-model="zhongjie" type="text" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
				</view>
				
				<view @click="openShowJiaoliu()" class="bg-white flex align-center justify-between"
					style="height: 80rpx;width: 702rpx;border-radius: 4rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;margin-top: 16rpx;">
					<view class="flex align-start">
						<text class="text-df" style="color: #DA1715;">*</text>
						<text class="text-df" style="color: #19212D;">购买时流程方式</text>
					</view>
					<view style="position: relative;width: 310rpx;height: 80rpx;">
						<view class="flex align-center justify-end" style="width: 310rpx;height: 80rpx;">
							<input v-model="jialiufangshi" :placeholder="'请选择购买时流程方式'" disabled="true" class="text-right"
								placeholder-style="color: #B7BAC2;font-size:28rpx" style="width: 280rpx;" />
							<image src="/static/my/arr.png" style="width: 24rpx;height: 20rpx;margin-left: 15rpx;"
								mode="aspectFit"></image>
						</view>
				
						<view class="bg-white" v-if="isshowJiaoliu"
							style="position: absolute;width: 300rpx;top: 80rpx;left: 0;max-height: 300rpx;z-index: 99999999999;">
							<scroll-view scroll-y="true" style="width: 300rpx;max-height: 300rpx;">
								<view style="height: 32px;line-height: 32px;" class="text-center" @click.stop="changeLiucheng(it,idx)" v-for="(it,idx) in jiaoliuliebiao">{{it.value}}
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
				
			</block>
			<!-- 是否他人购买显示 end -->
			<!-- <block v-for="(item,index) in attr_list">
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
			 -->
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
			
			<!-- 挂号单价 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">挂号金额：</text>
				</view>
				<view class="flex align-center text-333 text-df">
					<input placeholder="请填写挂号价格" type="digit" v-model="price" style="margin-right: 20rpx;" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
					元
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
				<view class="flex align-center">
					<input placeholder="请填入"  :type="newpasswordShow ? 'password' : 'text'" v-model="game_password" class="text-right passwordInput" placeholder-style="color: #B7BAC2;font-size:28rpx" />
					<view style="width: 34rpx;margin-left: 10rpx;" @click="changeShowPasswords">
						<image src="../static/open.png" v-if="newpasswordShow" mode="widthFix" style="width: 34rpx;"></image>
						<image src="../static/close.png" v-else mode="widthFix"  style="width: 34rpx;"></image>
					</view>
				</view>
			</view>
			
			<!-- 再次确认密码 -->
			<view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">再次确认游戏密码：</text>
				</view>
				<view class="flex align-center">
					<input placeholder="请填入"  :type="oldpasswordShow ? 'password' : 'text'"  v-model="oldgame_password" class="text-right passwordInput" placeholder-style="color: #B7BAC2;font-size:28rpx" />
					<view style="width: 34rpx;margin-left: 10rpx;" @click="changeShowPassword">
						<image src="../static/open.png" v-if="oldpasswordShow" mode="widthFix" style="width: 34rpx;"></image>
						<image src="../static/close.png" v-else mode="widthFix"  style="width: 34rpx;"></image>
					</view>
				</view>
			</view>
			
			<!-- 号主留言 -->
			<view class="bg-white"
				style="border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class=" flex align-center justify-between" style="height: 80rpx;">
					<view class="flex align-start">
						<!-- <text class="text-df" style="color: #DA1715;">*</text> -->
						<text class="text-df" style="color: #19212D;">号主留言</text>
					</view>
					<view></view>
				</view>
				<view style="padding: 24rpx 0;">
					<textarea auto-height="true" v-model="detail" style="width: 100%;min-height: 150rpx;" placeholder="请输入号主留言"
						placeholder-style="color: #B7BAC2;font-size:28rpx"></textarea>
				</view>
			</view>
			
			<!-- 扩展 start -->
			<block v-for="(item,index) in attr_list">
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
				<view :key="index" v-if="item.type === 2" class="bg-white flex align-center justify-between"
					style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
					<!-- <view class="flex align-start">
						<text class="text-df" style="color: #DA1715;" v-if="item.is_must == 1">*</text>
						<text class="text-df" style="color: #19212D;">{{item.attr_name}}</text>
					</view>
					<view class="flex align-center text-df " style="color: #36373D;">
						<image @click="addjianNum(index,'-')" src="../static/1.png" style="width: 24rpx;height: 24rpx;margin-right: 16rpx;" mode="aspectFit">
						</image>
						<input :placeholder="'请输入' + item.attr_name" @input="inputContent(item)" v-model="item.num" type="number" class="text-center" placeholder-style="color: #B7BAC2;font-size:28rpx"
							style="margin-right: 15rpx;width: 200rpx;" />
						<image  @click="addjianNum(index,'+')" src="../static/2.png" style="width: 24rpx;height: 24rpx;margin-left: 16rpx;" mode=""></image>
					</view> -->
					
						<view class="flex align-start">
							<text class="text-df" style="color: #DA1715;" v-if="item.is_must == 1">*</text>
							<text class="text-df" style="color: #19212D;">{{item.attr_name}}：</text>
						</view>
						<input :placeholder="'请填入' + item.attr_name" v-model="item.selectContent" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
					
				</view>
			</block>
			<!-- 扩展 end -->
			
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
			<!-- <view class="bg-white flex align-center justify-between"
				style="height: 80rpx;border-radius: 4rpx;width: 702rpx;margin-left: 24rpx;padding: 0 24rpx;margin-bottom: 16rpx;">
				<view class="flex align-start">
					<text class="text-df" style="color: #DA1715;">*</text>
					<text class="text-df" style="color: #19212D;">角色ID：</text>
				</view>
				<input placeholder="请填入" v-model="role_id" class="text-right" placeholder-style="color: #B7BAC2;font-size:28rpx" />
			</view> -->
			
			
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
			<!-- <view style="padding: 40rpx 24rpx 24rpx;color: #19212D;" class="text-lg text-weight-500">第三步：信息条款</view> -->
			<view @click="changeXuanze(index)" style="width: 702rpx;padding: 20rpx;margin-left: 24rpx;border-radius: 4rpx;margin-bottom: 16rpx;"
				class=" flex align-center" v-for="(item,index) in ruleselect" :key="index">
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
			<!-- <view @click="changeXuanze(index)" style="width: 702rpx;padding: 20rpx;margin-left: 24rpx;border-radius: 4rpx;margin-bottom: 16rpx;"
				class=" flex align-center" v-for="(item,index) in ruleselects" :key="index">
				<view style="" style="width: 36rpx;height: 36rpx;">
					<image src="../static/xz.png" style="width: 36rpx;height: 36rpx;" v-if="item.select" mode=""></image>
					<image src="../static/mxz.png" style="width: 36rpx;height: 36rpx;" v-else mode=""></image>
				</view>
				<view class="text-sm" style="margin-left: 22rpx;" :style="[{
					color:false ? '#659BC7' :'#868686'
				}]">
						{{item.content}}
				</view>
			</view> -->
			<view style="width: 702rpx;margin-left: 24rpx;padding: 0 20rpx;" class="text-sm text-999">
				<!-- <jyf-parser :html="daishouneirong"></jyf-parser> -->
				<view v-for="(item,index) in daishouneirong">{{
					item
				}}</view>
			</view>
			<view style="width: 702rpx;padding: 20rpx;margin-left: 24rpx;border-radius: 4rpx;margin-bottom: 16rpx;"
				class=" flex align-center" v-if="type == 2">
				<view style="" style="width: 36rpx;height: 36rpx;" @click.stop="changeisMaihaoselect">
					<image src="../static/xz.png" style="width: 36rpx;height: 36rpx;" v-if="isMaihaoselect" mode=""></image>
					<image src="../static/mxz.png" style="width: 36rpx;height: 36rpx;" v-else mode=""></image>
				</view>
				<view class="text-sm" style="margin-left: 22rpx;" @click.stop="gameagreementSinglePage(2)" :style="[{
					color:isMaihaoselect ? '#659BC7' :'#868686'
				}]">
						已阅读并同意《卖号协议》
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
				oldgame_password:'',//再次确认游戏密码
				role_id:'',// 角色id
				mobile:'',// 手机号码
				 qqNum:'',// qq号码
				 wechat:'',//微信账号
				 introducer_no:'',//推荐吗
				 ruleselect:[{
					 content:'本人详细阅读并悉知以上须知信息，确认遵守平台规则，能配合所需资料及流程。',
					 select:false
				 }],
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
				 goods_id:0,
				 shifouweilianghao:'',
				 shifouweilianghaoId:'',
				 isshowLianghao:false,
				 lianghaoliebiao : [{
					value:'是',
					id:1 
				 },{
					 value:'否',
					 id:0 
				 }],
				 shensuliebiao:[{
					value:'是',
					id:1 
				 },{
					 value:'否',
					 id:0 
				 },{
					 value:'不清楚',
					 id:2
				 }],
				 jiaoliuliebiao:[{
					 value:'不挂不压',
					 id:0
				 },{
					 value:'挂ip',
					 id:1
				 },{
					 value:'押证包安',
					 id:2
				 },{
					 value:'包赔',
					 id:3
				 }],
				 isshowShensu:false,
				 shifouyoushensunengli:'',
				 shifouyoushensunengliId:'',
				 daishounzeirong:'',
				 shichang:'',//时长
				 zhongjie:'',//中介
				 jialiufangshi:'',//交流方式内容
				 isshowJiaoliu:false,
				 jialiufangshiId:'',
				 daishouneirong:[],
				 isMaihaoselect:false,
				 newpasswordShow:true,
				 oldpasswordShow:true
			}
		},
		onLoad(options) {
			this.type = options.type;
			this.goodsInfo = JSON.parse(options.goodsInfo);
			this.gamesellaccountgameattrlist();
			if(this.type == 1) {
				this.source = [{
					name:'自己注册申请一手号',
					id:0
				},{
					name:'早期/近期购买、他人赠送',
					id:1
				}]
				this.gamererecylenotice();
			}
			if(this.type == 1 && options.goodId) {
				this.goods_id = options.goodId || '';
				this.gameuserrecyleinfo();
			}
			
			if(this.type == 2) {
				// this.platformhelpsellmsg();
				this.source = [{
					name:'自己注册申请一手号',
					id:0
				},{
					name:'早期/近期购买、他人赠送',
					id:1
				}]
				this.gamesalenotice();
			}
			if(this.type == 2 && options.goodId) {
				this.goods_id = options.goodId || '';
				this.gameusersaleinfo();
			}
			
		},
		methods:{
			changeShowPasswords() {
				this.newpasswordShow = !this.newpasswordShow;
			},
			changeShowPassword() {
				this.oldpasswordShow = !this.oldpasswordShow;
			},
			gameagreementSinglePage(type) {
				this.$api.post(global.apiUrls.gameagreementSinglePage,{
					type:type
				}).then(res => {
					if(res.data.code == 1) {
						// return;
						window.location.href = res.data.data.url;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			changeisMaihaoselect() {
				this.isMaihaoselect = !this.isMaihaoselect;
			},
			gameusersaleinfo() {
				this.$api.post(global.apiUrls.gameusersaleinfo,{
					id:this.goods_id
				}).then(res => {
					if(res.data.code == 1) {
						this.gamesource = res.data.data.source === 0 ? '自己注册申请一手号' : '早期/近期购买、他人赠送';
						this.gamesourceId=res.data.data.source;
						this.shichang = res.data.data.hours;
						this.zhongjie = res.data.data.agency;
						// this.jialiufangshiId = res.data.data.procedure;
						// this.jialiufangshi = this.jiaoliuliebiao[this.jialiufangshiId].value;
						this.shifouweilianghao = res.data.data.is_pretty === 0 ? '否' : '是';
						this.shifouweilianghaoId = res.data.data.is_pretty;
						this.shifouyoushensunengli = res.data.data.is_appeal === 0 ? '否' : res.data.data.is_appeal === 1 ? '是' : '不清楚';
						this.shifouyoushensunengliId=res.data.data.is_appeal;
						this.game_accout = res.data.data.game_account;//游戏账号
						this.game_password =res.data.data.game_password;//游戏密码
						this.oldgame_password = res.data.data.game_password;
						this.mobile = res.data.data.mobile;
						this.qqNum = res.data.data.qq;
						this.wechat = res.data.data.wechat;
						this.detail = res.data.data.remark;
						this.introducer_no = res.data.data.introducer_no;
						this.price = res.data.data.price;
						// this.attr_list.forEach(j=>{
						// 	if(j.type === 1) {
						// 		j.selectContent = j.value_name;
						// 		 j.selectContentid = j.value_id;
						// 	}
						// 	if(j.type === 2) {
						// 					j.selectContent = j.value;
						// 					// j.selectContentid = ;
						// 				}
							
						// })
						res.data.data.attr_data.forEach(i => {
							this.attr_list.forEach(j => {
								if(j.id === i.attr_id) {
									if(i.type === 1) {
									 				j.selectContent = i.value_name;
									 				j.selectContentid = i.value_id;
									 			}
									 			if(i.type === 2) {
									 				j.selectContent = i.value;
									 				j.selectContentid = i.value_id;
									 			}
								}
							})
						})
						console.log(this.attr_list);
						// return;
						// res.data.data.attr_values.forEach(i => {
						// 	// i.selectContent = '';
						// 	// i.selectContentid = '';
						// 	this..forEach(j => {
						// 		if(j.id === i.attr_id) {
						// 			if(i.type === 1) {
						// 				j.selectContent = i.value_name;
						// 				j.selectContentid = i.value_id;
						// 			}
						// 			if(i.type === 2) {
						// 				j.selectContent = i.value;
						// 				j.selectContentid = i.value_id;
						// 			}
						// 		}
						// 	})
						// })
						if(this.gamesourceId === 1) {
							this.shichang = res.data.data.hours;
							this.zhongjie = res.data.data.agency;
							// this.procedure = '';
							if(res.data.data.procedure === 0) {
								this.jialiufangshi = '不挂不压'
								this.jialiufangshiId = res.data.data.procedure
							} else if(res.data.data.procedure === 1) {
								this.jialiufangshi = '挂ip'
								this.jialiufangshiId = res.data.data.procedure
							}else if(res.data.data.procedure === 2) {
								this.jialiufangshi = '押证包安'
								this.jialiufangshiId = res.data.data.procedure
							} else {
								this.jialiufangshi = '包赔'
								this.jialiufangshiId = res.data.data.procedure
							}
						}
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			gameuserrecyleinfo() {
				this.$api.post(global.apiUrls.gameuserrecyleinfo,{
					id:this.goods_id
				}).then(res => {
					if(res.data.code == 1) {
						this.gamesource = res.data.data.source === 0 ? '自己注册申请一手号' : '早期/近期购买、他人赠送';
						this.gamesourceId=res.data.data.source;
						this.shifouweilianghao = res.data.data.is_pretty === 0 ? '否' : '是';
						this.shifouweilianghaoId = res.data.data.is_pretty;
						this.shifouyoushensunengli = res.data.data.is_appeal === 0 ? '否' : res.data.data.is_appeal === 1 ? '是' : '不清楚';
						this.shifouyoushensunengliId=res.data.data.is_appeal;
						this.game_accout = res.data.data.game_account;//游戏账号
						this.game_password =res.data.data.game_password;//游戏密码
						this.oldgame_password = res.data.data.game_password;
						this.mobile = res.data.data.mobile;
						this.qqNum = res.data.data.qq;
						this.wechat = res.data.data.wechat;
						this.detail = res.data.data.remark;
						res.data.data.attr_data.forEach(i => {
							this.attr_list.forEach(j => {
								if(j.id === i.attr_id) {
									if(i.type === 1) {
									 				j.selectContent = i.value_name;
									 				j.selectContentid = i.value_id;
									 			}
									 			if(i.type === 2) {
									 				j.selectContent = i.value;
									 				j.selectContentid = i.value_id;
									 			}
								}
							})
						})
						if(this.gamesourceId === 1) {
							this.shichang = res.data.data.hours;
							this.zhongjie = res.data.data.agency;
							// this.procedure = '';
							if(res.data.data.procedure === 0) {
								this.jialiufangshi = '不挂不压'
								this.jialiufangshiId = res.data.data.procedure
							} else if(res.data.data.procedure === 1) {
								this.jialiufangshi = '挂ip'
								this.jialiufangshiId = res.data.data.procedure
							}else if(res.data.data.procedure === 2) {
								this.jialiufangshi = '押证包安'
								this.jialiufangshiId = res.data.data.procedure
							} else {
								this.jialiufangshi = '包赔'
								this.jialiufangshiId = res.data.data.procedure
							}
						}
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			gamesalenotice() {
				this.$api.post(global.apiUrls.gamesalenotice).then(res => {
					if(res.data.code == 1) {
						this.daishouneirong = res.data.data.sale_notice;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			gamererecylenotice() {
				console.log('进来了')
				this.$api.post(global.apiUrls.gamererecylenotice).then(res => {
					if(res.data.code == 1) {
						this.daishouneirong = res.data.data.recyle_notice;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			openShowShensu() {
				this.isshowJiaoliu  = false;
				this.isShowSource = false;
				this.isshowLianghao = false;
				this.isshowShensu = !this.isshowShensu;
			},
			openShowJiaoliu() {
				this.isShowSource = false;
				this.isshowLianghao = false;
				this.isshowShensu = false;
				this.isshowJiaoliu = !this.isshowJiaoliu;
			},
			// 打开靓号
			openShowLianghao() {
				this.isshowJiaoliu  = false;
				this.isShowSource = false;
				this.isshowShensu = false;
				this.isshowLianghao = !this.isshowLianghao;
			},
			changeLianghao(item,index) {
				this.shifouweilianghao = item.value;
				this.shifouweilianghaoId = item.id;
				this.isshowLianghao = false;
			},
			changeShensu(item,index) {
				this.shifouyoushensunengli = item.value;
				this.shifouyoushensunengliId = item.id;
				this.isshowShensu = false;
			},
			changeLiucheng(item,index) {
				this.jialiufangshi = item.value;
				this.jialiufangshiId = item.id;
				this.isshowJiaoliu = false;
			},
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
										j.selectContent = i.value;
										j.selectContentid = i.value_id;
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
						
						this.ruleselects = res.data.data.rule.map(i => ({
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
				// this.isShowSource = false;
				this.isshowLianghao = false;
				this.isshowShensu = false;
				// this.attr_list.forEach((i,j) => {
				// 	this.$set(this.attr_list[j],'isOpen',false);
				// })
				this.isShowSource = !this.isShowSource;
			},
			gamesellaccountgameattrlist() {
				// gamegame_form_account_attr_list 新
				// gamesellaccountgameattrlist 旧
				this.$api.post(global.apiUrls.gamegame_form_account_attr_list,{
					game_id:this.goodsInfo.game_id
				}).then(res => {
					if(res.data.code == 1) {
						// this.source = res.data.data.source;//账号来源
						if(res.data.data.length) {
							res.data.data.forEach(i => {
								i.isOpen = false;
								i.selectContent = '';
								i.selectContentid = '';
							})
							this.attr_list = res.data.data;//附加属性
						}
						
						console.log(this.attr_list)
						// if(this.goods_id) {
						// 	this.gamerecycledetail();
						// }
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
					let isShowQuanxuan =this.ruleselect.every(i => i.select);
					 console.log(isShowQuanxuan)
					 if(!isShowQuanxuan) {
						 this.$message.info('请勾选须知内容');
							return;
					 }
					// return;
					if(!this.gamesource) {
						this.$message.info('请选择游戏账号来源')
						return;
					}
					
					if(!this.shifouweilianghao) {
						this.$message.info('请选择是否为靓号')
						return;
					}
					
					if(!this.shifouyoushensunengli) {
						this.$message.info('请选择是否有申诉能力')
						return;
					}
					if(this.gamesourceId === 1) {
						if(!this.shichang) {
							this.$message.info('请输入在手时长')
							return;
						}
						
						// if(parseFloat(this.shichang) < 0) {
						// 	this.$message.info('请输入正确的在手时长')
						// 	return;
						// }
						
						if(!this.zhongjie) {
							this.$message.info('请输入经哪个中介交易获得')
							return;
						}
						if(!this.jialiufangshi) {
							this.$message.info('请选择购买时流程方式')
							return;
						}
					}
					// if(!this.price) {
					// 	this.$message.info('请输入挂号金额');
					// 	return;
					// }
					
					// if(parseFloat(this.price) < 0) {
					// 	this.$message.info('请输入大于零的挂号价格');
					// 	return;
					// }
					
					if(!this.game_accout) {
						this.$message.info('请输入游戏账号');
						return;
					}
					
					if(!this.game_password) {
						this.$message.info('请输入游戏密码');
						return;
					}
					
					
					if(!this.oldgame_password) {
						this.$message.info('请再次输入游戏密码');
						return;
					}
					
					if(this.game_password != this.oldgame_password) {
						this.$message.info('两次输入的密码不一致');
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
					
					let attr_values = [];
					let jinquleforXunhuans = false;
					let params = {};
					this.attr_list.forEach(i => {
						if(i.type == 1) {
							// 下拉框
							console.log('进来l')
							console.log(i.is_must)
							console.log(jinquleforXunhuans)
							console.log(i.selectContent)
							if(i.is_must == 1) {
								if(!i.selectContent && !jinquleforXunhuans) {
									this.$message.info('请选择' + i.attr_name);
									jinquleforXunhuans = true;
									return;
								} 
								attr_values.push(i.id + '-' + i.selectContentid);
							}
							
						}
						if(i.type == 2) {
							
							// 加减数字框
							if(i.is_must == 1) {
								if(!i.selectContent && !jinquleforXunhuans) {
									this.$message.info('请输入' + i.attr_name);
									jinquleforXunhuans = true;
									return;
								} 
								
								params[i.param_name] = i.selectContent;
							}
							
						}
					})
					if(jinquleforXunhuans) {
						return;
					}
					
					let requestParams = {
						 source : this.gamesourceId,
						 game_id:this.goodsInfo.game_id,
						 qq:this.qqNum,
						 area_id:this.goodsInfo.area_id,
						 mobile:this.mobile,
						 wechat:this.wechat,
						 game_accout:this.game_accout,
						 service_id:this.goodsInfo.service_id,//服务器id
						 game_password:this.game_password,
						 is_pretty:this.shifouweilianghaoId,
						 is_appeal:this.shifouyoushensunengliId,
						 remark:this.detail,
						 introducer_no:this.introducer_no,
						 attr_values:attr_values.join(','),
						 enter_info:JSON.stringify(params) == '{}' ? '' :JSON.stringify(params)
					}
					if(this.gamesourceId == 1) {
						requestParams.hours = this.shichang
						requestParams.agency = this.zhongjie
						requestParams.procedure = this.jialiufangshiId
					}
					this.confirmPayLoading = true;
					let requestUrl = global.apiUrls.gamerecylecommit;
					if(this.goods_id) {
						requestUrl = global.apiUrls.gamerecyleedit;
						requestParams.id = this.goods_id
					}
					// 平台回收
					this.$util.throttle(() => {
						this.$api.post(requestUrl,requestParams).then(res => {
							if(res.data.code == 1) {
								if(this.goods_id) {
									uni.navigateBack({
										delta:1
									})
									uni.$emit('updatelist',1);
									this.confirmPayLoading = false;
								} else {
									setTimeout(() =>{
										this.$urouter.redirectTo('/pages/makeorder/publishsuccess/index?type=' + this.type);
										this.confirmPayLoading = false;
									},700)
								}
								
							} else {
								this.$message.info(res.data.msg);
								this.confirmPayLoading = false;
							}
						})
					},2000)
					
				}
				
				if(this.type == 2) {
					// 平台代售
					let isShowQuanxuan =this.ruleselect.every(i => i.select);
					 console.log(isShowQuanxuan)
					 if(!isShowQuanxuan) {
						 this.$message.info('请勾选须知内容');
							return;
					 }
					 
					 if(!this.isMaihaoselect) {
						 this.$message.info('阅读并同意《卖号协议》');
						return;
					 }
					// return;
					if(!this.gamesource) {
						this.$message.info('请选择游戏账号来源')
						return;
					}
					
					if(!this.shifouweilianghao) {
						this.$message.info('请选择是否为靓号')
						return;
					}
					
					if(!this.shifouyoushensunengli) {
						this.$message.info('请选择是否有申诉能力')
						return;
					}
					if(this.gamesourceId === 1) {
						if(!this.shichang) {
							this.$message.info('请输入在手时长')
							return;
						}
						
						// if(parseFloat(this.shichang) < 0) {
						// 	this.$message.info('请输入正确的在手时长')
						// 	return;
						// }
						if(!this.zhongjie) {
							this.$message.info('请输入经哪个中介交易获得')
							return;
						}
						if(!this.jialiufangshi) {
							this.$message.info('请选择购买时流程方式')
							return;
						}
					}
					if(!this.price) {
						this.$message.info('请输入挂号金额');
						return;
					}
					
					if(parseFloat(this.price) < 0) {
						this.$message.info('请输入大于零的挂号价格');
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
					
					if(!this.oldgame_password) {
						this.$message.info('请再次输入游戏密码');
						return;
					}
					
					if(this.game_password != this.oldgame_password) {
						this.$message.info('两次输入的密码不一致');
						return;
					}
					
					let attr_values = [];
					let jinquleforXunhuans = false;
					let params = {};
					this.attr_list.forEach(i => {
						if(i.type == 1) {
							// 下拉框
							console.log('进来l')
							console.log(i.is_must)
							console.log(jinquleforXunhuans)
							console.log(i.selectContent)
							if(i.is_must == 1) {
								if(!i.selectContent && !jinquleforXunhuans) {
									this.$message.info('请选择' + i.attr_name);
									jinquleforXunhuans = true;
									return;
								} 
								attr_values.push(i.id + '-' + i.selectContentid);
							}
							
						}
						if(i.type == 2) {
							
							// 加减数字框
							if(i.is_must == 1) {
								if(!i.selectContent && !jinquleforXunhuans) {
									this.$message.info('请输入' + i.attr_name);
									jinquleforXunhuans = true;
									return;
								} 
								
								params[i.param_name] = i.selectContent;
							}
							
						}
					})
					if(jinquleforXunhuans) {
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
					let requestParams = {
						 source : this.gamesourceId,
						 game_id:this.goodsInfo.game_id,
						 qq:this.qqNum,
						 area_id:this.goodsInfo.area_id,
						 mobile:this.mobile,
						 wechat:this.wechat,
						 game_accout:this.game_accout,
						 service_id:this.goodsInfo.service_id,//服务器id
						 game_password:this.game_password,
						 is_pretty:this.shifouweilianghaoId,
						 is_appeal:this.shifouyoushensunengliId,
						 remark:this.detail,
						 price:this.price,
						 introducer_no:this.introducer_no,
						 attr_values:attr_values.join(','),
						 enter_info:JSON.stringify(params) == '{}' ? '' :JSON.stringify(params)
					}
					if(this.gamesourceId == 1) {
						requestParams.hours = this.shichang
						requestParams.agency = this.zhongjie
						requestParams.procedure = this.jialiufangshiId
					}
					let requestUrls = global.apiUrls.gamesalecommit;
					this.confirmPayLoading = true;
					if(this.goods_id) {
						requestUrls = global.apiUrls.gamesaleedit;
						requestParams.id = this.goods_id;
					}
					console.log(requestParams)
					this.$util.throttle(() => {
						this.$api.post(requestUrls,requestParams).then(res => {
							if(res.data.code == 1) {
								if(this.goods_id) {
									uni.navigateBack({
										delta:1
									})
									uni.$emit('updateList',1)
									this.confirmPayLoading = false;
								} else {
									setTimeout(() =>{
										this.$urouter.redirectTo('/pages/makeorder/publishsuccess/index?type=' + this.type);
										this.confirmPayLoading = false;
									},700)	
								}
								
							} else {
								this.$message.info(res.data.msg);
								this.confirmPayLoading = false;
							}
							
						})
					},2000)
					// return;
					
					// this.detail //号主留言
				}
				
				
				return;
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
	.passwordInput {
		    outline: none;
		    border: none;
		    padding: 0;
		    margin: 0;
			color: #B7BAC2 !important;
		    text-decoration: inherit;
	}
</style>
