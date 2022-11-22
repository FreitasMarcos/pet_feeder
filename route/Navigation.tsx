import React from "react";
import { View, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../src/home/Home";
import { Login } from "../src/login/Login";
import { AddSchedule } from "../src/schedule/AddSchedule";
import { NewAccount } from "../src/login/NewAccount";
import { UpdateSchedule } from "../src/schedule/UpdateSchedule";
import Release from "../src/schedule/Release";
import Profile from "../src/Profile/Profile";

const Stack = createNativeStackNavigator();

export type TypeScreen = {
    Profile: undefined
    Home: undefined,
    AddSchedule: undefined,
    Login: undefined,
    NewAccount: undefined,
    Release: undefined,
    UpdateSchedule: undefined,
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen
                    name="NewAccount"
                    component={NewAccount}
                    options={
                        {
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#256D85'
                            },
                            headerTitleStyle: {
                                color: "white",
                                fontWeight: "700",
                            },
                            headerTintColor: '#fff',
                            headerTitle: 'Criar Conta'
                        }
                    }
                />
                <Stack.Screen
                    name="AddSchedule" component={AddSchedule}
                    options={
                        {
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#009092'
                            },
                            headerTitleStyle: {
                                color: "white",
                                fontWeight: "700",
                            },
                            headerTintColor: '#fff',
                            headerTitle: 'Adicionar'
                        }
                    }
                />

                <Stack.Screen
                    name="UpdateSchedule" component={UpdateSchedule}
                    options={
                        {
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#009092'
                            },
                            headerTitleStyle: {
                                color: "white",
                                fontWeight: "700",
                            },
                            headerTintColor: '#fff',
                            headerTitle: 'Atualizar'
                        }
                    }
                />
                <Stack.Screen
                    name="Release" component={Release}
                    options={
                        {
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#009092'
                            },
                            headerTitleStyle: {
                                color: "white",
                                fontWeight: "700",
                            },
                            headerTintColor: '#fff',
                            headerTitle: 'Liberar ração'
                        }
                    }
                />
                <Stack.Screen
                    name="Profile" component={Profile}
                    options={
                        {
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#009092'
                            },
                            headerTitleStyle: {
                                color: "white",
                                fontWeight: "700",
                            },
                            headerTintColor: '#fff',
                            headerTitle: 'Perfil'
                        }
                    }
                />
            </Stack.Navigator>
        </NavigationContainer>

    );
}