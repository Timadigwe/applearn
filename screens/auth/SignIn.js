import { Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

const SignIn = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (navigation) => {
    // Perform signup logic here
    console.log('Signing up with:', { email, password });

    // You can make API calls or perform other signup actions

    // Clear form fields after submission
    setEmail('');
    setPassword('');
    login();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        onPress={() => {
          handleSignIn(navigation);
        }}
        style={styles.button}>
        <Text style={styles.text}>SIGN IN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontFamily: 'Roboto_400Regular',
    color: '#AA8957',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '90%',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#F5EDE2',
  },
  button: {
    width: '40%',
    height: 40,
    backgroundColor: '#FFE4BB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  text: {
    color: '#AA8957',
  },
});
