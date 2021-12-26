import {Alert} from 'react-native';
import Toast from 'react-native-root-toast';
import {AppConfig} from './constant';
import {AppNavigate} from "../navigators";

/**
 *
 * @param {*} delayed
 * @param {*} ms
 */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export const delay = (delayed, ms) => Promise.all([delayed, sleep(ms)]).then(([data]) => data);

/**
 * 重置请求
 * @param routeName
 * @param params
 */
export const resetNavigationTo = (routeName = '', params = null) => {
    AppNavigate.reset(routeName, params);
};

/**
 *
 * @param {*} actionName
 */
export const createAction = (actionName, noSet) => {
    return noSet
        ? actionName
        : {
            PENDING: `${actionName}_PENDING`,
            SUCCESS: `${actionName}_SUCCESS`,
            ERROR: `${actionName}_ERROR`,
        };
};

export const throttle = (func, t) => {
    var r = new Date();
    return function () {
        var n = new Date();
        if (!(n - r < t)) return (r = n), func.apply(this, arguments);
    };
};

export const displayError = (error, errMsg, native) => {
    const msg = error.exceptions || errMsg || '网络出小差，请稍后再试';
    showMessage(msg, native);
};

export const showMessage = (msg, native, callback) => {
    if (!native) {
        Toast.show(msg, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShown: () => {
                callback && callback();
            },
        });
    } else {
        Alert.alert('', msg, [{text: '知道了', onPress: () => callback && callback()}]);
    }
};

//延时动作
let delayTimer;
export const dealyAction = (action, delay = 350) => {
    delayTimer && clearTimeout(delayTimer);
    delayTimer =
        action &&
        setTimeout(() => {
            action();
            action = undefined;
            dealyAction();
        }, delay);
};

export const groupBy = (array, getKey) => {
    var groups = {};
    if (!array) return groups;
    array.forEach(function (o) {
        var group = JSON.stringify(getKey(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return groups;
};

export const clone = (obj) => {
    return obj ? JSON.parse(JSON.stringify(obj)) : obj;
}

export const concatWithoutDuplicate = (list1, list2) => {
    const set = new Set(list1.map(item => item.id));
    const filterList2 = [];
    const length = list2.length;
    for (let i = 0; i < length; i++) {
        if (!set.has(list2[i].id)) {
            filterList2.push(list2[i]);
        }
    }
    return list1.concat(filterList2);
};

export const isPhone = phone => {
    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(phone);
};

export const isValidCardPwd = value => {
    return /^[0-9]{6}$/.test(value);
};

export const getImage = (url, format, defaultImage) => {
    if (!url) {
        if(defaultImage && defaultImage.indexOf && defaultImage.indexOf('http') != -1) {
            return {uri: defaultImage}
        }else{
            return defaultImage
        }
    };
    if (url && url.indexOf('http') === -1) {
        return {uri: AppConfig.imageServer + url + (format || '')};
    } else {
        return {uri: url};
    }
};
