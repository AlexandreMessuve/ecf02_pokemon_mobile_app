import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const StatCards = ({ name, stat }) => {

    const [color, setColor] = useState('');
    useEffect(() => {
        switch (name) {
            case 'hp':
                setColor('#53CD5B')
                break;
            case 'attack':
                setColor('#F6DE52')
                break;
            case 'defense':
                setColor('#ED7F0F')
                break;
            case 'special-attack':
                setColor('#56B0F1')
                break;
            case 'special-defense':
                setColor('#AD62F6')
                break;
            case 'speed':
                setColor('#F06ACE')
                break;
            default:
                break;
        }
    }, [])


    const styles = StyleSheet.create({
        container: {
            width: 127,
            height: 30,
            backgroundColor: color,
            marginHorizontal: 10,
            marginVertical: 10,
            borderRadius:  20,
            justifyContent: 'center'
        },
        textContainer:{
            flexDirection:'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        text: {
            marginLeft: 5,
            color: 'black',
            fontSize: 13
        },
        stat: {
            marginRight: 5,
            fontWeight: 'bold',
            color: 'black',
            textAlign:'right'
        }
    })
    return (
        <View style={[styles.container]}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{name == 'special-attack' || name == 'special-defense' ? name.replace('special', 'spe').toUpperCase() : name.toUpperCase()}:  </Text>
                <Text style={styles.stat}>{stat}</Text>
            </View>
        </View>
    )
}

export default StatCards

