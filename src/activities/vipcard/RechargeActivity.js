import React from 'react';
import {connect} from 'react-redux';
import {Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {groupBy, showMessage, showMessageExt} from '../../utils';
import {RechargeStoredCardStyles} from '../../styles';

import {
    CardDetails,
    CardsView,
    ModalCardInfo,
    RechargeInputBar,
    StaffSelectBox,
    StaffServiceBar,
    StaffServiceEdit,
    VipcardPayment,
} from '../../components';
import {VipUserInfoComponent} from "../../components/vipcard/VipUserInfo";
import {reloadProfileAction} from "../../actions";
import {TimerRightWidget} from "../../components/header/TimerRightWidget";

const tabs = [
    {id: 1, name: '储值卡'},
    {id: 2, name: '次卡'},
    {id: 3, name: '服务人'},
];

let storageCard = null;
let timeCard = null;

class Recharge extends React.Component {
    constructor(props) {
        super(props);
        const {params} = this.props.route;
        const validCards = filterUnRechargeableCard(
            params.member.vipStorageCardList,
            this.props.storeId
        );
        const card = validCards.filter(x => x.id === params.card.id)[0];
        this.state = {
            member: params.member,
            currentCard: card,
            currentTabIndex: !card || card.cardType == 1 ? 0 : 1,
            servicers: [{}, {}, {}, {}],
            currentServicerIndex: null,
            rechargeAmt: card && card.allowRecharge && card.cardType == 2 ? card.initialPrice : '',
            rechargeCount: 1,
            cardModelVisible: false,
            clearServicerGridChoose: '-1',
        };

        const cardGroups = groupBy(validCards, card => card.cardType);
        storageCard = cardGroups['1'] || [];
        timeCard = cardGroups['2'] || [];
    }

    componentDidMount() {
        let {route} = this.props
        this.props.navigation.setParams({
            showMemberIcon: true,
            memberInfo: route.params.member,
        });
        route.params.showMemberIcon = true
        route.params.memberInfo = route.params.member

        // 右侧时间
        const {navigation} = this.props;
        navigation.setOptions({
            headerRight: () => (
                <TimerRightWidget/>
            )
        })
    }

    render() {
        const {
            member,
            servicers,
            currentCard,
            rechargeAmt,
            rechargeCount,
            cardModelVisible,
            currentTabIndex,
            currentServicerIndex,
        } = this.state;
        const reloadCashierProfile = this.props.reloadCashierProfile
        let currentServicer = servicers[currentServicerIndex];

        return (
            <View style={RechargeStoredCardStyles.contentNew}>
                <View style={RechargeStoredCardStyles.contentBox}>
                    {/*左侧内容*/}
                    <View style={RechargeStoredCardStyles.LeftcontentNew}>
                        <View style={RechargeStoredCardStyles.title}>
                            {/*<Text style={RechargeStoredCardStyles.titleText}>会员卡</Text>*/}
                            {
                                member.id != '' && (
                                    <VipUserInfoComponent showMember={this.props.route}
                                                          showBtn={true}></VipUserInfoComponent>
                                )
                            }
                            {
                                member.id == '' && (
                                    <Text style={RechargeStoredCardStyles.titleText}>会员卡</Text>
                                )
                            }

                        </View>

                        {/*已选择卡*/}
                        {currentCard && (
                            <View style={RechargeStoredCardStyles.cardOperateBoxOther}>
                                <View style={RechargeStoredCardStyles.cardOperateBox}>
                                    {/*卡详情*/}
                                    <CardDetails data={currentCard}/>
                                    {/*充值金额*/}
                                    <RechargeInputBar
                                        card={currentCard}
                                        onAmtChanged={this.onInputEndEditing}
                                        onEndEditing={this.onInputEndEditing}/>
                                </View>
                                {/*已选择服务人信息*/}
                                <StaffServiceBar
                                    data={servicers}
                                    onSelected={this.onServicerSelected}
                                />
                            </View>
                        )}
                        {/*未选择卡*/}
                        {!currentCard && (
                            <View style={RechargeStoredCardStyles.cardOperateNoneBoxOther}>
                                <Image resizeMethod="resize"
                                       source={require('@imgPath/buy-card.png')}
                                       style={RechargeStoredCardStyles.cardOperateNoneImg}
                                       resizeMode={'contain'}
                                />
                                <Text style={RechargeStoredCardStyles.cardOperateNoneT}>
                                    请选择您要充值的会员卡
                                </Text>
                            </View>
                        )}
                        {/*底部区域*/}
                        {this.renderBottom(this.state)}
                    </View>
                    {/*右侧内容*/}
                    <View style={RechargeStoredCardStyles.Rightcontent}>
                        {/*顶部Tab*/}
                        <View style={RechargeStoredCardStyles.openCardTitleRO}>
                            {/*<View style={RechargeStoredCardStyles.openCardTitleRTitleO}>*/}
                            <ImageBackground resizeMethod="resize" source={require('@imgPath/store_bg.png')}
                                             style={RechargeStoredCardStyles.openCardTitleRTitleO}>
                                {/*<TabGroup*/}
                                {/*    selectedIndex={currentTabIndex}*/}
                                {/*    displayField={'name'}*/}
                                {/*    data={tabs}*/}
                                {/*    onSelected={this.onTabsSelected}/>*/}
                                <View style={RechargeStoredCardStyles.containerStyle}>
                                    <TouchableOpacity onPress={this.onTabsSelected.bind(this, 0)}>
                                        <Text
                                            style={currentTabIndex == 0 ? RechargeStoredCardStyles.selectedButtonStyle : RechargeStoredCardStyles.buttonStyle}>储值卡</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.onTabsSelected.bind(this, 1)}>
                                        <Text
                                            style={currentTabIndex == 1 ? RechargeStoredCardStyles.selectedButtonStyle : RechargeStoredCardStyles.buttonStyle}>次卡</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this.onTabsSelected.bind(this, 2)}>
                                        <Text
                                            style={currentTabIndex == 2 ? RechargeStoredCardStyles.selectedButtonStyle : RechargeStoredCardStyles.buttonStyle}>服务人</Text>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                            {/*</View>*/}
                        </View>
                        {/*中间区域*/}
                        <View style={RechargeStoredCardStyles.ShowMemberCardBox}>
                            {currentTabIndex === 0 && (
                                <CardsView
                                    data={storageCard}
                                    onSelected={this.onCardSelected}
                                    card={currentCard}/>
                            )}

                            {currentTabIndex === 1 && (
                                <CardsView
                                    data={timeCard}
                                    onSelected={this.onCardSelected}
                                    card={currentCard}/>
                            )}

                            <View
                                style={[{display: currentTabIndex === 2 ? 'flex' : 'none'}, RechargeStoredCardStyles.RightServicecontent]}>
                                <StaffSelectBox onSelected={this.onStaffSelected}
                                                clearServicerGridChoose={this.state.clearServicerGridChoose}/>
                            </View>
                        </View>
                        {/*底部区域*/}
                        {
                            currentTabIndex === 2 && currentServicer && currentTabIndex == 2 && Object.keys(currentServicer).length > 0
                            && currentServicer.value && currentServicer.value.length > 0 && (
                                <View style={RechargeStoredCardStyles.activeAreaR}>
                                    <StaffServiceEdit
                                        data={currentServicer}
                                        onAssign={this.onAssign}
                                        onCancel={this.onCancelAssign}
                                        onDelete={this.onDeleteServicer}
                                        showAssign={false}/>
                                </View>
                            )
                        }
                    </View>
                </View>
                {this.renderBottom(this.state)}

                {currentCard && (
                    <ModalCardInfo
                        data={currentCard}
                        visible={cardModelVisible}
                        onConfirm={() => this.setState({cardModelVisible: false})}
                    />
                )}

                {currentCard && (
                    <VipcardPayment
                        ref={ref => {
                            this.vipcardPayment = ref;
                        }}
                        staffs={servicers}
                        cardNumber={rechargeCount}
                        totalPrice={rechargeAmt}
                        card={currentCard}
                        member={member}
                        navigation={this.props.navigation}
                        reloadCashierProfile={reloadCashierProfile}
                        pagerName={this.props.route.params.pagerName || 'RechargeActivity.js'}
                    />
                )}
            </View>
        );
    }

    renderBottom = ({rechargeAmt, currentCard}) => {
        return (
            <View style={RechargeStoredCardStyles.activeAreaL}>
                <View style={RechargeStoredCardStyles.cardOperateNew}>
                    <View style={RechargeStoredCardStyles.showPayPrice}>
                        <Text style={RechargeStoredCardStyles.showPayPriceText}>
                            应付：{rechargeAmt && rechargeAmt.toString().length > 0 ? rechargeAmt : '0.00'}
                        </Text>
                    </View>
                    <View style={RechargeStoredCardStyles.PayForBtn}>
                        <TouchableOpacity
                            style={RechargeStoredCardStyles.PayForBtnInfo}
                            onPress={this.showCardInfo}>
                            <Text style={RechargeStoredCardStyles.PayForBtnInfoText}>
                                详细信息
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.onPay}
                            style={[
                                RechargeStoredCardStyles.PayForBtnFinish,
                                {display: currentCard.allowRecharge ? 'flex' : 'none'},
                            ]}>
                            <Text style={RechargeStoredCardStyles.PayForBtnFinishText}>
                                结单
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
    onInputEndEditing = (text, count) => {
        this.setState({rechargeAmt: text, rechargeCount: count});
    };

    //选择服务人（）
    onServicerSelected = index => {
        this.setState({
            currentServicerIndex: index,
            currentTabIndex: 2,
            clearServicerGridChoose: index.toString(),
        });
    };
    //选择服务人
    onStaffSelected = staff => {
        const {currentServicerIndex, servicers} = this.state;

        this.setState({
            servicers: servicers.map((item, index) => {
                return index === currentServicerIndex ? staff : item;
            }),
        });
    };
    //tab选择
    onTabsSelected = index => {
        this.setState({currentTabIndex: index});
    };
    //换卡
    onCardSelected = card => {
        if (card !== this.state.currentCard) {
            this.setState({
                currentCard: card,
                rechargeCount: 1,
                rechargeAmt: card.allowRecharge
                    ? card.cardType == 2 ? card.initialPrice : ''
                    : '',
            });
        }
    };
    //指定
    onAssign = () => {
        let {servicers, currentServicerIndex} = this.state;
        this.setState({
            servicers: servicers.map((item, index) => {
                return index === currentServicerIndex
                    ? {...item, isAssign: true}
                    : item;
            }),
        });
    };
    //取消指定
    onCancelAssign = () => {
        let {servicers, currentServicerIndex} = this.state;
        this.setState({
            servicers: servicers.map((item, index) => {
                return index === currentServicerIndex
                    ? {...item, isAssign: false}
                    : item;
            }),
        });
    };
    //删除服务人
    onDeleteServicer = () => {
        let {servicers, currentServicerIndex} = this.state;
        this.setState({
            servicers: servicers.map((item, index) => {
                return index === currentServicerIndex ? {} : item;
            }),
            currentTabIndex: 2,
        });
    };
    //详细信息
    showCardInfo = () => {
        if (!this.state.currentCard) {
            showMessage('请选择会员卡');
            return;
        }

        this.setState({cardModelVisible: true});
    };
    //支付
    onPay = () => {
        //precheck
        let {servicers, rechargeAmt, currentCard, member} = this.state;

        if (!currentCard.allowRecharge) {
            showMessage('当前卡不允许充值');
            return;
        }

        if (!currentCard) {
            showMessage('请选择会员卡');
            return;
        }

        let hasServicer = false;
        servicers.forEach(x => {
            if (Object.keys(x).length) hasServicer = true;
        });
        if (!hasServicer) {
            showMessage('请选择服务人');
            return;
        }

        if (!rechargeAmt) {
            showMessage('请输入充值金额');
            return;
        }

        let minimalRechargeAmt =
            currentCard.cardType == 1
                ? currentCard.rechargePrice
                : currentCard.initialPrice;

        if (parseInt(rechargeAmt) < parseInt(minimalRechargeAmt)) {
            showMessageExt('充值金额不能低于' + minimalRechargeAmt);
            return;
        }

        if (!member) {
            showMessage('会员信息不存在');
            return;
        }

        if (!isMemberHasCard(member, currentCard)) {
            showMessage('会员和卡信息不匹配');
            return;
        }

        this.vipcardPayment.showModal();
    };
}

function isMemberHasCard(member, card) {
    if (!member.vipStorageCardList || !card) return false;

    const results = member.vipStorageCardList.filter(
        x => x.vipCardNo === card.vipCardNo
    );
    return results.length > 0;
}

function filterUnRechargeableCard(cards, storeId) {
    if (!cards) return;

    cards = cards.map(x => {
        let details = x.detailsMap || {};
        x.allowRecharge = true;
        x.allowOweMoneyRecharge = true;
        if (
            (x.cardType == 1 && (x.consumeMode == 1 || x.consumeMode == 3)) || // 储值卡中的（折扣卡、副卡）
            (x.cardType == 2 && x.consumeMode == 2) || // 次卡中的（时间卡）
            x.status != 0 || // 卡状态（非正常）
            x.saleSource == 1 || // APP来源的卡
            details.allowRecharge != 0
        ) {
            x.allowRecharge = false;
        } else if (x.storeId != storeId && details.allowRecharge == 0 && details.isCrossRecharge != 0) {// 可以充值但不能跨店充值
            x.allowRecharge = false;
        } else if (x.cardType == 2 && x.oweMoney != 0) {
            x.allowRecharge = false;
            x.allowOweMoneyRecharge = false;
        }
        return x;
    });
    return cards;
}

const mapStateToProps = state => {
    return {
        // member: state.component.memberIdentify.member,
        storeId: state.auth.userInfo.storeId,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        reloadCashierProfile: ()=>{
            dispatch(reloadProfileAction())
        }
    };
};

export const RechargeActivity = connect(mapStateToProps, mapDispatchToProps)(
    Recharge
);
