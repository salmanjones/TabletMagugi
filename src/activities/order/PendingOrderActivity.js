import React from 'react';
import {connect} from 'react-redux';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native/';
import {bindActionCreators} from 'redux';
import {PendingOrderItem, PendingOrderSummary, SearchModule} from '../../components';
import {getPendingListAction} from '../../actions';
import {cashierStyles, pendingStyles} from '../../styles';
import {PixelUtil, showMessage} from '../../utils';
import {CheckBox} from 'react-native-elements';
import {AppNavigate} from "../../navigators";
import Spinner from "react-native-loading-spinner-overlay";

const SwiperContainer = styled.View`
  flex: 1;
`;
const ImageNoContent = styled.Image`
  width: ${PixelUtil.rect(572, 594).width};
  height: ${PixelUtil.rect(572, 594).height};
`;
const NoContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 0.5%
`;

class PendingOrder extends React.Component {
    constructor(props) {
        super(props);
        this.getSwiperDataSource = this.getSwiperDataSource.bind(this);
        this.state = {
            isMergePay: false,
            selectedBillings: [],
        };

        this.lockTimeId = null
    }

    loadData = (forceLoad) => {
        if (!forceLoad && new Date() - this.lastRefreshTime <= 15000) {
            return;
        }

        const self = this;
        const {getPendingList} = this.props;
        getPendingList('').then(res => {
            self.lastRefreshTime = new Date();
            this.setState({isMergePay: false, selectedBillings: []});
        });
    };

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.loadData(true);
        });

        // 每6S刷新列表
        this.clearLockTimer()
        this.lockTimeId = setInterval(()=>{
            const self = this;
            const {getPendingList} = this.props;
            getPendingList('', '', true).then(res => {
                self.lastRefreshTime = new Date();
            });
        }, 1000 * 6)
    }

    componentWillUnmount() {
        this.clearLockTimer()
        this._unsubscribe();
        this.props.reset && this.props.reset();
    }

    clearLockTimer(){
        // 每10S刷新列表
        this.lockTimeId && clearInterval(this.lockTimeId)
        this.lockTimeId = null
    }

    getSwiperDataSource(list) {
        let groupedList = [];
        for (let i = 0, len = list.length; i < len; i += 8) {
            groupedList.push(list.slice(i, i + 8));
        }
        return groupedList;
    }

    onItemSelected = item => {
        if (this.state.isMergePay) {
            let itemIndex = this.state.selectedBillings.indexOf(item);
            if (itemIndex == -1) {
                if (this.state.selectedBillings.length < 5)
                    this.state.selectedBillings.push(item);
            } else this.state.selectedBillings.splice(itemIndex, 1);

            this.setState({
                selectedBillings: [...this.state.selectedBillings],
            });
        } else {
            this.goOrder(item);
        }
    };

    goOrder = billing => {
        AppNavigate.navigate('CashierBillingActivity', {
            billing: billing,
            page: 'pendingOrder',
        });
    };

    goToMergePay = () => {
        if (!this.state.selectedBillings || this.state.selectedBillings.length < 2) {
            showMessage('请选择至少两个订单');
            return;
        }

        let billingIds = this.state.selectedBillings.map(billing => billing.id).join();
        AppNavigate.navigate('MergeOrderPayActivity', {
            billingIds: billingIds,
        });
    };

    changeType = () => {
        this.setState({
            isMergePay: !this.state.isMergePay,
            selectedBillings: [],
        });
    };

    render() {
        const {list, isLoading, rights} = this.props;
        const {isMergePay, selectedBillings} = this.state;
        const groupList = this.getSwiperDataSource(list);

        return (
            <View style={cashierStyles.container}>
                <Spinner
                    visible={isLoading}
                    textContent={'加载中'}
                    textStyle={{
                        color: '#FFF'
                    }}
                />
                <View style={pendingStyles.singleBoxTop}>
                    <View>
                        <SearchModule
                            placeholder={'水单号、手牌号或手机号'}
                            keyboardType={'numeric'}
                            onSearchPress={text => {
                                this.setState({isMergePay: false, selectedBillings: []});
                                this.props.getPendingList(text);
                            }}
                        />
                    </View>
                    <View style={pendingStyles.singlePayment}>
                        {rights && rights.hasMergePayRights && <CheckBox
                            title="并单支付"
                            iconType="materialdesignicons"
                            checkedIcon="check-box"
                            uncheckedIcon="check-box-outline-blank"
                            containerStyle={pendingStyles.settingCheckBox}
                            textStyle={pendingStyles.rotateModalText}
                            checkedColor={'#111c3c'}
                            uncheckedColor={'#999'}
                            checked={isMergePay}
                            onPress={this.changeType}
                        />}
                        {isMergePay && (
                            <TouchableOpacity underlayColor="transparent" style={pendingStyles.settlementBtnBox} onPress={() => this.goToMergePay()}>
                                <Text style={pendingStyles.settlementBtnText}>结算</Text>
                                <Text style={pendingStyles.settlementBtnText}>({selectedBillings.length}单)</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                {!isLoading && groupList.length > 0 && (
                    <SwiperContainer>
                        <PendingOrderSummary count={list.length}/>
                        <Swiper style={pendingStyles.singleBox} showsButtons={true} loop={false} paginationStyle={{display: 'none'}}>
                            {groupList.map((item, index) => (
                                <View style={pendingStyles.swiperList} key={index}>
                                    {item.map(dItem => {
                                        const isSelected = selectedBillings.indexOf(dItem) !== -1;
                                        return (
                                            <PendingOrderItem
                                                onPress={() => {
                                                    if (dItem.lockState != '4') {
                                                        this.onItemSelected(dItem)
                                                    } else {
                                                        Alert.alert('支付中，不能修改')
                                                    }
                                                }}
                                                flowNumber={dItem.flowNumber}
                                                name={dItem.name}
                                                keyNumber={dItem.keyNumber}
                                                timeCount={dItem.timeCount}
                                                phone={dItem.phone}
                                                totalPrice={dItem.totalPrice}
                                                createTime={dItem.createTime}
                                                key={dItem.flowNumber}
                                                showCheckBox={isMergePay}
                                                isSelected={isSelected}
                                                staffName={dItem.staffName}
                                                payWay={dItem.payWay}
                                                lockState={dItem.lockState}
                                                lockStartTime={dItem.lockStartTime}
                                            />
                                        );
                                    })}
                                </View>
                            ))}
                        </Swiper>
                    </SwiperContainer>
                )}

                {!isLoading && groupList.length == 0 && (
                    <NoContentContainer>
                        <ImageNoContent source={require('@imgPath/no-content.png')} resizeMode={'contain'}/>
                    </NoContentContainer>
                )}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        list: state.pending.list,
        isLoading: state.pending.loading,
        rights: state.pending.rights
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getPendingList: getPendingListAction,
        },
        dispatch
    );

export const PendingOrderActivity = connect(
    mapStateToProps,
    mapDispatchToProps
)(PendingOrder);
