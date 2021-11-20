import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  StyleSheet,
} from 'react-native';

import colors from '../styles/colors';

function AddUserForm({navigation, onSubmit}) {
  const [user, setUser] = useState({});

  const handleSubmit = () => {
    onSubmit(user);
    setUser({});
  };

  return (
    <View style={styles.form}>
      <View style={styles.identification}>
        <TextInput
          value={user?.first_name}
          placeholder="Ad"
          onChangeText={value => setUser({...user, first_name: value})}
          autoCorrect={false}
          autoCapitalize="sentences"
          style={{...styles.textInput, width: '47%'}}
        />
        <TextInput
          value={user?.last_name}
          placeholder="Soyad"
          onChangeText={value => setUser({...user, last_name: value})}
          autoCorrect={false}
          autoCapitalize="sentences"
          style={{...styles.textInput, width: '47%'}}
        />
      </View>
      <TextInput
        value={user?.card_number}
        placeholder="Kart numarası"
        onChangeText={value => setUser({...user, card_number: value})}
        autoCorrect={false}
        autoCapitalize="sentences"
        style={styles.textInput}
      />
      <TextInput
        value={user?.employee_id}
        placeholder="Sicil numarası"
        onChangeText={value => setUser({...user, employee_id: value})}
        autoCorrect={false}
        autoCapitalize="sentences"
        style={styles.textInput}
      />
      <Pressable onPress={handleSubmit} style={styles.submit}>
        <Text style={styles.icon}>KULLANICI EKLE</Text>
      </Pressable>
      <Pressable onPress={() => navigation.push('Home')} style={styles.submit}>
        <Text style={styles.icon}>ANASAYFAYA DÖN</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    // height: 250,
    marginBottom: 20,
    flexDirection: 'column',
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
  identification: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: colors.white,
    marginTop: 10,
    fontSize: 17,
  },
  submit: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: 'limegreen',
  },
  icon: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default AddUserForm;
