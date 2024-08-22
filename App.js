import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import MenuScreen from './MenuScreen';
import CartScreen from './CartScreen';
import ProfileScreen from './ProfileScreen';
import Form1Screen from './Form1Screen';
import Form2Screen from './Form2Screen';
import Form3Screen from './Form3Screen';
import { FormProvider, useForm } from './FormContext';
import { ThemeProvider } from './ThemeContext';
import { CartProvider, CartContext } from './CartContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function FormStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User Details" component={Form1Screen} />
      <Stack.Screen name="Address Details" component={Form2Screen} />
      <Stack.Screen name="Payment Details" component={Form3Screen} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { isFormCompleted } = useForm();
  const { getItemCount } = useContext(CartContext);
  const itemCount = getItemCount();

  return isFormCompleted ? (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'MenuScreen':
              iconName = 'menu';
              return <Ionicons name={iconName} size={size} color={color} />;
            case 'CartScreen':
              iconName = 'cart';
              return (
                <View style={{ position: 'relative' }}>
                  <MaterialCommunityIcons name={iconName} size={size} color={color} />
                  {itemCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{itemCount}</Text>
                    </View>
                  )}
                </View>
              );
            case 'ProfileScreen':
              iconName = 'user';
              return <FontAwesome name={iconName} size={size} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="MenuScreen" component={MenuScreen} />
      <Tab.Screen name="CartScreen" component={CartScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen name="FormStack" component={FormStack} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default function App() {
  return (
    <FormProvider>
      <ThemeProvider>
        <CartProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </CartProvider>
      </ThemeProvider>
    </FormProvider>
  );
}




