import React from 'react';
import {Image, Text, View} from 'react-native';
import {Avatar, Icon, ListItem} from 'react-native-elements';
import {commonStyles} from '../../../styles';
import {getImage, ImageQutity} from '../../../utils';

const defaultMemberImg = 'https://pic.magugi.com/rotate-portrait.png';

// 多档案列表
export class MemberListItem extends React.PureComponent {
    render() {
        const {selected, data, onPress, isShowReserve} = this.props;
        const memberImg = getImage(
            data.imgUrl,
            ImageQutity.member_small,
            defaultMemberImg
        );

        return (
            <ListItem
                key={data.id} bottomDivider
                containerStyle={
                    selected
                        ? commonStyles.MemberListBoxActive
                        : commonStyles.MemberListBox
                }
                onPress={() => {
                    onPress(data);
                }}>
                <Avatar rounded style={commonStyles.MemberListAvatar} containerStyle={commonStyles.MemberListAvatar}
                        source={memberImg}/>
                <ListItem.Content>
                    <ListItem.Title style={{color: 'red'}}>
                        {
                            <View style={commonStyles.MemberListNameBox}>
                                {
                                    (data.name == '' || data.name == '散客' || data.name == null) ?
                                        <Text style={commonStyles.MemberListName}>
                                            手机尾号:{(data == undefined || data.phone == undefined || data.phone == '') ? "" : data.phone.substr(7)}
                                        </Text>
                                        :
                                        <Text style={commonStyles.MemberListName} numberOfLines={1}
                                              ellipsizeMode={'tail'}>
                                            {data.name}
                                        </Text>
                                }
                                {data.sex == 0 ?
                                    <Image resizeMethod="resize" source={require('@imgPath/sex_female.png')}
                                           style={commonStyles.MemberListSexImage}/>
                                    :
                                    <Image resizeMethod="resize" source={require('@imgPath/sex_man.png')}
                                           style={commonStyles.MemberListSexImage}/>
                                }
                            </View>
                        }
                    </ListItem.Title>
                    <ListItem.Subtitle>
                        {
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
                                {isShowReserve &&
                                    <Image resizeMethod="resize" source={require('@imgPath/appointment_img.png')}
                                           style={commonStyles.appointmentImage}/>}
                            </View>
                        }
                    </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                    <ListItem.Title right
                                    style={isShowReserve ? commonStyles.MemberListPhoneR : commonStyles.MemberListPhone}>
                        {data.phone}
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
        );
    }
}
