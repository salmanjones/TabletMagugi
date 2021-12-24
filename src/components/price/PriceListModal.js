// 轮牌设置弹层.
import React from 'react';
import { Text, View, TouchableHighlight, Image, Modal, FlatList, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { priceIndexStyle } from '../../styles';
import { getImage, ImageQutity } from 'utils';

export class PriceListModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentItemIndex: null,
            currentCategoryId: -1,
            currentType: '0',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data.length) {
            this.setState({
                data: nextProps.data.filter(x => x.priceListType == '0'),
                currentCategoryId: -1,
                currentType: '0',
            });
        }
    }

    filterData(categoryId, type) {
        var { data, categories } = this.props;
        var { currentCategoryId, currentType } = this.state;

        var categoryId = categoryId || currentCategoryId;
        var type = type || currentType;

        var filterData = data.filter(x => x.priceListType == type);
        if (categoryId !== -1) {
            filterData = filterData.filter(x => x.priceCategoryId == categoryId);
        }

        this.setState({
            data: filterData,
            currentCategoryId: categoryId,
            currentType: type,
        });
    }

    render() {
        const { visible, categories, onSelected, onClose } = this.props;
        const { data, currentItemIndex, currentCategoryId, currentType } = this.state;
        return (
            <Modal transparent={true} onRequestClose={() => null} visible={visible}>
                <View style={priceIndexStyle.modalBackground}>
                    <View style={priceIndexStyle.rotateWrapper}>
                        {/* 标题 */}
                        <View style={priceIndexStyle.rotateModalTitle}>
                            <TouchableHighlight
                                underlayColor="white"
                                onPress={() => {
                                    this.filterData(null, '0');
                                }}
                                style={currentType === '0' ? priceIndexStyle.modalTitleAct : priceIndexStyle.modalTitle}
                            >
                                <View style={priceIndexStyle.modalTitleBox}>
                                    <Image resizeMethod="resize"
                                        source={currentType === '0' ? require('@imgPath/p-xm-act.png') : require('@imgPath/p-xm.png')}
                                        style={[priceIndexStyle.modalTitleImg, { resizeMode: 'contain' }]}
                                    />
                                    <Text style={currentType === '0' ? priceIndexStyle.modalTitleTextAct : priceIndexStyle.modalTitleText}>项目</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={() => {
                                    this.filterData(null, '1');
                                }}
                                underlayColor="white"
                                style={currentType === '1' ? priceIndexStyle.modalTitleAct : priceIndexStyle.modalTitle}
                            >
                                <View style={priceIndexStyle.modalTitleBox}>
                                    <Image resizeMethod="resize"
                                        source={currentType === '1' ? require('@imgPath/p-cp-act.png') : require('@imgPath/p-cp.png')}
                                        style={[priceIndexStyle.modalTitleImg, { resizeMode: 'contain' }]}
                                    />
                                    <Text style={currentType === '1' ? priceIndexStyle.modalTitleTextAct : priceIndexStyle.modalTitleText}>产品</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={() => {
                                    this.filterData(null, '2');
                                }}
                                underlayColor="white"
                                style={currentType === '2' ? priceIndexStyle.modalTitleAct : priceIndexStyle.modalTitle}
                            >
                                <View style={priceIndexStyle.modalTitleBox}>
                                    <Image resizeMethod="resize"
                                        source={currentType === '2' ? require('@imgPath/p-tc-act.png') : require('@imgPath/p-tc.png')}
                                        style={[priceIndexStyle.modalTitleImg, { resizeMode: 'contain' }]}
                                    />
                                    <Text style={currentType === '2' ? priceIndexStyle.modalTitleTextAct : priceIndexStyle.modalTitleText}>套餐</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableOpacity
                                onPress={() => {
                                    onSelected(null);
                                }}
                                style={priceIndexStyle.modalTitleO}
                            >
                                <Image resizeMethod="resize"
                                    source={require('@imgPath/hide-modal.png')}
                                    style={[priceIndexStyle.hideImage, { resizeMode: 'contain' }]}
                                />
                            </TouchableOpacity>
                        </View>
                        {/* 内容 */}
                        <View style={priceIndexStyle.modalBody}>
                            <View style={priceIndexStyle.modalBodyL}>
                                <View style={priceIndexStyle.modalLBox}>
                                    {!data.length && (
                                        <View style={priceIndexStyle.nullBox}>
                                            <Image resizeMethod="resize"
                                                source={require('@imgPath/none-content.png')}
                                                style={[priceIndexStyle.nullImgO, { resizeMode: 'contain' }]}
                                            />
                                            <Text style={priceIndexStyle.nullText}>暂无内容</Text>
                                        </View>
                                    )}

                                    {data.length ? (
                                        <FlatList
                                            style={priceIndexStyle.modalList}
                                            data={data}
                                            keyExtractor={item => item.id}
                                            numColumns={3}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <TouchableHighlight
                                                        key={item.id}
                                                        onPress={() => {
                                                            onSelected(item);
                                                        }}
                                                        underlayColor="white"
                                                        style={priceIndexStyle.modalLImgBox}
                                                    >
                                                        <View style={priceIndexStyle.modalLImgB}>
                                                            <Image resizeMethod="resize"
                                                                source={getImage(
                                                                    item.priceListPic,
                                                                    ImageQutity.staffPrice,
                                                                    require('@imgPath/p-load-img.png')
                                                                )}
                                                                style={priceIndexStyle.modalLImg}
                                                            />
                                                            <View style={priceIndexStyle.labelTextBox}>
                                                                <Text style={priceIndexStyle.labelTextO} numberOfLines={1} ellipsizeMode={'tail'}>
                                                                    {item.priceName}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </TouchableHighlight>
                                                );
                                            }}
                                        />
                                    ) : (
                                        <View></View>
                                    )}
                                </View>
                            </View>
                            <View style={priceIndexStyle.modalBodyR}>
                                <View style={priceIndexStyle.modalRBox}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.filterData(-1);
                                        }}
                                        style={currentCategoryId == -1 ? priceIndexStyle.consumeOrderGenreLiAct : priceIndexStyle.consumeOrderGenreLi}
                                    >
                                        <Text style={priceIndexStyle.consumeOrderGenreText} numberOfLines={1}>
                                            全部
                                        </Text>
                                    </TouchableOpacity>
                                    <ScrollView>
                                        {categories &&
                                            categories.map((item, index) => (
                                                <TouchableOpacity
                                                    style={
                                                        currentCategoryId == item.id
                                                            ? priceIndexStyle.consumeOrderGenreLiAct
                                                            : priceIndexStyle.consumeOrderGenreLi
                                                    }
                                                    key={item.id}
                                                    onPress={() => {
                                                        this.filterData(item.id);
                                                    }}
                                                >
                                                    <Text style={priceIndexStyle.consumeOrderGenreText} numberOfLines={1}>
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
