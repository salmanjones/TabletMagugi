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
import {clone, PaymentResultStatus, showMessage, throttle} from '../../utils';
import {Image, Text, TouchableOpacity, View} from 'react-native';
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

class MultiPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false, //转圈圈
            billingInfo: {}, //订单信息
            memberInfo: {}, //会员信息
            paymentTimesCard: [], //次卡支付信息

            coupons: [], //优惠券
            cards: [], //卡信息

            selectedCoupons: [], //已选优惠券
            selectedCardsId: [], //已选卡
            selectedPayTypeIndex: null,
            editCard: null, //正在编辑卡
            payTypes: [
                //支付方式
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
                {
                    payType: 6,
                    payTypeId: 18,
                    payTypeNo: 18,
                    name: '支付宝支付',
                    payMode: 0,
                    icon: require('@imgPath/pay-multiply-ali.png'),
                },
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
            ],
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
        };
        this.savedBilling = null;
    }

    componentDidMount() {
        let {saveBillingData, memberInfo, items, paymentTimesCard, companySetting} = this.props.route.params;
        let billingInfo = JSON.parse(saveBillingData.billing);
        this.getInitialData(billingInfo, memberInfo, items, (data) => {
            let stateData = {...this.state, paymentTimesCard};
            if (data) {
                let {othersPaymentList, coupons} = data;
                let otherPayTypes = othersPaymentList
                    ? othersPaymentList.map((x) => ({
                        payType: 3,
                        payTypeId: x.id,
                        payTypeNo: x.id,
                        name: x.name,
                        icon: require('@imgPath/pay-multiply-meituan.png'),
                        payMode: 0,
                    }))
                    : [];
                stateData.payTypes = stateData.payTypes.concat(otherPayTypes); //外联

                if (coupons && coupons.length) {
                    stateData.coupons = coupons; //优惠券
                    let couponPayType = stateData.payTypes.find((x) => x.payType == 5);
                    if (couponPayType) couponPayType.itemAmt = coupons.length;
                } else {
                    stateData.payTypes = stateData.payTypes.filter((x) => x.payType != 5);
                }
            }

            if (companySetting && !companySetting.isUseCash) {
                stateData.payTypes = stateData.payTypes.filter((x) => x.payType != 1 && (x.payType != 3 || x.payTypeId != 5));
            }

            let availableCards =
                (memberInfo &&
                    memberInfo.vipStorageCardList &&
                    memberInfo.vipStorageCardList.length &&
                    memberInfo.vipStorageCardList.filter((x) => {
                        let balance = Number(x.balance || 0) + (x.attachMoneyList || []).reduce((rs, x) => (rs += Number(x.balance || 0)), 0);
                        return x.cardType == 1 && (x.consumeMode != 0 || balance > 0);
                    })) ||
                [];
            if (availableCards.length) {
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
                }));

                let cardPayType = stateData.payTypes.find((x) => x.payType == 2);
                if (cardPayType) cardPayType.itemAmt = availableCards.length;
            } else {
                stateData.payTypes = stateData.payTypes.filter((x) => x.payType != 2);
            }

            this.setState({
                ...stateData,
                items: items,
                billingInfo: billingInfo, //订单信息
                memberInfo: memberInfo, // 会员信息
            });
        }).then(() => {
            if (paymentTimesCard) {
                this.state.paySequence = paymentTimesCard.map((x) => ({key: x.payType + '_' + x.payTypeId, value: x}));
            }
            this.calculateBilling(this.state, (data) => {
                try {
                    this.checkResult(data);
                    let {alreadyPaidPrice, alreadyCouponPrice, alreadyWaitPayPrice, willPayPrice, alreadyDiscountPrice, timesProjectsPayEndNum} = data.data;
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
                } catch (e) {
                    showMessage(e.msg, true, () => {
                        this.props.navigation.goBack();
                    });
                }
            });
        });
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
            paymentTimesCard,
            editCard,
            qrCode,
            isPaySuccess,
            errorStockList,
        } = this.state;
        let selectedPayType = payTypes[selectedPayTypeIndex];
        let selectedItemAmtInfo =
            selectedPayType && selectedPayType.payType == 5
                ? selectedCoupons.length
                ? '已选优惠券' + selectedCoupons.length + '张'
                : ''
                : selectedPayType && selectedPayType.payType == 2
                ? selectedCardsId.length
                    ? '已选会员卡' + selectedCardsId.length + '张'
                    : ''
                : '';
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
                                    ></Image>
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
                                {/* 默认｜为空 */}
                                <View style={selectedPayType ? multiplyPayStyle.hide : multiplyPayStyle.rightDefault}>
                                    <Image source={require('@imgPath/no-content.png')} resizeMode={'contain'}
                                           style={multiplyPayStyle.noContentImg}/>
                                    <Text style={multiplyPayStyle.noContentTxt}>请选择支付方式</Text>
                                </View>
                                {/* 已选择支付方式 */}
                                <View style={selectedPayType ? multiplyPayStyle.rightWrapper : multiplyPayStyle.hide}>
                                    <View style={multiplyPayStyle.rightWrapperTitle}>

                                        <View style={multiplyPayStyle.img_left}>
                                            {selectedPayType && selectedPayType.icon && (
                                                <Image style={multiplyPayStyle.itemLeftImg} resizeMethod="resize"
                                                       source={selectedPayType.icon}></Image>
                                            )}
                                            <Text
                                                style={multiplyPayStyle.rightTitleTxt}>{selectedPayType ? selectedPayType.name : ''}</Text>
                                        </View>

                                        <View><Text style={multiplyPayStyle.rightTitleTxt0}>{selectedItemAmtInfo}</Text></View>
                                    </View>
                                    <View style={multiplyPayStyle.rightWrapperContent}>
                                        {
                                            /*优惠券*/
                                            selectedPayType && selectedPayType.payType == 5 && (
                                                <CouponList selectedCoupons={selectedCoupons} data={coupons}
                                                            onSeleted={this.onCouponSelected}/>
                                            )
                                        }
                                        {
                                            /*会员卡列表*/
                                            selectedPayType && selectedPayType.payType == 2 && !editCard && (
                                                <MemberCardList
                                                    onSeleted={this.onCardSelected}
                                                    selectedCardsId={selectedCardsId}
                                                    data={cards}
                                                    onEdit={this.onEditCard}
                                                />
                                            )
                                        }
                                        {selectedPayType && selectedPayType.payType == 2 && editCard && (
                                            <EditCardPay card={editCard}
                                                         onCancel={this.onEditCardCancel}
                                                         onConfirm={this.onEditCardConfirm}/>
                                        )}
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
                        {/*底部信息*/}
                        <View style={multiplyPayStyle.footer}>
                            <View style={multiplyPayStyle.footerLeft}>
                                <View style={multiplyPayStyle.footerLeftTop}>
                                    <Text style={multiplyPayStyle.footerLeftItem}>应付：{paymentInfo.willPayPrice}</Text>
                                    <Text style={multiplyPayStyle.footerLeftItem}>已付：{paymentInfo.alreadyPaidPrice}</Text>
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
                                <TouchableOpacity style={multiplyPayStyle.canelBtn} onPress={throttle(this.onCancel, 600)}>
                                    <Text style={multiplyPayStyle.btnText}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={multiplyPayStyle.confirmBtn} onPress={throttle(this.onPay.bind(this), 800)}>
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
                                <Text style={multiplyPayStyle.pwdTitleValue}>会员卡支付，请输入密码</Text>
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
        if(memberInfo && memberInfo.phone){
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

        if ((type = 'other')) {
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
        let {payResultCode, payTypeErrorList, payTypeUsedList, payTypeMoreList, msg} = data.data;
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
        } else if (payResultCode =='4') {
            throw {type: 'error', msg: '单据已结单'};
        }else if (payResultCode =='0') {
            throw {type: 'error', msg: '正在支付'};
        }else if (payResultCode =='3') {
            throw {type: 'error', msg: '订单状态异常，不允许支付'};
        }else if (payResultCode =='-4') {
            throw {type: 'error', msg: '有非法从单或消费项，请刷新后重试'};
        }else if (payResultCode =='-5') {
            throw {type: 'error', msg: '外卖存店异常'};
        }else {
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
            payTypes: [...this.state.payTypes],
            selectedPayTypeIndex: index,
            editCard: null,
        });
    };

    //支付方式checkBox 选中
    onPayTypeChecked = (index) => {
        let payType = this.state.payTypes[index];

        if (payType.paidAmt == null || payType.paidAmt == undefined) {
            this.onPayTypeSelected(index);
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

        let preState = {...this.state, selectedCoupons, payTypes: [...this.state.payTypes], paySequence};
        this.calculateBilling(preState, (data) => {
            let {payTypeUsedList} = data.data;
            try {
                this.checkResult(data);

                // 根据后台扣券返回结果处理券前端展示
                let couponItems = payTypeUsedList && payTypeUsedList.length ? payTypeUsedList.filter((x) => x.payType == 5) : [];
                let totalCouponPrice = couponItems.length ? couponItems.reduce((rs, x) => rs + x.consumeActualMoney, 0) : null;
                let checkedCoupons = couponItems.map(item=>{
                    return item.couponInfo.couponNo
                })
                selectedCoupons = selectedCoupons.filter(item=>{
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
                }else if(backData && backData.payResultCode=='5'){
                    showMessage(backData.payMsg,true);
                }else{
                    showMessage('库存检查异常',true);
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
        payWayList.forEach(payway=>{
            payway.paidAmt =  payTypeUsedList.filter(item=>{
                return item.payType == payway.payType
            }).reduce((paidAmt, item)=>{
                let consumeActualMoney = parseFloat(item.consumeActualMoney || 0)
                let discountPrice = parseFloat(item.discountPrice || 0)
                if(item.payType == '5'){ // 优惠券支付
                    if(item.payMode == '0' || item.payMode == '2'){ // 0现金 1折扣 2抵扣
                        return paidAmt + consumeActualMoney
                    }else{
                        return paidAmt + discountPrice
                    }
                }else if(item.payType == '2'){ // 储值卡抵扣
                    return paidAmt + consumeActualMoney
                }else if(item.payType == '6'){ // 微信或支付宝
                    if(item.payTypeId == payway.payTypeId){ // 区别微信与支付宝
                        return paidAmt + consumeActualMoney
                    }else{
                        return paidAmt
                    }
                }else{
                    if(item.payTypeId == payway.payTypeId){
                        return paidAmt + consumeActualMoney
                    }else{
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
            if(payKeyArray.length == 4){ // 项目赠金
                let delIndex = -2
                const attachWay = payUsedArray.filter((payUsed, index) => {
                    const tmpKey = payUsed.payType + "_" + payUsed.payTypeId + "_-1_" + payUsed.payModeId
                    if(tmpKey == payKey){
                        delIndex = index
                        return true
                    }else{
                        return false
                    }
                })

                if(attachWay.length > 0){ // 当前赠金已用于支付
                    // 移除已处理的支付方式
                    sequence.value.payAmount = attachWay[0].consumeActualMoney
                    delIndex !=-2 && payUsedArray.splice(delIndex, 1)
                    return true
                }else{
                    return false
                }
            }else if(payKeyArray.length == 3){ // 有赠金的储值卡
                let delIndex = -2
                const attachWay = payUsedArray.filter((payUsed, index) => {
                    const tmpKey = payUsed.payType + "_" + payUsed.payTypeId + '_' + payUsed.payMode
                    if(tmpKey == payKey){
                        delIndex = index
                        return true
                    }else{
                        return false
                    }
                })

                if(attachWay.length > 0){ // 当前赠金已用于支付
                    sequence.value.payAmount = attachWay[0].consumeActualMoney
                    delIndex !=-2 &&  payUsedArray.splice(delIndex, 1)
                    return true
                }else{
                    return false
                }
            }else if(payKeyArray.length == 2){ // 其它
                let delIndex = -2
                const attachWay = payUsedArray.filter((payUsed, index) => {
                    const tmpKey = payUsed.payType + "_" + payUsed.payTypeId
                    if(tmpKey == payKey){
                        delIndex = index
                        return true
                    }else{
                        return false
                    }
                })

                if(attachWay.length > 0){
                    if(attachWay[0].payType != '4' && attachWay[0].payType != '5'){ // 非次卡按照实际进行扣减，次卡项目按照实际进行扣减
                        sequence.value.payAmount = attachWay[0].consumeActualMoney
                    }
                    delIndex !=-2 && payUsedArray.splice(delIndex, 1)
                    return true
                }else{
                    return false
                }
            }
        })
        state.paySequence = paidSequence

        // 如果抵扣券已完成扣费，则会员卡还原扣费金额
        const usedOtherPay = paidSequence.filter(item => {
            let payType = item.value.payType
            return (payType != '5' && payType != '4')
        }).length > 0
        if(!usedOtherPay){
            let cards = JSON.parse(JSON.stringify(state.cards))
            cards.forEach(card=>{
                card.paidAmt = null
                if(card.attachMoneyList){
                    card.attachMoneyList.forEach(attch=>{
                        attch.paidAmt = null
                    })
                }
            })
            state.cards = cards
        }

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
    return {};
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        cashierScreenReloadOrder: () => {
            dispatch({type: CASHIERBILLING_RELOAD_ORDER});
        },
    };
};

export const MultiPayActivity = connect(mapStateToProps, mapDispatchToProps)(MultiPay);
