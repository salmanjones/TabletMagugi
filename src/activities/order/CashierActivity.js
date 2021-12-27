//libs
import React from 'react';
import {connect} from 'react-redux';
import {FlatList, Image, ImageBackground, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {
    CardSelectBox,
    FlatListFooter,
    HeadeOrderInfoRight,
    MemberListItem,
    MemberWaitListItem,
    ModalLoadingIndicator,
    SearchModule,
} from '../../components';
import {getImage, ImageQutity, ListStatus, PixelUtil} from '../../utils';

import {
    fetchMemberCardList,
    fetchWaitingMembersCardResult,
    fetchWaitingMembersResult,
    getCompanyAutoFlowNumber,
    selectStaffAclInfoResult
} from '../../services';
import {cashierBillingFlowNumberInitAction, getMemberInfoAction, resetMemberAction} from '../../actions';

//self
import {cashierStyles, memberIdentifyStyle} from '../../styles';
import { showMessage } from '../../utils';
import {AppNavigate} from "../../navigators";

const defaultMemberImg = 'https://pic.magugi.com/rotate-portrait.png';

class CashierView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputOrderBg: BaseData.inputOrderBg,
            flownumBg: BaseData.radioImageActive,
            handnumBg: BaseData.radioImage,
            numType: 'flownum',
            numValue: '',
            numPlaceHolder: '请输入水单号',
            searchStart: false,
            memberList: [],
            memberCardList: [],
            query: '',
            member: null,
            roundMode: 2,
            moduleCode: 0,
            loading: false,
            isBillingPageShow: false,

            cardCount: 0,
            cardBalanceCount: 0.00,
        };
        this.timer;
        this.timerFlag = 0;
        this.pressFlag = "0";
        this.userImgUrl = '';
        this.isOldCustomer = '0';
    }

    /**
     * 第一次渲染后调用
     */
    componentDidMount() {
        this.selectWaitingMemberResult();
        this.timer = setInterval(this.selectWaitingMemberResult.bind(this), 5000);
        this.timerFlag = 1;

        let {route, navigation} = this.props
        navigation.setOptions({
            headerRight: () =>  (
                <HeadeOrderInfoRight navigation={navigation} router={route}  from="recharge"/>
            )
        })
    }

    componentWillMount() {
        // this.subscribeDidFocus = this.props.navigation.addListener('didFocus', () => {
        //     this.setState({numValue:''})
        // });

        this.props.initOrderFlowNumber();
    }

    componentWillReceiveProps(props) {
        let refreshTag = props.orderFlowNmberRefreshTag;
        if (refreshTag) {
            this.initNumValueData();
        }

        if (props.clearData) {
            this.setState({member: null});
            this.props.reset();
        }

        let routeName = "" // this.props.nav.routes.slice(-1)[0].routeName
        if (routeName == 'CashierBillingActivity') {
            this.timerFlag = 0;
            this.isOldCustomer = '0';
        }

        //是当前页面
        if (this.timerFlag == 0 && this.timer == 0 && routeName == 'CashierActivity') {
            this.timer = setInterval(this.selectWaitingMemberResult.bind(this), 5000);
            this.pressFlag = '0';
            this.setState({
                member: null,
                loading: false,
                isBillingPageShow: false,

                inputOrderBg: BaseData.inputOrderBg,
                flownumBg: BaseData.radioImageActive,
                handnumBg: BaseData.radioImage,
                numType: 'flownum',
                searchStart: false,

            });
        }

    }

    /**
     * 执行完成后卸载组建
     */
    componentWillUnmount() {
        this.timer && this.timer != 0 && clearInterval(this.timer);
    }

    initNumValueData() {
        let that = this;
        getCompanyAutoFlowNumber()
            .then((o) => {
                if (o.data!=null || o.data!=undefined ) {
                    that.setState({
                        numValue: o.data
                    });
                }
            })
            .catch((err) => {
            })
            .finally(() => {
                this.props.resetFlowNumberRefreshTag();
            });
    }

    inputBgChange(type) {
        if ('in' == type) {
            this.setState((prestate, props) => {
                return {...prestate, inputOrderBg: BaseData.inputOrderBgActive};
            });
        } else {
            this.setState((prestate, props) => {
                return {...prestate, inputOrderBg: BaseData.inputOrderBg};
            });
        }
    }

    inputValueChange(value) {
        this.setState((prestate, props) => {
            let numberType = prestate.numType;
            let oldValue = prestate.numValue;
            let inPutValue = value.replace(oldValue, '');

            let currValue = '';
            if (oldValue.length > value.length) {
                currValue = value;
            } else {
                if (!/\d/.test(inPutValue)) {
                    inPutValue = '';
                }

                if (numberType == 'flownum') {
                    if (oldValue.length >= 45) {
                        inPutValue = '';
                    }
                } else {
                    if (oldValue.length >= 3) {
                        inPutValue = '';
                    }
                }
                currValue = oldValue + inPutValue;
            }

            return {...prestate, numValue: currValue};
        });
    }

    swipOrderNum(type) {
        let numType = 'flownum';
        let flownumBg = BaseData.radioImageActive;
        let handnumBg = BaseData.radioImage;
        let numtips = '请输入水单号';
        if ('handnum' == type) {
            numType = 'handnum';
            flownumBg = BaseData.radioImage;
            handnumBg = BaseData.radioImageActive;
            numtips = '请输入手牌号';
        }

        this.setState((prestate, props) => {
            return {
                ...prestate,
                numType: numType,
                flownumBg: flownumBg,
                handnumBg: handnumBg,
                numValue: '',
                numPlaceHolder: numtips,
            };
        });
    }

    createOrder(type, deptId, operatorId, operatorText) {

        if(this.state.numType=='flownum' && !this.state.numValue) {
            showMessage('请输入水单号');
            return;
        }

        this.selectStaffAclInfoResult(type, deptId, operatorId, operatorText);
    }

    queryData = query => {
        if (query !== '') {
            this.setState({
                searchStart: true,
                member: null,
                query,
                isBillingPageShow: false,
            });
            this.props.fetchMemberInfo(query, false, false);
        }
    };

    resetData = query => {
        this.setState({
            searchStart: false,
            member: null,
            isBillingPageShow: false
        });
    };

    freshData = query => {
        this.setState({
            searchStart: false
        });

        this.selectWaitingMemberResult();
    };

    loadMore = () => {
        if (
            this.state.searchStart &&
            this.props.pageNext &&
            this.props.listState !== ListStatus.loading
        ) {
            this.props.fetchMemberInfo(this.state.query, false, true);
        }
    };

    renderWaitMemberItem = e => {
        let memberId = -1;
        this.state.member && (
            memberId = this.state.member.id
        )
        return (
            <MemberWaitListItem
                selected={memberId === e.item.id}
                data={e.item}
                onPress={this.onMemberPress}
                isShowReserve={e.item.reserveStatus === '0' ? true : false}
            />
        );
    };

    renderMemberListItem = e => {
        let memberId = -1;
        this.state.member && (
            memberId = this.state.member.id
        )
        return (
            <MemberListItem
                selected={memberId === e.item.id}
                data={e.item}
                onPress={this.onMemberPress}
                isShowReserve={e.item.reserveStatus === '0' ? true : false}
            />
        );
    };

    onMemberPress = member => {
        let memberId = -1;
        this.state.member && (
            memberId = this.state.member.id
        )

        if (memberId == member.id) {
            this.setState({
                member: null,
                isBillingPageShow: false
            });

            this.pressFlag = "1";
            this.props.onMemberPress && this.props.onMemberPress(member);
        } else {
            member.vipStorageCardList = null;

            this.setState({
                loading: true
            });

            this.userImgUrl = getImage(
                member.imgUrl,
                ImageQutity.member_small,
                defaultMemberImg
            );

            this.selectMemberCardListResult(member);
        }

    };

    onMemberNullPress = member => {
    };

    render() {
        let userInfo = this.props.auth.userInfo;
        let isSynthesis = userInfo.isSynthesis; //0专业店 1综合店
        let operatorCategorys = userInfo.operateCategory;

        const {
            list,
            pageSize,
            listState,
        } = this.props;
        const {searchStart, member, memberList, isBillingPageShow, cardCount, cardBalanceCount} = this.state;

        return (
            <View style={[cashierStyles.container, cashierStyles.openOrderContainer]}>
                {/*左侧样式*/}
                <View style={memberIdentifyStyle.Box}>
                    <SearchModule
                        placeholder={'手机号、姓名或会员号'}
                        onSearchPress={this.queryData}
                        onResetPress={this.resetData}
                        wrapperStyle={memberIdentifyStyle.MemberQueryBoxLeft}
                    />

                    {!searchStart && (
                        <View style={{height: '87%'}}>
                            <View style={memberIdentifyStyle.waitTextBox}>
                                <Text style={memberIdentifyStyle.waitText}>当前等待的顾客:</Text>
                                <TouchableOpacity style={memberIdentifyStyle.waitTextBoxImg} onPress={this.freshData}>
                                    <Image resizeMethod="resize" source={require('@imgPath/refresh_icon.png')}
                                           style={memberIdentifyStyle.waitRefreshTextImage}/>
                                    <Text style={memberIdentifyStyle.waitRefreshText}>刷新</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={memberList}
                                extraData={member}
                                keyExtractor={item => item.id}
                                renderItem={this.renderWaitMemberItem}
                            />
                        </View>
                    )}
                    {searchStart && (
                        <View style={{height: '87%'}}>
                            <FlatList
                                data={list}
                                keyExtractor={item => item.id}
                                initialNumToRender={pageSize}
                                extraData={member}
                                renderItem={this.renderMemberListItem}
                                onEndReached={this.loadMore}
                                ListFooterComponent={
                                    <FlatListFooter
                                        state={listState}
                                        pageSize={pageSize}
                                        onRefresh={this.loadMore}
                                        itemCount={list.length}
                                    />
                                }
                                onEndReachedThreshold={0.1}
                            />

                        </View>
                    )}
                </View>

                {/*未查询样式*/}
                {!isBillingPageShow && (
                    <View style={[cashierStyles.openOrderBox]}>
                        <View style={cashierStyles.openOrderlist}>
                            <ImageBackground
                                source={this.state.inputOrderBg}
                                style={cashierStyles.inputBox}
                            >
                                <TextInput
                                    placeholder={this.state.numPlaceHolder}
                                    underlineColorAndroid="transparent"
                                    style={cashierStyles.input}
                                    keyboardType="phone-pad"
                                    onFocus={this.inputBgChange.bind(this, 'in')}
                                    onBlur={this.inputBgChange.bind(this, 'out')}
                                    onChangeText={this.inputValueChange.bind(this)}
                                    value={this.state.numValue}
                                />
                            </ImageBackground>
                            <View style={cashierStyles.radioBox}>
                                <TouchableOpacity
                                    style={[cashierStyles.radio, {marginRight: PixelUtil.size(80)}]}
                                    onPress={this.swipOrderNum.bind(this, 'flownum')}
                                >
                                    <Image resizeMethod="resize"
                                           source={this.state.flownumBg}
                                           style={cashierStyles.radioImg}
                                    />
                                    <Text style={cashierStyles.radioText}>水单号</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={cashierStyles.radio}
                                    onPress={this.swipOrderNum.bind(this, 'handnum')}
                                >
                                    <Image resizeMethod="resize"
                                           source={this.state.handnumBg}
                                           style={cashierStyles.radioImg}
                                    />
                                    <Text style={cashierStyles.radioText}>手牌号</Text>
                                </TouchableOpacity>
                            </View>
                            <CategoryViews categorys={operatorCategorys}
                                           isSynthesis={isSynthesis}
                                           isBillingPageShow={isBillingPageShow}
                                           createOrder={this.createOrder.bind(this)}
                                           isLoading={this.state.loading}/>
                        </View>
                    </View>
                )}

                {/*已查询样式*/}
                {isBillingPageShow && (
                    <View style={cashierStyles.openOrderBox}>
                        {/*右侧上方样式*/}
                        <View style={cashierStyles.openOrderRightBox}>
                            <View style={cashierStyles.rightSearchBox}>
                                <View style={cashierStyles.radioBoxHas}>
                                    <TouchableOpacity
                                        style={[cashierStyles.radio, {marginRight: PixelUtil.size(40)}]}
                                        onPress={this.swipOrderNum.bind(this, 'flownum')}>
                                        <Image resizeMethod="resize"
                                               source={this.state.flownumBg}
                                               style={cashierStyles.radioImg}/>
                                        <Text style={cashierStyles.radioText}>水单号</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={cashierStyles.radio}
                                        onPress={this.swipOrderNum.bind(this, 'handnum')}>
                                        <Image resizeMethod="resize"
                                               source={this.state.handnumBg}
                                               style={cashierStyles.radioImg}/>
                                        <Text style={cashierStyles.radioText}>手牌号</Text>
                                    </TouchableOpacity>
                                </View>
                                <ImageBackground
                                    source={this.state.inputOrderBg}
                                    style={cashierStyles.inputBoxSmall}
                                    resizeMode={'contain'}>
                                    <TextInput
                                        placeholder={this.state.numPlaceHolder}
                                        underlineColorAndroid="transparent"
                                        style={cashierStyles.inputSmall}
                                        keyboardType="phone-pad"
                                        onFocus={this.inputBgChange.bind(this, 'in')}
                                        onBlur={this.inputBgChange.bind(this, 'out')}
                                        onChangeText={this.inputValueChange.bind(this)}
                                        value={this.state.numValue}/>
                                </ImageBackground>
                            </View>
                            <CategoryViews
                                categorys={operatorCategorys}
                                isSynthesis={isSynthesis}
                                isBillingPageShow={isBillingPageShow}
                                createOrder={this.createOrder.bind(this)}
                                isLoading={this.state.loading}/>
                        </View>
                        {/*右侧会员信息样式*/}
                        <View style={cashierStyles.memberItemBox}>
                            <View style={cashierStyles.memberInfoBox}>
                                <View style={cashierStyles.memberInfoLi}>
                                    <Image resizeMethod="resize" source={this.userImgUrl} style={cashierStyles.memberAvatarImg}/>
                                    <View style={cashierStyles.memberBaseInfo}>
                                        <View style={[cashierStyles.memberUserBase, cashierStyles.marginBottom10]}>
                                            {
                                                (member.name == '' || member.name == '散客' || member.name == null) ?
                                                    <Text style={cashierStyles.nameText}>手机尾号:{(member == undefined || member.phone == undefined || member.phone == '') ? "" : member.phone.substr(7)}</Text>
                                                    :
                                                    <Text style={cashierStyles.nameText} numberOfLines={1}>{member.name}</Text>
                                            }

                                            {member.sex == 0 ?
                                                <Image resizeMethod="resize" source={require('@imgPath/sex_female.png')} style={cashierStyles.MemberListSexImage}/>
                                                :
                                                <Image resizeMethod="resize" source={require('@imgPath/sex_man.png')} style={cashierStyles.MemberListSexImage}/>
                                            }

                                        </View>
                                        {member.memberType == 0 ?
                                            <Text style={cashierStyles.memberVipNum}>会员 {member.memberCardNo}</Text>
                                            :
                                            <Text style={cashierStyles.memberVipNum}>散客 {member.memberCardNo}</Text>
                                        }
                                    </View>
                                </View>
                                <View style={cashierStyles.memberNumInfo}>
                                    <Text style={[cashierStyles.memberVipNum, cashierStyles.marginBottom10]}>{member.phone}</Text>
                                    <Text style={cashierStyles.memberVipNum}>会员卡{cardCount}张</Text>
                                </View>
                                <View style={cashierStyles.memberOtherInfo}>
                                    <View style={[cashierStyles.appointmentImage, cashierStyles.marginBottom10]}>
                                        {member.reserveStatus === '0' && (
                                            <Image resizeMethod="resize" source={require('@imgPath/appointment_img.png')} style={cashierStyles.appointmentImage}/>
                                        )}
                                    </View>
                                    <Text style={cashierStyles.memberVipNum}>储值卡余额 ¥{cardBalanceCount}</Text>
                                </View>
                            </View>
                        </View>
                        {/*右侧会员卡样式*/}
                        <View style={cashierStyles.memberCardListBox}>
                            <CardSelectBox
                                searchStart={true}
                                showRecharge={true}
                                showTab={false}
                                showCardDetailInfo={true}
                                member={member}/>
                        </View>
                    </View>
                )}
            </View>
        );
    }

    selectWaitingMemberResult = () => {
        if (!this.state.searchStart) {
            let storeId = this.props.auth.userInfo.storeId;
            let showCard = '0';
            var self = this;
            fetchWaitingMembersResult(storeId, showCard)
                .then(data => {
                    self.setState(
                        {
                            memberList: data.data,
                            loading: false
                        }
                    );

                }).catch(err => {
                self.setState({
                    memberList: []
                })
            });
        }
    };

    selectMemberCardListResult = (member) => {
        var that = this;
        var memberId = member.id;
        var cardCount = 0;
        var cardBalanceCount = 0.00;

        fetchMemberCardList(memberId)
            .then(data => {
                var cardMap = data.data;

                var isOldCustomer = cardMap.isOldCustomer;
                var cardCount = cardMap.cardCount;
                var cardBalanceCount = cardMap.cardBalanceCount;
                member.vipStorageCardList = cardMap.vipStorageCardList;
                member.cardBalanceCount = cardBalanceCount;
                member.cardCount = cardCount;
                member.userImgUrl = that.userImgUrl;

                that.setState(
                    {
                        cardCount: cardCount,
                        cardBalanceCount: cardBalanceCount,
                        member: member,
                        loading: false,
                        isBillingPageShow: true
                    }
                );

                that.isOldCustomer = isOldCustomer;
                that.pressFlag = "1";
                that.props.onMemberPress && that.props.onMemberPress(member);

            }).catch(err => {
            that.setState(
                {
                    cardCount: cardCount,
                    cardBalanceCount: cardBalanceCount,
                    member: member,
                    loading: false,
                    isBillingPageShow: true
                }
            );

            that.pressFlag = "1";
            that.props.onMemberPress && that.props.onMemberPress(member);
        });
    };

    selectStaffAclInfoResult = (type, deptId, operatorId, operatorText) => {
        let staffId = this.props.auth.userInfo.staffId;
        let companyId = this.props.auth.userInfo.companyId;
        var self = this;

        selectStaffAclInfoResult(staffId, companyId)
            .then(data => {
                var resultMap = data.data;
                var staffAclMap = resultMap.staffAclMap;

                var moduleCodeIndex = 0;
                if (staffAclMap && staffAclMap.moduleCode) {
                    var moduleCode = staffAclMap.moduleCode;

                    if (moduleCode == 'ncashier_billing_price_adjustment') {
                        moduleCodeIndex++;
                    }
                }

                if (moduleCodeIndex > 0) {
                    self.setState(
                        {
                            moduleCode: "1",
                            roundMode: resultMap.roundMode,
                        }
                    );
                } else {
                    self.setState(
                        {
                            moduleCode: "0",
                            roundMode: resultMap.roundMode,
                        }
                    );
                }

                let memberInfoCache = self.state.member;
                let userInfo = self.props.auth.userInfo;
                let params = {
                    companyId: userInfo.companyId,
                    storeId: userInfo.storeId,
                    deptId: deptId,
                    operatorId: operatorId, //主营id
                    operatorText: operatorText,
                    staffId: userInfo.staffId,
                    staffDBId: userInfo.staffDBId,
                    isSynthesis: userInfo.isSynthesis, //是否综合店
                    numType: self.state.numType, //单号类型
                    numValue: self.state.numValue, //单号
                    page: 'cashier',
                    member: memberInfoCache,
                    type: 'vip',
                    roundMode: self.state.roundMode,
                    moduleCode: self.state.moduleCode,
                    isOldCustomer: self.isOldCustomer,
                };

                var handNumber = '';
                if(self.state.numType == 'handnum'){
                    handNumber = self.state.numValue;
                }

                let paramsLeftData = {
                    customerNumber: '1', //单号
                    isOldCustomer: self.isOldCustomer,
                    handNumber: handNumber,
                };

                clearInterval(self.timer);
                self.timer = 0;
                self.timerFlag = 1;

                //选择的顾客信息
                if (self.pressFlag == "1") {
                    self.setState({
                        loading: true
                    });
                    params.orderInfoLeftData = paramsLeftData;
                    params.isShowReserve = memberInfoCache.reserveStatus === '0' ? true : false;
                    self.selectWaitingMemberCardResult(params);
                } else {
                    //散客
                    // self.props.navigation.navigate('CashierBillingActivity', params);
                    self.props.navigation.navigate('CashierBillingActivity', {
                        orderInfoLeftData: paramsLeftData,

                        companyId: userInfo.companyId,
                        storeId: userInfo.storeId,
                        deptId: deptId,
                        operatorId: operatorId, //主营id
                        operatorText: operatorText,
                        staffId: userInfo.staffId,
                        staffDBId: userInfo.staffDBId,
                        isSynthesis: userInfo.isSynthesis, //是否综合店
                        numType: self.state.numType, //单号类型
                        numValue: self.state.numValue, //单号
                        page: 'cashier',
                        member: memberInfoCache,
                        type: 'vip',
                        roundMode: self.state.roundMode,
                        moduleCode: self.state.moduleCode,
                        isOldCustomer: self.isOldCustomer,
                    });

                    self.setState({
                        member: null,
                    });

                }
            }).catch(err => {
            self.setState(
                {
                    moduleCode: "0",
                    roundMode: "2",
                    loading: true
                }
            );
        });
    };

    selectWaitingMemberCardResult = (params) => {
        if (this.state.member) {
            let storeId = this.props.auth.userInfo.storeId;
            let customerId = this.state.member.id;
            let companyId = params.companyId;
            var self = this;
            fetchWaitingMembersCardResult(storeId, customerId, companyId)
                .then(data => {
                    self.setState({
                        loading: false
                    });

                    if (data.data.vipStorageCardList) {
                        params.member.vipStorageCardList = data.data.vipStorageCardList;
                    } else {
                        params.member.vipStorageCardList = [];
                    }
                    AppNavigate.navigate('CashierBillingActivity', params);

                    this.setState({
                        member: null,
                        isBillingPageShow: false
                    });

                }).catch(err => {
                self.setState({
                    memberCardList: [],
                    loading: false
                })
            });
        } else {
            this.setState({
                loading: false
            });

            AppNavigate.navigate('CashierBillingActivity', params);
        }
    };
}

const BaseData = {
    inputOrderBg: require('@imgPath/input.png'),
    inputOrderBgActive: require('@imgPath/input-active.png'),
    radioImage: require('@imgPath/radio.png'),
    radioImageActive: require('@imgPath/radio-active.png'),
};

//主营分类
const CategoryViews = props => {
    var categorys = props.categorys;
    var isSynthesis = props.isSynthesis; //0专业店 1综合店
    var isLoading = props.isLoading;

    if (isSynthesis == '0') {
        let totalSize = categorys.length;
        return (
            <View style={cashierStyles.orderGenreBox}>
                {categorys.map((item, index) => {
                    let deptId = item.deptId;
                    let operatorId = item.value;
                    let operatorText = item.text;
                    let operatorStyle = [cashierStyles.orderGenre];
                    let operatorType = 'hair';
                    let operatorImg = require('@imgPath/hairdresser.png');
                    let operatorImgStyle = cashierStyles.orderGenreImg;

                    if (operatorText == '美发') {
                        operatorImg = require('@imgPath/hairdresser.png');
                        operatorType = 'hair';
                    } else if (operatorText == '美容') {
                        operatorImg = require('@imgPath/beautify.png');
                        operatorType = 'face';
                    } else if (operatorText == '美甲') {
                        operatorImg = require('@imgPath/manicure.png');
                        operatorType = 'finger';
                    }

                    if (totalSize == 1) {
                        operatorText = '开单';
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            style={operatorStyle}
                            onPress={() => {
                                props.createOrder(
                                    operatorType,
                                    deptId,
                                    operatorId,
                                    operatorText
                                )
                            }}>
                            <Image resizeMethod="resize" source={operatorImg} style={operatorImgStyle}/>
                            <Text style={cashierStyles.orderGenreText}>{operatorText}</Text>
                            <ModalLoadingIndicator loading={isLoading}/>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    } else {
        let deptId = '-1';
        let operatorId = '-1';
        if (categorys && categorys.length > 0) {
            deptId = categorys[0].deptId;
            operatorId = categorys[0].value;
        }

        let operatorText = '开单';
        let operatorType = 'hair';
        let operatorImg = require('@imgPath/billing_icon.png');
        let operatorImgStyle = cashierStyles.orderGenreBilling;

        return (
            <View style={cashierStyles.orderGenreBox}>
                <TouchableOpacity
                    style={cashierStyles.orderGenre}
                    onPress={() => {
                        props.createOrder(
                            operatorType,
                            deptId,
                            operatorId,
                            operatorText
                        )
                    }}
                >
                    <Image resizeMethod="resize" source={operatorImg} style={operatorImgStyle}/>
                    <Text style={cashierStyles.orderGenreText}>{operatorText}</Text>
                    <ModalLoadingIndicator loading={isLoading}/>
                </TouchableOpacity>
            </View>
        );
    }
};

//mapping props
const mapStateToProps = state => {
    const {memberIdentify} = state.component;
    return {
        auth: state.auth,
        orderFlowNmberRefreshTag: state.billingOrder.orderFlowNmberRefreshTag,
        list: memberIdentify.list,
        pageNext: memberIdentify.pageNext,
        pageSize: memberIdentify.pageSize,
        listState: memberIdentify.listState
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        initOrderFlowNumber: () => {
            dispatch(cashierBillingFlowNumberInitAction(true))
        },
        fetchMemberInfo: (query, cardInfoFlag, ql) => {
            dispatch(getMemberInfoAction(query, cardInfoFlag, ql))
        },
        reset: () => {
            dispatch(resetMemberAction())
        },
        resetFlowNumberRefreshTag: () => {
            dispatch(cashierBillingFlowNumberInitAction(false))
        }
    };
};

export const CashierActivity = connect(mapStateToProps, mapDispatchToProps)(
    CashierView
);
