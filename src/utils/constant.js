import env from '../../env.js'

export const AppConfig = {
    appName: '门店小助手',
    initStoreName: '美界演示门店',
    tokenBms: 'accessTokenBms',
    tokenApp: 'accessTokenApp',
    platform:{
        app: "app",
        bms: "bms"
    },
    staffRStore: '_staffReduxStore',
    sessionStaffId: '_tabletSessionStaffId',
    sessionTimeOut: 10770000, //设置为小于3小时(3*60*60*1000-30*1000)，请根据服务器session时间设置
    imageServer: 'https://img.magugi.com/',
    defaultAvatar: 'https://pic.magugi.com/4c0b42d504863dcaf8af22a2c83179f9',
    requestTimeout: 300000,
    client: 'tablet_magi',
    appId: 'Magugi715758&!%=&ARG-Tablet='
}

export const StateCode = {
    reqSuccess: '6000', //请求成功
    reqError: '7000', //数据处理异常
    invalidClient: '7001', //无效客户端
    invalidToken: '7002', //无效请求（令牌）
    runtimeException: '7003', //未知异常
    badParams: '7004', //无效请求参数
    noLogin: '7005', //非登陆用户
    badResData: '7006', //无效数据返回格式
    tooTimesGetToken: '5001', //请求vcode次数太多
    networkError: '5002', //网络异常
    failToGetToken: '5003', //获取vCode异常
    badRequestData: '5004', //错误的请求参数
    failToRemoveTokenCache: '5005', //清除tokon缓存异常
    failToGetStaffId: '5006', //无效登录信息
    requestTimeout: '5007', //请求超时
}

export const ListStatus = {
    loading: 'loading',
    end: 'end',
    idle: 'idle',
    error: 'error',
}

export const PaymentResultStatus = {
    success: 'success',
    timeout: 'timeout',
    error: 'error',
    partial: 'partial',
}

export const ImageQutity = {
    staff: '@200w_1l_80Q',
    member_small: '@200w_1l_80Q',
    brand: '@100w_1l_80Q',
    member_big: '@1500w_1l',
    staffPrice: '@436w_1l',
}

export const systemConfig = {
    version: env.ver,
    updateVersionLimitTime: 180000,
}

export const LinkWeCom = { // 企微调用配置
    tokenKey: '_linkwecom_token_', // token key
    tokenSymbol: '2A9tOlwgtRbRVY3ywzr6gsjakUmv9j5xajFZpDatE7U=', // 调用服务的密钥
}


