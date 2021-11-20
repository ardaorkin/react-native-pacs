import React from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import colors from '../styles/colors';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Pressable
        onPress={() => navigation.push('AddUser')}
        style={styles.submit}>
        <Text style={styles.pressableText}>KULLANICI EKLEME</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.push('UserList')}
        style={styles.submit}>
        <Text style={styles.pressableText}>KULLANICI LİSTESİ</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  submit: {
    height: 50,
    width: '70%',
    fontWeight: '900',
    color: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 55,
    backgroundColor: '#40a9ff',
  },
  pressableText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '400',
  },
});

export default HomeScreen;
