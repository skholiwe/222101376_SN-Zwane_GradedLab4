import React, { useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CartContext } from './CartContext';

const CartScreen = ({ navigation }) => {
  const { cart, updateQuantity, removeFromCart, calculateTotal, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    // Confirm checkout
    Alert.alert(
      'Confirm Checkout',
      'Are you sure you want to proceed to checkout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            clearCart(); 
            navigation.navigate('Checkout'); 
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.price}>Price: R{(parseFloat(item.price.replace('R', '')) * item.quantity).toFixed(2)}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Your cart is empty</Text>}
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.totalText}>Total: R{calculateTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#06c167', 
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff', 
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', 
  },
  quantity: {
    fontSize: 14,
    marginVertical: 5,
    color: '#000000', 
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
    color: '#000000', 
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000000', 
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#000000', 
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#ffffff', 
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffffff', 
    borderRadius: 5,
    alignItems: 'center',
    elevation: 2,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  checkoutButton: {
    marginTop: 10,
    backgroundColor: '#000000', 
    padding: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#ffffff', 
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ffffff',
    marginTop: 20,
  },
});

export default CartScreen;

