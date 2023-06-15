import {Dimensions, PixelRatio,} from 'react-native';

const widthDp = Dimensions.get('window').width;
const widthPx = PixelRatio.getPixelSizeForLayoutSize(widthDp);

export const PixelUtil = {
    screenSize: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    size: (designSize = 1, resolutionWidth = 2048, dim = 'window') => {
        //设计稿分辨率宽度与屏幕宽度比率
        let widthPxRatio = resolutionWidth / widthPx;
        //转换比率
        let pxRatio = widthPx / widthDp;

        return parseInt((designSize / pxRatio * (1 / widthPxRatio)).toString());
    },
    rect: (
        designWidth = 1,
        degisnHeight = 1,
        resolutionWidth = 2048,
        dim = 'window'
    ) => {
        let width = PixelUtil.size(designWidth, resolutionWidth, dim);
        let height = degisnHeight * (width / designWidth);

        return {
            width: parseInt(width.toString()),
            height: parseInt(height.toString()),
        };
    },
};
