import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

export default function Adv() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Tìm Thợ </Text>
        <Text style={styles.textTitle}>CÓ NGAY</Text>
        <Text style={styles.textTitle}>Phục Vụ Liền Tay</Text>
      </View>
      <View>
        <Image
          source={require('../../../assets/animation/adv.gif')}
        />
      </View>
      <TouchableOpacity
      style={styles.button}
      >
        <Text style={{color:'white',fontSize:20}}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%'
  },
  header: {
    paddingTop: 30,
    paddingBottom: 30,
    justifyContent: 'center',
    backgroundColor: '#ff6600',
    width: '100%',
    borderTopEndRadius: 500,
    borderBottomStartRadius: 500,
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    marginLeft:-200
  },

  textTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6600",
    shadowColor: "rgba(0,0,0,0.4)",
    shadowOffset: {
        width: 1,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderRadius: 20
},
});