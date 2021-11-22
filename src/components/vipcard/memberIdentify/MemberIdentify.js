import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    Image,
    TouchableOpacity ,
} from 'react-native';
import styled from 'styled-components/native/';
import { ListItem } from 'react-native-elements';

import { memberIdentifyStyle } from 'styles';
import {
    SearchModule,
    CardSelectBox,
    FlatListFooter,
    MemberListItem,
    MemberWaitListItem,
} from 'components';
import { ListStatus } from 'utils';
import { getMemberInfoAction, resetMemberAction } from 'actions';
import { fetchWaitingMembersResult } from 'services';
import { ModalLoadingIndicator } from "components";

export class MemberIdentifyComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            searchStart: false,
            member: {},
            memberList: [],
            loading: false,
        };
        // this.timer;
    }

     /**
     * 第一次渲染后调用
     */
    // componentDidMount(){
    //     this.setState({
    //         searchStart: false,
    //         loading:true
    //     });

    //     this.selectWaitingMemberResult();
    //     this.timer = setInterval(this.selectWaitingMemberResult.bind(this), 20000);
    // }

    /**
     * 执行完成后卸载组建
     */
    // componentWillUnmount(){
    //     this.timer && this.timer!=0 && clearInterval(this.timer);
    // }

    resetData = query => {
        this.setState({
            searchStart: false
        });
    };

    freshData = query => {
        this.setState({
            searchStart: false,
            loading:true
        });

        this.selectWaitingMemberResult();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.clearData) {
            this.setState({ member: {} });
            this.props.reset();
        }
    }

    queryData = query => {
        if (query !== '') {
            this.setState({
                searchStart: true,
                member: {},
                query,
            });
            this.props.fetchMemberInfo(query, true,false);
        }
    };

    loadMore = () => {
        if (
            this.state.searchStart &&
            this.props.pageNext &&
            this.props.listState !== ListStatus.loading
        ) {
            this.props.fetchMemberInfo(this.state.query, true, true);
        }
    };

    onMemberPress = member => {
        this.setState({ member });
        this.props.onMemberPress && this.props.onMemberPress(member);
    };

    onRechargePress = card => {
        const { navigation } = this.props;
        const { member } = this.state;
        InteractionManager.runAfterInteractions(() => {
            navigation.navigate('RechargeActivity', {
                card: card,
                member: member,
            });
        });
    };

    renderWaitingMemberItem = e => {
        let memberId = -1;
        this.state.member && (
            memberId = this.state.member.id
        )
        return (
            <MemberWaitListItem
                selected={memberId === e.item.id}
                data={e.item}
                onPress={this.onMemberPress}
                isShowReserve={e.item.reserveStatus === '0' ? true: false}
            />
        );
    };

    renderWaitMemberItem = e => {
        const { member: { id } } = this.state;
        return (
            <MemberListItem
                selected={id === e.item.id}
                data={e.item}
                onPress={this.onMemberPress}
                isShowReserve={e.item.reserveStatus === '0' ? true: false}
            />
        );
    };


    render() {
        const {
            list,
            showRecharge = true,
            showTab = true,
            pageSize,
            listState,
            navigation,
        } = this.props;

        const { query, searchStart, member ,memberList } = this.state;

        return (
            <View style={memberIdentifyStyle.cantioner}>
                <View style={memberIdentifyStyle.Body}>
                    <View style={memberIdentifyStyle.Box}>
                        <SearchModule
                            placeholder={'手机号、姓名或会员号'}
                            onSearchPress={this.queryData}
                            onResetPress={this.resetData}
                            wrapperStyle={memberIdentifyStyle.MemberQueryBoxLeft}
                        />

                        {!searchStart && (
                            <View style={{height:'87%'}}>
                                <View style={memberIdentifyStyle.waitTextBox}>
                                    <Text style={memberIdentifyStyle.waitText}>当前等待的顾客:</Text>
                                    <TouchableOpacity  style={memberIdentifyStyle.waitTextBoxImg} onPress = {this.freshData}>
                                        <Image resizeMethod="resize"  source={require('@imgPath/refresh_icon.png')} style={memberIdentifyStyle.waitRefreshTextImage} />
                                        <Text style={memberIdentifyStyle.waitRefreshText}>刷新</Text>
                                    </TouchableOpacity>
                                    <ModalLoadingIndicator loading={ this.state.loading } />
                                </View>
                                <FlatList
                                    data={memberList}
                                    extraData={member}
                                    keyExtractor={item => item.id}
                                    renderItem={this.renderWaitingMemberItem}
                                />
                            </View>
                        )}

                        {searchStart && (
                            <View style={{height:'87%'}}>
                                <FlatList
                                    data={list}
                                    keyExtractor={item => item.id}
                                    initialNumToRender={pageSize}
                                    extraData={member}
                                    renderItem={this.renderWaitMemberItem}
                                    onEndReached={this.loadMore}
                                    ListFooterComponent={
                                        <FlatListFooter
                                            state={listState}
                                            pageSize={pageSize}
                                            onRefresh={this.loadMore}
                                            itemCount={list.length}
                                        />
                                    }
                                    onEndReachedThreshold={0.1}
                                />
                            </View>

                        )}
                    </View>
                    <View style={{width: '50%',height:'100%'}}>
                        <CardSelectBox
                            searchStart={true}
                            showRecharge={showRecharge}
                            showTab={showTab}
                            member={member}
                            navigation={navigation}
                            onRechargePress={this.onRechargePress}
                        />
                    </View>
                    
                </View>
            </View>
        );
    }

    selectWaitingMemberResult = () => {

        // this.setState({
        //     loading:true
        // });

        if(!this.state.searchStart){

            let storeId = this.props.auth.userInfo.storeId;
            let showCard = '1';
            var self =this;
            fetchWaitingMembersResult(storeId ,showCard)
            .then(data => {
                self.setState(
                    {
                        memberList:data.data,
                        loading:false
                    }
                );

            }).catch(err => {
                alert("刷新异常！！！");
                    self.setState({
                        memberList:[],
                        loading:false
                    })
            });
        }
    };
}

const mapStateToProps = state => {
    const { memberIdentify } = state.component;
    return {
        auth: state.auth,
        list: memberIdentify.list,
        pageNext: memberIdentify.pageNext,
        pageSize: memberIdentify.pageSize,
        listState: memberIdentify.listState,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchMemberInfo: getMemberInfoAction,
            reset: resetMemberAction,
        },
        dispatch
    );

export const MemberIdentify = connect(mapStateToProps, mapDispatchToProps)(
    MemberIdentifyComponent
);
