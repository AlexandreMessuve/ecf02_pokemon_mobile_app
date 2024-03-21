import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import PokemonListScreen from './screens/PokemonListScreen';
import DetailPokemonScreen from './screens/DetailPokemonScreen';
import CollectionPokemonScreen from './screens/CollectionPokemonScreen';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AddIcon = (name) => {
    return (({size, color}) => {

        return(
            <Icon name={name} size={size} color={color}/>
            )
    })
}
const Home = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'pokemon-list'} component={PokemonListScreen} options={{ headerShown: false }} />
            <Stack.Screen name={'pokemon-detail'} component={DetailPokemonScreen} options={{ title: 'Detail' }} />
        </Stack.Navigator>
    )
}
const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name={'home'} component={Home} options={{ headerShown: false, tabBarIcon: AddIcon('pokemon-go') }} />
                    <Tab.Screen name={'collection'} component={CollectionPokemonScreen} options={{tabBarIcon: AddIcon('pokeball')}}/>
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App