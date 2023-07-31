//libs
import React from 'react';
import {Icon} from 'react-native-elements';
import {
    FlatList,
    Image,
    ImageBackground,
    ScrollView,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';

//self
import {cashierPayStyle} from '../../styles';
import {fetchPrePayBilling, getAvailablePaymentInfo} from '../../services';
import {showMessage} from '../../utils';
import Spinner from "react-native-loading-spinner-overlay";

export class CashierPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payWay: props.totalCardPrjs < 1 ? 'wx' : 'card',
            loading: false,
            channel: null,
            showPayDetails: false, //展示平板支付
            showCoupons: false,
            coupons: [], //优惠券
            selectedCoupons: [], //已选择的优惠券
            othersPaymentList: [], //外联支付
            selectedOtherPayment: null,
            selectedPayType: null,
            wait4PayAmt: null, //待付金额
            payTypes: [],
            couponDiscountPrice: 0
        };
    }

    componentDidMount() {
        this.initialData();
    }

    initialData() {
        //that.setState({ isLoading:true });
        const params = {
            companyId: this.props.billingInfo.companyId,
            storeId: this.props.billingInfo.storeId,
            billingNo: this.props.billingInfo.billingNo,
            phone: '',
            consumeItems: JSON.stringify(this.props.consumeItems)
        }
        if(this.props.member && this.props.member.phone){
            params.phone = this.props.member.phone
        }

        let totalPrice = this.props.consumeItems.reduce((result, x) => {
            return result + (Number(x.totalPrice) || 0);
        }, 0);

        this.setState({loading: true});
        getAvailablePaymentInfo(params)
            .then((o) => {
                if (o.data) {
                    let channels = this.getAvailableChannels();
                    let first = Object.keys(channels).map(key => ({
                        key: key,
                        value: channels[key]
                    })).find(x => x.value).key;

                    this.setState({
                        channel: first,
                        coupons: o.data.coupons || [],
                        othersPaymentList: o.data.othersPaymentList || [],
                        wait4PayAmt: totalPrice
                    });
                }
            })
            .catch((err) => {
                console.error('获取支付信息异常', err)
                showMessage('获取支付信息异常', err);
            }).finally(() => {
                this.setState({loading: false});
            });
    }

    //选择支付通道
    onChannalChoosed(channel) {
        //if (channel == 'tablet') {
        this.setState({
            channel: channel,
        });
        //} else {
        //    this.props.onCashierOrderPay(channel, null, null);
        //}
    }

    //选择优惠券
    onToggleSeleted(coupon) {
        let {selectedCoupons} = this.state;
        let index = selectedCoupons.indexOf(coupon);
        if (index != -1) {
            selectedCoupons.splice(index, 1)
        }else{
            selectedCoupons.push(coupon);
        }

        this.calculateBilling((data) => {
            if (!data.data.payTypeErrorList && data.data.payResultCode === '1') {
                let totalCouponPrice = (data.data.payTypeUsedList || []).reduce(
                    (result, x) => result + (x.payType == 5 ? x.consumeActualMoney : 0),
                    0
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
                if (selectedCoupons.indexOf(coupon) != -1) {
                    selectedCoupons.splice(index, 1);
                }else{
                    selectedCoupons.push(coupon);
                }
                showMessage('优惠券不支持消费项目，或抵扣金额已达到最大值');
            }

            this.setState({
                coupons: [...this.state.coupons],
            });
        });
    }

    //选择支付方式
    choosePayWay(payType, otherPayId) {
        this.setState(
            {
                selectedPayType: payType,
                selectedOtherPayment: this.state.othersPaymentList.find((x) => x.id == otherPayId),
                othersPaymentList: [...this.state.othersPaymentList],
            },
            () => {
                this.calculateBilling((data) => {
                    this.setState({
                        wait4PayAmt: data.data.alreadyWaitPayPrice,
                    });
                });
            }
        );
    }

    //计算应付
    calculateBilling = (cb) => {
        let payTypes = this.buildPayTypeParams(0);
        let itemlist = this.props.consumeItems.map((consume) => {
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
                companyId: this.props.billingInfo.companyId,
                storeId: this.props.billingInfo.storeId,
            };
        });
        let param = {
            itemList: JSON.stringify(itemlist),
            paymentList: JSON.stringify(payTypes),
            //realPay: false,
            billingInfo: JSON.stringify(this.props.billingInfo),
            sendMsg: '0',
        };
        this.setState({loading: true});
        fetchPrePayBilling(param)
            .then((data) => {
                cb && cb(data);
                this.setState({loading: false});
            })
            .catch((err) => {
                //showMessage(err);
            });
    };

    buildPayTypeParams = (payAmt) => {
        let payTypes = [];
        let {selectedOtherPayment, selectedPayType, selectedCoupons} = this.state;
        if (selectedPayType) {
            switch (selectedPayType) {
                case 'wx':
                    payTypes.push({
                        payType: 6,
                        payTypeId: 19,
                        payTypeNo: 19,
                        paymentName: '微信',
                        payAmount: payAmt,
                        payMode: 0
                    });
                    break;
                case 'ali':
                    payTypes.push({
                        payType: 6,
                        payTypeId: 18,
                        payTypeNo: 18,
                        paymentName: '支付宝',
                        payAmount: payAmt,
                        payMode: 0
                    });
                    break;
                case 'bank':
                    payTypes.push({
                        payType: 3,
                        payTypeId: 5,
                        payTypeNo: 5,
                        payAmount: payAmt,
                        paymentName: '银行卡',
                        payMode: 0
                    }); //payTypeId 5?
                    break;
                case 'cash':
                    payTypes.push({
                        payType: 1,
                        payTypeId: -1,
                        payTypeNo: -1,
                        paymentName: '现金',
                        payAmount: payAmt,
                        payMode: 0
                    });
                    break;
                case 'other':
                    selectedOtherPayment &&
                    payTypes.push({
                        payType: 3,
                        payTypeId: selectedOtherPayment.id,
                        payTypeNo: selectedOtherPayment.id,
                        payAmount: payAmt,
                        payMode: 0,
                        paymentName: selectedOtherPayment.name,
                    });
                    break;
            }
        }

        if (selectedCoupons && selectedCoupons.length) {
            let couponItems = selectedCoupons.map((x) => {
                return {
                    payType: 5,
                    payTypeId: x.id,
                    payTypeNo: x.couponNo,
                    payAmount: x.couponPrice,
                    payMode: 0,
                    paymentName: x.name
                };
            });
            payTypes = payTypes.concat(couponItems);
        }

        return payTypes;
    };

    gotoPay() {
        let {channel, selectedPayType, selectedCoupons, wait4PayAmt} = this.state; //支付渠道，选中的支付方式
        if (channel == 'tablet') {//快速支付
            if (selectedPayType) {
                let payTypeParams = this.buildPayTypeParams(this.state.wait4PayAmt);
                let payType = selectedPayType;

                let hasCoupons = payTypeParams.filter((x) => x.payType == 5).length > 0;
                if (hasCoupons) {
                    payTypeParams = payTypeParams.filter((x) => Number(x.payAmount) > 0);
                    payType = payTypeParams.length == payTypeParams.filter((x) => x.payType == 5).length ? 'other' : selectedPayType;
                }

                this.props.onCashierOrderPay(channel, payType, payTypeParams);
            } else {
                this.setState({showPayDetails: true});
                this.choosePayWay('wx');
            }
        } else {//小程序支付 会员卡支付
            this.props.onCashierOrderPay(channel, null, null);
        }
    }

    toSaveOrder() {
        this.props.onCashierOrderSave(true);
    }

    toCanel() {
        this.props.toCanel();
    }

    toggleCoupons() {
        if (!this.state.coupons.length && !this.state.showCoupons) return;
        this.setState({
            showCoupons: !this.state.showCoupons
        });
    }

    getAvailableChannels() {
        const {memberType, consumeItems} = this.props;
        let isMember = memberType == '0';
        let hasCardProject = !!consumeItems.find((item) => item.projectConsumeType == '1');

        let channels = {tablet: true, miniApp: true, app: true};

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

    render() {
        const {companySetting} = this.props;
        const {
            channel,
            othersPaymentList,
            coupons,
            selectedCoupons,
            selectedPayType,
            //wait4PayAmt,
            selectedOtherPayment,
            showCoupons,
            showPayDetails,
            loading,
            couponDiscountPrice
        } = this.state;
        const isUseCash = companySetting.isUseCash;
        let wait4PayAmt = this.state.wait4PayAmt;
        wait4PayAmt = wait4PayAmt == '-0.0' ? '0.0' : wait4PayAmt;
        let availableChannels = this.getAvailableChannels();
        const couponDesc = selectedCoupons.length ? `已选择${selectedCoupons.length}张优惠券` : coupons.length ? `可用优惠券${coupons.length}张` : '暂无可用优惠券';
        return (
            <View style={cashierPayStyle.modalBackground}>
                <Spinner
                    visible={loading}
                    textContent={'请求中'}
                    textStyle={{
                        color: '#FFF'
                    }}
                />
                <View style={cashierPayStyle.cashierBillInfoWrapper}>
                    <View style={cashierPayStyle.timeCradPayWrapper}>
                        <View style={cashierPayStyle.title}>
                            <View style={cashierPayStyle.titleL}>
                                <View style={cashierPayStyle.titleType}>
                                    <Text style={cashierPayStyle.titleText}>项目/外卖</Text>
                                </View>
                                <View style={cashierPayStyle.titleItem}>
                                    <Text style={cashierPayStyle.titleText}>原价</Text>
                                </View>
                                <View style={cashierPayStyle.titleItem}>
                                    <Text style={cashierPayStyle.titleText}>数量</Text>
                                </View>
                                <View style={cashierPayStyle.titleItem}>
                                    <Text style={cashierPayStyle.titleText}>优惠</Text>
                                </View>
                                <View style={cashierPayStyle.titleItem}>
                                    <Text style={cashierPayStyle.titleText}>实收／扣次</Text>
                                </View>
                            </View>
                            <View style={cashierPayStyle.titleR}>
                                <Text style={cashierPayStyle.titleText}>支付信息</Text>
                            </View>
                        </View>
                        <View style={cashierPayStyle.billInfoBox}>
                            <View style={cashierPayStyle.timePayL}>
                                <ScrollView>
                                    {this.props.consumeItems.map((item, index) => {
                                        if (item.service != 2) {
                                            return (
                                                <View style={cashierPayStyle.timePayList} key={index}>
                                                    <View style={cashierPayStyle.timePayType}>
                                                        <Text style={cashierPayStyle.timePayText}>{item.itemName}</Text>
                                                    </View>
                                                    <View style={cashierPayStyle.timePayItem}>
                                                        <Text
                                                            style={cashierPayStyle.timePayText}>￥{item.costPrice}</Text>
                                                    </View>
                                                    <View style={cashierPayStyle.timePayItem}>
                                                        <Text style={cashierPayStyle.timePayText}>{item.amount}</Text>
                                                    </View>
                                                    <View style={cashierPayStyle.timePayItem}>
                                                        <Text
                                                            style={cashierPayStyle.timePayText}>{item.discountPrice}</Text>
                                                    </View>
                                                    <View style={cashierPayStyle.timePayItem}>
                                                        <Text style={cashierPayStyle.timePayText}>
                                                            {item.itemType == 'card' ? item.consumeTimeAmount + '次' : item.totalPrice}
                                                        </Text>
                                                    </View>
                                                </View>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </ScrollView>
                            </View>
                            <View style={cashierPayStyle.timePayR}>
                                {/* 支付方式 */}
                                <View style={cashierPayStyle.timePayRBox}>
                                    <View
                                        style={(cashierPayStyle.timePayRBoxWayBox, {display: showPayDetails ? 'none' : 'flex'})}>
                                        <Text style={cashierPayStyle.payTitle}>请选择支付通道：</Text>
                                        {availableChannels.tablet && (
                                            <TouchableOpacity
                                                style={channel == 'tablet' ? cashierPayStyle.timePayRotherActive : cashierPayStyle.timePayRother}
                                                onPress={this.onChannalChoosed.bind(this, 'tablet')}>
                                                <Image source={require('@imgPath/pay-quickly.png')}
                                                       style={cashierPayStyle.timePayImgPb} resizeMode={'contain'}/>
                                                <Text style={cashierPayStyle.titleText}>快速支付</Text>
                                            </TouchableOpacity>
                                        )}
                                        {/*组合支付*/}
                                        <TouchableOpacity
                                            style={channel == 'multiply' ? cashierPayStyle.timePayRotherActive : cashierPayStyle.timePayRother}
                                            onPress={this.onChannalChoosed.bind(this, 'multiply')}>
                                            <Image source={require('@imgPath/pay-multiply.png')}
                                                   style={cashierPayStyle.timePaymultiply} resizeMode={'contain'}/>
                                            <Text style={cashierPayStyle.titleText}>组合支付</Text>
                                        </TouchableOpacity>
                                        {availableChannels.miniApp && (
                                            <TouchableOpacity
                                                style={channel == 'miniApp' ? cashierPayStyle.timePayRotherActive : cashierPayStyle.timePayRother}
                                                onPress={this.onChannalChoosed.bind(this, 'miniApp')}
                                            >
                                                <Image
                                                    source={require('@imgPath/magugi-text.png')}
                                                    style={[cashierPayStyle.timePayImgXcx, {resizeMode: 'contain'}]}
                                                />
                                                <Text style={cashierPayStyle.titleText}>小程序支付</Text>
                                            </TouchableOpacity>
                                        )}
                                        {availableChannels.app && (
                                            <TouchableOpacity
                                                style={channel == 'app' ? cashierPayStyle.timePayRotherActive : cashierPayStyle.timePayRother}
                                                onPress={this.onChannalChoosed.bind(this, 'app')}
                                            >
                                                <Image
                                                    source={require('@imgPath/magugi-text.png')}
                                                    style={[cashierPayStyle.timePayImgXcx, {resizeMode: 'contain'}]}
                                                />
                                                <Text style={cashierPayStyle.titleText}>移动端支付</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    {/* 平板支付-支付选择*/}
                                    <View
                                        style={[cashierPayStyle.timePayRBoxChoose, {display: showPayDetails ? 'flex' : 'none'}]}>
                                        {/* 优惠券 */}
                                        <View style={cashierPayStyle.couponBox}>
                                            <TouchableHighlight
                                                underlayColor="white"
                                                style={cashierPayStyle.couponTitleBox}
                                                onPress={this.toggleCoupons.bind(this)}>
                                                <View style={cashierPayStyle.couponTitle}>
                                                    <Text style={cashierPayStyle.couponTitleText}>
                                                        优惠券：<Text style={cashierPayStyle.couponText}>{couponDesc}</Text>
                                                    </Text>
                                                    <View style={[cashierPayStyle.couponTitleR, {display: coupons.length ? 'flex' : 'none'}]}>
                                                        <Text style={cashierPayStyle.dangerText}>抵扣-￥{couponDiscountPrice}</Text>
                                                        <Icon
                                                            name={showCoupons ? 'chevron-down' : 'chevron-up'} //收起
                                                            //name='chevron-up'    展开
                                                            type="evilicon"
                                                            color="#999"
                                                        />
                                                    </View>
                                                </View>
                                            </TouchableHighlight>
                                            <View
                                                style={[cashierPayStyle.couponList, {display: showCoupons ? 'flex' : 'none'}]}>
                                                <ScrollView style={cashierPayStyle.couponListFlat}>
                                                    {
                                                        coupons.map((item, index) => {
                                                            let selected = selectedCoupons.indexOf(item) != -1;
                                                            return (
                                                                <TouchableOpacity
                                                                    style={cashierPayStyle.couponLi}
                                                                    onPress={this.onToggleSeleted.bind(this, item)}>
                                                                    <ImageBackground
                                                                        source={require('@imgPath/coupon-bg.png')}
                                                                        style={cashierPayStyle.couponLiBg}
                                                                        resizeMode={'contain'}>
                                                                        <View style={cashierPayStyle.couponLiBox}>
                                                                            <View style={cashierPayStyle.couponLiL}>
                                                                                {item.couponType == '6' &&(
                                                                                    <Text style={cashierPayStyle.couponUnit}>
                                                                                        <Text style={cashierPayStyle.couponPrice}>{item.couponPrice}</Text>折
                                                                                    </Text>
                                                                                )}
                                                                                {item.couponType == '7' &&(
                                                                                    <Text style={cashierPayStyle.couponUnit}>
                                                                                        <Text style={cashierPayStyle.couponPrice}>抵</Text>
                                                                                    </Text>
                                                                                )}
                                                                                {item.couponType != '6' && item.couponType != '7' &&(
                                                                                    <Text style={cashierPayStyle.couponUnit}>
                                                                                        ￥<Text style={cashierPayStyle.couponPrice}>{item.couponPrice}</Text>
                                                                                    </Text>
                                                                                )}

                                                                            </View>
                                                                            <View style={cashierPayStyle.couponLiR}>
                                                                                <View
                                                                                    style={cashierPayStyle.couponLiRL}>
                                                                                    <Text
                                                                                        style={cashierPayStyle.color333}>{item.name}</Text>
                                                                                </View>
                                                                                <Image
                                                                                    resizeMethod="resize"
                                                                                    source={
                                                                                        selected
                                                                                            ? require('@imgPath/radio-111c3c-active.png')
                                                                                            : require('@imgPath/radio-111c3c.png')
                                                                                    }
                                                                                    style={[cashierPayStyle.couponLiRR, {resizeMode: 'contain'}]}
                                                                                />
                                                                            </View>
                                                                        </View>
                                                                    </ImageBackground>
                                                                </TouchableOpacity>
                                                            );
                                                        })
                                                    }
                                                </ScrollView>
                                            </View>
                                        </View>
                                        <ScrollView style={{width: '100%'}}>
                                            {/* 支付方式 */}
                                            <View style={cashierPayStyle.payWayBox}>
                                                <Text style={cashierPayStyle.payWayTitle}>请选择支付方式：</Text>
                                                <View style={cashierPayStyle.payWaylist}>
                                                    {/*<TouchableOpacity*/}
                                                    {/*    style={*/}
                                                    {/*        selectedPayType == 'wx' ? cashierPayStyle.timePayRListActive : cashierPayStyle.timePayRList*/}
                                                    {/*    }*/}
                                                    {/*    onPress={this.choosePayWay.bind(this, 'wx')}*/}
                                                    {/*>*/}
                                                    {/*    <Image*/}
                                                    {/*        resizeMethod="resize"*/}
                                                    {/*        source={require('@imgPath/WeChat.png')}*/}
                                                    {/*        style={[cashierPayStyle.timePayRImg, {resizeMode: 'contain'}]}*/}
                                                    {/*    />*/}
                                                    {/*    <Text style={cashierPayStyle.titleText}>微信支付</Text>*/}
                                                    {/*</TouchableOpacity>*/}
                                                    {/*<TouchableOpacity*/}
                                                    {/*    style={*/}
                                                    {/*        selectedPayType == 'ali' ? cashierPayStyle.timePayRListActive : cashierPayStyle.timePayRList*/}
                                                    {/*    }*/}
                                                    {/*    onPress={this.choosePayWay.bind(this, 'ali')}*/}
                                                    {/*>*/}
                                                    {/*    <Image*/}
                                                    {/*        resizeMethod="resize"*/}
                                                    {/*        source={require('@imgPath/alipay.png')}*/}
                                                    {/*        style={[cashierPayStyle.timePayRImg, {resizeMode: 'contain'}]}*/}
                                                    {/*    />*/}
                                                    {/*    <Text style={cashierPayStyle.titleText}>支付宝支付</Text>*/}
                                                    {/*</TouchableOpacity>*/}
                                                    {companySetting.isUseCash && <TouchableOpacity
                                                        style={
                                                            selectedPayType == 'cash' ? cashierPayStyle.timePayRListActive : cashierPayStyle.timePayRList
                                                        }
                                                        onPress={this.choosePayWay.bind(this, 'cash')}
                                                    >
                                                        <Image
                                                            resizeMethod="resize"
                                                            source={require('@imgPath/xj-zf-icon.png')}
                                                            style={[cashierPayStyle.timePayRImg, {resizeMode: 'contain'}]}
                                                        />
                                                        <Text style={cashierPayStyle.titleText}>现金支付</Text>
                                                    </TouchableOpacity>}
                                                    {companySetting.isUseCash && <TouchableOpacity
                                                        style={
                                                            selectedPayType == 'bank' ? cashierPayStyle.timePayRListActive : cashierPayStyle.timePayRList
                                                        }
                                                        onPress={this.choosePayWay.bind(this, 'bank')}
                                                    >
                                                        <Image
                                                            resizeMethod="resize"
                                                            source={require('@imgPath/yl-zf-icon.png')}
                                                            style={[cashierPayStyle.timePayRImg, {resizeMode: 'contain'}]}
                                                        />
                                                        <Text style={cashierPayStyle.titleText}>银联支付</Text>
                                                    </TouchableOpacity>}
                                                </View>
                                            </View>
                                            {/* 其他支付方式 */}
                                            <View style={cashierPayStyle.payWayBox}>
                                                <Text style={cashierPayStyle.payWayTitle}>其他支付：</Text>
                                                <View style={cashierPayStyle.payWaylist}>
                                                    <FlatList
                                                        data={othersPaymentList}
                                                        numColumns={2}
                                                        keyExtractor={(item, index) => index}
                                                        renderItem={({item, index}) => (
                                                            <TouchableOpacity
                                                                style={
                                                                    selectedOtherPayment == item
                                                                        ? cashierPayStyle.timePayRListActive
                                                                        : cashierPayStyle.timePayRList
                                                                }
                                                                onPress={this.choosePayWay.bind(this, 'other', item.id)}
                                                            >
                                                                <Text
                                                                    style={cashierPayStyle.titleText}>{item.name}</Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    />
                                                </View>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={cashierPayStyle.timePayBtnBtm}>
                            <Text style={cashierPayStyle.btmFontColor}>应付: ￥{wait4PayAmt}</Text>
                            <View style={cashierPayStyle.timePayBtnBox}>
                                <TouchableOpacity style={cashierPayStyle.canelBtn} onPress={this.toCanel.bind(this)}>
                                    <Text style={cashierPayStyle.timePayBtnBoxText}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={cashierPayStyle.successBtn}
                                                  onPress={this.toSaveOrder.bind(this)}>
                                    <Text style={cashierPayStyle.timePayBtnBoxText}>挂单</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={cashierPayStyle.confirmBtn} onPress={this.gotoPay.bind(this)}>
                                    <Text style={cashierPayStyle.timePayBtnBoxText}>下一步</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
