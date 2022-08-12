// 美界私有化
const devHost = 'https://magi.magugi.com';
const prodHost = 'https://magi.magugi.com';

// 自测
// const devHost = 'http://192.168.1.194:8000/bms';
// const prodHost = 'http://192.168.1.194:8000/bms';

const host = __DEV__ ? devHost : prodHost;

//获取令牌
export const getToken = `${host}/tablet/token/get`;
//用户登录
export const loginAction = `${host}/tablet/login/user`;
//重置密码--获取验证码
export const resetpwdSendCode = `${host}/tablet/resetpwd/sendcode`;
//重置密码--重置
export const resetpwdSubmit = `${host}/tablet/resetpwd/reset`;
//收银开单初始化
export const initCashierBilling = `${host}/tablet/billing/init`;
//收银开单获取自动生成水单号
export const initCashierBillingFlowNumber = `${host}/tablet/billing/find/tablet/flownumber`;
//收银挂单
export const saveCashierBilling = `${host}/tablet/billing/save`;
//收银预算
export const prePayCashierBilling = `${host}/tablet/pay/bill/pay4`;
//删除订单
export const deleteCashierBilling = `${host}/tablet/billing/delete`;
//收银app支付
export const appPayCashierBilling = `${host}//tablet/billing/app/binding`;
//收银校验水单号
export const checkFlowNoCashierBilling = `${host}//tablet/billing/check/flownumber`;
//收银减扣库存
export const preStockCashierBilling = `${host}/tablet/pay/bill/stock/preReduce`;
//库存检查
export const preCheckStock = `${host}/tablet/pay/bill/stock/preCheck`;
//收银微信|支付宝
export const payCashierBilling = `${host}/tablet/pay/f2f/process`;
//获取会员信息
export const fetchMemberInfo = `${host}/tablet/vipcard/find/members/info`;
//根据会员id查询对应的卡信息
export const fetchMemberCardList = `${host}/tablet/vipcard/find/members/card/list`;
//获取等待会员信息
export const fetchWaitingMembersInfo = `${host}/tablet/member/store/queue`;
//获取登录人员的权限信息
export const selectStaffAclInfo = `${host}/tablet/member/staff/acl/set/list`;
//获取会员对应的会员卡信息
export const fetchWaitingMemberCardInfo = `${host}/tablet/member/customer/cardinfo`;
//获取版本号信息
export const fetchFindVersionInfo = `${host}/tablet/check/version`;

export const fetchCardConsumeHistory = `${host}/tablet/vipcard/find/cardconsumehistory`;
//挂单列表
export const getPendingList = `${host}/tablet/billing/get/info`;
//结单列表
export const getBillingList = `${host}/tablet/billing/get/list`;
//服务人列表
export const billingSearch = `${host}/tablet/billing/search`;
//卡列表
export const getVipcardSales = `${host}/tablet/vipcard/find/cardsales`;
//获取外联支付列表
export const getOtherPayType = `${host}/tablet/vipcard/find/otherpaytype`;
//外联支付
export const payOtherPayment = `${host}/tablet/pay/otherpayment/process`;
//创建卡订单
export const createCardOrder = `${host}/tablet/pay/f2f/process`;
//查询支付结果
export const getPaymentResult = `${host}/tablet/pay/f2f/check`;
//生成会员号
export const getMemberNo = `${host}/tablet/member/getmemberno`;
//创建会员
export const createNewMember = `${host}/tablet/member/updatememberinfo`;
//查询创建会员是否需要设置密码
export const fetchMemberPasswordStat = `${host}/tablet/member/getmemberpwdstat`;
//查询轮牌
export const getStoreDutys = `${host}/tablet/dutytable/setting/findDatas`;
//上下牌
export const updateDutyStaffs = `${host}/tablet/dutytable/setting/staffs/modify`;
//修改轮牌状态
export const updateDutyStaffStatus = `${host}/tablet/dutytable/setting/staff/updateStatus`;
//洗牌
export const resetDutyStaffs = `${host}/tablet/dutytable/setting/staff/reset`;
//修改顺序
export const sortDutyStaffs = `${host}/tablet/dutytable/setting/staff/sort`;

export const saveStaffOrder = `${host}/tablet/dutytable/setting/saveStaffOrder`;
//查询轮牌设置
export const getStoreDutysSetting = `${host}/tablet/dutytable/setting/findlist`;
//修改轮牌设置
export const modifyStoreDutysSetting = `${host}/tablet/dutytable/setting/modify`;
//修改轮牌设置
export const deleteDutyTableSetting = `${host}/tablet/dutytable/setting/delete`;
//改变轮牌设置排序
export const changeSortOfDutysSetting = `${host}/tablet/dutytable/setting/changesort`;
//轮牌设置资源校验
export const checkResource = `${host}/tablet/dutytable/setting/checkResource`;
//轮牌批量保存
export const batchSaveDutyStaffs = `${host}/tablet/dutytable/setting/staffs/save/batch`;

//查询订单
export const findBillingDetails4Modify = `${host}/tablet/billing/get/detail`;
//订单维护保存订单
export const modifyBilling = `${host}/tablet/billing/modify`;
//查询员工的轮排信息
export const findStaffRotateInfo = `${host}/tablet/staff/find/staff/rotateinfo`;
//保存员工的轮排信息
export const saveStaffRotateInfo = `${host}/tablet/staff/save/staff/rotateinfo`;
export const findStaffAcl = `${host}/tablet/vipcard/find/staff/acl`;
//并单支付订单数据加载
export const mergePayInit = `${host}/tablet/billing/merge/pay/init`;
//并单APP支付绑定订单
export const mergeBindBilling4App = `${host}/tablet/billing/binding/merge`;
//订单转换为会员单
export const changeOwner = `${host}/tablet/billing/changeOwner`;

//价目表信息
export const priceListInfo = `${host}/tablet/priceset/find/priceset/info`;

//项目明细
export const priceListItemDetail = `${host}/tablet/priceset/find/priceset/detail/info`;

//获取可用优惠券
export const getAvailablePaymentInfo = `${host}/tablet/billing/available/payments`;

//营业收入页面地址
export const getDayCountPager = `${host}/tablet/h5/statistics/pager`;

//相关设置信息
export const getCommonSetting = `${host}/tablet/common/settings`;

//权限信息
export const getRights = `${host}/tablet/rights/info`;

