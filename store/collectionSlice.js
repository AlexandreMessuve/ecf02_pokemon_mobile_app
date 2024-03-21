import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDataStorage, getDataStorage } from "../service/asyncStorage";

export const getCollection = createAsyncThunk('getCollection', async() => {
    try {
        const data = await getDataStorage('collection');
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
})
const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
        collection: [],
    },
    reducers: {
        addPokemon:(state, action) => {
            state.collection.push(action.payload);
            addDataStorage('collection', state.collection);
        },
        removePokemon:(state, action) => {
            state.collection = state.collection.filter((pokemon) => pokemon.id !== action.payload);
            addDataStorage('collection', state.collection);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCollection.fulfilled, (state, action) => {
            if(action.payload){
                state.collection = action.payload;
            }
        })
    }
});

export const {addPokemon, removePokemon} = collectionSlice.actions;

export const selectCollection = state => state.collection.collection;

export default collectionSlice.reducer;
