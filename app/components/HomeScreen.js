import React from 'react';
import {Pressable, Text, View, StyleSheet, Image} from 'react-native';
import logo from '../../assets/logo.png';
import colors from '../styles/colors';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image source={logo} />
      <Text
        style={{
          fontSize: 17,
          fontWeight: '700',
          color: '#ffff',
          marginBottom: 10,
        }}>
        Sistemik PDKS
      </Text>
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
      <Pressable onPress={() => navigation.push('Logs')} style={styles.submit}>
        <Text style={styles.pressableText}>HAREKETLER</Text>
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
    borderRadius: 5,
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
