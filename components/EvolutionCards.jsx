import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const EvolutionCards = ({ evolution }) => {

    const navigation  = useNavigation();
    const styles = StyleSheet.create({
        container: {
            width: 100,
            height: 100,
            alignItems: 'center',
            marginHorizontal:10
        },
        image:{
            height: '100%',
            width: '100%'
        },
        title:{
            fontSize: 15,
            fontWeight: 'bold',
            color: 'black',
            zIndex: 4,
        }
    })
    return (
        <Pressable style={[styles.container]} onPress={() => navigation.navigate('pokemon-detail', {id: evolution.id})}>
            <Image  style={styles.image} source={{ uri: evolution.image }} alt={evolution.name} />
            <Text style={styles.title}>{evolution.name}</Text>
        </Pressable>
    )
}

export default EvolutionCards

