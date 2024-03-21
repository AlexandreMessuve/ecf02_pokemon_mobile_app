import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectPokemons } from '../store/pokemonSlice';
import EvolutionCards from '../components/EvolutionCards';
import StatCards from '../components/StatCards';
import DetailCards from '../components/DetailCards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addPokemon, removePokemon, selectCollection } from '../store/collectionSlice';
const DetailPokemonScreen = ({ route }) => {
    const [evolution, setEvolution] = useState([]);
    const id = route.params.id;
    const pokemons = useSelector(selectPokemons);
    const pokemon = pokemons.find((pokemon) => pokemon.id == id);
    const collection = useSelector(selectCollection);
    const pokemonCaptured = collection.find((poke) => poke.id === pokemon.id);
    const dispatch = useDispatch();
    const addEvolution = (name) => {
        console.log(name);
        if (name === pokemon.name || name === undefined) {
            return;
        }
        const poke = pokemons.find((pok) => pok.name === name);
        console.log(poke.id);
        return {
            id: poke.id,
            name: poke.name,
            image: poke.sprites.other['official-artwork'].front_default
        }
    }
    useEffect(() => {
        const evo = [];
        evo.push(addEvolution(pokemon.evolutions.chain.species.name))
        pokemon.evolutions.chain.evolves_to.map((evol) => {
            // récuperation des evolutions
            console.log(evol.species);
            console.log(evol.evolves_to[0]?.species);
            const evo1 = evol.species.name;
            const evo2 = evol.evolves_to[0]?.species.name;
            evo.push(addEvolution(evo1));
            evo.push(addEvolution(evo2));
        });
        console.log(evo);
        setEvolution(evo.filter((ev) => ev));
    }, [pokemon]);


    const capturePokemon = () => {
        pokemonCaptured ? dispatch(removePokemon(pokemonCaptured.id)) : dispatch(addPokemon(pokemon));
    }
    useEffect(() => {
        console.log(evolution);
    }, [evolution]);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={[styles.nameContainer]}>
                <Text style={styles.name}>{pokemon.name}</Text>
            </View>
            <View style={[styles.imageContainer, styles.borderBottom]}>
                <Image source={{ uri: pokemon.sprites.other["official-artwork"].front_default }} style={styles.image} />
            </View>
            <View style={[styles.subTitleContainer, styles.borderBottom]}>
                <Text style={styles.subTitle}>Stats</Text>
            </View>
            <View style={styles.listContainer}>
                {
                    pokemon.stats.map((stat) => (
                        <StatCards name={stat.stat.name} stat={stat.base_stat} key={stat.stat.name} />
                    ))
                }
            </View>
            <View style={[styles.subTitleContainer, styles.borderBottom]}>
                <Text style={styles.subTitle}>
                    Types
                </Text>
            </View>
            <View style={styles.listContainer}>
                {
                    pokemon.types.map((type) => (
                        <DetailCards name={type.type.name} key={type.type.name} isType />
                    ))
                }
            </View>
            {
                evolution.length > 0 && (
                    <View>
                        <View style={[styles.subTitleContainer, styles.borderBottom]}>
                            <Text style={styles.subTitle}>
                                Evolutions
                            </Text>
                        </View>
                        <View style={styles.listContainer}>
                            {
                                evolution.sort((a, b) => a.id - b.id).map((evo) => {
                                    return (
                                        <EvolutionCards evolution={evo} key={evo.name}/>
                                    )
                                })
                            }
                        </View>
                    </View>
                )
            }
            <View style={[styles.subTitleContainer, styles.borderBottom]}>
                <Text style={styles.subTitle}>
                    Capacités
                </Text>
            </View>
            <View style={styles.listContainer}>
                {
                    pokemon.abilities.map((abilitie) => (
                        <DetailCards name={abilitie.ability.name} key={abilitie.ability.name} />
                    ))
                }
            </View>
            <Pressable 
                    onPress={capturePokemon}
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    >
                    <Icon name={'catching-pokemon'} size={30} color={pokemonCaptured ? 'green' : 'red'} />
                    <Text>{pokemonCaptured ? 'Relacher' : 'Capturer'}</Text>
            </Pressable>
        </ScrollView>
    )
}

export default DetailPokemonScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderBottom: {
        borderBottomWidth: 2,
        borderBottomColor: '#FFCB05'
    },
    imageContainer: {
        width: '100%',
        height: 400,
        marginBottom: 10,
    },
    image: {
        height: '100%',
        width: '100%',
        marginBottom: 10,
    },
    evolutionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 50,
        zIndex: 3
    },
    nameContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold'
    },
    subTitleContainer: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderBottomColor: 2,
    },
    subTitle: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold'
    },
    listContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    }
})