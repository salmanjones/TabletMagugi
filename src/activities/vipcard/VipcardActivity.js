import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Alert, ImageBackground, InteractionManager, Text, TouchableOpacity, View,} from 'react-native';

import {RechargeStoredCardStyles} from '../../styles';
import {showMessage, showMessageExt} from '../../utils';
import {
    SimulateKeyboardPay,
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
            password: '',
            confirmPassWord: '',
            showSimKeyboard: false,
            showSimType: '' // general：输入密码 confirm：确认密码
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
        const {card, staffs, member} = this.props;
        const {password} = this.state;
        if (!card.id) {
            showMessage(Msg.noCard);
            return;
        }

        let invalidStaffs = staffs.filter(x => x.id);
        if (invalidStaffs.length == 0) {
            showMessage(Msg.noStaffs);
            return;
        }

        // 需要密码
        const needPassword = !(member.bmsPassword && member.bmsPassword.length > 0)
        if(needPassword && ( !password || password.length < 1 )){
            Alert.alert(
                '系统提示',
                '会员密码不能为空',
                [{text: '知道了'}]
            )
            return
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
    }

    // 展示密码框
    onShowSimKeyboard(type){
        this.setState({
            showSimKeyboard: true,
            showSimType: type
        })
    }

    // 清除密码
    onKeyBoardClear(){
        const {showSimType} = this.state
        console.log("showSimType", showSimType)
        if(showSimType != 'confirm'){ // 第一次输入密码
            this.setState({
                password: '',
                confirmPassWord: '',
            })
        }
    }

    // 输入密码
    onKeyBoardFinish = value => {
        if(value.length < 1){
            Alert.alert(
                '系统提示',
                '密码不能为空',
                [{text: '知道了'}]
            )

            return
        }

        if(value.length < 6){
            Alert.alert(
                '系统提示',
                '密码不能小于6位',
                [{text: '知道了'}]
            )
            return
        }

        const {showSimType, password} = this.state
        if(showSimType == 'confirm'){ // 确认密码
            if(password != value){ // 密码不一致
                Alert.alert(
                    '系统提示',
                    '两次密码输入不一致',
                    [{text: '知道了'}]
                )
            }else{
                this.setState({
                    confirmPassWord: value,
                    showSimKeyboard: false
                })
            }
        }else{
            this.setState({
                password: value,
                confirmPassWord: '',
                showSimKeyboard: false
            })
        }
    }
    // 输入密码
    onKeyBoardCancel = value => {
        this.setState({
            showSimKeyboard: false
        })
    }

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
        const {tabIndex, showSimKeyboard, showSimType, password, confirmPassWord} = this.state;
        const editStaff = staffIndex !== -1 ? staffs[staffIndex] : {};

        return (
            <View style={RechargeStoredCardStyles.contentNew}>
                {
                    (()=>{
                        if(showSimKeyboard){
                            return (
                                <View style={RechargeStoredCardStyles.simKeyBoardBox}>
                                    <View style={RechargeStoredCardStyles.simKeyBoardBg}>
                                        <SimulateKeyboardPay
                                            placeholder={showSimType == 'confirm' ? '请再次输入密码':'请输入密码'}
                                            showCanel={true}
                                            showInput={true}
                                            clearBtn={false}
                                            pageType="pwd"
                                            refType={'setPassword'}
                                            showSimType={showSimType}
                                            password={password}
                                            confirmPassWord={confirmPassWord}
                                            onClear={this.onKeyBoardClear.bind(this)}
                                            onConfirm={this.onKeyBoardFinish.bind(this)}
                                            onCanel={this.onKeyBoardCancel.bind(this)}
                                        />
                                    </View>
                                </View>
                            )
                        }else{
                            return <View></View>
                        }
                    })()
                }
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
                                password={password}
                                confirmPassWord={confirmPassWord}
                                showSimKeyboard={!(member.bmsPassword && member.bmsPassword.length > 0)}
                                onShowSimKeyboard={this.onShowSimKeyboard.bind(this)}
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
                    password={password}
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
