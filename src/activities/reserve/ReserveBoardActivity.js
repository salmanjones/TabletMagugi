import React, {useEffect, useRef, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
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
import {getImage, ImageQutity, showMessageExt} from "../../utils";
import {AppNavigate} from "../../navigators";

// 开单预约看板
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

    // 客户点击事件
    const customerPressEvent = React.useCallback(async (type, extra, callBack) => {
        const storeId = reduxState.auth.userInfo.storeId
        switch (type) {
            case 'reloadData': // 刷新数据
                getReserveList(callBack)
                break;
            case 'showDetail': // 查看详情
                const customerInfo = extra['customer']
                const args = {
                    appUserId: customerInfo.appUserId,
                    reserveId: customerInfo.recordId
                }

                console.log("args", args)

                setLoading(true)
                getCustomerDetail(args).then(backData=>{
                    const {code, data} = backData
                    if(code == '6000'){
                        console.log("backData", JSON.stringify(backData))
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
                            memberPanelRef.current.showRightPanel()
                        }else{
                            guestPanelRef.current.showRightPanel()
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
            case 'guestReserve': // 散客预约
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
                                        reserveId: extra.reserveId
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
            case 'rechargeCardItem': // 充值

                break;
            case 'toCreateOrder': // 开单
                setLoading(true)
                getMemberInfo({appUserId: extra['appUserId']}).then(backData => {
                    const {code, data} = backData
                    if(code != '6000'){
                        setLoading(false)
                        console.error("通过appUserId获取会员档案失败", backData)
                        showMessageExt("获取会员档案失败")
                    }else{ // 多档案
                        if(data.length > 1){ // 多档案
                            setLoading(false)
                            setMultiProfiles(data)
                            memberPanelRef.current.hideRightPanel()
                            panelMultiProfilePanelRef.current.showRightPanel('member')
                        }else if(data.length == 1){ // 单档案直接开单
                            setLoading(false)
                            setMultiProfiles(data)
                            // 准备开单
                            const customer = data[0]
                            customerPressEvent('naviToCashier', {
                                memberId: customer.memberId,
                                imgUrl: customer.imgUrl
                            }, ()=>{
                                memberPanelRef.current.hideRightPanel()
                            })
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
                // 加载中
                setLoading(true)
                try{
                    // 开始准备开单的数据-获取BMS会员档案
                    const portraitBackData = await getMemberPortrait({
                        p: 1,
                        ps: 30,
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
                        console.log("loginUser", JSON.stringify(loginUser))
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
                            isShowReserve: true
                        }

                        callBack && callBack()
                        // 开单
                        AppNavigate.navigate('CashierBillingActivity', params)
                    }
                }catch (e){
                    // 错误
                    showMessageExt("开单失败")
                    setLoading(false)
                    console.error("获取会员档案失败", e)
                }

                break
        }
    }, [])

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
            <MemberPanel ref={memberPanelRef} memberInfo={customerState} reserveFlag={reserveFlag} customerCardEvent={customerPressEvent}/>
            {/*散客信息面板*/}
            <GuestPanel ref={guestPanelRef} customerInfo={customerState} reserveFlag={reserveFlag} customerPressEvent={customerPressEvent}/>
            {/*顾客预约详情信息面板*/}
            <CustomerReservePanel ref={customerReservePanelRef} reserveBaseData={reserveBaseData} reloadReserveData={getReserveList}/>
            {/*顾客多档案信息面板*/}
            <PanelMultiProfilePanel ref={panelMultiProfilePanelRef} multiProfileData={multiProfiles} customerClickEvent={customerPressEvent}/>
        </View>
    )
}
