import * as React from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
// Firebase references
const app = getApp();
const auth = getAuth();

// Double-check that we can run the example
if (!app?.options || Platform.OS === 'web') {
    throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}

export default function Phone() {
    // Ref or state management hooks
    const recaptchaVerifier = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();

    const firebaseConfig = app ? app.options : undefined;
    const [message, showMessage] = React.useState();
    const attemptInvisibleVerification = false;

    return (
        <View style={{ padding: 20, marginTop: 50 }}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={app.options}
            />
            <Text style={{ marginTop: 20 }}>Enter phone number</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                placeholder="+84 037-444-8052"
                autoFocus
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
            />
            <Button
                title="Send Verification Code"
                disabled={!phoneNumber}
                onPress={async () => {
                    try {
                        const phoneProvider = new PhoneAuthProvider(auth);
                        const verificationId = await phoneProvider.verifyPhoneNumber(
                            phoneNumber,
                            recaptchaVerifier.current
                        );
                        setVerificationId(verificationId);
                        showMessage({
                            text: 'Verification code has been sent to your phone.',
                        });
                    } catch (err) {
                        showMessage({ text: `Error: ${err.message}`, color: 'red' });
                    }
                }}
            />
            <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
            <TextInput
                style={{ marginVertical: 10, fontSize: 17 }}
                editable={!!verificationId}
                placeholder="123456"
                onChangeText={setVerificationCode}
            />
            <Button
                title="Confirm Verification Code"
                disabled={!verificationId}
                onPress={async () => {
                    try {
                        const credential = PhoneAuthProvider.credential(
                            verificationId,
                            verificationCode
                        );
                        await signInWithCredential(auth, credential);
                        showMessage({ text: 'Phone authentication successful 👍' });
                    } catch (err) {
                        showMessage({ text: `Error: ${err.message}`, color: 'red' });
                    }
                }}
            />
            {message ? (
                <TouchableOpacity
                    style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: 0xffffffee, justifyContent: 'center' },
                    ]}
                    onPress={() => showMessage(undefined)}>
                    <Text
                        style={{
                            color: message.color || 'blue',
                            fontSize: 17,
                            textAlign: 'center',
                            margin: 20,
                        }}>
                        {message.text}
                    </Text>
                </TouchableOpacity>
            ) : (
                undefined
            )}
            {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
        </View>
    );
}