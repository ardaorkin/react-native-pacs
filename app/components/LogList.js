import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Logtem from './Logtem';
function LogList({logs, onDeleteLog}) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={logs}
        keyExtractor={log => log?.datetime}
        renderItem={({item}) => (
          <Logtem
            cardNumber={item?.card_number}
            date={item?.datetime}
            allowed={item?.allowed}
            onDelete={() => onDeleteLog(item)}
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

export default LogList;
