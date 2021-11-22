import React, { PureComponent } from 'react';
import { rotateItemStyles } from 'styles';
import { View, Text, ImageBackground, Image, TouchableOpacity, FlatList } from 'react-native';
import { Placard } from 'components';

// 未上牌
class NullRotateItem extends React.PureComponent {
    render() {
        return (
            <View style={rotateItemStyles.nullItem}>
                <Image resizeMethod="resize"  source={require('@imgPath/rotate-item-null.png')} style={rotateItemStyles.nullItemImage} />
                <Text style={rotateItemStyles.nullTextTip}>还没有上牌的员工哦～</Text>
            </View>
        );
    }
}

export class PlacardGroup extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sortting: false,
            staffs: props.staffs || [],
        };
        this.staffEleRefs = {};
        this.staffsBackup = [];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.staffs) {
            this.setState({
                staffs: nextProps.staffs,
            });
        }
    }

    onToggleSortting = isSaving => {
        let that = this;
        this.setState((prestate, props) => {
            let result = { sortting: !prestate.sortting, staffs: [...prestate.staffs] };

            let { sortting, staffs } = prestate;
            if (!sortting) {
                that.staffsBackup = [...staffs];
            } else {
                if (isSaving) {
                    that.staffsBackup = [];
                } else {
                    result.staffs = that.staffsBackup;
                }
            }

            return result;
        });

        //this.staffEleRefs[Object.keys(this.staffEleRefs)[0]].rotate();
    };

    moveBack = staff => {
        this.setState((prestate, props) => {
            let staffs = [...prestate.staffs];

            let index = staffs.indexOf(staff);
            if (index == -1 || index == 0) return;

            staffs[index - 1] = staffs.splice(index, 1, staffs[index - 1])[0];

            return {
                staffs: staffs,
            };
        });
    };

    moveForward = staff => {
        this.setState((prestate, props) => {
            let staffs = [...prestate.staffs];

            let index = staffs.indexOf(staff);
            if (index == -1 || index == staffs.length - 1) return;

            staffs[index + 1] = staffs.splice(index, 1, staffs[index + 1])[0];

            return {
                staffs: staffs,
            };
        });
    };

    render() {
        const { id, onForward, onBack, setting, onItemSeleted, onAddStaff, onSaveSort, index } = this.props;
        const { sortting, staffs } = this.state;
        let isStanding = setting.type === '1';
        let hasData = staffs && staffs.length > 0;
        console.log('Placard group render');
        return (
            <View style={index % 2 == 1 ? rotateItemStyles.rotateBodyOdd : rotateItemStyles.rotateBody}>
                <View style={rotateItemStyles.rotateTitleBox}>
                    <Image resizeMethod="resize"
                        source={index % 2 == 1 ? require('@imgPath/down-flow-FDF3DD.png') : require('@imgPath/down-flow-E9EFFF.png')}
                        style={rotateItemStyles.rotateTitleFlow}
                    />
                    <View
                        style={
                            index == 0
                                ? rotateItemStyles.rotateTitleOne
                                : index % 2 == 1
                                ? rotateItemStyles.rotateTitleOdd
                                : rotateItemStyles.rotateTitle
                        }
                    >
                        <View style={rotateItemStyles.rotateTitleL}>
                            <Text
                                style={isStanding ? [rotateItemStyles.rotateTitleText, rotateItemStyles.textGreen] : rotateItemStyles.rotateTitleText}
                            >
                                {setting.cardName}
                            </Text>
                            <Text style={rotateItemStyles.rotateTitleRtip}>
                                {sortting
                                    ? '操作提示：[向左]则左移一位，[向右]则右移一位，点击[保存排序]则手动排序生效'
                                    : '操作提示：轻按-可进行轮牌操作，点击【排序】可进行手动排序'}
                            </Text>
                        </View>
                        <View style={rotateItemStyles.rotateTitleR}>
                            {sortting && (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.onToggleSortting(true);
                                        onSaveSort(id, this.state.staffs);
                                    }}
                                >
                                    <ImageBackground source={require('@imgPath/btn-border-111c3c.png')} style={rotateItemStyles.rotateTitleBtnO}
                                    resizeMode={'contain'}>
                                        <Text style={rotateItemStyles.rotateItemText}>{'保存排序'}</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={() => this.onToggleSortting()}>
                                <ImageBackground source={require('@imgPath/btn-border-111c3c.png')} style={rotateItemStyles.rotateTitleBtn}
                                resizeMode={'contain'}>
                                    <Text style={rotateItemStyles.rotateItemText}>{sortting ? '取消' : '排序'}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {hasData ? (
                    <FlatList
                        style={rotateItemStyles.rotateListBox}
                        data={staffs}
                        keyExtractor={item => item.staffId}
                        renderItem={({ item, index }) => {
                            let staff = item;
                            let isFirst = index === 0;
                            let isLast = index === staffs.length - 1;
                            return (
                                <TouchableOpacity key={staff.staffId} onPress={sortting ? () => {} : () => onItemSeleted(staff)}>
                                    <Placard
                                        ref={ref => {
                                            this.staffEleRefs[staff.staffId] = ref;
                                        }}
                                        staff={staff}
                                        serviceStatus={staff.serviceStatus}
                                        setting={setting}
                                        isFirst={isFirst}
                                        isLast={isLast}
                                        onForward={this.moveForward}
                                        onBack={this.moveBack}
                                        sortting={sortting}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                ) : (
                    <NullRotateItem />
                )}
            </View>
        );
    }
}
