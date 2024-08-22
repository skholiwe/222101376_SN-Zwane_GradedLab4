import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useForm } from './FormContext';

const Form2Screen = ({ navigation }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const { updateFormData } = useForm();

  const isValidCity = (city) => /^[A-Za-z\s]+$/.test(city);
  const isValidState = (state) => /^[A-Za-z\s]+$/.test(state);
  const isValidZipCode = (zipCode) => /^\d{4}$/.test(zipCode);

  const handleNext = () => {
    if (!address || !city || !state || !zipCode) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    if (!isValidCity(city)) {
      Alert.alert('Validation Error', 'City should only contain letters and spaces.');
      return;
    }

    if (!isValidState(state)) {
      Alert.alert('Validation Error', 'State should only contain letters and spaces.');
      return;
    }

    if (!isValidZipCode(zipCode)) {
      Alert.alert('Validation Error', 'Zip Code should contain exactly 4 digits.');
      return;
    }

    updateFormData('addressDetails', { address, city, state, zipCode });
    navigation.navigate('Payment Details');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        placeholderTextColor="#a9a9a9"
      />
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={styles.input}
        placeholderTextColor="#a9a9a9"
      />
      <TextInput
        placeholder="State"
        value={state}
        onChangeText={setState}
        style={styles.input}
        placeholderTextColor="#a9a9a9"
      />
      <TextInput
        placeholder="Zip Code"
        value={zipCode}
        onChangeText={setZipCode}
        style={styles.input}
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
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
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

export default Form2Screen;



