import {billingSearch, getCommonSetting, getRights} from '../../services';
import {createAction} from '../../utils';

const CACHE_TIME = 1000 * 300;
export const COMPONENT_ACTIONS = {
    //加载消费品信息
    COMPONENT_LOAD_CONSUMABLES: createAction('COMPONENT_LOAD_CONSUMABLES'),
    //加载修改员工的配置信息
    STAFF_MODIFY_LOAD: createAction('STAFF_MODIFY_LOAD'),
};

export const loadConsumablesAction = (categoryId) => {
    return function (dispatch, getState) {
        // dispatch({
        // 	type: COMPONENT_ACTIONS.COMPONENT_LOAD_CONSUMABLES.PENDING
        // });

        const {consumables} = getState().component;
        const cacheData = consumables[categoryId];

        if (cacheData && new Date() - cacheData.lastTime < CACHE_TIME) {
            dispatch({
                type: COMPONENT_ACTIONS.COMPONENT_LOAD_CONSUMABLES.SUCCESS,
                body: {data: cacheData.items, categoryId: categoryId}
            });
        } else {
            return billingSearch({
                type: 'item',
                categoryStr: categoryId == 'all' ? null : categoryId,
                cfk: 'cfk_consumable_items'
            })
                .then((backData) => {
                    dispatch({
                        type: COMPONENT_ACTIONS.COMPONENT_LOAD_CONSUMABLES.SUCCESS,
                        body: {data: backData.data, categoryId: categoryId}
                    });
                    //return backData;
                })
                .catch((err) => {
                    dispatch({
                        type: COMPONENT_ACTIONS.COMPONENT_LOAD_CONSUMABLES.ERROR
                    });
                });
        }
    };
};

export const getStaffModifySettingAction = () => {
    return function (dispatch, getState) {
        // dispatch({
        // 	type: COMPONENT_ACTIONS.STAFF_MODIFY_LOAD.PENDING
        // });

        const {staffModify} = getState().component;

        if (!staffModify.lastFreshTime || (new Date() - staffModify.lastFreshTime) > CACHE_TIME) {

            return Promise.all([getCommonSetting(), getRights()]).then(datas => {

                let accessRights = JSON.parse(datas[1].data.accessRights);
                let positions = JSON.parse(datas[0].data.staffPositionInfo);

                dispatch({
                    type: COMPONENT_ACTIONS.STAFF_MODIFY_LOAD.SUCCESS,
                    body: {accessRights: accessRights, positions: positions}
                });

            }).catch((err) => {
                dispatch({
                    type: COMPONENT_ACTIONS.STAFF_MODIFY_LOAD.ERROR
                });
            });
        }
    };
}
