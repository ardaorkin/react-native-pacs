import React, {memo} from 'react';
import {View, Text, Pressable, Platform, StyleSheet} from 'react-native';

import colors from '../styles/colors';

function UserItem({fullName, onDelete, card_number}) {
  return (
    <View style={styles.task}>
      <View style={styles.fullNameContainer}>
        <Text numberOfLines={1} style={styles.fullName}>
          {fullName}
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <Text numberOfLines={1} style={styles.fullName}>
          {card_number}
        </Text>
      </View>
      <Pressable onPress={onDelete} style={styles.status}>
        <Text style={styles.icon}>X</Text>
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
  fullNameContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  fullName: {
    paddingHorizontal: 10,
    color: colors.black,
    fontSize: 17,
  },
  status: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: 'red',
  },
  completed: {
    backgroundColor: colors.purple,
  },
  deleteButton: {
    justifyContent: 'center',
  },
  deleteText: {
    marginHorizontal: 10,
    color: colors.gray,
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
  prevProps.fullName === nextProps.fullName &&
  prevProps.isComplete === nextProps.isComplete;

export default memo(UserItem, shouldNotRerender);
