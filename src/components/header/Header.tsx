import React from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Navigation, { TypeScreen } from '../../../route/Navigation';

type Profile = NativeStackNavigationProp<TypeScreen, 'Profile'>
type login = NativeStackNavigationProp<TypeScreen, 'Login'>

export function Header() {
    const navigation = useNavigation<login>();

    return (
        <View style={styles.container}>
            <StatusBar
                animated={false}
                backgroundColor='#256D85'
            />
            <View style={styles.HeaderContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <MaterialIcons name="logout" size={26} color="white" style={{ transform: [{ rotate: "180deg" }] }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}