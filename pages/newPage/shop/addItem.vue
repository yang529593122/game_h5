<template>
  <view class="content">
    <view class="add-info-item">
      <view class="add-tips">
        <view class="add-title">商品标题</view>
      </view>
      <textarea class="add-input" v-model="formDatas.name" placeholder-class="add-input-tips"
        placeholder="请输入商品标题，如商品品牌+名字等" cols="30" rows="10"></textarea>
    </view>
    <view class="add-info-item">
      <view class="add-tips">
        <view class="add-title">
          <text>商品封面图片</text>
          <text>(请上传尺寸400*400像素的图片)</text>
        </view>
        <text>{{ formDatas.thumb ? 1 : 0 }}/1</text>
      </view>
      <view class="img-list">
        <view class="img-item" v-if="formDatas.thumb">
          <image :src="formDatas.thumb" mode="aspectFill"></image>
          <image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
        </view>
        <image v-else class="add-icon" src="/static/add-img.png" mode="aspectFill" @click="uploadCover"></image>
      </view>
    </view>
    <view class="add-info-item">
      <view class="add-tips">
        <view class="add-title">
          <text>商品视频</text>
        </view>
        <text>{{ formDatas.video ? 1 : 0 }}/1</text>
      </view>
      <view class="img-list">
        <video v-if="formDatas.video" style="width:100%" :src="formDatas.video" :controls="false"></video>
        <image v-else class="add-icon" src="/static/add-img.png" mode="aspectFill" @click="uploadVideo"></image>
      </view>
    </view>
    <view class="add-info-item">
      <view class="add-tips">
        <view class="add-title">
          <text>商品轮播图</text>
          <text>(请上传尺寸400*400像素的图片)</text>
        </view>
        <text>{{ formDatas.images.length }}/9</text>
      </view>
      <view class="img-list">
        <view class="img-item" v-for="(item,index) in formDatas.images ">
          <image :src="item" mode="aspectFill"></image>
          <image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
        </view>
        <image v-if="formDatas.images.length < 9" class="add-icon" src="/static/add-img.png" mode="aspectFill"
          @click="uploadBanner"></image>
      </view>
    </view>
    <view class="add-info-item">
      <textarea placeholder="描述一下商品" v-model="formDatas.body" cols="30" rows="10"></textarea>
    </view>
    <view class="add-info-item">
      <view class="add-tips">
        <view class="add-title">
          <text>商品详情图</text>
        </view>
      </view>
      <view class="img-list">
        <view class="img-item" v-for="(item,index) in formDatas.detail_images ">
          <image :src="item" mode="aspectFill"></image>
          <image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
        </view>
        <image class="add-icon" src="/static/add-img.png" mode="aspectFill" @click="uploadDetailsImg"></image>
      </view>
    </view>
    <view class="item-input">
      <text class="input-tips">商品分类</text>
      <view class="select-input">
        <picker mode="multiSelector" @change="bindPickerChange" @columnchange="columnchange" :range="array" range-key="name" :value="value">
          <view class="uni-input">{{ selectVal.join() || '请选择分类' }}</view>
        </picker>
        <image class="right-icon" src="/static/newPage/66.png" mode=""></image>
      </view>
    </view>
    <view class="item-input">
      <text class="input-tips">是否上架</text>
      <switch color="#659BC7" class="switch" :checked="isSale" @change="isSaleFn" />
    </view>
    <view class="item-input">
      <text class="input-tips">是否开启规格</text>
      <switch color="#659BC7" class="switch" :checked="isSspec" @change="isSspecFn" />
    </view>
    <view class="item-input" v-if='isSspec'>
      <text class="input-tips">规格名称</text>
     <input class="input-item" type="text" v-model="formDatas.spec_name" placeholder="请输入规格名称">
    </view>
    <view class="item-input" v-if='isSspec' @click="getToPath('/pages/newPage/shop/skuDetail')">
      <text class="input-tips">规格详情</text>
      <view class="select-input">
        <text>价格、库存</text>
        <image class="right-icon" src="/static/newPage/66.png" mode=""></image>
      </view>
    </view>
    <view class="item-input">
      <text class="input-tips">划线价</text>
      <input class="input-item" type="text" v-model="formDatas.market_price" placeholder="请输入商品划线价">
    </view>
    <view class="item-input">
      <text class="input-tips">本店价</text>
      <input class="input-item" type="text"  v-model="formDatas.shop_price" placeholder="请输入商品本店价">
    </view>
    <view class="item-input">
      <text class="input-tips">成本价</text>
      <input class="input-item" type="text" v-model="formDatas.cost_price"  placeholder="请输入成本价">
    </view>
    <view class="item-input">
      <text class="input-tips">总库存</text>
      <input class="input-item" type="text" v-model="formDatas.stock" placeholder="请输入商品库存">
    </view>
    <view class="item-input">
      <text class="input-tips">是否自动发货</text>
      <label class="radio">
        <radio-group @change="radioChange">
        				<label v-for="(item, index) in [{ value:'1',name:'自动发货' },{ value:'0',name:'非自动发货' }]" :key="index">
        						<radio class="radio-item" :value="item.value" :checked="index === current" />
        					<text>{{item.name}}</text>
        				</label>
        			</radio-group>
      </label>
    </view>
    <view class="sku-list">
      <view class="sku-item"  v-for="(item,index) in itemGame">
        <view class="sku-input">
          <view class="sku-input-item" >
            <text class="input-tips">卡号</text>
            <input type="text" placeholder="请输入卡号" v-model='item.card_no' >
          </view>
          <view class="sku-input-item">
            <text class="input-tips">密码</text>
            <input type="text" placeholder="请输入密码" v-model='item.password'>
          </view>
        </view>
        <image class="delete-icon" src="/static/newPage/67.png" mode="aspectFill" @click="delZh(item,index)"></image>
      </view>
      <view class="add-sku" @click="addSku">+添加一组</view>
    </view>
    <view style="height: 220rpx;"></view>
    <view class="confirm-release">
      <view class="confirm-tips">注：订单交易成功将收取1%手续费</view>
      <button class="confirm-btn" @click='submitFn'>确认发布</button>
    </view>
  </view>
</template>

<script>
  import {
    host,
    SERIAL,
    UPLOAD_VIDEO_URL
  } from '@/common/config.js'
  export default {
    data() {
      return {
        commodity: false,
        AllAddress:[],
        selectVal:['', '', ''],
        value: [0, 0, 0],
        array: [],
        index: 0,
        id:'',

        isSale:true,
        isSspec:false,
        current:0,
        formDatas: {
          name: "", // 商品名称
          cid:'' , // 分类id
          thumb: "", // 商品封面图
          video: "", // 视频
          images: [], // 轮播图，用英文逗号分割
          detail_images: [], // 详情图片，用英文逗号分割
          body: "", // 商品详情
          is_sale: "", // 是否上架：0.下架；1.上架
          is_spec: "", // 是否开启规格:0.否；1.是
          spec_name: "", // 规格名称
          spec: "", // 规格
          market_price: "", // 划线价
          shop_price: "", // 	本店价
          cost_price: "", // 	成本价
          stock: "", // 库存数量
          is_auto_shipping: "1", // 是否自动发货：0.否；1.是
          cardinfo: "", // 卡号密码json字符串（id=编辑时传，card_no=卡号，password=密码）
        },
        itemGame:[
          {
            id:'',
            card_no:"",
            password:'',
          }
        ]
      }
    },
    onLoad() {
        this.initType()

    },
    methods: {
      // 上传图片
      uploadCover() {
        uni.chooseImage({
          count: 1, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            uni.uploadFile({
              url: host + '/api' + global.apiUrls.UPLOAD_IMAGE_URL,
              filePath: res.tempFilePaths[0],
              name: 'file',
              header: {
                'user-token': global.token || '',
                'Accept-Language': global.locale,
                'Accept-Serial': SERIAL,
              },
              formData: {
                'module': '',
                'dir': ''
              },
              success: res => {
                let data = JSON.parse(res.data);
                if (data.code == 1) {
                  this.formDatas.thumb = data.data[0].path
                } else {
                  message.info(global.i18n['图片上传失败，请重试'])
                }
              },
              complete: () => {

              }
            });
          }
        });
      },
      // 上传视频
      uploadVideo() {
        uni.chooseVideo({
          count: 1,
          sourceType: ["camera", "album"],
          success: (res) => {
            console.log(res)
            uni.uploadFile({
              url: host + '/api' + global.apiUrls.UPLOAD_IMAGE_URL,
              filePath: res.tempFilePath,
              name: 'file',
              header: {
                'user-token': global.token || '',
                'Accept-Language': global.locale,
                'Accept-Serial': SERIAL,
              },
              formData: {
                'module': '',
                'dir': 'files'
              },
              success: res => {
                let data = JSON.parse(res.data);
                if (data.code == 1) {
                  this.formDatas.video = data.data[0].path
                } else {
                  this.$message.info(data.msg)
                  // this.$message.info(global.i18n['图片上传失败，请重试'])
                }
              },
              complete: () => {

              }
            });


          },
        });


      },
      // 上传轮播图
      uploadBanner() {
        uni.chooseImage({
          count: 1, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            uni.uploadFile({
              url: host + '/api' + global.apiUrls.UPLOAD_IMAGE_URL,
              filePath: res.tempFilePaths[0],
              name: 'file',
              header: {
                'user-token': global.token || '',
                'Accept-Language': global.locale,
                'Accept-Serial': SERIAL,
              },
              formData: {
                'module': '',
                'dir': ''
              },
              success: res => {
                let data = JSON.parse(res.data);
                if (data.code == 1) {
                  this.formDatas.images = [...this.formDatas.images, data.data[0].path]
                } else {
                  message.info(global.i18n['图片上传失败，请重试'])
                }
              },
              complete: () => {

              }
            });
          }
        });
      },
      // 上传详情图片
      uploadDetailsImg() {
        uni.chooseImage({
          count: 1, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            uni.uploadFile({
              url: host + '/api' + global.apiUrls.UPLOAD_IMAGE_URL,
              filePath: res.tempFilePaths[0],
              name: 'file',
              header: {
                'user-token': global.token || '',
                'Accept-Language': global.locale,
                'Accept-Serial': SERIAL,
              },
              formData: {
                'module': '',
                'dir': ''
              },
              success: res => {
                let data = JSON.parse(res.data);
                if (data.code == 1) {
                  this.formDatas.detail_images = [...this.formDatas.detail_images, data.data[0].path]
                } else {
                  message.info(global.i18n['图片上传失败，请重试'])
                }
              },
              complete: () => {

              }
            });
          }
        });
      },
      // 商品分类
      initType(){
        this.$api.get(global.apiUrls.shop_get_category_list).then(res => {
          if (res.data.code === '1') {
           this.AllAddress=res.data.data
           this.updateSourceDate() // 更新源数据
           this.updateAddressDate() // 更新结果数据
           // this.$forceUpdate() // 触发双向绑定
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },
      bindPickerChange(e) {
       this.formDatas.cid =  this.AllAddress[this.value[0]].child[this.value[1]].child[this.value[2]].id
      },
      /**
       * 更新源数据
       * */
      updateSourceDate() {
        this.array = []

        this.array[0] = this.AllAddress.map(obj => {
          return {
            name: obj.name
          }
        })
        this.array[1] = this.AllAddress[this.value[0]].child.map(obj => {
          return {
            name: obj.name
          }
        })
        this.array[2] = this.AllAddress[this.value[0]].child[this.value[1]].child.map(obj => {
          return {
            name: obj.name
          }
        })
        return this
      },
      /**
       * 更新索引
       * */
      updateSelectIndex(column, value) {
        let arr = JSON.parse(JSON.stringify(this.value))
        arr[column] = value
        if (column === 0) {
          arr[1] = 0
          arr[2] = 0
        }
        if (column === 1) {
          arr[2] = 0
        }
        this.value = arr
        return this
      },

      /**
       * 更新结果数据
       * */
      updateAddressDate() {
        this.selectVal[0] = this.array[0][this.value[0]].name
        this.selectVal[1] = this.array[1][this.value[1]].name
        this.selectVal[2] = this.array[2][this.value[2]].name
        return this
      },
      columnchange(d) {
        this.updateSelectIndex(d.detail.column, d.detail.value) // 更新选择索引
          .updateSourceDate() // 更新源数据
          .updateAddressDate() // 更新结果数据
          .$forceUpdate() // 触发双向绑定
      },
      // 是否上架
      isSaleFn(e){
        this.isSale = e.detail.value
      },
      // 是否开启规格
      isSspecFn(e){
        this.isSspec = e.detail.value
      },
      // 是否自动发货
      radioChange(e){
        this.formDatas.is_auto_shipping = e.detail.value
      },
      // 添加一组账号
      addSku(){
        this.itemGame.push({

            id:'',
            card_no:"",
            password:'',
        })
      },
      // 确认发布
      submitFn(){



        const obj =  {
          name: this.formDatas.name, // 商品名称
          cid: this.formDatas.cid  , // 分类id
          thumb: this.formDatas.thumb, // 商品封面图
          video: this.formDatas.video, // 视频
          images: this.formDatas.images.length ? this.formDatas.images.join() : '', // 轮播图，用英文逗号分割
          detail_images:  this.formDatas.detail_images.length ? this.formDatas.detail_images.join() : ''  , // 详情图片，用英文逗号分割
          body: this.formDatas.body, // 商品详情
          is_sale: this.isSale ? 1 : 0, // 是否上架：0.下架；1.上架
          is_spec: this.isSspec ? 1 : 0, // 是否开启规格:0.否；1.是
          spec_name: "", // 规格名称
          spec: "", // 规格
          market_price: this.formDatas.market_price, // 划线价
          shop_price: this.formDatas.shop_price, // 	本店价
          cost_price: this.formDatas.cost_price, // 	成本价
          stock: this.formDatas.stock, // 库存数量
          is_auto_shipping: 1, // 是否自动发货：0.否；1.是
          cardinfo: JSON.stringify(this.itemGame), // 卡号密码json字符串（id=编辑时传，card_no=卡号，password=密码）
        }
        this.$api.post(global.apiUrls.shop_publish_goods,obj).then(res => {
          if (res.data.code === '1') {
           uni.navigateTo({
             url:'/pages/tab/my/business/commodity'
           })
          } else {
            this.$message.info(res.data.msg);
          }
        })

      },
      delZh(item,index){
        this.itemGame.splice(index,1)
      },
      getToPath(url) {
        uni.navigateTo({
          url: url
        })
      }
    }
  }
</script>

<style lang="scss">
  .content {
    .add-info-item {
      padding: 32rpx;
      background: #fff;
      margin-bottom: 20rpx;

      .add-tips {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24rpx;

        .add-title {
          font-size: 28rpx;
          font-weight: bold;

          text:nth-child(2) {
            font-size: 24rpx;
            color: #B7BAC2;
          }
        }
      }

      .add-input {
        width: 100%;
        height: 100rpx;
        font-size: 28rpx;
        line-height: 35rpx;
      }

      .add-input-tips {
        color: #B7BAC2;
      }

      .img-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        .img-item {
          width: 140rpx;
          height: 140rpx;
          position: relative;
          margin-right: 15rpx;
          margin-bottom: 15rpx;

          image {
            width: 100%;
            height: 100%;
          }

          .delete-icon {
            width: 32rpx;
            height: 32rpx;
            position: absolute;
            top: -10rpx;
            right: -10rpx;
          }
        }

        .add-icon {
          width: 140rpx;
          height: 140rpx;
        }
      }
    }

    .item-input {
      padding: 32rpx;
      background: #fff;
      border-bottom: 1rpx solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .input-tips {
        font-size: 32rpx;
        color: #36373D;
      }

      .select-input {
        display: flex;
        justify-content: center;
        align-items: center;

        text {
          font-size: 32rpx;
          color: #868686;
          margin-right: 5rpx;
        }

        image {
          width: 24rpx;
          height: 24rpx;
        }

        .go-add {
          color: #3B82CD;
          margin-right: 5rpx;
        }
      }

      .input-item {
        text-align: right;
      }

      .radio {
        .radio-item {
          transform: scale(0.7);
          vertical-align: middle;
        }

        text {
          vertical-align: middle;
          font-size: 32rpx;
          color: #868686;
          margin-left: 10rpx;
        }

        text:nth-child(2) {
          margin-right: 40rpx;
        }
      }
    }

    .sku-list {
      padding: 0 32rpx;

      background: #fff;

      .sku-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 1px solid #eee;
        padding: 32rpx 0;

        .delete-icon {
          width: 22rpx;
          height: 25rpx;
        }

        .sku-input {
          .sku-input-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            text {
              font-size: 32rpx;
              color: #36373D;
            }

            input {
              height: 60rpx;
              line-height: 60rpx;
              border: 1px solid rgba(101, 155, 199, 0.349);
              font-size: 32rpx;
              padding: 0 24rpx;
              margin-left: 40rpx;
            }
          }

          .sku-input-item:nth-child(1) {
            margin-bottom: 26rpx;
          }
        }
      }

      .add-sku {
        padding: 20rpx 0;
        font-size: 32rpx;
        color: #659BC7;
      }
    }

    .confirm-release {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 24px 32rpx 40rpx;
      background: #fff;
      z-index: 100;

      .confirm-tips {
        font-size: 26rpx;
        color: #36373D;
      }

      .confirm-btn {
        width: 686rpx;
        line-height: 88rpx;
        background: #295B7B;
        color: #fff;
        font-size: 28rpx;
        margin-top: 22rpx;
      }
    }
  }
</style>
