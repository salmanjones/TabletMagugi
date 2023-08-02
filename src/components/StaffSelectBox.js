import React from 'react';
import {connect} from 'react-redux';
import {FlatList, Image, InteractionManager, Text, TouchableOpacity, View,} from 'react-native';
import {cashierBillingStyle} from '../styles';
import {getServiceStaffsAction} from '../actions';
import {getImage, ImageQutity, PixelUtil} from '../utils';

class StaffListItem extends React.PureComponent {
    render() {
        const {data, selected, onPress} = this.props;
        return (
            <TouchableOpacity
                style={
                    !selected
                        ? cashierBillingStyle.servicerItem
                        : cashierBillingStyle.servicerItemActive
                }
                onPress={() => {
                    onPress(data);
                }}>
                <View style={cashierBillingStyle.servicerItemBox}>
                    <Image resizeMethod="resize"
                           source={getImage(
                               data.showImage,
                               ImageQutity.staff,
                               require('@imgPath/rotate-portrait.png')
                           )}
                           style={cashierBillingStyle.servicerItemImg}
                           defaultSource={require('@imgPath/rotate-portrait.png')}
                    />
                    <View style={cashierBillingStyle.servicerInfo}>
                        <View style={cashierBillingStyle.servicerItemNum}>
                            <Text style={cashierBillingStyle.servicerItemText} numberOfLines={1} ellipsizeMode={'tail'}>
                                {data.storeStaffNo}
                            </Text>
                        </View>
                        <View style={cashierBillingStyle.servicerItemName}>
                            <Text
                                style={cashierBillingStyle.servicerItemText}
                                numberOfLines={1} ellipsizeMode={'tail'}
                            >
                                {data.value}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class StaffSelectBoxClass extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedStaffId: '',
            clearServicerGridChoose: true,
        };
    }

    componentDidMount() {
        const {getServiceStaffs} = this.props;
        getServiceStaffs();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {clearServicerGridChoose} = this.props;
        if (nextProps.clearServicerGridChoose != clearServicerGridChoose) {
            this.setState({clearServicerGridChoose: true});
        }
    }

    onSelected = staff => {
        this.setState({
            selectedStaffId: staff.id,
            clearServicerGridChoose: false,
        });
        this.props.onSelected(staff);
    };

    render() {
        const {data, filterServicerData} = this.props;
        let self = this;
        let filterData = [];
        let sections = [];
        if (self.props.isFilter) {
            Object.keys(data).forEach(key => {
                if (self.props.filterServicerKey.length > 0) {
                    if (self.props.filterServicerKey.trim() == key.trim()) {
                        if (filterServicerData && filterServicerData.length > 0) {
                            let validStaff = [];
                            data[key].forEach((tmpAStaff) => {
                                if (filterServicerData.indexOf(tmpAStaff.id) != -1) {
                                    validStaff.push(tmpAStaff);
                                }
                            })

                            filterData.push({title: key, datas: validStaff});
                        } else {
                            filterData.push({title: key, datas: data[key]});
                        }

                    }
                } else {
                    if (filterServicerData && filterServicerData.length > 0) {
                        let validStaff = [];
                        data[key].forEach((tmpAStaff) => {
                            if (filterServicerData.indexOf(tmpAStaff.id) != -1) {
                                validStaff.push(tmpAStaff);
                            }
                        })

                        filterData.push({title: key, datas: validStaff});
                    } else {
                        filterData.push({title: key, datas: data[key]});
                    }
                }
            });

            //filter by staffId
            sections = filterData.filter((sec) => {
                return sec.datas && sec.datas.length > 0
            })
        } else {
            sections = Object.keys(data).map(key => {
                return {title: key, datas: data[key]};
            });
        }

        return (
            <View style={{height: '100%'}}>
                <FlatList
                    data={sections}
                    keyExtractor={item => item.title}
                    renderItem={this.renderSection}
                />
            </View>
        );
    }

    renderSection = ({item}) => {
        return (
            <View style={cashierBillingStyle.servicerImgBox}>
                <View style={cashierBillingStyle.servicerDuty}>
                    <Text style={cashierBillingStyle.servicerDutyText}>{item.title}</Text>
                </View>
                <View style={cashierBillingStyle.servicerGroup}>
                    {item.datas.map((staff, index) => {
                        return (
                            <StaffListItem
                                key={staff.id}
                                data={staff}
                                selected={
                                    !(
                                        this.state.selectedStaffId != staff.id ||
                                        this.state.clearServicerGridChoose == true
                                    )
                                }
                                onPress={this.onSelected}
                            />
                        );
                    })}
                </View>
            </View>
        );
    };
}

StaffSelectBoxClass.defaultProps = {
    data: [],
};

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

export const StaffSelectBox = connect(mapStateToProps, mapDispatchToProps)(
    StaffSelectBoxClass
);
