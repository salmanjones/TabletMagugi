import React from 'react';
import {Text, View, TouchableOpacity, Modal, FlatList} from 'react-native';
import {fetchCardConsumeHistory} from '../../services';
import {SectionList, FlatListFooter} from '../../components';
import styled from 'styled-components/native/';
import {ListStatus, PixelUtil} from '../../utils';
//self
import {
    MemberQueryStyle,
    timeCardInfoStyles,
    cardInfoStyles,
    consumeHistoryStyles,
} from '../../styles';

const MarginContainer = styled.View`
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    flex: 0;
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
`;

const ImageNoContent = styled.Image`
    width: ${PixelUtil.rect(572, 594).width};
    height: ${PixelUtil.rect(572, 594).height};
`;

export class ConsumeHistory extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            //loading: false
            data: [],
            err: null,
            cardId: this.props.cardId,
            listState: ListStatus.idle,
            loadComplete: false,
        };
        this.pager = {pageSize: 100, pageNo: 1};
    }

    componentDidMount() {
        this.pager.pageNo = 1;
        this.queryData();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.cardId != this.state.cardId) {
            this.setState({
                cardId: nextProps.cardId,
                data: [],
                loadComplete: false,
            });
            this.pager == {pageSize: 100, pageNo: 1};
        }
    }

    queryData() {
        let {cardId, data} = this.state;

        let that = this;
        that.setState({listState: ListStatus.loading});
        fetchCardConsumeHistory(cardId, this.pager.pageNo, this.pager.pageSize)
            .then(o => {
                if (!o.data.result || !o.data.result.length) {
                    that.setState({
                        listState: ListStatus.idle,
                        loadComplete: true,
                    });
                } else {
                    that.setState({
                        data: (o.data.result || []).concat(data),
                        listState: ListStatus.idle,
                        loadComplete: o.data.result.length < that.pager.pageSize,
                    });
                }
            })
            .catch(err => {
                that.setState({err: err, listState: ListStatus.error});
            });
    }

    loadMore = dis => {
        if (this.state.loadComplete) return;
        this.pager.pageNo += 1;
        this.queryData();
    };

    render() {
        const {data, listState} = this.state;
        return (
            <View style={consumeHistoryStyles.historyInfoBox}>
                <View style={consumeHistoryStyles.subTitleBox}>
                    <View style={consumeHistoryStyles.subTitleItem}>
                        <Text style={consumeHistoryStyles.subTitleText}>项目</Text>
                    </View>
                    <View style={consumeHistoryStyles.subTitleTime}>
                        <Text style={consumeHistoryStyles.subTitleText}>消费</Text>
                    </View>
                    <View style={consumeHistoryStyles.subTitleDate}>
                        <Text style={consumeHistoryStyles.subTitleText}>日期</Text>
                    </View>
                </View>
                <View style={consumeHistoryStyles.consumeHistoryBox}>
                    {data.length || listState === ListStatus.loading ? this.renderList(data, listState) : this.renderNoData()}
                </View>
            </View>
        );
    }

    renderItem = ({item, index}) => {
        let isOdd = index % 2 == 1;
        return (
            <View
                style={
                    consumeHistoryStyles[isOdd ? 'historyOddList' : 'historyEvenList']
                }
            >
                <View style={consumeHistoryStyles.historyItem}>
                    <Text style={consumeHistoryStyles.historyListText} numberOfLines={1} ellipsizeMode={'tail'}>
                        {item.itemName}
                    </Text>
                </View>
                <View style={consumeHistoryStyles.historyTime}>
                    <Text style={consumeHistoryStyles.historyListText}>
                        {item.cardType == 1
                            ? item.paidMoneyPerformance + '元'
                            : item.consumeTimeAmount + '次'}
                    </Text>
                </View>
                <View style={consumeHistoryStyles.historyDate}>
                    <Text style={consumeHistoryStyles.historyListText}>
                        {item.createTime}
                    </Text>
                </View>
            </View>
        );
    };

    renderNoData = () => {
        return (
            <ViewContainer>
                <MarginContainer>
                    <ImageNoContent
                        source={require('@imgPath/no-content.png')}
                        resizeMode={'contain'}
                    />
                    <NoneMsg>{'暂时没有内容~'}</NoneMsg>
                </MarginContainer>
            </ViewContainer>
        );
    };

    renderList = (data, listState) => {
        return (
            <FlatList
                data={data}
                keyExtractor={(item, index) => index}
                initialNumToRender={this.pager.pageSize}
                renderItem={this.renderItem}
                onEndReached={this.loadMore.bind(this)}
                ListFooterComponent={
                    <FlatListFooter
                        state={listState}
                        pageSize={this.pager.pageSize}
                        itemCount={data.length}
                    />
                }
                onEndReachedThreshold={0.1}
            />
        );
    }
}
