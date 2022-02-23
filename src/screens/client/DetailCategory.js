import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const dataDetailCategory = [
    {
        id: 1,
        name: 'Lắp đặt, sửa chữa thiết bị điện gia dụng',
        image: require('../../../assets/image/category/thodien.png'),
        des: 'Sửa chữa, lắp đặt các loại quạt, đèn, máy bơm, điều hòa, lò vi sóng, bàn ủi, bếp điện, bình nước nóng.....'
    },
    {
        id: 2,
        name: 'Lắp đặt, bảo trì thiết bị điều khiển và cảnh báo',
        image: require('../../../assets/image/category/thonuoc.png'),
        des: 'Lắp các mạch điện chiếu sáng, báo cháy, chống trộm, cửa tự động...'
    },
    {
        id: 3,
        name: 'Lắp đặt, sửa chữa hệ thống điện dân dụng',
        image: require('../../../assets/image/category/thomaylanh.png'),
        des: 'Nối dây, đi dây điện, lắp đặt hệ thống ống luồn, lập bảng điện điều khiển, hệ thống ổ cắm; lắp đặt hệ thống đèn cao áp, đèn chiếu sáng....'
    }, {
        id: 4,
        name: 'Thực hiện các công việc bổ trợ nghề:',
        image: require('../../../assets/image/category/thomaylanh.png'),
        des: 'đục kim loại, cưa, khoan, cắt, mài, hàn thiếc, uống ống , tạo ren....'
    },
];
export default function DetailCategory({ navigation }) {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('listRepaimen', { name: item.name })}
                >
                    <Image style={styles.img} source={item.image} />
                    <View>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.des}>Mô Tả: {item.des}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={dataDetailCategory}
                numColumns={1}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content:{
        flex:1,
        marginBottom:10
    },
    row: {
        flexDirection: 'row'
    },
    img: {
        height: 110,
        width: 100,
        marginRight:10
    },
    button: {
        width:'70%',
        flexDirection: 'row',
        alignItems:'center',
        padding:15,
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
    },
    des:{
      fontSize:15,
    }
})



