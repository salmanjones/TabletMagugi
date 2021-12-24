import {handleActions} from 'redux-actions';
import {BILLING_CONSUME_MODIFY_ACTIONS} from '../actions';

const {
    //加载信息
    BILLING_CONSUME_MODIFY_LOAD,
    //展示消耗品
    BILLING_CONSUME_MODIFY_SHOW,
    //添加消耗品
    BILLING_CONSUME_MODIFY_ADD,
    BILLING_CONSUME_MODIFY_UPDATE,
    BILLING_CONSUME_MODIFY_UPDATE_SHOW,
    //查找消耗品
    BILLING_CONSUME_MODIFY_SEARCH,
    BILLING_CONSUME_MODIFY_SEARCH_RESET,
    //移除消耗品
    BILLING_CONSUME_MODIFY_REMOVE,
    BILLING_CONSUME_MODIFY_CANCEL,
    //展示领料人
    BILLING_CONSUME_MODIFY_SHOW_STAFF,
    //选择领料人
    BILLING_CONSUME_MODIFY_ADD_STAFF,
    BILLING_CONSUME_MODIFY_DELETE_STAFF,
    //保存
    BILLING_CONSUME_MODIFY_SAVE,
    //
    BILLING_CONSUME_MODIFY_RESET,
    BILLING_CONSUME_MODIFY_SHOW_BLOCK
} = BILLING_CONSUME_MODIFY_ACTIONS;

const initialState = {
    consumables: [],
    project: {},
    billing: {},
    loading: false,
    showBlock: 'consumable',
    currentModifyItem: {consumableIndex: null, staffIndex: null, consumable: null, staff: null},
    searchKeyWord: null
    //staffs:[],
};

let defaultReducer = Object.keys(BILLING_CONSUME_MODIFY_ACTIONS).reduce((result, key) => {
    if (!key.PENDING) return result;
    //pending 统一添加
    result[key.PENDING] = (state) => ({...state, loading: true});
}, {});

export const billingConsumableModifyReducer = handleActions(
    {
        ...defaultReducer,
        [BILLING_CONSUME_MODIFY_LOAD.SUCCESS]: (state, {data}) => {
            return {
                ...state,
                loading: false,
                billing: data.billing,
                project: data.project,
                consumables: data.consumables
            };
        },
        [BILLING_CONSUME_MODIFY_ADD]: (state, {body}) => {
            const {billing, project, currentModifyItem, consumables} = state;

            let newData = buildConsumable(body, billing, project);

            let avaConsumables = state.consumables ? state.consumables.filter(x => !x.delFlag) : [];
            if (avaConsumables.length) {
                let lastData = avaConsumables[avaConsumables.length - 1];
                newData.assistList = lastData.assistList.reduce((result, item) => {
                    result.push({...item});
                    return result;
                }, []);
            }

            return {
                ...state,
                consumables: [...state.consumables, newData]
            };
            //}
        },
        [BILLING_CONSUME_MODIFY_UPDATE]: (state, {body}) => {
            const {billing, project, currentModifyItem, consumables} = state;
            let currentSelectedIndex = currentModifyItem.consumableIndex;

            let orgData = consumables[currentSelectedIndex];
            consumables[currentSelectedIndex] = {
                ...orgData,
                amount: body.quantity,
                paidDetail: null,
                unitType: body.unit === 'unit' ? '1' : '2',
                active: false
            };
            return {
                ...state,
                currentModifyItem: {consumableIndex: null, staffIndex: null, consumable: null, staff: null},
                consumables: [...state.consumables]
            };

        },
        [BILLING_CONSUME_MODIFY_SEARCH_RESET]: (state, {body}) => {
            return {
                ...state,
                showBlock: 'consumable',
                searchKeyWord: null
            };
        },
        [BILLING_CONSUME_MODIFY_SEARCH]: (state, {body}) => {
            return {
                ...state,
                showBlock: 'consumable',
                searchKeyWord: body
            };
        },
        [BILLING_CONSUME_MODIFY_REMOVE]: (state, {body}) => {
            const {item, index} = body;

            state.consumables.forEach((consumable, ic) => {
                consumable.active = false;
                consumable.assistList.forEach((staff, is) => {
                    staff.active = false;
                });
            });

            if (item.id !== -1) {
                state.consumables[index].delFlag = true;
                return {
                    ...state,
                    consumables: [...state.consumables],
                    showBlock: 'consumable',
                    currentModifyItem: {consumableIndex: null, staffIndex: null, consumable: null, staff: null}
                };
            } else {
                let newConsumables = state.consumables.filter((item, i) => i != index);
                return {
                    ...state,
                    consumables: [...newConsumables],
                    showBlock: 'consumable',
                    currentModifyItem: {consumableIndex: null, staffIndex: null, consumable: null, staff: null}
                };
            }
        },
        [BILLING_CONSUME_MODIFY_SHOW]: (state, {body}) => {//添加消耗品打開控件
            const {item, index} = body;

            state.consumables.forEach((consumable, ic) => {
                consumable.active = false;
                consumable.assistList.forEach((staff, is) => {
                    staff.active = false;
                });
            });

            return {
                ...state,
                showBlock: 'consumable',
                consumables: [...state.consumables],
                currentModifyItem: {consumableIndex: null, staffIndex: null, consumable: undefined, staff: null},
                searchKeyWord: null
            };
        },
        [BILLING_CONSUME_MODIFY_UPDATE_SHOW]: (state, {body}) => {//修改消耗品打開控件
            const {item, index} = body;

            state.consumables.forEach((consumable, ic) => {
                consumable.active = ic == index;
                consumable.assistList.forEach((staff, is) => {
                    staff.active = false;
                });
            });
            //state.currentModifyItem={consumableIndex:index,staffIndex:null};
            return {
                ...state,
                showBlock: 'consumable',
                consumables: [...state.consumables],
                currentModifyItem: {consumableIndex: index, consumable: item, staffIndex: null, staff: null},
                searchKeyWord: null
            };
        },
        [BILLING_CONSUME_MODIFY_CANCEL]: (state, {body}) => {

            state.consumables.forEach((consumable, ic) => {
                consumable.active = false;
                consumable.assistList.forEach((staff, is) => {
                    staff.active = false;
                });
            });

            return {
                ...state,
                consumables: [...state.consumables],
                currentModifyItem: {consumableIndex: null, staffIndex: null, consumable: null, staff: null},
                searchKeyWord: null
            };
        },
        [BILLING_CONSUME_MODIFY_SHOW_STAFF]: (state, {body}) => {
            const {staff, index, staffIndex} = body;

            state.consumables.forEach((consumable, ic) => {
                consumable.active = false;
                consumable.assistList.forEach((staff, is) => {
                    staff.active = is == staffIndex && ic == index;
                });
            });
            //state.currentModifyItem={consumableIndex:index,staffIndex:staffIndex};
            return {
                ...state,
                showBlock: 'staffs',
                consumables: [...state.consumables],
                currentModifyItem: {consumableIndex: index, staffIndex: staffIndex, staff: staff}
            };
        },
        [BILLING_CONSUME_MODIFY_ADD_STAFF]: (state, {body}) => {
            let {consumableIndex, staffIndex} = state.currentModifyItem;
            let consumable = state.consumables[consumableIndex];
            let newStaff = buildStaff(body);
            consumable.assistList[staffIndex] = newStaff;

            return {
                ...state,
                showBlock: 'staffs',
                consumables: [...state.consumables],
                currentModifyItem: {...state.currentModifyItem, staff: newStaff}
            };
        },
        [BILLING_CONSUME_MODIFY_DELETE_STAFF]: (state, {body}) => {
            let {consumableIndex, staffIndex} = state.currentModifyItem;
            let consumable = state.consumables[consumableIndex];
            let emptyStaff = {active: true};
            consumable.assistList[staffIndex] = emptyStaff;

            return {
                ...state,
                consumables: [...state.consumables],
                currentModifyItem: {...state.currentModifyItem, staff: emptyStaff}
            };
        },
        [BILLING_CONSUME_MODIFY_RESET]: (state, {body}) => {
            return initialState;
        },
        [BILLING_CONSUME_MODIFY_SHOW_BLOCK]: (state, {body}) => {
            return {
                ...state,
                showBlock: body
            };
        }
    },
    initialState
);

buildStaff = (staff) => {
    return {
        ...staff,
        active: true,
        workTypeId: staff.positionId,
        workTypeDesc: staff.positionInfo,
        workPositionTypeId: staff.staffType
    };
};

buildConsumable = (data, billing, project) => {
    const {consumable, quantity, unit} = data;

    let projectMirror = {
        store_id: billing.storeId,
        offset: new Date().getTime().toString(),
        company_id: billing.companyId,
        //category_id: project.categoryId,
        project_id: project.id,
        //baseCategoryId: project.baseCategoryId,
        name: project.itemName,
        index: project.projectMirrorIndex,
        //id: project.itemId,
        itemNo: consumable.itemNo,
        itemId: project.itemId,
    };

    return {
        sortOrder: null,
        operateUser: null,
        operateUserName: null,
        status: '0',
        orderBy: null,
        dataSource: null,
        id: -1,
        billingNo: billing.billingNo,
        itemId: consumable.id,
        itemName: consumable.name,
        itemTypeId: consumable.itemTypeId,
        itemTypeName: '产品',
        // operatStaffId: userInfo.id,
        // operatStaffName: userInfo.name,
        costPrice: 0,//?
        paidPrice: -1,
        paidIn: 0,
        type: 0,
        rebate: -1,
        appoint: null,
        service: 2,
        unit: consumable['specUnit'],
        unitLev1: consumable['unit'],
        unitType: unit === 'unit' ? '1' : '2',
        amount: quantity,
        upPrice: 0,
        companyId: billing.companyId,
        storeId: billing.storeId,
        deptId: consumable.deptId,
        planInfo: null,
        paidMoney: 0,
        discountPrice: 0,
        couponPrice: null,
        totalPrice: 0,
        paidStatus: 0,
        paidDetail: null,
        tempOweMoney: null,
        isRecomputePaidmoney: null,
        //itemSpecification: 750,
        paidDetailForDisplay: null,
        priceType: 0,
        fixedPrice: 0,
        projectMirror: projectMirror,
        extraPrice: 0,
        expendPrice: null,
        rework: -1,
        reworkItemId: null,
        projectConsumeType: 0,
        modifyFlag: false,
        isGift: '0',
        consumeTimeAmount: 0,
        itemNo: consumable.itemNo,
        marketId: '-1',
        marketObjectId: '-1',
        categoryId: null,
        categoryName: null,
        categoryCostPrice: null,
        addEndFlag: false,
        mergePay: false,
        index: 0,
        choosedPay: null,
        payEndTime: null,
        appointPayTypeId: null,
        storeBrandId: null,
        projectTemplateId: null,
        projectCategoryId: null,
        projectCategoryIds: null,
        assistList: [{}, {}, {}],
        version: 0
    };

    // return {
    // 	amount: quantity,
    // 	itemId: consumable.id,
    // 	itemName: consumable.name,
    // 	itemNo: consumable.itemNo,
    // 	projectMirror: JSON.stringify(projectMirror),
    // 	service: 2,
    // 	storeId: billing.storeId,
    // 	unit: consumable[unit],
    // 	unitLev1: consumable[unit],
    // 	unitType: unit === 'nuit' ? 1 : 2,
    // 	assistList: [ {}, {}, {} ]
    // };
};
