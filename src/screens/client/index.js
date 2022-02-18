import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Index() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <View style={styles.viewIMG}>
          <Image
            style={{ height: 70, width: 70 }}
            source={require('../../../assets/image/avatarDefault.png')}
          />
        </View>
        <View style={styles.viewText}>
          <View>
            <Text style={{ fontSize: 20 }}>Xin chào Lê Quang Kỳ !</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.category}>
          <View style={styles.row}>
            <View style={styles.column}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('detailCategory')}
              >
              <Image
                style={styles.img}
                source={require('../../../assets/image/category/thodien.png')}
              />
              <Text style={styles.textCategory}>Thợ Sửa Điện</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.column}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('detailCategory')}
              >
              <Image
                style={styles.img}
                source={require('../../../assets/image/category/thonuoc.png')}
              />
              <Text style={styles.textCategory}>Thợ Sửa Nước</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('detailCategory')}
              >
              <Image
                style={styles.img}
                source={require('../../../assets/image/category/thomaylanh.png')}
              />
              <Text style={styles.textCategory}>Thợ Máy Lạnh</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.column}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('detailCategory')}
              >
              <Image
                style={styles.img}
                source={require('../../../assets/image/category/thomaytinh.png')}
              />
              <Text style={styles.textCategory}>Thợ Máy Tính</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('detailCategory')}
              >
                <Image
                  style={styles.img}
                  source={require('../../../assets/image/category/thosuakhoa.png')}
                />
                <Text style={styles.textCategory}>Thợ Sửa Khóa</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.column}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('detailCategory')}
              >
                <Image
                  style={styles.img}
                  source={require('../../../assets/image/category/thoxaydung.png')}
                />
                <Text style={styles.textCategory}>Thợ Xây Dựng</Text>
              </TouchableOpacity>
            </View>

          </View>
          <View style={styles.row}>
            <View style={styles.column}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('detailCategory')}
              >
              <Image
                style={styles.img}
                source={require('../../../assets/image/category/thotaxxi.png')}
              />
              <Text style={styles.textCategory}>Thợ Sửa Xe</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.column}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('detailCategory')}
              >
                <Image
                  style={styles.img}
                  source={require('../../../assets/image/category/thowc.png')}
                />
                <Text style={styles.textCategory}>Thợ Sửa WC</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

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
  column: {
    width: '50%',
    marginBottom: 5,
    padding: 5
  },
  viewIMG: {
    width: '30%',
    alignItems: 'center'
  },
  viewText: {
    width: '70%',
    alignItems: 'center'
  },
  img: {
    height: 150,
    width: 130,
  },
  category: {
    flex: 1,
    marginTop: 20,
  },
  button: {
    alignItems: 'center'
  },
  textCategory: {
    fontSize: 15,
    fontWeight: 'bold'
  }
})