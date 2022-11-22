import { Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native'
import * as yup from 'yup'
import api from '../../db/supabase';
import Navigation, { TypeScreen } from '../../route/Navigation';
import { stylesRelease } from './style';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment'
import { UserContext } from '../Contexts/UserContext';

type home = NativeStackNavigationProp<TypeScreen, 'Home'>

const release = yup.object().shape({
    Quantidade: yup.number(),//.required('Quantidade is required'),
    Time: yup.string(),//.required('Horário is required'),
})

const apieky = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwY3F5YnhvZXlzb25lbG51bXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ4OTc4NzcsImV4cCI6MTk4MDQ3Mzg3N30.QwjXgHDsbAa1PtezSRfzpx12XRN3-L6SdJYv-XbzqdA';



export default function Release(params: any) {

    const { accessToken } = useContext(UserContext)
    const [times, setTimes] = useState('')
    const navigation = useNavigation<home>();

    useEffect(() => {
        const interval = setInterval(() => {
            const agora = moment();

            let hour = agora.hour() - 3;
            let minute = agora.minute();

            let minuto = String(minute)
            let hora = String(hour)

            let minut = minuto.padStart(2, '0');
            let hours = hora.padStart(2, '0');

            let horario = hours + ':' + minut;
            setTimes(horario);
        }, 500);
        return () => clearInterval(interval);
    }, []);


    /* 
        useEffect(() => {
    
        }, [accessToken, console.log(times)]) */

    return (
        <Formik
            validationSchema={release}
            initialValues={{ Quantidade: '', Time: '' }}
            onSubmit={async function (values) {
                await api.post('rest/v1/Tempo', {
                    userId: accessToken,
                    Quantidade: parseFloat(values.Quantidade),
                    Time: values.Time,
                },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "apikey": apieky
                        },
                    }).then((response) => {
                        Alert.alert(
                            "Sucesso",
                            "Comando Criado com sucesso!",
                            [
                                {
                                    text: "Cancelar",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                { text: "Confirmar", onPress: () => navigation.navigate('Home') }
                            ]
                        );
                    }
                    ).catch((error) => {
                        console.log(error);
                    })
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={stylesRelease.containerScreen}>
                    <View style={stylesRelease.containerInput}>
                        {
                            errors.Quantidade &&
                            <Text style={stylesRelease.messageError}>{errors.Quantidade}</Text>
                        }
                        <TextInput
                            style={stylesRelease.input}
                            placeholder="Quantidade"
                            keyboardType='decimal-pad'
                            onChangeText={handleChange('Quantidade')}
                            onBlur={handleBlur('Quantidade')}
                            value={values.Quantidade}
                        />
                        {
                            errors.Time &&
                            <Text style={stylesRelease.messageError}>{errors.Time}</Text>
                        }
                        <TextInput
                            style={stylesRelease.inputClock}
                            placeholder="Horário"
                            onChangeText={handleChange('Time')}
                            onBlur={handleBlur('Time')}
                            value={values.Time = times}
                            editable={false}
                        />
                    </View>
                    <TouchableOpacity style={stylesRelease.sendButton} onPress={handleSubmit}>
                        <Text style={stylesRelease.sendButtonText}>Liberar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    )
}