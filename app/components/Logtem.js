import React, {memo} from 'react';
import {View, Text, Pressable, Platform, StyleSheet} from 'react-native';

import colors from '../styles/colors';

function LogItem({cardNumber, date, allowed, onDelete}) {
  return (
    <View
      style={{
        ...styles.task,
      }}>
      <View
        style={{
          ...styles.cardNumberContainer,
          backgroundColor: allowed === true ? 'limegreen' : 'red',
        }}>
        <Text numberOfLines={1} style={styles.cardNumber}>
          {cardNumber}
        </Text>
      </View>
      <View
        style={{
          ...styles.dateContainer,
          backgroundColor: allowed === true ? 'limegreen' : 'red',
        }}>
        <Text style={styles.cardNumber}>
          {new Date(date).toLocaleDateString('tr-TR') +
            ' ' +
            new Date(date).toLocaleTimeString()}
        </Text>
      </View>
      <Pressable onPress={onDelete} style={styles.status}>
        <Text style={styles.icon}>Sil</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: 'transparent',
    borderRadius: 5,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: colors.black,
    //     shadowOffset: {
    //       width: 0,
    //       height: 4,
    //     },
    //     shadowOpacity: 0.7,
    //     shadowRadius: 3,
    //   },
    //   android: {
    //     elevation: 3,
    //   },
    // }),
  },
  cardNumberContainer: {
    flex: 1,
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  dateContainer: {
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  cardNumber: {
    paddingHorizontal: 10,
    fontSize: 17,
    fontWeight: '500',
    color: '#ffff',
  },
  status: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'red',
    marginLeft: 10,
  },
  completed: {
    backgroundColor: colors.purple,
  },
  deleteText: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  icon: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

// We want to make sure only tasks that change are rerendered
const shouldNotRerender = (prevProps, nextProps) =>
  prevProps.cardNumber === nextProps.cardNumber &&
  prevProps.isComplete === nextProps.isComplete;

export default memo(LogItem, shouldNotRerender);
