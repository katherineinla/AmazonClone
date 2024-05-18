import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import CartProductItem from '../../components/CartProductItem';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {DataStore} from 'aws-amplify/datastore';
import {Product, CartProduct} from '../../models';

const ShoppingCartScreen = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const fetchCartProducts = async () => {
  //     DataStore.query(CartProduct).then(setCartProducts);
  //   };
  //   fetchCartProducts();
  // }, []);
  //TODO: Fetch cart products from DataStore
  useEffect(() => {
    const fetchCartProducts = async () => {
      console.log("Fetching cart products from DataStore...");
      DataStore.query(CartProduct).then(cartProducts => {
        console.log("Fetched cart products:", cartProducts);
        setCartProducts(cartProducts);
      });
    };
    fetchCartProducts();
  }, []);

  useEffect(() => {
    if (cartProducts.filter(cp => !cp.product).length === 0) {
      return;
    }

    const fetchProducts = async () => {
      const products = await Promise.all(
        cartProducts.map(cartProduct =>
          DataStore.query(Product, cartProduct.productID),
        ),
      );

      setCartProducts(currentCartProducts =>
        currentCartProducts.map(CartProduct => ({
          ...CartProduct,
          product: products.find(p => p.id === CartProduct.productID),
        })),
      );
    };
    if (cartProducts.some(cp => !cp.product)) {
      fetchProducts();
    }
  }, [cartProducts]);
  // const totalPrice = cartProducts.reduce((summedPrice, product) => (
  //   summedPrice + product.item.price * product.quantity), 0);

  const onCheckout = () => {
    navigation.navigate('Address');
  };

  const totalPrice = 0;

  return (
    <View style={styles.page}>
      {/* Render Product Componet */}
      <FlatList
        data={cartProducts}
        renderItem={({item}) => <CartProductItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Text style={{fontSize: 18}}>
              Subtotal ({cartProducts.length} items) :{' '}
              <Text style={{color: '#e47911', fontWeight: 'bold'}}>
                ${totalPrice.toFixed(2)}
              </Text>
            </Text>
            <Button
              text="Proceed to checkout"
              onPress={onCheckout}
              containerStyles={{
                backgroundColor: '#f7e300',
                borderColor: '#c7b702',
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});

export default ShoppingCartScreen;
