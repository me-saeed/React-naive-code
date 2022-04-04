// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
import {Text, Button, HelpBlock} from '@components';
import {HelpBlockData} from '@data';
import styles from './styles';

export default function Contactus(props) {
  const {colors} = useTheme();
  const [helpBlock] = useState(HelpBlockData);
  return (
    <View>
      {/* <View style={[styles.blockView, {borderBottomColor: colors.border}]}>
        <HelpBlock
          title={helpBlock.title}
          description={helpBlock.description}
          phone={helpBlock.phone}
          email={helpBlock.email}
          style={{margin: 20}}
          //   onPress={() => {
          //     navigation.navigate('ContactUs');
          //   }}
        />
      </View> */}
      {/* Other Information */}
      <TouchableOpacity onPress={()=>{
        props.navigation.navigate('ContactNew');
        
      }} style={{paddingVertical: 10}}>
        <Text  headline semibold>
          Contact US
        </Text>
      </TouchableOpacity>
    </View>
  );
}
