<View style={styles.row}>
<View style={styles.column}>
<TouchableOpacity
    style={styles.button}
    onPress={() => navigation.navigate('detailCategory', { name: 'Custom profile header' })}
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