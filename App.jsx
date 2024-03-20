import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import PokemonListScreen from './screens/PokemonListScreen';
import DetailPokemonScreen from './screens/DetailPokemonScreen';
import CollectionPokemonScreen from './screens/CollectionPokemonScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'pokemon-list'} component={PokemonListScreen} options={{headerShown: false}}/>
            <Stack.Screen name={'pokemon-detail'} component={DetailPokemonScreen}/>
        </Stack.Navigator>
    )
}
const App = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name={'home'} component={Home}/>
            <Tab.Screen name={'collection'} component={CollectionPokemonScreen}/>
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App