//libs
import React from 'react';
import {connect} from 'react-redux';
import {InteractionManager, View} from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native/';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {PixelUtil, showMessage, throttle} from '../../utils';

import {DatepickerBox, PendingOrderItem, SearchModule,} from '../../components';
import {getBillingListAction, resetBillingListAction} from '../../actions';
import {cashierStyles, pendingStyles} from '../../styles';
import {AppNavigate} from "../../navigators";
import Spinner from "react-native-loading-spinner-overlay";

const CURRENT_TAB_INDEX = 1;

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
`;

//self

class BillManageOtherView extends React.Component {
    constructor(props) {
        super(props);
        this.getSwiperDataSource = this.getSwiperDataSource.bind(this);
        this.goOrder = throttle(this.goOrder, 600);
    }

    loadData = () => {
        if (this.state && new Date() - this.state.lastRefreshTime <= 15000) {
            return;
        }
        const {getBillingList} = this.props;
        getBillingList({
            flowNumber: '',
            selectTime: this.state.selectTime,
            billingStatus: '1',
        }).then(res => {
            this.setState({lastRefreshTime: new Date()});
        });
    };

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.navigation.setParams({loadData: this.loadData});
            const formatNowTime = moment().format('YYYY-MM-DD');
            this.setState({selectTime: formatNowTime}, ()=>{
                this.loadData()
            });
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
        this.props.reset && this.props.reset();
    }

    getSwiperDataSource(list) {
        let groupedList = [];
        for (let i = 0, len = list.length; i < len; i += 8) {
            groupedList.push(list.slice(i, i + 8));
        }
        return groupedList;
    }

    goOrder = billing => {
        AppNavigate.navigate("BillingModifyActivity", {
            billingNo: billing.billingNo
        });

        // this.props.navigation.navigate('BillingModifyActivity', {
        //   billingNo: billing.billingNo,
        // });
    };

    renderItem = item => {
        return (
            <PendingOrderItem
                onPress={() => {
                    if (item.prickStatus != 1) {
                        this.goOrder(item);
                    } else {
                        showMessage('该订单已锁，不能修改');
                    }
                }}
                flowNumber={item.flowNumber}
                name={item.name}
                keyNumber={item.keyNumber}
                timeCount={item.timeCount}
                phone={item.phone}
                totalPrice={item.totalPrice}
                paidIn={item.paidIn}
                createTime={item.createTime}
                key={item.flowNumber}
                billingStatus={item.billingStatus}
                payEndTime={item.payEndTime}
                prickStatus={item.prickStatus}
            />
        );
    };

    render() {
        const {list, isLoading} = this.props;
        const groupList = this.getSwiperDataSource(list);
        const renderItem = this.renderItem;

        return (
            <View style={cashierStyles.container}>
                <Spinner
                    visible={isLoading}
                    textContent={'加载中'}
                    textStyle={{
                        color: '#FFF'
                    }}
                />
                <View
                    style={{
                        flex: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <DatepickerBox
                        onDateChange={date => {
                            this.setState({selectTime: date});
                        }}
                    />
                    <SearchModule
                        keyboardType={'numeric'}
                        onSearchPress={text => {
                            this.props.getBillingList({
                                flowNumber: text,
                                selectTime: this.state.selectTime,
                                billingStatus: '1',
                            });
                            //console.log("selectTime",this.state.selectTime);
                        }}
                    />
                </View>
                {!isLoading && groupList.length > 0 && (
                    <SwiperContainer>
                        <Swiper
                            style={pendingStyles.singleBox}
                            showsButtons={true}
                            loop={false}
                            paginationStyle={{display: 'none'}}
                        >
                            {groupList.map(function (item, index) {
                                return (
                                    <View style={pendingStyles.swiperList} key={index}>
                                        {item.map(function (dItem) {
                                            return renderItem(dItem);
                                        })}
                                    </View>
                                );
                            })}
                        </Swiper>
                    </SwiperContainer>
                )}

                {!isLoading && groupList.length == 0 && (
                    <NoContentContainer>
                        <ImageNoContent
                            source={require('@imgPath/no-content.png')}
                            resizeMode={'contain'}
                        />
                    </NoContentContainer>
                )}
            </View>
        );
    }
}

//mapping props
const mapStateToProps = state => {
    return {
        list: state.billingList.list,
        isLoading: state.billingList.loading,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getBillingList: getBillingListAction,
            reset: resetBillingListAction,
        },
        dispatch
    );

export const BillManageActivity = connect(
    mapStateToProps,
    mapDispatchToProps
)(BillManageOtherView);
