import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const NewStyle = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        height: '100%'
    },
    pending: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        // backgroundColor:'pink',
        height: '100%',
        // borderRadius:PixelUtil.size(30),
        paddingTop: PixelUtil.size(40),
        paddingLeft: PixelUtil.size(60),
    },
    Info: {
        position: 'relative',
        width: PixelUtil.size(452),
        height: PixelUtil.size(578),
        marginRight: PixelUtil.size(40),
        backgroundColor: 'white',
        borderWidth: PixelUtil.size(4),
        borderColor:"transparent",
        borderStyle: 'solid',
        fontSize: PixelUtil.size(31),
        marginBottom: PixelUtil.size(40),
        display: 'block',
        borderRadius: PixelUtil.size(30),
        paddingTop: PixelUtil.size(40),
        paddingLeft: PixelUtil.size(30)
    },
    addColor: {
        borderColor: "rgba(241, 159, 65,0.8)",
        borderWidth: PixelUtil.size(8)
    },
    normalColor: {
        borderColor: '#d6d7d8',
    },
    flowNumberBox: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        height: PixelUtil.size(50),
        alignItems: "center"
    },
    flowNumber: {
        color: "red",
        fontSize: PixelUtil.size(31)
    },
    staffName: {
        position: 'relative',
        marginTop: PixelUtil.size(40),
        display: 'flex',
        fontSize: PixelUtil.size(31),
        justifyContent: 'space-between',
        width: '100%',
        height: PixelUtil.size(50),
        // color:'pink'
    },
    nameTxt: {
        fontSize: PixelUtil.size(31)
    },
    img: {
        position: 'absolute',
        right: 0,
        height: "100%"
    },
    imgNum: {
        position: "absolute",
        right: PixelUtil.size(60),
        top: PixelUtil.size(13),
        zIndex: PixelUtil.size(99),
        color: "white"
    },
    phone: {
        fontSize: PixelUtil.size(35),
        marginTop: PixelUtil.size(15)
    },
    payNum: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: "row",
        marginTop: PixelUtil.size(30),
        paddingRight: PixelUtil.size(30)
    },
    payT: {
        fontSize: PixelUtil.size(31)
    },
    payM: {
        fontSize: PixelUtil.size(31),
        color: "red"
    },
    Tcard: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: PixelUtil.size(30),
        marginTop: PixelUtil.size(40)
    },
    cardT: {
        fontSize: PixelUtil.size(31)
    },
    cardNum: {
        fontSize: PixelUtil.size(31),
        color: "red"
    },
    timeT: {
        fontSize: PixelUtil.size(31)
    },
    timeD: {
        fontSize: PixelUtil.size(31)
    },
    swiperLiPhoneTips: {
        position: "absolute",
        right: PixelUtil.size(-15),
        bottom: PixelUtil.size(-510),
        width: PixelUtil.size(160),
        height: PixelUtil.size(62),
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99
    },
    swiperLiPhoneTipsText: {
        // backgroundColor:'pink',
        fontSize: PixelUtil.size(22),
        color: '#ffffff',
        marginTop: PixelUtil.size(-6)
    },
    settlementBtnText: {
        fontSize: PixelUtil.size(32),
        color: '#FFFFFF'
    },
    settingCheckBox: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        paddingLeft: 0,
        marginLeft: 0,
    },
    rotateModalText: { //文字
        fontSize: PixelUtil.size(32),
        color: '#333',
        fontWeight: 'normal'
    },
    header: {
        // backgroundColor:'pink',
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
    },
    listLength: {
        marginTop: PixelUtil.size(100),
        marginRight: PixelUtil.size(100)
    },
    Checkbbox: {
        alignItems: "center",
        display: 'flex',
        flexDirection: 'row',
        position: "relative",
        marginLeft: PixelUtil.size(-500),
        marginTop: PixelUtil.size(30)

    },
    settlementBtnBox: {
        position: "absolute",
        left: PixelUtil.size(200),
        top: PixelUtil.size(-20),
        height: PixelUtil.size(68),
        lineHeight: PixelUtil.size(68)
        , backgroundColor: '#111C3C',
        borderRadius: PixelUtil.size(34),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(30),
        // paddingTop: PixelUtil.size(15),
        paddingLeft: PixelUtil.size(20),
        paddingRight: PixelUtil.size(20),
    },
    settingCheckBoxO: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        padding: 0,
        width: '20%',
        height: PixelUtil.size(40),
    },
    sumOrder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: PixelUtil.size(100)
    },

    settlementBtnTextT: {

        fontSize: PixelUtil.size(28),
        color: 'pink',
        height: PixelUtil.size(40)
    },


    container:{
        flex:1,
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:PixelUtil.size(60)
    },
    item: {
        flex: 0.5, // adjust the flex value to control item size
        aspectRatio: 1, // maintain a square aspect ratio for each item
        margin: 10,
        backgroundColor: 'lightblue',
    },


})
