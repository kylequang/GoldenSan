import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function TakeCamera() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);



    let camera;
    async function takePicture() {
        console.log('hihi')
        if (camera) {
            const options = { quality: 0.5 };
            const data = await camera.takePictureAsync(options);
            console.log(data.uri);
        }
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={styles.text}> Chuyển </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        flexDirection: 'row',
                        flex: 1,
                        width: '100%',
                        padding: 20,
                        justifyContent: 'space-between'
                    }}
                >
                    <View
                        style={{
                            alignSelf: 'center',
                            flex: 1,
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={takePicture}
                            style={{
                                width: 70,
                                height: 70,
                                bottom: 0,
                                borderRadius: 50,
                                backgroundColor: 'red'
                            }}
                        />
                    </View>
                </View>
            </Camera>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 2 / 3,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 10,
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});