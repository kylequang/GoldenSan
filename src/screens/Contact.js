import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Contact() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center', margin: 10 }}>
        <Text style={{ fontSize: 20 }}>Liên Hệ Với Chúng Tôi</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.row}>
          <MaterialCommunityIcons name='city' size={30} color='#ff6600' />
          <Text style={styles.text}>Công Ty Kỳ Bằng Hậu Quỳnh</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name='earth' size={30} color='#ff6600' />
          <Text style={styles.text}>www.helphouse.com.vn</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name='email' size={30} color='#ff6600' />
          <Text style={styles.text}>helphouse@gmail.com</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name='phone' size={30} color='#ff6600' />
          <Text style={styles.text}>+84 0123 456 789</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name='compass' size={30} color='#ff6600' />
          <Text style={styles.text}>101B Lê Hữu Trác, Phước Mỹ, DN</Text>
        </View>
      </View>
      <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
        <View style={{ height: 2, backgroundColor: '#ff6600', width: '40%' }}></View>
        <Text style={{ marginHorizontal: 15 }}>OR</Text>
        <View style={{ height: 2, backgroundColor: '#ff6600', width: '40%' }}></View>
      </View>
      <View style={[styles.row,{justifyContent:'center'}]}>
          <MaterialCommunityIcons name='facebook' size={30} color='#ff6600' style={{marginHorizontal:15}}/>
          <MaterialCommunityIcons name='google' size={30} color='#ff6600'  style={{marginHorizontal:15}}/>
          <MaterialCommunityIcons name='youtube' size={35} color='#ff6600'  style={{marginHorizontal:15}}/>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  info: {
    marginVertical:15
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 15
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    paddingLeft: 5
  }
})