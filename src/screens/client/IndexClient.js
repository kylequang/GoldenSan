import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderUser from '../../components/HeaderUser';
const dataCategory = [
    {
        id: 1,
        name: 'Thợ Sửa Điện',
        image: require('../../../assets/image/category/thodien.png')
    },
    {
        id: 2,
        name: 'Thợ Sửa Nước',
        image: require('../../../assets/image/category/thonuoc.png'),
    },
    {
        id: 3,
        name: 'Thợ Máy Lạnh',
        image: require('../../../assets/image/category/thomaylanh.png'),
    },
    {
        id: 4,
        name: 'Thợ Máy Tính',
        image: require('../../../assets/image/category/thomaytinh.png'),
    },
    {
        id: 5,
        name: 'Thợ Sửa Khóa',
        image: require('../../../assets/image/category/thosuakhoa.png'),
    },
    {
        id: 6,
        name: 'Thợ Sửa Xây Dựng',
        image: require('../../../assets/image/category/thoxaydung.png'),
    },
    {
        id: 7,
        name: 'Thợ Sửa Xe',
        image: require('../../../assets/image/category/thotaxxi.png'),
    },
    {
        id: 8,
        name: 'Thợ Sửa WC',
        image: require('../../../assets/image/category/thowc.png'),
    },
];
export default function Index({ navigation }) {
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('detailCategory', { name: item.name })}
            >
                <Image
                    style={styles.img}
                    source={item.image}
                />
                <Text style={styles.textCategory}>{item.name}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <HeaderUser />
            <FlatList
                data={dataCategory}
                numColumns={2}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        padding: 5
    },
    img: {
        height: 150,
        width: 130,
    },
    button: {
        alignItems: 'center',
        width: '50%',
        marginBottom: 5,
        padding: 5
    },
    textCategory: {
        fontSize: 15,
        fontWeight: 'bold'
    }
})