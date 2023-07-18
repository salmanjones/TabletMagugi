import React, {useEffect, useRef, useState} from 'react';
import {Alert, Image, InteractionManager, Text, TouchableOpacity, View} from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";
import dayjs from "dayjs";
import {useNavigation, useRoute} from '@react-navigation/native';
import ReduxStore from "../../store/store"
import {ReserveBoardStyles} from "../../styles/ReserveBoard";
import {
    getReserveInfo, saveReserveVocation, cancelStaffReserve, getReserveInitData,
    getCustomerDetail, updateCustomerReserve, updateCardValidity, getMemberInfo,
    getMemberPortrait, getBillFlowNO, getMemberCards, getStaffPermission,
    getMemberBillCards
} from "../../services/reserve";
import MemberPanel from "../../components/panelCustomer/MemberPanel";
import GuestPanel from "../../components/panelCustomer/GuestPanel";
import PanelMultiProfilePanel from "../../components/panelMultiProfile/PanelMultiProfilePanel";
import CustomerReservePanel from "../../components/panelReserve/CustomerReservePanel";
import StylistWidget from "./widgets/StylistFlatList"
import CustomerWidget from "./widgets/CustomerFlatList"
import {displayError, getImage, ImageQutity, showMessageExt} from "../../utils";
import {AppNavigate} from "../../navigators";
import {fetchMemberNO} from "../../services/member";
import {ModalCreateMember} from "../../components";

// 开单预约看板
const pageCache = {
    checkReserveId: '', // 选中的预约id
    checkAppUserId: '' // 选中的app表用户Id
}
export const ReserveBoardActivity = props => {
    // 路由
    const route = useRoute()
    // 导航
    const navigation = useNavigation();
    // redux状态
    const reduxState = ReduxStore.getState()
    // 加载提示信息
    const [isLoading, setLoading] = useState(false)
    // 预约状态切换
    const [reserveFlag, setReserveFlag] = useState('valid')
    // 预约信息
    const [reserveInfoArray, setReserveInfoArray] = useState([
        {
            staffName: "全部",
            staffReseverCount: 0,
            staffNowReseverCount: 0,
            staffPassReseverCount: 0
        }
    ])
    // 选中发型师的数据
    const [stylistCheckedIndex, setStylistCheckedIndex] = useState(0)
    // 散客-> 会员生成的会员号
    const [newMemberInfo, setNewMemberInfo] = useState({
        show: false,
        memberNo: '',
        operator: 'addAndCard'
    })
    // 会员子组件
    const memberPanelRef = useRef(null);
    // 顾客信息
    const [customerState, setCustomerState] = useState({
        memberCountInfo: {},
        reserveInfo: {
            reserveResoures: [],
            reserveInfoList: []
        },
        couponList: [],
        cardsInfo: {},
        czkCount: 0,
        ckCount: 0
    })
    // 多档案组件
    const panelMultiProfilePanelRef = useRef(null)
    const [multiProfiles, setMultiProfiles] = useState(null)
    // 顾客预约子组件
    const customerReservePanelRef = useRef(null);
    // 顾客预约基础数据
    const [reserveBaseData, setReserveBaseData] = useState({
        reserveResoures: [],
        reserveInfoList: []
    })
    // 散客预约子组件
    const guestPanelRef = useRef(null);

    // 获取预约数据
    const uniqueId = parseInt(Math.random() * 10000+'') + "-" + new Date().getTime() + "-" + parseInt(Math.random() * 10000+'')
    const getReserveList = (callBack) => {
        const params = {
            companyId: reduxState.auth.userInfo.companyId,
            storeId: reduxState.auth.userInfo.storeId,
            uniqueId: uniqueId,
        }

        setLoading(true)
        getReserveInfo(params).then(backData => {
            const {code, data} = backData
            if ("6000" == code) {
                setReserveInfoArray(data)
            } else {
                showToast("信息加载失败")
            }
        }).catch(e => {
            console.log("预约开单数据加载失败", e)
            showToast("信息加载失败")
        }).finally(() => {
            setLoading(false)
            callBack && callBack()
            // 初次加载完毕，不再展示加载信息
            console.log('数据请求完成')
        })
    }

    // 初次加载处理
    useEffect(() => {
        // 首次获取数据
        getReserveList()
    }, []) // 如果指定的是[],回调函数只会在第一次render()后执行


    //展示提示信息
    const showToast = (message) => {
        Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }

    // 选择发型师
    const checkStylistEvent = React.useCallback((index) => {
        setStylistCheckedIndex(index)
    }, [])

    // 清除页面缓存
    const clearPageCache = ()=>{
        pageCache.checkReserveId = ""
        pageCache.checkAppUserId = ""
    }

    // 客户点击事件
    const customerPressEvent = React.useCallback(async (type, extra, callBack) => {
        const storeId = reduxState.auth.userInfo.storeId
        switch (type) {
            case 'reloadData': // 刷新数据
                clearPageCache()
                getReserveList(callBack)
                break;
            case 'showDetail': // 查看详情
                const customerInfo = extra['customer']
                const args = {
                    appUserId: customerInfo.appUserId,
                    reserveId: customerInfo.recordId,
                    isOnlyBms: '0'
                }

                // 缓存选中的预约ID,以供开单使用
                pageCache.checkReserveId = customerInfo.recordId
                pageCache.checkAppUserId = customerInfo.appUserId

                // 获取顾客详情
                setLoading(true)
                getCustomerDetail(args).then(backData=>{
                    const {code, data} = backData
                    if(code == '6000'){
                        if(customerInfo.isMember == '0'){
                            // 防止会员面板出错
                            data.couponList = []
                            data.czkCount = 0
                            data.ckCount = 0
                            data.memberCountInfo = {}
                            data.cardsInfo = {}
                        }
                        setCustomerState(data)
                        if(customerInfo.isMember == '1'){
                            memberPanelRef.current.showRightPanel('ReserveBoardActivity')
                        }else{
                            guestPanelRef.current.showRightPanel('withReserve', 'createOrder')
                        }
                    }else{
                        showMessageExt("获取顾客信息失败")
                    }
                }).catch(e=>{
                    console.error("获取顾客信息失败", e)
                    showMessageExt("获取顾客信息失败")
                }).finally(_=>{
                    setLoading(false)
                })
                break
            case 'memberReserve': // 会员预约
                setLoading(true)
                const {staffId, reserveTime} = extra
                getReserveInitData({
                    storeId,
                    staffId
                }).then(backData=>{
                    const {code, data} = backData
                    if(code == '6000'){
                        const timeReserve = dayjs().format("YYYY-MM-DD ") + reserveTime
                        data['reserveTime'] = timeReserve
                        setReserveBaseData(data)
                        customerReservePanelRef.current.showRightPanel()
                    }else{
                        showMessageExt("获取发型师预约信息失败")
                    }
                }).catch(e=>{
                    console.error("获取发型师预约信息失败", e)
                    showMessageExt("获取发型师预约信息失败")
                }).finally(_=>{
                    setLoading(false)
                })
                break;
            case 'guestReserve': // 散客未预约直接开单
                clearPageCache()
                const customerData = {
                    couponList: [],
                    czkCount: [],
                    ckCount: [],
                    memberCountInfo: [],
                    cardsInfo: [],
                    imgUrl: null,
                    reserveInfo:{
                        memberName: '散客',
                        reserveResoures: [],
                        reserveInfoList: []
                    }
                }
                setCustomerState(customerData)
                guestPanelRef.current.showRightPanel('noReserve', 'createOrder')
                break;
            case 'addOccupy':  // 时间占用
                Alert.alert('系统提示', "确定要占用该时段吗", [
                    {
                        text: '是',
                        onPress: () => {
                            setLoading(true)
                            const {reserveTime, staffId} = extra
                            saveReserveVocation({storeId, staffId, reserveTime}).then(backData => {
                                const {code, data} = backData
                                if(code != '6000'){ // 占用异常
                                    Alert.alert(
                                        '系统提示',
                                        data || '占用异常',
                                        [
                                            {
                                                text: '知道了',
                                            }
                                        ]
                                    );
                                }else{
                                    // 重新加载数据
                                    getReserveList()
                                }
                            }).catch(e => {
                                console.log(e)
                            }).finally(_ => {
                                setLoading(false)
                            })
                        },
                    },
                    {
                        text: '否',
                    },
                ]);
                break;
            case 'cancelReserve': // 0:取消预约 1:取消占用
                const {type, recordId, hideRightPanel} = extra
                const tips = type == '0' ? '确定要取消该预约吗?':'确定要取消该占用吗?'
                Alert.alert('系统提示', tips, [
                    {
                        text: '是',
                        onPress: () => {
                            setLoading(true)
                            cancelStaffReserve({type: type.toString(), recordId: recordId.toString()}).then(backData => {
                                const {code, data} = backData
                                if(code != '6000'){ // 占用异常
                                    Alert.alert(
                                        '系统提示',
                                        data || '取消异常',
                                        [
                                            {
                                                text: '知道了',
                                                onPress: ()=>{
                                                    getReserveList()
                                                }
                                            }
                                        ]
                                    );
                                }else{
                                    showMessageExt("取消成功", {
                                        position: Toast.positions.CENTER
                                    })

                                    if(hideRightPanel === true){ // 关闭右侧面板
                                        memberPanelRef.current.hideRightPanel()
                                    }

                                    // 重新加载数据
                                    getReserveList()
                                }
                            }).catch(e => {
                                Alert.alert(
                                    '系统提示',
                                    data || '取消异常',
                                    [
                                        {
                                            text: '知道了',
                                        }
                                    ]
                                );
                                console.log(e)
                            }).finally(_ => {
                                setLoading(false)
                            })
                        },
                    },
                    {
                        text: '否',
                    },
                ]);
                break;
            case 'updateReserve': // 更新预约
                setLoading(true)
                const updateParams = extra.updateParams
                const hideRight = extra.hideRightPanel
                updateCustomerReserve(updateParams).then(backData=>{
                    const {code, data} = backData
                    if(code != '6000') { // 取消异常
                        Alert.alert(
                            '系统提示',
                            data || '更新预约失败',
                            [
                                {
                                    text: '知道了',
                                }
                            ]
                        )
                    }else{
                        showMessageExt("更新预约成功")
                        if(hideRight === true){ // 关闭右侧面板
                            memberPanelRef.current.hideRightPanel()
                        }
                    }
                }).catch(e=>{
                    console.log(e)
                    showMessageExt("更新预约失败")
                }).finally(_=>{
                    setLoading(false)
                })
                break;
            case 'editCardValidity': // 卡延期
                Alert.alert('系统提示', "该卡确定要延期吗", [
                    {
                        text: '是',
                        onPress: () => {
                            setLoading(true)
                            updateCardValidity({
                                cardId: extra.cardId
                            }).then(backData=>{
                                const {code, data} = backData
                                if(code != '6000') { // 取消异常
                                    Alert.alert(
                                        '系统提示',
                                        data || '卡延期失败',
                                        [
                                            {
                                                text: '知道了',
                                            }
                                        ]
                                    )
                                }else{
                                    // 重新获取会员信息
                                    setLoading(true)
                                    getCustomerDetail({
                                        appUserId: extra.appUserId,
                                        reserveId: extra.reserveId,
                                        isOnlyBms: '0'
                                    }).then(backData=>{
                                        const {code, data} = backData
                                        if(code == '6000'){
                                            setCustomerState(data)
                                            showMessageExt("卡延期成功")
                                        }else{
                                            showMessageExt("获取顾客信息失败")
                                        }
                                    }).catch(e=>{
                                        console.error("获取顾客信息失败", e)
                                        showMessageExt("获取顾客信息失败")
                                    }).finally(_=>{
                                        setLoading(false)
                                    })
                                }
                            }).catch(e=>{
                                console.log(e)
                                showMessageExt("卡延期失败")
                            }).finally(_=>{
                                setLoading(false)
                            })
                        }
                    },
                    {
                        text: '否',
                    },
                ])
                break;
            case 'toCreateOrder': // 开单
                // 查询类型
                const queryType = extra['queryType'] // 类型：phone:通过手机号查询 appUserId:用户id查询
                const showType = extra['showType'] // 来源：member:会员面板点击开单 guestPhone:散客扫码面板查询顾客 scanCode:散客扫码面板点击查询 searchPhone: 多档案面板查询手机号
                const actionType = extra['actionType'] // 去向：createOrder 开单 createCard开卡
                const reserveMode = extra['showMode'] // 是否已预约: withReserve:已预约 noReserve:未预约
                const waiterId = extra['waiterId'] // 服务人ID

                // 查询参数
                const params = {}
                if(queryType == 'phone'){
                    params['value'] = extra['phone']
                    params['paramType'] = '1'  // 1 手机号
                }else{
                    params['value'] = extra['appUserId']
                    params['paramType'] = '0' // 0 appUserId
                }

                // 缓存扫码后的appUserId
                if(extra['appUserId'] && extra['appUserId'].length > 0 && showType == 'scanCode'){
                    pageCache.checkAppUserId = extra['appUserId']
                }

                // 散客预约面板，点击直接跳转至手机号查询组件
                if(showType == 'guestPhone'){
                    setMultiProfiles([])
                    guestPanelRef.current.hideRightPanel()
                    panelMultiProfilePanelRef.current.showRightPanel(reserveMode, 'query', extra['phone'], waiterId, actionType)
                    return
                }

                // 手机号查询组件手机号为空，清空列表
                if((!params['value'] || params['value'].length < 1)
                    && params['paramType'] == '1'
                    && showType == 'searchPhone'){
                        setMultiProfiles([])
                    return
                }

                // 获取会员档案
                setLoading(true)
                getMemberInfo(params).then(backData => {
                    const {code, data} = backData
                    if(code != '6000'){
                        setLoading(false)
                        showMessageExt("获取会员档案失败")
                    }else{
                        if(showType == 'searchPhone' || data.length > 1){ // 多档案
                            setLoading(false)
                            setMultiProfiles(data)
                            if(showType == 'scanCode'){ // 散客扫码开单
                                guestPanelRef.current.hideRightPanel()
                                panelMultiProfilePanelRef.current.showRightPanel(reserveMode, 'member', '', waiterId, actionType)
                            }else if(showType == 'guestPhone'){ // 散客手机号查询顾客
                                guestPanelRef.current.hideRightPanel()
                                panelMultiProfilePanelRef.current.showRightPanel(reserveMode, 'query', extra['phone'], waiterId, actionType)
                            }else if(showType == 'member'){ // 会员面板开单
                                memberPanelRef.current.hideRightPanel()
                                panelMultiProfilePanelRef.current.showRightPanel(reserveMode, 'member', '', waiterId, actionType)
                            }else if(showType == 'searchPhone'){ // 手机号查询档案面板
                                console.log("通过手机号查询档案")
                            }
                        }else if(data.length == 1){ // 单档案直接开单
                            setLoading(false)
                            setMultiProfiles(data)
                            const customer = data[0]
                            // 准备开单
                            if(reserveMode == 'noReserve'){ // 未预约:单档案扫码->进入选牌页面
                                customerPressEvent('forwardToCashier', {
                                    memberId: customer.memberId,
                                    imgUrl: customer.imgUrl,
                                    showMode: reserveMode,
                                    actionType: actionType
                                })
                            }else{ // 已预约:单档案扫码->进入开单或开卡页面
                                customerPressEvent('naviToCashier', {
                                    memberId: customer.memberId,
                                    imgUrl: customer.imgUrl,
                                    waiterId: waiterId,
                                    actionType: actionType
                                }, ()=>{
                                    hideAllPanel()
                                })
                            }
                        }else{ // 无档案
                            setLoading(false)
                            showMessageExt("获取会员档案失败")
                        }
                    }
                }).catch(e=>{
                    console.error("通过appUserId获取会员档案失败", e)
                    showMessageExt("获取会员档案失败")
                    setLoading(false)
                })
                break
            case 'naviToCashier':
                const naviType = extra['actionType']
                if(naviType == 'createCard'){
                    // 加载中
                    setLoading(true)
                    try {
                        // 开始准备开单的数据-获取BMS会员档案
                        const portraitBackData = await getMemberPortrait({
                            p: 1,
                            ps: 1000,
                            cardInfoFlag: false,
                            solrSearchType: 0,
                            kw: extra.memberId
                        })
                        // 会员档案
                        if(portraitBackData.code != '6000'){
                            // 错误
                            showMessageExt("开卡失败")
                            setLoading(false)
                        }else{
                            setLoading(false)
                            // 关闭所有面板
                            hideAllPanel()
                            // BMS会员档案
                            const memberPortrait = portraitBackData['data']['memberList'][0]
                            InteractionManager.runAfterInteractions(() => {
                                navigation.navigate('VipcardActivity', {
                                    type: 'vip',
                                    member: memberPortrait,
                                    appUserId: pageCache.checkAppUserId
                                })
                            });
                        }
                    }catch (e){
                        // 错误
                        showMessageExt("开卡失败")
                        setLoading(false)
                        console.error("获取会员档案失败", e)
                    }
                }else{
                    // 加载中
                    setLoading(true)
                    try{
                        // 开始准备开单的数据-获取BMS会员档案
                        const portraitBackData = await getMemberPortrait({
                            p: 1,
                            ps: 1000,
                            cardInfoFlag: false,
                            solrSearchType: 0,
                            kw: extra.memberId
                        })
                        // 登录的员工信息
                        const loginUser = reduxState.auth.userInfo
                        // 开始准备开单的数据-获取BMS会员卡
                        const cardsBackData = await  getMemberCards({memberId: extra.memberId})
                        // 获取员工可用的权限
                        const permissionBackData = await getStaffPermission({
                            staffId: loginUser.staffId,
                            companyId: loginUser.companyId
                        })
                        // 获取开单用的会员卡数据
                        const billCardsBackData = await getMemberBillCards({
                            companyId: loginUser.companyId,
                            storeId: loginUser.storeId,
                            customerId: extra.memberId
                        })
                        // 获取水单号
                        const flowNumberBackData = await getBillFlowNO()

                        // 会员档案
                        if(portraitBackData.code != '6000'
                            || cardsBackData.code != '6000'
                            || permissionBackData.code != '6000'
                            || billCardsBackData.code != '6000'
                            || flowNumberBackData.code != '6000'){
                            // 错误
                            showMessageExt("开单失败")
                            setLoading(false)
                        }else{
                            setLoading(false)
                            // BMS会员档案
                            const memberPortrait = portraitBackData['data']['memberList'][0]
                            // BMS会员卡
                            const memberCardInfo =  cardsBackData['data']
                            // 员工权限
                            const staffPermission = permissionBackData['data']
                            // 开单用的会员卡
                            const billCards = billCardsBackData['data']
                            // 水单号
                            const flowNumber = flowNumberBackData['data']
                            //0专业店 1综合店
                            const isSynthesis = loginUser.isSynthesis;
                            // 可用主营分类
                            const operatorCategory = loginUser.operateCategory[0];
                            // 服务人信息
                            const waiterId = extra['waiterId']

                            // 是否允许调整价格
                            let moduleCode = "1"
                            let moduleCodeIndex = 0;
                            const staffAclMap = staffPermission['staffAclMap'];
                            if (staffAclMap
                                && staffAclMap.moduleCode
                                && staffAclMap.moduleCode == 'ncashier_billing_price_adjustment') { // 是否能允许调整价格
                                moduleCodeIndex++;
                            }
                            if (moduleCodeIndex > 0) {
                                moduleCode = '1'
                            } else {
                                moduleCode = 0
                            }

                            // 开单参数
                            const params = {
                                companyId: loginUser.companyId,
                                storeId: loginUser.storeId,
                                deptId: operatorCategory.deptId,
                                operatorId: operatorCategory.value,
                                operatorText: operatorCategory.text,
                                waiterId: waiterId,
                                staffId: loginUser.staffId,
                                staffDBId: loginUser.staffDBId,
                                isSynthesis: isSynthesis,
                                numType: "flownum",
                                numValue: flowNumber,
                                page: 'ReserveBoardActivity',
                                member: Object.assign({}, memberPortrait, {
                                    userImgUrl: getImage(
                                        extra.imgUrl,
                                        ImageQutity.member_small,
                                        'https://pic.magugi.com/magugi_default_01.png'
                                    ),
                                    vipStorageCardList: billCards.vipStorageCardList || memberCardInfo.vipStorageCardList,
                                    cardBalanceCount: memberCardInfo.cardBalanceCount,
                                    cardCount: memberCardInfo.cardCount
                                }),
                                type: "vip",
                                roundMode: staffPermission.roundMode,
                                moduleCode: moduleCode,
                                isOldCustomer: memberCardInfo.isOldCustomer,
                                orderInfoLeftData: {
                                    handNumber: '',
                                    customerNumber: '1',
                                    isOldCustomer: memberCardInfo.isOldCustomer,
                                },
                                isShowReserve: true,
                                checkReserveId: pageCache.checkReserveId,
                                appUserId: pageCache.checkAppUserId
                            }

                            callBack && callBack()
                            // 关闭侧边栏
                            hideAllPanel()
                            // 开单
                            AppNavigate.navigate('CashierBillingActivity', params)
                        }
                    }catch (e){
                        // 错误
                        showMessageExt("开单失败")
                        setLoading(false)
                        console.error("获取会员档案失败", e)
                    }
                }
                break
            case 'forwardToCashier': // 直接开单｜直接开卡｜散客未预约扫码：单档案(未预约扫码只有开单按钮,无开卡按钮)
                const showMode = extra['showMode']
                const eventType = extra['actionType']
                if(showMode == 'noReserve'){ // 未预约散客直接开卡、开单
                    if(eventType == 'createOrder'){// 未预约直接开单.跳转选牌
                        const memberId = extra['memberId'] // 未预约散客扫码转会员后有会员ID
                        const imgUrl = extra['imgUrl'] // 未预约散客扫码转会员后有会员ID
                        AppNavigate.navigate('StaffQueueActivity', {memberId, imgUrl})
                    }else if(eventType == 'createCard'){ // 未预约直接开卡，新增会员页面
                        setLoading(true)
                        fetchMemberNO().then(res => {
                            setLoading(false)
                            setNewMemberInfo({
                                show: true,
                                memberNo: res.data,
                                operator: 'addAndCard'
                            })
                        }).catch(err => {
                            setLoading(false)
                            displayError(err, '获取会员号码异常');
                        })
                    }
                }else { // 已预约散客直接开卡、开单
                    if(eventType == 'createCard'){ // 已预约散客开卡
                        setLoading(true)
                        fetchMemberNO().then(res => {
                            setLoading(false)
                            setNewMemberInfo({
                                show: true,
                                memberNo: res.data,
                                operator: 'addAndCard'
                            })
                        }).catch(err => {
                            setLoading(false)
                            displayError(err, '获取会员号码异常');
                        })
                    }else{// 已预约散客开单
                        // 加载中
                        setLoading(true)
                        try {
                            // 服务人信息
                            const waiterId = extra['waiterId']
                            // 登录的员工信息
                            const loginUser = reduxState.auth.userInfo
                            // 获取员工可用的权限
                            const permissionBackData = await getStaffPermission({
                                staffId: loginUser.staffId,
                                companyId: loginUser.companyId
                            })
                            // 获取水单号
                            const flowNumberBackData = await getBillFlowNO()
                            // 会员档案
                            if(permissionBackData.code != '6000'
                                || flowNumberBackData.code != '6000'){
                                // 错误
                                showMessageExt("开单失败")
                                setLoading(false)
                            }else{
                                setLoading(false)
                                // 员工权限
                                const staffPermission = permissionBackData['data']
                                // 水单号
                                const flowNumber = flowNumberBackData['data']
                                //0专业店 1综合店
                                const isSynthesis = loginUser.isSynthesis;
                                // 可用主营分类
                                const operatorCategory = loginUser.operateCategory[0];
                                // 是否允许调整价格
                                let moduleCode = "1"
                                let moduleCodeIndex = 0;
                                const roundMode = staffPermission.roundMode
                                const staffAclMap = staffPermission['staffAclMap'];
                                if (staffAclMap
                                    && staffAclMap.moduleCode
                                    && staffAclMap.moduleCode == 'ncashier_billing_price_adjustment') { // 是否能允许调整价格
                                    moduleCodeIndex++;
                                }
                                if (moduleCodeIndex > 0) {
                                    moduleCode = '1'
                                } else {
                                    moduleCode = 0
                                }

                                const params = {
                                    orderInfoLeftData:{
                                        customerNumber:"1",
                                        isOldCustomer:"0",
                                        handNumber:""
                                    },
                                    companyId: loginUser.companyId,
                                    storeId: loginUser.storeId,
                                    deptId: operatorCategory.deptId,
                                    operatorId: operatorCategory.value,
                                    operatorText: operatorCategory.text,
                                    waiterId: waiterId,
                                    staffId: loginUser.staffId,
                                    staffDBId: loginUser.staffDBId,
                                    isSynthesis: isSynthesis,
                                    numType: "flownum",
                                    numValue: flowNumber,
                                    page: "ReserveBoardActivity",
                                    member:null,
                                    type: "vip",
                                    roundMode: roundMode,
                                    moduleCode: moduleCode,
                                    isOldCustomer: "0", // 散客
                                    checkReserveId: pageCache.checkReserveId
                                }

                                callBack && callBack()
                                // 关闭侧边栏
                                hideAllPanel()
                                // 开单
                                AppNavigate.navigate('CashierBillingActivity', params)
                            }
                        } catch (e) {
                            setLoading(false)
                            console.error("散客开单失败", e)
                        }
                    }
                }
                break
            case 'rechargeCardItem': // 充值
                // 加载中
                setLoading(true)
                try {
                    // 开始准备开单的数据-获取BMS会员档案
                    const portraitBackData = await getMemberPortrait({
                        p: 1,
                        ps: 1000,
                        cardInfoFlag: true,
                        solrSearchType: 0,
                        kw: extra.memberId
                    })
                    // 会员档案
                    if(portraitBackData.code != '6000'){
                        // 错误
                        showMessageExt("充值失败")
                        setLoading(false)
                    }else{
                        setLoading(false)
                        // 关闭所有面板
                        hideAllPanel()
                        // BMS会员档案
                        const cardId = extra['cardId']
                        const memberPortrait = portraitBackData['data']['memberList'][0]
                        const cardList = memberPortrait['vipStorageCardList'] || []
                        const selectCard = cardList.filter(card=>{
                            return card.id == cardId
                        })

                        if(selectCard && selectCard.length == 1){
                            InteractionManager.runAfterInteractions(() => {
                                navigation.navigate('RechargeActivity', {
                                    card: selectCard[0],
                                    member: memberPortrait,
                                    appUserId: pageCache.checkAppUserId
                                });
                            })
                        }else{
                            showMessageExt("充值失败")
                        }
                    }
                }catch (e){
                    // 错误
                    showMessageExt("充值失败")
                    setLoading(false)
                    console.error("获取会员档案失败", e)
                }
                break
        }
    }, [])

    /// 关闭所有侧边栏
    const hideAllPanel = ()=>{
        clearPageCache()
        memberPanelRef.current.hideRightPanel()
        panelMultiProfilePanelRef.current.hideRightPanel()
        customerReservePanelRef.current.hideRightPanel()
        guestPanelRef.current.hideRightPanel()
    }

    /// 确认创建散客档案并开卡
    const confirmNewMember = (member, oper) => {
        setNewMemberInfo({
            show: false,
            memberNo: ''
        })

        // 关闭面板
        hideAllPanel()

        // 跳转开卡
        InteractionManager.runAfterInteractions(() => {
            navigation.navigate('VipcardActivity', {
                type: 'vip',
                member: member,
            });
        });
    };

    /// 取消创建散客档案
    const cancelNewMember = () => {
        setNewMemberInfo({
            show: false,
            memberNo: ''
        })
    }

    return (
        <View style={ReserveBoardStyles.boardWrapBox}>
            {/*加载中*/}
            <Spinner visible={isLoading} textContent={'加载中'} textStyle={{color: '#FFF'}}/>
            {/*预约状态切换*/}
            <View style={ReserveBoardStyles.reserveFlagBox}>
                <TouchableOpacity
                    onPress={() => {
                        setReserveFlag('valid')
                    }}
                    style={reserveFlag == 'valid' ? [ReserveBoardStyles.reserveValidActiveStyle] : [ReserveBoardStyles.reserveValidStyle]}>
                    <Text
                        style={reserveFlag == 'valid' ? ReserveBoardStyles.reserveFlagTxtActive : ReserveBoardStyles.reserveFlagTxt}>
                        当前预约
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setReserveFlag('invalid')
                    }}
                    style={reserveFlag == 'invalid' ? [ReserveBoardStyles.reserveInvalidActiveStyle] : [ReserveBoardStyles.reserveInvalidStyle]}>
                    <Text
                        style={reserveFlag == 'invalid' ? ReserveBoardStyles.reserveFlagTxtActive : ReserveBoardStyles.reserveFlagTxt}>
                        过期预约
                    </Text>
                </TouchableOpacity>
            </View>
            {/*预约信息展示*/}
            <View style={ReserveBoardStyles.reserveInfoBox}>
                <View style={ReserveBoardStyles.reserveDetailWrap}>
                    {/*发型师列表*/}
                    <View style={ReserveBoardStyles.reserveStylistBox}>
                        {reserveInfoArray.length > 0 && (
                            <StylistWidget checkStylistEvent={checkStylistEvent}
                                           reserveInfoArray={reserveInfoArray}
                                           reserveFlag={reserveFlag}/>
                        )}
                    </View>
                    {/*顾客预约列表*/}
                    <View style={ReserveBoardStyles.reserveCustomerBox}>
                        {reserveInfoArray.length > 0 && (
                            <CustomerWidget
                                stylistReserveInfo = {reserveInfoArray[stylistCheckedIndex]} // 当前发型师预约数据
                                reserveFlag={reserveFlag}
                                customerCardEvent={customerPressEvent}
                                uniqueId={uniqueId}/>
                        )}
                    </View>
                </View>
            </View>
            {/*会员信息面板*/}
            <MemberPanel ref={memberPanelRef} memberInfo={customerState} reserveFlag={reserveFlag} customerPressEvent={customerPressEvent}/>
            {/*散客信息面板*/}
            <GuestPanel ref={guestPanelRef} customerInfo={customerState} reserveFlag={reserveFlag} customerPressEvent={customerPressEvent}/>
            {/*顾客预约详情信息面板*/}
            <CustomerReservePanel ref={customerReservePanelRef} reserveBaseData={reserveBaseData} reloadReserveData={getReserveList}/>
            {/*顾客多档案信息面板*/}
            <PanelMultiProfilePanel ref={panelMultiProfilePanelRef} multiProfileData={multiProfiles} customerClickEvent={customerPressEvent}/>
            {/*散客创建档案*/}
            <ModalCreateMember
                navigation={navigation}
                visible={newMemberInfo.show}
                memberNo={newMemberInfo.memberNo}
                oper={newMemberInfo.operator}
                onConfirm={confirmNewMember}
                onCancel={cancelNewMember}
            />
        </View>
    )
}
