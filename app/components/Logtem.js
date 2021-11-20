import React, {memo} from 'react';
import {View, Text, Pressable, Platform, StyleSheet} from 'react-native';

import colors from '../styles/colors';

function LogItem({cardNumber, date, onDelete}) {
  return (
    <View style={styles.task}>
      <View style={styles.cardNumberContainer}>
        <Text numberOfLines={1} style={styles.cardNumber}>
          {cardNumber}
        </Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.deleteText}>
          {new Date(date).toLocaleDateString('tr-TR') +
            ' ' +
            new Date(date).toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardNumberContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dateContainer: {
    justifyContent: 'center',
  },
  cardNumber: {
    paddingHorizontal: 10,
    color: colors.black,
    fontSize: 17,
  },
  status: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: colors.gray,
  },
  completed: {
    backgroundColor: colors.purple,
  },
  deleteText: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    fontSize: 17,
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
