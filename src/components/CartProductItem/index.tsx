import React from 'react';
import {View, Text, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import QuantitySelector from '../QuantitySelector';
import {useState} from 'react';

interface CartProductItemProps {
  cartItem: {
    id: string;
    quantity: number;
    option?: string;
    product: {
      id: string;
      title: string;
      image: string;
      avgRating: number;
      ratings: number;
      price: number;
      oldPrice?: number;
    };
  };
}

const CartProductItem = ({cartItem}: CartProductItemProps) => {
  console.log(cartItem);
  const {quantity: quantityProp, product} = cartItem;
  const [quantity, setQuantity] = useState(quantityProp);

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image style={styles.image} source={{uri: product.image}} />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {product.title}
          </Text>
          {/* Ratings */}
          <View style={styles.ratingsContainer}>
            {[0, 1, 2, 3, 4].map((el, i) => (
              <FontAwesome
                key={`${product.id}-${i}`}
                style={styles.star}
                name={i < product.avgRating ? 'star' : 'star-o'}
                size={18}
                color={'#e47911'}
              />
            ))}
            <Text>{product.ratings}</Text>
          </View>
          <Text style={styles.price}>
            from {product.price}
            {product.oldPrice && (
              <Text style={styles.oldPrice}> ${product.oldPrice}</Text>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      </View>
    </View>
  );
};

export default CartProductItem;
