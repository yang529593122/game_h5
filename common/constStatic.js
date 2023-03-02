/**
  * @Description: 全局常量定义 方便维护
  *
  * @author: PengFei Yang
  *
  * @createTime: 2023-02-28 17:37:48
  */


export const HOT_GAME = "a" // 热门标识
export const HOT_GAME_TEXT = "热" // 热门标识
export const BUY_NAV_DATAS = [
  {
    name: '全部',
    id: 0
  },
  {
    name: '端游',
    id: 1,
  },
  {
    name: '手游',
    id: 2
  }
]

//议价竞拍 筛选条件

export const BARGAINING_CONDITIONS = [
  {
    id:0,
    title:"时间",
    order:1, // 1.议价结束时间升序；2.议价结束时间倒序
  },
  {
    id:1,
    title:"价格",
    order:4, // 4.当前竞拍价升序；5.当前竞拍价倒序
  }
]

// 议价申请导航

export const BARGAINING_APPLYFOR_NAV_DATAS = [
  {
      id: 0,
      title: '全部',
      status: '-1',
    },
    {
      id: 1,
      title: '审核中',
      status: '0',
    },
    {
      id: 2,
      title: '审核通过',
      status: '1',
    },
    {
      id: 3,
      title: '审核拒绝',
      status: '2',
    },
]
// 我的议价
// 状态：-1=全部；0=议价中；1=议价成功；2=议价失败
export const BARGAINING_PARTICIPATEIN_NAV_DATAS = [
  {
      id: 0,
      title: '全部',
      status: '-1',
    },
    {
      id: 1,
      title: '议价中',
      status: '0',
    },
    {
      id: 2,
      title: '议价成功',
      status: '1',
    },
    {
      id: 3,
      title: '议价失败',
      status: '2',
    },
]
// 1.议价中；2.议价成功；3.议价失败；4.交易成功
export const BARGAINING_RECEIVE_NAV_DATAS = [
  {
      id: 0,
      title: '议价中',
      status: 1,
    },
    {
      id: 1,
      title: '议价成功',
      status: 2,
    },
    {
      id: 2,
      title: '议价失败',
      status: 3,
    },
    {
      id: 3,
      title: '交易成功',
      status: 4,
    },
]
