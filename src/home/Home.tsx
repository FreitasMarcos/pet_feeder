import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList, Alert } from 'react-native'
import { Header } from '../components/header/Header';
import { styles } from './styles';
import { MaterialIcons, FontAwesome, Entypo, FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Navigation, { TypeScreen } from '../../route/Navigation';
import api from '../../db/supabase';
import { UserContext } from '../Contexts/UserContext';

type addSchedule = NativeStackNavigationProp<TypeScreen, 'AddSchedule'>
type Release = NativeStackNavigationProp<TypeScreen, 'Release'>
type UpdateSchedule = NativeStackNavigationProp<TypeScreen, 'UpdateSchedule'>

const width = Dimensions.get('window').width;
const apieky = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwY3F5YnhvZXlzb25lbG51bXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ4OTc4NzcsImV4cCI6MTk4MDQ3Mzg3N30.QwjXgHDsbAa1PtezSRfzpx12XRN3-L6SdJYv-XbzqdA';

export function Home() {

    const navigatonAddSchedule = useNavigation<addSchedule>();
    const navigationRelease = useNavigation<Release>();
    const navigationUpdate = useNavigation<UpdateSchedule>();

    const [listCronograma, setListCronograma] = useState([]);

    const { accessToken } = useContext(UserContext);

    async function list() {
        api.get(`/rest/v1/Tempo?userId=eq.${accessToken}&select=*`, {
            headers: {
                "Content-Type": "application/json",
                "apikey": apieky
            },
        }).then((response) => {
            setListCronograma(response.data);
        }).catch((error) => {
        })
    }

    async function deleteRow(props: number) {
        api.delete(`/rest/v1/Tempo?id=eq.${props}`, {
            headers: {
                'apikey': apieky,
                'Authorization': `Bearer ${apieky}`
            }
        }).then((response) => {
            list()
            Alert.alert(
                "Sucesso",
                "Linha deletada com sucesso!",
                [
                    {
                        text: "Cancelar",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Confirmar", onPress: () => console.log("OK Pressed") }
                ]
            );
        }).catch((error) => {
            Alert.alert(
                "Error",
                "Não foi possível excluir essa linha",
                [
                    {
                        text: "Cancelar",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Confirmar", onPress: () => console.log("OK Pressed") }
                ]
            );
        })
    }

    useEffect(() => {
        list()
        const interval = setInterval(() => {
            list()
        }, 500);
        return () => clearInterval(interval)
    }, [accessToken])

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.button} onPress={() => navigatonAddSchedule.navigate('AddSchedule')}>
                    <Text style={styles.text}>Adicionar</Text>
                    <MaterialIcons name="add" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { width: width * .4, }]} onPress={() => navigationRelease.navigate('Release')}>
                    <Text style={styles.text}>Liberar Ração</Text>
                    <Entypo name="lock-open" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {
                listCronograma.length > 0
                    ?
                    <FlatList
                        data={listCronograma}
                        keyExtractor={(item: any) => item.id}
                        renderItem={
                            ({ item }) => {
                                return (
                                    <View style={styles.card}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <View style={styles.alignContent}>
                                                <Text style={{ alignSelf: 'center' }}>Horário</Text>
                                                <Text style={{ alignSelf: 'center' }}>{item.Time}</Text>
                                            </View>
                                            <View style={styles.alignContent}>
                                                <Text style={{ alignSelf: 'center' }}>Quantidade</Text>
                                                <Text style={{ alignSelf: 'center' }}>{item.Quantidade}g</Text>
                                            </View>
                                            <TouchableOpacity style={[styles.buttonSet, { backgroundColor: '#ffc107' }]} onPress={() => navigationUpdate.navigate('UpdateSchedule', item)}>
                                                <FontAwesome name="pencil-square-o" size={24} color="white" />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.buttonSet, { backgroundColor: '#dc3545' }]} onPress={() => deleteRow(item.id)}>
                                                <FontAwesome name="trash-o" size={24} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }
                        }
                    />
                    :

                    <View style={styles.containerCard}>
                        <View style={styles.cardNoList}>
                            <FontAwesome5 name="sad-tear" style={{ alignSelf: 'center', }} size={36} color="#256D85" />
                            <View>
                                <Text style={styles.titleCard}>Nenhum registro encontrado</Text>
                            </View>
                            <View>
                                <Text style={styles.textCard}>Para poder acessar todas as funcionalidades que nosso aplicativo oferece, favor cadastre um horário e a quantidade de ração desejada.</Text>
                            </View>
                        </View>
                    </View>

            }

        </View>
    )
}