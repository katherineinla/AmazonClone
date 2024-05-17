import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import {View, Text, Pressable, StyleSheet, FlatList, Image, useWindowDimensions} from 'react-native';
import { useState, useCallback } from 'react';

const ImageCarousel = ({images} : {images: string[]}) => {
    const [activeIndex, setActiveIndex] = useState(1);
    const windowWidth = useWindowDimensions().width;

    const onFlatlistUpdate = useCallback(({viewableItems}) => {
        if (viewableItems.length > 0) {
          setActiveIndex(viewableItems[0].index || 0);
        }
        console.log(viewableItems);
      }, []);

    return (
        <View style={styles.root}>
            <FlatList
                data={images}
                renderItem={({item}) => (
                    <Image style={[styles.image, {width: windowWidth - 40}]} source={{uri: item}}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={windowWidth - 20}
                snapToAlignment={'end'}
                decelerationRate={'fast'}
                viewabilityConfig={{
                    viewAreaCoveragePercentThreshold: 50,
                }}
                onViewableItemsChanged={onFlatlistUpdate}
            />
            <View style={styles.dots}>
            {images.map((image, index) => (
                <View key={index} style={[styles.dot , {backgroundColor: index===activeIndex ? '#c9c9c9' : '#ededed'}]} />
            ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {

    },
    image: {
        margin: 10,
        height: 250,
        resizeMode: 'contain',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: '#ededed',
        borderColor: '#c9c9c9',
        margin: 5,
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default ImageCarousel;