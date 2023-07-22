//libs
import React from 'react';
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const addCardItemStyles = StyleSheet.create({
    addCardItemStylesContent: {
        //加次卡容器
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    addCardItemStylesTitle: {
        //   加次卡-标题
        width: '100%',
        height: PixelUtil.size(72),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
    },
    addCardItemStylesTitleLi: {
        //   加次卡-标题-各项
        width: PixelUtil.size(300),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addCardItemStylesTitleLiOnther: {
        //   加次卡-标题-名称项
        width: PixelUtil.size(190),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addCardItemStylesTitleLiBalance: {
        //   加次卡-标题-名称项
        width: PixelUtil.size(100),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addCardItemStylesTitleLiText: {
        //   加次卡-标题-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    addCardItemStylesBody: {
        //   加次卡-主体
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    addCardItemStylesList: {
        //   加次卡-每行
        width: '100%',
        height: PixelUtil.size(109),
        borderColor: '#fff',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: PixelUtil.size(36),
    },
    addCardItemStylesListActive: {
        //   加次卡-每行-选中
        width: PixelUtil.rect(1133, 109).width,
        height: PixelUtil.rect(1133, 109).height,
        borderColor: '#f98f1f',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: PixelUtil.size(36),
    },
    addCardItemStylesListNameBox: {
        //   加次卡-每行-名称
        width: PixelUtil.rect(300, 68).width,
        height: PixelUtil.rect(300, 68).height,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    addCardItemStylesListName: {
        //   加次卡-每行-名称
        fontSize: PixelUtil.size(28),
        color: '#333',
        textAlign: 'center',
        lineHeight: PixelUtil.size(33),
        height: PixelUtil.rect(300, 68).height,
        overflow: 'hidden',
    },
    addCardItemStylesListNameGray: {
        //   加次卡-每行-名称
        fontSize: PixelUtil.size(28),
        color: '#888',
        textAlign: 'center',
        lineHeight: PixelUtil.size(33),
        height: PixelUtil.rect(300, 68).height,
        overflow: 'hidden',
    },
    addCardItemStylesListPrice: {
        //   加次卡-每行-价格
        width: PixelUtil.rect(190, 74).width,
        height: PixelUtil.rect(190, 74).height,
        overflow: 'hidden',
        textAlign: 'center',
        fontSize: PixelUtil.size(28),
        color: '#333'
    },
    addCardItemStylesListPriceGray:{
        width: PixelUtil.rect(190, 74).width,
        height: PixelUtil.rect(190, 74).height,
        overflow: 'hidden',
        textAlign: 'center',
        fontSize: PixelUtil.size(28),
        color: '#888'
    },
    addCardItemStylesListInfoBox: {
        //   加次卡-每行-信息
        width: PixelUtil.rect(300, 68).width,
        height: PixelUtil.rect(300, 68).height,
        overflow: 'hidden',
    },
    addCardItemStylesListInfo: {
        //   加次卡-每行-信息
        textAlign: 'center',
        fontSize: PixelUtil.size(28),
        color: '#333',
        lineHeight: PixelUtil.size(33),
        height: PixelUtil.rect(300, 68).height,
        overflow: 'hidden',
    },
    addCardItemStylesListInfoGray: {
        //   加次卡-每行-信息
        textAlign: 'center',
        fontSize: PixelUtil.size(28),
        color: '#888',
        lineHeight: PixelUtil.size(33),
        height: PixelUtil.rect(300, 68).height,
        overflow: 'hidden',
    },
    addCardItemStylesListTime: {
        //   加次卡-每行-余次
        width: PixelUtil.rect(190, 74).width,
        height: PixelUtil.rect(190, 74).height,
        textAlign: 'center',
        overflow: 'hidden',
        fontSize: PixelUtil.size(28),
        color: '#333',
    },
    addCardItemStylesListTimeGray: {
        //   加次卡-每行-余次
        width: PixelUtil.rect(190, 74).width,
        height: PixelUtil.rect(190, 74).height,
        textAlign: 'center',
        overflow: 'hidden',
        fontSize: PixelUtil.size(28),
        color: '#888',
    },
    addCardItemStylesBalance: {
        //   加次卡-每行-余次
        width: PixelUtil.rect(100, 74).width,
        height: PixelUtil.rect(100, 74).height,
        textAlign: 'center',
        overflow: 'hidden',
        fontSize: PixelUtil.size(28),
        color: '#333',
    },
    addCardItemStylesBalanceGray:{
        width: PixelUtil.rect(100, 74).width,
        height: PixelUtil.rect(100, 74).height,
        textAlign: 'center',
        overflow: 'hidden',
        fontSize: PixelUtil.size(28),
        color: '#888',
    },
});
