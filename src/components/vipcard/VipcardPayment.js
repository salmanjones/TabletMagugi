import React from 'react';
import {Image, Modal, ScrollView, Text, TouchableOpacity, View,} from 'react-native';

import {cashierPayStyle, openCardAccountStyle} from '../../styles';
import {DeptList, MemberInfo, QRCodePayment, QRCodePaymentNew, SaleCardItem,} from '../../components';

import {displayError, showMessage} from '../../utils';
import {fetchCreateCardOrder, fetchOtherPayment, fetchOtherPayType} from '../../services';
import Spinner from "react-native-loading-spinner-overlay";

export class VipcardPayment extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            qrUrl: '',
            title: '',
            model: '',
            visible: false,
            deptId: 0,
            payType: '',
            payTypeId: '',
            payName: '',
            isPaying: false,
            tradeNo: '',
            otherPayTypeList: {},
            showOtherPaymentResult: false,
            otherPaymentStatus: '',
            isUseCash: true,
        };
    }

    componentDidMount() {
        fetchOtherPayType().then(backData => {
            if (backData.code == "6000") {
                const data = backData.data;
                this.setState({
                    otherPayTypeList: data.otherPayTypeList,
                    isUseCash: data.isUseCash,
                    payType: 1,
                    payTypeId: -1,
                    payName: '现金支付'
                });
            } else {
                this.setState({otherPayTypeList: {}});
                showMessage('加载外联支付失败', true);
            }
        }).catch(err => {
            requestAnimationFrame(() => {
                this.setState({otherPayTypeList: {}});
                requestAnimationFrame(() => {
                    displayError(err, null, true);
                })
            })
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.model === 'vipcard' ? '售卡' : '充值',
            model: nextProps.model,
        });
    }

    showModal = () => {
        this.setState({visible: true, qrUrl: ''});
    };

    hideModal = () => {
        this.setState({visible: false});
    };

    onConfirm = () => {
        const {payType, payTypeId, payName, deptId, model} = this.state;
        if (!payType || !payTypeId || !deptId) {
            showMessage('请选择服务部门和支付方式', true);
            return;
        }
        const {member, totalPrice, staffs, card} = this.props;

        // 0元的次卡只有套餐卡能开
        if (card.cardType == 2 && card.consumeMode != 1 && card.initialPrice == 0) {
            showMessage('不支持0元开卡', true);
            return;
        }


        const staffids = staffs
            .filter(x => x.id)
            .map(x => x.id)
            .join(',');

        let that = this;
        this.setState({isPaying: true});

        if (payTypeId == '18' || payTypeId == '19') {
            fetchCreateCardOrder(
                deptId,
                payType,
                model !== 'vipcard',
                member.id,
                totalPrice,
                staffids,
                card.vipCardName,
                card.vipCardNo,
                card.cardCateId,
                card.cardType,
                'tablet'
            ).then(backData => {
                const data = backData.data;
                if (data.tradeNo && data.codeUrl) {
                    that.setState({
                        isPaying: false,
                        qrUrl: data.codeUrl,
                        tradeNo: data.tradeNo,
                        title: payType === 'wx' ? '微信支付' : '支付宝支付',
                    });
                } else {
                    requestAnimationFrame(() => {
                        that.setState({isPaying: false});
                        requestAnimationFrame(() => {
                            showMessage('创建订单异常，请重试', true);
                        })
                    })
                }
            }).catch(err => {
                console.log("支付失败", err)
                requestAnimationFrame(() => {
                    that.setState({isPaying: false});
                    requestAnimationFrame(() => {
                        displayError(err, null, true);
                    })
                })
            }).finally(_=>{
                that.setState({isPaying: false});
            });
        } else {
            fetchOtherPayment(
                deptId,
                model !== 'vipcard' ? "1" : "0",
                payType,
                payTypeId,
                payName,
                member.id,
                totalPrice,
                staffids,
                card.vipCardName,
                card.vipCardNo,
                card.cardCateId,
                card.cardType,
                'tablet'
            ).then(backData => {
                if (backData.code == '6000') {
                    that.setState({
                        isPaying: false,
                        showOtherPaymentResult: true,
                        otherPaymentStatus: 'success',
                    });
                } else if (backData.code == '7003') {
                    that.setState({
                        isPaying: false,
                        showOtherPaymentResult: false,
                        otherPaymentStatus: '',
                    });
                    showMessage('支付失败，在售商品不存在', true);
                } else {
                    that.setState({
                        isPaying: false,
                        showOtherPaymentResult: true,
                        otherPaymentStatus: 'error',
                    });
                }
            }).catch(err => {
                console.log("支付失败", err)
                requestAnimationFrame(() => {
                    that.setState({isPaying: false});
                    requestAnimationFrame(() => {
                        displayError(err, null, true);
                    })
                })
            }).finally(_=>{
                that.setState({isPaying: false});
            });
        }
    }

    onPayTypeSelect = (payType, payTypeId, payName) => {
        this.setState({
            payType: payType,
            payTypeId: payTypeId,
            payName: payName
        });
    }

    onDeptSelected = deptId => {
        this.setState({deptId});
    };

    onPayTypeSelected = payType => {
        this.setState({payType});
    };

    render() {
        const {
            cardNumber,
            totalPrice,
            card,
            member,
            navigation,
            model,
            pagerName,
            reloadCashierProfile
        } = this.props;
        const {
            title,
            qrUrl,
            visible,
            isPaying,
            tradeNo,
            payType,
            payTypeId,
            otherPayTypeList,
            otherPaymentStatus,
            showOtherPaymentResult,
            isUseCash
        } = this.state;
        const step = !qrUrl ? 1 : 2;

        return (
            <Modal
                transparent={true}
                visible={visible}
                onRequestClose={() => null}
            >
                <Spinner
                    visible={isPaying}
                    textContent={'请求中'}
                    textStyle={{
                        color: '#FFF'
                    }}
                />
                {visible && (
                    <View style={openCardAccountStyle.modalBackground}>
                        <View style={openCardAccountStyle.cashierBillInfoWrapper}>
                            <View style={openCardAccountStyle.MemberQueryTitle}>
                                <Text style={openCardAccountStyle.MemberQueryTitleText}>
                                    {title}
                                </Text>
                            </View>
                            {step === 1 && !showOtherPaymentResult && (
                                <View style={openCardAccountStyle.billInfoBox}>
                                    <View style={openCardAccountStyle.leftBodyBox}>
                                        <View style={openCardAccountStyle.leftBox}>
                                            <View style={openCardAccountStyle.cardInfo}>
                                                <SaleCardItem data={card} mode={'cardPay'}/>
                                                <View style={openCardAccountStyle.cardPrice}>
                                                    <Text style={openCardAccountStyle.cardPriceText}>
                                                        {cardNumber}张
                                                    </Text>
                                                    <Text style={openCardAccountStyle.cardInfoText}>
                                                        应付:{totalPrice}元
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={openCardAccountStyle.cardGenreBox}>
                                                <DeptList
                                                    cardInfo={card}
                                                    onChecked={this.onDeptSelected}
                                                />
                                                <MemberInfo data={member}/>
                                                {/* <PaymentTypeList onSelected={this.onPayTypeSelected} /> */}
                                            </View>
                                        </View>
                                    </View>
                                    <View style={openCardAccountStyle.rightBodyBox}>
                                        {/* 平板支付-支付选择*/}
                                        <ScrollView style={cashierPayStyle.timePayRBoxChoose}>
                                            {/* 支付方式 */}
                                            <View style={cashierPayStyle.payWayBox}>
                                                <Text style={cashierPayStyle.payWayTitle}>请选择支付方式：</Text>
                                                <View style={cashierPayStyle.payWaylist}>
                                                    {/*<TouchableOpacity*/}
                                                    {/*    style={payTypeId == '19' ? cashierPayStyle.timePayRListActive : cashierPayStyle.timePayRList}*/}
                                                    {/*    onPress={this.onPayTypeSelect.bind(this, 'wx', '19', '微信')}*/}
                                                    {/*>*/}
                                                    {/*    <Image resizeMethod="resize"*/}
                                                    {/*           source={require('@imgPath/WeChat.png')}*/}
                                                    {/*           style={[cashierPayStyle.timePayRImg, {resizeMode: 'contain'}]}*/}
                                                    {/*    />*/}
                                                    {/*    <Text style={cashierPayStyle.titleText}>微信支付</Text>*/}
                                                    {/*</TouchableOpacity>*/}
                                                    {/*<TouchableOpacity*/}
                                                    {/*    style={payTypeId == '18' ? cashierPayStyle.timePayRListActive : cashierPayStyle.timePayRList}*/}
                                                    {/*    onPress={this.onPayTypeSelect.bind(this, 'ali', '18', '支付宝')}*/}
                                                    {/*>*/}
                                                    {/*    <Image resizeMethod="resize"*/}
                                                    {/*           source={require('@imgPath/alipay.png')}*/}
                                                    {/*           style={[cashierPayStyle.timePayRImg, {resizeMode: 'contain'}]}*/}
                                                    {/*    />*/}
                                                    {/*    <Text style={cashierPayStyle.titleText}>支付宝支付</Text>*/}
                                                    {/*</TouchableOpacity>*/}
                                                    {isUseCash &&
                                                        <React.Fragment>
                                                            <TouchableOpacity
                                                                style={payTypeId == '-1' ? cashierPayStyle.timePayRListActive : cashierPayStyle.timePayRList}
                                                                onPress={this.onPayTypeSelect.bind(this, '1', '-1', '现金支付')}
                                                            >
                                                                <Image resizeMethod="resize"
                                                                       source={require('@imgPath/xj-zf-icon.png')}
                                                                       style={[cashierPayStyle.timePayRImg, {resizeMode: 'contain'}]}
                                                                />
                                                                <Text style={cashierPayStyle.titleText}>现金支付</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={payTypeId == '5' ? cashierPayStyle.timePayRListActive : cashierPayStyle.timePayRList}
                                                                onPress={this.onPayTypeSelect.bind(this, '3', '5', '银联支付')}
                                                            >
                                                                <Image resizeMethod="resize"
                                                                       source={require('@imgPath/yl-zf-icon.png')}
                                                                       style={[cashierPayStyle.timePayRImg, {resizeMode: 'contain'}]}
                                                                />
                                                                <Text style={cashierPayStyle.titleText}>银联支付</Text>
                                                            </TouchableOpacity>
                                                        </React.Fragment>
                                                    }
                                                </View>
                                            </View>
                                            {/* 其他支付方式 */}
                                            {otherPayTypeList.length > 0 &&
                                                <View style={cashierPayStyle.payWayBox}>
                                                    <Text style={cashierPayStyle.payWayTitle}>其他支付：</Text>
                                                    <View style={cashierPayStyle.payWaylist}>
                                                        {
                                                            otherPayTypeList.map((element) => {
                                                                return (
                                                                    <TouchableOpacity
                                                                        style={payTypeId == element.id ? cashierPayStyle.timePayRListActive : cashierPayStyle.timePayRList}
                                                                        onPress={this.onPayTypeSelect.bind(this, '3', element.id, element.name)}
                                                                        key={element.id}
                                                                    >
                                                                        <Text
                                                                            style={cashierPayStyle.titleText}>{element.name}</Text>
                                                                    </TouchableOpacity>
                                                                );
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                            }
                                        </ScrollView>
                                    </View>
                                </View>
                            )}
                            {step === 2 && !showOtherPaymentResult && (
                                <QRCodePayment
                                    member={member}
                                    totalPrice={totalPrice}
                                    tradeNo={tradeNo}
                                    payType={payType}
                                    qrUrl={qrUrl}
                                    navigation={navigation}
                                    model={model}
                                    pagerName={pagerName}
                                    reloadCashierProfile={reloadCashierProfile}
                                    onClose={this.hideModal}
                                />
                            )}
                            {showOtherPaymentResult && (
                                <QRCodePaymentNew
                                    paymentStatus={otherPaymentStatus}
                                    navigation={navigation}
                                    onClose={() => {
                                        if(pagerName == 'CashierBillingActivity'){ // 来自于收银
                                            reloadCashierProfile()
                                            navigation.goBack()
                                        }else{
                                            navigation.navigate('CashierActivity')
                                        }
                                    }}
                                    title={title}
                                    type={'1'}
                                />
                            )}

                            {step === 1 && !showOtherPaymentResult && (
                                <View style={openCardAccountStyle.MemberQueryBtnBox}>
                                    <TouchableOpacity
                                        style={openCardAccountStyle.MemberQueryCancelBtn}
                                        onPress={this.hideModal}
                                    >
                                        <Text style={openCardAccountStyle.MemberQueryCancelText}>
                                            取消
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={openCardAccountStyle.MemberQueryConfirmBtn}
                                        onPress={this.onConfirm}
                                    >
                                        <Text style={openCardAccountStyle.MemberQueryConfirmText}>
                                            确定
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                )}
            </Modal>
        );
    }
}
