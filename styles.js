// @ts-nocheck
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';
import * as Utils from '@utils';
import {Colors} from '../../common/Colors';

export default StyleSheet.create({
  imgBanner: {
    width: '100%',
    height: 250,
    position: 'absolute',
  },
  blockView: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
  contentService: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contentBoxTop: {
    padding: 10,
    height: 180,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 0.5,
    shadowOffset: {width: 1.5, height: 1.5},
    shadowOpacity: 1.0,
    elevation: 5,
  },
  circlePoint: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRateDetail: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  lineBaseRate: {
    width: '100%',
    height: 12,
    borderRadius: 8,
    backgroundColor: BaseColor.dividerColor,
  },
  linePercent: {
    width: '80%',
    height: 12,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    position: 'absolute',
    bottom: 0,
  },
  contentLineRate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  listContentIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  itemReason: {
    paddingLeft: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
  contentButtonBottom: {
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicator: {
    height: 1,
  },
  tabbar: {
    height: 40,
  },
  tab: {
    width: 100,
  },
  viewTab: {
    marginVertical: 15,
  },
  contentService: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  serviceItemBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    margin: 5,
    padding: 5,
    borderRadius: 5,

    // width: '100%',
  },
  icon: {
    color: Colors.white,
  },
  viewFlatgrid: {
    marginLeft: 10,
  },
  gridView: {
    marginTop: 10,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flex: 1,
  },
  textCategory: {
    marginTop: 5,
    fontSize: 10,
    marginRight: 5,
    textAlign: 'center',
  },
  imgLogo: {
    // width: 10,
    marginVertical: 10,
  },
  imgCategory: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
});
