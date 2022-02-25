import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Formik } from 'formik'
import * as yup from 'yup'

export default function Information({navigation}) {

  const [checked, setChecked] = useState('nam');
  const [checkInput, setCheckInput] = useState(true);
  const loginValidationSchema = yup.object().shape({
    fullName: yup
      .string()
      .email("Nhập họ tên đầy đủ của bạn")
      .required('Yêu cầu nhập họ và tên'),
    email: yup
      .string()
      .email("Vui lòng nhập email")
      .required('Yêu cầu nhập email'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Yêu cầu nhập mật khẩu'),
  })

  return (
    <View style={styles.loginContainer}>
      <Text>Thông tin cá nhân</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={navigation.navigate('home')}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <TextInput
              name="fullName"
              placeholder="Họ và Tên"
              style={styles.textInput}
              onChangeText={handleChange('fullName')}
              // onBlur={handleBlur('fullName')}
              value={values.fullName}
            />
            {errors.fullName &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.fullName}</Text>
            }

            <TextInput
              name="email"
              placeholder="Địa chỉ Email"
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
            }
            <TextInput
              name="password"
              placeholder="Mật khẩu"
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
            }
            <TextInput
              name="password"
              placeholder="Xác nhận mật khẩu"
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
            }

            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text>Nam</Text>
                <RadioButton
                  value="nam"
                  status={checked === 'nam' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('nam')}
                />
              </View>
              <View>
                <Text>Nữ</Text>
                <RadioButton
                  value="nu"
                  status={checked === 'nu' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('nu')}
                />
              </View>
            </View>
            <Button
              onPress={handleSubmit}
              title="Tiếp Tục"
              disabled={ !isValid }
            />
          </>
        )}
      </Formik>
    </View>
  )
}
const styles = StyleSheet.create({

  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  textInput: {
    height: 40,
    width: '80%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingLeft: 10
  },
  button1: {
    backgroundColor: 'gray'
  },
  button2: {
    backgroundColor: 'red'
  }
})