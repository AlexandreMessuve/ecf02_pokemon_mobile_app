import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemonSlice";
import collectionSlice from "./collectionSlice";

export const store = configureStore({
    reducer: {
        pokemon: pokemonSlice,
        collection: collectionSlice
    }
})