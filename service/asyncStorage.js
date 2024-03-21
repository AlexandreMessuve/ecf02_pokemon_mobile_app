import AsyncStorage from "@react-native-async-storage/async-storage"

export const addDataStorage = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));

    } catch (error) {
        console.log(error);
    }
}

export const getDataStorage = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        return JSON.parse(data)
    } catch (error) {
        console.log(error);
    }
}
