import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components/native/';
import {
    Alert,
    Image,
    InteractionManager,
    ScrollView,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';

import {CashierBillInfo, HeadeOrderInfoLeft, StaffModifyModal, StockTips,} from '../../components';
import {displayError, getImage, ImageQutity, showMessage, throttle,} from '../../utils';
import {
    CASHIERBILLING_CUSTOMER,
    findBillingDetailAction,
    getBillingListAction,
    resetAction,
    updateCustomerNumberAction,
} from '../../actions';
import {fetchModifyBilling} from '../../services';
import {balanceBillManageStyle, rotateItemStyles} from '../../styles';
import {AppNavigate} from "../../navigators";
import Spinner from "react-native-loading-spinner-overlay";

const ViewContainer = styled.View`
  flex: 1;
`;

export class ConsumeItemDetail extends React.PureComponent {
    render() {
        const {itemInfo, onStaffPress, onConsumePress} = this.props;
        let consumeNumber = itemInfo.consumables
            ? itemInfo.consumables.filter(x => !x.delFlag).length
            : 0;

        return (
            <View style={balanceBillManageStyle.addTypeItem}>
                <View style={balanceBillManageStyle.addTypeItemLi}>
                    <TouchableOpacity style={balanceBillManageStyle.addTypeItemBox}>
                        <View style={balanceBillManageStyle.addTypeItemFirstB}>
                            <Text numberOfLines={2} style={balanceBillManageStyle.typeTitle}>
                                {itemInfo.itemName}
                            </Text>
                            <View style={balanceBillManageStyle.typeBtmNumBox}>
                                <Text style={balanceBillManageStyle.textStyle333}>
                                    {itemInfo.projectConsumeType == 0
                                        ? '实收:￥' + itemInfo.totalPrice
                                        : '扣次:' + itemInfo.consumeTimeAmount + '次'}
                                </Text>
                                <Text style={balanceBillManageStyle.textStyle333}>
                                    x
                                    {itemInfo.service == 0
                                        ? itemInfo.unitType == 1
                                            ? itemInfo.amount + itemInfo.unitLev1
                                            : itemInfo.amount + itemInfo.unit
                                        : itemInfo.amount + '项'}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {itemInfo.assistList.map((staffInfo, staffIndex) => {
                        return (
                            <View key={staffIndex}>
                                {staffInfo.id && (
                                    <TouchableOpacity
                                        style={balanceBillManageStyle.addTypeItemOtherBox}
                                        onPress={() => {
                                            onStaffPress(itemInfo, staffIndex);
                                        }}
                                    >
                                        <View style={balanceBillManageStyle.redactBox}>
                                            <Image resizeMethod="resize"
                                                   source={require('@imgPath/redact-fff-box.png')}
                                                   style={balanceBillManageStyle.redactImg}
                                            />
                                        </View>
                                        <View style={balanceBillManageStyle.addTypeItemOtherB}>
                                            {staffInfo.appoint === 'true' &&
                                                itemInfo.service == 1 && (
                                                    <Image resizeMethod="resize"
                                                           source={require('@imgPath/assign.png')}
                                                           style={balanceBillManageStyle.addTypeAssign}
                                                    />
                                                )}
                                            <View style={balanceBillManageStyle.addSeverImgBox}>
                                                <Image resizeMethod="resize"
                                                       source={getImage(
                                                           staffInfo.showImage,
                                                           ImageQutity.staff,
                                                           require('@imgPath/rotate-portrait.png')
                                                       )}
                                                       style={balanceBillManageStyle.addSeverImg}
                                                />

                                                <View style={balanceBillManageStyle.servicerInfo}>
                                                    <Text style={balanceBillManageStyle.servicerItemText}>
                                                        {staffInfo.value}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={balanceBillManageStyle.infoBox}>
                                                <Text
                                                    style={[
                                                        balanceBillManageStyle.textStyle333,
                                                        balanceBillManageStyle.infoItem,
                                                    ]}
                                                >
                                                    {itemInfo.service == 1
                                                        ? staffInfo.appoint === 'true'
                                                            ? '指定'
                                                            : '非指定'
                                                        : ''}
                                                </Text>
                                                <Text
                                                    style={[
                                                        balanceBillManageStyle.textStyleBox,
                                                        balanceBillManageStyle.infoItem,
                                                    ]}
                                                    numberOfLines={1}
                                                >
                                                    业绩
                                                    {!staffInfo.staffPerformance
                                                        ? ' --'
                                                        : ' ' + staffInfo.staffPerformance}
                                                </Text>
                                                <Text
                                                    style={[
                                                        balanceBillManageStyle.textStyleBox,
                                                        balanceBillManageStyle.infoItem,
                                                    ]}
                                                    numberOfLines={1}
                                                >
                                                    提成
                                                    {!staffInfo.staffWorkfee
                                                        ? ' --'
                                                        : ' ' + staffInfo.staffWorkfee}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                {!staffInfo.id && (
                                    <TouchableOpacity
                                        style={balanceBillManageStyle.addTypeItemBox}
                                        onPress={() => {
                                            onStaffPress(itemInfo, staffIndex);
                                        }}
                                    >
                                        <View style={balanceBillManageStyle.addTypeItemB}>
                                            <Image resizeMethod="resize"
                                                   source={require('@imgPath/add-icon-333.png')}
                                                   style={balanceBillManageStyle.addIconImg}
                                            />
                                            <Text style={balanceBillManageStyle.sevicerText}>
                                                服务人
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    })}
                </View>
                <View style={balanceBillManageStyle.addTypeItemLiOther}>
                    <TouchableOpacity
                        style={[
                            balanceBillManageStyle.addConsumablesItemBox,
                            itemInfo.service != 1 ? {opacity: 0.5} : {},
                        ]}
                        onPress={() => {
                            onConsumePress(itemInfo);
                        }}
                        disabled={itemInfo.service != 1}
                    >
                        {consumeNumber > 0 && (
                            <View style={balanceBillManageStyle.addTypeItemB}>
                                <Text style={balanceBillManageStyle.sevicerTextOther}>
                                    数量：{consumeNumber}
                                </Text>
                            </View>
                        )}
                        {consumeNumber == 0 && (
                            <View style={balanceBillManageStyle.addTypeItemB}>
                                <Image resizeMethod="resize"
                                       source={require('@imgPath/add-icon-333.png')}
                                       style={balanceBillManageStyle.addIconImg}
                                />
                                <Text style={balanceBillManageStyle.sevicerText}>消耗品</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class BillingModify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showBillEditModal: false,
            showStockTips: false,
            isSubmiting: false,
            stockData: [],
        };

        const {navigation} = this.props;
        navigation.setParams({saveBilling: this.saveBilling});

        this.onConsumePress = throttle(this.onConsumePress, 600);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.editFlag != nextProps.editFlag) {
            this.handleBackEvent(nextProps.editFlag);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state == nextState &&
            this.props.loading == nextProps.loading &&
            this.props.orderData == nextProps.orderData
        ) {
            return false;
        }
        return true;
    }

    UNSAFE_componentWillMount() {
        const self = this;
        const {loadData, navigation, dispatch} = this.props;
        const {params} = this.props.route;
        //if(orderData.billingNo) return
        InteractionManager.runAfterInteractions(() => {
            loadData({
                billingNo: params.billingNo,
            }).then(data => {
                if (!(data.status == 1 && data.prickStatus != 1)) {
                    Alert.alert('系统提示', '订单状态异常', [
                        {
                            text: '知道了',
                            onPress: () => {
                                this.props.resetToBillingList();
                            },
                        },
                    ]);
                }

                navigation.setParams({
                    orderInfoLeftData: data,
                    showMemberIcon: false,
                    showModifyBill: function () {
                        this.setState({
                            showBillEditModal: true,
                        });
                    }.bind(this)
                });

                let {route} = self.props
                navigation.setOptions({
                    headerLeft:  () => (
                        <HeadeOrderInfoLeft navigation={navigation} router={route} hiddenPriceOrder={true}/>
                    ),
                    headerRight: () =>  (
                        <TouchableHighlight
                            underlayColor="transparent"
                            onPress={throttle(() => {
                                route.params.saveBilling &&
                                route.params.saveBilling();
                            }, 600)}
                            style={rotateItemStyles.marginRight}
                        >
                            <Text style={rotateItemStyles.rotateText}>保存</Text>
                        </TouchableHighlight>
                    )
                })
            }).catch(err => {
                Alert.alert('系统提示', err.exceptions || '请求单据详情失败', [
                    {
                        text: '知道了',
                        onPress: () => {
                            this.props.resetToBillingList();
                        },
                    },
                ]);
            });
        });
    }

    componentWillUnmount() {
        this.props.reset && this.props.reset();
    }

    handleBackEvent = isAdd => {
        const {navigation} = this.props;
        if (isAdd) {
            navigation.setParams({
                back: () => {
                    Alert.alert('系统提示', '订单尚未保存，你确认要退出吗？', [
                        {
                            text: '退出',
                            onPress: () => {
                                navigation.setParams({back: null});
                                navigation.goBack();
                            },
                        },
                        {
                            text: '取消',
                        },
                    ]);
                },
            });
        } else {
            navigation.setParams({back: null});
        }
    };

    saveBilling = () => {
        let {navigation, resetToBillingList, orderData} = this.props;

        let bmsOrderData = convertToSubmitData(orderData);
        if (bmsOrderData.error) {
            displayError({}, bmsOrderData.error, true);
            return;
        }

        this.setState({isSubmiting: true});

        fetchModifyBilling(bmsOrderData)
            .then(backData => {
                navigation.setParams({back: null});
                showMessage('订单修改成功', false, () => {
                    this.setState({isSubmiting: false});
                    resetToBillingList();
                });
            })
            .catch(err => {
                this.setState({isSubmiting: false});
                if (
                    err.data &&
                    err.data.retStatus == -3 &&
                    err.data.retMsg.indexOf('productName') > 0 &&
                    err.data.retMsg.indexOf('count') > 0
                ) {
                    let stocksData = JSON.parse(err.data.retMsg);
                    this.setState({
                        showStockTips: true,
                        stockData: stocksData,
                    });
                } else {
                    let errCode = err.code || '0';
                    displayError(err, '', errCode != '5002');
                }
            });
    };

    onStaffPress = (itemData, staffIndex) => {
        this.staffModal.show(itemData, staffIndex);
    };

    onConsumePress = itemData => {
        const {orderData, navigation} = this.props;
        navigation.navigate('ConsumableActivity', {
            itemData: itemData,
            orderData: orderData,
        });
    };

    onStockModalClose = () => {
        this.setState({
            showStockTips: false,
        });
    };

    canelOrderEdit = () => {
        this.setState({showBillEditModal: false});
    };

    confirmOrderEdit = orderInfo => {
        this.setState({showBillEditModal: false});
        this.props.navigation.setParams({
            orderInfoLeftData: orderInfo,
        });
        this.props.updateNumber(orderInfo.customerNumber);
        this.props.updateCustomerInfo(orderInfo)
    };

    render() {
        let {orderData, loading, accessRights} = this.props;
        let {
            showBillEditModal,
            isSubmiting,
            showStockTips,
            stockData,
        } = this.state;
        let isLoading = loading || isSubmiting;

        return (
            <ViewContainer>
                <StaffModifyModal
                    ref={ref => {
                        this.staffModal = ref;
                    }}
                />
                {showStockTips && (
                    <StockTips
                        visible={showStockTips}
                        stockData={stockData}
                        caption={'以下产品的库存数量不足，无法保存！'}
                        onClose={this.onStockModalClose}
                    />
                )}
                <Spinner
                    visible={isLoading}
                    textContent={'加载中'}
                    textStyle={{
                        color: '#FFF'
                    }}
                />
                {!loading && showBillEditModal && (
                    <CashierBillInfo
                        datas={{
                            flowNumber: orderData.flowNumber,
                            handNumber: orderData.handNumber,
                            customerNumber: orderData.customerNumber,
                            isOldCustomer: orderData.isOldCustomer,
                            operatorText: orderData.operatorText,
                        }}
                        canModifyCustomerNum={accessRights && accessRights.ncashier_billing_num}
                        confirmOrderEdit={this.confirmOrderEdit}
                        billInfo={{}}
                        modifyNumberOnly={true}
                        canelOrderEdit={this.canelOrderEdit}
                    />
                )}
                <View style={balanceBillManageStyle.balanceBillBox}>
                    <View style={balanceBillManageStyle.balanceBillTilte}>
                        <View style={balanceBillManageStyle.balanceBillTilteItem}>
                            <Text style={balanceBillManageStyle.balanceBillTilteLi}>
                                项目/外卖
                            </Text>
                            <Text style={balanceBillManageStyle.balanceBillTilteLi}>
                                服务人
                            </Text>
                            <Text style={balanceBillManageStyle.balanceBillTilteLi}>
                                服务人
                            </Text>
                            <Text style={balanceBillManageStyle.balanceBillTilteLi}>
                                服务人
                            </Text>
                        </View>
                        <View style={balanceBillManageStyle.balanceBillTilteItemOther}>
                            <Text style={balanceBillManageStyle.balanceBillTilteLiOther}>
                                消耗品
                            </Text>
                        </View>
                    </View>
                    {!loading && orderData.consumeList && (
                        <ScrollView>
                            <View style={balanceBillManageStyle.addTypeList}>
                                {orderData.consumeList.map((itemDetail, itemIndex) => {
                                    return (
                                        <ConsumeItemDetail
                                            itemInfo={itemDetail}
                                            key={itemDetail.id}
                                            onConsumePress={this.onConsumePress}
                                            onStaffPress={this.onStaffPress}
                                        />
                                    );
                                })}
                            </View>
                        </ScrollView>
                    )}
                </View>
            </ViewContainer>
        );
    }
}

/**
 * 构造bms数据
 * @param {*} orderData
 */
const convertToSubmitData = orderData => {
    let billingData = {
        billingNo: orderData.billingNo,
        companyId: orderData.companyId,
        storeId: orderData.storeId,
        type: orderData.type,
        integral: orderData.integral,
        remark: orderData.remark,
        billingNum: orderData.customerNumber,
        payEndTime: orderData.payEndTime,
        createTime: orderData.createTime,
    };

    let newConsumeList = [];
    orderData.consumeList.forEach(item => {
        let newItem = {...item};
        if (newItem.consumables && newItem.consumables.length) {
            newItem.consumables.forEach(consumeItem => {
                newConsumeList.push({...consumeItem});
            });
        }
        newConsumeList.push(newItem);
    });

    let invalidStaff = false;
    newConsumeList.forEach(item => {
        item.assistStaffDetail = item.assistList.filter(mapItem => mapItem.id);
        item.assistStaffDetail.forEach(staff => {
            delete staff['staffPerformance'];
            delete staff['systemPerformance'];
            delete staff['staffWorkfee'];
            delete staff['systemWorkerFee'];
        });
        if (item.assistStaffDetail.length == 0 && !invalidStaff) {
            invalidStaff = true;
        }
        delete item['active'];
        delete item['assistList'];
        delete item['projectMirrorIndex'];
        delete item['consumables'];
    });

    if (invalidStaff) {
        return {error: '服务人不能为空'};
    }

    return {
        billing: JSON.stringify(billingData),
        consumeItems: JSON.stringify(newConsumeList),
    };
};

const mapStateToProps = state => {
    const {editBilling} = state;
    return {
        loading: editBilling.loading,
        saveStatus: editBilling.saveStatus,
        error: editBilling.error,
        editFlag: editBilling.editFlag,
        orderData: editBilling.orderData,
        accessRights: editBilling.accessRights
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadData: param => dispatch(findBillingDetailAction(param)),
        updateNumber: param => dispatch(updateCustomerNumberAction(param)),
        reset: () => dispatch(resetAction()),
        resetToBillingList: () => {
            AppNavigate.goBack()
            dispatch(getBillingListAction({billingStatus: '1'}, true));
        },
        updateCustomerInfo: (orderInfo)=>{
            dispatch({ type: CASHIERBILLING_CUSTOMER.SUCCESS , orderInfo: orderInfo});
        }
    };
};

export const BillingModifyActivity = connect(
    mapStateToProps,
    mapDispatchToProps
)(BillingModify);
