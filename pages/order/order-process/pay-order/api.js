export default {
  postDelOrder: '/v1/5dd6330bae65c',// 删除订单
  postPayWaysList: '/v1/5fd081091c411',//支付方式
  getOrderDetail: "/v1/5d88ab98cbb1f", //统一查询订单
  getMyMoney: '/v1/5cc45274d6be9', // 获取金额信息
  isSetPay: '/v1/5f64a4d364b44', // 判断用户是否设置支付密码
  balancepayOrder: '/v1/5e489f45a051d', // 余额支付
  wxpayOrder: "/v1/5d7868c138418", // 发起微信支付
  alipayOrder: "/v1/5d7a088403825", // 发起支付宝支付
  mixinpayOrder: '/v1/5ee9c2e931ee0', // 混合支付 余额+微信
	
	gamegetgamegoodsinfo : '/v1/62bad9d42c0fe',//根据订单号获取游戏和商品信息
	gamepayorder : '/v1/62baa4cf0fc91',//
	gamecheckpaystatus : '/v1/62bbaff30f193',//支付结果
	gamegetorderprice : '/v1/62d62a3532057',
	huoquzhifushifoukaitong : '/v1/62ec6a7b460e5',//获取支付是否开通
}