import React from 'react';
import {connect} from 'react-redux';
import {
    fetchCheckFlowNumber,
    fetchPayBilling,
    fetchPrePayBilling,
    fetchSaveBilling,
    fetchStockBilling,
    getAvailablePaymentInfo,
    payBillingV4,
} from '../../services';
import {clone, getImage, ImageQutity, PaymentResultStatus, showMessage, showMessageExt, throttle} from '../../utils';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {
    CouponList,
    EditCardPay,
    MemberCardList,
    PayTypeList,
    QRCodePaymentCashier,
    QRCodePaymentNew,
    SimulateKeyboardPay,
    StockTips,
} from '../../components';
import {CASHIERBILLING_RELOAD_ORDER,} from '../../actions';
import {multiplyPayStyle} from '../../styles';
import {AppNavigate} from "../../navigators";
import Spinner from "react-native-loading-spinner-overlay";
import MultiPayProfilePanel from "../../components/panelMultiProfile/MultiPayProfilePanel";
import {
    getCustomerDetail,
    getMemberBillCards,
    getMemberCards,
    getMemberInfo,
    getMemberPortrait,
    updateCardValidity
} from "../../services/reserve";

// 自己支付支付方式
const defaultPayTypes = [
    {
        payType: 5,
        payTypeId: null,
        name: '优惠券抵扣',
        icon: require('@imgPath/pay-multiply-coupon.png'),
    },
    {
        payType: 2,
        payTypeId: 2,
        name: '会员卡支付', // 储值卡支付
        icon: require('@imgPath/pay-multiply-card.png'),
    },
    {
        payType: 6,
        payTypeId: 19,
        payTypeNo: 19,
        name: '微信支付',
        payMode: 0,
        icon: require('@imgPath/pay-multiply-wechat.png'),
    },
    // {
    //     payType: 6,
    //     payTypeId: 18,
    //     payTypeNo: 18,
    //     name: '支付宝支付',
    //     payMode: 0,
    //     icon: require('@imgPath/pay-multiply-ali.png'),
    // },
    {
        payType: 1,
        payTypeId: -1,
        payTypeNo: -1,
        name: '现金支付',
        payMode: 0,
        icon: require('@imgPath/pay-multiply-cash.png'),
    },
    {
        payType: 3,
        payTypeId: 5,
        payTypeNo: 5,
        name: '银联支付',
        payMode: 0,
        icon: require('@imgPath/pay-multiply-unipay.png'),
    },
]
// 缓存用户的会员卡
let memberCards = []
class MultiPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false, //转圈圈
            billingInfo: {}, //订单信息
            memberInfo: {}, //会员信息
            paymentTimesCard: [], //次卡支付信息

            coupons: [], //优惠券
            cards: [], //卡信息,
            hasCards: false,
            usedOtherPay: 'used',
            selectedCoupons: [], //已选优惠券
            selectedCardsId: [], //已选卡
            selectedPayTypeIndex: null,
            editCard: null, //正在编辑卡
            payTypes: [],
            paymentInfo: {
                //支付信息
                willPayPrice: null, //应付
                alreadyPaidPrice: 0, //已付
                wait4PayAmt: null, //待付金额
                alreadyCouponPrice: 0, //抵扣
                alreadyDiscountPrice: 0, //优惠
                timesProjectsPayEndNum: 0, //次卡消费项目
            },
            qrCode: null,
            showCardPwd: false,
            isPaySuccess: false,
            errorStockList: [],
            paySequence: [],
            payWayType: 'self', // self:自己支付 other:他人代付
            multiProfiles: [], // 他人多档案
            anotherPortrait: null
        };
        this.savedBilling = null;
        this.panelMultiProfilePanelRef = null
    }

    componentDidMount() {
        this.setState({
            payTypes: defaultPayTypes
        }, ()=>{
            this.getInitData()
        })
    }

    getInitData(callBack){
        // 准备订单基础数据
        let {saveBillingData, memberInfo, items, paymentTimesCard, companySetting} = this.props.route.params;
        let billingInfo = JSON.parse(saveBillingData.billing);

        // 获取页面基础数据
        this.getInitialData(billingInfo, memberInfo, items, (data) => {
            let stateData = {...this.state, paymentTimesCard};
            if (data) {
                let {othersPaymentList, coupons} = data;
                // 处理外联支付
                let otherPayTypes = othersPaymentList ? othersPaymentList.map((x) => ({
                        payType: 3,
                        payTypeId: x.id,
                        payTypeNo: x.id,
                        name: x.name,
                        icon: require('@imgPath/pay-multiply-meituan.png'),
                        payMode: 0,
                    }))
                    : [];
                // 拼接外联支付
                stateData.payTypes = stateData.payTypes.concat(otherPayTypes);

                // 是否拥有优惠券
                if (coupons && coupons.length) {
                    //优惠券
                    stateData.coupons = coupons;
                    let couponPayType = stateData.payTypes.find((x) => x.payType == 5);
                    if (couponPayType) couponPayType.itemAmt = coupons.length;
                } else {
                    // 无优惠券过滤掉优惠券选项
                    stateData.payTypes = stateData.payTypes.filter((x) => x.payType != 5);
                }
            }

            // 获取公司设置，是否使用现金/银行卡;0:使用;1:不使用
            if (companySetting && !companySetting.isUseCash) {
                stateData.payTypes = stateData.payTypes.filter((x) => x.payType != 1 && (x.payType != 3 || x.payTypeId != 5));
            }

            // 会员有效卡
            let availableCards =
                (memberInfo &&
                    memberInfo.vipStorageCardList &&
                    memberInfo.vipStorageCardList.length &&
                    memberInfo.vipStorageCardList.filter((x) => {
                        let balance = Number(x.balance || 0) + (x.attachMoneyList || []).reduce((rs, x) => (rs += Number(x.balance || 0)), 0);
                        return x.cardType == 1 && (x.consumeMode != 0 || balance > 0);
                    })) ||
                [];

            // 组装有效卡展示
            if (availableCards.length > 0) {
                stateData.cards = availableCards.map((x) => ({
                    id: x.id,
                    balance: x.balance,
                    vipCardNo: x.vipCardNo,
                    vipCardName: x.vipCardName,
                    storeName: x.storeName,
                    hasPassword: x.hasPassword,
                    password: x.password,
                    attachMoney: x.attachMoney,
                    attachMoneyList: x.attachMoneyList,
                    consumeMode: x.consumeMode,
                    cardType: x.cardType,
                    cardStatus: x.status,
                    validityShow: x.validityShow
                }));

                // 有会员卡, 会员卡支付
                stateData.hasCards = true
                stateData.payWayType = 'self'
                const cardPayType = stateData.payTypes.find((x) => x.payType == 2);
                if (cardPayType) {
                    cardPayType.paidAmt = null // 储值卡支付
                    cardPayType.itemAmt = availableCards.length
                    cardPayType.name = '会员卡支付' // 储值卡支付
                    cardPayType.icon = require('@imgPath/pay-multiply-card.png')
                }
            } else{
                // 无会员卡,换为他人代付
                stateData.hasCards = false
                stateData.payWayType = 'other'
                stateData.payTypes.forEach(item=>{
                    if(item.payType == '2' && item.payTypeId == '2'){ // 他人代付
                        item.name = '他人代付' // 储值卡支付
                        item.icon = require('@imgPath/cashier_billing_pay_other.png')
                        item.itemAmt = null
                        item.paidAmt = null
                    }
                })
            }

            this.setState({
                ...stateData,
                items: items,
                billingInfo: billingInfo, //订单信息
                memberInfo: memberInfo, // 会员信息
            }, ()=>{
                memberCards = JSON.parse(JSON.stringify(stateData.cards))
            });
        }).then(() => {
            if (paymentTimesCard) {
                this.state.paySequence = paymentTimesCard.map((x) => ({key: x.payType + '_' + x.payTypeId, value: x}));
            }

            this.calculateBilling(this.state, (data) => {
                try {
                    this.checkResult(data);
                    let {
                        alreadyPaidPrice,
                        alreadyCouponPrice,
                        alreadyWaitPayPrice,
                        willPayPrice,
                        alreadyDiscountPrice,
                        timesProjectsPayEndNum
                    } = data.data;
                    //进入页面应付计算
                    this.setState({
                        paymentInfo: {
                            ...this.state.paymentInfo,
                            willPayPrice: willPayPrice,
                            alreadyPaidPrice: alreadyPaidPrice,
                            wait4PayAmt: alreadyWaitPayPrice,
                            alreadyCouponPrice: alreadyCouponPrice,
                            alreadyDiscountPrice: alreadyDiscountPrice,
                            timesProjectsPayEndNum: timesProjectsPayEndNum,
                        },
                    });

                    callBack && callBack()
                } catch (e) {
                    showMessage(e.msg, true, () => {
                        this.props.navigation.goBack();
                    });
                }
            });
        });
    }

    // 切换他人代付与自己支付
    switchPayWay(type){
        if(type == this.state.payWayType){
            return
        }

        // 左侧支付列表
        const payTypes = JSON.parse(JSON.stringify(this.state.payTypes))

        // 需要取消选择的项目索引
        let clearIndex = -1
        payTypes.forEach((item, index)=>{
            if(item.payTypeId == '2'){
                clearIndex = index
            }
        })

        this.onPayTypeChecked(clearIndex, ()=>{
            // 切换支付方式：会员卡支付、他人代付
            if(type == 'other'){
                payTypes.forEach(item=>{
                    if(item.payTypeId == '2'){
                        item.name = '他人代付' // 储值卡支付
                        item.icon = require('@imgPath/cashier_billing_pay_other.png')
                        item.paidAmt = null
                        item.itemAmt = null
                    }
                })

                this.setState({
                    cards: [],
                    editCard: null, //正在编辑卡
                    selectedCardsId: [], // 选中的卡Id
                    multiProfiles: [], // 他人多档案
                    anotherPortrait: null, // 他人档案信息
                    payWayType: type,
                    payTypes: payTypes
                }, ()=>{
                    this.panelMultiProfilePanelRef.showRightPanel('noReserve', 'query', '', '', 'createOrder', 'MultiPayActivity')
                })
            }else{
                payTypes.forEach(item=>{
                    if(item.payTypeId == '2'){
                        item.name = '会员卡支付' // 储值卡支付
                        item.icon = require('@imgPath/pay-multiply-card.png')
                        item.paidAmt = null
                        item.itemAmt = memberCards.length
                    }
                })

                this.setState({
                    cards: memberCards,
                    editCard: null, //正在编辑卡
                    selectedCardsId: [], // 选中的卡Id
                    multiProfiles: [], // 他人多档案
                    anotherPortrait: null, // 他人档案信息
                    payWayType: type,
                    payTypes: payTypes
                }, ()=>{
                    this.panelMultiProfilePanelRef.hideRightPanel()
                })
            }
        })
    }

    // 档案确定
    async customerPressEvent(type, extra, callBack) {
        switch (type) {
            case 'toCreateOrder':
                const queryType = extra['queryType']
                const params = {}
                if (queryType == 'phone') {
                    params['value'] = extra['phone']
                    params['paramType'] = '1'  // 1 手机号
                }

                // 手机号查询组件手机号为空，清空列表
                if ((!params['value'] || params['value'].length < 1)
                    && params['paramType'] == '1') {
                    this.setState((prevState, props) => {
                        return {...prevState, multiProfiles: []}
                    })
                    return
                }

                // 获取会员档案
                this.setState({isLoading: true})
                getMemberInfo(params).then(async backData => {
                    const {code, data} = backData
                    this.setState({isLoading: false})
                    if (code != '6000') {
                        showMessageExt("获取会员档案失败")
                    } else {
                        // 档案数据
                        this.setState((prevState, props) => {
                            return {...prevState, multiProfiles: data}
                        })
                    }
                }).catch(e => {
                    console.error("通过appUserId获取会员档案失败", e)
                    showMessageExt("获取会员档案失败")
                    this.setState({isLoading: false})
                })
                break
            case 'forwardToCashier':
                this.customerPressEvent('naviToCashier', {
                    memberId: extra['memberId']
                })
                break;
            case 'naviToCashier':
                // 开始准备开单的数据-获取BMS会员档案
                this.setState({isLoading: true})
                try {
                    // 开始准备开单的数据-获取BMS会员档案
                    const portraitBackData = await getMemberPortrait({
                        p: 1,
                        ps: 1000,
                        cardInfoFlag: false,
                        solrSearchType: 0,
                        kw: extra.memberId,
                    })
                    // 登录的员工信息
                    const loginUser = this.props.auth.userInfo;
                    // 开始准备开单的数据-获取BMS会员卡
                    const cardsBackData = await getMemberCards({
                        memberId: extra.memberId,
                        isExpireCard: 1
                    })
                    // 获取开单用的会员卡数据
                    const billCardsBackData = await getMemberBillCards({
                        companyId: loginUser.companyId,
                        storeId: loginUser.storeId,
                        customerId: extra.memberId,
                        isExpireCard: 1
                    })
                    // 会员档案
                    if (portraitBackData.code != '6000'
                        || cardsBackData.code != '6000'
                        || billCardsBackData.code != '6000') {
                        // 错误
                        showMessageExt("获取他人档案失败")
                        this.setState({isLoading: false})
                    } else {
                        this.setState({isLoading: false})
                        // BMS会员档案
                        const memberPortrait = portraitBackData['data']['memberList'][0]
                        memberPortrait['isGuest'] = false
                        // BMS会员卡
                        const memberCardInfo = cardsBackData['data']
                        // 开单用的会员卡
                        const billCards = billCardsBackData['data']

                        // 开单参数
                        const memberInfo = Object.assign({}, memberPortrait, {
                            userImgUrl: getImage(
                                extra.imgUrl,
                                ImageQutity.member_small,
                                'https://pic.magugi.com/magugi_default_01.png'
                            ),
                            vipStorageCardList: billCards.vipStorageCardList || memberCardInfo.vipStorageCardList,
                            cardBalanceCount: memberCardInfo.cardBalanceCount,
                            cardCount: memberCardInfo.cardCount
                        })

                        // 会员有效卡
                        const availableCards =
                            (memberInfo &&
                                memberInfo.vipStorageCardList &&
                                memberInfo.vipStorageCardList.length &&
                                memberInfo.vipStorageCardList.filter((x) => {
                                    let balance = Number(x.balance || 0) + (x.attachMoneyList || []).reduce((rs, x) => (rs += Number(x.balance || 0)), 0);
                                    return x.cardType == 1 && (x.consumeMode != 0 || balance > 0);
                                })) ||
                            [];

                        // 组装有效卡展示
                        let finalCards = []
                        if (availableCards.length) {
                            finalCards = availableCards.map((x) => ({
                                id: x.id,
                                balance: x.balance,
                                vipCardNo: x.vipCardNo,
                                vipCardName: x.vipCardName,
                                storeName: x.storeName,
                                hasPassword: x.hasPassword,
                                password: x.password,
                                attachMoney: x.attachMoney,
                                attachMoneyList: x.attachMoneyList,
                                consumeMode: x.consumeMode,
                                cardType: x.cardType,
                                cardStatus: x.status,
                                validityShow: x.validityShow
                            }));
                        }

                        this.setState({
                            anotherPortrait: memberInfo,
                            cards: finalCards
                        }, ()=>{
                            this.panelMultiProfilePanelRef.hideRightPanel()
                        })
                    }
                } catch (e) {
                    // 错误
                    showMessageExt("获取他人档案失败")
                    this.setState({isLoading: false})
                    console.error("获取他人档案失败", e)
                }
                break
        }
    }

    // 他人代付取消当前档案
    cancelAnother(){
        // 取消卡选中
        let clearIndex = 0
        this.state.payTypes.forEach((item, index)=>{
            if(item.name == '他人代付'){
                clearIndex = index
            }
        })

        this.onPayTypeChecked(clearIndex, ()=>{
            // 处理呈现
            this.setState({
                anotherPortrait: null,
                cards: []
            }, ()=>{
                this.panelMultiProfilePanelRef.showRightPanel('noReserve', 'query', '', '', 'createOrder', 'MultiPayActivity')
            })
        })
    }

    // 卡延期
    updateCardValidity(cardId){
        Alert.alert('系统提示', "该卡确定要延期吗", [
            {
                text: '是',
                onPress: () => {
                    this.setState({
                        isLoading: true
                    })
                    updateCardValidity({
                        cardId: cardId
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
                            const cards = this.state.cards
                            cards.forEach(card=>{
                                if(card.id == cardId){
                                    card.cardStatus = '0'
                                    card.validityShow = ''
                                }
                            })

                            this.setState({
                                isLoading: false,
                                cards
                            })
                            showMessageExt("卡延期成功")
                        }
                    }).catch(e=>{
                        console.log(e)
                        showMessageExt("卡延期失败")
                    }).finally(_=>{
                        this.setState({
                            isLoading: false
                        })
                    })
                }
            },
            {
                text: '否',
            },
        ])
    }

    render() {
        const {
            isLoading,
            billingInfo,
            memberInfo,
            payTypes,
            selectedPayTypeIndex,
            coupons,
            selectedCoupons,
            cards,
            selectedCardsId,
            paymentInfo,
            editCard,
            qrCode,
            isPaySuccess,
            errorStockList,
            usedOtherPay,
            payWayType,
            hasCards,
            anotherPortrait
        } = this.state;
        let selectedPayType = payTypes[selectedPayTypeIndex];
        let selectedItemAmtInfo =
            selectedPayType && selectedPayType.payType == 5
                ? (selectedCoupons.length ? '已选优惠券' + selectedCoupons.length + '张' : '')
                : (selectedPayType && selectedPayType.payType == 2 ? (selectedCardsId.length ? '已选会员卡' + selectedCardsId.length + '张' : '') : '')

        // 开始渲染
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Spinner
                    visible={isLoading}
                    textContent={'加载中'}
                    textStyle={{
                        color: '#FFF'
                    }}
                />
                {isPaySuccess && (
                    <QRCodePaymentNew
                        paymentStatus={PaymentResultStatus.success}
                        navigation={this.props.navigation}
                        title={'订单支付'}
                        flowNum={billingInfo.flowNumber}
                        onClose={this.confirmPaySuccess.bind(this)}
                    />
                )}
                <View style={multiplyPayStyle.modalBackground}>
                    <View style={multiplyPayStyle.contentWrapper}>
                        {/*顶部信息*/}
                        <View style={multiplyPayStyle.header}>
                            <View style={multiplyPayStyle.headerLeft}>
                                <Text style={multiplyPayStyle.leftTitle}>组合支付:</Text>
                                <Text style={multiplyPayStyle.leftValue}>{billingInfo.flowNumber}</Text>
                                {/* <Text style={multiplyPayStyle.leftValue}>230197,230198,230199,230120 (从单)</Text> */}
                            </View>
                            {memberInfo && memberInfo.name != '散客' && (
                                <View style={multiplyPayStyle.headerRight}>
                                    <Image
                                        style={multiplyPayStyle.headerAvatar}
                                        resizeMethod="resize"
                                        source={require('@imgPath/rotate-portrait.png')}
                                    />
                                    <Text style={multiplyPayStyle.rightValue}>{memberInfo.name || ''}</Text>
                                    <Text style={multiplyPayStyle.rightValue}>{memberInfo.phone || ''}</Text>
                                    <Text style={multiplyPayStyle.rightValue}>{memberInfo.sex == 1 ? '男' : '女'}</Text>
                                </View>
                            )}
                        </View>
                        {/*主体信息*/}
                        <View style={multiplyPayStyle.bodyer}>
                            {/*主体信息-左侧列表*/}
                            <PayTypeList
                                data={payTypes}
                                selectedIndex={selectedPayTypeIndex}
                                onSelected={this.onPayTypeSelected}
                                onChecked={this.onPayTypeChecked}
                            />
                            {/*主体信息-右侧列表*/}
                            <View style={multiplyPayStyle.bodyerRight}>
                                {/*右侧栏*/}
                                {
                                    (()=>{
                                        if(selectedPayType && selectedPayType.payTypeId == '2'){ // 会员卡支付或他人代付
                                            if(hasCards) { // 拥有会员卡，展示Tab栏:会员卡支付、他人代付
                                                return (
                                                    <View style={multiplyPayStyle.payWayWrap}>
                                                        <TouchableOpacity
                                                            style={payWayType == 'self' ? multiplyPayStyle.payWaySelfWrapActive:multiplyPayStyle.payWaySelfWrap}
                                                            onPress={()=>{
                                                                this.switchPayWay('self')
                                                            }}>
                                                            <View style={multiplyPayStyle.img_left}>
                                                                <Image style={multiplyPayStyle.itemLeftImg}
                                                                       resizeMethod="resize"
                                                                       source={require("@imgPath/pay-multiply-card.png")}/>
                                                                <Text style={multiplyPayStyle.rightTitleTxt}>
                                                                    会员卡支付
                                                                </Text>
                                                            </View>
                                                            {
                                                                /*
                                                                取消已选择几张会员卡提示
                                                                <Text style={multiplyPayStyle.rightTitleTxt0}>{selectedItemAmtInfo}</Text>
                                                                */
                                                            }
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={payWayType == 'other' ? multiplyPayStyle.payWayOtherWrapActive:multiplyPayStyle.payWayOtherWrap}
                                                            onPress={()=>{
                                                                this.switchPayWay('other')
                                                            }}>
                                                            <View style={multiplyPayStyle.img_left}>
                                                                <Image style={multiplyPayStyle.itemLeftImg}
                                                                       resizeMethod="resize"
                                                                       source={require("@imgPath/cashier_billing_pay_other.png")}></Image>
                                                                <Text style={multiplyPayStyle.rightTitleTxt}>
                                                                    他人代付
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            }else{ // 只拥有他人代付
                                                return (
                                                    <View style={multiplyPayStyle.payWayOnlyWrap}>
                                                        <Image style={multiplyPayStyle.itemLeftImg} resizeMethod="resize" source={selectedPayType.icon}></Image>
                                                        <Text style={multiplyPayStyle.rightTitleTxt}>
                                                            {selectedPayType ? selectedPayType.name : '选择支付方式'}
                                                        </Text>
                                                    </View>
                                                )
                                            }
                                        }else{ // 三方支付方式，通栏展示
                                            return (
                                                <View style={multiplyPayStyle.payWayOnlyWrap}>
                                                    {
                                                        selectedPayType && selectedPayType.icon && (
                                                            <Image style={multiplyPayStyle.itemLeftImg} resizeMethod="resize" source={selectedPayType.icon}></Image>
                                                        )
                                                    }
                                                    <Text style={multiplyPayStyle.rightTitleTxt}>
                                                        {selectedPayType ? selectedPayType.name : '选择支付方式'}
                                                    </Text>
                                                </View>
                                            )
                                        }
                                    })()
                                }
                                {/*右侧内容栏*/}
                                <View style={multiplyPayStyle.payContentWrap}>
                                    {/* 默认｜为空 */}
                                    <View style={selectedPayType ? multiplyPayStyle.hide : multiplyPayStyle.rightDefault}>
                                        <Image source={require('@imgPath/no-content.png')} resizeMode={'contain'}
                                               style={multiplyPayStyle.noContentImg}/>
                                        <Text style={multiplyPayStyle.noContentTxt}>请选择支付方式</Text>
                                    </View>
                                    {/* 已选择支付方式 */}
                                    <View style={selectedPayType ? multiplyPayStyle.rightWrapper : multiplyPayStyle.hide}>
                                        <View style={multiplyPayStyle.rightWrapperContent}>
                                            {
                                                /*优惠券*/
                                                selectedPayType && selectedPayType.payType == 5 && (
                                                    <CouponList selectedCoupons={selectedCoupons} data={coupons} onSeleted={this.onCouponSelected}/>
                                                )
                                            }
                                            {
                                                /*自己付：卡列表*/
                                                payWayType == 'self' && selectedPayType && selectedPayType.payType == 2 && !editCard && (
                                                    <MemberCardList
                                                        onSeleted={this.onCardSelected}
                                                        selectedCardsId={selectedCardsId}
                                                        data={cards}
                                                        onEdit={this.onEditCard}
                                                        onValiDity={this.updateCardValidity.bind(this)}
                                                        payWayType={payWayType}
                                                    />
                                                )
                                            }
                                            {
                                                /*自己付：卡编辑*/
                                                payWayType == 'self' && selectedPayType && selectedPayType.payType == 2 && editCard && (
                                                    <EditCardPay card={editCard}
                                                                 waitPayMoney={paymentInfo.wait4PayAmt}
                                                                 usedOtherPay={usedOtherPay}
                                                                 onCancel={this.onEditCardCancel}
                                                                 onConfirm={this.onEditCardConfirm}/>
                                                )
                                            }
                                            {/*他人代付*/}
                                            <View style={payWayType == 'other' && selectedPayType && selectedPayType.payType == 2 ? multiplyPayStyle.anotherPayBox:multiplyPayStyle.hide}>
                                                {/*他人档案*/}
                                                <MultiPayProfilePanel ref={ref => {this.panelMultiProfilePanelRef = ref}} multiProfileData={this.state.multiProfiles} customerClickEvent={this.customerPressEvent.bind(this)}/>
                                                {/*他人卡信息*/}
                                                {
                                                    anotherPortrait && (
                                                        <View style={multiplyPayStyle.anotherPortraitBox}>
                                                            <View style={multiplyPayStyle.anotherPortraitTitleBox}>
                                                                <View style={multiplyPayStyle.anotherPortraitTitleLeft}>
                                                                    <Image
                                                                        style={multiplyPayStyle.anotherInfoAvatar}
                                                                        resizeMethod="resize"
                                                                        source={getImage(anotherPortrait.userImgUrl.uri, ImageQutity.staff, require('@imgPath/reserve_customer_default_avatar.png'))}
                                                                        defaultSource={require('@imgPath/reserve_customer_default_avatar.png')}/>
                                                                    <View style={multiplyPayStyle.anotherInfoBase}>
                                                                        <View style={multiplyPayStyle.anotherInfoBaseName}>
                                                                            <Text style={multiplyPayStyle.anotherInfoBaseNameTxt} ellipsizeMode={'tail'} numberOfLines={1}>
                                                                                {anotherPortrait.name ? decodeURIComponent(anotherPortrait.name) : '未填写姓名'}
                                                                            </Text>
                                                                            <Image
                                                                                style={multiplyPayStyle.anotherSexIcon}
                                                                                resizeMode={'contain'}
                                                                                source={anotherPortrait.sex == '1' ? require('@imgPath/reserve_customer_multi_profile_man.png') : require('@imgPath/reserve_customer_multi_profile_woman.png')}/>
                                                                        </View>

                                                                        <View style={multiplyPayStyle.anotherInfoBaseName}>
                                                                            <Text style={multiplyPayStyle.anotherInfoBasePhone}>
                                                                                {anotherPortrait.phone.substring(0, 3) + "****" + anotherPortrait.phone.substring(7, 12) || '暂无'}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                                <TouchableOpacity
                                                                    style={multiplyPayStyle.anotherPortraitTitleRight}
                                                                    onPress={()=>{
                                                                        this.cancelAnother()
                                                                    }}>
                                                                    <Text style={multiplyPayStyle.anotherPortraitTitleRightTxt}>取消</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={multiplyPayStyle.anotherPortraitBodyBox}>
                                                                {
                                                                    cards && cards.length > 0 && !editCard && (
                                                                        <MemberCardList
                                                                            onSeleted={this.onCardSelected}
                                                                            selectedCardsId={selectedCardsId}
                                                                            data={cards}
                                                                            onEdit={this.onEditCard}
                                                                            payWayType={payWayType}
                                                                            onValiDity={this.updateCardValidity.bind(this)}
                                                                        />
                                                                    )
                                                                }
                                                                {
                                                                    cards && cards.length > 0 && editCard && (
                                                                        <EditCardPay card={editCard}
                                                                                 waitPayMoney={paymentInfo.wait4PayAmt}
                                                                                 usedOtherPay={usedOtherPay}
                                                                                 onCancel={this.onEditCardCancel}
                                                                                 onConfirm={this.onEditCardConfirm}/>
                                                                    )
                                                                }
                                                            </View>
                                                        </View>
                                                    )
                                                }
                                            </View>
                                            {
                                                /*其他支付方式*/
                                                selectedPayType && selectedPayType.payType != 2 && selectedPayType.payType != 5 && (
                                                    <View style={multiplyPayStyle.otherPayWrap}>
                                                        <SimulateKeyboardPay showInput={true}
                                                                             showCanel={false}
                                                                             onConfirm={this.onKeyBoardFinish}/>
                                                    </View>
                                                )
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*底部信息*/}
                        <View style={multiplyPayStyle.footer}>
                            <View style={multiplyPayStyle.footerLeft}>
                                <View style={multiplyPayStyle.footerLeftTop}>
                                    <Text style={multiplyPayStyle.footerLeftItem}>应付：{paymentInfo.willPayPrice}</Text>
                                    <Text
                                        style={multiplyPayStyle.footerLeftItem}>已付：{paymentInfo.alreadyPaidPrice}</Text>
                                    <Text style={[multiplyPayStyle.footerLeftItem, multiplyPayStyle.leftItemRed]}>
                                        待付：{paymentInfo.wait4PayAmt}
                                    </Text>
                                </View>
                                <View style={multiplyPayStyle.footerLeftBottom}>
                                    <Text style={[multiplyPayStyle.footerLeftItem, multiplyPayStyle.leftItemOrange]}>
                                        抵扣：{paymentInfo.alreadyCouponPrice}
                                    </Text>
                                    <Text style={[multiplyPayStyle.footerLeftItem, multiplyPayStyle.leftItemOrange]}>
                                        优惠：{paymentInfo.alreadyDiscountPrice}
                                    </Text>
                                    <Text style={[multiplyPayStyle.footerLeftItem, multiplyPayStyle.leftItemRed]}>
                                        次卡消费：{paymentInfo.timesProjectsPayEndNum}项
                                    </Text>
                                </View>
                            </View>
                            <View style={multiplyPayStyle.footerRight}>
                                <TouchableOpacity style={multiplyPayStyle.canelBtn}
                                                  onPress={throttle(this.onCancel, 600)}>
                                    <Text style={multiplyPayStyle.btnText}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={multiplyPayStyle.confirmBtn}
                                                  onPress={throttle(this.onPay.bind(this), 800)}>
                                    <Text style={multiplyPayStyle.btnText}>确认支付</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                {this.state.showCardPwd && (
                    <View style={multiplyPayStyle.pwdBackground}>
                        <View style={multiplyPayStyle.pwdWrapper}>
                            <View style={multiplyPayStyle.pwdTitle}>
                                <Image
                                    style={multiplyPayStyle.itemLeftImg}
                                    resizeMethod="resize"
                                    source={require('@imgPath/pay-multiply-card.png')}
                                ></Image>
                                <Text style={multiplyPayStyle.pwdTitleValue}>
                                    {
                                        payWayType == 'self' ? '会员卡支付，请输入密码':'他人代付，请输入密码'
                                    }
                                </Text>
                            </View>
                            <SimulateKeyboardPay
                                showCanel={true}
                                showInput={true}
                                clearBtn={false}
                                pageType="pwd"
                                onConfirm={this.onPwdConfirm.bind(this)}
                                onCanel={this.onPwdCancel.bind(this)}
                            />
                        </View>
                    </View>
                )}
                {qrCode && (
                    <QRCodePaymentCashier
                        //visible={qrCode.show}
                        qrUrl={qrCode.qrUrl}
                        totalPrice={qrCode.totalPrice}
                        tradeNo={qrCode.tradeNo}
                        payType={qrCode.payType}
                        flowNumber={qrCode.flowNumber}
                        onClosePay={this.onQRCancel.bind(this)}
                    />
                )}
                {errorStockList.length > 0 && (
                    <StockTips
                        stockData={errorStockList}
                        onClose={() => {
                            this.setState({errorStockList: []});
                        }}
                    />
                )}
            </View>
        );
    }

    //请求页面基础数据
    getInitialData(billingInfo, memberInfo, items, callback) {
        const params = {
            companyId: billingInfo.companyId,
            storeId: billingInfo.storeId,
            billingNo: billingInfo.billingNo,
            phone: '',
            consumeItems: JSON.stringify(items)
        }
        if (memberInfo && memberInfo.phone) {
            params.phone = memberInfo.phone
        }

        this.setState({isLoading: true});
        return getAvailablePaymentInfo(params)
            .then((o) => {
                callback && callback(o.data);
            })
            .catch((err) => {
                showMessage('网络异常');
            })
            .finally(() => {
                this.setState({isLoading: false});
            });
    }

    //根据支付项目构造参数
    buildPayTypeParams(paySequence, opt, type, obj, orgObj) {
        const payWayType = this.state.payWayType
        if (type == 'coupon') {
            let sequenceKey = '5_' + obj.id;
            if (opt == 'add') {
                paySequence = paySequence.filter((x) => x.key != sequenceKey);
                paySequence.push({
                    key: sequenceKey,
                    value: {
                        payType: 5,
                        payTypeId: obj.id,
                        payTypeNo: obj.couponNo,
                        payAmount: obj.couponPrice,
                        payMode: 0,
                        paymentName: obj.name
                    },
                });
            } else if (opt == 'del') {
                paySequence = paySequence.filter((x) => x.key != sequenceKey);
            } else if (opt == 'del_all') {
                paySequence = paySequence.filter((x) => !x.key.startsWith('5_'));
            }
            return paySequence;
        }

        if (type == 'card') {
            if (opt == 'del') {
                let sequenceKey = '2_' + obj.id;
                paySequence = paySequence.filter((x) => !x.key.startsWith(sequenceKey));
                return paySequence;
            } else if (opt == 'add') {
                let sequenceKey = '2_' + obj.id + '_' + obj.consumeMode;
                paySequence = paySequence.filter((x) => x.key != sequenceKey);
                if(payWayType == 'other'){
                    paySequence.push({
                        key: sequenceKey,
                        value: {
                            payType: 2,
                            payTypeId: obj.id,
                            payTypeNo: obj.vipCardNo,
                            payAmount: obj.paidAmt,
                            paymentName: obj.vipCardName,
                            payTypePwd: '',
                            hasPassword: obj.hasPassword,
                            payMode: obj.consumeMode,
                            isOtherPay: true
                        }
                    });
                }else{
                    paySequence.push({
                        key: sequenceKey,
                        value: {
                            payType: 2,
                            payTypeId: obj.id,
                            payTypeNo: obj.vipCardNo,
                            payAmount: obj.paidAmt,
                            paymentName: obj.vipCardName,
                            payTypePwd: '',
                            hasPassword: obj.hasPassword,
                            payMode: obj.consumeMode,
                        }
                    });
                }
                return paySequence;
            } else if (opt == 'del_all') {
                paySequence = paySequence.filter((x) => !x.key.startsWith('2_'));
                return paySequence;
            } else if (opt == 'compare') {
                //通过比较卡对象修改参数
                let sequenceKey = '2_' + obj.id + '_' + obj.consumeMode;
                //本金
                if (obj.paidAmt != null && obj.paidAmt != undefined && (orgObj.paidAmt == null || orgObj.paidAmt == undefined)) {
                    //添加
                    paySequence = paySequence.filter((x) => x.key != sequenceKey);

                    if(payWayType == 'other'){
                        paySequence.push({
                            key: sequenceKey,
                            value: {
                                payType: 2,
                                payTypeId: obj.id,
                                payTypeNo: obj.vipCardNo,
                                payAmount: obj.paidAmt,
                                paymentName: obj.vipCardName,
                                payTypePwd: '',
                                hasPassword: obj.hasPassword,
                                payMode: obj.consumeMode,
                                isOtherPay: true
                            },
                        });
                    }else{
                        paySequence.push({
                            key: sequenceKey,
                            value: {
                                payType: 2,
                                payTypeId: obj.id,
                                payTypeNo: obj.vipCardNo,
                                payAmount: obj.paidAmt,
                                paymentName: obj.vipCardName,
                                payTypePwd: '',
                                hasPassword: obj.hasPassword,
                                payMode: obj.consumeMode,
                            },
                        });
                    }

                } else if (obj.paidAmt == null && orgObj.paidAmt !== null && orgObj.paidAmt != undefined) {
                    //删除
                    paySequence = paySequence.filter((x) => x.key != sequenceKey);
                } else if (obj.paidAmt !== orgObj.paidAmt) {
                    //修改
                    let item = paySequence.find((x) => x.key == sequenceKey);
                    item.value.payAmount = obj.paidAmt;
                }

                //赠金
                if (!obj.attachMoneyList || !obj.attachMoneyList.length) return paySequence;
                obj.attachMoneyList.forEach((attach) => {
                    let sequenceKey = '2_' + obj.id + '_-1_' + attach.id;
                    let orgAttach = orgObj.attachMoneyList.find((x) => x.id == attach.id);
                    if (attach.paidAmt != null && attach.paidAmt != undefined && (orgAttach.paidAmt == null || orgAttach.paidAmt == undefined)) {
                        //添加
                        paySequence = paySequence.filter((x) => x.key != sequenceKey);
                        if(payWayType == 'other'){
                            paySequence.push({
                                key: sequenceKey,
                                value: {
                                    payType: 2,
                                    payTypeId: obj.id,
                                    payTypeNo: obj.vipCardNo,
                                    payAmount: attach.paidAmt,
                                    paymentName: obj.vipCardName,
                                    payTypePwd: '',
                                    hasPassword: obj.hasPassword,
                                    payMode: -1,
                                    payModeId: attach.id,
                                    payModeName: attach.cardName,
                                    isOtherPay: true
                                },
                            });
                        }else{
                            paySequence.push({
                                key: sequenceKey,
                                value: {
                                    payType: 2,
                                    payTypeId: obj.id,
                                    payTypeNo: obj.vipCardNo,
                                    payAmount: attach.paidAmt,
                                    paymentName: obj.vipCardName,
                                    payTypePwd: '',
                                    hasPassword: obj.hasPassword,
                                    payMode: -1,
                                    payModeId: attach.id,
                                    payModeName: attach.cardName,
                                },
                            });
                        }

                    } else if (attach.paidAmt == null && orgAttach.paidAmt !== null && orgAttach.paidAmt != undefined) {
                        //删除
                        paySequence = paySequence.filter((x) => x.key != sequenceKey);
                    } else if (attach.paidAmt !== orgAttach.paidAmt) {
                        //修改
                        let item = paySequence.find((x) => x.key == sequenceKey);
                        item.value.payAmount = attach.paidAmt;
                    }
                });

                return paySequence;
            }
        }

        if ((type == 'other')) {
            let sequenceKey = obj.payType + '_' + obj.payTypeId;
            if (opt == 'add') {
                paySequence = paySequence.filter((x) => x.key != sequenceKey);
                paySequence.push({
                    key: sequenceKey,
                    value: {
                        payType: obj.payType,
                        payTypeId: obj.payTypeId,
                        payTypeNo: obj.payTypeNo,
                        paymentName: obj.name == '银联支付' ? '银行卡' : obj.name,
                        payAmount: obj.paidAmt,
                        payMode: obj.payMode,
                    },
                });
                return paySequence;
            } else if (opt == 'del') {
                paySequence = paySequence.filter((x) => x.key != sequenceKey);
                return paySequence;
            }
        }
    }

    //计算应付
    calculateBilling = (state, cb) => {
        let {billingInfo, items, paySequence} = state;
        let payTypes = paySequence.map((x) => x.value); //this.buildPayTypeParams(state);

        let param = {
            itemList: JSON.stringify(items.filter((x) => x.service != 2)),
            paymentList: JSON.stringify(payTypes),
            //realPay: false,
            billingInfo: JSON.stringify(billingInfo),
            sendMsg: '0',
        };
        this.setState({isLoading: true});
        fetchPrePayBilling(param)
            .then((data) => {
                //this.setState({ isLoading: false });
                cb && cb(data);
            })
            .catch((err) => {
                showMessage('网络异常', true);
            })
            .finally(() => {
                this.setState({isLoading: false});
            });
    };

    checkResult(data) {
        let {payResultCode, payTypeErrorList, payTypeMoreList, msg} = data.data;
        if (payResultCode === '1') {
            if (payTypeErrorList) {
                let sample = payTypeErrorList[0];

                let payCode = sample.payCode;
                let msg = '';
                if (payCode == '-7') {
                    msg = sample.paymentName + ' 余额不足';
                    throw {type: 'warning', msg};
                } else if (payCode == '5') {
                    throw {type: 'error', msg: '会员卡不可支付，该卡未找到可支付的项目或外卖'};
                } else if (payCode == '-2') {
                    throw {type: 'error', msg: '密码错误'};
                } else if (payCode == '9') {
                    throw {type: 'error', msg: '该卡不允许跨店消费'};
                } else {
                    throw {type: 'error', msg: '支付异常'};
                }
            }
        } else if (payResultCode == '-2') {
            throw {type: 'error', msg: msg};
        } else if (payResultCode == '4') {
            throw {type: 'error', msg: '单据已结单'};
        } else if (payResultCode == '0') {
            throw {type: 'error', msg: '正在支付'};
        } else if (payResultCode == '3') {
            throw {type: 'error', msg: '订单状态异常，不允许支付'};
        } else if (payResultCode == '-4') {
            throw {type: 'error', msg: '有非法从单或消费项，请刷新后重试'};
        } else if (payResultCode == '-5') {
            throw {type: 'error', msg: '外卖存店异常'};
        } else {
            if (payTypeMoreList && payTypeMoreList.length) {
                let sample = payTypeMoreList[0];
                throw {type: 'error', msg: sample.paymentName + ' 支付方式多出'};
            }
            throw {type: 'error', msg: sample.paymentName + ' 支付异常'};
        }
    }

    //支付方式选中
    onPayTypeSelected = (index) => {
        this.setState({
            selectedPayTypeIndex: index,
            editCard: null,
        }, ()=>{
            const {payTypes, selectedPayTypeIndex, payWayType} = this.state
            const selectedPayType = payTypes[selectedPayTypeIndex]
            const showState = this.panelMultiProfilePanelRef.getShowState()
            if(!showState && payWayType == 'other' && selectedPayType && selectedPayType.payType == 2){
                this.panelMultiProfilePanelRef.showRightPanel('noReserve', 'query', '', '', 'createOrder', 'MultiPayActivity')
            }
        })
    };

    //支付方式checkBox 选中
    onPayTypeChecked = (index, callBack) => {
        let payType = this.state.payTypes[index];
        if (payType.paidAmt == null || payType.paidAmt == undefined) {
            this.setState({
                selectedPayTypeIndex: index,
                editCard: null,
            }, ()=>{
                callBack && callBack()
            });
            return;
        }

        let preState = {...this.state, payTypes: [...this.state.payTypes], paySequence: [...this.state.paySequence]};
        preState.payTypes[index] = {...payType, paidAmt: null};
        if (payType.payType == 5) {
            preState.selectedCoupons = [];
            preState.paySequence = this.buildPayTypeParams(preState.paySequence, 'del_all', 'coupon', payType);
        } else if (payType.payType == 2) {
            preState.selectedCardsId = [];
            preState.cards = this.state.cards.reduce((rs, card) => {
                rs.push(this.resetCard(card));
                return rs;
            }, []);
            preState.paySequence = this.buildPayTypeParams(preState.paySequence, 'del_all', 'card');
            preState.editCard = null;
        } else if (payType.payTypeId == 18) {
            let index = preState.payTypes.findIndex((x) => x.payTypeId == 19);
            preState.payTypes[index] = {...preState.payTypes[index], disable: null};
            preState.paySequence = this.buildPayTypeParams(preState.paySequence, 'del', 'other', payType);
        } else if (payType.payTypeId == 19) {
            let index = preState.payTypes.findIndex((x) => x.payTypeId == 18);
            preState.payTypes[index] = {...preState.payTypes[index], disable: null};
            preState.paySequence = this.buildPayTypeParams(preState.paySequence, 'del', 'other', payType);
        } else {
            preState.paySequence = this.buildPayTypeParams(preState.paySequence, 'del', 'other', payType);
        }

        this.calculateBilling(preState, (data) => {
            try {
                this.checkResult(data);

                let paymentInfo = this.getPaymentInfo(preState, data.data);
                this.setState({
                    ...preState,
                    paymentInfo: {...this.state.paymentInfo, ...paymentInfo},
                }, ()=>{
                    callBack && callBack()
                });
            } catch (e) {
                showMessage(e.msg, true);
            }
        });
    };

    //优惠券选中
    onCouponSelected = (coupon) => {
        let selectedCoupons = [...this.state.selectedCoupons];
        let index = selectedCoupons.indexOf(coupon);

        let paySequence = [...this.state.paySequence];
        if (index != -1) {
            selectedCoupons.splice(index, 1);
            paySequence = this.buildPayTypeParams(paySequence, 'del', 'coupon', coupon);
        } else {
            // 优惠券选中
            selectedCoupons.push(coupon);
            paySequence = this.buildPayTypeParams(paySequence, 'add', 'coupon', coupon);
        }

        // 如果优惠券支付选中，自动补齐卡扣金额
        const usedCoupon = selectedCoupons.length > 0
        let cards = JSON.parse(JSON.stringify(this.state.cards))
        if (usedCoupon) {
            cards.forEach(card => {
                card.paidAmt = null
                if (card.attachMoneyList) {
                    card.attachMoneyList.forEach(attch => {
                        attch.paidAmt = null
                    })
                }
            })
            paySequence.forEach(item => {
                let {payType} = item.value
                if (payType == '2') {
                    item.value['payAmount'] = ''
                }
            })
        }

        let preState = {...this.state, cards, selectedCoupons, payTypes: [...this.state.payTypes], paySequence};
        this.calculateBilling(preState, (data) => {
            let {payTypeUsedList} = data.data;
            try {
                this.checkResult(data);

                // 根据后台扣券返回结果处理券前端展示
                let couponItems = payTypeUsedList && payTypeUsedList.length ? payTypeUsedList.filter((x) => x.payType == 5) : [];
                let totalCouponPrice = couponItems.length ? couponItems.reduce((rs, x) => rs + x.consumeActualMoney, 0) : null;
                let checkedCoupons = couponItems.map(item => {
                    return item.couponInfo.couponNo
                })
                selectedCoupons = selectedCoupons.filter(item => {
                    return checkedCoupons.indexOf(item.couponNo) != -1
                })

                let couponPayType = preState.payTypes.find((x) => x.payType == 5);
                let couponPayTypeIndex = preState.payTypes.indexOf(couponPayType);
                preState.payTypes[couponPayTypeIndex] = {...couponPayType, paidAmt: totalCouponPrice};

                let paymentInfo = this.getPaymentInfo(preState, data.data);
                this.setState({
                    ...preState,
                    selectedCoupons,
                    paymentInfo: {...this.state.paymentInfo, ...paymentInfo},
                });
            } catch (e) {
                console.error("订单预算失败", e)
                showMessage('优惠券不支持消费项目，或抵扣金额已达到最大值', true);
            }
        });
    };

    //会员卡选中
    onCardSelected = (card) => {
        let preState = {
            ...this.state,
            payTypes: [...this.state.payTypes],
            selectedCardsId: [...this.state.selectedCardsId],
            cards: [...this.state.cards],
            paySequence: [...this.state.paySequence],
        };

        let selectedCardsId = preState.selectedCardsId;
        let index = selectedCardsId.findIndex((x) => x == card.id);
        if (index != -1) {
            //取消勾选
            let newCard = this.resetCard(card);
            preState.cards[preState.cards.findIndex((x) => x.id == newCard.id)] = newCard;
            selectedCardsId.splice(index, 1);
            preState.paySequence = this.buildPayTypeParams(preState.paySequence, 'del', 'card', card);
        } else {
            //勾选
            selectedCardsId.push(card.id);
            let newCard = {...card, paidAmt: ''};
            preState.cards[preState.cards.findIndex((x) => x.id == card.id)] = newCard;
            preState.paySequence = this.buildPayTypeParams(preState.paySequence, 'add', 'card', newCard);
        }

        this.calculateBilling(preState, (data) => {
            let {payTypeUsedList} = data.data;
            try {
                this.checkResult(data);

                payTypeUsedList &&
                payTypeUsedList
                    .filter((x) => x.payType == 2 && x.payMode != -1)
                    .forEach((usedItem) => {
                        let index = preState.cards.findIndex((x) => x.id == usedItem.payTypeId);
                        preState.cards[index] = {...preState.cards[index], paidAmt: usedItem.consumeActualAmount};
                    });

                let cardPayType = preState.payTypes.find((x) => x.payType == 2);
                let cardPayTypeIndex = preState.payTypes.indexOf(cardPayType);
                preState.payTypes[cardPayTypeIndex] = {...cardPayType, paidAmt: this.getTotalCardsPaidAmt(preState)};

                let paymentInfo = this.getPaymentInfo(preState, data.data);
                this.setState({
                    ...preState,
                    paymentInfo: {...this.state.paymentInfo, ...paymentInfo},
                });
            } catch (e) {
                if (e.type == 'warning') {
                    this.setState({selectedCardsId: selectedCardsId});
                    showMessage(e.msg, true);
                } else {
                    showMessage(e.msg, true);
                }
            }
        });
    };

    //清空卡支付金额
    resetCard(card) {
        let newCard = clone(card);

        newCard.paidAmt = null;
        if (newCard.attachMoneyList && newCard.attachMoneyList.length) {
            newCard.attachMoneyList.forEach((x) => (x.paidAmt = null));
        }
        return newCard;
    }

    //会员卡编辑点击
    onEditCard = (card) => {
        let editCard = clone(card);
        this.setState({editCard: editCard});
    };
    //会员卡编辑取消
    onEditCardCancel = (card) => {
        let preState = {editCard: null};
        if (
            (card.paidAmt == null || card.paidAmt == undefined) &&
            (!card.attachMoneyList || !card.attachMoneyList.find((x) => x.paidAmt != null || x.paidAmt != undefined))
        ) {
            preState.selectedCardsId = [...this.state.selectedCardsId].filter((x) => x != card.id);
        }
        this.setState(preState);
    };

    //卡编辑完成
    onEditCardConfirm = (card) => {
        let preState = {
            ...this.state,
            payTypes: [...this.state.payTypes],
            selectedCardsId: [...this.state.selectedCardsId],
            cards: [...this.state.cards],
            paySequence: [...this.state.paySequence],
        };

        //更新
        let orgCard = preState.cards[preState.cards.findIndex((x) => x.id == card.id)];
        preState.paySequence = this.buildPayTypeParams(preState.paySequence, 'compare', 'card', card, orgCard);
        preState.cards[preState.cards.findIndex((x) => x.id == card.id)] = card;

        this.calculateBilling(preState, (data) => {
            let {payTypeUsedList} = data.data;
            try {
                this.checkResult(data);

                payTypeUsedList &&
                payTypeUsedList
                    .filter((x) => x.payType == 2)
                    .forEach((usedItem) => {
                        let isAttach = usedItem.payMode == -1;
                        let card = preState.cards.find((x) => x.id == usedItem.payTypeId); //本金
                        let cardIndex = preState.cards.indexOf(card);

                        if (!isAttach) {
                            preState.cards[cardIndex] = {...card, paidAmt: usedItem.consumeActualAmount};
                        } else {
                            let attachId = usedItem.payModeId;

                            let attach = card.attachMoneyList.find((x) => x.id == attachId);
                            let attachIndex = card.attachMoneyList.indexOf(attach);

                            card.attachMoneyList[attachIndex] = {...attach, paidAmt: usedItem.consumeActualAmount};
                            preState.cards[cardIndex] = {...card};
                        }

                        let sequenceItem = preState.paySequence.find(
                            (x) =>
                                x.value.payType == 2 &&
                                x.value.payTypeId == usedItem.payTypeId &&
                                x.value.payMode == usedItem.payMode &&
                                x.value.payModeId == usedItem.payModeId
                        );
                        if (sequenceItem) sequenceItem.value.payAmount = usedItem.consumeActualAmount;
                    });

                let editCard = preState.cards.find((x) => x.id == card.id); //本金
                let cardPayType = preState.payTypes.find((x) => x.payType == 2);
                let cardPayTypeIndex = preState.payTypes.indexOf(cardPayType);
                preState.payTypes[cardPayTypeIndex] = {...cardPayType, paidAmt: this.getTotalCardsPaidAmt(preState)};

                let paymentInfo = this.getPaymentInfo(preState, data.data);
                this.setState({
                    ...preState,
                    editCard: editCard,
                    paymentInfo: {...this.state.paymentInfo, ...paymentInfo},
                });
            } catch (e) {
                showMessage(e.msg, true);
            }
        });
    };

    //输入金额完成
    onKeyBoardFinish = (amt) => {
        let {selectedPayTypeIndex} = this.state;
        let preState = {...this.state, payTypes: [...this.state.payTypes], paySequence: [...this.state.paySequence]};
        let selectedPayType = preState.payTypes[selectedPayTypeIndex];

        if (amt == null ||
            amt == undefined ||
            amt == '' ||
            ((selectedPayType.payTypeId == 18 || selectedPayType.payTypeId == 19) && !Number(amt) > 0)
        ) {
            return;
        }

        let newSelectedPayType = {...selectedPayType, paidAmt: amt};
        preState.payTypes[selectedPayTypeIndex] = newSelectedPayType;
        preState.paySequence = this.buildPayTypeParams(preState.paySequence, 'add', 'other', newSelectedPayType);

        this.calculateBilling(preState, (data) => {
            try {
                this.checkResult(data);
                if (selectedPayType.payTypeId == 18) {
                    //支付宝
                    let wxPayType = preState.payTypes.find((x) => x.payTypeId == 19);
                    let wxPayTypeIndex = preState.payTypes.indexOf(wxPayType);
                    preState.payTypes[wxPayTypeIndex] = {...wxPayType, paidAmt: null, disable: true};
                } else if (selectedPayType.payTypeId == 19) {
                    //微信
                    let aliPayType = preState.payTypes.find((x) => x.payTypeId == 18);
                    let aliPayTypeIndex = preState.payTypes.indexOf(aliPayType);
                    preState.payTypes[aliPayTypeIndex] = {...aliPayType, paidAmt: null, disable: true};
                }

                let paymentInfo = this.getPaymentInfo(preState, data.data);
                this.setState({
                    ...preState,
                    paymentInfo: {...this.state.paymentInfo, ...paymentInfo},
                });
            } catch (e) {
                showMessage(e.msg, true);
            }
        });
    };

    //取消
    onCancel = () => {
        if (this.savedBilling) {
            this.props.cashierScreenReloadOrder()
        }

        this.props.navigation.goBack();
    };

    onPwdConfirm(pwd) {
        //precheck
        if (!pwd && !pwd.length) {
            showMessage('请输入密码', true);
            return;
        }

        let paymentList = this.state.paySequence.map((x) => {
            let newItem = {...x.value};
            if (newItem.payType == 2 || newItem.payType == 4) newItem.payTypePwd = pwd;
            return newItem;
        });
        this.setState({showCardPwd: false}, () => this.pay(paymentList));
    }

    onPwdCancel() {
        this.setState({showCardPwd: false});
    }

    onPay() {
        this.pay(this.state.paySequence.map((x) => x.value));
    }

    //支付
    pay(paymentList) {
        const {items, paymentInfo, payTypes, paymentTimesCard, paySequence} = this.state;

        //只含有次卡和零元项目并且没有其他非次卡支付
        let itemCardItems = items.filter((item) => item.projectConsumeType == '1');
        let zeroItems = items.filter((item) => item.paidIn == 0);
        let needDefaultPayment =
            itemCardItems.length > 0 &&
            zeroItems > 0 &&
            itemCardItems.length + zeroItems.length == items.length &&
            paymentList.filter((x) => x.payType != 4).length == 0;
        if (needDefaultPayment) {
            paymentList.push({
                payType: 1,
                payTypeId: -1,
                payTypeNo: -1,
                paymentName: '现金支付',
                payAmount: 0,
                payMode: 0,
            });
        }

        if (paymentInfo.wait4PayAmt != 0) {
            showMessage('单据未支付完成，待付￥' + paymentInfo.wait4PayAmt, true);
            return;
        }

        if (!payTypes.find((x) => x.paidAmt != null && x.paidAmt != undefined) && !paymentTimesCard.length && !needDefaultPayment) {
            showMessage('请选择至少一种支付方式', true);
            return;
        }

        let saveBillingData = this.props.route.params.saveBillingData;
        //如果有密码先输入密码
        if (paymentList.find((x) => (x.payType == 2 || x.payType == 4) && x.hasPassword == 0 && !x.payTypePwd)) {
            this.setState({showCardPwd: true});
            return;
        }

        if (this.savedBilling) {
            //如果保存过直接支付
            this.realPay(this.savedBilling, paymentList);
        } else {
            this.precheckAndSave(saveBillingData, (savedBilling) => {
                this.realPay(savedBilling, paymentList);
            });
        }
    }

    precheckAndSave(saveBillingData, cb) {
        this.setState({isLoading: true});
        let billingInfo = JSON.parse(saveBillingData.billing);
        //检查水单号
        fetchCheckFlowNumber({
            flowNumber: billingInfo.flowNumber,
            billingNo: billingInfo.billingNo,
            storeId: billingInfo.storeId,
            companyId: billingInfo.companyId,
        })
            .then((backData) => {
                let checkStat = backData.data.checkStatus;
                if (checkStat != '0') throw {type: 'checkFlowNumber', msg: '水单号已存在'};
                //保存订单
                return fetchSaveBilling(saveBillingData);
            })
            .then((backData) => {
                let billingData = backData.data;
                this.savedBilling = billingData; //已保存订单信息
                cb && cb(billingData);
            })
            .catch((err) => {
                showMessage(err.msg || err.exceptions || '支付异常', true);
            })
            .finally(() => {
                this.setState({isLoading: false});
            });
    }

    realPay(savedBillingData, paymentList) {
        //this.setState({ isLoading: true });
        fetchStockBilling({billingNo: savedBillingData.billing.billingNo})
            .then((backData) => {
                if (backData.data && backData.data.retCode == 0) {
                    showMessage('请求频率过快', true);
                    return;
                }
                let {billing, consumeDetails} = savedBillingData;
                let thirdPartyPay = paymentList.find((x) => x.payTypeId == 18 || x.payTypeId == 19);
                if (!thirdPartyPay) {
                    //非第三方支付
                    this.setState({isLoading: true});
                    payBillingV4({
                        billingInfo: JSON.stringify(billing),
                        billingNo: billing.billingNo,
                        itemList: JSON.stringify(consumeDetails.filter((x) => x.service != 2)), //排除消耗
                        paymentList: JSON.stringify(paymentList),
                        realPay: 'true',
                        sendMsg: '0',
                    })
                        .then((backData) => {
                            try {
                                this.checkResult(backData);
                                this.setState({isPaySuccess: true});
                            } catch (e) {
                                showMessage(e.msg, true);
                            }
                        })
                        .catch((err) => {
                            console.error("支付失败", err)
                            showMessage('支付失败', true);
                        })
                        .finally(() => {
                            this.setState({isLoading: false});
                        });
                } else {
                    //第三方支付
                    let payItem = paymentList.find((x) => x.payTypeId == 18 || x.payTypeId == 19);
                    if (!payItem) return;
                    let payTypeCode = payItem.payTypeId == 18 ? 'ali' : 'wx';

                    this.setState({isLoading: true});
                    fetchPayBilling({
                        tp: 'sm',
                        mtp: payTypeCode,
                        type: '3', //参考接口说明
                        pls: JSON.stringify(paymentList),
                        billingNo: billing.billingNo,
                        companyId: billing.companyId,
                    })
                        .then((backData) => {
                            let data = backData.data;
                            this.setState({
                                qrCode: {
                                    ...this.state.qrCode,
                                    show: true,
                                    qrUrl: data.codeUrl,
                                    tradeNo: data.tradeNo,
                                    totalPrice: payItem.payAmount,
                                    payType: payTypeCode,
                                    flowNumber: billing.flowNumber,
                                },
                                isLoading: false,
                            });
                        })
                        .catch((err) => {
                            console.error("支付失败", err)
                            showMessage('支付失败', true);
                        })
                        .finally(() => {
                            this.setState({isLoading: false});
                        });
                }
            })
            .catch((err) => {
                let backData = err.data;
                if (backData && backData.payResultCode == '6') {
                    let stockData = JSON.parse(backData.payMsg);
                    this.setState({
                        errorStockList: stockData || [],
                    });
                } else if (backData && backData.payResultCode == '5') {
                    showMessage(backData.payMsg, true);
                } else {
                    showMessage('库存检查异常', true);
                }
            })
            .finally(() => {
                //this.setState({ isLoading: false });
            });
    }

    confirmPaySuccess() {
        let {resetToCashier} = this.props.route.params
        AppNavigate.goBack()
        resetToCashier && resetToCashier()

        // AppNavigate.reset("CashierActivity", {navigationFrom: 'multiPay'});
    }

    //第三方支付取消
    onQRCancel(isSuccess) {
        let {resetToCashier} = this.props.route.params
        AppNavigate.goBack()
        resetToCashier && resetToCashier()

        // AppNavigate.reset("CashierActivity", {navigationFrom: 'multiPay'});
    }

    //卡支付总额
    getTotalCardsPaidAmt(state) {
        let selectedCards = state.cards.filter((x) => state.selectedCardsId.find((id) => id == x.id));

        return selectedCards.reduce((rs, item) => {
            let totalAttach = item.attachMoneyList
                ? item.attachMoneyList.reduce((result, x) => {
                    if ((x.paidAmt === null || x.paidAmt === undefined) && result == null) return null;
                    else return (result += Number(x.paidAmt || 0));
                }, null)
                : null;

            if ((item.paidAmt === null || item.paidAmt === undefined) && rs == null && totalAttach == null) return null;
            else return (rs += Number(item.paidAmt || 0) + totalAttach);
        }, null);
    }

    /**
     *  获取支付信息
     * @param state
     * @param wait4PayAmt 待付金额
     * @returns {{alreadyCouponPrice: (*|number), wait4PayAmt: (string|*), alreadyDiscountPrice: number, alreadyPaidPrice: string}}
     */
    getPaymentInfo(state, payResult) {
        let willPayPrice = payResult.willPayPrice // 应付金额
        let alreadyPaidPrice = payResult.alreadyPaidPrice // 已付金额
        let wait4PayAmt = payResult.alreadyWaitPayPrice // 待付金额
        let alreadyCouponPrice = payResult.alreadyCouponPrice // 抵扣金额
        let alreadyDiscountPrice = payResult.alreadyDiscountPrice // 优惠金额
        let timesProjectsPayEndNum = payResult.timesProjectsPayEndNum // 次卡抵扣项目数量

        // 处理支付方式所扣金额
        let payWayList = clone(state.payTypes)
        let payTypeUsedList = payResult.payTypeUsedList // 最终支使用的支付方式:由后台决定如何抵扣
        payWayList.forEach(payway => {
            payway.paidAmt = payTypeUsedList.filter(item => {
                return item.payType == payway.payType
            }).reduce((paidAmt, item) => {
                let consumeActualMoney = parseFloat(item.consumeActualMoney || 0)
                let discountPrice = parseFloat(item.discountPrice || 0)
                if (item.payType == '5') { // 优惠券支付
                    if (item.payMode == '0' || item.payMode == '2') { // 0现金 1折扣 2抵扣
                        return paidAmt + consumeActualMoney
                    } else {
                        return paidAmt + discountPrice
                    }
                } else if (item.payType == '2') { // 储值卡抵扣


                    return paidAmt + consumeActualMoney
                } else if (item.payType == '6') { // 微信或支付宝
                    if (item.payTypeId == payway.payTypeId) { // 区别微信与支付宝
                        return paidAmt + consumeActualMoney
                    } else {
                        return paidAmt
                    }
                } else {
                    if (item.payTypeId == payway.payTypeId) {
                        return paidAmt + consumeActualMoney
                    } else {
                        return paidAmt
                    }
                }
            }, 0)
        })
        // 最终每个支付方式所扣金额
        state.payTypes = payWayList

        // 重新构建支付顺序
        let payUsedArray = JSON.parse(JSON.stringify(payResult.payTypeUsedList))
        let paySequence = JSON.parse(JSON.stringify(state.paySequence))
        let paidSequence = paySequence.filter(sequence => {
            const payKey = sequence.key
            const payKeyArray = payKey.split("_")

            // 处理每个扣费项
            if (payKeyArray.length == 4) { // 项目赠金
                let delIndex = -2
                const attachWay = payUsedArray.filter((payUsed, index) => {
                    const tmpKey = payUsed.payType + "_" + payUsed.payTypeId + "_-1_" + payUsed.payModeId
                    if (tmpKey == payKey) {
                        delIndex = index
                        return true
                    } else {
                        return false
                    }
                })

                if (attachWay.length > 0) { // 当前赠金已用于支付
                    // 移除已处理的支付方式
                    sequence.value.payAmount = attachWay[0].consumeActualMoney
                    delIndex != -2 && payUsedArray.splice(delIndex, 1)
                    return true
                } else {
                    return false
                }
            } else if (payKeyArray.length == 3) { // 有赠金的储值卡
                let delIndex = -2
                const attachWay = payUsedArray.filter((payUsed, index) => {
                    const tmpKey = payUsed.payType + "_" + payUsed.payTypeId + '_' + payUsed.payMode
                    if (tmpKey == payKey) {
                        delIndex = index
                        return true
                    } else {
                        return false
                    }
                })

                if (attachWay.length > 0) { // 当前赠金已用于支付
                    sequence.value.payAmount = attachWay[0].consumeActualMoney
                    delIndex != -2 && payUsedArray.splice(delIndex, 1)
                    return true
                } else {
                    return false
                }
            } else if (payKeyArray.length == 2) { // 其它
                let delIndex = -2
                const attachWay = payUsedArray.filter((payUsed, index) => {
                    const tmpKey = payUsed.payType + "_" + payUsed.payTypeId
                    if (tmpKey == payKey) {
                        delIndex = index
                        return true
                    } else {
                        return false
                    }
                })

                if (attachWay.length > 0) {
                    if (attachWay[0].payType != '4' && attachWay[0].payType != '5') { // 非次卡按照实际进行扣减，次卡项目按照实际进行扣减
                        sequence.value.payAmount = attachWay[0].consumeActualMoney
                    }
                    delIndex != -2 && payUsedArray.splice(delIndex, 1)
                    return true
                } else {
                    return false
                }
            }
        })
        state.paySequence = paidSequence

        // 处理会员卡实际扣费金额
        let cards = JSON.parse(JSON.stringify(state.cards))
        const usedOtherPay = paidSequence.filter(item => {
            let payType = item.value.payType
            return (payType != '5' && payType != '4')
        }).length > 0
        if (!usedOtherPay) { // 仅优惠券支付及次卡支付
            // 如果抵扣券已完成扣费，则会员卡还原扣费金额
            cards.forEach(card => {
                card.paidAmt = null
                if (card.attachMoneyList) {
                    card.attachMoneyList.forEach(attch => {
                        attch.paidAmt = null
                    })
                }
            })
        } else { // 使用了卡、现金、支付宝等支付方式
            // 处理最终会员卡的抵扣金额:会员卡实际扣费由后台决定，因为券抵扣金额未知，故会员卡是浮动金额
            paidSequence.filter(item => {
                let payType = item.value.payType
                return (payType == '2')
            }).forEach(item => {
                let cardId = item.value.payTypeId
                let payAmount = item.value.payAmount
                let attachId = item.value.payModeId || ''
                cards.forEach(card => {
                    if (card.id == cardId) { // 处理当前会员卡的值
                        if (attachId && attachId.length > 0) { // 当前为赠金扣费
                            card.attachMoneyList.forEach(attachMoney => {
                                if (attachMoney.id == attachId) {
                                    attachMoney.paidAmt = payAmount
                                }
                            })
                        } else { // 当前为本金扣费
                            card.paidAmt = payAmount
                        }
                    }
                })
            })
        }
        state.cards = cards
        state.usedOtherPay = usedOtherPay ? 'used' : 'unused'

        // 返回汇总项
        return {
            willPayPrice,
            alreadyPaidPrice,
            wait4PayAmt,
            alreadyCouponPrice,
            alreadyDiscountPrice,
            timesProjectsPayEndNum
        };
    }
}

//mapping props
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        cashierScreenReloadOrder: () => {
            dispatch({type: CASHIERBILLING_RELOAD_ORDER});
        },
    };
};

export const MultiPayActivity = connect(mapStateToProps, mapDispatchToProps)(MultiPay);
