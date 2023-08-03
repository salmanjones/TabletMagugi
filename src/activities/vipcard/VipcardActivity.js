import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ImageBackground, InteractionManager, Text, TouchableOpacity, View,} from 'react-native';

import {RechargeStoredCardStyles} from '../../styles';
import {showMessage} from '../../utils';
import {
    StaffSelectBox,
    StaffServiceBar,
    StaffServiceEdit,
    VipcardDetailSection,
    VipcardPayment,
    VipcardSaleCardList,
} from '../../components';
import {
    reloadProfileAction,
    vipcardInitAction,
    vipcardSelectCardAction,
    vipcardSelectStaffAction,
    vipcardSetCountAction,
    vipcardSetStaffAction,
} from '../../actions';
import {fetchStaffAcl} from '../../services';
import {VipUserInfoComponent} from "../../components/vipcard/VipUserInfo";
import {TimerRightWidget} from "../../components/header/TimerRightWidget";

const Msg = {
    noCard: '请选择要购买的会员卡',
    noStaffs: '请选择服务人',
};

class VipCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabIndex: 0,
        };
        this.acl = {};
        this.paymentModal = null
    }

    componentDidMount() {
        const {init, operateUser} = this.props;
        let aclTxt = 'ncashier_opencard_card_money';
        fetchStaffAcl(aclTxt, operateUser).then(o => {
            if (o.data) {
                this.acl = o.data;
            } else {
                this.acl = {};
            }
        }).catch(err => {
            console.error(err)
        });

        let params = this.props.route.params.member || {}
        init(params);

        // 右侧时间
        const {navigation} = this.props;
        navigation.setOptions({
            headerRight: () => (
                <TimerRightWidget/>
            )
        })
    }

    onTabPress = index => {
        this.setState({
            tabIndex: index,
        });
    };

    onStaffPress = staff => {
        if (this.state.tabIndex !== 2) {
            this.setState({tabIndex: 2});
        }
        this.props.selectStaff(staff);
    };

    submitOrder = () => {
        const {card, staffs} = this.props;
        if (!card.id) {
            showMessage(Msg.noCard);
            return;
        }

        let invalidStaffs = staffs.filter(x => x.id);
        if (invalidStaffs.length == 0) {
            showMessage(Msg.noStaffs);
            return;
        }

        this.paymentModal.showModal();
    };

    renderTotal = totalPrice => {
        return (
            <View style={RechargeStoredCardStyles.cardOperateBottom}>
                <View style={RechargeStoredCardStyles.showPayPrice}>
                    <Text style={RechargeStoredCardStyles.showPayPriceText}>
                        应付：{totalPrice && totalPrice.toString().length > 0 ? totalPrice : '0.00'}
                    </Text>
                </View>
                <View style={RechargeStoredCardStyles.PayForBtn}>
                    <TouchableOpacity
                        style={RechargeStoredCardStyles.PayForBtnFinish}
                        onPress={this.submitOrder}>
                        <Text style={RechargeStoredCardStyles.PayForBtnFinishText}>
                            结单
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    render() {
        const {
            staffs,
            card,
            member,
            count,
            totalPrice,
            staffIndex,
            setCount,
            selectCard,
            setStaff,
            navigation,
            reloadCashierProfile
        } = this.props;
        const {tabIndex} = this.state;
        const editStaff = staffIndex !== -1 ? staffs[staffIndex] : {};

        return (
            <View style={RechargeStoredCardStyles.contentNew}>
                {/*标题栏*/}
                <View style={RechargeStoredCardStyles.openCardTitle}>
                    {/*标题*/}
                    <View style={RechargeStoredCardStyles.openCardTitleL}>
                        {
                            (()=>{
                                if(member && member.id && member.id.length > 0){
                                    return (<VipUserInfoComponent memberId={member.id} showBtn={false}/>)
                                }else{
                                    return (<Text style={RechargeStoredCardStyles.titleText}>会员卡</Text>)
                                }
                            })()
                        }
                    </View>
                    {/*Tbs*/}
                    <View style={RechargeStoredCardStyles.openCardTitleR}>
                        {/*<View style={RechargeStoredCardStyles.openCardTitleRTitle}>*/}
                        <ImageBackground resizeMethod="resize" resizeMode={'stretch'}
                                         source={require('@imgPath/store_bg.png')}
                                         style={RechargeStoredCardStyles.openCardTitleRTitle}>
                            <View style={RechargeStoredCardStyles.containerStyle}>
                                <TouchableOpacity onPress={this.onTabPress.bind(this, 0)}>
                                    <Text
                                        style={tabIndex == 0 ? RechargeStoredCardStyles.selectedButtonStyle : RechargeStoredCardStyles.buttonStyle}>储值卡</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onTabPress.bind(this, 1)}>
                                    <Text
                                        style={tabIndex == 1 ? RechargeStoredCardStyles.selectedButtonStyle : RechargeStoredCardStyles.buttonStyle}>次卡</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.onTabPress.bind(this, 2)}>
                                    <Text
                                        style={tabIndex == 2 ? RechargeStoredCardStyles.selectedButtonStyle : RechargeStoredCardStyles.buttonStyle}>服务人</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                        {/*</View>*/}
                    </View>
                </View>
                {/*内容区域*/}
                <View style={RechargeStoredCardStyles.openContentBox}>
                    {/*左侧内容*/}
                    <View style={RechargeStoredCardStyles.contentBody}>
                        {/*左侧卡信息区域*/}
                        <View style={RechargeStoredCardStyles.Leftcontent}>
                            {/*购卡信息*/}
                            <VipcardDetailSection
                                data={card}
                                setCount={setCount}
                                count={count}
                                acl={this.acl}
                            />
                            {/*服务人信息*/}
                            <StaffServiceBar data={staffs} onSelected={this.onStaffPress}/>
                            {/*总金额*/}
                            <View style={RechargeStoredCardStyles.openActiveArea}>
                                <View style={RechargeStoredCardStyles.openActiveAreaL}>
                                    {this.renderTotal(totalPrice)}
                                </View>
                            </View>
                        </View>
                    </View>
                    {/*右侧内容*/}
                    <View style={RechargeStoredCardStyles.ShowOpenRightcontent}>
                        {/*右侧卡列表*/}
                        <View style={RechargeStoredCardStyles.ShowOpenCardBox}>
                            {/*卡列表*/}
                            <View style={{display: tabIndex !== 2 ? 'flex' : 'none', flex: 1}}>
                                <VipcardSaleCardList
                                    cardType={tabIndex == 0 ? 1 : 2}
                                    card={card}
                                    selectCard={selectCard}
                                    setCount={setCount}
                                />
                            </View>
                            {/*服务人*/}
                            <View style={{display: tabIndex === 2 ? 'flex' : 'none', flex: 1}}>
                                <StaffSelectBox
                                    onSelected={setStaff}
                                    clearServicerGridChoose={staffIndex}
                                />
                            </View>
                            {editStaff.id && tabIndex == 2 && (
                                // 服务人编辑
                                <View style={RechargeStoredCardStyles.openActiveStaffArea}>
                                    <View style={RechargeStoredCardStyles.openActiveAreaR}>
                                        <StaffServiceEdit
                                            data={editStaff}
                                            showAssign={false}
                                            onDelete={() => {
                                                setStaff({});
                                            }}
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <VipcardPayment
                    ref={ref => {
                        this.paymentModal = ref;
                    }}
                    staffs={staffs}
                    navigation={navigation}
                    cardNumber={count}
                    member={member}
                    totalPrice={totalPrice}
                    card={card}
                    model={'vipcard'}
                    reloadCashierProfile={reloadCashierProfile}
                    pagerName={this.props.route.params.pagerName || 'RechargeActivity.js'}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const {vipcard} = state;

    return {
        staffs: vipcard.staffs,
        card: vipcard.card,
        member: vipcard.member,
        count: vipcard.count,
        totalPrice: vipcard.totalPrice,
        staffIndex: vipcard.staffIndex,
        operateUser: state.auth.userInfo.staffId
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            init: vipcardInitAction,
            selectCard: vipcardSelectCardAction,
            setCount: vipcardSetCountAction,
            selectStaff: vipcardSelectStaffAction,
            setStaff: vipcardSetStaffAction,
            reloadCashierProfile: reloadProfileAction
        },
        dispatch
    );
}

export const VipcardActivity = connect(mapStateToProps, mapDispatchToProps)(
    VipCard
);
