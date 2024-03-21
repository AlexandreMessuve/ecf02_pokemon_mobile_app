import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemon, selectIsLoading, selectPokemons } from '../store/pokemonSlice';
import PokemonCards from '../components/PokemonCards';
import PokemonLogo from '../assets/img/pokemon-logo.png';
import { getCollection } from '../store/collectionSlice';
const PokemonListScreen = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const poke = useSelector(selectPokemons);
  const isLoading = useSelector(selectIsLoading);
  useEffect(() => {
    dispatch(getPokemon());
    dispatch(getCollection());
  }, []);
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  useEffect(() => {
    if(search !== ''){
      setPokemons(poke.filter((pok) => pok.name.startsWith(search) || pok.id == search));
    }if(search === ''){
      setPokemons(poke)
    }
  }, [search])
  useEffect(() => {
    setPokemons(poke)
  }, [poke]);
  return (
    <View style={[styles.container, {flex: 1}]}>
      <View style={styles.logoContainer}>
        <Image source={PokemonLogo} style={styles.logo} alt={'logo pokemon'} />        
      </View>
      {
        isLoading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <View style={styles.container}>
            <TextInput style={styles.input} onChangeText={setSearch} placeholder='search'/>
            <FlatList 
              data={pokemons} renderItem={({item}) => {
                return(
                  <PokemonCards name={item.name} id={item.id.toString()} types={item.types} image={item.sprites.other['official-artwork'].front_default} />
                )
              }}
              numColumns={2}
              ListEmptyComponent={() => {
                return(
                  <Text>Aucun pokemon</Text>
                )
              }}
              progressViewOffset={6}
            />
          </View>
        )
      }
    </View>
  )
}

export default PokemonListScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer:{
    width: '100%',
    height: 200,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: 100,
    width: 300,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  input:{
    width: 150,
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10
  }
})