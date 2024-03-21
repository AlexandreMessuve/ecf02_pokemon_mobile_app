import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR_TYPES } from '../constants/constants'

const DetailCards = ({name, isType}) => {

    const color = isType ? COLOR_TYPES.find((typeColor) => typeColor.name === name).color : 'blue';
    const styles = StyleSheet.create({
        container: {
            width: isType ? 50 : 100,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color,
            marginVertical: 5,
            marginHorizontal: 5,
            borderRadius: 5
        },
        text:{
            fontSize: 10,
            color: 'white',
            fontWeight: 'bold'
        }
    })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  )
}

export default DetailCards

