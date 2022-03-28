import { Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index({ navigation, route }) {
    const category = route.params.category;
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                key={item.role}
                style={styles.button}
                onPress={() => navigation.navigate('listRepairmen', { name: item.name, job: item.job })}
            >
                <Image
                    style={styles.img}
                    source={{ uri: item.photoURL }}
                />
                <Text style={styles.textCategory}>{item.name}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            {
                category &&
                <FlatList
                    data={category}
                    keyExtractor={item => item.role}
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


