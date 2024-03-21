import { FlatList, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectCollection } from '../store/collectionSlice'
import PokemonCards from '../components/PokemonCards'

const CollectionPokemonScreen = ({navigation}) => {
  const collection = useSelector(selectCollection);
  return (
    <View>
      <FlatList
        data={collection} renderItem={({item}) => {
          return(
            <PokemonCards name={item.name} id={item.id.toString()} types={item.types} image={item.sprites.other['official-artwork'].front_default} />
          )
        }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => {
          return(
            <Text>Aucun pokemon dans la collection</Text>
          )
        }}
        numColumns={2}
       />

    </View>
  )
}

export default CollectionPokemonScreen
