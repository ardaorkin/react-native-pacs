import React, {memo} from 'react';
import {View, Text, Pressable, Platform, StyleSheet} from 'react-native';

import colors from '../styles/colors';

function UserItem({fullName, onDelete}) {
  return (
    <View style={styles.task}>
      <View style={styles.fullNameContainer}>
        <Text numberOfLines={1} style={styles.fullName}>
          {fullName}
        </Text>
      </View>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
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
  fullNameContainer: {
    flex: 1,
    justifyContent: 'center',
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
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: colors.gray,
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
