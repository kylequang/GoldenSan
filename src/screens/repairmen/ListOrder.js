import { List } from 'react-native-paper';
import { Text, Button, View, FlatList, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const data = [
    {
        id: 1,
        name: 'Kỳ Lê Quang',
        add: 'Đà Nẵng',
        sex: 'Nam',
        avatar: require('../../../assets/image/avatar/avatar1.png'),
        fixDay: '15:00 20/04/2022',
        description: 'Vui lòng sủa giùm tôi'
    },
    {
        id: 2,
        name: 'Kỳ Lê Quangs',
        add: 'Đà Nẵng',
        sex: 'Nữ',
        avatar: require('../../../assets/image/avatar/avatar1.png'),
        fixDay: '15:00 20/04/2022',
        description: 'Vui lòng sủa giùm tôi'
    },
    {
        id: 3,
        name: 'Kỳ Lê Quang',
        add: 'Đà Nẵng',
        sex: 'Nam',
        avatar: require('../../../assets/image/avatar/avatar1.png'),
        fixDay: '15:00 20/04/2022',
        description: 'Vui lòng sủa giùm tôi'
    },
    {
        id: 4,
        name: 'Kỳ Lê Quang',
        add: 'Đà Nẵng',
        sex: 'Nữ',
        avatar: require('../../../assets/image/avatar/avatar1.png'),
        fixDay: '15:00 20/04/2022',
        description: 'Vui lòng sủa giùm tôi'
    },
    {
        id: 5,
        name: 'Kỳ Lê Quang',
        add: 'Đà Nẵng',
        sex: 'Nam',
        avatar: require('../../../assets/image/avatar/avatar1.png'),
        fixDay: '15:00 20/04/2022',
        description: 'Vui lòng sủa giùm tôi'
    },
]

export default function ListOrder() {
    const [selectedId, setSelectedId] = useState(null);
    const RenderItem = ({ item }) => {
        const expanded = item.id == selectedId ? true : false;
        return (
            <List.Accordion
                key={item.id}
                title={item.name}
                description={item.add}
                titleNumberOfLines={15}
                left={() => <Image style={styles.avatar} source={item.avatar} />}
                expanded={expanded}
                onPress={() => { selectedId ? setSelectedId(null) : setSelectedId(item.id) }}>
                <View>
                    <Text>Thời Gian Bắt Đầu Sửa Chữa</Text>
                    <Text>{item.fixDay}</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row',marginBottom:2,marginTop:2 }}>
                        <MaterialCommunityIcons name='credit-card' size={25} color='#ffa366' />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={{ fontSize: 18 }}>Thông tin liên lạc</Text>
                            <Text>SDT: 123456789</Text>
                            <Text>Địa chỉ: Đà Nẵng</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row',marginBottom:2,marginTop:2 }}>
                        <MaterialCommunityIcons name='credit-card' size={25} color='#ffa366' />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={{ fontSize: 18 }}>Mô tả công việc</Text>
                            <Text>SDT: 123456789</Text>
                            <Text>Địa chỉ: Đà Nẵng</Text>
                        </View>
                    </View>
                </View>

            </List.Accordion>
        )
    }
    return (
        <List.Section title="Đơn Hàng Đang Đợi Bạn - Nhanh Tay Nào !"
        >
            {
                data && <FlatList data={data} renderItem={RenderItem}
                    keyExtractor={item => item.id} />
            }
        </List.Section>
    )
}
const styles = StyleSheet.create({
    avatar: {
        height: 80,
        width: 70,
        resizeMode: 'contain'
    }
})