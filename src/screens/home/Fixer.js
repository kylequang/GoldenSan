import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Fixer() {
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Image
            style={styles.img}
            source={require('../../../assets/image/category/thodien.png')}
          />
        </View>
        <View style={styles.column}>
          <Image
            style={styles.img}
            source={require('../../../assets/image/category/thonuoc.png')}
          />
        </View>
      </View>
      <View style={styles.row}>
        <Image
          style={styles.img}
          source={require('../../../assets/image/category/thomaylanh.png')}
        />
        <Image
          style={styles.img}
          source={require('../../../assets/image/category/thosuakhoa.png')}
        />
      </View>
      <View style={styles.row}>
        <Image
          style={styles.img}
          source={require('../../../assets/image/category/thotaxxi.png')}
        />
        <Image
          style={styles.img}
          source={require('../../../assets/image/category/thoxaydung.png')}
        />
      </View>
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignContent:'center',
    height: 120,
    width:'100%',
    marginTop:20
  },
  column: {
    width: '50%',
    alignItems:'center',
  },
  img: {
    height: '100%',
    width: '55%',
  
  },

});