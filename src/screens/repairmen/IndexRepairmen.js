import { View, Text, StyleSheet, ScrollView, Image, LogBox } from 'react-native';
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DataTable } from 'react-native-paper';
import Loading from '../../components/animation/Loading';
import { formatDateTime, formatPrice } from '../../service/formatCode';
import { countDocument, getCurrentUser, getUidUser, getAnDocument } from '../../service/getData';
export default function IndexRepairmen({ navigation }) {

  const [loading, setLoading] = useState(true);
  const [listWork, setListWork] = useState({});
  const [dataUser, setDataUser] = useState({});
  const [countOrder, setCountOrder] = useState(0);
  const [countCancelOrder, setCountCancelOrder] = useState(0);
  const [countSuccessOrder, setCountSuccessOrder] = useState(0);



  useEffect(async () => {
    LogBox.ignoreLogs(['Setting a timer']);
    const data = await getCurrentUser('repairmen');
    const uid = await getUidUser();
    const getListWork = await getAnDocument('listWork', uid)
    setDataUser(data);
    setListWork(getListWork);
    setCountOrder(await countDocument('order', 'uid_repairmen'));
    setCountSuccessOrder(await countDocument('orderSuccess', 'uid_repairmen'));
    setCountCancelOrder(await countDocument('orderCancel', 'uid_repairmen'));
    
      if (dataUser != null) {
        setLoading(false)
      }
  }, [])


  useEffect(async () => {

    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await getCurrentUser('repairmen');
      const uid = await getUidUser();
      const getListWork = await getAnDocument('listWork', uid)
      setDataUser(data);
      setListWork(getListWork);
      console.log("Render again by focus home page");
      setCountOrder(await countDocument('order', 'uid_repairmen'));
      setCountSuccessOrder(await countDocument('orderSuccess', 'uid_repairmen'));
      setCountCancelOrder(await countDocument('orderCancel', 'uid_repairmen'));
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) return <Loading />
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar}
              source={{ uri: dataUser.photoURL }} />
            <View style={styles.info}>
              <Text style={styles.textInfo}>Xin chào ! {dataUser.name}</Text>
              <Text style={styles.textInfo}>Thợ {dataUser.job}</Text>
              <Text style={styles.textInfo}>{dataUser.phoneNumber}</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center',marginBottom:10 }}>
            <Text style={[styles.textInfo, { color: 'black' }]}>Hôm Nay                {formatDateTime(new Date(), new Date())}</Text>
          </View>
        </View>
        <View style={styles.listWork}>
          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Dịch Vụ Công Việc Sửa Chữa Của Bạn</Text>
          </View>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>Dịch Vụ</DataTable.Cell>
              <DataTable.Cell numeric>Chi Phí</DataTable.Cell>
              <DataTable.Cell numeric>Bảo Hành</DataTable.Cell>
            </DataTable.Row>
            {
              listWork.listWork && listWork.listWork.map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>{item.nameService}</DataTable.Cell>
                  <DataTable.Cell numeric>{formatPrice(item.price)}đ</DataTable.Cell>
                  <DataTable.Cell numeric>{item.insurance} tuần</DataTable.Cell>
                </DataTable.Row>
              ))
            }
          </DataTable>
        </View>
        <View style={styles.orderInfo}>
          <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 5, justifyContent: 'space-between' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="md-list-circle-outline" size={35} color="#ff9933" />
              <Text>{countOrder}</Text>
              <Text>Đơn hàng</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="checkmark-circle-sharp" size={35} color="#33cc33" />
              <Text>{countSuccessOrder}</Text>
              <Text>Hoàn thành</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="cancel" size={35} color={'red'} />
              <Text>{countCancelOrder}</Text>
              <Text>Từ chối</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name='star' size={35} color={'#ffcc00'} />
              <Text>{dataUser.totalAVG}</Text>
              <Text>Đánh giá</Text>
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
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: "#ff6600",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10
  },
  headerContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  info: {
    marginLeft: 15,
  },
  textInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textShadowRadius: 10
  },
  orderInfo: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 10
  },
  listWork: {
    backgroundColor: '#f2f2f2',
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10
  },

})
