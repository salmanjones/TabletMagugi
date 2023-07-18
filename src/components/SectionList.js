import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native/';
import {PixelUtil} from '../utils';

const DefaultNoItemMsg = '暂时没有内容~';

const MarginContainer = styled.View`
    width: ${PixelUtil.size(1060)};
    height: ${PixelUtil.size(1060)};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NoneMsg = styled.Text`
    font-size: ${PixelUtil.size(32)};
    text-align: center;
    margin-top: ${PixelUtil.size(32)};
    display: none;
`;

const ViewContainer = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    display: ${({hide}) => (hide ? 'none' : 'flex')};
`;

const ImageNoContent = styled.Image`
    width: ${PixelUtil.rect(450, 380).width};
    height: ${PixelUtil.rect(450, 380).height};
`;

export const SectionList = ({
                                loading,
                                noItems,
                                noItemsMessage,
                                children,
                                hide,
                            }) => {
    let listDisplay;

    if (loading && !hide) {
        listDisplay = (
            <MarginContainer>
                <ActivityIndicator animating={loading} size="large" color="#111c3c"/>
            </MarginContainer>
        );
    } else if (noItems && !hide) {
        listDisplay = (
            <MarginContainer>
                <ImageNoContent
                    source={require('@imgPath/no-content.png')}
                    resizeMode={'contain'}
                />
                <NoneMsg>{noItemsMessage || DefaultNoItemMsg}</NoneMsg>
            </MarginContainer>
        );
    } else {
        listDisplay = children;
    }

    return <ViewContainer hide={hide}>{listDisplay}</ViewContainer>;
};
