import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useForm } from './FormContext';

const ProfileScreen = () => {
  const { formData } = useForm();
  const [theme, setTheme] = useState({ textColor: '#000000', backgroundColor: '#06c167' });
  const [inputTextColor, setInputTextColor] = useState(theme.textColor);
  const [inputBackgroundColor, setInputBackgroundColor] = useState(theme.backgroundColor);

  const isValidColor = (color) => /^#[0-9A-Fa-f]{6}$/.test(color);

  const handleThemeChange = () => {
    if (!isValidColor(inputTextColor) || !isValidColor(inputBackgroundColor)) {
      Alert.alert('Invalid Color', 'Please enter valid hex color codes (e.g., #ff6347).');
      return;
    }

    setTheme({ textColor: inputTextColor, backgroundColor: inputBackgroundColor });
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: theme.textColor }]}>User Details</Text>
        <View style={styles.infoContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>Name:</Text>
          <Text style={[styles.cardText, { color: theme.textColor }]}>{formData.userDetails.name || ''}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>Email:</Text>
          <Text style={[styles.cardText, { color: theme.textColor }]}>{formData.userDetails.email || ''}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>Phone:</Text>
          <Text style={[styles.cardText, { color: theme.textColor }]}>{formData.userDetails.phone || ''}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: theme.textColor }]}>Address Details</Text>
        <View style={styles.infoContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>Address:</Text>
          <Text style={[styles.cardText, { color: theme.textColor }]}>{formData.addressDetails.address || ''}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>City:</Text>
          <Text style={[styles.cardText, { color: theme.textColor }]}>{formData.addressDetails.city || ''}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>State:</Text>
          <Text style={[styles.cardText, { color: theme.textColor }]}>{formData.addressDetails.state || ''}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>ZIP:</Text>
          <Text style={[styles.cardText, { color: theme.textColor }]}>{formData.addressDetails.zip || ''}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: theme.textColor }]}>Payment Details</Text>
        <View style={styles.infoContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>Credit Card:</Text>
          <Text style={[styles.cardText, { color: theme.textColor }]}>{formData.paymentDetails.creditCard || ''}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>Expiry Date:</Text>
          <Text style={[styles.cardText, { color: theme.textColor }]}>{formData.paymentDetails.expiryDate || ''}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>CVV:</Text>
          <Text style={[styles.cardText, { color: theme.textColor }]}>{formData.paymentDetails.cvv || ''}</Text>
        </View>
      </View>

      <View style={styles.themeSelector}>
        <TextInput
          style={[styles.input, { borderColor: theme.textColor }]}
          placeholder="Enter Background Color"
          value={inputBackgroundColor}
          onChangeText={setInputBackgroundColor}
        />
        <TextInput
          style={[styles.input, { borderColor: theme.textColor }]}
          placeholder="Enter Text Color"
          value={inputTextColor}
          onChangeText={setInputTextColor}
        />
        <TouchableOpacity onPress={handleThemeChange} style={styles.button}>
          <Text style={styles.buttonText}>Apply Theme</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#000000', 
    padding: 10,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', 
    fontWeight: 'bold',
  },
  themeSelector: {
    marginTop: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;




