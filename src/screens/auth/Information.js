import React, { useState, useRef, useEffect } from "react";
import { RadioButton } from 'react-native-paper';
import { StyleSheet, Text, TextInput, Alert, Button, View } from 'react-native';
import { Formik } from 'formik'
import * as yup from 'yup'

const Information = () => {

  const [checkSex, setCheckSex] = useState('nam');
  return (
    <View style={styles.loginContainer}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thông tin cá nhân</Text>
      <Formik
        initialValues={{
          name: '',
          email: '',
          Phone: '',
          password: ''
        }}
        onSubmit={values => {
          console.log(values.email)
          Alert.alert(JSON.stringify(values))
        }
        }
        validationSchema={yup.object().shape({
          name: yup
            .string()
            .required('Trường này là bắt buộc.'),
          email: yup
            .string()
            .email()
            .required('Trường này là bắt buộc.'),
          Phone: yup
            .number()
            .required('Trường này là bắt buộc'),
          password: yup
            .string()
            .min(4, 'Mật khẩu không được dưới 4 kí tự.')
            .max(11, 'Mật khẩu không được vượt quá 12 kí tự.')
            .required('Trường này bắt buộc'),
        })}
      >
        {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
          <>
            <TextInput
              value={values.name}
              style={styles.textInput}
              onBlur={() => setFieldTouched('name')}
              onChangeText={handleChange('name')}
              placeholder="Họ tên của bạn"
            />
            {touched.name && errors.name &&
              <Text style={styles.errorsText}>{errors.name}</Text>
            }
            <TextInput
              value={values.email}
              style={styles.textInput}
              onBlur={() => setFieldTouched('email')}
              onChangeText={handleChange('email')}
              placeholder="Email của bạn"
            />
            {touched.email && errors.email &&
              <Text style={styles.errorsText}>{errors.email}</Text>
            }
            <TextInput
              value={values.Phone}
              style={styles.textInput}
              placeholder="Số điện thoại"
              onBlur={() => setFieldTouched('Phone')}
              onChangeText={handleChange('Phone')}
            />
            {touched.Phone && errors.Phone &&
              <Text style={styles.errorsText}>{errors.Phone}</Text>
            }
            <TextInput
              value={values.password}
              style={styles.textInput}
              placeholder="Mật khẩu"
              onBlur={() => setFieldTouched('password')}
              onChangeText={handleChange('password')}
              secureTextEntry={true}
            />
            {touched.password && errors.password &&
              <Text style={styles.errorsText}>{errors.password}</Text>
            }
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: "column",margin:10,alignItems:'center' }}>
                <Text>Nam</Text>
                <RadioButton
                  value="nam"
                  status={checkSex === 'nam' ? 'checked' : 'unchecked'}
                  onPress={() => setCheckSex('nam')}
                />
              </View>
              <View style={{ flexDirection: "column",margin:10,alignItems:'center'}}>
                <Text>Nữ</Text>
                <RadioButton
                  value="nu"
                  status={checkSex === 'nu' ? 'checked' : 'unchecked'}
                  onPress={() => setCheckSex('nu')}
                />
              </View>
            </View>
            <Button
              color="blue"
              style={styles.btnButton}
              title='Tiếp tục'
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </View>

  );
}

export default Information;

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
  errorsText: {
    fontSize: 15,
    color: 'red'
  },

});
