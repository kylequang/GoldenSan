import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../../database/firebase';
import * as Progress from 'react-native-progress';
import { getDownloadURL, ref, uploadBytesResumable, uploadBytes, } from 'firebase/storage';
export default function UploadImg() {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false)

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); // permission
        if (permissionResult.granted === false) {
            alert("Quyền truy cập bị từ chối!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            console.log(result);
            setImage(result.uri)
            setUploading(true)
        }
    }

    const metadata = {
        contentType: 'image/jpg',
    };
    const upImg = async () => {
        const filename = image.substring(image.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? image.replace('file://', '') : image;

        const avatarRef = ref(storage, 'client/' + filename);
      
        const img = await fetch(image);
        const bytes = await img.blob();
        // await uploadBytes(avatarRef, bytes).then(async (e) => {
        //     const url = await getDownloadURL(avatarRef);
        //     console.log(url);
        // });
        const uploadTask = uploadBytesResumable(avatarRef, bytes, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
        );

    }



    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Chọn Ảnh Đại Diện" onPress={openImagePickerAsync} />
            {
                uploading ? (<Button title="Upload" onPress={() => upImg(image)} />) : (<ActivityIndicator size='large' color='black' />)}
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    )
}
