import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pokeApi from "../api/pokeApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { addDataStorage, getDataStorage } from "../service/asyncStorage";


export const getPokemon = createAsyncThunk('getPokemon', async() => {
    try {
        const resp = await pokeApi.get('pokemon?limit=500');
        const data = resp.data.results
        const pokemons = [];

        await Promise.all(
            data.map(async(pokemon) => {
                try {
                    const resp = await axios.get(pokemon.url);

                    const species = await axios.get(resp.data.species.url);

                    const evolution = await axios.get(species.data.evolution_chain.url);
                    pokemons.push({
                        id: resp.data.id,
                        name: resp.data.name,
                        height: resp.data.height,
                        weight: resp.data.weight,
                        abilities: resp.data.abilities,
                        types: resp.data.types,
                        stats: resp.data.stats,
                        sprites: resp.data.sprites,
                        evolutions: evolution.data
                    })
                } catch (error) {
                    console.log(error);
                }
            })
        );
        return pokemons.sort((a, b) => a.id - b.id);
    } catch (error) {
        console.log(error);
    }
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        pokemons: [],
        isLoading: false,
        isError: false
    },
    reducers:{
    },
    extraReducers: (builder) => {
        builder.addCase(getPokemon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.pokemons = action.payload;
        });
        builder.addCase(getPokemon.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getPokemon.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export const selectPokemons = state => state.pokemon.pokemons;
export const selectIsLoading = state => state.pokemon.isLoading;
export const selectIsError = state => state.pokemon.isError;
export default pokemonSlice.reducer;