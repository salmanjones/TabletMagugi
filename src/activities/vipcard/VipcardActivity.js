import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';

import { RechargeStoredCardStyles } from 'styles';
import { showMessage } from 'utils';
import {
    StaffServiceBar,
    StaffSelectBox,
    TabGroup,
    VipcardSaleCardList,
    VipcardDetailSection,
    StaffServiceEdit,
    VipcardPayment,
} from 'components';
import {
    vipcardInitAction,
    vipcardSelectCardAction,
    vipcardSetCountAction,
    vipcardSelectStaffAction,
    vipcardSetStaffAction,
} from 'actions';
import { fetchStaffAcl } from 'services';

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
    }

    componentDidMount() {

        const { init, navigation, operateUser } = this.props;
        let aclTxt = 'ncashier_opencard_card_money';
        fetchStaffAcl(aclTxt, operateUser)
            .then(o => {
                if (o.data) {
                    this.acl = o.data;
                } else {
                    this.acl = {};
                }
            })
            .catch(err => {

            });
        InteractionManager.runAfterInteractions(() => {
            init(props.route.params.member || {});
        });
    }

    onTabPress = index => {
        this.setState({
            tabIndex: index,
        });
    };

    onStaffPress = staff => {
        if (this.state.tabIndex !== 2) {
            this.setState({ tabIndex: 2 });
        }
        this.props.selectStaff(staff);
    };

    submitOrder = () => {
        const { card, staffs } = this.props;
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
                        应付：{totalPrice}
                    </Text>
                </View>
                <View style={RechargeStoredCardStyles.PayForBtn}>
                    <TouchableOpacity
                        style={RechargeStoredCardStyles.PayForBtnFinish}
                        onPress={this.submitOrder}
                    >
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
            selectStaff,
            setStaff,
            navigation,
            operateUser,
        } = this.props;

        const { tabIndex } = this.state;
        const editStaff = staffIndex !== -1 ? staffs[staffIndex] : {};

        return (
            <View style={RechargeStoredCardStyles.contentNew}>
                <View style={RechargeStoredCardStyles.openCardTitle}>
                    <View style={RechargeStoredCardStyles.openCardTitleL}>
                        <Text style={RechargeStoredCardStyles.titleText}>会员卡</Text>
                    </View>
                    <View style={RechargeStoredCardStyles.openCardTitleR}>
                        <View style={RechargeStoredCardStyles.openCardTitleRTitle}>
                            <TabGroup
                                selectedIndex={this.state.tabIndex}
                                data={['储值卡', '次卡', '服务人']}
                                onSelected={this.onTabPress}
                            />
                        </View>
                    </View>
                </View>
                <View style={RechargeStoredCardStyles.openContentBox}>
                    <View style={RechargeStoredCardStyles.contentBody}>
                        <View style={RechargeStoredCardStyles.Leftcontent}>
                            <VipcardDetailSection
                                data={card}
                                setCount={setCount}
                                count={count}
                                acl={this.acl}
                            />

                            <StaffServiceBar data={staffs} onSelected={this.onStaffPress} />
                            <View style={RechargeStoredCardStyles.openActiveArea}>
                                <View style={RechargeStoredCardStyles.openActiveAreaL}>
                                    {this.renderTotal(totalPrice)}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={RechargeStoredCardStyles.ShowOpenRightcontent}>
                        <View style={RechargeStoredCardStyles.ShowOpenCardBox}>
                            <View
                                style={{
                                    display: tabIndex !== 2 ? 'flex' : 'none',
                                    flex: 1,
                                }}
                            >
                                <VipcardSaleCardList
                                    cardType={tabIndex == 0 ? 1 : 2}
                                    card={card}
                                    selectCard={selectCard}
                                    setCount={setCount}
                                />
                            </View>

                            <View
                                style={{
                                    display: tabIndex === 2 ? 'flex' : 'none',
                                    flex: 1,
                                }}
                            >
                                <StaffSelectBox
                                    onSelected={setStaff}
                                    clearServicerGridChoose={staffIndex}
                                />
                            </View>
                            {editStaff.id &&
                                tabIndex == 2 && (
                                    <View style={RechargeStoredCardStyles.openActiveArea}>
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
                />

            </View>
        );
    }
}

const mapStateToProps = state => {
    const { vipcard } = state;
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

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            init: vipcardInitAction,
            selectCard: vipcardSelectCardAction,
            setCount: vipcardSetCountAction,
            selectStaff: vipcardSelectStaffAction,
            setStaff: vipcardSetStaffAction,
        },
        dispatch
    );

export const VipcardActivity = connect(mapStateToProps, mapDispatchToProps)(
    VipCard
);
