import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Alert, ImageBackground, Text, TouchableOpacity, View,} from 'react-native';

import {RechargeStoredCardStyles} from '../../styles';
import {pickNumber, showMessage, showMessageExt} from '../../utils';
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
import {sendSmsCode, verifySmsCode} from "../../services/sms";
import {getMemberDetail} from "../../services/reserve";

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
            enableCheckSms: true, // 开启验证码校验
            smsCode: '',
            smsSendCode: '', // 发送的验证码
            hasCheckSms: false,
            showSimKeyboard: false,
            showSimType: '', // general：输入密码 confirm：确认密码
            portrait: null // 顾客的档案「来源于DB」
        };
        this.acl = {};
        this.paymentModal = null
        this.smsTimer = null
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

        const member = this.props.route.params.member || {}
        // 初始化顾客信息(来源于索引)
        init(member);

        // 获取顾客档案
        if(member && member.id){
            getMemberDetail({
                memberId: member.id,
            }).then(res => {
                const {code, data} = res
                if (code == '6000') {
                    const portrait = res.data
                    this.setState({
                        portrait
                    })
                }
            })
        }

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

    submitOrder = async () => {
        const {card, staffs, member} = this.props;
        const {portrait, password, confirmPassWord, smsCode, hasCheckSms, enableCheckSms} = this.state;
        if (!card.id) {
            showMessage(Msg.noCard);
            return;
        }

        // 需要密码
        const needPassword = !(member.bmsPassword && member.bmsPassword.length > 0)
        if(needPassword){
            if(!password || password.length < 1 ){
                Alert.alert(
                    '系统提示',
                    '会员密码不能为空',
                    [{text: '知道了'}]
                )
                return
            }

            if(!confirmPassWord || confirmPassWord.length < 1 ){
                Alert.alert(
                    '系统提示',
                    '确认密码不能为空',
                    [{text: '知道了'}]
                )
                return
            }

            if(password != confirmPassWord){
                Alert.alert(
                    '系统提示',
                    '两次密码输入不一致',
                    [{text: '知道了'}]
                )

                return
            }

            // 如果需要验证码
            if(portrait && portrait.phone && !hasCheckSms && enableCheckSms){
                if(!smsCode || smsCode.trim().length < 1){
                    Alert.alert(
                        '系统提示',
                        '验证码不能为空',
                        [{text: '知道了'}]
                    )
                    return
                }

                const {loginUser} = this.props
                const checkSmsCode = await verifySmsCode({
                    phone: portrait.phone,
                    companyId: loginUser.companyId,
                    code: smsCode
                });
                if(checkSmsCode.code != '6000' || checkSmsCode.data != true){
                    Alert.alert(
                        '系统提示',
                        '验证码错误',
                        [{text: '知道了'}]
                    )
                    this.setState({
                        hasCheckSms: false
                    })
                    return
                }else{
                    this.setState({
                        hasCheckSms: true
                    })
                }
            }
        }

        let invalidStaffs = staffs.filter(x => x.id);
        if (invalidStaffs.length == 0) {
            showMessage(Msg.noStaffs);
            return;
        }

        this.paymentModal.showModal();
    }

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
        )
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

        const {showSimType, password, confirmPassWord} = this.state
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
            if(password != confirmPassWord){ // 第二次输入密码与第一次不同，则清空第一次的确认密码
                this.setState({
                    password: value,
                    confirmPassWord: '',
                    showSimKeyboard: false
                })
            }else{
                this.setState({
                    password: value,
                    showSimKeyboard: false
                })
            }
        }
    }

    // 输入密码
    onKeyBoardCancel = value => {
        this.setState({
            showSimKeyboard: false
        })
    }

    // 获取验证码
    getSmsCode = ()=>{
        // 开启倒计时
        this.setState({
            hasCheckSms: false
        })

        // 获取验证码
        const {portrait} = this.state
        const {loginUser} = this.props
        sendSmsCode({
            phone: portrait.phone,
            companyId: loginUser.companyId
        }).then(backData=>{
            const {code, data} = backData
            if(code == '6000'){
                showMessageExt("验证码发送成功")
            }else{
                showMessageExt("验证码发送失败")
            }
        }).catch(e=>{
            showMessageExt("验证码发送失败")
        })
    }

    // 输入验证码
    changeSmsCode = value=>{
        // 更新状态
        this.setState({
            smsCode: pickNumber(value),
            hasCheckSms: false
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
        const {portrait, tabIndex, showSimKeyboard, showSimType, password, confirmPassWord, smsCode, enableCheckSms} = this.state;
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
                                portrait={portrait}
                                enableCheckSms={enableCheckSms}
                                smsCode={smsCode}
                                changeSmsCode={this.changeSmsCode.bind(this)}
                                getSmsCode={this.getSmsCode.bind(this)}
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
        operateUser: state.auth.userInfo.staffId,
        loginUser: state.auth.userInfo,
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
