import {Text, ScrollView, ActivityIndicator} from 'react-native';
import {useState, useEffect} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {useRoute} from '@react-navigation/native';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import {Product, CartProduct} from '../../models';
import {DataStore} from 'aws-amplify/datastore';
import {getCurrentUser} from 'aws-amplify/auth';

const ProductScreen = () => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (!route.params.id) {
      return;
    }
    DataStore.query(Product, route.params.id).then(setProduct);
  }, [route.params.id]);

  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0]);
    }
  }, [product]);

  const onAddToCart = async () => {
    const userData = await getCurrentUser();
    if (!product || !selectedOption) {
      return;
    }
    const newCartProduct = new CartProduct({
      userSub: userData.userId,
      quantity,
      option: selectedOption,
      productID: product.id,
    });
    await DataStore.save(newCartProduct);
    navigation.navigate('shoppingCart');
  };

  if (!product) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      {/* Image carousel */}
      <ImageCarousel images={product.images} />

      {/* Option selector */}

      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}>
        {product.options.map(option => (
          <Picker.Item label={option} value={option} />
        ))}
      </Picker>

      {/* Price */}
      <Text style={styles.price}>
        from {product.price.toFixed(2)}
        {product.oldPrice && (
          <Text style={styles.oldPrice}> ${product.oldPrice.toFixed(2)}</Text>
        )}
      </Text>

      {/* Description */}
      <Text style={styles.description}>{product.description}</Text>

      {/* Quantity Selector */}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      {/* button */}
      <Button
        text={'Add to Cart'}
        onPress={onAddToCart}
        containerStyles={{backgroundColor: '#e3c905'}}
      />
      <Button
        text={'Buy Now'}
        onPress={() => {
          console.warn('Buy Now');
        }}
      />
    </ScrollView>
  );
};

export default ProductScreen;
