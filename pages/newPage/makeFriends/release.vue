<template>
	<view class="content" v-if="initData">
		<view class="release-info-up">
			<view class="release-item">
				<input type="text" v-model="title" placeholder="填写标题会有更多人浏览哦~">
			</view>
			<view class="release-item release-items">
				<textarea  placeholder="请填写自我介绍~" v-model="introduce"  cols="30" rows="10"></textarea>
			</view>
			<view class="release-item release-items release-item1">
				<view class="upload-text">上传图片</view>
				<view class="release-img-list">
          <view class="release-img-list-item" v-for="item in images">
            <image :src="item" mode="aspectFill"></image>
          </view>
          <view class="release-img-list-item" @click="updataImgFn">
            <image src="/static/add-img.png" mode="aspectFill"></image>
          </view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="release-info-down">
			<view class="release-item" @click="selectTags ">
				<view>选择标签</view>
				<view class="select-text">
					<text v-if="!tabsNames">请选择</text>
          <text v-else>{{ tabsNames }}</text>
					<image src="/static/my/arr.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="release-item">
				<view><text class="stars">*</text> QQ号码</view>
				<input type="text" v-model="qq" placeholder="请输入">
			</view>
			<view class="release-item">
				<view>手机号码</view>
				<input type="text" v-model="phone" placeholder="请输入">
			</view>
			<view class="release-item">
				<view>微信号码</view>
				<input type="text" v-model="wechat" placeholder="请输入">
			</view>
			<view class="tips" v-html="column"></view>
			<button class="btns" @click="subOrder">发布￥{{ initData.publish_price || 0}}</button>
		</view>

		<benben-popup v-model="popupShow" mode="bottom">
			<view class="popup">
				<view class="popup-title">
					<text class="cancel" @click.stop="cancelFn" >取消</text>
					<text class="pop-title">选择标签</text>
					<text class="getyes" @click.stop="determine">确定</text>
				</view>
				<view class="game-type">
					<view class="type-list">
            <view class="type-list-item " :class=" index === first_order_index ? 'activedColorText':'' " v-for="(item,index) in first_order" :key="item.id" @click="selectFirst(item,index)">
              {{ item.name }}
            </view>
					</view>
          <view class="type-list">
            <view class="type-list-item" :class=" index === second_level_index ? 'activedColorText':'' "  v-for="(item,index)  in second_level" :key="item.id" @click="selectSecond(item,index)" >
              {{ item.name }}
            </view>
          </view>
          <view class="type-list">
            <view class="type-list-item type-list-item-select "  v-for="(item,index) in tertiary" :key="item.id">
               <view class="type-list-item-title">
                 {{ item.name }}
               </view>
               <image v-if="!item.status" @click="getselect(item,index)" src="/static/newPage/11.png" mode="aspectFill"></image>
               <image v-else  @click="getselect(item,index)" src="/static/newPage/12.png" mode="aspectFill"></image>
            </view>
          </view>

				</view>
				<view class="line"></view>
				<view class="my-select">
					<text>我的选择</text>
					<text>至少选择1个，最多选择6个</text>
				</view>
				<view class="select-list">
					<view class="select-item" :class="{'select-active':select==100}" v-for="(item,index) in my_selected_list" :key="item.id">
						{{ item.name }}
						<image src="/static/newPage/13.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</benben-popup>
	</view>
</template>

<script>
	import benbenPopup from '@/components/benben-popup/benben-popup.vue'
  import {validate,UploadImage} from '@/common/utils/index.js'
	export default {
		components:{benbenPopup},
		data() {
			return {
        initData:null,
        title:'',// 标题
        introduce:"",//介绍
        images:"" ,//图片集
        phone:"",
        qq:'',
        wechat:"",
				tab: 1,
				popupShow:false,
				select:1,
        resultData:null,
        column:'',
        tabsNames:'',

        tagsDatas:null,

        first_order:[],
        first_order_index:null,
        second_level:[],
        second_level_index:null,
        tertiary:[],
        my_selected_list:[],
			}
		},
    onLoad() {
      uni.$on("uPicCropper", (path) => {
        this.uploadUserImg(path);
      });
      this.init()
      this.getColumn()
      this.getTagsDatas()
    },
    onUnload() {
      // 关闭当前页面的监听事件
      uni.$off("uPicCropper");
    },
		methods: {
      // 获取文字说明

      getColumn(){
        this.$api.post(global.apiUrls.operation_get_column,{ category_id:25 }).then(res=>{
          if (res.data.code === '1') {
            const result = res.data.data
            this.column = result.content
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },

      // 获取发布配置信息
      init(){
        this.$api.post(global.apiUrls.friends_get_friend_config).then(res=>{
          if (res.data.code === '1') {
            const result = res.data.data
            this.initData = result
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },
      // 上传图片
      updataImgFn(){
        uni.chooseImage({
          count: 1,
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            // 跳转到图片裁切页面
            uni.navigateTo({
              url: `/pages/user/user/avatar-cropping/index?rectHeight=200&rectWidth=200&fileType=jpg&myImgUrl=${res.tempFilePaths[0]}`,
              animationDuration: 0,
            });
          },
        });
      },
      uploadUserImg(blob) {
        uni.showLoading();
        let _this = this;
        // 开始上传
        new UploadImage([blob], {
          complete: function (res) {
            uni.hideLoading();
            if (res.length) {
              _this.images =[..._this.images,res[0].path]
            }
          },
        });
      },
      //
      determine(){
        this.popupShow = false
        let arr =[]
        this.my_selected_list.forEach(item => arr.push(item.name))
        this.tabsNames = arr.join()

      },
      cancelFn(){
        this.popupShow = false
        this.first_order_index=null,
        this.second_level = [],
        this.second_level_index=null,
        this.tertiary = []
        this.my_selected_list=[]
        this.tabsNames = ''
      },
      // 点击发布
      subOrder(){
        let arr =[]
        if(this.my_selected_list.length > 0) {
          this.my_selected_list.forEach(item => arr.push(item.id) )
        }
        this.$api.post(global.apiUrls.friends_publish, {
          title:this.title,// 标题
          tabs: arr.length > 0 ? arr.join() : '',
          introduce:this.introduce,//介绍
          images:this.images.length ? this.images.join() : "" ,//图片集
          phone:this.phone,
          qq:this.qq,
          wechat:this.wechat,
          price:this.initData.publish_price ,
        }).then(res => {
          if (res.data.code === '1') {
            const result = res.data.data
            this.$urouter.navigateTo(`/pages/newPage/makeFriends/pay?orderNo=${result.order_sn}`);
          } else {
            this.$message.info(res.data.msg);
          }
          this.popupShow = false
        })
      },
			getActive(index) {
				this.tab = index;
			},
			getYes(e){
				console.log(e);
			},
      // 获取标签列表
      async getTagsDatas(){
       const data = await  this.$api.post(global.apiUrls.friends_tab_list)
       const result = data.data.data
       console.log(result,999)
       this.tagsDatas = result
       // 一级分类
       let First_order = []
       result.forEach(item => {
          First_order.push({
            id:item.id,
            name:item.name,
            pid:item.pid
          })
       })
       this.first_order = First_order
     },
     // 选择一级
     selectFirst(item,index){
       this.first_order_index = index
       this.second_level_index = null
       this.tertiary = []
       let second_level = []
        this.tagsDatas[index].children.forEach(item => {
           second_level.push({
             id:item.id,
             name:item.name,
             pid:item.pid
           })
        })
        this.second_level = second_level
     },
     // 选择二级
     selectSecond(item,index){
        this.second_level_index = index
       let tertiary = []
        this.tagsDatas[this.first_order_index].children[index].children.forEach(item => {
           tertiary.push({
             id:item.id,
             name:item.name,
             pid:item.pid,
             status:false
           })
        })
        this.tertiary = tertiary
     },
      // 选择标签
      selectTags(){
        this.popupShow = true
      },
      unique(songs){
           let result = {};
           let finalResult=[];
           for(let i=0;i<songs.length;i++){
               result[songs[i].id]=songs[i];
               //因为songs[i].name不能重复,达到去重效果,且这里必须知晓"name"或是其他键名
           }
           //console.log(result);{"羽根":{name:"羽根",artist:"air"},"晴天":{name:"晴天",artist:"周杰伦"}}
           //现在result内部都是不重复的对象了，只需要将其键值取出来转为数组即可
           for(item in result){
               finalResult.push(result[item]);
           }
           //console.log(finalResult);[{name:"羽根",artist:"air"},{name:"晴天",artist:"周杰伦"}]
           return finalResult;
       },
        unique(arr) {
         let map = new Map();
         for (let item of arr) {
           if (!map.has(item.id)) {
             map.set(item.id, item);
           }
         }
         return [...map.values()];
       },
			// 选择
			getselect(itemData,index){

        if(this.my_selected_list.length >= 6){
          return
        }
        this.tertiary[index].status = !this.tertiary[index].status

        if(this.tertiary[index].status){
          if(this.my_selected_list.length===0){
            this.my_selected_list.push(this.tertiary[index])
          }else{
            let arr = []
            this.tertiary.forEach(v => v.status ? arr.push(v) : '')
            this.my_selected_list =  [...this.my_selected_list,...arr]
             const asdf = this.unique(this.my_selected_list)
             this.my_selected_list = [...asdf]
          }

        }else{
            const flag =  this.my_selected_list.indexOf(v => v.id === this.tertiary[index].id);
            this.my_selected_list.splice(flag,1)
        }
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #fff;
	}
	.content{
    .activedColorText{
      color: red;
    }
		.release-info-up {
			padding: 0 32rpx;

			.release-item {
				display:flex;
				justify-content: space-between;
				align-items: center;
				padding:32rpx 0;
				border-bottom: 1rpx solid #EEEEEE;

				input {
					font-size: 28rpx;
					color: #333;
					font-weight: 500;
				}
			}

			.release-items{
				border-bottom: none;
			}
			.release-item1 {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;

				.upload-text{
					font-size: 28rpx;
					color: #333;
					margin-bottom: 24rpx;
				}

				.release-img-list {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          grid-column-gap: 20rpx;
          grid-row-gap: 20rpx;
					image{
            display: block;
						width: 156rpx;
						height: 160rpx;
					}
				}
			}
		}

		.line {
			height: 20rpx;
			background: #FAFAFC;
		}

		.release-info-down {
			padding: 0 32rpx 32rpx;
			.release-item {
				display:flex;
				justify-content: space-between;
				align-items: center;
				padding:32rpx 0;
				border-bottom: 1rpx solid #EEEEEE;
				input {
					text-align: right;
				}
				view {
					font-size: 32rpx;
					color: #36373D;

					.stars {
						color: #F02525;
						margin-right: 20rpx;
					}
				}
				.select-text {
					image {
						width: 24rpx;
						height: 24rpx;
					}
				}
			}
			.release-item:nth-child(4){
				border-bottom: none;
			}
			.tips {
				font-size: 24rpx;
				color: #999999;
				margin-top: 10rpx;
				margin-bottom: 56rpx;
			}

			.btns {
				width: 100%;
				line-height: 88rpx;
				background: #295B7B;
				color: #fff;
			}
		}

		.popup{
			background: #fff;
			border-radius: 16rpx 16rpx 0 0;

			.popup-title {
				padding: 0 32rpx;
				line-height: 110rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #EEEEEE;
				.cancel{
					font-size: 32rpx;
					color: #BFBFBF;
				}
				.pop-title {
					font-size: 32rpx;
					color: #333333;
				}
				.getyes{
					font-size: 32rpx;
					color: #295B7B;
					font-weight: 500;
				}
			}
			.line{
				width: 100%;
				height: 10rpx;
				background: #FAFAFC;
			}
			.game-type{
				padding: 0 32rpx 32rpx;
        display: flex;
        justify-content: space-between;
				.type-list {
          .type-list-item{
            line-height: 60rpx;
            height: 60rpx;
            &.type-list-item-select{
              display: flex;
              align-items: center;
              justify-content: center;
              .type-list-item-title{
                padding-right: 20rpx;
              }
            }
          }
					// display: flex;
					// justify-content: space-between;
					// align-items: center;
					// padding-top: 40rpx;

					// .types-item {
					// 	width: 600rpx;
					// 	display: flex;
					// 	justify-content: space-around;
					// 	align-items: center;
					// 	text {
					// 		display: inline-block;
					// 		width: 120rpx;
					// 		color: #333333;
					// 		font-size: 28rpx;
					// 	}
					// }

					image {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
			.my-select {
				padding: 32rpx 24rpx 0;
				text{
					color: #999999;
					font-size: 28rpx;
				}
				text:nth-child(1){
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
					width: 165rpx;
					line-height: 64rpx;
					text-align: center;
					position: relative;
					font-size: 28rpx;
					margin-right: 16rpx;
					margin-bottom: 16rpx;

					image{
						width: 28rpx;
						height: 28rpx;
						position: absolute;
						right: -10rpx;
						top: -10rpx;
					}
				}
				.select-item:nth-child(4n){
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
