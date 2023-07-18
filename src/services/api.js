import env from '../../env.js'
// 美界私有化
const hostBms = env.api.bms;
const hostApp = env.api.app;

//获取BMS令牌
export const getTokenBms = `${hostBms}/tablet/token/get`;
//用户登录
export const loginAction = `${hostBms}/tablet/login/user`;
//重置密码--获取验证码
export const resetpwdSendCode = `${hostBms}/tablet/resetpwd/sendcode`;
//重置密码--重置
export const resetpwdSubmit = `${hostBms}/tablet/resetpwd/reset`;
//收银开单初始化
export const initCashierBilling = `${hostBms}/tablet/billing/init`;
//收银开单获取自动生成水单号
export const initCashierBillingFlowNumber = `${hostBms}/tablet/billing/find/tablet/flownumber`;
//收银挂单
export const saveCashierBilling = `${hostBms}/tablet/billing/save`;
//收银预算
export const prePayCashierBilling = `${hostBms}/tablet/pay/bill/pay4`;
//删除订单
export const deleteCashierBilling = `${hostBms}/tablet/billing/delete`;
//收银app支付
export const appPayCashierBilling = `${hostBms}//tablet/billing/app/binding`;
//收银校验水单号
export const checkFlowNoCashierBilling = `${hostBms}//tablet/billing/check/flownumber`;
//收银减扣库存
export const preStockCashierBilling = `${hostBms}/tablet/pay/bill/stock/preReduce`;
//库存检查
export const preCheckStock = `${hostBms}/tablet/pay/bill/stock/preCheck`;
//收银微信|支付宝
export const payCashierBilling = `${hostBms}/tablet/pay/f2f/process`;
//获取会员信息
export const fetchMemberInfo = `${hostBms}/tablet/vipcard/find/members/info`;
//根据会员id查询对应的卡信息
export const fetchMemberCardList = `${hostBms}/tablet/vipcard/find/members/card/list`;
//获取等待会员信息
export const fetchWaitingMembersInfo = `${hostBms}/tablet/member/store/queue`;
//获取登录人员的权限信息
export const selectStaffAclInfo = `${hostBms}/tablet/member/staff/acl/set/list`;
//获取会员对应的会员卡信息
export const fetchWaitingMemberCardInfo = `${hostBms}/tablet/member/customer/cardinfo`;
//获取版本号信息
export const fetchFindVersionInfo = `${hostBms}/tablet/check/version`;

export const fetchCardConsumeHistory = `${hostBms}/tablet/vipcard/find/cardconsumehistory`;
//挂单列表
export const getPendingList = `${hostBms}/tablet/billing/get/info`;
//结单列表
export const getBillingList = `${hostBms}/tablet/billing/get/list`;
//服务人列表
export const billingSearch = `${hostBms}/tablet/billing/search`;
//新：卡列表
export const getVipcardSales = `${hostBms}/tablet/vipcard/find/tablet/cardsales`;
//获取外联支付列表
export const getOtherPayType = `${hostBms}/tablet/vipcard/find/otherpaytype`;
//外联支付
export const payOtherPayment = `${hostBms}/tablet/pay/otherpayment/tablet/process`;
//创建卡订单
export const createCardOrder = `${hostBms}/tablet/pay/f2f/process`;
//查询支付结果
export const getPaymentResult = `${hostBms}/tablet/pay/f2f/check`;
//生成会员号
export const getMemberNo = `${hostBms}/tablet/member/getmemberno`;
//创建会员
export const createNewMember = `${hostBms}/tablet/member/updatememberinfo`;
//查询创建会员是否需要设置密码
export const fetchMemberPasswordStat = `${hostBms}/tablet/member/getmemberpwdstat`;
//查询轮牌
export const getStoreDutys = `${hostBms}/tablet/dutytable/setting/findDatas`;
//上下牌
export const updateDutyStaffs = `${hostBms}/tablet/dutytable/setting/staffs/modify`;
//修改轮牌状态
export const updateDutyStaffStatus = `${hostBms}/tablet/dutytable/setting/staff/updateStatus`;
//洗牌
export const resetDutyStaffs = `${hostBms}/tablet/dutytable/setting/staff/reset`;
//修改顺序
export const sortDutyStaffs = `${hostBms}/tablet/dutytable/setting/staff/sort`;
export const saveStaffOrder = `${hostBms}/tablet/dutytable/setting/saveStaffOrder`;
//查询轮牌设置
export const getStoreDutysSetting = `${hostBms}/tablet/dutytable/setting/findlist`;
//修改轮牌设置
export const modifyStoreDutysSetting = `${hostBms}/tablet/dutytable/setting/modify`;
//修改轮牌设置
export const deleteDutyTableSetting = `${hostBms}/tablet/dutytable/setting/delete`;
//改变轮牌设置排序
export const changeSortOfDutysSetting = `${hostBms}/tablet/dutytable/setting/changesort`;
//轮牌设置资源校验
export const checkResource = `${hostBms}/tablet/dutytable/setting/checkResource`;
//轮牌批量保存
export const batchSaveDutyStaffs = `${hostBms}/tablet/dutytable/setting/staffs/save/batch`;
//查询订单
export const findBillingDetails4Modify = `${hostBms}/tablet/billing/get/detail`;
//订单维护保存订单
export const modifyBilling = `${hostBms}/tablet/billing/modify`;
//查询员工的轮排信息
export const findStaffRotateInfo = `${hostBms}/tablet/staff/find/staff/rotateinfo`;
//保存员工的轮排信息
export const saveStaffRotateInfo = `${hostBms}/tablet/staff/save/staff/rotateinfo`;
export const findStaffAcl = `${hostBms}/tablet/vipcard/find/staff/acl`;
//并单支付订单数据加载
export const mergePayInit = `${hostBms}/tablet/billing/merge/pay/init`;
//并单APP支付绑定订单
export const mergeBindBilling4App = `${hostBms}/tablet/billing/binding/merge`;
//订单转换为会员单
export const changeOwner = `${hostBms}/tablet/billing/changeOwner`;
//价目表信息
export const priceListInfo = `${hostBms}/tablet/priceset/find/priceset/info`;
//项目明细
export const priceListItemDetail = `${hostBms}/tablet/priceset/find/priceset/detail/info`;
//营业收入页面地址
export const getDayCountPager = `${hostBms}/tablet/h5/statistics/pager`;
//相关设置信息
export const getCommonSetting = `${hostBms}/tablet/common/settings`;
//权限信息
export const getRights = `${hostBms}/tablet/rights/info`;
//获取限购信息
export const getLimitItems = `${hostBms}/tablet/billing/mkt/userBuyLimit`
//获取可用优惠券
export const getAvailablePaymentInfo = `${hostApp}/billing/prepay/payment`;
//获取BMS令牌
export const getTokenApp = `${hostApp}/safe/code/get`;
//轮牌:门店员工列表
export const staffQueues = `${hostApp}/customerapp/staffinfo/findbypagerforstore`;
//轮牌:员工作品列表
export const staffWorks = `${hostApp}/staff/homepage/data/list`;
//新预约开单
export const getReserveInfo = `${hostBms}/tablet/new/reserve/find/reserve/list`;
//员工占用
export const saveReserveVocation = `${hostBms}/tablet/new/reserve/save/staff/vocation`;
//取消预约、占用
export const cancelStaffReserve = `${hostBms}/tablet/new/reserve/cancal/staff/vocation/reserve`;
//获取预约基础信息
export const getReserveInitData = `${hostBms}/tablet/new/reserve/find/reserve/info/init`;
//获取appuser用户信息
export const getAppUserInfo = `${hostBms}/tablet/new/reserve/find/reserve/appuser/info`
//保存顾客预约
export const saveCustomerReserve = `${hostBms}/tablet/new/reserve/save/new/reserve/info`
//更新顾客预约
export const updateCustomerReserve = `${hostBms}/tablet/new/reserve/update/new/reserve/info`
//获取顾客信息
export const getCustomerDetail = `${hostBms}/tablet/new/reserve/find/member/all/info`
//获取单档案顾客信息
export const getMemberDetail = `${hostBms}/tablet/new/reserve/find/bms/member/all/info`
//卡延期
export const updateCardValidity = `${hostBms}/tablet/new/reserve/update/card/validity`
//获取刷新状态
export const getRefreshState=`${hostBms}/tablet/new/reserve/find/reserve/is/change`
//根据AppUserId获取BMS会员信息
export const getMemberInfo=`${hostBms}/tablet/new/reserve/find/bms/member/info`
//获取散客开单二维码
export const getGuestQRImg=`${hostBms}/tablet/new/reserve/wx/qr/image`
//获取二维码扫描状态
export const getScanQRState = `${hostBms}/tablet/new/reserve/find/vcord/record`
//更新会员个人档案
export const updateMemberProfile = `${hostBms}/tablet/new/reserve/update/customer/base/info`
