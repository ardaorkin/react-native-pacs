import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import UserItem from './UserItem';

function UserList({users, onDeleteUser}) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={users}
        keyExtractor={user => user._id.toString()}
        renderItem={({item}) => (
          <UserItem
            fullName={item?.first_name + ' ' + item?.last_name}
            onDelete={() => onDeleteUser(item)}
            // Don't spread the Realm item as such: {...item}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default UserList;
