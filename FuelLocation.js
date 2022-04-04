import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Linking} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
import {Text, Button} from '@components';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import StreetView from 'react-native-streetview';
import styles from './styles';
export default function FuelLocation(props) {
  const {colors} = useTheme();
  const [toggleMap, setToggleMap] = useState(false);
  const [region] = useState({
    latitude: 1.9344,
    longitude: 103.358727,
    latitudeDelta: 0.05,
    longitudeDelta: 0.004,
  });

  const callDirection = () => {
    const latLng = `${props.location.coordinate.latitude},${props.location.coordinate.longitude}`;
    const url = `google.navigation:q=${latLng}`;
    Linking.openURL(url);
  };

  return (
    <View>
      <View style={[styles.blockView, {borderBottomColor: colors.border}]}>
        <Text headline semibold>
          {/* {t('location')} */}
        </Text>
        <Text body2 numberOfLines={2}>
          {props.location.address}
        </Text>
        <View
          style={{
            height: 180,
            width: '100%',
            marginTop: 10,
          }}>
          {toggleMap ? (
            <StreetView
              style={styles.map}
              allGesturesEnabled={true}
              coordinate={props.location.coordinate}
              pov={{
                tilt: 0,
                bearing: 0,
                zoom: 1,
              }}
            />
          ) : (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={region}
              onRegionChange={() => {}}>
              <Marker coordinate={props.location.coordinate} />
            </MapView>
          )}
        </View>
        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Button
            style={{marginHorizontal: 10}}
            onPress={() => setToggleMap(!toggleMap)}>
            {' '}
            {toggleMap ? `NORMAL VIEW` : `STREET VIEW`}
          </Button>
          <Button onPress={() => callDirection()}>Get Direction</Button>
        </View>
      </View>
    </View>
  );
}
