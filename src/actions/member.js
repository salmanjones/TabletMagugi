import * as types from './action-types';
import {fetchMemberInfo} from '../../services';

/**
 * 获取会员信息
 */
export const getMemberInfoAction = (serchKey, cardInfoFlag, loadMore) => {
    return function (dispatch, getState) {
        dispatch({
            type: types.MEMBER_INDENTIFY_QUERY.PENDING,
            body: {
                loadMore: loadMore,
            },
        });

        const memberIdentify = getState().component.memberIdentify;
        return fetchMemberInfo(
            serchKey,
            cardInfoFlag,
            memberIdentify.pageNext,
            memberIdentify.pageSize
        )
            .then(data => {
                let members = data.data.memberList;
                dispatch({
                    type: types.MEMBER_INDENTIFY_QUERY.SUCCESS,
                    body: members,
                });
            })
            .catch(err => {
                dispatch({
                    type: types.MEMBER_INDENTIFY_QUERY.ERROR,
                    body: err,
                });
            });
    };
};

/**
 * 重置
 * @param {*} params
 */
export const resetMemberAction = () => {
    return function (dispatch, getState) {
        dispatch({
            type: types.MEMBER_INDENTIFY_RESET,
        });
    };
};
