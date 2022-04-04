import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  useWindowDimensions,
  Dimensions,
  Animated,
  TouchableOpacity,
  Linking,
  Modal,
} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  StarRating,
  PostListItem,
  HelpBlock,
  Button,
  RoomType,
} from '@components';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import * as Utils from '@utils';
import {InteractionManager} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import styles from './styles';
import {HelpBlockData} from '@data';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../common/Colors';
import Test from '../Test';
import Information from './Information';
import FuelLocation from './FuelLocation';
import Contactus from './Contactus';
import Weather from './Weather';
import Parking from './Parking';
import Api from '../../network/Api';
import {useSelector} from 'react-redux';
import Popupmenu from '../pricepopup';
import Review from './Review';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
export default function FuelFinderDetail({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  console.log(route.params.comdetails);
  const comdetails = route.params.comdetails;
  // alert(comdetails.StoreNum);

  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [modalVisible, setModalVisible] = useState(false);

  const [renderMapView, setRenderMapView] = useState(false);
  const [region] = useState({
    latitude: 1.9344,
    longitude: 103.358727,
    latitudeDelta: 0.05,
    longitudeDelta: 0.004,
  });
  const [roomType] = useState([
    {
      id: '1',
      image: Images.room8,
      name: 'Standard Twin Room',
      price: '$399,99',
      available: 'Hurry Up! This is your last room!',
      services: [
        {icon: 'wifi', name: 'Free Wifi'},
        {icon: 'shower', name: 'Shower'},
        {icon: 'users', name: 'Max 3 aduts'},
        {icon: 'subway', name: 'Nearby Subway'},
      ],
    },
    {
      id: '2',
      image: Images.room5,
      name: 'Delux Room',
      price: '$399,99',
      available: 'Hurry Up! This is your last room!',
      services: [
        {icon: 'wifi', name: 'Free Wifi'},
        {icon: 'shower', name: 'Shower'},
        {icon: 'users', name: 'Max 3 aduts'},
        {icon: 'subway', name: 'Nearby Subway'},
      ],
    },
  ]);

  const [helpBlock] = useState(HelpBlockData);
  const deltaY = new Animated.Value(0);

  useEffect(() => {
    fetchData(route.params);
    InteractionManager.runAfterInteractions(() => {
      setRenderMapView(true);
    });
  }, []);

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 40;
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'information', title: 'Information'},
    {key: 'location', title: 'Location'},
    // {key: 'contact', title: 'Contact Us'},
    {key: 'weather', title: 'Weather'},
    {key: 'parking', title: 'Parking'},
    {key: 'review', title: 'Review'},
  ]);
  const [currentDetail, setCurrentDetail] = React.useState(null);
  const userData = useSelector(state => state.login.userData);
  const [loading, setLoading] = useState(false);

  // const renderScene = SceneMap({
  //   information: Description,
  //   location: Location,
  //   third: ChooseUs,
  // });
  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={[styles.indicator, {backgroundColor: colors.primary}]}
      style={[styles.tabbar, {backgroundColor: colors.background}]}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={colors.text}
      renderLabel={({route, focused, color}) => (
        <View style={{flex: 1, width: 100, alignItems: 'center'}}>
          <Text headline semibold={focused} style={{color}}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'information':
        return <Information amenities={comdetails.amenities} />;
      case 'location':
        return (
          <FuelLocation
            location={{
              address: `${comdetails.ADDRESS}, ${comdetails.CITY} ${comdetails.STATE}`,
              coordinate: {
                latitude: parseFloat(comdetails.LAT || 0),
                longitude: parseFloat(comdetails.LNG || 0),
              },
            }}
          />
        );
      // case 'contact':
      //   return <Contactus navigation={navigation} />;
      case 'weather':
        return <Weather />;
      case 'parking':
        return <Parking details={comdetails} />;
      case 'review':
        return <Review details={comdetails} />;
    }
  };

  const fetchData = async navigationParams => {
    setLoading(true);
    const params = `&DAY=${navigationParams.searchDate}&store_num=${navigationParams.storeNum}&type=${navigationParams.type}&l=${navigationParams.lType}`;
    const response = await Api.get(`fuel-detail.php?store_num${params}`);

    console.log('-------------------------------');

    console.log('azhar response Details', response);
    setCurrentDetail(response);
    setLoading(false);
  };

  const openExternalApp = (which, val) => {
    switch (which) {
      case 'phone':
        Linking.openURL(`tel:${val}`);
        return;
      default:
        return;
    }
  };

  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={{
          uri: route.params.img,
        }}
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(200),
                Utils.scaleWithPixel(200),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}
      />
      {/* Header */}
      <Header
        title=""
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={Colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('PreviewImage');
        }}
        renderRightSecond={() => {
          return <Icon name="bars" size={30} color={Colors.primary} />;
        }}
        onPressRightSecond={() => {
          navigation.openDrawer();
        }}
      />
      <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: deltaY},
              },
            },
          ])}
          onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}>
          {/* Main Container */}
          <View style={{paddingHorizontal: 10}}>
            {/* Information */}
            <View
              style={[
                styles.contentBoxTop,
                {
                  marginTop: marginTopBanner,
                  backgroundColor: colors.card,
                  shadowColor: colors.border,
                  borderColor: colors.border,
                },
              ]}>
              <Text title2 semibold style={{marginBottom: 5}}>
                {`${comdetails.TYPE} - ${comdetails.StoreNum} - ${comdetails.Rack}`}
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 10,
                  marginBottom: 5,
                  textAlign: 'center',
                }}>
                {`${parseFloat(currentDetail?.miles).toFixed(2)} miles away`}
              </Text>
              <Button
                onPress={() => {
                  openExternalApp('phone', comdetails.PHONE);
                }}>
                {`${comdetails.PHONE}`}
              </Button>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ContactNew');
                }}
                style={{paddingVertical: 10}}>
                {/* <Text headline semibold>
                  Contact US
                </Text> */}
              </TouchableOpacity>
            </View>
            {/* Rating Review */}

            <View style={styles.viewTab}>
              <TabView
                style={{
                  borderRadius: 10,
                  // backgroundColor: Colors.white,
                  height: h / 2,
                }}
                // navi
                lazy
                renderTabBar={renderTabBar}
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: Dimensions.get('window').width}}
              />
            </View>
          </View>
        </ScrollView>
        {/* Pricing & Booking Process */}
        <View
          style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
          <View>
            <Text caption1 semibold>
              Your Price
            </Text>
            <Text title3 style={{color: 'green'}} semibold>
              ${parseFloat(comdetails.YourPrice).toFixed(3)}
            </Text>
            {/* <Text caption1 semibold style={{marginTop: 5}}>
              Discounted Price
            </Text> */}
          </View>
          <Button onPress={() => setModalVisible(true)}>Get Gallons</Button>
        </View>
      </SafeAreaView>

      <Modal
        animationType="fade"
        transparent={true}
        collapsable={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000090',
          }}>
          <Popupmenu
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('GallsCalculate', {
                yourPrice: currentDetail?.YourPrice,
                pumpPrice: currentDetail?.Retail,
              });
            }}
            yourPrice={currentDetail?.YourPrice}
            retailPrice={currentDetail?.Retail}
          />
          <Icon
            onPress={() => setModalVisible(false)}
            color={'#000'}
            style={styles.icon}>
            Close
          </Icon>
        </View>
      </Modal>
    </View>
  );
}
