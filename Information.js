// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {View, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import {BaseColor, Images, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';

export default function Information(props) {
  const {colors} = useTheme();

  const services = [
    {icon: 'wifi', name: 'Free Wifi'},
    {icon: 'shower', name: 'Shower'},
    {icon: 'users', name: 'Max 3 aduts'},
    {icon: 'subway', name: 'Nearby Subway'},
    {icon: 'wifi', name: 'Free Wifi'},
    {icon: 'shower', name: 'Shower'},
    {icon: 'users', name: 'Max 3 aduts'},
    {icon: 'subway', name: 'Nearby Subway'},
  ];

  return (
    <ScrollView>
      <View style={[styles.blockView]}>
        <Text headline semibold>
          Description
        </Text>
        <Text body2 style={{marginTop: 5}}>
          218 Austen Mountain, consectetur adipiscing, sed eiusmod tempor
          incididunt ut labore et dolore
        </Text>
      </View>

      <View style={styles.contentService}>
        <FlatList
          data={props.amenities}
          numColumns={3}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            <View style={styles.serviceItemBlock} key={'block' + index}>
              <Text
                overline
                style={{marginTop: 4, color: 'white'}}
                numberOfLines={1}>
                {item || item.name}
              </Text>
            </View>
          )}
        />
        {/* <TouchableOpacity
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingHorizontal: 12,
          }}>
          <Icon name="angle-right" size={16} color={BaseColor.dividerColor} />
        </TouchableOpacity> */}
      </View>

      {/* <View style={[styles.contentService, {borderBottomColor: colors.border}]}>
        {[
          {key: '1', name: 'wifi'},
          {key: '2', name: 'coffee'},
          {key: '3', name: 'bath'},
          {key: '4', name: 'car'},
          {key: '5', name: 'paw'},
        ].map((item, index) => (
          <View style={{alignItems: 'center'}} key={'service' + index}>
            <Icon name={item.name} size={24} color={colors.accent} />
            <Text overline grayColor style={{marginTop: 4}}>
              {item.name}
            </Text>
          </View>
        ))}
      </View> */}
    </ScrollView>
  );
}
