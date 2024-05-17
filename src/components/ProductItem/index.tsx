import { View, Text, Image, Pressable } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

interface ProductItemProps {
    item: {
        id: string;
        title: string;
        image: string;
        avgRating: number;
        ratings: number;
        price: number;
        oldPrice?: number;
    }
}

const ProductItem = ({ item }: ProductItemProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    console.warn('Item was pressed');
    navigation.navigate('ProductDetails', { id: item.id });
  }
    return (
        <Pressable onPress={onPress} style={styles.root}>
        <Image style={styles.image} source={{ uri: item.image }} />
     <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={3}>{ item.title }</Text>
        {/* Ratings */}
        <View style={styles.ratingsContainer}>
          {[0, 1, 2, 3, 4].map((el, i) => (
            <FontAwesome
              key={`${item.id}-${i}`}
              style={styles.star}
              name={i < item.avgRating ? 'star' : 'star-o'}
              size={18}
              color={'#e47911'}
            />
          ))}
          <Text>{item.ratings}</Text>
        </View>
        <Text style={styles.price}>
            from {item.price}
            {item.oldPrice && (<Text style={styles.oldPrice}> ${item.oldPrice}</Text>)}
            </Text>
        </View>
     </Pressable>
    );
}

export default ProductItem;