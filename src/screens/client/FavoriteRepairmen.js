import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity, LogBox, } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ScanLoadingLocation from '../../../src/components/animation/ScanLoadingLocation';
import { scanLocation } from '../../service/getData';
import SadFaceStatus from '../../components/animation/SadFaceStatus';

export default function FavoriteRepairmen({ navigation, route }) {
    const { job } = route.params;
    const [loading, setLoading] = useState(true);
    const [goodRepairmen, setGoodRepairmen] = useState([]);
    useEffect(async () => {
        LogBox.ignoreLogs(['Setting a timer'])
        console.log("Tìm kiếm thợ ưa chuộng");
        setGoodRepairmen(await scanLocation(job, 10, 4.5))
        setLoading(false);
    }, [])

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.button}
            key={item.uid}
            onPress={() => navigation.navigate('detailRepairmen', { item, name: item.name })}
        >
            <Image
                style={styles.img}
                source={{ uri: item.photoURL }}
            />
            <View style={styles.profileLeft}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{item.name}  <Text>{item.age}</Text></Text>
                <Text >{item.phoneNumber}</Text>
                <Text style={{ marginTop: 5 }}>Thợ {item.job}</Text>
            </View>
            <View style={styles.profileRight}>
                <View style={styles.row}>
                    <Text style={{ fontSize: 20 }}>{item.totalAVG} </Text>
                    <FontAwesome name="star" size={20} color={"#ffcc00"} />
                    <Text>  ({item.totalCount})</Text>
                </View>
                <Text style={{ marginTop: 30 }}>{item.sex}</Text>
            </View>
        </TouchableOpacity>
    )

    if (loading) return <ScanLoadingLocation />
    return (
        <View style={styles.container}>
            {
                goodRepairmen.length == 0 ? <SadFaceStatus job={job} title="nổi bật" /> :
                    goodRepairmen && <FlatList
                        data={goodRepairmen}
                        numColumns={1}
                        renderItem={renderItem}
                        keyExtractor={item => item.uid}
                    />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 6,
        backgroundColor: '#f2f2f2',
    },
    row: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 90,
        height: 90,
    },
    button: {
        alignItems: 'center',
        marginVertical: 8,
        padding: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
    },

    profileLeft: {
        width: '40%',
        marginLeft: 10
    },
    profileRight: {
        paddingLeft: 10,
        marginLeft: 10,
        width: '30%',
    }
})