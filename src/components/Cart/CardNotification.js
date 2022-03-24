import { View, Text, StyleSheet,Image } from 'react-native'
import React from 'react'

export default function CardNotification(props) {
  return (
    <View style={styles.notification} key={props.time}>
      <View style={{ flexDirection: 'row' }}>
        <Image style={{ height: 25, width: 25 }} source={require('../../../assets/logo/logoapp.png')} />
        <Text style={{ fontSize: 16, marginLeft: 5 }}>HelpHouse</Text>
      </View>
      <Text style={{ fontWeight: 'bold' }}>{props.item.title}</Text>
      <Text style={{ fontSize: 16 }}>{props.item.body}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  notification: {
    marginVertical: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10
  }
})