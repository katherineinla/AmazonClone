import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        padding: 10,
        backgroundColor: 'white',
      },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      oldPrice: {
        fontSize: 12,
        fontWeight: 'normal',
        textDecorationLine: 'line-through',
      },
      description: {
        marginVertical: 10,
        lineHeight: 20,
      }
});

export default styles;