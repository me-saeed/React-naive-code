import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  View,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {fontWeight} from 'styled-system';
import {Colors} from '../../common/Colors';
import Toast from 'react-native-root-toast';
import Api from '../../network/Api';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {DATETIME_FORMAT_YYYY_MM_DD} from '../../common/Utils';

const screenWidth = Dimensions.get('window').width;
export default function Parking(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const initialData = [12, 19, 15, 25, 22, 20];

  const initialLabels = ['6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

  const [datas, setDatas] = useState(initialData);

  const [labels, setLabels] = useState(initialLabels);

  const {userData} = useSelector(state => state.login);

  const dataset = {
    labels: labels,
    datasets: [
      {
        data: datas,
        colors: [
          (opacity = 1) => `red`,
          (opacity = 1) => `blue`,
          (opacity = 1) => `yellow`,
          (opacity = 1) => `green`,
          (opacity = 1) => `purple`,
          (opacity = 1) => `orange`,
        ],
      },
    ],
  };

  const addParking = async values => {
    const d = new Date();
    // d.getFullYear();
    const userid = userData;
    moment(d).format(DATETIME_FORMAT_YYYY_MM_DD);
    if (userData == null) {
      alert('not login');
    } else {
      let data = {
        mem_id: userid.body.userId,
        location_id: props.details.StoreNum,
        driver_id: userid.body.userId,
        parking_option: values,
        dayofweek: moment(d).format('dd'),
        datetime: moment(d).format(DATETIME_FORMAT_YYYY_MM_DD),
      };
      console.log('mydata=>', data);
      await Api.postImagesWithData('locations_parking_add.php', data)
        .then(res => {
          console.log(res.data);
          Toast.show(res.data.message);
          //   alert('Add Dvir Submited');
        })
        .catch(err => {
          console.warn(err);
        });
    }
  };

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'gray',
    backgroundGradientTo: 'gray',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

    fillShadowGradient: 'blue',
    fillShadowGradientOpacity: 1,

    barPercentage: 0.5,

    // useShadowColorFromDataset: true,
    style: {
      borderRadius: 10,
      marginTop: 10,
    },

    propsForLabels: {
      fill: 'none',
      strokeWidth: '1',
      stroke: 'black',
      // textAnchor: 'middle',
    },

    // propsForDots: {
    //   r: '6',
    //   y: '20',
    //   fill: 'none',
    //   strokeWidth: '10',
    //   stroke: 'purple',
    //   textAnchor: 'middle',
    // },
  };
  return (
    <View>
      {/* <BarChart
        data={dataset}
        width={300}
        height={220}
        withCustomBarColorFromData={true}
        flatColor={true}
        yAxisInterval={0}
        yAxisLabel=""
        withInnerLines={false}
        fromZero={true}
        showBarTops={true}
        withHorizontalLabels={false}
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          data: dataset.datasets,
          color: (opacity = 1) => '#fff',
          labelColor: () => '#6a6a6a',
          barPercentage: 0.5,
          barRadius: 5,
        }}
      /> */}

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>open</Text>
      </Pressable>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>What's the Parking like</Text>

              <Pressable
                style={[styles.buttonprk, styles.btnlos]}
                onPress={() => addParking('LOTS OF SPOTS')}>
                <Text style={styles.textlos}>LOTS OF SPOTS</Text>
              </Pressable>

              <Pressable
                style={[styles.buttonprk, styles.btnss]}
                onPress={() => addParking('SOME SPOTS')}>
                <Text style={styles.textss}>SOME SPOTS</Text>
              </Pressable>

              <Pressable
                style={[styles.buttonprk, styles.btnlis]}
                onPress={() => addParking('LOT IS FULL')}>
                <Text style={styles.textlis}>LOT IS FULL</Text>
              </Pressable>

              <Pressable
                style={[styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    // justifyContent: 'center',
    borderRadius: 20,
    width: '80%',
    height: '45%',
    paddingTop: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    marginVertical: 20,
  },
  buttonClose: {
    marginTop: 20,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonprk: {
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    height: '15%',
    padding: 12,
    // elevation: 1,
  },
  btnlos: {
    backgroundColor: '#e4f5eb',
    borderColor: 'green',
    borderWidth: 1,
  },
  textlos: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  btnss: {
    backgroundColor: '#fbf5e8',
    borderColor: '#ebba2a',
    borderWidth: 1,
  },
  textss: {
    color: '#ebba2a',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  btnlis: {
    backgroundColor: '#faebeb',
    borderColor: Colors.red,
    borderWidth: 1,
  },
  textlis: {
    color: Colors.red,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
