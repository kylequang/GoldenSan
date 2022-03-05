import { Text, StyleSheet, Image, LogBox, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getData } from '../../service/getData';
import RepairmenLoading from '../../components/animation/RepairmenLoading';

export default function Index({ navigation }) {
    const [category, setCategory] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(async () => {
        LogBox.ignoreLogs(['Setting a timer']);
        setTimeout(() => {
            setShowLoading(false)
        }, 4000);
        setCategory(await getData('category'));
        console.log('Category');
    }, [])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('listRepairmen', { name: item.name, role: item.role })}
            >
                <Image
                    style={styles.img}
                    source={{ uri: item.photoURL }}
                />
                <Text style={styles.textCategory}>{item.name}</Text>
            </TouchableOpacity>
        );
    };
    if (showLoading) return <RepairmenLoading />
    return (
        <SafeAreaView style={styles.container}>
            {
                category &&
                <FlatList
                    data={category}
                    numColumns={2}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            }
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
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5
    }
})


