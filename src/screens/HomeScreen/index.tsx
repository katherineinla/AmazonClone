import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProductItem from "../../components/ProductItem";
import products from '../../data/products';


const HomeScreen = ({searchValue}: {searchValue: string}) => {
  console.log(searchValue);
    return (
        <View style={styles.page}>
        {/* Render Product Componet */}
        <FlatList
          data={products}
          renderItem={({item}) => <ProductItem item={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
};

const styles = StyleSheet.create({
    page: {
        padding: 10,
    },
});

export default HomeScreen;