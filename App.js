import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Button,
  Pressable,
} from 'react-native';
import Realm from 'realm';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from './app/styles/colors';
import User from './app/models/User';
import AddUserForm from './app/components/AddUserForm';
import UserList from './app/components/UserList';

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

const Stack = createNativeStackNavigator();

function App() {
  // The tasks will be set once the realm has opened and the collection has been queried.
  const [users, setUsers] = useState([]);
  // We store a reference to our realm using useRef that allows us to access it via
  // realmRef.current for the component's lifetime without causing rerenders if updated.
  const realmRef = useRef(null);
  // The first time we query the Realm tasks collection we add a listener to it.
  // We store the listener in "subscriptionRef" to be able to remove it when the component unmounts.

  const usersRef = useRef(null);

  const openRealm = useCallback(async () => {
    try {
      // Open a local realm file with the schema(s) that are a part of this realm.
      const config = {
        schema: [User.schema],
        // Uncomment the line below to specify that this Realm should be deleted if a migration is needed.
        // (This option is not available on synced realms and is NOT suitable for production when set to true)
        // deleteRealmIfMigrationNeeded: true   // default is false
      };

      // Since this is a non-sync realm (there is no "sync" field defined in the "config" object),
      // the realm will be opened synchronously when calling "Realm.open"
      const realm = await Realm.open(config);
      realmRef.current = realm;

      // When querying a realm to find objects (e.g. realm.objects('Tasks')) the result we get back
      // and the objects in it are "live" and will always reflect the latest state.
      const usersResults = realm.objects('User');
      if (usersResults?.length) {
        setUsers(usersResults);
      }

      // Live queries and objects emit notifications when something has changed that we can listen for.

      usersRef.current = usersResults;
      usersResults.addListener((/*collection, changes*/) => {
        // If wanting to handle deletions, insertions, and modifications differently you can access them through
        // the two arguments. (Always handle them in the following order: deletions, insertions, modifications)
        // If using collection listener (1st arg is the collection):
        // e.g. changes.insertions.forEach((index) => console.log('Inserted item: ', collection[index]));
        // If using object listener (1st arg is the object):
        // e.g. changes.changedProperties.forEach((prop) => console.log(`${prop} changed to ${object[prop]}`));

        // By querying the objects again, we get a new reference to the Result and triggers
        // a rerender by React. Setting the tasks to either 'tasks' or 'collection' (from the
        // argument) will not trigger a rerender since it is the same reference
        setUsers(realm.objects('User'));
      });
    } catch (err) {
      console.error('Error opening realm: ', err.message);
    }
  }, [realmRef]);

  const closeRealm = useCallback(() => {
    const usersSubscriptions = usersRef.current;
    usersSubscriptions?.removeAllListeners();
    usersSubscriptions.current = null;

    const realm = realmRef.current;
    // If having listeners on the realm itself, also remove them using:
    // realm?.removeAllListeners();
    realm?.close();
    realmRef.current = null;
    setUsers([]);
  }, [realmRef]);

  useEffect(() => {
    openRealm();

    // Return a cleanup callback to close the realm to prevent memory leaks
    return closeRealm;
  }, [openRealm, closeRealm]);

  const handleAddUser = useCallback(
    user => {
      if (!user) {
        return;
      }
      const realm = realmRef.current;
      // Everything in the function passed to "realm.write" is a transaction and will
      // hence succeed or fail together. A transcation is the smallest unit of transfer
      // in Realm so we want to be mindful of how much we put into one single transaction
      // and split them up if appropriate (more commonly seen server side). Since clients
      // may occasionally be online during short time spans we want to increase the probability
      // of sync participants to successfully sync everything in the transaction, otherwise
      // no changes propagate and the transaction needs to start over when connectivity allows.
      realm?.write(() => {
        realm?.create('User', new User(user));
      });
    },
    [realmRef],
  );

  // const handleToggleTaskStatus = useCallback(
  //   task => {
  //     const realm = realmRef.current;
  //     realm?.write(() => {
  //       // Normally when updating a record in a NoSQL or SQL database, we have to type
  //       // a statement that will later be interpreted and used as instructions for how
  //       // to update the record. But in RealmDB, the objects are "live" because they are
  //       // actually referencing the object's location in memory on the device (memory mapping).
  //       // So rather than typing a statement, we modify the object directly by changing
  //       // the property values. If the changes adhere to the schema, Realm will accept
  //       // this new version of the object and wherever this object is being referenced
  //       // locally will also see the changes "live".
  //       task.isComplete = !task.isComplete;
  //     });

  //     // Alternatively if passing the ID as the argument to handleToggleTaskStatus:
  //     // realm?.write(() => {
  //     //   const task = realm?.objectForPrimaryKey('Task', id); // If the ID is passed as an ObjectId
  //     //   const task = realm?.objectForPrimaryKey('Task', Realm.BSON.ObjectId(id));  // If the ID is passed as a string
  //     //   task.isComplete = !task.isComplete;
  //     // });
  //   },
  //   [realmRef],
  // );

  const handleDeleteUser = useCallback(
    user => {
      const realm = realmRef.current;
      realm?.write(() => {
        realm?.delete(user);

        // Alternatively if passing the ID as the argument to handleDeleteTask:
        // realm?.delete(realm?.objectForPrimaryKey('Task', id));
      });
    },
    [realmRef],
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Anasayfa'}}
        />
        <Stack.Screen name="AddUser">
          {props => (
            <SafeAreaView style={styles.screen}>
              <View style={styles.content}>
                <AddUserForm
                  onSubmit={handleAddUser}
                  {...props}
                  options={{title: 'KULLANICI EKLEME'}}
                />
              </View>
            </SafeAreaView>
          )}
        </Stack.Screen>
        <Stack.Screen name="UserList">
          {props => (
            <SafeAreaView style={styles.screen}>
              <View style={styles.content}>
                <UserList
                  users={users}
                  onDeleteUser={handleDeleteUser}
                  {...props}
                  options={{title: 'KULLANICI LİSTESİ'}}
                />
              </View>
            </SafeAreaView>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  submit: {
    height: 50,
    width: '70%',
    fontWeight: '900',
    color: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 55,
    backgroundColor: '#262626',
  },
  pressableText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '400',
  },
});

export default App;
