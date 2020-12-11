import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import firebase from "../database/firebase";

const estadoInicial = {
  id: "",
  name: "",
  email: "",
  phone: "",
};

const UserDetailScreen = (props) => {
  const [user, setUser] = useState(estadoInicial);

  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({
      ...user,
      id: doc.id,
    });
    setLoading(false); //Sirve para hacer una condicional cuando algo se esta cargando aparezca y el usuario no spamee el boton.
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value }); //Si cambio solamente el name me elimina los demas campos (email y phone), con el ...state, actualiza solo el name
  };

  //Delete User
  const deleteUser = async () => {
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate("UsersList");
  };

  //Show
  const openConfirmationAlert = () => {
    Alert.alert("Remove The User", "Are you sure?", [
      { text: "Yes", onPress: () => deleteUser() },
      { text: "No", onPress: () => console.log("false") },
    ]);
  };

  //Update User
  const updateUser = async () => {
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setUser(estadoInicial);
    props.navigation.navigate("UsersList");
  };
  //----------------------------

  if (loading) {
    return (
      //Si la aplicion esta cargando entonces esto se ejecuta y hace que el usuario espere hasta que pase de true a false (Espera a que cargue la vista)
      <View>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.name}
          placeholder="Name User"
          onChangeText={(value) => {
            handleChangeText("name", value);
          }} //toma un name y toma el value
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.email}
          placeholder="Email User"
          onChangeText={(value) => {
            handleChangeText("email", value);
          }}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.phone}
          placeholder="Phone User"
          onChangeText={(value) => {
            handleChangeText("phone", value);
          }}
        />
      </View>
      <View>
        <Button
          color="#19AC52"
          title="Update User"
          onPress={() => updateUser()}
        />
      </View>
      <View>
        <Button
          color="#E37399"
          title="Delete User"
          onPress={() => {
            openConfirmationAlert();
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default UserDetailScreen;
