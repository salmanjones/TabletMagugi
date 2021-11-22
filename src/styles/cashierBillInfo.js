import {StyleSheet} from 'react-native';
import {PixelUtil} from 'utils';

export const cashierBillInfoStyle = StyleSheet.create({
    hidden: {
        display: 'none'
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000060',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100
    },
    cashierBillInfoWrapper: {
        backgroundColor: '#FFF',
        height: '95%',
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        marginTop: PixelUtil.size(-60)
    },
    billInfoBox: {
        // 顾客识别-主体
        width: PixelUtil.size(1968),
        height: '80%',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    leftBodyBox: {
        width: '50%',
        height: '100%',
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    leftBox: {
        width: '100%',
        height: PixelUtil.size(525),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    billGenre: {
        //单据类型
        width: PixelUtil.rect(830, 50).width,
        height: PixelUtil.rect(830, 50).height,
        marginBottom: PixelUtil.size(10),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textBox: {
        // 文字长度
        width: PixelUtil.size(220),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    billGenreBox: {
        //单据类型-类型
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: PixelUtil.size(18),
    },
    billGenreName: {
        //单据类型-类型文字
        fontSize: PixelUtil.size(32),
        color: '#111c3c',
    },
    billGenreImg: {
        //单据类型-类型图片
        width: PixelUtil.rect(48, 48).width,
        height: PixelUtil.rect(48, 48).height,
        marginLeft: PixelUtil.size(10),
    },
    billBox: {
        width: PixelUtil.rect(830, 68).width,
        height: PixelUtil.rect(830, 68).height,
        marginTop: PixelUtil.size(40),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputBox: {
        //input框
        width: PixelUtil.rect(608, 68).width,
        height: PixelUtil.rect(608, 68).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(40),
        paddingRight: PixelUtil.size(40),
    },
    inpStyle: {
        //input
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    rightBodyBox: {
        width: '50%',
        height: '100%',
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightBox: {
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noneContent: {
        //无内容
        fontSize: PixelUtil.size(32),
        color: '#9c9c9c'
    },
    chooseGuestType: {
        //客型选择
        width: PixelUtil.size(416),
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    guestTypeImg: {
        //客型选择-图片
        width: PixelUtil.rect(168, 168).width,
        height: PixelUtil.rect(168, 168).height,
    },
    chooseSexType: {
        //客型选择
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sexTypeImgRight: {
        //性别选择-图片样式
        width: PixelUtil.rect(300, 120).width,
        height: PixelUtil.rect(168, 120).height,
        marginRight: PixelUtil.size(90),
    },
    sexTypeImg: {
        //性别选择-图片样式
        width: PixelUtil.rect(300, 120).width,
        height: PixelUtil.rect(168, 120).height,
    },
});
