import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-root-toast';
import moment from 'moment';
import {DATE_FORMAT_YYYY_MM_DD} from '../../common/Utils';
import Api from '../../network/Api';
import {useSelector} from 'react-redux';
import {Colors} from '../../common/Colors';
import {Rating, AirbnbRating} from 'react-native-ratings';

export default function Review(props) {
  const [star, setStar] = useState('');
  const [note, setNote] = useState('');

  const [reviewFilter, setReviewFilter] = useState([]);

  const {userData} = useSelector(state => state.login);

  useEffect(() => {
    // Update the document title using the browser API
    console.log(props.details);
    showReviews();
  }, []);

  const showReviews = async () => {
    const response = await Api.get(`location_noteslist.php`);
    console.log('response=>', response);
    console.log('store=>', props.details.StoreNum);

    const filter = response.filter(
      item => item.LOCATION_ID == props.details.StoreNum,
    );
    console.log('------------------=>', filter);

    setReviewFilter(filter);
  };

  function ratingCompleted(rating) {
    // console.log('Rating is: ' + rating);
    setStar(rating);
  }

  const submitReview = async () => {
    const d = new Date();
    // d.getFullYear();
    const userid = userData;
    moment(d).format(DATE_FORMAT_YYYY_MM_DD);

    if (userData == null) {
      alert('not login');
    } else {
      let data = {
        user: userid.body.userId,
        location_id: props.details.StoreNum,
        note: note,
        rating: star,
        date: moment(d).format(DATE_FORMAT_YYYY_MM_DD),
      };
      console.log('mydata=>', data);
      await Api.postImagesWithData('location_notes.php', data)
        .then(res => {
          console.log(res.data);
          Toast.show(res.data.message);
          //   alert('Add Dvir Submited');
          showReviews();
        })
        .catch(err => {
          console.warn(err);
        });
    }
  };

  return (
    <View style={styles.reviewContainer}>
      {reviewFilter.map(item => (
        <View style={styles.reviewShow}>
          <View style={styles.datestar}>
            <AirbnbRating
              count={5}
              showRating={false}
              defaultRating={item.RATING}
              size={15}
              isDisabled={true}
              // onFinishRating={ratingCompleted}
            />

            <Text>{item.DATE}</Text>
          </View>
          <View style={styles.viewNote}>
            <Text>{item.NOTE}</Text>
          </View>
          <View style={styles.divider} />
        </View>
      ))}

      <View style={styles.viewRating}>
        <AirbnbRating
          count={5}
          showRating={false}
          defaultRating={0}
          size={30}
          onFinishRating={ratingCompleted}
        />
      </View>
      <TextInput
        style={styles.inputstyl}
        placeholder="Enter Review"
        multiline
        onChangeText={setNote}
        value={note}
        numberOfLines={4}
        editable
        maxLength={40}
      />
      <TouchableOpacity
        style={styles.buttonSave}
        onPress={() => submitReview()}>
        <Text style={styles.textSave}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    marginVertical: 10,
  },
  viewRating: {
    marginVertical: 10,
  },
  inputstyl: {
    backgroundColor: Colors.white,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  buttonSave: {
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    marginTop: 10,
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: '#2196F3',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textSave: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
  reviewShow: {
    marginVertical: 10,
  },
  datestar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  viewNote: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  divider: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
  },
});
