import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {InteractionManager, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
    ConsumableList,
    ConsumableSelectBoxComponent,
    ModalLoadingIndicator,
    QueryInput,
    StaffEditWidget,
    StaffSelectWidget
} from '../../components';
import {
    addConsumableAction,
    addConsumablesAction,
    addStaffAction,
    cancelConsumableSelectAction,
    consumableLoadOrderDataAction,
    deleteConsumableAction,
    deleteStaffAction,
    openConsumableBoxAction,
    openConsumableBoxUpdateAction,
    openStaffsBoxAction,
    resetConsumeAction,
    resetSearchAction,
    searchAction,
    showBlockAction,
    updateConsumableAction
} from '../../actions';
//self
import {cashierBillingStyle, manageConsumablesStyle} from '../../styles';
import {dealyAction, showMessage} from '../../utils';

class Consumable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            initFinish: false,
            showFilterKeyBoard: false
        };
        this.staffSelectBox = null;
    }

    UNSAFE_componentWillMount() {
        let loading = this.props.consumablesComponentData.length === 0 || this.props.staffComponentData.length === 0;

        this.setState({loading: loading});
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (
            this.props.consumablesComponentData != nextProps.consumablesComponentData ||
            this.props.staffComponentData != nextProps.staffComponentData
        ) {
            let loading = nextProps.consumablesComponentData.length === 0 || nextProps.staffComponentData.length === 0;
            this.setState({loading: loading});
        }
    }

    componentDidMount() {
        const {loadOrderData, navigation} = this.props;
        const {params} = this.props.route;
        InteractionManager.runAfterInteractions(() => {
            const {itemData, orderData} = params;

            let newConsumables = itemData.consumables ? itemData.consumables.map((consumable) => {
                return {
                    ...consumable,
                    assistList: consumable.assistList.map((assist) => ({...assist}))
                };
            }) : [];

            loadOrderData({
                itemData: {...params.itemData, consumables: newConsumables},
                orderData: params.orderData
            });

            this.setState({initFinish: true});
        });

        //this.setState({initialLoading:false})
    }

    componentWillUnmount() {
        this.props.reset && this.props.reset();
    }

    onConfirm = () => {
        const {consumables, project, navigation} = this.props;

        let hasEorr = false;
        consumables.forEach((consumable) => {
            let noStaff = consumable.assistList.filter((assist) => assist.id);
            if (!noStaff || !noStaff.length) {
                showMessage('领料人不能为空');
                hasEorr = true;
            }
        });
        if (hasEorr) return;

        let datas = consumables.map((consumable) => {
            let newassistList = consumable.assistList.map((assist) => {
                return {...assist, active: undefined};
            });
            return {...consumable, assistList: newassistList, active: undefined};
        });

        project.consumables = datas;
        this.props.updateConsumables(project);
        dealyAction(() => {
            navigation.goBack();
        });
    };

    render() {
        const {billing, consumables, showBlock, searchKeyWord, currentEditStaff, currentEditConsumable} = this.props;
        const {loading, initFinish} = this.state;
        const {
            openStaffsBox,
            openConsumableBox,
            openConsumableBoxUpdate,
            addConsumable,
            updateConsumable,
            deleteConsumable,
            cancelConsumableSelect,
            addStaff,
            deleteStaff,
            search,
            resetSearch,
            displayBlock
        } = this.props;

        return (
            <View style={cashierBillingStyle.container}>
                {(loading || !initFinish) && <ModalLoadingIndicator/>}
                <View style={manageConsumablesStyle.consumeLeftBox}>
                    <View style={manageConsumablesStyle.consumeLeftHeader}>
                        <Text style={cashierBillingStyle.servicerItemTitle}>消耗品</Text>
                        <Text style={cashierBillingStyle.servicerPerson}>领料人</Text>
                        <Text style={cashierBillingStyle.servicerPerson}>领料人</Text>
                        <Text style={cashierBillingStyle.servicerPerson}>领料人</Text>
                    </View>
                    <View style={manageConsumablesStyle.consumeLeftContent}>
                        {/* 有内容 */}
                        <ScrollView style={manageConsumablesStyle.servicerBodyNew}>
                            <ConsumableList
                                consumables={consumables}
                                onStaffSelected={(param) => {
                                    this.staffSelectBox.reset();
                                    openStaffsBox(param);
                                }}
                                onConsumableSelected={openConsumableBoxUpdate}
                                onDelete={deleteConsumable}
                                onAdd={openConsumableBox}/>
                        </ScrollView>
                        <View style={manageConsumablesStyle.consumeLeftFooter}>
                            <TouchableOpacity style={manageConsumablesStyle.consumeBack} onPress={() => {this.props.navigation.goBack();}}>
                                <Text style={manageConsumablesStyle.consumedBtnText}>返回</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={manageConsumablesStyle.consumeSave} onPress={this.onConfirm}>
                                <Text style={manageConsumablesStyle.consumedBtnText}>保存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={manageConsumablesStyle.consumeRightBox}>
                    {/* 右侧顶部区域 */}
                    <View style={manageConsumablesStyle.consumeRightTitle}>
                        {showBlock == 'consumable' && <Text style={cashierBillingStyle.consumeText}>选择消耗品</Text>}
                        {showBlock == 'staffs' && <Text style={cashierBillingStyle.consumeText}>选择领料人</Text>}
                        {showBlock == 'consumable' && <QueryInput onConfirm={search} onClear={resetSearch} type="consumable"/>}
                    </View>
                    <View style={manageConsumablesStyle.consumeRightContent}>
                        {/* ------------搜索框区域------------ */}
                        {/* {showBlock == 'search' && (<SearchInput onConfirm={search} onCancel={()=>{displayBlock('consumable')}} type="consumable"/>)} */}
                        {/* 单据类型 */}
                        {(showBlock == 'consumable' && initFinish) && (
                            <View style={manageConsumablesStyle.consumeProcuctBox}>
                                <ConsumableSelectBoxComponent
                                    primeCategoryId={billing.categoryId}
                                    keyWord={searchKeyWord}
                                    selectedData={currentEditConsumable}
                                    onCancel={cancelConsumableSelect}
                                    onAdd={addConsumable}
                                    onUpdate={updateConsumable}/>
                            </View>
                        )}
                        {/* 服务人*/}
                        <View style={showBlock == 'staffs' ? manageConsumablesStyle.consumeServicerBox:{display: 'none'}}>
                            {initFinish && (
                                <StaffSelectWidget
                                    ref={ref => {this.staffSelectBox = ref;}}
                                    onSelected={addStaff}
                                    //clearServicerGridChoose={this.state.clearServicerGridChoose}
                                />
                            )}
                        </View>
                        {showBlock == 'staffs' && (
                            <View style={manageConsumablesStyle.consumeRightFooter}>
                                <StaffEditWidget data={currentEditStaff} onDelete={deleteStaff}/>
                            </View>
                        )}
                        {/* <View style={showBlock == 'search' ? {display: 'flex', flex: 1} : {display: 'none'}}>
                            <SimulateKeyboardInp display="flex" number="" onConfirm={search}/>
                        </View> */}
                    </View>
                </View>
            </View>
        );
    }
}

//mapping props
const mapStateToProps = (state) => {
    const {billingConsumableModify, component} = state;
    return {
        userInfo: state.auth.userInfo,
        billing: billingConsumableModify.billing,
        consumables: billingConsumableModify.consumables,
        project: billingConsumableModify.project,
        consumablesComponentData: component.consumables.categoryConsumables,
        staffComponentData: component.staffSevice.data,
        //loading: component.staffSevice.loading || component.consumables.loading, //billingConsumableModify.loading,
        initialLoading: billingConsumableModify.initialLoading,
        showBlock: billingConsumableModify.showBlock,
        searchKeyWord: billingConsumableModify.searchKeyWord,
        currentEditStaff: billingConsumableModify.currentModifyItem.staff,
        currentEditConsumable: billingConsumableModify.currentModifyItem.consumable
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            //LoadStaffsData: getServiceStaffsAction,
            loadOrderData: consumableLoadOrderDataAction,
            addConsumable: addConsumableAction,
            updateConsumable: updateConsumableAction,
            deleteConsumable: deleteConsumableAction,
            cancelConsumableSelect: cancelConsumableSelectAction,
            openStaffsBox: openStaffsBoxAction,
            openConsumableBox: openConsumableBoxAction,
            openConsumableBoxUpdate: openConsumableBoxUpdateAction,
            addStaff: addStaffAction,
            deleteStaff: deleteStaffAction,
            resetSearch: resetSearchAction,
            search: searchAction,
            updateConsumables: addConsumablesAction,
            displayBlock:showBlockAction,
            reset: resetConsumeAction
        },
        dispatch
    );

export const ConsumableActivity = connect(mapStateToProps, mapDispatchToProps)(Consumable);
