import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { ListItem } from 'react-native-elements';

import { commonStyles } from 'styles';

import { ImageQutity, getImage } from 'utils';

const defaultMemberImg = require('@imgPath/rotate-portrait.png');
export class MemberListItem extends React.PureComponent {
    render() {
        const { selected, data, onPress, isShowReserve } = this.props;
        const memberImg = getImage(
            data.imgUrl,
            ImageQutity.member_small,
            defaultMemberImg
        );

        return (
            <ListItem
                containerStyle={
                    selected
                        ? commonStyles.MemberListBoxActive
                        : commonStyles.MemberListBox
                }
                avatar={memberImg}
                avatarContainerStyle={commonStyles.MemberListAvatar}
                avatarStyle={commonStyles.MemberListAvatar}
                key={data.id}
                title={
                    <View style={commonStyles.MemberListNameBox}>
                        {
                            (data.name == '' || data.name == '散客' || data.name == null) ?
                                <Text style={commonStyles.MemberListName}>
                                    手机尾号:{(data == undefined || data.phone == undefined || data.phone == '')  ?"":data.phone.substr(7)}
                                </Text>
                            :
                                <Text style={commonStyles.MemberListName} numberOfLines={1} ellipsizeMode={'tail'}>
                                    {data.name}
                                </Text>
                        }
                        {data.sex == 0 ?
                            <Image resizeMethod="resize"  source={require('@imgPath/sex_female.png')} style={commonStyles.MemberListSexImage} />
                            :
                            <Image resizeMethod="resize"  source={require('@imgPath/sex_man.png')} style={commonStyles.MemberListSexImage} />
                        }
                    </View>
                }
                subtitle={
                    <View style={commonStyles.MemberListRightBox}>
                        <View>
                            {data.memberType == 0 ?
                                    <View style={commonStyles.MemberListInfo}>
                                        <Text style={commonStyles.MemberListNumberOther}>
                                            会员
                                        </Text>
                                        <Text style={commonStyles.MemberListNumber}>
                                            {data.memberCardNo}
                                        </Text>
                                    </View>
                                :
                                    <View style={commonStyles.MemberListInfo}>
                                        <Text style={commonStyles.MemberListNumberOther}>
                                            散客
                                        </Text>
                                        <Text style={commonStyles.MemberListNumber}>
                                            {data.memberCardNo}
                                        </Text>
                                    </View>
                            }
                        </View>
                        {/* 预约按钮 */}
                        {isShowReserve && <Image resizeMethod="resize"  source={require('@imgPath/appointment_img.png')} style={commonStyles.appointmentImage} />}
                    </View>
                }
                hideChevron
                rightTitle={data.phone}
                rightTitleStyle={commonStyles.MemberListPhone}
                onPress={() => {
                    onPress(data);
                }}
            />
        );
    }
}
