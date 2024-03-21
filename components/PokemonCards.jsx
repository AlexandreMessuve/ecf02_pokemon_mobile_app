import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import DetailCards from './DetailCards';

const PokemonCards = ({ name, image, types, id }) => {
    const idLength = id.length;
    const zero = '0';
    const repeatZero = 4 - idLength
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() => navigation.navigate('pokemon-detail', { id: id })}
            style={({ pressed }) => [styles.container, pressed && styles.pressed]}>

            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: image }} alt={name} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textId}>N°{zero.repeat(repeatZero)}{id}</Text>
                <Text style={styles.text}>{name}</Text>
                <View style={styles.listContainer}>
                    {
                        types.map((item) => {
                            return (
                                <DetailCards name={item.type.name} isType key={item.type.name} />
                            )
                        })
                    }
                </View>
            </View>
        </Pressable>
    )
}

export default PokemonCards

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D9D9D9',
        borderColor: 'yellow',
        borderWidth: 1,
        borderRadius: 15,
        width: 180,
        height: 300,
        marginHorizontal: 15,
        marginVertical: 20,
        overflow: 'hidden',
        elevation: 10
    },
    pressed: {
        backgroundColor: '#D1D1D1'
    },
    imageContainer: {
        borderBottomWidth: 1,
        borderColor: 'yellow'
    },
    image: {
        width: 180,
        height: 180,
    },
    listContainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textContainer: {
        alignItems: 'center'
    },
    textId: {
        fontSize: 15,
        color: 'grey',
        fontWeight: 'bold',
        marginVertical: 2
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    }
})