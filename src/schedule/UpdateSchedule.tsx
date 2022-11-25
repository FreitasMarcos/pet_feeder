import React, { useContext, useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Platform, Alert } from "react-native";
import { stylesAdd } from "./style";

import { Formik } from "formik";
import * as yup from 'yup'
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { FontAwesome5 } from '@expo/vector-icons';
import api from "../../db/supabase";
import moment from 'moment';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TypeScreen } from '../../route/Navigation';
import { UserContext } from "../Contexts/UserContext";

type home = NativeStackNavigationProp<TypeScreen, 'Home'>

const updateSchedule = yup.object().shape({
    Quantidade: yup.number(),//.required('Quantidade is required'),
    Time: yup.string(),//.required('Horário is required'),
})

const apieky = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwY3F5YnhvZXlzb25lbG51bXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ4OTc4NzcsImV4cCI6MTk4MDQ3Mzg3N30.QwjXgHDsbAa1PtezSRfzpx12XRN3-L6SdJYv-XbzqdA';

export function UpdateSchedule(params: any) {

    const navigation = useNavigation<home>();

    const { accessToken } = useContext(UserContext)

    const [date, setDate] = useState(new Date)
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [text, setText] = useState('')

    const [quantidade, setQuantidade] = useState(0)
    const [time, setTime] = useState('')

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate)
        moment.locale('pt-br');

        let hora = moment(currentDate).format("HH:mm");
        setText(hora);
    };

    const showMode = (currentMode: any) => {
        setShow(true);
        setMode(currentMode);
    }

    useEffect(() => {
        setQuantidade(params.route.params.Quantidade);
        setTime(params.route.params.Time);
    }, [accessToken])

    return (
        <Formik
            validationSchema={updateSchedule}
            initialValues={{ Quantidade: '', Time: '' }}
            onSubmit={async function (values) {

                let setquant

                if (!values.Quantidade || !values.Time) {
                    values.Quantidade = quantidade.toString();
                    setquant = parseFloat(values.Quantidade);
                    values.Time = time;
                } else {
                    setquant = parseFloat(values.Quantidade)
                }

                await api.patch(`rest/v1/Tempo?userId=eq.${accessToken}`, {
                    Quantidade: setquant,
                    Time: values.Time
                }
                    , {
                        headers: {
                            "Content-Type": "application/json",
                            "apikey": apieky,
                            "Authorization": `Bearer ${apieky}`,
                            "Prefer": "return=representation"
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
                                { text: "Confirmar", onPress: () => navigation.navigate("Home", params.route.params) }
                            ]
                        );
                    }
                    ).catch((error) => {
                        console.log(error);
                    })
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={stylesAdd.containerScreen}>
                    <View style={stylesAdd.containerInput}>
                        {
                            errors.Quantidade &&
                            <Text style={stylesAdd.messageError}>{errors.Quantidade}</Text>
                        }
                        <TextInput
                            style={stylesAdd.input}
                            placeholder="Quantidade"
                            keyboardType='decimal-pad'
                            onChangeText={handleChange('Quantidade')}
                            onBlur={handleBlur('Quantidade')}
                            value={values.Quantidade}
                        />
                        {
                            errors.Time &&
                            <Text style={stylesAdd.messageError}>{errors.Time}</Text>
                        }
                        <TextInput
                            style={stylesAdd.inputClock}
                            placeholder="Horário"
                            onChangeText={handleChange('Time')}
                            onBlur={handleBlur('Time')}
                            value={values.Time = text}
                            editable={false}
                        />
                        <TouchableOpacity style={{ marginBottom: 10, marginLeft: 15, backgroundColor: '#256D85', padding: 12, alignSelf: 'center', borderRadius: 8 }} onPress={() => showMode('time')}>
                            <FontAwesome5 name="clock" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    {
                        show && (
                            <RNDateTimePicker
                                mode="time"
                                display="default"
                                is24Hour={true}
                                value={date}
                                onChange={onChange}
                            />
                        )
                    }
                    <TouchableOpacity style={stylesAdd.sendButton} onPress={handleSubmit}>
                        <Text style={stylesAdd.sendButtonText}>Atualizar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    )
}