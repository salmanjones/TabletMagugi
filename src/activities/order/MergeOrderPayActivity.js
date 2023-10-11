import React from 'react';
import {connect} from 'react-redux';
import {Animated, FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {pendingOrderPayStyle} from '../../styles';
import {
    fetchPayBilling,
    fetchPrePayBilling,
    getAvailablePaymentInfo,
    mergeBindBilling4App,
    mergePayInit,
    payBillingV4,
    preCheckStock,
} from '../../services';
import {OtherPayFor, PayArea, QRCodePaymentCashier, QRCodePaymentNew, StockTips, VipPayFor} from '../../components';
import {PaymentResultStatus, showMessage} from '../../utils';
import Swipeout from 'react-native-swipeout';
import Spinner from "react-native-loading-spinner-overlay";

const height = 0;
class MergeOrderPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false, //转圈圈
            billings: [], //订单数据
            mainBilling: null, //主单
            //payTypes: {},
            coupons: [], //优惠券
            showPayDetails: false,
            selectedCoupons: [], //已选择的优惠券
            othersPaymentList: [], //外联支付
            selectedPayType: null, //当前选中支付方式
            selectedChannel: null, //当前选中的支付渠道
            selectedPayTypeId: null,
            member: null, //主单会员信息
            hasTimeCardProject: null, //是否含有次卡项目
            wait4PayAmt: null, //待付金额
            couponDiscountPrice: 0,
            qrCode: {
                show: false,
                qrUrl: '',
                totalPrice: null,
                tradeNo: null,
                payType: null,
                flowNumber: null,
            }, //支付码
            showAppPay: false,
            showMiniAppPay: false,
            errorStockList: [], //库存不足列表
            sliderHeight: new Animated.Value(height),
            animatIconName: 'chevron-down',
            heightState: 0,
            displayStyle: 'none',
            companySetting:{isUseCash:true},
            showPaySuccess:false
        };
    }

    UNSAFE_componentWillMount() {
        this.loadData(this.props.route.params.billingIds);
    }

    render() {
        const {
            billings,
            mainBilling,
            coupons,
            showPayDetails,
            selectedCoupons,
            othersPaymentList,
            wait4PayAmt,
            isLoading,
            qrCode,
            showAppPay,
            showMiniAppPay,
            errorStockList,
            hasTimeCardProject,
            member,
            selectedChannel,
            selectedPayType,
            couponDiscountPrice,
            selectedPayTypeId,
            companySetting,
            showPaySuccess
        } = this.state;

        return (
            <View style={pendingOrderPayStyle.timeCradPayWrapper}>
                <Spinner
                    visible={isLoading}
                    textContent={isLoading ? '请求中' : ''}
                    textStyle={{
                        color: '#FFF'
                    }}
                />
                <View style={pendingOrderPayStyle.title}>
                    <View style={pendingOrderPayStyle.titleL}>
                        <View style={pendingOrderPayStyle.titleItemO}>
                            <Text style={pendingOrderPayStyle.titleText}>主单</Text>
                        </View>
                        <View style={pendingOrderPayStyle.titleType}>
                            <Text style={pendingOrderPayStyle.titleText}>项目/外卖</Text>
                        </View>
                        <View style={pendingOrderPayStyle.titleItem}>
                            <Text style={pendingOrderPayStyle.titleText}>原价</Text>
                        </View>
                        <View style={pendingOrderPayStyle.titleItem}>
                            <Text style={pendingOrderPayStyle.titleText}>数量</Text>
                        </View>
                        <View style={pendingOrderPayStyle.titleItem}>
                            <Text style={pendingOrderPayStyle.titleText}>优惠</Text>
                        </View>
                        <View style={pendingOrderPayStyle.titleItem}>
                            <Text style={pendingOrderPayStyle.titleText}>实收／扣次</Text>
                        </View>
                    </View>
                    <View style={pendingOrderPayStyle.titleR}>
                        <Text style={pendingOrderPayStyle.titleText}>支付信息</Text>
                    </View>
                </View>
                <View style={pendingOrderPayStyle.billInfoBox}>
                    <View style={pendingOrderPayStyle.timePayL}>
                        <FlatList
                            data={billings}
                            initialNumToRender={billings.length}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => {
                                let isMainBilling = item == mainBilling;
                                let isMember = item.memberType === '0';
                                let actualPay = item.consumeList
                                    .reduce(
                                        (result, consume) =>
                                            result + (consume.projectConsumeType == 1 ? 0 : consume.paidIn - (consume.discountPrice || 0)),
                                        0
                                    )
                                    .toFixed(2);
                                return (
                                    <View>
                                        <Swipeout
                                            autoClose={true}
                                            style={
                                                isMainBilling
                                                    ? pendingOrderPayStyle.timePayLiSwiperOutActive
                                                    : pendingOrderPayStyle.timePayLiSwiperOut
                                            }
                                            right={[
                                                {
                                                    text: '移出结算',
                                                    backgroundColor: 'red',
                                                    underlayColor: '#ff4444',
                                                    onPress: () => {
                                                        this.removeBilling(item);
                                                    },
                                                },
                                            ]}
                                        >
                                            <TouchableOpacity
                                                style={pendingOrderPayStyle.timePayLiFirst}
                                                onPress={() => this.selectMainBilling(item)}
                                            >
                                                <View style={pendingOrderPayStyle.timePayItemO}>
                                                    <Image
                                                        resizeMethod="resize"
                                                        source={
                                                            isMainBilling
                                                                ? require('@imgPath/pending-radio-active.png')
                                                                : require('@imgPath/pending-radio.png')
                                                        }
                                                        style={pendingOrderPayStyle.imgStyle}
                                                        resizeMode={'contain'}
                                                    />
                                                </View>
                                                <View style={pendingOrderPayStyle.timePayLiInfo}>
                                                    <Text style={pendingOrderPayStyle.FF7149Text}>NO.{item.flowNumber}</Text>
                                                    <Text style={[pendingOrderPayStyle.C333Text, { width: '40%' }]} numberOfLines={1}>
                                                        {item.name}
                                                    </Text>
                                                    <Text style={pendingOrderPayStyle.C333Text}>
                                                        {isMember ? item.phone : item.phone === '19800002015' ? '' : item.phone}
                                                    </Text>
                                                </View>
                                                <View style={pendingOrderPayStyle.timePayItem}>
                                                    <Text style={pendingOrderPayStyle.timePayTextRed}>￥{actualPay}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </Swipeout>
                                        {item.consumeList.map((consume) => {
                                            let isTimeCardProject = consume.projectConsumeType == 1;
                                            return (
                                                <View
                                                    key={consume.id}
                                                    style={isMainBilling ? pendingOrderPayStyle.timePayLiActive : pendingOrderPayStyle.timePayLi}
                                                >
                                                    <View style={pendingOrderPayStyle.timePayItem}></View>
                                                    <View style={pendingOrderPayStyle.timePayType}>
                                                        <Text style={pendingOrderPayStyle.timePayText} numberOfLines={2}>
                                                            {consume.itemName}
                                                        </Text>
                                                    </View>
                                                    <View style={pendingOrderPayStyle.timePayItem}>
                                                        <Text style={pendingOrderPayStyle.timePayText}>￥{consume.costPrice}</Text>
                                                    </View>
                                                    <View style={pendingOrderPayStyle.timePayItem}>
                                                        <Text style={pendingOrderPayStyle.timePayText}>{consume.amount}</Text>
                                                    </View>
                                                    <View style={pendingOrderPayStyle.timePayItem}>
                                                        <Text style={pendingOrderPayStyle.timePayText}>{consume.discountPrice}</Text>
                                                    </View>
                                                    <View style={pendingOrderPayStyle.timePayItem}>
                                                        <Text style={pendingOrderPayStyle.timePayText}>
                                                            {isTimeCardProject
                                                                ? consume.consumeTimeAmount
                                                                : (consume.paidIn - (consume.discountPrice || 0)).toFixed(2)}
                                                        </Text>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                    </View>
                                );
                            }}
                        />
                    </View>
                    <View style={pendingOrderPayStyle.timePayR}>
                        <PayArea
                            hasCardProject={hasTimeCardProject}
                            coupons={coupons}
                            selectedCoupons={selectedCoupons}
                            selectedChannel={selectedChannel}
                            selectedPayType={selectedPayType}
                            selectedPayTypeId={selectedPayTypeId}
                            showPayDetails={showPayDetails}
                            othersPaymentList={othersPaymentList}
                            member={member}
                            onChannalChoosed={this.onChannalChoosed.bind(this)}
                            onCouponChoosed={this.onCouponChoosed.bind(this)}
                            onPayTypeChoosed={this.onPayTypeChoosed.bind(this)}
                            couponDiscountPrice={couponDiscountPrice}
                            companySetting={companySetting}
                            //billings={billings}
                            //mainBilling={mainBilling}
                        />
                    </View>
                </View>
                <View style={pendingOrderPayStyle.timePayBtnBoxB}>
                    <View style={pendingOrderPayStyle.timePayBtnBoxL}>
                        <View style={pendingOrderPayStyle.timePayItemO}>
                            <Text style={pendingOrderPayStyle.btmFontColorO}>共{billings.length || 0}单</Text>
                        </View>
                        <Text style={pendingOrderPayStyle.btmFontColor}>应付：¥{wait4PayAmt}</Text>
                    </View>
                    <View style={pendingOrderPayStyle.timePayBtnBox}>
                        <TouchableOpacity
                            style={pendingOrderPayStyle.canelBtn}
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                        >
                            <Text style={pendingOrderPayStyle.timePayBtnBoxText}>取消支付</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={pendingOrderPayStyle.confirmBtn} onPress={() => this.gotoPay()}>
                            <Text style={pendingOrderPayStyle.timePayBtnBoxText}>去支付</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {qrCode.show && (
                    <QRCodePaymentCashier
                        //visible={qrCode.show}
                        qrUrl={qrCode.qrUrl}
                        totalPrice={qrCode.totalPrice}
                        tradeNo={qrCode.tradeNo}
                        payType={qrCode.payType}
                        flowNumber={qrCode.flowNumber}
                        onClosePay={(isSuccess) => this.onQRCancel(isSuccess)}
                    />
                )}

                {showAppPay && (
                    <VipPayFor
                        flowNumber={mainBilling.flowNumber}
                        billingNo={mainBilling.billingNo}
                        storeId={mainBilling.storeId}
                        companyId={mainBilling.companyId}
                        onClose={() => {
                            this.onAppPayCancel();
                        }}
                    />
                )}

                {showMiniAppPay && (
                    <OtherPayFor
                        flowNumber={mainBilling.flowNumber}
                        onClose={() => {
                            this.onAppPayCancel();
                        }}
                        billingNo={mainBilling.billingNo}
                        storeId={mainBilling.storeId}
                        companyId={mainBilling.companyId}
                    />
                )}

                {errorStockList.length > 0 && (
                    <StockTips
                        stockData={errorStockList}
                        onClose={() => {
                            this.setState({ errorStockList: [] });
                        }}
                    />
                )}

                { showPaySuccess &&
                    <QRCodePaymentNew
                        paymentStatus={PaymentResultStatus.success}
                        title={'订单支付'}
                        navigation={this.props.navigation}
                        flowNum={mainBilling.flowNumber}
                        billingNo={mainBilling.billingNo}
                        onClose={this.confirmPaySuccess.bind(this)}
                  />
                }
            </View>
        );
    }

    loadData = (billingIds) => {
        this.setState({ isLoading: true });
        //请求订单数据
        mergePayInit({ billings: billingIds }).then((data) => {
            let mainBilling = data.billings[0] || null;
            let billings = data.billings || [];
            this.state.companySetting.isUseCash=data.isUseCash;
            this.reset(billings, mainBilling);
        });
    };

    selectMainBilling = (billing) => {
        this.reset([...this.state.billings], billing);
    };

    removeBilling = (billing) => {
        if (this.state.billings.length <= 2) {
            showMessage('请保留至少两个单据');
            return;
        }

        let billings = this.state.billings.filter((x) => x != billing);
        let mainBilling = this.state.mainBilling == billing ? billings[0] : this.state.mainBilling;

        this.reset(billings, mainBilling);
    };

    reset(billings, mainBilling) {
        this.setState(
            {
                billings: billings,
                mainBilling: mainBilling,
                wait4PayAmt: 0,
                selectedPayType: null,
                selectedChannel: null,
                selectedCoupons: [],
                isLoading: true,
                selectedPayTypeId: null,
                showPayDetails: false,
                couponDiscountPrice:0
            },
            () => {
                let allItems = billings.reduce((result, billing) => {
                    return result.concat(billing.consumeList || []);
                }, []);
                let member =
                    mainBilling && (mainBilling.phone || mainBilling.memberNo)
                        ? { phone: mainBilling.phone, memberCardNo: mainBilling.memberNo, memberType: mainBilling.memberType }
                        : null;

                let hasTimeCardProject = billings.find((billing) => {
                    return billing.consumeList && billing.consumeList.find((item) => item.projectConsumeType == '1');
                });

                const params = {
                    companyId: mainBilling.companyId,
                    storeId: mainBilling.storeId,
                    billingNo: [mainBilling, ...billings].map(item=>item.billingNo).join(","),
                    phone: '',
                    consumeItems: JSON.stringify(allItems)
                }
                if (member && member.phone) {
                    params.phone = member.phone
                }

                let totalPrice = allItems
                    .reduce((result, consume) => result + (consume.projectConsumeType == 1 ? 0 : consume.paidIn - (consume.discountPrice || 0)), 0)
                    .toFixed(2);

                let channels = this.getAvailableChannels(member, hasTimeCardProject);
                let first = Object.keys(channels)
                    .map((key) => ({ key: key, value: channels[key] }))
                    .find((x) => x.value);
                let defaultChannel = first ? first.key : null;
                //let defaultPayType=defaultChannel=='tablet'?'wx':null;
                //请求可用支付信息
                getAvailablePaymentInfo(params)
                    .then((o) => {
                        if (o.data) {
                            this.setState({
                                coupons: o.data.coupons || [],
                                othersPaymentList: o.data.othersPaymentList || [],
                                member: member,
                                hasTimeCardProject: hasTimeCardProject,
                                isLoading: false,
                                wait4PayAmt: totalPrice,
                                //selectedPayType: defaultPayType,
                                selectedChannel: defaultChannel,
                            });
                        }
                    })
                    .catch((err) => {
                        console.error("获取支付信息异常", err)
                        showMessage('获取支付信息异常');
                    });
            }
        );
    }

    getAvailableChannels(member, hasCardProject) {
        let isMember = member && member.memberType == '0';
        let channels = { tablet: true, miniApp: true, app: true };

        if (hasCardProject) {
            channels.tablet = false;
            channels.miniApp = false;
        }

        if (isMember) {
            channels.miniApp = false;
        } else {
            channels.app = false;
        }

        return channels;
    }

    //选择支付通道
    onChannalChoosed(channel) {
        this.setState({
            selectedChannel: channel,
        });
    }
    //选择支付方式
    onPayTypeChoosed(payType, payTypeId) {
        let otherPayment = this.state.othersPaymentList.find((x) => x.id == payTypeId);
        this.setState(
            {
                selectedPayType: payType,
                selectedPayTypeId: otherPayment ? otherPayment.id : null,
                selectedPayTypeName: otherPayment ? otherPayment.name : null,
                //coupons: [...this.state.coupons],
                othersPaymentList: [...this.state.othersPaymentList],
                //wait4PayAmt: wait4PayAmt,
            },
            () => {
                this.calculateBilling((data) => {
                    this.setState({ wait4PayAmt: data.data.alreadyWaitPayPrice });
                });
            }
        );
    }
    onCouponChoosed(coupon) {
        let selectedCoupons = this.state.selectedCoupons;
        let index = selectedCoupons.indexOf(coupon);
        if (index != -1) selectedCoupons.splice(index, 1);
        else selectedCoupons.push(coupon);

        this.calculateBilling((data) => {
            if (data.data.payResultCode === '1' && !data.data.payTypeErrorList) {
                let totalCouponPrice = 0;
                (data.data.payTypeUsedList || []).forEach(x=> {
                        if (x.payType == 5) { // 优惠券
                            if (x.payMode == "1") { // 折扣
                                totalCouponPrice = totalCouponPrice + x.discountPrice
                            } else { // 抵扣
                                totalCouponPrice = totalCouponPrice + x.consumeActualMoney, 0
                            }
                        }
                    }
                );


                // 处理优惠券多选的情况
                const checkedCoupons = []
                const payTypeUsedList = data.data.payTypeUsedList || []
                payTypeUsedList.forEach(itemPay=>{
                    if(itemPay.couponInfo && itemPay.payType == '5'){ // 优惠券支付
                        const selCoupon = itemPay.couponInfo
                        checkedCoupons.push(selCoupon.couponNo)
                    }
                })
                selectedCoupons = selectedCoupons.filter(item=>{
                    return checkedCoupons.indexOf(item.couponNo) != -1
                })

                this.setState({
                    selectedCoupons,
                    couponDiscountPrice: totalCouponPrice,
                    wait4PayAmt: data.data.alreadyWaitPayPrice,
                });
            } else {
                if (selectedCoupons.indexOf(coupon) != -1) selectedCoupons.splice(index, 1);
                else selectedCoupons.push(coupon);
                showMessage('优惠券不支持消费项目，或抵扣金额已达到最大值');
            }

            this.setState({
                coupons: [...this.state.coupons],
            });
        });
    }

    gotoPay() {
        const { selectedPayType, selectedChannel, wait4PayAmt, selectedCoupons } = this.state;

        if (!selectedPayType && !selectedChannel) {
            showMessage('请选择一种支付方式');
            return;
        }

        if (selectedChannel == 'app' || selectedChannel == 'miniApp') {
            this.setState({ loading: true });
            this.bindBilling4App(() => {
                this.setState({
                    loading: false,
                    showAppPay: selectedChannel == 'app',
                    showMiniAppPay: selectedChannel == 'miniApp',
                });
            });
        } else {
            this.setState({ showPayDetails: true });
            let payType = selectedPayType;

            if (!payType) return;

            //优惠券大于等于应付
            let payTypeParams = this.buildPayTypeParams(wait4PayAmt);

            let hasCoupons=payTypeParams.filter((x) =>x.payType==5).length>0;
            if(hasCoupons){
                payTypeParams = payTypeParams.filter((x) => Number(x.payAmount) > 0);
                if (payTypeParams.length == payTypeParams.filter((x) => x.payType == 5).length) {
                    payType = 'noPay';
                }
            }

            if (payType == 'ali' || payType == 'wx') {
                this.thirdPartyPay(payTypeParams, selectedPayType);
            } else if (payType == 'cash' || payType == 'bank' || payType == 'other' || payType == 'noPay') {
                //现金 银行卡 外联 支付
                this.normalPay(payTypeParams);
            }
        }
    }

    normalPay(payTypeParams) {
        const { billings, mainBilling, wait4PayAmt } = this.state;
        //检查库存;
        this.setState({ isLoading: true });
        let billingNos = billings.map((billing) => billing.billingNo).join();
        preCheckStock({ billingNos: billingNos })
            .then(() => {
                //支付
                payBillingV4({
                    billingInfo: JSON.stringify(mainBilling),
                    billingNo: mainBilling.billingNo,
                    itemList: JSON.stringify(this.buildConsumeItemParams()),
                    paymentList: JSON.stringify(payTypeParams),
                    attachBillNos: this.getAttachBillingNos(),
                    realPay: 'true',
                    sendMsg: '0',
                }).then((backData) => {
                    let resultCode = backData.data.payResultCode;
                    if (resultCode === '1') {
                        //showMessage('支付成功');
                        this.setState({ isLoading: false,showPaySuccess:true });
                        //this.props.navigation.goBack();
                    } else {
                        showMessage('支付异常');
                    }
                });
            })
            .catch((err) => {
                this.setState({
                    isLoading: false,
                });
                let backData = err.data;
                if (backData && backData.retCode == '8') {
                    let stockData = JSON.parse(backData.retMsg);
                    this.setState({
                        errorStockList: stockData || [],
                    });
                } else {
                    showMessage('支付异常');
                }
            });
    }

    bindBilling4App(cb) {
        const { billings, mainBilling } = this.state;

        let attachBillNos = billings
            .filter((billing) => billing != mainBilling)
            .map((billing) => billing.billingNo)
            .join();

        //app订单绑定
        mergeBindBilling4App({
            storeId: mainBilling.storeId,
            billingNo: mainBilling.billingNo,
            attachBillingNo: attachBillNos,
        })
            .then((backData) => {
                cb();
            })
            .catch(() => {});
    }

    thirdPartyPay(payTypeParams, selectedPayType) {
        const { billings, mainBilling, wait4PayAmt } = this.state;
        //检查库存;
        this.setState({ isLoading: true });
        let billingNos = billings.map((billing) => billing.billingNo).join();
        preCheckStock({ billingNos: billingNos })
            .then(() => {
                let attachBillNos = billings
                    .filter((billing) => billing != mainBilling)
                    .map((billing) => billing.billingNo)
                    .join();
                //支付生成二维码
                fetchPayBilling({
                    tp: 'sm',
                    mtp: selectedPayType,
                    type: '3', //参考接口说明
                    pls: JSON.stringify(payTypeParams),
                    billingNo: mainBilling.billingNo,
                    companyId: mainBilling.companyId,
                    attachBillNos: attachBillNos,
                }).then((backData) => {
                    let data = backData.data;
                    this.setState({
                        qrCode: {
                            ...this.state.qrCode,
                            show: true,
                            qrUrl: data.codeUrl,
                            tradeNo: data.tradeNo,
                            totalPrice: wait4PayAmt,
                            payType: selectedPayType,
                            flowNumber: mainBilling.flowNumber,
                        },
                        isLoading: false,
                    });
                });
            })
            .catch((err) => {
                let backData = err.data;
                if (backData && backData.retCode == '8') {
                    let stockData = JSON.parse(backData.retMsg);
                    this.setState({
                        errorStockList: stockData || [],
                    });
                } else {
                    showMessage('库存异常 ' + backData.retMsg || '');
                }
                this.setState({
                    isLoading: false,
                });
            });
    }
    getPayTypeParam(payType, amt) {
        let payTypeMap = {
            wx: [{ payType: 6, payTypeId: 19, payTypeNo: 19, paymentName: '微信', payAmount: amt, payMode: 0 }],
            ali: [{ payType: 6, payTypeId: 18, payTypeNo: 18, paymentName: '支付宝', payAmount: amt, payMode: 0 }],
        };
        return payTypeMap[payType] || [];
    }
    onQRCancel = (isSuccess) => {
        this.setState(
            {
                qrCode: {
                    ...this.state.qrCode,
                    show: false,
                    qrUrl: '',
                    tradeNo: null,
                    totalPrice: null,
                    payType: null,
                    flowNumber: null,
                },
            },
            () => {
                if (isSuccess === 0) {
                    this.props.navigation.goBack();
                }
            }
        );
    };

    onAppPayCancel = () => {
        this.setState(
            {
                showMiniAppPay: false,
                showAppPay: false,
            },
            () => {
                this.props.navigation.goBack();
            }
        );
    };

    confirmPaySuccess(){
        this.props.navigation.goBack();
    }


    //计算应付
    calculateBilling = (cb) => {
        let payTypes = this.buildPayTypeParams(0);
        let itemlist = this.buildConsumeItemParams();

        let attachBillNos = this.getAttachBillingNos();
        this.state.billings
            .filter((billing) => billing != this.state.mainBilling)
            .map((billing) => billing.billingNo)
            .join();
        let param = {
            itemList: JSON.stringify(itemlist),
            paymentList: JSON.stringify(payTypes),
            //realPay: false,
            billingInfo: JSON.stringify(this.state.mainBilling),
            attachBillNos: attachBillNos,
            sendMsg: '0',
        };
        this.setState({ isLoading: true });
        fetchPrePayBilling(param)
            .then((data) => {
                cb(data);
                this.setState({ isLoading: false });
            })
            .catch((err) => {
                showMessage(err);
            });
    };

    getAttachBillingNos = () => {
        return this.state.billings
            .filter((billing) => billing != this.state.mainBilling)
            .map((billing) => billing.billingNo)
            .join();
    };

    buildConsumeItemParams = () => {
        return this.state.billings
            .reduce((result, billing) => {
                return result.concat(billing.consumeList || []);
            }, [])
            .map((consume) => {
                return {
                    id: consume.id,
                    billingNo: consume.billingNo,
                    amount: consume.amount,
                    consumeTimeAmount: consume.consumeTimeAmount,
                    costPrice: consume.costPrice,
                    discountPrice: consume.discountPrice,
                    expendPrice: consume.expendPrice,
                    extraPrice: consume.extraPrice,
                    fixedPrice: consume.fixedPrice,
                    isGift: consume.isGift,
                    itemId: consume.itemId,
                    itemName: consume.itemName,
                    itemNo: consume.itemNo,
                    itemTypeId: consume.itemTypeId,
                    paidIn: consume.paidIn,
                    paidPrice: consume.paidPrice,
                    paidStatus: consume.paidStatus,
                    paidMoney: consume.paidMoney ? consume.paidMoney : 0,
                    priceType: consume.priceType,
                    projectConsumeType: consume.projectConsumeType,
                    rebate: consume.rebate,
                    rework: consume.rework,
                    service: consume.service,
                    status: consume.status,
                    totalPrice: consume.totalPrice,
                    type: consume.type,
                    upPrice: consume.upPrice,
                    companyId: this.state.mainBilling.companyId,
                    storeId: this.state.mainBilling.storeId,
                };
            });
    };

    buildPayTypeParams = (payAmt) => {
        let payTypes = [];
        let { selectedPayTypeId, selectedPayType, selectedPayTypeName, selectedCoupons } = this.state;

        if (selectedCoupons && selectedCoupons.length) {
            let couponItems = selectedCoupons.map((x) => {
                return { payType: 5, payTypeId: x.id, payTypeNo: x.couponNo, payAmount: x.couponPrice, payMode: 0, paymentName: x.name };
            });
            payTypes = payTypes.concat(couponItems);
        }

        if (selectedPayType) {
            switch (selectedPayType) {
                case 'wx':
                    payTypes.push({ payType: 6, payTypeId: 19, payTypeNo: 19, paymentName: '微信', payAmount: payAmt, payMode: 0 });
                    break;
                case 'ali':
                    payTypes.push({ payType: 6, payTypeId: 18, payTypeNo: 18, paymentName: '支付宝', payAmount: payAmt, payMode: 0 });
                    break;
                case 'bank':
                    payTypes.push({ payType: 3, payTypeId: 5, payTypeNo: 5, payAmount: payAmt, paymentName: '银行卡', payMode: 0 }); //payTypeId 5?
                    break;
                case 'cash':
                    payTypes.push({ payType: 1, payTypeId: -1, payTypeNo: -1, paymentName: '现金', payAmount: payAmt, payMode: 0 });
                    break;
                case 'other':
                    selectedPayTypeId &&
                        payTypes.push({
                            payType: 3,
                            payTypeId: selectedPayTypeId,
                            payTypeNo: selectedPayTypeId,
                            payAmount: payAmt,
                            payMode: 0,
                            paymentName: selectedPayTypeName,
                        });
                    break;
            }
        }
        //payTypes = payTypes.filter((x) => Number(x.payAmount) > 0);
        return payTypes;
    };
}

//mapping props
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch, props) => {
    return {};
};

export const MergeOrderPayActivity = connect(mapStateToProps, mapDispatchToProps)(MergeOrderPay);
