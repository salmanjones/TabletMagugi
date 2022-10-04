import React from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList, Image, TouchableOpacity, InteractionManager, ScrollView } from 'react-native';
import { cashierBillingStyle, rotateBigModalStyle, AmendServicerModalStyle } from '../styles';
import { getServiceStaffsAction } from '../actions';
import { getImage, ImageQutity } from '../utils';

class StaffSelectBoxV2Class extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedStaffId: '',
            currentCate: null,
            allSections: [],
            cates: [],
            sections: [],
            clearServicerGridChoose: true,
        };
    }

    UNSAFE_componentWillMount() {
        if (!(this.props.data instanceof Array)) {
            this.setState(this.buildState(this.props.data, this.props.filter));
        }
    }

    componentDidMount() {
        const { getServiceStaffs } = this.props;
        InteractionManager.runAfterInteractions(() => {
            getServiceStaffs();
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { clearServicerGridChoose, data, filter } = this.props;
        if (nextProps.clearServicerGridChoose != clearServicerGridChoose) {
            this.setState({ clearServicerGridChoose: true });
        }
        if (nextProps.data && (nextProps.data != data || nextProps.filter != filter)) {
            //数据请求完成 或 过滤条件改变
            this.setState(this.buildState(nextProps.data, nextProps.filter));
        }
    }

    buildState = (data, filter) => {
        let filteredData = Object.keys(data).reduce((result, key) => {
            if (filter) {
                let staffs = data[key].filter(filter);
                staffs.length && (result[key] = staffs);
            } else {
                result[key] = data[key];
            }
            return result;
        }, {});

        if (!Object.keys(filteredData).length) {
            return {
                allSections: [],
                cates: [],
                sections: [],
            };
        }

        let cates = Object.keys(filteredData);
        let allSections = cates.map(key => {
            return { title: key, datas: filteredData[key] };
        });

        return {
            cates: cates,
            allSections: allSections,
            currentCate: { index: -1, name: '全部' },
            sections: allSections,
        };
    };

    onSelected = staff => {
        this.setState({
            selectedStaffId: staff.id,
            clearServicerGridChoose: false,
        });
        this.props.onSelected(staff);
    };
    onSelectCate = cate => {
        let sections;
        if (cate.index === -1) {
            sections = this.state.allSections;
        } else {
            sections = this.state.allSections.filter(x => x.title === cate.name);
        }
        this.setState({ sections: sections, currentCate: cate, selectedStaffId: '' });
    };

    reset = () => {
        this.setState({ selectedStaffId: '' });
    };
    render() {
        const { data, filter, option } = this.props;
        const { currentCate, cates, sections, selectedStaffId } = this.state;
        const isLeft = option && option.categoryPosition === 'left';
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {isLeft && <StaffPositions onSelectCate={this.onSelectCate} currentCate={currentCate} cates={cates} />}

                    {/* {sections.map((section, index) => {
                        return (
                            <View key={index} style={[AmendServicerModalStyle.servicerImgBox]}>
                                <View style={cashierBillingStyle.servicerDuty}>
                                    <Text style={cashierBillingStyle.servicerDutyText}>{section.title}</Text>
                                </View>
                                <View style={cashierBillingStyle.servicerGroupOther}>
                                    <FlatList
                                        data={section.datas}
                                        numColumns={3}
                                        initialNumToRender={10}
                                        keyExtractor={(item, index) => index}
                                        extraData={selectedStaffId}
                                        renderItem={({ item }) => (
                                            <StaffListItem
                                                key={item.id}
                                                data={item}
                                                selected={selectedStaffId == item.id}
                                                onPress={this.onSelected}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        );
                    })} */}
                    <FlatList
                        data={sections}
                        initialNumToRender={8}
                        keyExtractor={(item, index) => index}
                        extraData={selectedStaffId}
                        renderItem={({ item,index }) => (
                            <View key={index} style={[AmendServicerModalStyle.servicerImgBox]}>
                                <View style={cashierBillingStyle.servicerDuty}>
                                    <Text style={cashierBillingStyle.servicerDutyText}>{item.title}</Text>
                                </View>
                                <View style={cashierBillingStyle.servicerGroupOther}>
                                    <FlatList
                                        data={item.datas}
                                        initialNumToRender={12}
                                        numColumns={3}
                                        keyExtractor={(item, index) => index}
                                        extraData={selectedStaffId}
                                        renderItem={({ item }) => (
                                            <StaffListItem key={item.id} data={item} selected={selectedStaffId == item.id} onPress={this.onSelected} />
                                        )}
                                    />
                                </View>
                            </View>
                        )}
                    />

                {!isLeft && <StaffPositions onSelectCate={this.onSelectCate} currentCate={currentCate} cates={cates} />}
            </View>
        );
    }
}

class StaffPositions extends React.PureComponent {
    render() {
        const { onSelectCate, currentCate, cates } = this.props;
        return (
            <View style={[AmendServicerModalStyle.consumeBoxBorderOtherA, { width: '13.2%', height: '100%' }]}>
                <View style={cashierBillingStyle.consumeOrderGenreLi}>
                    <TouchableOpacity onPress={() => onSelectCate({ index: -1, name: '全部' })}>
                        <Text style={ currentCate && currentCate.index === -1
                                    ? cashierBillingStyle.consumeOrderGenreTextActive
                                    : cashierBillingStyle.consumeOrderGenreText
                            }>
                            全部
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {cates.map((cate, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onSelectCate({ index: index, name: cate })}
                            style={cashierBillingStyle.consumeOrderGenreLi}
                        >
                            <Text
                                style={
                                    currentCate.index === index
                                        ? cashierBillingStyle.consumeOrderGenreTextActive
                                        : cashierBillingStyle.consumeOrderGenreText
                                }
                            >
                                {cate}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

class StaffListItem extends React.PureComponent {
    render() {
        const { data, selected, onPress } = this.props;
        return (
            <TouchableOpacity
                style={!selected ? cashierBillingStyle.servicerItem : cashierBillingStyle.servicerItemActive}
                onPress={() => {
                    onPress(data);
                }}
            >
                <View style={cashierBillingStyle.servicerItemBox}>
                    <Image resizeMethod="resize"
                        source={getImage(data.showImage, ImageQutity.staff, require('@imgPath/rotate-portrait.png'))}
                        style={cashierBillingStyle.servicerItemImg}
                        defaultSource={require('@imgPath/rotate-portrait.png')}
                    />
                    <View style={cashierBillingStyle.servicerInfo}>
                        <View style={cashierBillingStyle.servicerItemNum}>
                            <Text style={cashierBillingStyle.servicerItemText} numberOfLines={1} ellipsizeMode={'tail'}>{data.storeStaffNo}</Text>
                        </View>
                        <View style={cashierBillingStyle.servicerItemName}>
                            <Text style={cashierBillingStyle.servicerItemText} numberOfLines={1} ellipsizeMode={'tail'}>
                                {data.value}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.component.staffSevice.data,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        getServiceStaffs: () => {
            dispatch(getServiceStaffsAction());
        },
    };
};

export const StaffSelectBoxV2 = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { }
)(StaffSelectBoxV2Class);
