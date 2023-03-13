<template>
  <view class="content">
    <view class="tips">申请信息</view>
    <view class="authentication-type">
      <view @click=" selectType(1)" :class="{active:tab==1}" class="select-type">公司</view>
      <view @click=" selectType(2)" :class="{active:tab==2}" class="select-type">个人</view>
    </view>
    <view class="info-list" v-if="tab==1">
      <view class="info-item">
        <text>公司名称</text>
        <input type="text" placeholder-class="input-pla" v-model="company_name" placeholder="请输入公司名称">
      </view>
      <view class="info-item">
        <text>公司所在地</text>
        <view class="info-item-text">
          <picker mode="multiSelector" @change="bindPickerChange" @columnchange="columnchange" :range="array" range-key="name" :value="value">
            <view class="uni-input">{{ selectVal.join() || '请选择省市区' }}</view>
          </picker>
					<image src="/static/newPage/18.png" mode="aspectFill"></image>
        </view>
      </view>
      <view class="info-item">
        <text>公司详情地址</text>
        <input type="text" placeholder-class="input-pla" v-model="address" placeholder="请输入详细地址">
      </view>
      <view class="info-item">
        <text>统一社会信用码</text>
        <input type="text" placeholder-class="input-pla" v-model="business_id" placeholder="请输入统一社会信用码">
      </view>
      <view class="info-item">
        <text>营业执照</text>
         <image v-if="business_license" class="add-img" :src="business_license" mode="aspectFill"></image>
         <image v-else class="add-img" src="/static/add-img.png" mode="aspectFill" @click="updataImg(3)"></image>
      </view>
    </view>
    <view class="line" v-if="tab==1"></view>
    <view class="info-list">
      <view class="info-item" v-if="tab==1">
        <text>法人姓名</text>
        <input type="text" placeholder-class="input-pla" v-model="name" placeholder="请输入姓名">
      </view>
      <view class="info-item" v-if="tab==1">
        <text>法人手机</text>
        <input type="text" placeholder-class="input-pla" v-model="mobile" placeholder="请输入手机号">
      </view>
      <view class="info-item" v-if="tab==1">
        <text>法人身份证</text>
        <input type="text" placeholder-class="input-pla"  v-model="idcard_no" placeholder="请输入身份证号">
      </view>
      <view class="info-item" v-if="tab==2">
        <text>联系人姓名</text>
        <input type="text" placeholder-class="input-pla" v-model="name" placeholder="请输入姓名">
      </view>
      <view class="info-item" v-if="tab==2">
        <text>联系人手机</text>
        <input type="text" placeholder-class="input-pla" v-model="mobile" placeholder="请输入手机号">
      </view>
      <view class="info-item" v-if="tab==2">
        <text>联系人身份证</text>
        <input type="text" placeholder-class="input-pla" v-model="idcard_no" placeholder="请输入身份证号">
      </view>
      <view class="card-img">
        <view class="card-img-item">
          <image v-if="idcard_front" :src="idcard_front" mode="aspectFill"></image>
          <image v-else src="/static/newPage/20.png" mode="aspectFill" @click="updataImg(1)"></image>
          <view class="">身份证正面</view>
        </view>
        <view class="card-img-item">
          <image src="/static/newPage/21.png" mode=""></image>
          <view class="">（示例）</view>
        </view>
        <view class="card-img-item">
          <image v-if="idcard_reverse" :src="idcard_reverse" mode="aspectFill"></image>
          <image v-else src="/static/newPage/20.png" mode="aspectFill" @click="updataImg(2)"></image>
          <view class="">身份证反面</view>
        </view>
        <view class="card-img-item">
          <image src="/static/newPage/22.png" mode=""></image>
          <view class="">（示例）</view>
        </view>
      </view>
    </view>
    <view class="authentication-type btns">
      <view class="step">上一步</view>
      <view class="next" @click="toPath('/pages/tab/tradingMall/settlementInformation')">下一步</view>
    </view>
  </view>
</template>

<script>
  import {
    PROVINCE_DATAS,
    CITY_DATAS,
    COUNTY__DATAS
  } from '@/common/constStatic.js'
  import AllAddress from '@/common/data.js'

  import {
    host,
    SERIAL
  } from '@/common/config.js'

  export default {
    data() {
      return {
        tab: 1,
        auth_type: 1, //  认证类型1公司2个人
        company_name: "", // 公司名称
        address: "", // 详细地址
        business_id: "", // 统一社会信用码
        business_license: "", //营业执照
        name: "", // 法人/个人姓名
        mobile: "", // 手机号码
        idcard_no: "", // 证件号码
        idcard_front: "", // 身份证正面
        idcard_reverse: "", // 身份证反面

        selectVal:['', '', ''],
        value: [0, 0, 0],
        array: [],
        index: 0,
        id:'',
      }
    },
    onLoad(options) {
      this.id = options.id ? options.id : ''
      this.initSelect()
    },
    methods: {
      // 初始化地址选项
      initSelect() {
        this.updateSourceDate() // 更新源数据
        this.updateAddressDate() // 更新结果数据
        this.$forceUpdate() // 触发双向绑定
      },
      columnchange(d) {
        this.updateSelectIndex(d.detail.column, d.detail.value) // 更新选择索引
          .updateSourceDate() // 更新源数据
          .updateAddressDate() // 更新结果数据
          .$forceUpdate() // 触发双向绑定
      },
      /**
       * 更新源数据
       * */
      updateSourceDate() {
        this.array = []
        this.array[0] = AllAddress.map(obj => {
          return {
            name: obj.name
          }
        })
        this.array[1] = AllAddress[this.value[0]].city.map(obj => {
          return {
            name: obj.name
          }
        })
        this.array[2] = AllAddress[this.value[0]].city[this.value[1]].area.map(obj => {
          return {
            name: obj
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

      /**
       * 点击确定
       * */
      bindPickerChange(e) {
        console.log(this.value,this.selectVal,99999)

      },

      selectType(item) {
        this.tab = item
        this.auth_type = item
      },
      updataImg(type) {
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
                  if (type===1) {
                    this.idcard_front = data.data[0].path
                  } else if(type === 2){
                    this.idcard_reverse = data.data[0].path
                  }else{
                    this.business_license = data.data[0].path
                  }
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

      toPath(url) {
        if (!this.name.trim()) {
          this.$message.info('联系人不能为空')
          return;
        }
        if (!this.mobile.trim()) {
          this.$message.info('手机号不能为空')
          return;
        }
        if (!this.idcard_no.trim()) {
          this.$message.info('联系人身份证不能为空')
          return;
        }
        if (!this.idcard_front || !this.idcard_reverse) {
          this.$message.info('请上传联系人身份证')
          return;
        }

        let certification = {} 
        if(this.id){
          certification = {
            id:this.id,
            auth_type: this.auth_type, //  认证类型1公司2个人
            name: this.name, // 法人/个人姓名
            mobile: this.mobile, // 手机号码
            idcard_no: this.idcard_no, // 证件号码
            idcard_front: this.idcard_front, // 身份证正面
            idcard_reverse: this.idcard_reverse, // 身份证反面
            company_name: this.company_name, // 公司名称
            province:this.selectVal[0], // 公司所在省份名称
            city:this.selectVal[1], // 公司所在城市名称
            area:this.selectVal[2], // 公司所在区域名称
            address: this.address, // 详细地址
            business_id: this.business_id, // 统一社会信用码
            business_license: this.business_license, //营业执照
          }
          
        }else{
          certification = {
            auth_type: this.auth_type, //  认证类型1公司2个人
            name: this.name, // 法人/个人姓名
            mobile: this.mobile, // 手机号码
            idcard_no: this.idcard_no, // 证件号码
            idcard_front: this.idcard_front, // 身份证正面
            idcard_reverse: this.idcard_reverse, // 身份证反面
            company_name: this.company_name, // 公司名称
            province:this.selectVal[0], // 公司所在省份名称
            city:this.selectVal[1], // 公司所在城市名称
            area:this.selectVal[2], // 公司所在区域名称
            address: this.address, // 详细地址
            business_id: this.business_id, // 统一社会信用码
            business_license: this.business_license, //营业执照
          }
        }
        uni.setStorageSync('certification', JSON.stringify(certification));

        uni.navigateTo({
          url: url
        })
      }
    }
  }
</script>

<style lang="scss">
  .content {
    .tips {
      font-size: 28rpx;
      color: #0E0E0C;
      padding: 20rpx 32rpx;
    }

    .authentication-type {
      background: #fff;
      padding: 32rpx 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 20rpx;

      .select-type {
        width: 240rpx;
        line-height: 64rpx;
        background: #FBFBFB;
        text-align: center;
        font-size: 28rpx;
        color: #333333;
      }

      .active {
        background: #295B7B;
        color: #fff;
      }

      .step {
        width: 280rpx;
        line-height: 88rpx;
        background-color: #EEEEEE;
        text-align: center;
        font-size: 28rpx;
      }

      .next {
        width: 280rpx;
        line-height: 88rpx;
        background-color: #295B7B;
        text-align: center;
        color: #fff;
        font-size: 28rpx;
      }
    }

    .info-list {
      background: #fff;
      padding: 0 32rpx;

      .info-item {
        padding: 32rpx 0;
        border-bottom: 1rpx solid #EEEEEE;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .input-pla {
          color: #BFBFBF;
        }

        text {
          font-size: 32rpx;
          color: #333;
        }

        input {
          text-align: right;
        }

        .info-item-text {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          image {
            width: 32rpx;
            height: 32rpx;
          }
        }

        .add-img {
          width: 160rpx;
          height: 160rpx;
        }
      }

      .card-img {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        .card-img-item {
          text-align: center;
          padding-top: 32rpx;

          image {
            width: 314rpx;
            height: 204rpx;
          }

          view {
            font-size: 28rpx;
            color: #333333;
            margin-top: 24rpx;
          }
        }
      }
    }

    .line {
      height: 20rpx;
      background: #F8F8F8;
    }

    .btns {
      padding-top: 80rpx;
    }
  }
</style>
