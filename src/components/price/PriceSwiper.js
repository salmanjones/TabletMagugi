import React, { PureComponent } from 'react';
import { priceIndexStyle } from '../../styles';
import { View, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native/';
import { getImage, ImageQutity } from 'utils';
const SwiperContainer = styled.View`
    flex: 1;
`;
export class PriceSwiper extends PureComponent {
    scrollBy(step) {
        this.swiper.scrollBy(step);
    }

    render() {
        const { priceData, onChangePriceItem } = this.props;
        return (
            <SwiperContainer>
                <Swiper
                    removeClippedSubviews={false}
                    style={priceIndexStyle.indexBox}
                    showsButtons={true}
                    loop={false}
                    ref={swiper => {
                        this.swiper = swiper;
                    }}
                    onIndexChanged={onChangePriceItem}
                    paginationStyle={{ display: 'none' }}
                    nextButton={
                        <Image resizeMethod="resize"
                            source={require('@imgPath/p-swiper-r-btn.png')}
                            style={[priceIndexStyle.nextButton, { resizeMode: 'contain' }]}
                        />
                    }
                    prevButton={
                        <Image resizeMethod="resize"
                            source={require('@imgPath/p-swiper-l-btn.png')}
                            style={[priceIndexStyle.nextButton, { resizeMode: 'contain' }]}
                        />
                    }
                >
                    {priceData.map((item, index) => {
                        return (
                            <View style={priceIndexStyle.swiperLi} key={item.id}>
                                <View style={priceIndexStyle.labelBox}>
                                    <Text style={priceIndexStyle.labelText}>{item.priceCategoryName}</Text>
                                </View>
                                <Image resizeMethod="resize"
                                    source={getImage(item.priceListPic, ImageQutity.member_big, require('@imgPath/p-load-img.png'))}
                                    style={priceIndexStyle.indexImg}
                                />
                                {Boolean(item.priceDescrible) && (
                                    <View style={priceIndexStyle.tipTextBox}>
                                        <Text style={priceIndexStyle.tipText}>{item.priceDescrible}</Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </Swiper>
            </SwiperContainer>
        );
    }
}
