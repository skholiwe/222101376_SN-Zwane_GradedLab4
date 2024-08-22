import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useForm } from './FormContext';

const Form1Screen = ({ navigation }) => {
  const { updateFormData } = useForm();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Validation functions
  const isValidName = (name) => /^[A-Za-z\s]+$/.test(name);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  const handleNext = () => {
    if (!name || !email || !phone) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    if (!isValidName(name)) {
      Alert.alert('Validation Error', 'Name should only contain letters and spaces.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    if (!isValidPhone(phone)) {
      Alert.alert('Validation Error', 'Phone number should contain exactly 10 digits.');
      return;
    }

    updateFormData('userDetails', { name, email, phone });
    navigation.navigate('Address Details'); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#a9a9a9"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#a9a9a9"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        placeholderTextColor="#a9a9a9"
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleNext} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#06c167',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    marginBottom: 10,
    padding: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Form1Screen;

