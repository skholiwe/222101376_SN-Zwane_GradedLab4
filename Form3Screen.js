import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useForm } from './FormContext';

const Form3Screen = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const { updateFormData } = useForm();

  const isValidCardNumber = (number) => /^\d{16}$/.test(number); // Validate 16 digits
  const isValidExpiryDate = (date) => /^(0[1-9]|1[0-2])\/(2[0-9])$/.test(date); // Validate MM/YY
  const isValidCVV = (cvv) => /^\d{3}$/.test(cvv); // Validate 3 digits

  const handleSubmit = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    if (!isValidCardNumber(cardNumber)) {
      Alert.alert('Validation Error', 'Card Number should be exactly 16 digits.');
      return;
    }

    if (!isValidExpiryDate(expiryDate)) {
      Alert.alert('Validation Error', 'Expiry Date should be in MM/YY format.');
      return;
    }

    if (!isValidCVV(cvv)) {
      Alert.alert('Validation Error', 'CVV should be exactly 3 digits.');
      return;
    }

    updateFormData('paymentDetails', { cardNumber, expiryDate, cvv });
    navigation.navigate('Menu');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        style={styles.input}
        placeholderTextColor="#a9a9a9"
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Expiry Date (MM/YY)"
        value={expiryDate}
        onChangeText={setExpiryDate}
        style={styles.input}
        placeholderTextColor="#a9a9a9"
        keyboardType="numeric"
      />
      <TextInput
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        style={styles.input}
        placeholderTextColor="#a9a9a9"
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
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

export default Form3Screen;


