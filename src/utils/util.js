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

export const showMessageExt = (msg, config = {}, native, callback) => {
    if (!native) {
        Toast.show(msg, {
            duration: config.duration || Toast.durations.SHORT,
            position:   config.position || Toast.positions.BOTTOM,
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

/**
 * 延时执行
 */
let delayTimer;
export const dealyAction = (action, delay = 350) => {
    delayTimer && clearTimeout(delayTimer);
    delayTimer = action && setTimeout(() => {
        action();
        action = undefined;
        delayTimer && clearTimeout(delayTimer)
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

/**
 * 深克隆
 * @param obj
 * @returns {any}
 */
export const clone = (obj) => {
    return obj ? JSON.parse(JSON.stringify(obj)) : obj;
}

/**
 * 合并数组并去重
 * @param list1
 * @param list2
 * @returns {*}
 */
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

/**
 * 手机号验证
 * @param phone
 * @returns {boolean}
 */
export const isPhone = phone => {
    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(phone);
};

/**
 * 验证6位卡密
 * @param value
 * @returns {boolean}
 */
export const isValidCardPwd = value => {
    return /^[0-9]{6}$/.test(value);
};

/**
 * 获取展示路径
 * @param url
 * @param format
 * @param defaultImage
 * @returns {{uri}|{uri: string}|string}
 */
export const getImage = (url, format, defaultImage = 'https://pic.magugi.com/magugi_default_01.png') => {
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

/**
 * 将普通手机号转换为安全手机号
 * @param phone
 * @returns {string}
 */
export const getPhoneSecurity = (phone)=>{
    if(!phone || phone.trim().length < 11){
        return ""
    }

    return phone.substring(0, 3) + "****" + phone.substring(7, 11)
}

/**
 * 适应多层解码
 * @param content
 * @param maxNum
 * @returns {string}
 */
export const decodeContent = (content, maxNum = 2)=>{
    let backTxt = content
    let decodeNum = 1
    while (true && decodeNum <= maxNum){
        try{
            backTxt = decodeURIComponent(backTxt)
        }catch (e){
            backTxt = backTxt
        }finally {
            decodeNum++
        }
    }

    return backTxt
}

/**
 * 提取字符串中所有数字
 * @param value
 * @returns {string}
 */
export const pickNumber = (value = '')=>{
    return value.trim().replace(/[^\d.]/g, "")
}
