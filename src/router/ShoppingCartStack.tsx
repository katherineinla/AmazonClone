import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNav from './BottomTabNav';
import ProductScreen from '../screens/ProductScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import AddressScreen from '../screens/AddressScreen';

const Stack = createNativeStackNavigator();

const ShoppingCartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ShoppingCartScreen}
        name="cart"
        options={{title: 'Shopping Cart'}}
      />
      <Stack.Screen
        component={AddressScreen}
        name="Address"
        options={{title: 'Address'}}
      />
    </Stack.Navigator>
  );
};

export default ShoppingCartStack;
